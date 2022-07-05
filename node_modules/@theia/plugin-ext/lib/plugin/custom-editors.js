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
// copied and modified from https://github.com/microsoft/vscode/blob/53eac52308c4611000a171cc7bf1214293473c78/src/vs/workbench/api/common/extHostCustomEditors.ts
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
exports.CustomEditorsExtImpl = void 0;
var plugin_api_rpc_1 = require("../common/plugin-api-rpc");
var vscode_uri_1 = require("vscode-uri");
var webviews_1 = require("./webviews");
var cancellation_1 = require("@theia/core/lib/common/cancellation");
var disposable_1 = require("@theia/core/lib/common/disposable");
var types_impl_1 = require("./types-impl");
var Converters = require("./type-converters");
var CustomEditorsExtImpl = /** @class */ (function () {
    function CustomEditorsExtImpl(rpc, documentExt, webviewExt, workspace) {
        this.documentExt = documentExt;
        this.webviewExt = webviewExt;
        this.workspace = workspace;
        this.editorProviders = new EditorProviderStore();
        this.documents = new CustomDocumentStore();
        this.proxy = rpc.getProxy(plugin_api_rpc_1.PLUGIN_RPC_CONTEXT.CUSTOM_EDITORS_MAIN);
    }
    CustomEditorsExtImpl.prototype.registerCustomEditorProvider = function (viewType, provider, options, plugin) {
        var _this = this;
        var disposables = new disposable_1.DisposableCollection();
        if ('resolveCustomTextEditor' in provider) {
            disposables.push(this.editorProviders.addTextProvider(viewType, plugin, provider));
            this.proxy.$registerTextEditorProvider(viewType, options.webviewOptions || {}, {
                supportsMove: !!provider.moveCustomTextEditor,
            });
        }
        else {
            disposables.push(this.editorProviders.addCustomProvider(viewType, plugin, provider));
            if (this.supportEditing(provider)) {
                disposables.push(provider.onDidChangeCustomDocument(function (e) {
                    var entry = _this.getCustomDocumentEntry(viewType, e.document.uri);
                    if (isEditEvent(e)) {
                        var editId = entry.addEdit(e);
                        _this.proxy.$onDidEdit(e.document.uri, viewType, editId, e.label);
                    }
                    else {
                        _this.proxy.$onContentChange(e.document.uri, viewType);
                    }
                }));
            }
            this.proxy.$registerCustomEditorProvider(viewType, options.webviewOptions || {}, !!options.supportsMultipleEditorsPerDocument);
        }
        return types_impl_1.Disposable.from(disposables, types_impl_1.Disposable.create(function () {
            _this.proxy.$unregisterEditorProvider(viewType);
        }));
    };
    CustomEditorsExtImpl.prototype.$createCustomDocument = function (resource, viewType, backupId, cancellation) {
        return __awaiter(this, void 0, void 0, function () {
            var entry, revivedResource, document;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entry = this.editorProviders.get(viewType);
                        if (!entry) {
                            throw new Error("No provider found for '" + viewType + "'");
                        }
                        if (entry.type !== 1 /* Custom */) {
                            throw new Error("Invalid provide type for '" + viewType + "'");
                        }
                        revivedResource = vscode_uri_1.URI.revive(resource);
                        return [4 /*yield*/, entry.provider.openCustomDocument(revivedResource, { backupId: backupId }, cancellation)];
                    case 1:
                        document = _a.sent();
                        this.documents.add(viewType, document);
                        return [2 /*return*/, { editable: this.supportEditing(entry.provider) }];
                }
            });
        });
    };
    CustomEditorsExtImpl.prototype.$disposeCustomDocument = function (resource, viewType) {
        return __awaiter(this, void 0, void 0, function () {
            var entry, revivedResource, document;
            return __generator(this, function (_a) {
                entry = this.editorProviders.get(viewType);
                if (!entry) {
                    throw new Error("No provider found for '" + viewType + "'");
                }
                if (entry.type !== 1 /* Custom */) {
                    throw new Error("Invalid provider type for '" + viewType + "'");
                }
                revivedResource = vscode_uri_1.URI.revive(resource);
                document = this.getCustomDocumentEntry(viewType, revivedResource).document;
                this.documents.delete(viewType, document);
                document.dispose();
                return [2 /*return*/];
            });
        });
    };
    CustomEditorsExtImpl.prototype.$resolveWebviewEditor = function (resource, handler, viewType, title, position, options, cancellation) {
        return __awaiter(this, void 0, void 0, function () {
            var entry, viewColumn, panel, webviewOptions, revivedResource, document_1, document_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entry = this.editorProviders.get(viewType);
                        if (!entry) {
                            throw new Error("No provider found for '" + viewType + "'");
                        }
                        viewColumn = Converters.toViewColumn(position);
                        panel = this.webviewExt.createWebviewPanel(viewType, title, {}, options, entry.plugin, handler);
                        webviewOptions = webviews_1.WebviewImpl.toWebviewOptions(options, this.workspace, entry.plugin);
                        return [4 /*yield*/, this.proxy.$createCustomEditorPanel(handler, title, viewColumn, webviewOptions)];
                    case 1:
                        _a.sent();
                        revivedResource = vscode_uri_1.URI.revive(resource);
                        switch (entry.type) {
                            case 1 /* Custom */: {
                                document_1 = this.getCustomDocumentEntry(viewType, revivedResource).document;
                                return [2 /*return*/, entry.provider.resolveCustomEditor(document_1, panel, cancellation)];
                            }
                            case 0 /* Text */: {
                                document_2 = this.documentExt.getDocument(revivedResource);
                                return [2 /*return*/, entry.provider.resolveCustomTextEditor(document_2, panel, cancellation)];
                            }
                            default: {
                                throw new Error('Unknown webview provider type');
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CustomEditorsExtImpl.prototype.getCustomDocumentEntry = function (viewType, resource) {
        var entry = this.documents.get(viewType, vscode_uri_1.URI.revive(resource));
        if (!entry) {
            throw new Error('No custom document found');
        }
        return entry;
    };
    CustomEditorsExtImpl.prototype.$disposeEdits = function (resourceComponents, viewType, editIds) {
        var document = this.getCustomDocumentEntry(viewType, resourceComponents);
        document.disposeEdits(editIds);
    };
    CustomEditorsExtImpl.prototype.$onMoveCustomEditor = function (handle, newResourceComponents, viewType) {
        return __awaiter(this, void 0, void 0, function () {
            var entry, webview, resource, document, cancellationSource;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entry = this.editorProviders.get(viewType);
                        if (!entry) {
                            throw new Error("No provider found for '" + viewType + "'");
                        }
                        if (!entry.provider.moveCustomTextEditor) {
                            throw new Error("Provider does not implement move '" + viewType + "'");
                        }
                        webview = this.webviewExt.getWebviewPanel(handle);
                        if (!webview) {
                            throw new Error('No webview found');
                        }
                        resource = vscode_uri_1.URI.revive(newResourceComponents);
                        document = this.documentExt.getDocument(resource);
                        cancellationSource = new cancellation_1.CancellationTokenSource();
                        return [4 /*yield*/, entry.provider.moveCustomTextEditor(document, webview, cancellationSource.token)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CustomEditorsExtImpl.prototype.$undo = function (resourceComponents, viewType, editId, isDirty) {
        return __awaiter(this, void 0, void 0, function () {
            var entry;
            return __generator(this, function (_a) {
                entry = this.getCustomDocumentEntry(viewType, resourceComponents);
                return [2 /*return*/, entry.undo(editId, isDirty)];
            });
        });
    };
    CustomEditorsExtImpl.prototype.$redo = function (resourceComponents, viewType, editId, isDirty) {
        return __awaiter(this, void 0, void 0, function () {
            var entry;
            return __generator(this, function (_a) {
                entry = this.getCustomDocumentEntry(viewType, resourceComponents);
                return [2 /*return*/, entry.redo(editId, isDirty)];
            });
        });
    };
    CustomEditorsExtImpl.prototype.$revert = function (resourceComponents, viewType, cancellation) {
        return __awaiter(this, void 0, void 0, function () {
            var entry, provider;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entry = this.getCustomDocumentEntry(viewType, resourceComponents);
                        provider = this.getCustomEditorProvider(viewType);
                        return [4 /*yield*/, provider.revertCustomDocument(entry.document, cancellation)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CustomEditorsExtImpl.prototype.$onSave = function (resourceComponents, viewType, cancellation) {
        return __awaiter(this, void 0, void 0, function () {
            var entry, provider;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entry = this.getCustomDocumentEntry(viewType, resourceComponents);
                        provider = this.getCustomEditorProvider(viewType);
                        return [4 /*yield*/, provider.saveCustomDocument(entry.document, cancellation)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CustomEditorsExtImpl.prototype.$onSaveAs = function (resourceComponents, viewType, targetResource, cancellation) {
        return __awaiter(this, void 0, void 0, function () {
            var entry, provider;
            return __generator(this, function (_a) {
                entry = this.getCustomDocumentEntry(viewType, resourceComponents);
                provider = this.getCustomEditorProvider(viewType);
                return [2 /*return*/, provider.saveCustomDocumentAs(entry.document, vscode_uri_1.URI.revive(targetResource), cancellation)];
            });
        });
    };
    CustomEditorsExtImpl.prototype.getCustomEditorProvider = function (viewType) {
        var entry = this.editorProviders.get(viewType);
        var provider = entry === null || entry === void 0 ? void 0 : entry.provider;
        if (!provider || !this.supportEditing(provider)) {
            throw new Error('Custom document is not editable');
        }
        return provider;
    };
    CustomEditorsExtImpl.prototype.supportEditing = function (provider) {
        return !!provider.onDidChangeCustomDocument;
    };
    return CustomEditorsExtImpl;
}());
exports.CustomEditorsExtImpl = CustomEditorsExtImpl;
function isEditEvent(e) {
    return typeof e.undo === 'function'
        && typeof e.redo === 'function';
}
var CustomDocumentStoreEntry = /** @class */ (function () {
    function CustomDocumentStoreEntry(document) {
        this.document = document;
        this.edits = new Cache('custom documents');
    }
    CustomDocumentStoreEntry.prototype.addEdit = function (item) {
        return this.edits.add([item]);
    };
    CustomDocumentStoreEntry.prototype.undo = function (editId, isDirty) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getEdit(editId).undo()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CustomDocumentStoreEntry.prototype.redo = function (editId, isDirty) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getEdit(editId).redo()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CustomDocumentStoreEntry.prototype.disposeEdits = function (editIds) {
        var e_1, _a;
        try {
            for (var editIds_1 = __values(editIds), editIds_1_1 = editIds_1.next(); !editIds_1_1.done; editIds_1_1 = editIds_1.next()) {
                var id = editIds_1_1.value;
                this.edits.delete(id);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (editIds_1_1 && !editIds_1_1.done && (_a = editIds_1.return)) _a.call(editIds_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    CustomDocumentStoreEntry.prototype.getEdit = function (editId) {
        var edit = this.edits.get(editId, 0);
        if (!edit) {
            throw new Error('No edit found');
        }
        return edit;
    };
    return CustomDocumentStoreEntry;
}());
var EditorProviderStore = /** @class */ (function () {
    function EditorProviderStore() {
        this.providers = new Map();
    }
    EditorProviderStore.prototype.addTextProvider = function (viewType, plugin, provider) {
        return this.add(0 /* Text */, viewType, plugin, provider);
    };
    EditorProviderStore.prototype.addCustomProvider = function (viewType, plugin, provider) {
        return this.add(1 /* Custom */, viewType, plugin, provider);
    };
    EditorProviderStore.prototype.get = function (viewType) {
        return this.providers.get(viewType);
    };
    EditorProviderStore.prototype.add = function (type, viewType, plugin, provider) {
        var _this = this;
        if (this.providers.has(viewType)) {
            throw new Error("Provider for viewType:" + viewType + " already registered");
        }
        this.providers.set(viewType, { type: type, plugin: plugin, provider: provider });
        return new types_impl_1.Disposable(function () { return _this.providers.delete(viewType); });
    };
    return EditorProviderStore;
}());
var CustomDocumentStore = /** @class */ (function () {
    function CustomDocumentStore() {
        this.documents = new Map();
    }
    CustomDocumentStore.prototype.get = function (viewType, resource) {
        return this.documents.get(this.key(viewType, resource));
    };
    CustomDocumentStore.prototype.add = function (viewType, document) {
        var key = this.key(viewType, document.uri);
        if (this.documents.has(key)) {
            throw new Error("Document already exists for viewType:" + viewType + " resource:" + document.uri);
        }
        var entry = new CustomDocumentStoreEntry(document);
        this.documents.set(key, entry);
        return entry;
    };
    CustomDocumentStore.prototype.delete = function (viewType, document) {
        var key = this.key(viewType, document.uri);
        this.documents.delete(key);
    };
    CustomDocumentStore.prototype.key = function (viewType, resource) {
        return viewType + "@@@" + resource;
    };
    return CustomDocumentStore;
}());
// copied from https://github.com/microsoft/vscode/blob/53eac52308c4611000a171cc7bf1214293473c78/src/vs/workbench/api/common/cache.ts
var Cache = /** @class */ (function () {
    function Cache(id) {
        this.id = id;
        this._data = new Map();
        this._idPool = 1;
    }
    Cache.prototype.add = function (item) {
        var id = this._idPool++;
        this._data.set(id, item);
        this.logDebugInfo();
        return id;
    };
    Cache.prototype.get = function (pid, id) {
        return this._data.has(pid) ? this._data.get(pid)[id] : undefined;
    };
    Cache.prototype.delete = function (id) {
        this._data.delete(id);
        this.logDebugInfo();
    };
    Cache.prototype.logDebugInfo = function () {
        if (!Cache.enableDebugLogging) {
            return;
        }
        console.log(this.id + " cache size \u2014 " + this._data.size);
    };
    Cache.enableDebugLogging = false;
    return Cache;
}());
//# sourceMappingURL=custom-editors.js.map