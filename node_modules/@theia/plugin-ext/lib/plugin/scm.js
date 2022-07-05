"use strict";
/********************************************************************************
 * Copyright (C) 2019-2021 Red Hat, Inc. and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScmExtImpl = exports.ScmInputBoxImpl = void 0;
var event_1 = require("@theia/core/lib/common/event");
var common_1 = require("../common");
var disposable_1 = require("@theia/core/lib/common/disposable");
var vscode_uri_1 = require("vscode-uri");
var plugin_api_rpc_1 = require("../common/plugin-api-rpc");
var paths_1 = require("@theia/callhierarchy/lib/common/paths");
function getIconResource(decorations) {
    if (!decorations) {
        return undefined;
    }
    else if (typeof decorations.iconPath === 'string') {
        return vscode_uri_1.URI.file(decorations.iconPath);
    }
    else {
        return decorations.iconPath;
    }
}
function comparePaths(one, other, caseSensitive) {
    if (caseSensitive === void 0) { caseSensitive = false; }
    var oneParts = one.split(paths_1.sep);
    var otherParts = other.split(paths_1.sep);
    var lastOne = oneParts.length - 1;
    var lastOther = otherParts.length - 1;
    var endOne;
    var endOther;
    for (var i = 0;; i++) {
        endOne = lastOne === i;
        endOther = lastOther === i;
        if (endOne && endOther) {
            var onePart = caseSensitive ? oneParts[i].toLocaleLowerCase() : oneParts[i];
            var otherPart = caseSensitive ? otherParts[i].toLocaleLowerCase() : otherParts[i];
            return onePart > otherPart ? -1 : 1;
        }
        else if (endOne) {
            return -1;
        }
        else if (endOther) {
            return 1;
        }
        if (endOne) {
            return -1;
        }
        else if (endOther) {
            return 1;
        }
        var result = comparePathComponents(oneParts[i], otherParts[i], caseSensitive);
        if (result !== 0) {
            return result;
        }
    }
}
function comparePathComponents(one, other, caseSensitive) {
    if (caseSensitive === void 0) { caseSensitive = false; }
    if (!caseSensitive) {
        one = one && one.toLowerCase();
        other = other && other.toLowerCase();
    }
    if (one === other) {
        return 0;
    }
    return one < other ? -1 : 1;
}
function compareResourceThemableDecorations(a, b) {
    if (!a.iconPath && !b.iconPath) {
        return 0;
    }
    else if (!a.iconPath) {
        return -1;
    }
    else if (!b.iconPath) {
        return 1;
    }
    var aPath = typeof a.iconPath === 'string' ? a.iconPath : a.iconPath.fsPath;
    var bPath = typeof b.iconPath === 'string' ? b.iconPath : b.iconPath.fsPath;
    return comparePaths(aPath, bPath);
}
function compareResourceStatesDecorations(a, b) {
    var result = 0;
    if (a.strikeThrough !== b.strikeThrough) {
        return a.strikeThrough ? 1 : -1;
    }
    if (a.faded !== b.faded) {
        return a.faded ? 1 : -1;
    }
    if (a.tooltip !== b.tooltip) {
        return (a.tooltip || '').localeCompare(b.tooltip || '');
    }
    result = compareResourceThemableDecorations(a, b);
    if (result !== 0) {
        return result;
    }
    if (a.light && b.light) {
        result = compareResourceThemableDecorations(a.light, b.light);
    }
    else if (a.light) {
        return 1;
    }
    else if (b.light) {
        return -1;
    }
    if (result !== 0) {
        return result;
    }
    if (a.dark && b.dark) {
        result = compareResourceThemableDecorations(a.dark, b.dark);
    }
    else if (a.dark) {
        return 1;
    }
    else if (b.dark) {
        return -1;
    }
    return result;
}
function compareCommands(a, b) {
    if (a.command !== b.command) {
        return a.command < b.command ? -1 : 1;
    }
    if (a.title !== b.title) {
        return a.title < b.title ? -1 : 1;
    }
    if (a.tooltip !== b.tooltip) {
        if (a.tooltip !== undefined && b.tooltip !== undefined) {
            return a.tooltip < b.tooltip ? -1 : 1;
        }
        else if (a.tooltip !== undefined) {
            return 1;
        }
        else if (b.tooltip !== undefined) {
            return -1;
        }
    }
    if (a.arguments === b.arguments) {
        return 0;
    }
    else if (!a.arguments) {
        return -1;
    }
    else if (!b.arguments) {
        return 1;
    }
    else if (a.arguments.length !== b.arguments.length) {
        return a.arguments.length - b.arguments.length;
    }
    for (var i = 0; i < a.arguments.length; i++) {
        var aArg = a.arguments[i];
        var bArg = b.arguments[i];
        if (aArg === bArg) {
            continue;
        }
        return aArg < bArg ? -1 : 1;
    }
    return 0;
}
function compareResourceStates(a, b) {
    var result = comparePaths(a.resourceUri.fsPath, b.resourceUri.fsPath, true);
    if (result !== 0) {
        return result;
    }
    if (a.command && b.command) {
        result = compareCommands(a.command, b.command);
    }
    else if (a.command) {
        return 1;
    }
    else if (b.command) {
        return -1;
    }
    if (result !== 0) {
        return result;
    }
    if (a.decorations && b.decorations) {
        result = compareResourceStatesDecorations(a.decorations, b.decorations);
    }
    else if (a.decorations) {
        return 1;
    }
    else if (b.decorations) {
        return -1;
    }
    return result;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function compareArgs(a, b) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}
function commandEquals(a, b) {
    return a.command === b.command
        && a.title === b.title
        && a.tooltip === b.tooltip
        && (a.arguments && b.arguments ? compareArgs(a.arguments, b.arguments) : a.arguments === b.arguments);
}
function commandListEquals(a, b) {
    return equals(a, b, commandEquals);
}
function equals(one, other, itemEquals) {
    if (itemEquals === void 0) { itemEquals = function (a, b) { return a === b; }; }
    if (one === other) {
        return true;
    }
    if (!one || !other) {
        return false;
    }
    if (one.length !== other.length) {
        return false;
    }
    for (var i = 0, len = one.length; i < len; i++) {
        if (!itemEquals(one[i], other[i])) {
            return false;
        }
    }
    return true;
}
var ScmInputBoxImpl = /** @class */ (function () {
    function ScmInputBoxImpl(plugin, proxy, sourceControlHandle) {
        this.plugin = plugin;
        this.proxy = proxy;
        this.sourceControlHandle = sourceControlHandle;
        this._value = '';
        this.onDidChangeEmitter = new event_1.Emitter();
        this._placeholder = '';
        // noop
    }
    Object.defineProperty(ScmInputBoxImpl.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this.proxy.$setInputBoxValue(this.sourceControlHandle, value);
            this.updateValue(value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScmInputBoxImpl.prototype, "onDidChange", {
        get: function () {
            return this.onDidChangeEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScmInputBoxImpl.prototype, "placeholder", {
        get: function () {
            return this._placeholder;
        },
        set: function (placeholder) {
            this.proxy.$setInputBoxPlaceholder(this.sourceControlHandle, placeholder);
            this._placeholder = placeholder;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScmInputBoxImpl.prototype, "validateInput", {
        get: function () {
            return this._validateInput;
        },
        set: function (fn) {
            if (fn && typeof fn !== 'function') {
                throw new Error("[" + this.plugin.model.id + "]: Invalid SCM input box validation function");
            }
            this._validateInput = fn;
        },
        enumerable: false,
        configurable: true
    });
    ScmInputBoxImpl.prototype.onInputBoxValueChange = function (value) {
        this.updateValue(value);
    };
    ScmInputBoxImpl.prototype.updateValue = function (value) {
        this._value = value;
        this.onDidChangeEmitter.fire(value);
    };
    return ScmInputBoxImpl;
}());
exports.ScmInputBoxImpl = ScmInputBoxImpl;
var SsmResourceGroupImpl = /** @class */ (function () {
    function SsmResourceGroupImpl(proxy, commands, sourceControlHandle, _id, _label) {
        this.proxy = proxy;
        this.commands = commands;
        this.sourceControlHandle = sourceControlHandle;
        this._id = _id;
        this._label = _label;
        this.resourceHandlePool = 0;
        this._resourceStates = [];
        this.resourceStatesMap = new Map();
        this.resourceStatesCommandsMap = new Map();
        this.resourceStatesDisposablesMap = new Map();
        this.onDidUpdateResourceStatesEmitter = new event_1.Emitter();
        this.onDidUpdateResourceStates = this.onDidUpdateResourceStatesEmitter.event;
        this._disposed = false;
        this.onDidDisposeEmitter = new event_1.Emitter();
        this.onDidDispose = this.onDidDisposeEmitter.event;
        this.handlesSnapshot = [];
        this.resourceSnapshot = [];
        this._hideWhenEmpty = undefined;
        this.handle = SsmResourceGroupImpl.handlePool++;
    }
    Object.defineProperty(SsmResourceGroupImpl.prototype, "disposed", {
        get: function () { return this._disposed; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SsmResourceGroupImpl.prototype, "id", {
        get: function () { return this._id; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SsmResourceGroupImpl.prototype, "label", {
        get: function () { return this._label; },
        set: function (label) {
            this._label = label;
            this.proxy.$updateGroupLabel(this.sourceControlHandle, this.handle, label);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SsmResourceGroupImpl.prototype, "hideWhenEmpty", {
        get: function () { return this._hideWhenEmpty; },
        set: function (hideWhenEmpty) {
            this._hideWhenEmpty = hideWhenEmpty;
            this.proxy.$updateGroup(this.sourceControlHandle, this.handle, this.features);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SsmResourceGroupImpl.prototype, "features", {
        get: function () {
            return {
                hideWhenEmpty: this.hideWhenEmpty
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SsmResourceGroupImpl.prototype, "resourceStates", {
        get: function () { return __spread(this._resourceStates); },
        set: function (resources) {
            this._resourceStates = __spread(resources);
            this.onDidUpdateResourceStatesEmitter.fire();
        },
        enumerable: false,
        configurable: true
    });
    SsmResourceGroupImpl.prototype.getResourceState = function (handle) {
        return this.resourceStatesMap.get(handle);
    };
    SsmResourceGroupImpl.prototype.executeResourceCommand = function (handle) {
        var _this = this;
        var command = this.resourceStatesCommandsMap.get(handle);
        if (!command) {
            return Promise.resolve(undefined);
        }
        return new Promise(function () {
            var _a;
            return (_a = _this.commands).executeCommand.apply(_a, __spread([command.command], (command.arguments || [])));
        });
    };
    SsmResourceGroupImpl.prototype.takeResourceStateSnapshot = function () {
        var e_1, _a, _b, e_2, _c;
        var _this = this;
        var _d;
        var snapshot = __spread(this._resourceStates);
        var diffs = sortedDiff(this.resourceSnapshot, snapshot, compareResourceStates);
        var splices = diffs.map(function (diff) {
            var toInsert = diff.toInsert.map(function (r) {
                var handle = _this.resourceHandlePool++;
                _this.resourceStatesMap.set(handle, r);
                var sourceUri = r.resourceUri;
                var iconUri = getIconResource(r.decorations);
                var lightIconUri = r.decorations && getIconResource(r.decorations.light) || iconUri;
                var darkIconUri = r.decorations && getIconResource(r.decorations.dark) || iconUri;
                var icons = [];
                var command;
                if (r.command) {
                    if (r.command.command === 'theia.open' || r.command.command === 'theia.diff') {
                        var disposables = new disposable_1.DisposableCollection();
                        command = _this.commands.converter.toSafeCommand(r.command, disposables);
                        _this.resourceStatesDisposablesMap.set(handle, disposables);
                    }
                    else {
                        _this.resourceStatesCommandsMap.set(handle, r.command);
                    }
                }
                if (lightIconUri) {
                    icons.push(lightIconUri);
                }
                if (darkIconUri && (darkIconUri.toString() !== (lightIconUri === null || lightIconUri === void 0 ? void 0 : lightIconUri.toString()))) {
                    icons.push(darkIconUri);
                }
                var tooltip = (r.decorations && r.decorations.tooltip) || '';
                var strikeThrough = r.decorations && !!r.decorations.strikeThrough;
                var faded = r.decorations && !!r.decorations.faded;
                var contextValue = r.contextValue || '';
                // TODO remove the letter and colorId fields when the FileDecorationProvider is applied, see https://github.com/eclipse-theia/theia/pull/8911
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var rawResource = { handle: handle, sourceUri: sourceUri, letter: r.letter, colorId: r.color.id, icons: icons,
                    tooltip: tooltip, strikeThrough: strikeThrough, faded: faded, contextValue: contextValue, command: command };
                return { rawResource: rawResource, handle: handle };
            });
            var start = diff.start, deleteCount = diff.deleteCount;
            return { start: start, deleteCount: deleteCount, toInsert: toInsert };
        });
        var rawResourceSplices = splices
            .map(function (_a) {
            var start = _a.start, deleteCount = _a.deleteCount, toInsert = _a.toInsert;
            return ({
                start: start,
                deleteCount: deleteCount,
                rawResources: toInsert.map(function (i) { return i.rawResource; })
            });
        });
        var reverseSplices = splices.reverse();
        try {
            for (var reverseSplices_1 = __values(reverseSplices), reverseSplices_1_1 = reverseSplices_1.next(); !reverseSplices_1_1.done; reverseSplices_1_1 = reverseSplices_1.next()) {
                var _e = reverseSplices_1_1.value, start = _e.start, deleteCount = _e.deleteCount, toInsert = _e.toInsert;
                var handles = toInsert.map(function (i) { return i.handle; });
                var handlesToDelete = (_b = this.handlesSnapshot).splice.apply(_b, __spread([start, deleteCount], handles));
                try {
                    for (var handlesToDelete_1 = (e_2 = void 0, __values(handlesToDelete)), handlesToDelete_1_1 = handlesToDelete_1.next(); !handlesToDelete_1_1.done; handlesToDelete_1_1 = handlesToDelete_1.next()) {
                        var handle = handlesToDelete_1_1.value;
                        this.resourceStatesMap.delete(handle);
                        this.resourceStatesCommandsMap.delete(handle);
                        (_d = this.resourceStatesDisposablesMap.get(handle)) === null || _d === void 0 ? void 0 : _d.dispose();
                        this.resourceStatesDisposablesMap.delete(handle);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (handlesToDelete_1_1 && !handlesToDelete_1_1.done && (_c = handlesToDelete_1.return)) _c.call(handlesToDelete_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (reverseSplices_1_1 && !reverseSplices_1_1.done && (_a = reverseSplices_1.return)) _a.call(reverseSplices_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.resourceSnapshot = snapshot;
        return rawResourceSplices;
    };
    SsmResourceGroupImpl.prototype.dispose = function () {
        this._disposed = true;
        this.onDidDisposeEmitter.fire();
    };
    SsmResourceGroupImpl.handlePool = 0;
    return SsmResourceGroupImpl;
}());
var SourceControlImpl = /** @class */ (function () {
    function SourceControlImpl(plugin, proxy, commands, _id, _label, _rootUri) {
        this.proxy = proxy;
        this.commands = commands;
        this._id = _id;
        this._label = _label;
        this._rootUri = _rootUri;
        this.groups = new Map();
        this._count = undefined;
        this._quickDiffProvider = undefined;
        this._commitTemplate = undefined;
        this.acceptInputDisposables = new disposable_1.DisposableCollection();
        this._acceptInputCommand = undefined;
        this._statusBarDisposables = new disposable_1.DisposableCollection();
        this._statusBarCommands = undefined;
        this._selected = false;
        this.onDidChangeSelectionEmitter = new event_1.Emitter();
        this.onDidChangeSelection = this.onDidChangeSelectionEmitter.event;
        this.handle = SourceControlImpl.handlePool++;
        this.createdResourceGroups = new Map();
        this.updatedResourceGroups = new Set();
        this._inputBox = new ScmInputBoxImpl(plugin, this.proxy, this.handle);
        this.proxy.$registerSourceControl(this.handle, _id, _label, _rootUri);
    }
    Object.defineProperty(SourceControlImpl.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SourceControlImpl.prototype, "label", {
        get: function () {
            return this._label;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SourceControlImpl.prototype, "rootUri", {
        get: function () {
            return this._rootUri;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SourceControlImpl.prototype, "inputBox", {
        get: function () { return this._inputBox; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SourceControlImpl.prototype, "count", {
        get: function () {
            return this._count;
        },
        set: function (count) {
            if (this._count === count) {
                return;
            }
            this._count = count;
            this.proxy.$updateSourceControl(this.handle, { count: count });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SourceControlImpl.prototype, "quickDiffProvider", {
        get: function () {
            return this._quickDiffProvider;
        },
        set: function (quickDiffProvider) {
            this._quickDiffProvider = quickDiffProvider;
            this.proxy.$updateSourceControl(this.handle, { hasQuickDiffProvider: !!quickDiffProvider });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SourceControlImpl.prototype, "commitTemplate", {
        get: function () {
            return this._commitTemplate;
        },
        set: function (commitTemplate) {
            if (commitTemplate === this._commitTemplate) {
                return;
            }
            this._commitTemplate = commitTemplate;
            this.proxy.$updateSourceControl(this.handle, { commitTemplate: commitTemplate });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SourceControlImpl.prototype, "acceptInputCommand", {
        get: function () {
            return this._acceptInputCommand;
        },
        set: function (acceptInputCommand) {
            this.acceptInputDisposables = new disposable_1.DisposableCollection();
            this._acceptInputCommand = acceptInputCommand;
            var internal = this.commands.converter.toSafeCommand(acceptInputCommand, this.acceptInputDisposables);
            this.proxy.$updateSourceControl(this.handle, { acceptInputCommand: internal });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SourceControlImpl.prototype, "statusBarCommands", {
        get: function () {
            return this._statusBarCommands;
        },
        set: function (statusBarCommands) {
            var _this = this;
            if (this._statusBarCommands && statusBarCommands && commandListEquals(this._statusBarCommands, statusBarCommands)) {
                return;
            }
            this._statusBarDisposables = new disposable_1.DisposableCollection();
            this._statusBarCommands = statusBarCommands;
            var internal = (statusBarCommands || []).map(function (c) { return _this.commands.converter.toSafeCommand(c, _this._statusBarDisposables); });
            this.proxy.$updateSourceControl(this.handle, { statusBarCommands: internal });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SourceControlImpl.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        enumerable: false,
        configurable: true
    });
    SourceControlImpl.prototype.createResourceGroup = function (id, label) {
        var _this = this;
        var group = new SsmResourceGroupImpl(this.proxy, this.commands, this.handle, id, label);
        var disposable = group.onDidDispose(function () { return _this.createdResourceGroups.delete(group); });
        this.createdResourceGroups.set(group, disposable);
        this.eventuallyAddResourceGroups();
        return group;
    };
    SourceControlImpl.prototype.eventuallyAddResourceGroups = function () {
        var e_3, _a;
        var _this = this;
        var groups = [];
        var splices = [];
        var _loop_1 = function (group, disposable) {
            disposable.dispose();
            var updateListener = group.onDidUpdateResourceStates(function () {
                _this.updatedResourceGroups.add(group);
                _this.eventuallyUpdateResourceStates();
            });
            group.onDidDispose(function () {
                _this.updatedResourceGroups.delete(group);
                updateListener.dispose();
                _this.groups.delete(group.handle);
                _this.proxy.$unregisterGroup(_this.handle, group.handle);
            });
            var handle = group.handle, id = group.id, label = group.label, features = group.features;
            groups.push({ handle: handle, id: id, label: label, features: features });
            var snapshot = group.takeResourceStateSnapshot();
            if (snapshot.length > 0) {
                splices.push({ handle: group.handle, splices: snapshot });
            }
            this_1.groups.set(group.handle, group);
        };
        var this_1 = this;
        try {
            for (var _b = __values(this.createdResourceGroups), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), group = _d[0], disposable = _d[1];
                _loop_1(group, disposable);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        this.proxy.$registerGroups(this.handle, groups, splices);
        this.createdResourceGroups.clear();
    };
    SourceControlImpl.prototype.eventuallyUpdateResourceStates = function () {
        var splices = [];
        this.updatedResourceGroups.forEach(function (group) {
            var snapshot = group.takeResourceStateSnapshot();
            if (snapshot.length === 0) {
                return;
            }
            splices.push({ handle: group.handle, splices: snapshot });
        });
        if (splices.length > 0) {
            this.proxy.$spliceResourceStates(this.handle, splices);
        }
        this.updatedResourceGroups.clear();
    };
    SourceControlImpl.prototype.getResourceGroup = function (handle) {
        return this.groups.get(handle);
    };
    SourceControlImpl.prototype.setSelectionState = function (selected) {
        this._selected = selected;
        this.onDidChangeSelectionEmitter.fire(selected);
    };
    SourceControlImpl.prototype.dispose = function () {
        this.acceptInputDisposables.dispose();
        this._statusBarDisposables.dispose();
        this.groups.forEach(function (group) { return group.dispose(); });
        this.proxy.$unregisterSourceControl(this.handle);
    };
    SourceControlImpl.handlePool = 0;
    return SourceControlImpl;
}());
var ScmExtImpl = /** @class */ (function () {
    function ScmExtImpl(rpc, commands) {
        var _this = this;
        this.commands = commands;
        this.sourceControls = new Map();
        this.sourceControlsByExtension = new Map();
        this.onDidChangeActiveProviderEmitter = new event_1.Emitter();
        this.proxy = rpc.getProxy(common_1.PLUGIN_RPC_CONTEXT.SCM_MAIN);
        commands.registerArgumentProcessor({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            processArgument: function (arg) {
                if (!plugin_api_rpc_1.ScmCommandArg.is(arg)) {
                    return arg;
                }
                var sourceControl = _this.sourceControls.get(arg.sourceControlHandle);
                if (!sourceControl) {
                    return undefined;
                }
                if (typeof arg.resourceGroupHandle !== 'number') {
                    return sourceControl;
                }
                var resourceGroup = sourceControl.getResourceGroup(arg.resourceGroupHandle);
                if (typeof arg.resourceStateHandle !== 'number') {
                    return resourceGroup;
                }
                return resourceGroup && resourceGroup.getResourceState(arg.resourceStateHandle);
            }
        });
    }
    Object.defineProperty(ScmExtImpl.prototype, "onDidChangeActiveProvider", {
        get: function () { return this.onDidChangeActiveProviderEmitter.event; },
        enumerable: false,
        configurable: true
    });
    ScmExtImpl.prototype.createSourceControl = function (extension, id, label, rootUri) {
        var handle = ScmExtImpl.handlePool++;
        var sourceControl = new SourceControlImpl(extension, this.proxy, this.commands, id, label, rootUri);
        this.sourceControls.set(handle, sourceControl);
        var sourceControls = this.sourceControlsByExtension.get(extension.model.id) || [];
        sourceControls.push(sourceControl);
        this.sourceControlsByExtension.set(extension.model.id, sourceControls);
        return sourceControl;
    };
    ScmExtImpl.prototype.getLastInputBox = function (extension) {
        var sourceControls = this.sourceControlsByExtension.get(extension.model.id);
        var sourceControl = sourceControls && sourceControls[sourceControls.length - 1];
        return sourceControl && sourceControl.inputBox;
    };
    ScmExtImpl.prototype.$provideOriginalResource = function (sourceControlHandle, uriComponents, token) {
        var sourceControl = this.sourceControls.get(sourceControlHandle);
        if (!sourceControl || !sourceControl.quickDiffProvider || !sourceControl.quickDiffProvider.provideOriginalResource) {
            return Promise.resolve(undefined);
        }
        return new Promise(function () { return sourceControl.quickDiffProvider.provideOriginalResource(vscode_uri_1.URI.file(uriComponents), token); })
            .then(function (r) { return r || undefined; });
    };
    ScmExtImpl.prototype.$onInputBoxValueChange = function (sourceControlHandle, value) {
        var sourceControl = this.sourceControls.get(sourceControlHandle);
        if (!sourceControl) {
            return Promise.resolve(undefined);
        }
        sourceControl.inputBox.onInputBoxValueChange(value);
        return Promise.resolve(undefined);
    };
    ScmExtImpl.prototype.$executeResourceCommand = function (sourceControlHandle, groupHandle, handle) {
        var sourceControl = this.sourceControls.get(sourceControlHandle);
        if (!sourceControl) {
            return Promise.resolve(undefined);
        }
        var group = sourceControl.getResourceGroup(groupHandle);
        if (!group) {
            return Promise.resolve(undefined);
        }
        return group.executeResourceCommand(handle);
    };
    ScmExtImpl.prototype.$validateInput = function (sourceControlHandle, value, cursorPosition) {
        return __awaiter(this, void 0, void 0, function () {
            var sourceControl, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sourceControl = this.sourceControls.get(sourceControlHandle);
                        if (!sourceControl) {
                            return [2 /*return*/, Promise.resolve(undefined)];
                        }
                        if (!sourceControl.inputBox.validateInput) {
                            return [2 /*return*/, Promise.resolve(undefined)];
                        }
                        return [4 /*yield*/, sourceControl.inputBox.validateInput(value, cursorPosition)];
                    case 1:
                        result = _a.sent();
                        if (!result) {
                            return [2 /*return*/, Promise.resolve(undefined)];
                        }
                        return [2 /*return*/, [result.message, result.type]];
                }
            });
        });
    };
    ScmExtImpl.prototype.$setSelectedSourceControl = function (selectedSourceControlHandle) {
        var _a, _b;
        if (selectedSourceControlHandle !== undefined) {
            (_a = this.sourceControls.get(selectedSourceControlHandle)) === null || _a === void 0 ? void 0 : _a.setSelectionState(true);
        }
        if (this.selectedSourceControlHandle !== undefined) {
            (_b = this.sourceControls.get(this.selectedSourceControlHandle)) === null || _b === void 0 ? void 0 : _b.setSelectionState(false);
        }
        this.selectedSourceControlHandle = selectedSourceControlHandle;
        return Promise.resolve(undefined);
    };
    ScmExtImpl.handlePool = 0;
    return ScmExtImpl;
}());
exports.ScmExtImpl = ScmExtImpl;
/**
 * Diffs two *sorted* arrays and computes the splices which apply the diff.
 */
function sortedDiff(before, after, compare) {
    var result = [];
    function pushSplice(start, deleteCount, toInsert) {
        var _a;
        if (deleteCount === 0 && toInsert.length === 0) {
            return;
        }
        var latest = result[result.length - 1];
        if (latest && latest.start + latest.deleteCount === start) {
            latest.deleteCount += deleteCount;
            (_a = latest.toInsert).push.apply(_a, __spread(toInsert));
        }
        else {
            result.push({ start: start, deleteCount: deleteCount, toInsert: toInsert });
        }
    }
    var beforeIdx = 0;
    var afterIdx = 0;
    while (true) {
        if (beforeIdx === before.length) {
            pushSplice(beforeIdx, 0, after.slice(afterIdx));
            break;
        }
        if (afterIdx === after.length) {
            pushSplice(beforeIdx, before.length - beforeIdx, []);
            break;
        }
        var beforeElement = before[beforeIdx];
        var afterElement = after[afterIdx];
        var n = compare(beforeElement, afterElement);
        if (n === 0) {
            // equal
            beforeIdx += 1;
            afterIdx += 1;
        }
        else if (n < 0) {
            // beforeElement is smaller -> before element removed
            pushSplice(beforeIdx, 1, []);
            beforeIdx += 1;
        }
        else if (n > 0) {
            // beforeElement is greater -> after element added
            pushSplice(beforeIdx, 0, [afterElement]);
            afterIdx += 1;
        }
    }
    return result;
}
//# sourceMappingURL=scm.js.map