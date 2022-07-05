"use strict";
/********************************************************************************
 * Copyright (C) 2018 Red Hat, Inc. and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextEditorsMainImpl = void 0;
var vscode_uri_1 = require("vscode-uri");
var plugin_api_rpc_1 = require("../../common/plugin-api-rpc");
var disposable_1 = require("@theia/core/lib/common/disposable");
var errors_1 = require("../../common/errors");
var languages_main_1 = require("./languages-main");
var uri_components_1 = require("../../common/uri-components");
var endpoint_1 = require("@theia/core/lib/browser/endpoint");
var TextEditorsMainImpl = /** @class */ (function () {
    function TextEditorsMainImpl(editorsAndDocuments, rpc, bulkEditService, monacoEditorService) {
        var _this = this;
        this.editorsAndDocuments = editorsAndDocuments;
        this.bulkEditService = bulkEditService;
        this.monacoEditorService = monacoEditorService;
        this.toDispose = new disposable_1.DisposableCollection();
        this.editorsToDispose = new Map();
        this.fileEndpoint = new endpoint_1.Endpoint({ path: 'file' }).getRestUrl();
        this.proxy = rpc.getProxy(plugin_api_rpc_1.MAIN_RPC_CONTEXT.TEXT_EDITORS_EXT);
        this.toDispose.push(editorsAndDocuments);
        this.toDispose.push(editorsAndDocuments.onTextEditorAdd(function (editors) { return editors.forEach(_this.onTextEditorAdd, _this); }));
        this.toDispose.push(editorsAndDocuments.onTextEditorRemove(function (editors) { return editors.forEach(_this.onTextEditorRemove, _this); }));
    }
    TextEditorsMainImpl.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    TextEditorsMainImpl.prototype.onTextEditorAdd = function (editor) {
        var _this = this;
        var id = editor.getId();
        var toDispose = new disposable_1.DisposableCollection(editor.onPropertiesChangedEvent(function (e) {
            _this.proxy.$acceptEditorPropertiesChanged(id, e);
        }), disposable_1.Disposable.create(function () { return _this.editorsToDispose.delete(id); }));
        this.editorsToDispose.set(id, toDispose);
        this.toDispose.push(toDispose);
    };
    TextEditorsMainImpl.prototype.onTextEditorRemove = function (id) {
        var disposables = this.editorsToDispose.get(id);
        if (disposables) {
            disposables.dispose();
        }
    };
    TextEditorsMainImpl.prototype.$trySetOptions = function (id, options) {
        if (!this.editorsAndDocuments.getEditor(id)) {
            return Promise.reject(errors_1.disposed("TextEditor: " + id));
        }
        this.editorsAndDocuments.getEditor(id).setConfiguration(options);
        return Promise.resolve();
    };
    TextEditorsMainImpl.prototype.$trySetSelections = function (id, selections) {
        if (!this.editorsAndDocuments.getEditor(id)) {
            return Promise.reject(errors_1.disposed("TextEditor: " + id));
        }
        this.editorsAndDocuments.getEditor(id).setSelections(selections);
        return Promise.resolve();
    };
    TextEditorsMainImpl.prototype.$tryRevealRange = function (id, range, revealType) {
        if (!this.editorsAndDocuments.getEditor(id)) {
            return Promise.reject(errors_1.disposed("TextEditor(" + id + ")"));
        }
        this.editorsAndDocuments.getEditor(id).revealRange(new monaco.Range(range.startLineNumber, range.startColumn, range.endLineNumber, range.endColumn), revealType);
        return Promise.resolve();
    };
    TextEditorsMainImpl.prototype.$tryApplyEdits = function (id, modelVersionId, edits, opts) {
        if (!this.editorsAndDocuments.getEditor(id)) {
            return Promise.reject(errors_1.disposed("TextEditor(" + id + ")"));
        }
        return Promise.resolve(this.editorsAndDocuments.getEditor(id).applyEdits(modelVersionId, edits, opts));
    };
    TextEditorsMainImpl.prototype.$tryApplyWorkspaceEdit = function (dto) {
        return __awaiter(this, void 0, void 0, function () {
            var edits, success, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        edits = languages_main_1.toMonacoWorkspaceEdit(dto);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.bulkEditService.apply(edits)];
                    case 2:
                        success = (_b.sent()).success;
                        return [2 /*return*/, success];
                    case 3:
                        _a = _b.sent();
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TextEditorsMainImpl.prototype.$tryInsertSnippet = function (id, template, ranges, opts) {
        if (!this.editorsAndDocuments.getEditor(id)) {
            return Promise.reject(errors_1.disposed("TextEditor(" + id + ")"));
        }
        return Promise.resolve(this.editorsAndDocuments.getEditor(id).insertSnippet(template, ranges, opts));
    };
    TextEditorsMainImpl.prototype.$registerTextEditorDecorationType = function (key, options) {
        var _this = this;
        this.injectRemoteUris(options);
        this.monacoEditorService.registerDecorationType(key, options);
        this.toDispose.push(disposable_1.Disposable.create(function () { return _this.$removeTextEditorDecorationType(key); }));
    };
    TextEditorsMainImpl.prototype.injectRemoteUris = function (options) {
        if (options.before) {
            options.before.contentIconPath = this.toRemoteUri(options.before.contentIconPath);
        }
        if (options.after) {
            options.after.contentIconPath = this.toRemoteUri(options.after.contentIconPath);
        }
        if ('gutterIconPath' in options) {
            options.gutterIconPath = this.toRemoteUri(options.gutterIconPath);
        }
        if ('dark' in options && options.dark) {
            this.injectRemoteUris(options.dark);
        }
        if ('light' in options && options.light) {
            this.injectRemoteUris(options.light);
        }
    };
    TextEditorsMainImpl.prototype.toRemoteUri = function (uri) {
        if (uri && uri.scheme === 'file') {
            return uri_components_1.theiaUritoUriComponents(this.fileEndpoint.withQuery(vscode_uri_1.URI.revive(uri).toString()));
        }
        return uri;
    };
    TextEditorsMainImpl.prototype.$removeTextEditorDecorationType = function (key) {
        this.monacoEditorService.removeDecorationType(key);
    };
    TextEditorsMainImpl.prototype.$trySetDecorations = function (id, key, ranges) {
        if (!this.editorsAndDocuments.getEditor(id)) {
            return Promise.reject(errors_1.disposed("TextEditor(" + id + ")"));
        }
        this.editorsAndDocuments.getEditor(id).setDecorations(key, ranges);
        return Promise.resolve();
    };
    TextEditorsMainImpl.prototype.$trySetDecorationsFast = function (id, key, ranges) {
        if (!this.editorsAndDocuments.getEditor(id)) {
            return Promise.reject(errors_1.disposed("TextEditor(" + id + ")"));
        }
        this.editorsAndDocuments.getEditor(id).setDecorationsFast(key, ranges);
        return Promise.resolve();
    };
    TextEditorsMainImpl.prototype.$saveAll = function (includeUntitled) {
        return this.editorsAndDocuments.saveAll(includeUntitled);
    };
    return TextEditorsMainImpl;
}());
exports.TextEditorsMainImpl = TextEditorsMainImpl;
//# sourceMappingURL=text-editors-main.js.map