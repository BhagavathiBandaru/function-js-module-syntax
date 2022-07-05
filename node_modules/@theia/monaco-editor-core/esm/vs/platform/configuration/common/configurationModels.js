/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import * as json from '../../../base/common/json';
import { ResourceMap, values, getOrSet } from '../../../base/common/map';
import * as arrays from '../../../base/common/arrays';
import * as types from '../../../base/common/types';
import * as objects from '../../../base/common/objects';
import { URI } from '../../../base/common/uri';
import { OVERRIDE_PROPERTY_PATTERN, Extensions } from './configurationRegistry';
import { overrideIdentifierFromKey, addToValueTree, toValuesTree, getConfigurationValue, getDefaultValues, getConfigurationKeys, removeFromValueTree, toOverrides, compare } from './configuration';
import { Registry } from '../../registry/common/platform';
var ConfigurationModel = /** @class */ (function () {
    function ConfigurationModel(_contents, _keys, _overrides) {
        if (_contents === void 0) { _contents = {}; }
        if (_keys === void 0) { _keys = []; }
        if (_overrides === void 0) { _overrides = []; }
        this._contents = _contents;
        this._keys = _keys;
        this._overrides = _overrides;
        this.isFrozen = false;
    }
    Object.defineProperty(ConfigurationModel.prototype, "contents", {
        get: function () {
            return this.checkAndFreeze(this._contents);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationModel.prototype, "overrides", {
        get: function () {
            return this.checkAndFreeze(this._overrides);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationModel.prototype, "keys", {
        get: function () {
            return this.checkAndFreeze(this._keys);
        },
        enumerable: true,
        configurable: true
    });
    ConfigurationModel.prototype.isEmpty = function () {
        return this._keys.length === 0 && Object.keys(this._contents).length === 0 && this._overrides.length === 0;
    };
    ConfigurationModel.prototype.getValue = function (section) {
        return section ? getConfigurationValue(this.contents, section) : this.contents;
    };
    ConfigurationModel.prototype.getOverrideValue = function (section, overrideIdentifier) {
        var overrideContents = this.getContentsForOverrideIdentifer(overrideIdentifier);
        return overrideContents
            ? section ? getConfigurationValue(overrideContents, section) : overrideContents
            : undefined;
    };
    ConfigurationModel.prototype.getKeysForOverrideIdentifier = function (identifier) {
        for (var _i = 0, _a = this.overrides; _i < _a.length; _i++) {
            var override = _a[_i];
            if (override.identifiers.indexOf(identifier) !== -1) {
                return override.keys;
            }
        }
        return [];
    };
    ConfigurationModel.prototype.override = function (identifier) {
        var overrideContents = this.getContentsForOverrideIdentifer(identifier);
        if (!overrideContents || typeof overrideContents !== 'object' || !Object.keys(overrideContents).length) {
            // If there are no valid overrides, return self
            return this;
        }
        var contents = {};
        for (var _i = 0, _a = arrays.distinct(__spreadArrays(Object.keys(this.contents), Object.keys(overrideContents))); _i < _a.length; _i++) {
            var key = _a[_i];
            var contentsForKey = this.contents[key];
            var overrideContentsForKey = overrideContents[key];
            // If there are override contents for the key, clone and merge otherwise use base contents
            if (overrideContentsForKey) {
                // Clone and merge only if base contents and override contents are of type object otherwise just override
                if (typeof contentsForKey === 'object' && typeof overrideContentsForKey === 'object') {
                    contentsForKey = objects.deepClone(contentsForKey);
                    this.mergeContents(contentsForKey, overrideContentsForKey);
                }
                else {
                    contentsForKey = overrideContentsForKey;
                }
            }
            contents[key] = contentsForKey;
        }
        return new ConfigurationModel(contents, this.keys, this.overrides);
    };
    ConfigurationModel.prototype.merge = function () {
        var others = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            others[_i] = arguments[_i];
        }
        var contents = objects.deepClone(this.contents);
        var overrides = objects.deepClone(this.overrides);
        var keys = __spreadArrays(this.keys);
        for (var _a = 0, others_1 = others; _a < others_1.length; _a++) {
            var other = others_1[_a];
            this.mergeContents(contents, other.contents);
            var _loop_1 = function (otherOverride) {
                var override = overrides.filter(function (o) { return arrays.equals(o.identifiers, otherOverride.identifiers); })[0];
                if (override) {
                    this_1.mergeContents(override.contents, otherOverride.contents);
                }
                else {
                    overrides.push(objects.deepClone(otherOverride));
                }
            };
            var this_1 = this;
            for (var _b = 0, _c = other.overrides; _b < _c.length; _b++) {
                var otherOverride = _c[_b];
                _loop_1(otherOverride);
            }
            for (var _d = 0, _e = other.keys; _d < _e.length; _d++) {
                var key = _e[_d];
                if (keys.indexOf(key) === -1) {
                    keys.push(key);
                }
            }
        }
        return new ConfigurationModel(contents, keys, overrides);
    };
    ConfigurationModel.prototype.freeze = function () {
        this.isFrozen = true;
        return this;
    };
    ConfigurationModel.prototype.mergeContents = function (source, target) {
        for (var _i = 0, _a = Object.keys(target); _i < _a.length; _i++) {
            var key = _a[_i];
            if (key in source) {
                if (types.isObject(source[key]) && types.isObject(target[key])) {
                    this.mergeContents(source[key], target[key]);
                    continue;
                }
            }
            source[key] = objects.deepClone(target[key]);
        }
    };
    ConfigurationModel.prototype.checkAndFreeze = function (data) {
        if (this.isFrozen && !Object.isFrozen(data)) {
            return objects.deepFreeze(data);
        }
        return data;
    };
    ConfigurationModel.prototype.getContentsForOverrideIdentifer = function (identifier) {
        for (var _i = 0, _a = this.overrides; _i < _a.length; _i++) {
            var override = _a[_i];
            if (override.identifiers.indexOf(identifier) !== -1) {
                return override.contents;
            }
        }
        return null;
    };
    ConfigurationModel.prototype.toJSON = function () {
        return {
            contents: this.contents,
            overrides: this.overrides,
            keys: this.keys
        };
    };
    // Update methods
    ConfigurationModel.prototype.setValue = function (key, value) {
        this.addKey(key);
        addToValueTree(this.contents, key, value, function (e) { throw new Error(e); });
    };
    ConfigurationModel.prototype.removeValue = function (key) {
        if (this.removeKey(key)) {
            removeFromValueTree(this.contents, key);
        }
    };
    ConfigurationModel.prototype.addKey = function (key) {
        var index = this.keys.length;
        for (var i = 0; i < index; i++) {
            if (key.indexOf(this.keys[i]) === 0) {
                index = i;
            }
        }
        this.keys.splice(index, 1, key);
    };
    ConfigurationModel.prototype.removeKey = function (key) {
        var index = this.keys.indexOf(key);
        if (index !== -1) {
            this.keys.splice(index, 1);
            return true;
        }
        return false;
    };
    return ConfigurationModel;
}());
export { ConfigurationModel };
var DefaultConfigurationModel = /** @class */ (function (_super) {
    __extends(DefaultConfigurationModel, _super);
    function DefaultConfigurationModel() {
        var _this = this;
        var contents = getDefaultValues();
        var keys = getConfigurationKeys();
        var overrides = [];
        for (var _i = 0, _a = Object.keys(contents); _i < _a.length; _i++) {
            var key = _a[_i];
            if (OVERRIDE_PROPERTY_PATTERN.test(key)) {
                overrides.push({
                    identifiers: [overrideIdentifierFromKey(key).trim()],
                    keys: Object.keys(contents[key]),
                    contents: toValuesTree(contents[key], function (message) { return console.error("Conflict in default settings file: " + message); }),
                });
            }
        }
        _this = _super.call(this, contents, keys, overrides) || this;
        return _this;
    }
    return DefaultConfigurationModel;
}(ConfigurationModel));
export { DefaultConfigurationModel };
var ConfigurationModelParser = /** @class */ (function () {
    function ConfigurationModelParser(_name, _scopes) {
        this._name = _name;
        this._scopes = _scopes;
        this._raw = null;
        this._configurationModel = null;
        this._parseErrors = [];
    }
    Object.defineProperty(ConfigurationModelParser.prototype, "configurationModel", {
        get: function () {
            return this._configurationModel || new ConfigurationModel();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationModelParser.prototype, "errors", {
        get: function () {
            return this._parseErrors;
        },
        enumerable: true,
        configurable: true
    });
    ConfigurationModelParser.prototype.parseContent = function (content) {
        if (content) {
            var raw = this.doParseContent(content);
            this.parseRaw(raw);
        }
    };
    ConfigurationModelParser.prototype.parseRaw = function (raw) {
        this._raw = raw;
        var configurationModel = this.doParseRaw(raw);
        this._configurationModel = new ConfigurationModel(configurationModel.contents, configurationModel.keys, configurationModel.overrides);
    };
    ConfigurationModelParser.prototype.parse = function () {
        if (this._raw) {
            this.parseRaw(this._raw);
        }
    };
    ConfigurationModelParser.prototype.doParseContent = function (content) {
        var raw = {};
        var currentProperty = null;
        var currentParent = [];
        var previousParents = [];
        var parseErrors = [];
        function onValue(value) {
            if (Array.isArray(currentParent)) {
                currentParent.push(value);
            }
            else if (currentProperty) {
                currentParent[currentProperty] = value;
            }
        }
        var visitor = {
            onObjectBegin: function () {
                var object = {};
                onValue(object);
                previousParents.push(currentParent);
                currentParent = object;
                currentProperty = null;
            },
            onObjectProperty: function (name) {
                currentProperty = name;
            },
            onObjectEnd: function () {
                currentParent = previousParents.pop();
            },
            onArrayBegin: function () {
                var array = [];
                onValue(array);
                previousParents.push(currentParent);
                currentParent = array;
                currentProperty = null;
            },
            onArrayEnd: function () {
                currentParent = previousParents.pop();
            },
            onLiteralValue: onValue,
            onError: function (error, offset, length) {
                parseErrors.push({ error: error, offset: offset, length: length });
            }
        };
        if (content) {
            try {
                json.visit(content, visitor);
                raw = currentParent[0] || {};
            }
            catch (e) {
                console.error("Error while parsing settings file " + this._name + ": " + e);
                this._parseErrors = [e];
            }
        }
        return raw;
    };
    ConfigurationModelParser.prototype.doParseRaw = function (raw) {
        var _this = this;
        if (this._scopes) {
            var configurationProperties = Registry.as(Extensions.Configuration).getConfigurationProperties();
            raw = this.filterByScope(raw, configurationProperties, true, this._scopes);
        }
        var contents = toValuesTree(raw, function (message) { return console.error("Conflict in settings file " + _this._name + ": " + message); });
        var keys = Object.keys(raw);
        var overrides = toOverrides(raw, function (message) { return console.error("Conflict in settings file " + _this._name + ": " + message); });
        return { contents: contents, keys: keys, overrides: overrides };
    };
    ConfigurationModelParser.prototype.filterByScope = function (properties, configurationProperties, filterOverriddenProperties, scopes) {
        var result = {};
        for (var key in properties) {
            if (OVERRIDE_PROPERTY_PATTERN.test(key) && filterOverriddenProperties) {
                result[key] = this.filterByScope(properties[key], configurationProperties, false, scopes);
            }
            else {
                var scope = this.getScope(key, configurationProperties);
                if (scopes.indexOf(scope) !== -1) {
                    result[key] = properties[key];
                }
            }
        }
        return result;
    };
    ConfigurationModelParser.prototype.getScope = function (key, configurationProperties) {
        var propertySchema = configurationProperties[key];
        return propertySchema && typeof propertySchema.scope !== 'undefined' ? propertySchema.scope : 3 /* WINDOW */;
    };
    return ConfigurationModelParser;
}());
export { ConfigurationModelParser };
var Configuration = /** @class */ (function () {
    function Configuration(_defaultConfiguration, _localUserConfiguration, _remoteUserConfiguration, _workspaceConfiguration, _folderConfigurations, _memoryConfiguration, _memoryConfigurationByResource, _freeze) {
        if (_remoteUserConfiguration === void 0) { _remoteUserConfiguration = new ConfigurationModel(); }
        if (_workspaceConfiguration === void 0) { _workspaceConfiguration = new ConfigurationModel(); }
        if (_folderConfigurations === void 0) { _folderConfigurations = new ResourceMap(); }
        if (_memoryConfiguration === void 0) { _memoryConfiguration = new ConfigurationModel(); }
        if (_memoryConfigurationByResource === void 0) { _memoryConfigurationByResource = new ResourceMap(); }
        if (_freeze === void 0) { _freeze = true; }
        this._defaultConfiguration = _defaultConfiguration;
        this._localUserConfiguration = _localUserConfiguration;
        this._remoteUserConfiguration = _remoteUserConfiguration;
        this._workspaceConfiguration = _workspaceConfiguration;
        this._folderConfigurations = _folderConfigurations;
        this._memoryConfiguration = _memoryConfiguration;
        this._memoryConfigurationByResource = _memoryConfigurationByResource;
        this._freeze = _freeze;
        this._workspaceConsolidatedConfiguration = null;
        this._foldersConsolidatedConfigurations = new ResourceMap();
        this._userConfiguration = null;
    }
    Configuration.prototype.getValue = function (section, overrides, workspace) {
        var consolidateConfigurationModel = this.getConsolidateConfigurationModel(overrides, workspace);
        return consolidateConfigurationModel.getValue(section);
    };
    Configuration.prototype.updateValue = function (key, value, overrides) {
        if (overrides === void 0) { overrides = {}; }
        var memoryConfiguration;
        if (overrides.resource) {
            memoryConfiguration = this._memoryConfigurationByResource.get(overrides.resource);
            if (!memoryConfiguration) {
                memoryConfiguration = new ConfigurationModel();
                this._memoryConfigurationByResource.set(overrides.resource, memoryConfiguration);
            }
        }
        else {
            memoryConfiguration = this._memoryConfiguration;
        }
        if (value === undefined) {
            memoryConfiguration.removeValue(key);
        }
        else {
            memoryConfiguration.setValue(key, value);
        }
        if (!overrides.resource) {
            this._workspaceConsolidatedConfiguration = null;
        }
    };
    Configuration.prototype.inspect = function (key, overrides, workspace) {
        var consolidateConfigurationModel = this.getConsolidateConfigurationModel(overrides, workspace);
        var folderConfigurationModel = this.getFolderConfigurationModelForResource(overrides.resource, workspace);
        var memoryConfigurationModel = overrides.resource ? this._memoryConfigurationByResource.get(overrides.resource) || this._memoryConfiguration : this._memoryConfiguration;
        var defaultValue = overrides.overrideIdentifier ? this._defaultConfiguration.freeze().override(overrides.overrideIdentifier).getValue(key) : this._defaultConfiguration.freeze().getValue(key);
        var userValue = overrides.overrideIdentifier ? this.userConfiguration.freeze().override(overrides.overrideIdentifier).getValue(key) : this.userConfiguration.freeze().getValue(key);
        var userLocalValue = overrides.overrideIdentifier ? this.localUserConfiguration.freeze().override(overrides.overrideIdentifier).getValue(key) : this.localUserConfiguration.freeze().getValue(key);
        var userRemoteValue = overrides.overrideIdentifier ? this.remoteUserConfiguration.freeze().override(overrides.overrideIdentifier).getValue(key) : this.remoteUserConfiguration.freeze().getValue(key);
        var workspaceValue = workspace ? overrides.overrideIdentifier ? this._workspaceConfiguration.freeze().override(overrides.overrideIdentifier).getValue(key) : this._workspaceConfiguration.freeze().getValue(key) : undefined; //Check on workspace exists or not because _workspaceConfiguration is never null
        var workspaceFolderValue = folderConfigurationModel ? overrides.overrideIdentifier ? folderConfigurationModel.freeze().override(overrides.overrideIdentifier).getValue(key) : folderConfigurationModel.freeze().getValue(key) : undefined;
        var memoryValue = overrides.overrideIdentifier ? memoryConfigurationModel.override(overrides.overrideIdentifier).getValue(key) : memoryConfigurationModel.getValue(key);
        var value = consolidateConfigurationModel.getValue(key);
        var overrideIdentifiers = arrays.distinct(arrays.flatten(consolidateConfigurationModel.overrides.map(function (override) { return override.identifiers; }))).filter(function (overrideIdentifier) { return consolidateConfigurationModel.getOverrideValue(key, overrideIdentifier) !== undefined; });
        return {
            defaultValue: defaultValue,
            userValue: userValue,
            userLocalValue: userLocalValue,
            userRemoteValue: userRemoteValue,
            workspaceValue: workspaceValue,
            workspaceFolderValue: workspaceFolderValue,
            memoryValue: memoryValue,
            value: value,
            default: defaultValue !== undefined ? { value: this._defaultConfiguration.freeze().getValue(key), override: overrides.overrideIdentifier ? this._defaultConfiguration.freeze().getOverrideValue(key, overrides.overrideIdentifier) : undefined } : undefined,
            user: userValue !== undefined ? { value: this.userConfiguration.freeze().getValue(key), override: overrides.overrideIdentifier ? this.userConfiguration.freeze().getOverrideValue(key, overrides.overrideIdentifier) : undefined } : undefined,
            userLocal: userLocalValue !== undefined ? { value: this.localUserConfiguration.freeze().getValue(key), override: overrides.overrideIdentifier ? this.localUserConfiguration.freeze().getOverrideValue(key, overrides.overrideIdentifier) : undefined } : undefined,
            userRemote: userRemoteValue !== undefined ? { value: this.remoteUserConfiguration.freeze().getValue(key), override: overrides.overrideIdentifier ? this.remoteUserConfiguration.freeze().getOverrideValue(key, overrides.overrideIdentifier) : undefined } : undefined,
            workspace: workspaceValue !== undefined ? { value: this._workspaceConfiguration.freeze().getValue(key), override: overrides.overrideIdentifier ? this._workspaceConfiguration.freeze().getOverrideValue(key, overrides.overrideIdentifier) : undefined } : undefined,
            workspaceFolder: workspaceFolderValue !== undefined ? { value: folderConfigurationModel === null || folderConfigurationModel === void 0 ? void 0 : folderConfigurationModel.freeze().getValue(key), override: overrides.overrideIdentifier ? folderConfigurationModel === null || folderConfigurationModel === void 0 ? void 0 : folderConfigurationModel.freeze().getOverrideValue(key, overrides.overrideIdentifier) : undefined } : undefined,
            memory: memoryValue !== undefined ? { value: memoryConfigurationModel.getValue(key), override: overrides.overrideIdentifier ? memoryConfigurationModel.getOverrideValue(key, overrides.overrideIdentifier) : undefined } : undefined,
            overrideIdentifiers: overrideIdentifiers.length ? overrideIdentifiers : undefined
        };
    };
    Configuration.prototype.keys = function (workspace) {
        var folderConfigurationModel = this.getFolderConfigurationModelForResource(undefined, workspace);
        return {
            default: this._defaultConfiguration.freeze().keys,
            user: this.userConfiguration.freeze().keys,
            workspace: this._workspaceConfiguration.freeze().keys,
            workspaceFolder: folderConfigurationModel ? folderConfigurationModel.freeze().keys : []
        };
    };
    Configuration.prototype.updateDefaultConfiguration = function (defaultConfiguration) {
        this._defaultConfiguration = defaultConfiguration;
        this._workspaceConsolidatedConfiguration = null;
        this._foldersConsolidatedConfigurations.clear();
    };
    Configuration.prototype.updateLocalUserConfiguration = function (localUserConfiguration) {
        this._localUserConfiguration = localUserConfiguration;
        this._userConfiguration = null;
        this._workspaceConsolidatedConfiguration = null;
        this._foldersConsolidatedConfigurations.clear();
    };
    Configuration.prototype.updateRemoteUserConfiguration = function (remoteUserConfiguration) {
        this._remoteUserConfiguration = remoteUserConfiguration;
        this._userConfiguration = null;
        this._workspaceConsolidatedConfiguration = null;
        this._foldersConsolidatedConfigurations.clear();
    };
    Configuration.prototype.updateWorkspaceConfiguration = function (workspaceConfiguration) {
        this._workspaceConfiguration = workspaceConfiguration;
        this._workspaceConsolidatedConfiguration = null;
        this._foldersConsolidatedConfigurations.clear();
    };
    Configuration.prototype.updateFolderConfiguration = function (resource, configuration) {
        this._folderConfigurations.set(resource, configuration);
        this._foldersConsolidatedConfigurations.delete(resource);
    };
    Configuration.prototype.deleteFolderConfiguration = function (resource) {
        this.folderConfigurations.delete(resource);
        this._foldersConsolidatedConfigurations.delete(resource);
    };
    Configuration.prototype.compareAndUpdateDefaultConfiguration = function (defaults, keys) {
        var _this = this;
        var overrides = keys
            .filter(function (key) { return OVERRIDE_PROPERTY_PATTERN.test(key); })
            .map(function (key) {
            var overrideIdentifier = overrideIdentifierFromKey(key);
            var fromKeys = _this._defaultConfiguration.getKeysForOverrideIdentifier(overrideIdentifier);
            var toKeys = defaults.getKeysForOverrideIdentifier(overrideIdentifier);
            var keys = __spreadArrays(toKeys.filter(function (key) { return fromKeys.indexOf(key) === -1; }), fromKeys.filter(function (key) { return toKeys.indexOf(key) === -1; }), fromKeys.filter(function (key) { return !objects.equals(_this._defaultConfiguration.override(overrideIdentifier).getValue(key), defaults.override(overrideIdentifier).getValue(key)); }));
            return [overrideIdentifier, keys];
        });
        this.updateDefaultConfiguration(defaults);
        return { keys: keys, overrides: overrides };
    };
    Configuration.prototype.compareAndUpdateLocalUserConfiguration = function (user) {
        var _a = compare(this.localUserConfiguration, user), added = _a.added, updated = _a.updated, removed = _a.removed, overrides = _a.overrides;
        var keys = __spreadArrays(added, updated, removed);
        if (keys.length) {
            this.updateLocalUserConfiguration(user);
        }
        return { keys: keys, overrides: overrides };
    };
    Configuration.prototype.compareAndUpdateRemoteUserConfiguration = function (user) {
        var _a = compare(this.remoteUserConfiguration, user), added = _a.added, updated = _a.updated, removed = _a.removed, overrides = _a.overrides;
        var keys = __spreadArrays(added, updated, removed);
        if (keys.length) {
            this.updateRemoteUserConfiguration(user);
        }
        return { keys: keys, overrides: overrides };
    };
    Configuration.prototype.compareAndUpdateWorkspaceConfiguration = function (workspaceConfiguration) {
        var _a = compare(this.workspaceConfiguration, workspaceConfiguration), added = _a.added, updated = _a.updated, removed = _a.removed, overrides = _a.overrides;
        var keys = __spreadArrays(added, updated, removed);
        if (keys.length) {
            this.updateWorkspaceConfiguration(workspaceConfiguration);
        }
        return { keys: keys, overrides: overrides };
    };
    Configuration.prototype.compareAndUpdateFolderConfiguration = function (resource, folderConfiguration) {
        var currentFolderConfiguration = this.folderConfigurations.get(resource);
        var _a = compare(currentFolderConfiguration, folderConfiguration), added = _a.added, updated = _a.updated, removed = _a.removed, overrides = _a.overrides;
        var keys = __spreadArrays(added, updated, removed);
        if (keys.length || !currentFolderConfiguration) {
            this.updateFolderConfiguration(resource, folderConfiguration);
        }
        return { keys: keys, overrides: overrides };
    };
    Configuration.prototype.compareAndDeleteFolderConfiguration = function (folder) {
        var folderConfig = this.folderConfigurations.get(folder);
        if (!folderConfig) {
            throw new Error('Unknown folder');
        }
        this.deleteFolderConfiguration(folder);
        var _a = compare(folderConfig, undefined), added = _a.added, updated = _a.updated, removed = _a.removed, overrides = _a.overrides;
        return { keys: __spreadArrays(added, updated, removed), overrides: overrides };
    };
    Object.defineProperty(Configuration.prototype, "defaults", {
        get: function () {
            return this._defaultConfiguration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Configuration.prototype, "userConfiguration", {
        get: function () {
            if (!this._userConfiguration) {
                this._userConfiguration = this._remoteUserConfiguration.isEmpty() ? this._localUserConfiguration : this._localUserConfiguration.merge(this._remoteUserConfiguration);
                if (this._freeze) {
                    this._userConfiguration.freeze();
                }
            }
            return this._userConfiguration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Configuration.prototype, "localUserConfiguration", {
        get: function () {
            return this._localUserConfiguration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Configuration.prototype, "remoteUserConfiguration", {
        get: function () {
            return this._remoteUserConfiguration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Configuration.prototype, "workspaceConfiguration", {
        get: function () {
            return this._workspaceConfiguration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Configuration.prototype, "folderConfigurations", {
        get: function () {
            return this._folderConfigurations;
        },
        enumerable: true,
        configurable: true
    });
    Configuration.prototype.getConsolidateConfigurationModel = function (overrides, workspace) {
        var configurationModel = this.getConsolidatedConfigurationModelForResource(overrides, workspace);
        return overrides.overrideIdentifier ? configurationModel.override(overrides.overrideIdentifier) : configurationModel;
    };
    Configuration.prototype.getConsolidatedConfigurationModelForResource = function (_a, workspace) {
        var resource = _a.resource;
        var consolidateConfiguration = this.getWorkspaceConsolidatedConfiguration();
        if (workspace && resource) {
            var root = workspace.getFolder(resource);
            if (root) {
                consolidateConfiguration = this.getFolderConsolidatedConfiguration(root.uri) || consolidateConfiguration;
            }
            var memoryConfigurationForResource = this._memoryConfigurationByResource.get(resource);
            if (memoryConfigurationForResource) {
                consolidateConfiguration = consolidateConfiguration.merge(memoryConfigurationForResource);
            }
        }
        return consolidateConfiguration;
    };
    Configuration.prototype.getWorkspaceConsolidatedConfiguration = function () {
        if (!this._workspaceConsolidatedConfiguration) {
            this._workspaceConsolidatedConfiguration = this._defaultConfiguration.merge(this.userConfiguration, this._workspaceConfiguration, this._memoryConfiguration);
            if (this._freeze) {
                this._workspaceConfiguration = this._workspaceConfiguration.freeze();
            }
        }
        return this._workspaceConsolidatedConfiguration;
    };
    Configuration.prototype.getFolderConsolidatedConfiguration = function (folder) {
        var folderConsolidatedConfiguration = this._foldersConsolidatedConfigurations.get(folder);
        if (!folderConsolidatedConfiguration) {
            var workspaceConsolidateConfiguration = this.getWorkspaceConsolidatedConfiguration();
            var folderConfiguration = this._folderConfigurations.get(folder);
            if (folderConfiguration) {
                folderConsolidatedConfiguration = workspaceConsolidateConfiguration.merge(folderConfiguration);
                if (this._freeze) {
                    folderConsolidatedConfiguration = folderConsolidatedConfiguration.freeze();
                }
                this._foldersConsolidatedConfigurations.set(folder, folderConsolidatedConfiguration);
            }
            else {
                folderConsolidatedConfiguration = workspaceConsolidateConfiguration;
            }
        }
        return folderConsolidatedConfiguration;
    };
    Configuration.prototype.getFolderConfigurationModelForResource = function (resource, workspace) {
        if (workspace && resource) {
            var root = workspace.getFolder(resource);
            if (root) {
                return this._folderConfigurations.get(root.uri);
            }
        }
        return undefined;
    };
    Configuration.prototype.toData = function () {
        var _this = this;
        return {
            defaults: {
                contents: this._defaultConfiguration.contents,
                overrides: this._defaultConfiguration.overrides,
                keys: this._defaultConfiguration.keys
            },
            user: {
                contents: this.userConfiguration.contents,
                overrides: this.userConfiguration.overrides,
                keys: this.userConfiguration.keys
            },
            workspace: {
                contents: this._workspaceConfiguration.contents,
                overrides: this._workspaceConfiguration.overrides,
                keys: this._workspaceConfiguration.keys
            },
            folders: this._folderConfigurations.keys().reduce(function (result, folder) {
                var _a = _this._folderConfigurations.get(folder), contents = _a.contents, overrides = _a.overrides, keys = _a.keys;
                result.push([folder, { contents: contents, overrides: overrides, keys: keys }]);
                return result;
            }, [])
        };
    };
    Configuration.prototype.allKeys = function () {
        var keys = new Set();
        this._defaultConfiguration.freeze().keys.forEach(function (key) { return keys.add(key); });
        this.userConfiguration.freeze().keys.forEach(function (key) { return keys.add(key); });
        this._workspaceConfiguration.freeze().keys.forEach(function (key) { return keys.add(key); });
        this._folderConfigurations.forEach(function (folderConfiguraiton) { return folderConfiguraiton.freeze().keys.forEach(function (key) { return keys.add(key); }); });
        return values(keys);
    };
    Configuration.prototype.getAllKeysForOverrideIdentifier = function (overrideIdentifier) {
        var keys = new Set();
        this._defaultConfiguration.getKeysForOverrideIdentifier(overrideIdentifier).forEach(function (key) { return keys.add(key); });
        this.userConfiguration.getKeysForOverrideIdentifier(overrideIdentifier).forEach(function (key) { return keys.add(key); });
        this._workspaceConfiguration.getKeysForOverrideIdentifier(overrideIdentifier).forEach(function (key) { return keys.add(key); });
        this._folderConfigurations.forEach(function (folderConfiguraiton) { return folderConfiguraiton.getKeysForOverrideIdentifier(overrideIdentifier).forEach(function (key) { return keys.add(key); }); });
        return values(keys);
    };
    Configuration.parse = function (data) {
        var _this = this;
        var defaultConfiguration = this.parseConfigurationModel(data.defaults);
        var userConfiguration = this.parseConfigurationModel(data.user);
        var workspaceConfiguration = this.parseConfigurationModel(data.workspace);
        var folders = data.folders.reduce(function (result, value) {
            result.set(URI.revive(value[0]), _this.parseConfigurationModel(value[1]));
            return result;
        }, new ResourceMap());
        return new Configuration(defaultConfiguration, userConfiguration, new ConfigurationModel(), workspaceConfiguration, folders, new ConfigurationModel(), new ResourceMap(), false);
    };
    Configuration.parseConfigurationModel = function (model) {
        return new ConfigurationModel(model.contents, model.keys, model.overrides).freeze();
    };
    return Configuration;
}());
export { Configuration };
export function mergeChanges() {
    var changes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        changes[_i] = arguments[_i];
    }
    if (changes.length === 0) {
        return { keys: [], overrides: [] };
    }
    if (changes.length === 1) {
        return changes[0];
    }
    var keysSet = new Set();
    var overridesMap = new Map();
    for (var _a = 0, changes_1 = changes; _a < changes_1.length; _a++) {
        var change = changes_1[_a];
        change.keys.forEach(function (key) { return keysSet.add(key); });
        change.overrides.forEach(function (_a) {
            var identifier = _a[0], keys = _a[1];
            var result = getOrSet(overridesMap, identifier, new Set());
            keys.forEach(function (key) { return result.add(key); });
        });
    }
    var overrides = [];
    overridesMap.forEach(function (keys, identifier) { return overrides.push([identifier, values(keys)]); });
    return { keys: values(keysSet), overrides: overrides };
}
var ConfigurationChangeEvent = /** @class */ (function () {
    function ConfigurationChangeEvent(change, previous, currentConfiguraiton, currentWorkspace) {
        this.change = change;
        this.previous = previous;
        this.currentConfiguraiton = currentConfiguraiton;
        this.currentWorkspace = currentWorkspace;
        this._previousConfiguration = undefined;
        var keysSet = new Set();
        change.keys.forEach(function (key) { return keysSet.add(key); });
        change.overrides.forEach(function (_a) {
            var keys = _a[1];
            return keys.forEach(function (key) { return keysSet.add(key); });
        });
        this.affectedKeys = values(keysSet);
        var configurationModel = new ConfigurationModel();
        this.affectedKeys.forEach(function (key) { return configurationModel.setValue(key, {}); });
        this.affectedKeysTree = configurationModel.contents;
    }
    Object.defineProperty(ConfigurationChangeEvent.prototype, "previousConfiguration", {
        get: function () {
            if (!this._previousConfiguration && this.previous) {
                this._previousConfiguration = Configuration.parse(this.previous.data);
            }
            return this._previousConfiguration;
        },
        enumerable: true,
        configurable: true
    });
    ConfigurationChangeEvent.prototype.affectsConfiguration = function (section, overrides) {
        var _a;
        if (this.doesAffectedKeysTreeContains(this.affectedKeysTree, section)) {
            if (overrides) {
                var value1 = this.previousConfiguration ? this.previousConfiguration.getValue(section, overrides, (_a = this.previous) === null || _a === void 0 ? void 0 : _a.workspace) : undefined;
                var value2 = this.currentConfiguraiton.getValue(section, overrides, this.currentWorkspace);
                return !objects.equals(value1, value2);
            }
            return true;
        }
        return false;
    };
    ConfigurationChangeEvent.prototype.doesAffectedKeysTreeContains = function (affectedKeysTree, section) {
        var _a;
        var requestedTree = toValuesTree((_a = {}, _a[section] = true, _a), function () { });
        var key;
        while (typeof requestedTree === 'object' && (key = Object.keys(requestedTree)[0])) { // Only one key should present, since we added only one property
            affectedKeysTree = affectedKeysTree[key];
            if (!affectedKeysTree) {
                return false; // Requested tree is not found
            }
            requestedTree = requestedTree[key];
        }
        return true;
    };
    return ConfigurationChangeEvent;
}());
export { ConfigurationChangeEvent };
var AllKeysConfigurationChangeEvent = /** @class */ (function (_super) {
    __extends(AllKeysConfigurationChangeEvent, _super);
    function AllKeysConfigurationChangeEvent(configuration, workspace, source, sourceConfig) {
        var _this = _super.call(this, { keys: configuration.allKeys(), overrides: [] }, undefined, configuration, workspace) || this;
        _this.source = source;
        _this.sourceConfig = sourceConfig;
        return _this;
    }
    return AllKeysConfigurationChangeEvent;
}(ConfigurationChangeEvent));
export { AllKeysConfigurationChangeEvent };
