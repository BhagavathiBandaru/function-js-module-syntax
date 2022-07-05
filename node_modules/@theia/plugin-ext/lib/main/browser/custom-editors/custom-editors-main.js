"use strict";
/********************************************************************************
 * Copyright (c) 2021 SAP SE or an SAP affiliate company and others.
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
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// some code copied and modified from https://github.com/microsoft/vscode/blob/53eac52308c4611000a171cc7bf1214293473c78/src/vs/workbench/api/browser/mainThreadCustomEditors.ts
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
exports.CustomTextEditorModel = exports.MainCustomEditorModel = exports.CustomEditorsMainImpl = void 0;
var plugin_api_rpc_1 = require("../../../common/plugin-api-rpc");
var hosted_plugin_1 = require("../../../hosted/browser/hosted-plugin");
var plugin_custom_editor_registry_1 = require("./plugin-custom-editor-registry");
var custom_editor_widget_1 = require("./custom-editor-widget");
var core_1 = require("@theia/core");
var vscode_uri_1 = require("vscode-uri");
var uri_1 = require("@theia/core/lib/common/uri");
var disposable_1 = require("@theia/core/lib/common/disposable");
var cancellation_1 = require("@theia/core/lib/common/cancellation");
var text_editor_model_service_1 = require("../text-editor-model-service");
var custom_editor_service_1 = require("./custom-editor-service");
var file_service_1 = require("@theia/filesystem/lib/browser/file-service");
var undo_redo_service_1 = require("./undo-redo-service");
var widget_manager_1 = require("@theia/core/lib/browser/widget-manager");
var browser_1 = require("@theia/core/lib/browser");
var browser_2 = require("@theia/editor/lib/browser");
var plugin_api_rpc_2 = require("../../../common/plugin-api-rpc");
var CustomEditorsMainImpl = /** @class */ (function () {
    function CustomEditorsMainImpl(rpc, container, webviewsMain) {
        this.webviewsMain = webviewsMain;
        this.editorProviders = new Map();
        this.pluginService = container.get(hosted_plugin_1.HostedPluginSupport);
        this.shell = container.get(browser_1.ApplicationShell);
        this.textModelService = container.get(text_editor_model_service_1.EditorModelService);
        this.fileService = container.get(file_service_1.FileService);
        this.customEditorService = container.get(custom_editor_service_1.CustomEditorService);
        this.undoRedoService = container.get(undo_redo_service_1.UndoRedoService);
        this.customEditorRegistry = container.get(plugin_custom_editor_registry_1.PluginCustomEditorRegistry);
        this.labelProvider = container.get(browser_1.DefaultUriLabelProviderContribution);
        this.editorPreferences = container.get(browser_2.EditorPreferences);
        this.widgetManager = container.get(widget_manager_1.WidgetManager);
        this.proxy = rpc.getProxy(plugin_api_rpc_1.MAIN_RPC_CONTEXT.CUSTOM_EDITORS_EXT);
    }
    CustomEditorsMainImpl.prototype.dispose = function () {
        var e_1, _a;
        try {
            for (var _b = __values(this.editorProviders.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var disposable = _c.value;
                disposable.dispose();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.editorProviders.clear();
    };
    CustomEditorsMainImpl.prototype.$registerTextEditorProvider = function (viewType, options, capabilities) {
        this.registerEditorProvider(1 /* Text */, viewType, options, capabilities, true);
    };
    CustomEditorsMainImpl.prototype.$registerCustomEditorProvider = function (viewType, options, supportsMultipleEditorsPerDocument) {
        this.registerEditorProvider(0 /* Custom */, viewType, options, {}, supportsMultipleEditorsPerDocument);
    };
    CustomEditorsMainImpl.prototype.registerEditorProvider = function (modelType, viewType, options, capabilities, supportsMultipleEditorsPerDocument) {
        return __awaiter(this, void 0, void 0, function () {
            var disposables;
            var _this = this;
            return __generator(this, function (_a) {
                if (this.editorProviders.has(viewType)) {
                    throw new Error("Provider for " + viewType + " already registered");
                }
                disposables = new disposable_1.DisposableCollection();
                disposables.push(this.customEditorRegistry.registerResolver(viewType, function (widget) { return __awaiter(_this, void 0, void 0, function () {
                    var resource, identifier, cancellationSource, modelRef, onMoveCancelTokenSource_1, _cancellationSource;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                resource = widget.resource, identifier = widget.identifier;
                                widget.options = options;
                                cancellationSource = new cancellation_1.CancellationTokenSource();
                                return [4 /*yield*/, this.getOrCreateCustomEditorModel(modelType, resource, viewType, cancellationSource.token)];
                            case 1:
                                modelRef = _a.sent();
                                widget.modelRef = modelRef;
                                widget.onDidDispose(function () {
                                    // If the model is still dirty, make sure we have time to save it
                                    if (modelRef.object.dirty) {
                                        var sub_1 = modelRef.object.onDirtyChanged(function () {
                                            if (!modelRef.object.dirty) {
                                                sub_1.dispose();
                                                modelRef.dispose();
                                            }
                                        });
                                        return;
                                    }
                                    modelRef.dispose();
                                });
                                if (capabilities.supportsMove) {
                                    onMoveCancelTokenSource_1 = new cancellation_1.CancellationTokenSource();
                                    widget.onMove(function (newResource) { return __awaiter(_this, void 0, void 0, function () {
                                        var oldModel;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    oldModel = modelRef;
                                                    return [4 /*yield*/, this.getOrCreateCustomEditorModel(modelType, newResource, viewType, onMoveCancelTokenSource_1.token)];
                                                case 1:
                                                    modelRef = _a.sent();
                                                    this.proxy.$onMoveCustomEditor(identifier.id, vscode_uri_1.URI.file(newResource.path.toString()), viewType);
                                                    oldModel.dispose();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                }
                                _cancellationSource = new cancellation_1.CancellationTokenSource();
                                return [4 /*yield*/, this.proxy.$resolveWebviewEditor(vscode_uri_1.URI.file(resource.path.toString()), identifier.id, viewType, this.labelProvider.getName(resource), plugin_api_rpc_2.EditorPosition.ONE, // TODO: fix this when Theia has support splitting editors,
                                    options, _cancellationSource.token)];
                            case 2:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); }));
                this.editorProviders.set(viewType, disposables);
                return [2 /*return*/];
            });
        });
    };
    CustomEditorsMainImpl.prototype.$unregisterEditorProvider = function (viewType) {
        var provider = this.editorProviders.get(viewType);
        if (!provider) {
            throw new Error("No provider for " + viewType + " registered");
        }
        provider.dispose();
        this.editorProviders.delete(viewType);
        this.customEditorService.models.disposeAllModelsForView(viewType);
    };
    CustomEditorsMainImpl.prototype.getOrCreateCustomEditorModel = function (modelType, resource, viewType, cancellationToken) {
        return __awaiter(this, void 0, void 0, function () {
            var existingModel, model, model;
            return __generator(this, function (_a) {
                existingModel = this.customEditorService.models.tryRetain(resource, viewType);
                if (existingModel) {
                    return [2 /*return*/, existingModel];
                }
                switch (modelType) {
                    case 1 /* Text */: {
                        model = CustomTextEditorModel.create(viewType, resource, this.textModelService, this.fileService);
                        return [2 /*return*/, this.customEditorService.models.add(resource, viewType, model)];
                    }
                    case 0 /* Custom */: {
                        model = MainCustomEditorModel.create(this.proxy, viewType, resource, this.undoRedoService, this.fileService, this.editorPreferences, cancellationToken);
                        return [2 /*return*/, this.customEditorService.models.add(resource, viewType, model)];
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    CustomEditorsMainImpl.prototype.getCustomEditorModel = function (resourceComponents, viewType) {
        return __awaiter(this, void 0, void 0, function () {
            var resource, model;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resource = vscode_uri_1.URI.revive(resourceComponents);
                        return [4 /*yield*/, this.customEditorService.models.get(new uri_1.default(resource), viewType)];
                    case 1:
                        model = _a.sent();
                        if (!model || !(model instanceof MainCustomEditorModel)) {
                            throw new Error('Could not find model for custom editor');
                        }
                        return [2 /*return*/, model];
                }
            });
        });
    };
    CustomEditorsMainImpl.prototype.$onDidEdit = function (resourceComponents, viewType, editId, label) {
        return __awaiter(this, void 0, void 0, function () {
            var model;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCustomEditorModel(resourceComponents, viewType)];
                    case 1:
                        model = _a.sent();
                        model.pushEdit(editId, label);
                        return [2 /*return*/];
                }
            });
        });
    };
    CustomEditorsMainImpl.prototype.$onContentChange = function (resourceComponents, viewType) {
        return __awaiter(this, void 0, void 0, function () {
            var model;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCustomEditorModel(resourceComponents, viewType)];
                    case 1:
                        model = _a.sent();
                        model.changeContent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CustomEditorsMainImpl.prototype.$createCustomEditorPanel = function (panelId, title, viewColumn, options) {
        return __awaiter(this, void 0, void 0, function () {
            var view, enableFindWidget, retainContextWhenHidden, enableScripts, localResourceRoots, contentOptions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.widgetManager.getOrCreateWidget(custom_editor_widget_1.CustomEditorWidget.FACTORY_ID, { id: panelId })];
                    case 1:
                        view = _a.sent();
                        this.webviewsMain.hookWebview(view);
                        view.title.label = title;
                        enableFindWidget = options.enableFindWidget, retainContextWhenHidden = options.retainContextWhenHidden, enableScripts = options.enableScripts, localResourceRoots = options.localResourceRoots, contentOptions = __rest(options, ["enableFindWidget", "retainContextWhenHidden", "enableScripts", "localResourceRoots"]);
                        view.viewColumn = viewColumn;
                        view.options = { enableFindWidget: enableFindWidget, retainContextWhenHidden: retainContextWhenHidden };
                        view.setContentOptions(__assign(__assign({ allowScripts: enableScripts, localResourceRoots: localResourceRoots && localResourceRoots.map(function (root) { return root.toString(); }) }, contentOptions), view.contentOptions));
                        if (view.isAttached) {
                            if (view.isVisible) {
                                this.shell.revealWidget(view.id);
                            }
                            return [2 /*return*/];
                        }
                        this.webviewsMain.addOrReattachWidget(view, { preserveFocus: true });
                        return [2 /*return*/];
                }
            });
        });
    };
    return CustomEditorsMainImpl;
}());
exports.CustomEditorsMainImpl = CustomEditorsMainImpl;
var MainCustomEditorModel = /** @class */ (function () {
    function MainCustomEditorModel(proxy, viewType, editorResource, editable, undoRedoService, fileService, editorPreferences) {
        var _this = this;
        this.proxy = proxy;
        this.viewType = viewType;
        this.editorResource = editorResource;
        this.editable = editable;
        this.undoRedoService = undoRedoService;
        this.fileService = fileService;
        this.editorPreferences = editorPreferences;
        this.currentEditIndex = -1;
        this.savePoint = -1;
        this.isDirtyFromContentChange = false;
        this.edits = [];
        this.toDispose = new disposable_1.DisposableCollection();
        this.onDirtyChangedEmitter = new core_1.Emitter();
        this.onDirtyChanged = this.onDirtyChangedEmitter.event;
        this.autoSave = this.editorPreferences.get('editor.autoSave', undefined, editorResource.toString());
        this.autoSaveDelay = this.editorPreferences.get('editor.autoSaveDelay', undefined, editorResource.toString());
        this.toDispose.push(this.editorPreferences.onPreferenceChanged(function (event) {
            if (event.preferenceName === 'editor.autoSave') {
                _this.autoSave = _this.editorPreferences.get('editor.autoSave', undefined, editorResource.toString());
            }
            if (event.preferenceName === 'editor.autoSaveDelay') {
                _this.autoSaveDelay = _this.editorPreferences.get('editor.autoSaveDelay', undefined, editorResource.toString());
            }
        }));
        this.toDispose.push(this.onDirtyChangedEmitter);
    }
    MainCustomEditorModel.create = function (proxy, viewType, resource, undoRedoService, fileService, editorPreferences, cancellation) {
        return __awaiter(this, void 0, void 0, function () {
            var editable;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, proxy.$createCustomDocument(vscode_uri_1.URI.file(resource.path.toString()), viewType, undefined, cancellation)];
                    case 1:
                        editable = (_a.sent()).editable;
                        return [2 /*return*/, new MainCustomEditorModel(proxy, viewType, resource, editable, undoRedoService, fileService, editorPreferences)];
                }
            });
        });
    };
    Object.defineProperty(MainCustomEditorModel.prototype, "resource", {
        get: function () {
            return vscode_uri_1.URI.file(this.editorResource.path.toString());
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MainCustomEditorModel.prototype, "dirty", {
        get: function () {
            if (this.isDirtyFromContentChange) {
                return true;
            }
            if (this.edits.length > 0) {
                return this.savePoint !== this.currentEditIndex;
            }
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MainCustomEditorModel.prototype, "readonly", {
        get: function () {
            return !this.editable;
        },
        enumerable: false,
        configurable: true
    });
    MainCustomEditorModel.prototype.setProxy = function (proxy) {
        this.proxy = proxy;
    };
    MainCustomEditorModel.prototype.dispose = function () {
        if (this.editable) {
            this.undoRedoService.removeElements(this.editorResource);
        }
        this.proxy.$disposeCustomDocument(this.resource, this.viewType);
    };
    MainCustomEditorModel.prototype.changeContent = function () {
        var _this = this;
        this.change(function () {
            _this.isDirtyFromContentChange = true;
        });
    };
    MainCustomEditorModel.prototype.pushEdit = function (editId, label) {
        var _this = this;
        if (!this.editable) {
            throw new Error('Document is not editable');
        }
        this.change(function () {
            _this.spliceEdits(editId);
            _this.currentEditIndex = _this.edits.length - 1;
        });
        this.undoRedoService.pushElement(this.editorResource, function () { return _this.undo(); }, function () { return _this.redo(); });
    };
    MainCustomEditorModel.prototype.revert = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var cancellationSource;
            var _this = this;
            return __generator(this, function (_a) {
                if (!this.editable) {
                    return [2 /*return*/];
                }
                if (this.currentEditIndex === this.savePoint && !this.isDirtyFromContentChange) {
                    return [2 /*return*/];
                }
                cancellationSource = new cancellation_1.CancellationTokenSource();
                this.proxy.$revert(this.resource, this.viewType, cancellationSource.token);
                this.change(function () {
                    _this.isDirtyFromContentChange = false;
                    _this.currentEditIndex = _this.savePoint;
                    _this.spliceEdits();
                });
                return [2 /*return*/];
            });
        });
    };
    MainCustomEditorModel.prototype.save = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.saveCustomEditor(options)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MainCustomEditorModel.prototype.saveCustomEditor = function (options) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var cancelable, savePromise;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.editable) {
                            return [2 /*return*/];
                        }
                        cancelable = new cancellation_1.CancellationTokenSource();
                        savePromise = this.proxy.$onSave(this.resource, this.viewType, cancelable.token);
                        (_a = this.ongoingSave) === null || _a === void 0 ? void 0 : _a.cancel();
                        this.ongoingSave = cancelable;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, , 3, 4]);
                        return [4 /*yield*/, savePromise];
                    case 2:
                        _b.sent();
                        if (this.ongoingSave === cancelable) { // Make sure we are still doing the same save
                            this.change(function () {
                                _this.isDirtyFromContentChange = false;
                                _this.savePoint = _this.currentEditIndex;
                            });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        if (this.ongoingSave === cancelable) { // Make sure we are still doing the same save
                            this.ongoingSave = undefined;
                        }
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MainCustomEditorModel.prototype.saveCustomEditorAs = function (resource, targetResource, options) {
        return __awaiter(this, void 0, void 0, function () {
            var source;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.editable) return [3 /*break*/, 2];
                        source = new cancellation_1.CancellationTokenSource();
                        return [4 /*yield*/, this.proxy.$onSaveAs(this.resource, this.viewType, vscode_uri_1.URI.file(targetResource.path.toString()), source.token)];
                    case 1:
                        _a.sent();
                        this.change(function () {
                            _this.savePoint = _this.currentEditIndex;
                        });
                        return [3 /*break*/, 4];
                    case 2: 
                    // Since the editor is readonly, just copy the file over
                    return [4 /*yield*/, this.fileService.copy(resource, targetResource, { overwrite: false })];
                    case 3:
                        // Since the editor is readonly, just copy the file over
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MainCustomEditorModel.prototype.undo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var undoneEdit;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.editable) {
                            return [2 /*return*/];
                        }
                        if (this.currentEditIndex < 0) {
                            // nothing to undo
                            return [2 /*return*/];
                        }
                        undoneEdit = this.edits[this.currentEditIndex];
                        this.change(function () {
                            --_this.currentEditIndex;
                        });
                        return [4 /*yield*/, this.proxy.$undo(this.resource, this.viewType, undoneEdit, this.dirty)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MainCustomEditorModel.prototype.redo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var redoneEdit;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.editable) {
                            return [2 /*return*/];
                        }
                        if (this.currentEditIndex >= this.edits.length - 1) {
                            // nothing to redo
                            return [2 /*return*/];
                        }
                        redoneEdit = this.edits[this.currentEditIndex + 1];
                        this.change(function () {
                            ++_this.currentEditIndex;
                        });
                        return [4 /*yield*/, this.proxy.$redo(this.resource, this.viewType, redoneEdit, this.dirty)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MainCustomEditorModel.prototype.spliceEdits = function (editToInsert) {
        var start = this.currentEditIndex + 1;
        var toRemove = this.edits.length - this.currentEditIndex;
        var removedEdits = typeof editToInsert === 'number'
            ? this.edits.splice(start, toRemove, editToInsert)
            : this.edits.splice(start, toRemove);
        if (removedEdits.length) {
            this.proxy.$disposeEdits(this.resource, this.viewType, removedEdits);
        }
    };
    MainCustomEditorModel.prototype.change = function (makeEdit) {
        var _this = this;
        var wasDirty = this.dirty;
        makeEdit();
        if (this.dirty !== wasDirty) {
            this.onDirtyChangedEmitter.fire();
        }
        if (this.autoSave === 'on') {
            var handle_1 = window.setTimeout(function () {
                _this.save();
                window.clearTimeout(handle_1);
            }, this.autoSaveDelay);
        }
    };
    return MainCustomEditorModel;
}());
exports.MainCustomEditorModel = MainCustomEditorModel;
// copied from https://github.com/microsoft/vscode/blob/53eac52308c4611000a171cc7bf1214293473c78/src/vs/workbench/contrib/customEditor/common/customTextEditorModel.ts
var CustomTextEditorModel = /** @class */ (function () {
    function CustomTextEditorModel(viewType, editorResource, model, fileService) {
        var _this = this;
        this.viewType = viewType;
        this.editorResource = editorResource;
        this.model = model;
        this.fileService = fileService;
        this.toDispose = new disposable_1.DisposableCollection();
        this.onDirtyChangedEmitter = new core_1.Emitter();
        this.onDirtyChanged = this.onDirtyChangedEmitter.event;
        this.toDispose.push(this.editorTextModel.onDirtyChanged(function (e) {
            _this.onDirtyChangedEmitter.fire();
        }));
        this.toDispose.push(this.onDirtyChangedEmitter);
    }
    CustomTextEditorModel.create = function (viewType, resource, editorModelService, fileService) {
        return __awaiter(this, void 0, void 0, function () {
            var model;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, editorModelService.createModelReference(resource)];
                    case 1:
                        model = _a.sent();
                        model.object.suppressOpenEditorWhenDirty = true;
                        return [2 /*return*/, new CustomTextEditorModel(viewType, resource, model, fileService)];
                }
            });
        });
    };
    CustomTextEditorModel.prototype.dispose = function () {
        this.toDispose.dispose();
        this.model.dispose();
    };
    Object.defineProperty(CustomTextEditorModel.prototype, "resource", {
        get: function () {
            return vscode_uri_1.URI.file(this.editorResource.path.toString());
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomTextEditorModel.prototype, "dirty", {
        get: function () {
            return this.editorTextModel.dirty;
        },
        enumerable: false,
        configurable: true
    });
    ;
    Object.defineProperty(CustomTextEditorModel.prototype, "readonly", {
        get: function () {
            return this.editorTextModel.readOnly;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomTextEditorModel.prototype, "editorTextModel", {
        get: function () {
            return this.model.object;
        },
        enumerable: false,
        configurable: true
    });
    CustomTextEditorModel.prototype.revert = function (options) {
        return this.editorTextModel.revert(options);
    };
    CustomTextEditorModel.prototype.save = function (options) {
        return this.saveCustomEditor(options);
    };
    CustomTextEditorModel.prototype.saveCustomEditor = function (options) {
        return this.editorTextModel.save(options);
    };
    CustomTextEditorModel.prototype.saveCustomEditorAs = function (resource, targetResource, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.saveCustomEditor(options)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.fileService.copy(resource, targetResource, { overwrite: false })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return CustomTextEditorModel;
}());
exports.CustomTextEditorModel = CustomTextEditorModel;
//# sourceMappingURL=custom-editors-main.js.map