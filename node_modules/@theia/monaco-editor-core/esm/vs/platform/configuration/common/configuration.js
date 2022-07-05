/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import * as objects from '../../../base/common/objects';
import * as types from '../../../base/common/types';
import { URI } from '../../../base/common/uri';
import { Registry } from '../../registry/common/platform';
import { createDecorator } from '../../instantiation/common/instantiation';
import { Extensions, OVERRIDE_PROPERTY_PATTERN } from './configurationRegistry';
export var IConfigurationService = createDecorator('configurationService');
export function isConfigurationOverrides(thing) {
    return thing
        && typeof thing === 'object'
        && (!thing.overrideIdentifier || typeof thing.overrideIdentifier === 'string')
        && (!thing.resource || thing.resource instanceof URI);
}
export function ConfigurationTargetToString(configurationTarget) {
    switch (configurationTarget) {
        case 1 /* USER */: return 'USER';
        case 2 /* USER_LOCAL */: return 'USER_LOCAL';
        case 3 /* USER_REMOTE */: return 'USER_REMOTE';
        case 4 /* WORKSPACE */: return 'WORKSPACE';
        case 5 /* WORKSPACE_FOLDER */: return 'WORKSPACE_FOLDER';
        case 6 /* DEFAULT */: return 'DEFAULT';
        case 7 /* MEMORY */: return 'MEMORY';
    }
}
export function compare(from, to) {
    var added = to
        ? from ? to.keys.filter(function (key) { return from.keys.indexOf(key) === -1; }) : __spreadArrays(to.keys)
        : [];
    var removed = from
        ? to ? from.keys.filter(function (key) { return to.keys.indexOf(key) === -1; }) : __spreadArrays(from.keys)
        : [];
    var updated = [];
    if (to && from) {
        for (var _i = 0, _a = from.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            if (to.keys.indexOf(key) !== -1) {
                var value1 = getConfigurationValue(from.contents, key);
                var value2 = getConfigurationValue(to.contents, key);
                if (!objects.equals(value1, value2)) {
                    updated.push(key);
                }
            }
        }
    }
    var overrides = [];
    var byOverrideIdentifier = function (overrides) {
        var result = {};
        for (var _i = 0, overrides_1 = overrides; _i < overrides_1.length; _i++) {
            var override = overrides_1[_i];
            for (var _a = 0, _b = override.identifiers; _a < _b.length; _a++) {
                var identifier = _b[_a];
                result[keyFromOverrideIdentifier(identifier)] = override;
            }
        }
        return result;
    };
    var toOverridesByIdentifier = to ? byOverrideIdentifier(to.overrides) : {};
    var fromOverridesByIdentifier = from ? byOverrideIdentifier(from.overrides) : {};
    if (Object.keys(toOverridesByIdentifier).length) {
        for (var _b = 0, added_1 = added; _b < added_1.length; _b++) {
            var key = added_1[_b];
            var override = toOverridesByIdentifier[key];
            if (override) {
                overrides.push([overrideIdentifierFromKey(key), override.keys]);
            }
        }
    }
    if (Object.keys(fromOverridesByIdentifier).length) {
        for (var _c = 0, removed_1 = removed; _c < removed_1.length; _c++) {
            var key = removed_1[_c];
            var override = fromOverridesByIdentifier[key];
            if (override) {
                overrides.push([overrideIdentifierFromKey(key), override.keys]);
            }
        }
    }
    if (Object.keys(toOverridesByIdentifier).length && Object.keys(fromOverridesByIdentifier).length) {
        for (var _d = 0, updated_1 = updated; _d < updated_1.length; _d++) {
            var key = updated_1[_d];
            var fromOverride = fromOverridesByIdentifier[key];
            var toOverride = toOverridesByIdentifier[key];
            if (fromOverride && toOverride) {
                var result = compare({ contents: fromOverride.contents, keys: fromOverride.keys, overrides: [] }, { contents: toOverride.contents, keys: toOverride.keys, overrides: [] });
                overrides.push([overrideIdentifierFromKey(key), __spreadArrays(result.added, result.removed, result.updated)]);
            }
        }
    }
    return { added: added, removed: removed, updated: updated, overrides: overrides };
}
export function toOverrides(raw, conflictReporter) {
    var overrides = [];
    for (var _i = 0, _a = Object.keys(raw); _i < _a.length; _i++) {
        var key = _a[_i];
        if (OVERRIDE_PROPERTY_PATTERN.test(key)) {
            var overrideRaw = {};
            for (var keyInOverrideRaw in raw[key]) {
                overrideRaw[keyInOverrideRaw] = raw[key][keyInOverrideRaw];
            }
            overrides.push({
                identifiers: [overrideIdentifierFromKey(key).trim()],
                keys: Object.keys(overrideRaw),
                contents: toValuesTree(overrideRaw, conflictReporter)
            });
        }
    }
    return overrides;
}
export function toValuesTree(properties, conflictReporter) {
    var root = Object.create(null);
    for (var key in properties) {
        addToValueTree(root, key, properties[key], conflictReporter);
    }
    return root;
}
export function addToValueTree(settingsTreeRoot, key, value, conflictReporter) {
    var segments = key.split('.');
    var last = segments.pop();
    var curr = settingsTreeRoot;
    for (var i = 0; i < segments.length; i++) {
        var s = segments[i];
        var obj = curr[s];
        switch (typeof obj) {
            case 'undefined':
                obj = curr[s] = Object.create(null);
                break;
            case 'object':
                break;
            default:
                conflictReporter("Ignoring " + key + " as " + segments.slice(0, i + 1).join('.') + " is " + JSON.stringify(obj));
                return;
        }
        curr = obj;
    }
    if (typeof curr === 'object') {
        curr[last] = value; // workaround https://github.com/Microsoft/vscode/issues/13606
    }
    else {
        conflictReporter("Ignoring " + key + " as " + segments.join('.') + " is " + JSON.stringify(curr));
    }
}
export function removeFromValueTree(valueTree, key) {
    var segments = key.split('.');
    doRemoveFromValueTree(valueTree, segments);
}
function doRemoveFromValueTree(valueTree, segments) {
    var first = segments.shift();
    if (segments.length === 0) {
        // Reached last segment
        delete valueTree[first];
        return;
    }
    if (Object.keys(valueTree).indexOf(first) !== -1) {
        var value = valueTree[first];
        if (typeof value === 'object' && !Array.isArray(value)) {
            doRemoveFromValueTree(value, segments);
            if (Object.keys(value).length === 0) {
                delete valueTree[first];
            }
        }
    }
}
/**
 * A helper function to get the configuration value with a specific settings path (e.g. config.some.setting)
 */
