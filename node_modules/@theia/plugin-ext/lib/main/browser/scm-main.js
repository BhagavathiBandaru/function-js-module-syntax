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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.ScmMainImpl = exports.PluginScmProvider = exports.PluginScmResource = exports.PluginScmResourceGroup = void 0;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// code copied and modified from https://github.com/microsoft/vscode/blob/1.52.1/src/vs/workbench/api/browser/mainThreadSCM.ts
var plugin_api_rpc_1 = require("../../common/plugin-api-rpc");
var scm_service_1 = require("@theia/scm/lib/browser/scm-service");
var event_1 = require("@theia/core/lib/common/event");
var disposable_1 = require("@theia/core/lib/common/disposable");
var uri_1 = require("@theia/core/lib/common/uri");
var vscode_uri_1 = require("vscode-uri");
var color_registry_1 = require("@theia/core/lib/browser/color-registry");
var PluginScmResourceGroup = /** @class */ (function () {
    function PluginScmResourceGroup(handle, provider, features, label, id) {
        this.handle = handle;
        this.provider = provider;
        this.features = features;
        this.label = label;
        this.id = id;
        this.resources = [];
        this.onDidSpliceEmitter = new event_1.Emitter();
        this.onDidSplice = this.onDidSpliceEmitter.event;
        this.onDidChangeEmitter = new event_1.Emitter();
        this.onDidChange = this.onDidChangeEmitter.event;
    }
    Object.defineProperty(PluginScmResourceGroup.prototype, "hideWhenEmpty", {
        get: function () { return !!this.features.hideWhenEmpty; },
        enumerable: false,
        configurable: true
    });
    PluginScmResourceGroup.prototype.splice = function (start, deleteCount, toInsert) {
        var _a;
        (_a = this.resources).splice.apply(_a, __spread([start, deleteCount], toInsert));
        this.onDidSpliceEmitter.fire({ start: start, deleteCount: deleteCount, toInsert: toInsert });
    };
    PluginScmResourceGroup.prototype.updateGroup = function (features) {
        this.features = __assign(__assign({}, this.features), features);
        this.onDidChangeEmitter.fire();
    };
    PluginScmResourceGroup.prototype.updateGroupLabel = function (label) {
        this.label = label;
        this.onDidChangeEmitter.fire();
    };
    PluginScmResourceGroup.prototype.dispose = function () { };
    return PluginScmResourceGroup;
}());
exports.PluginScmResourceGroup = PluginScmResourceGroup;
var PluginScmResource = /** @class */ (function () {
    function PluginScmResource(proxy, sourceControlHandle, groupHandle, handle, sourceUri, group, decorations, contextValue, command) {
        this.proxy = proxy;
        this.sourceControlHandle = sourceControlHandle;
        this.groupHandle = groupHandle;
        this.handle = handle;
        this.sourceUri = sourceUri;
        this.group = group;
        this.decorations = decorations;
        this.contextValue = contextValue;
        this.command = command;
    }
    PluginScmResource.prototype.open = function () {
        return this.proxy.$executeResourceCommand(this.sourceControlHandle, this.groupHandle, this.handle);
    };
    return PluginScmResource;
}());
exports.PluginScmResource = PluginScmResource;
var PluginScmProvider = /** @class */ (function () {
    function PluginScmProvider(proxy, colors, _handle, _contextValue, _label, _rootUri) {
        this.proxy = proxy;
        this.colors = colors;
        this._handle = _handle;
        this._contextValue = _contextValue;
        this._label = _label;
        this._rootUri = _rootUri;
        this._id = this.contextValue;
        this.groups = [];
        this.groupsByHandle = Object.create(null);
        this.onDidChangeResourcesEmitter = new event_1.Emitter();
        this.onDidChangeResources = this.onDidChangeResourcesEmitter.event;
        this.features = {};
        this.onDidChangeCommitTemplateEmitter = new event_1.Emitter();
        this.onDidChangeCommitTemplate = this.onDidChangeCommitTemplateEmitter.event;
        this.onDidChangeStatusBarCommandsEmitter = new event_1.Emitter();
        this.onDidChangeEmitter = new event_1.Emitter();
        this.onDidChange = this.onDidChangeEmitter.event;
    }
    Object.defineProperty(PluginScmProvider.prototype, "id", {
        get: function () { return this._id; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PluginScmProvider.prototype, "handle", {
        get: function () { return this._handle; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PluginScmProvider.prototype, "label", {
        get: function () { return this._label; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PluginScmProvider.prototype, "rootUri", {
        get: function () { return this._rootUri ? this._rootUri.toString() : ''; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PluginScmProvider.prototype, "contextValue", {
        get: function () { return this._contextValue; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PluginScmProvider.prototype, "commitTemplate", {
        get: function () { return this.features.commitTemplate || ''; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PluginScmProvider.prototype, "acceptInputCommand", {
        get: function () {
            var command = this.features.acceptInputCommand;
            if (command) {
                var scmCommand = command;
                scmCommand.command = command.id;
                return scmCommand;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PluginScmProvider.prototype, "statusBarCommands", {
        get: function () {
            var commands = this.features.statusBarCommands;
            return commands === null || commands === void 0 ? void 0 : commands.map(function (command) {
                var scmCommand = command;
                scmCommand.command = command.id;
                return scmCommand;
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PluginScmProvider.prototype, "count", {
        get: function () { return this.features.count; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PluginScmProvider.prototype, "onDidChangeStatusBarCommands", {
        get: function () { return this.onDidChangeStatusBarCommandsEmitter.event; },
        enumerable: false,
        configurable: true
    });
    PluginScmProvider.prototype.updateSourceControl = function (features) {
        this.features = __assign(__assign({}, this.features), features);
        this.onDidChangeEmitter.fire();
        if (typeof features.commitTemplate !== 'undefined') {
            this.onDidChangeCommitTemplateEmitter.fire(this.commitTemplate);
        }
        if (typeof features.statusBarCommands !== 'undefined') {
            this.onDidChangeStatusBarCommandsEmitter.fire(this.statusBarCommands);
        }
    };
    PluginScmProvider.prototype.registerGroups = function (resourceGroups) {
        var _a;
        var _this = this;
        var groups = resourceGroups.map(function (resourceGroup) {
            var handle = resourceGroup.handle, id = resourceGroup.id, label = resourceGroup.label, features = resourceGroup.features;
            var group = new PluginScmResourceGroup(handle, _this, features, label, id);
            _this.groupsByHandle[handle] = group;
            return group;
        });
        (_a = this.groups).splice.apply(_a, __spread([this.groups.length, 0], groups));
    };
    PluginScmProvider.prototype.updateGroup = function (handle, features) {
        var group = this.groupsByHandle[handle];
        if (!group) {
            return;
        }
        group.updateGroup(features);
    };
    PluginScmProvider.prototype.updateGroupLabel = function (handle, label) {
        var group = this.groupsByHandle[handle];
        if (!group) {
            return;
        }
        group.updateGroupLabel(label);
    };
    PluginScmProvider.prototype.spliceGroupResourceStates = function (splices) {
        var e_1, _a;
        var _this = this;
        var _loop_1 = function (splice) {
            var e_2, _a;
            var groupHandle = splice.handle;
            var groupSlices = splice.splices;
            var group = this_1.groupsByHandle[groupHandle];
            if (!group) {
                console.warn("SCM group " + groupHandle + " not found in provider " + this_1.label);
                return "continue";
            }
            // reverse the splices sequence in order to apply them correctly
            groupSlices.reverse();
            try {
                for (var groupSlices_1 = (e_2 = void 0, __values(groupSlices)), groupSlices_1_1 = groupSlices_1.next(); !groupSlices_1_1.done; groupSlices_1_1 = groupSlices_1.next()) {
                    var groupSlice = groupSlices_1_1.value;
                    var start = groupSlice.start, deleteCount = groupSlice.deleteCount, rawResources = groupSlice.rawResources;
                    var resources = rawResources.map(function (rawResource) {
                        var handle = rawResource.handle, sourceUri = rawResource.sourceUri, icons = rawResource.icons, tooltip = rawResource.tooltip, strikeThrough = rawResource.strikeThrough, faded = rawResource.faded, contextValue = rawResource.contextValue, command = rawResource.command;
                        var icon = icons[0];
                        var iconDark = icons[1] || icon;
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        var colorVariable = rawResource.colorId && _this.colors.toCssVariableName(rawResource.colorId);
                        var decorations = {
                            icon: icon ? vscode_uri_1.URI.revive(icon) : undefined,
                            iconDark: iconDark ? vscode_uri_1.URI.revive(iconDark) : undefined,
                            tooltip: tooltip,
                            strikeThrough: strikeThrough,
                            // TODO remove the letter and colorId fields when the FileDecorationProvider is applied, see https://github.com/eclipse-theia/theia/pull/8911
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            letter: rawResource.letter || '',
                            color: colorVariable && "var(" + colorVariable + ")",
                            faded: faded
                        };
                        return new PluginScmResource(_this.proxy, _this.handle, groupHandle, handle, new uri_1.default(vscode_uri_1.URI.revive(sourceUri)), group, decorations, contextValue || undefined, command);
                    });
                    group.splice(start, deleteCount, resources);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (groupSlices_1_1 && !groupSlices_1_1.done && (_a = groupSlices_1.return)) _a.call(groupSlices_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        };
        var this_1 = this;
        try {
            for (var splices_1 = __values(splices), splices_1_1 = splices_1.next(); !splices_1_1.done; splices_1_1 = splices_1.next()) {
                var splice = splices_1_1.value;
                _loop_1(splice);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (splices_1_1 && !splices_1_1.done && (_a = splices_1.return)) _a.call(splices_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.onDidChangeResourcesEmitter.fire();
    };
    PluginScmProvider.prototype.unregisterGroup = function (handle) {
        var group = this.groupsByHandle[handle];
        if (!group) {
            return;
        }
        delete this.groupsByHandle[handle];
        this.groups.splice(this.groups.indexOf(group), 1);
    };
    PluginScmProvider.prototype.dispose = function () { };
    return PluginScmProvider;
}());
exports.PluginScmProvider = PluginScmProvider;
var ScmMainImpl = /** @class */ (function () {
    function ScmMainImpl(rpc, container) {
        this.repositories = new Map();
        this.repositoryDisposables = new Map();
        this.disposables = new disposable_1.DisposableCollection();
        this.proxy = rpc.getProxy(plugin_api_rpc_1.MAIN_RPC_CONTEXT.SCM_EXT);
        this.scmService = container.get(scm_service_1.ScmService);
        this.colors = container.get(color_registry_1.ColorRegistry);
    }
    ScmMainImpl.prototype.dispose = function () {
        this.repositories.forEach(function (r) { return r.dispose(); });
        this.repositories.clear();
        this.repositoryDisposables.forEach(function (d) { return d.dispose(); });
        this.repositoryDisposables.clear();
        this.disposables.dispose();
    };
    ScmMainImpl.prototype.$registerSourceControl = function (handle, id, label, rootUri) {
        return __awaiter(this, void 0, void 0, function () {
            var provider, repository, disposables;
            var _this = this;
            return __generator(this, function (_a) {
                provider = new PluginScmProvider(this.proxy, this.colors, handle, id, label, rootUri ? vscode_uri_1.URI.revive(rootUri) : undefined);
                repository = this.scmService.registerScmProvider(provider, {
                    input: {
                        validator: function (value) { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.proxy.$validateInput(handle, value, value.length)];
                                    case 1:
                                        result = _a.sent();
                                        return [2 /*return*/, result && { message: result[0], type: result[1] }];
                                }
                            });
                        }); }
                    }
                });
                this.repositories.set(handle, repository);
                disposables = new disposable_1.DisposableCollection(this.scmService.onDidChangeSelectedRepository(function (r) {
                    if (r === repository) {
                        _this.proxy.$setSelectedSourceControl(handle);
                    }
                }), repository.input.onDidChange(function () { return _this.proxy.$onInputBoxValueChange(handle, repository.input.value); }));
                if (this.scmService.selectedRepository === repository) {
                    setTimeout(function () { return _this.proxy.$setSelectedSourceControl(handle); }, 0);
                }
                if (repository.input.value) {
                    setTimeout(function () { return _this.proxy.$onInputBoxValueChange(handle, repository.input.value); }, 0);
                }
                this.repositoryDisposables.set(handle, disposables);
                return [2 /*return*/];
            });
        });
    };
    ScmMainImpl.prototype.$updateSourceControl = function (handle, features) {
        return __awaiter(this, void 0, void 0, function () {
            var repository, provider;
            return __generator(this, function (_a) {
                repository = this.repositories.get(handle);
                if (!repository) {
                    return [2 /*return*/];
                }
                provider = repository.provider;
                provider.updateSourceControl(features);
                return [2 /*return*/];
            });
        });
    };
    ScmMainImpl.prototype.$unregisterSourceControl = function (handle) {
        return __awaiter(this, void 0, void 0, function () {
            var repository;
            return __generator(this, function (_a) {
                repository = this.repositories.get(handle);
                if (!repository) {
                    return [2 /*return*/];
                }
                this.repositoryDisposables.get(handle).dispose();
                this.repositoryDisposables.delete(handle);
                repository.dispose();
                this.repositories.delete(handle);
                return [2 /*return*/];
            });
        });
    };
    ScmMainImpl.prototype.$registerGroups = function (sourceControlHandle, groups, splices) {
        var repository = this.repositories.get(sourceControlHandle);
        if (!repository) {
            return;
        }
        var provider = repository.provider;
        provider.registerGroups(groups);
        provider.spliceGroupResourceStates(splices);
    };
    ScmMainImpl.prototype.$updateGroup = function (sourceControlHandle, groupHandle, features) {
        var repository = this.repositories.get(sourceControlHandle);
        if (!repository) {
            return;
        }
        var provider = repository.provider;
        provider.updateGroup(groupHandle, features);
    };
    ScmMainImpl.prototype.$updateGroupLabel = function (sourceControlHandle, groupHandle, label) {
        var repository = this.repositories.get(sourceControlHandle);
        if (!repository) {
            return;
        }
        var provider = repository.provider;
        provider.updateGroupLabel(groupHandle, label);
    };
    ScmMainImpl.prototype.$spliceResourceStates = function (sourceControlHandle, splices) {
        var repository = this.repositories.get(sourceControlHandle);
        if (!repository) {
            return;
        }
        var provider = repository.provider;
        provider.spliceGroupResourceStates(splices);
    };
    ScmMainImpl.prototype.$unregisterGroup = function (sourceControlHandle, handle) {
        var repository = this.repositories.get(sourceControlHandle);
        if (!repository) {
            return;
        }
        var provider = repository.provider;
        provider.unregisterGroup(handle);
    };
    ScmMainImpl.prototype.$setInputBoxValue = function (sourceControlHandle, value) {
        var repository = this.repositories.get(sourceControlHandle);
        if (!repository) {
            return;
        }
        repository.input.value = value;
    };
    ScmMainImpl.prototype.$setInputBoxPlaceholder = function (sourceControlHandle, placeholder) {
        var repository = this.repositories.get(sourceControlHandle);
        if (!repository) {
            return;
        }
        repository.input.placeholder = placeholder;
    };
    return ScmMainImpl;
}());
exports.ScmMainImpl = ScmMainImpl;
//# sourceMappingURL=scm-main.js.map