export function getConfigurationValue(config, settingPath, defaultValue) {
    function accessSetting(config, path) {
        var current = config;
        for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
            var component = path_1[_i];
            if (typeof current !== 'object' || current === null) {
                return undefined;
            }
            current = current[component];
        }
        return current;
    }
    var path = settingPath.split('.');
    var result = accessSetting(config, path);
    return typeof result === 'undefined' ? defaultValue : result;
}
export function merge(base, add, overwrite) {
    Object.keys(add).forEach(function (key) {
        if (key in base) {
            if (types.isObject(base[key]) && types.isObject(add[key])) {
                merge(base[key], add[key], overwrite);
            }
            else if (overwrite) {
                base[key] = add[key];
            }
        }
        else {
            base[key] = add[key];
        }
    });
}
export function getConfigurationKeys() {
    var properties = Registry.as(Extensions.Configuration).getConfigurationProperties();
    return Object.keys(properties);
}
export function getDefaultValues() {
    var valueTreeRoot = Object.create(null);
    var properties = Registry.as(Extensions.Configuration).getConfigurationProperties();
    for (var key in properties) {
        var value = properties[key].default;
        addToValueTree(valueTreeRoot, key, value, function (message) { return console.error("Conflict in default settings: " + message); });
    }
    return valueTreeRoot;
}
export function overrideIdentifierFromKey(key) {
    return key.substring(1, key.length - 1);
}
export function keyFromOverrideIdentifier(overrideIdentifier) {
    return "[" + overrideIdentifier + "]";
}
export function getMigratedSettingValue(configurationService, currentSettingName, legacySettingName) {
    var setting = configurationService.inspect(currentSettingName);
    var legacySetting = configurationService.inspect(legacySettingName);
    if (typeof setting.userValue !== 'undefined' || typeof setting.workspaceValue !== 'undefined' || typeof setting.workspaceFolderValue !== 'undefined') {
        return setting.value;
    }
    else if (typeof legacySetting.userValue !== 'undefined' || typeof legacySetting.workspaceValue !== 'undefined' || typeof legacySetting.workspaceFolderValue !== 'undefined') {
        return legacySetting.value;
    }
    else {
        return setting.defaultValue;
    }
}
