"use strict";
/********************************************************************************
 * Copyright (C) 2018 TypeFox and others.
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonacoWorkspace = exports.WorkspaceTextEdit = exports.WorkspaceFileEdit = void 0;
var inversify_1 = require("inversify");
var uri_1 = require("@theia/core/lib/common/uri");
var event_1 = require("@theia/core/lib/common/event");
var browser_1 = require("@theia/filesystem/lib/browser");
var browser_2 = require("@theia/editor/lib/browser");
var monaco_text_model_service_1 = require("./monaco-text-model-service");
var monaco_editor_1 = require("./monaco-editor");
var browser_3 = require("@theia/markers/lib/browser");
var file_service_1 = require("@theia/filesystem/lib/browser/file-service");
var WorkspaceFileEdit;
(function (WorkspaceFileEdit) {
    function is(arg) {
        return ('oldUri' in arg && monaco.Uri.isUri(arg.oldUri)) ||
            ('newUri' in arg && monaco.Uri.isUri(arg.newUri));
    }
    WorkspaceFileEdit.is = is;
})(WorkspaceFileEdit = exports.WorkspaceFileEdit || (exports.WorkspaceFileEdit = {}));
var WorkspaceTextEdit;
(function (WorkspaceTextEdit) {
    function is(arg) {
        return !!arg && typeof arg === 'object'
            && 'resource' in arg
            && monaco.Uri.isUri(arg.resource)
            && 'edit' in arg
            && arg.edit !== null
            && typeof arg.edit === 'object';
    }
    WorkspaceTextEdit.is = is;
})(WorkspaceTextEdit = exports.WorkspaceTextEdit || (exports.WorkspaceTextEdit = {}));
var MonacoWorkspace = /** @class */ (function () {
    function MonacoWorkspace() {
        var _this = this;
        this.ready = new Promise(function (resolve) {
            _this.resolveReady = resolve;
        });
        this.onDidOpenTextDocumentEmitter = new event_1.Emitter();
        this.onDidOpenTextDocument = this.onDidOpenTextDocumentEmitter.event;
        this.onDidCloseTextDocumentEmitter = new event_1.Emitter();
        this.onDidCloseTextDocument = this.onDidCloseTextDocumentEmitter.event;
        this.onDidChangeTextDocumentEmitter = new event_1.Emitter();
        this.onDidChangeTextDocument = this.onDidChangeTextDocumentEmitter.event;
        this.onWillSaveTextDocumentEmitter = new event_1.Emitter();
        this.onWillSaveTextDocument = this.onWillSaveTextDocumentEmitter.event;
        this.onDidSaveTextDocumentEmitter = new event_1.Emitter();
        this.onDidSaveTextDocument = this.onDidSaveTextDocumentEmitter.event;
        this.suppressedOpenIfDirty = [];
    }
    MonacoWorkspace.prototype.init = function () {
        var e_1, _a;
        var _this = this;
        this.resolveReady();
        try {
            for (var _b = __values(this.textModelService.models), _c = _b.next(); !_c.done; _c = _b.next()) {
                var model = _c.value;
                this.fireDidOpen(model);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.textModelService.onDidCreate(function (model) { return _this.fireDidOpen(model); });
    };
    Object.defineProperty(MonacoWorkspace.prototype, "textDocuments", {
        get: function () {
            return this.textModelService.models;
        },
        enumerable: false,
        configurable: true
    });
    MonacoWorkspace.prototype.getTextDocument = function (uri) {
        return this.textModelService.get(uri);
    };
    MonacoWorkspace.prototype.fireDidOpen = function (model) {
        var _this = this;
        this.doFireDidOpen(model);
        model.textEditorModel.onDidChangeLanguage(function (e) {
            _this.problems.cleanAllMarkers(new uri_1.default(model.uri));
            model.setLanguageId(e.oldLanguage);
            try {
                _this.fireDidClose(model);
            }
            finally {
                model.setLanguageId(undefined);
            }
            _this.doFireDidOpen(model);
        });
        model.onDidChangeContent(function (event) { return _this.fireDidChangeContent(event); });
        model.onDidSaveModel(function () { return _this.fireDidSave(model); });
        model.onWillSaveModel(function (event) { return _this.fireWillSave(event); });
        model.onDirtyChanged(function () { return _this.openEditorIfDirty(model); });
        model.onDispose(function () { return _this.fireDidClose(model); });
    };
    MonacoWorkspace.prototype.doFireDidOpen = function (model) {
        this.onDidOpenTextDocumentEmitter.fire(model);
    };
    MonacoWorkspace.prototype.fireDidClose = function (model) {
        this.onDidCloseTextDocumentEmitter.fire(model);
    };
    MonacoWorkspace.prototype.fireDidChangeContent = function (event) {
        this.onDidChangeTextDocumentEmitter.fire(event);
    };
    MonacoWorkspace.prototype.fireWillSave = function (event) {
        this.onWillSaveTextDocumentEmitter.fire(event);
    };
    MonacoWorkspace.prototype.fireDidSave = function (model) {
        this.onDidSaveTextDocumentEmitter.fire(model);
    };
    MonacoWorkspace.prototype.openEditorIfDirty = function (model) {
        var _this = this;
        if (model.suppressOpenEditorWhenDirty || this.suppressedOpenIfDirty.indexOf(model) !== -1) {
            return;
        }
        if (model.dirty && monaco_editor_1.MonacoEditor.findByDocument(this.editorManager, model).length === 0) {
            // create a new reference to make sure the model is not disposed before it is
            // acquired by the editor, thus losing the changes that made it dirty.
            this.textModelService.createModelReference(model.textEditorModel.uri).then(function (ref) {
                (model.autoSave === 'on' ? new Promise(function (resolve) { return model.onDidSaveModel(resolve); }) :
                    _this.editorManager.open(new uri_1.default(model.uri), { mode: 'open' })).then(function () { return ref.dispose(); });
            });
        }
    };
    MonacoWorkspace.prototype.suppressOpenIfDirty = function (model, cb) {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.suppressedOpenIfDirty.push(model);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 4]);
                        return [4 /*yield*/, cb()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        i = this.suppressedOpenIfDirty.indexOf(model);
                        if (i !== -1) {
                            this.suppressedOpenIfDirty.splice(i, 1);
                        }
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Applies given edits to the given model.
     * The model is saved if no editors is opened for it.
     */
    MonacoWorkspace.prototype.applyBackgroundEdit = function (model, editOperations) {
        var _this = this;
        return this.suppressOpenIfDirty(model, function () { return __awaiter(_this, void 0, void 0, function () {
            var editor, cursorState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        editor = monaco_editor_1.MonacoEditor.findByDocument(this.editorManager, model)[0];
                        cursorState = editor && editor.getControl().getSelections() || [];
                        model.textEditorModel.pushStackElement();
                        model.textEditorModel.pushEditOperations(cursorState, editOperations, function () { return cursorState; });
                        model.textEditorModel.pushStackElement();
                        if (!!editor) return [3 /*break*/, 2];
                        return [4 /*yield*/, model.save()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
    };
    MonacoWorkspace.prototype.groupEdits = function (workspaceEdit) {
        var e_2, _a;
        var groups = [];
        var group;
        try {
            for (var _b = __values(workspaceEdit.edits), _c = _b.next(); !_c.done; _c = _b.next()) {
                var edit = _c.value;
                if (!group
                    || (WorkspaceFileEdit.is(group[0]) && !WorkspaceFileEdit.is(edit))
                    || (WorkspaceTextEdit.is(group[0]) && !WorkspaceTextEdit.is(edit))) {
                    group = [];
                    groups.push(group);
                }
                group.push(edit);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return groups;
    };
    MonacoWorkspace.prototype.applyBulkEdit = function (workspaceEdit) {
        return __awaiter(this, void 0, void 0, function () {
            var totalEdits, totalFiles, _a, _b, group, result, e_3_1, ariaSummary, e_4;
            var e_3, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 11, , 12]);
                        totalEdits = 0;
                        totalFiles = 0;
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 8, 9, 10]);
                        _a = __values(this.groupEdits(workspaceEdit)), _b = _a.next();
                        _d.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 7];
                        group = _b.value;
                        if (!WorkspaceFileEdit.is(group[0])) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.performFileEdits(group)];
                    case 3:
                        _d.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.performTextEdits(group)];
                    case 5:
                        result = _d.sent();
                        totalEdits += result.totalEdits;
                        totalFiles += result.totalFiles;
                        _d.label = 6;
                    case 6:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_3_1 = _d.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_3) throw e_3.error; }
                        return [7 /*endfinally*/];
                    case 10:
                        ariaSummary = this.getAriaSummary(totalEdits, totalFiles);
                        return [2 /*return*/, { ariaSummary: ariaSummary, success: true }];
                    case 11:
                        e_4 = _d.sent();
                        console.error('Failed to apply workspace edits:', e_4);
                        return [2 /*return*/, {
                                ariaSummary: "Error applying workspace edits: " + e_4.toString(),
                                success: false
                            }];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    MonacoWorkspace.prototype.getAriaSummary = function (totalEdits, totalFiles) {
        if (totalEdits === 0) {
            return 'Made no edits';
        }
        if (totalEdits > 1 && totalFiles > 1) {
            return "Made " + totalEdits + " text edits in " + totalFiles + " files";
        }
        return "Made " + totalEdits + " text edits in one file";
    };
    MonacoWorkspace.prototype.performTextEdits = function (edits) {
        return __awaiter(this, void 0, void 0, function () {
            var totalEdits, totalFiles, resourceEdits, edits_1, edits_1_1, edit, model, key, array, pending, _loop_1, resourceEdits_1, resourceEdits_1_1, _a, key, value;
            var e_5, _b, e_6, _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        totalEdits = 0;
                        totalFiles = 0;
                        resourceEdits = new Map();
                        try {
                            for (edits_1 = __values(edits), edits_1_1 = edits_1.next(); !edits_1_1.done; edits_1_1 = edits_1.next()) {
                                edit = edits_1_1.value;
                                if (typeof edit.modelVersionId === 'number') {
                                    model = this.textModelService.get(edit.resource.toString());
                                    if (model && model.textEditorModel.getVersionId() !== edit.modelVersionId) {
                                        throw new Error(model.uri + " has changed in the meantime");
                                    }
                                }
                                key = edit.resource.toString();
                                array = resourceEdits.get(key);
                                if (!array) {
                                    array = [];
                                    resourceEdits.set(key, array);
                                }
                                array.push(edit);
                            }
                        }
                        catch (e_5_1) { e_5 = { error: e_5_1 }; }
                        finally {
                            try {
                                if (edits_1_1 && !edits_1_1.done && (_b = edits_1.return)) _b.call(edits_1);
                            }
                            finally { if (e_5) throw e_5.error; }
                        }
                        pending = [];
                        _loop_1 = function (key, value) {
                            pending.push((function () { return __awaiter(_this, void 0, void 0, function () {
                                var uri, eol, editOperations, minimalEdits, minimalEdits_1, minimalEdits_1_1, textEdit, reference, model, editor, cursorState_1;
                                var e_7, _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            uri = monaco.Uri.parse(key);
                                            editOperations = [];
                                            return [4 /*yield*/, monaco.services.StaticServices.editorWorkerService.get().computeMoreMinimalEdits(uri, value.map(function (v) { return v.edit; }))];
                                        case 1:
                                            minimalEdits = _b.sent();
                                            if (minimalEdits) {
                                                try {
                                                    for (minimalEdits_1 = __values(minimalEdits), minimalEdits_1_1 = minimalEdits_1.next(); !minimalEdits_1_1.done; minimalEdits_1_1 = minimalEdits_1.next()) {
                                                        textEdit = minimalEdits_1_1.value;
                                                        if (typeof textEdit.eol === 'number') {
                                                            eol = textEdit.eol;
                                                        }
                                                        if (monaco.Range.isEmpty(textEdit.range) && !textEdit.text) {
                                                            // skip no-op
                                                            continue;
                                                        }
                                                        editOperations.push({
                                                            forceMoveMarkers: false,
                                                            range: monaco.Range.lift(textEdit.range),
                                                            text: textEdit.text
                                                        });
                                                    }
                                                }
                                                catch (e_7_1) { e_7 = { error: e_7_1 }; }
                                                finally {
                                                    try {
                                                        if (minimalEdits_1_1 && !minimalEdits_1_1.done && (_a = minimalEdits_1.return)) _a.call(minimalEdits_1);
                                                    }
                                                    finally { if (e_7) throw e_7.error; }
                                                }
                                            }
                                            if (!editOperations.length && eol === undefined) {
                                                return [2 /*return*/];
                                            }
                                            return [4 /*yield*/, this.textModelService.createModelReference(uri)];
                                        case 2:
                                            reference = _b.sent();
                                            try {
                                                model = reference.object.textEditorModel;
                                                editor = monaco_editor_1.MonacoEditor.findByDocument(this.editorManager, reference.object)[0];
                                                cursorState_1 = (editor === null || editor === void 0 ? void 0 : editor.getControl().getSelections()) || [];
                                                // start a fresh operation
                                                model.pushStackElement();
                                                if (editOperations.length) {
                                                    model.pushEditOperations(cursorState_1, editOperations, function () { return cursorState_1; });
                                                }
                                                if (eol !== undefined) {
                                                    model.pushEOL(eol);
                                                }
                                                // push again to make this change an undoable operation
                                                model.pushStackElement();
                                                totalFiles += 1;
                                                totalEdits += editOperations.length;
                                            }
                                            finally {
                                                reference.dispose();
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); })());
                        };
                        try {
                            for (resourceEdits_1 = __values(resourceEdits), resourceEdits_1_1 = resourceEdits_1.next(); !resourceEdits_1_1.done; resourceEdits_1_1 = resourceEdits_1.next()) {
                                _a = __read(resourceEdits_1_1.value, 2), key = _a[0], value = _a[1];
                                _loop_1(key, value);
                            }
                        }
                        catch (e_6_1) { e_6 = { error: e_6_1 }; }
                        finally {
                            try {
                                if (resourceEdits_1_1 && !resourceEdits_1_1.done && (_c = resourceEdits_1.return)) _c.call(resourceEdits_1);
                            }
                            finally { if (e_6) throw e_6.error; }
                        }
                        return [4 /*yield*/, Promise.all(pending)];
                    case 1:
                        _d.sent();
                        return [2 /*return*/, { totalEdits: totalEdits, totalFiles: totalFiles }];
                }
            });
        });
    };
    MonacoWorkspace.prototype.performFileEdits = function (edits) {
        return __awaiter(this, void 0, void 0, function () {
            var edits_2, edits_2_1, edit, options, _a, useTrash, _b, e_8_1;
            var e_8, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 16, 17, 18]);
                        edits_2 = __values(edits), edits_2_1 = edits_2.next();
                        _d.label = 1;
                    case 1:
                        if (!!edits_2_1.done) return [3 /*break*/, 15];
                        edit = edits_2_1.value;
                        options = edit.options || {};
                        if (!(edit.newUri && edit.oldUri)) return [3 /*break*/, 5];
                        _a = options.overwrite === undefined && options.ignoreIfExists;
                        if (!_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.fileService.exists(new uri_1.default(edit.newUri))];
                    case 2:
                        _a = (_d.sent());
                        _d.label = 3;
                    case 3:
                        // rename
                        if (_a) {
                            return [2 /*return*/]; // not overwriting, but ignoring, and the target file exists
                        }
                        return [4 /*yield*/, this.fileService.move(new uri_1.default(edit.oldUri), new uri_1.default(edit.newUri), { overwrite: options.overwrite })];
                    case 4:
                        _d.sent();
                        return [3 /*break*/, 14];
                    case 5:
                        if (!(!edit.newUri && edit.oldUri)) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.fileService.exists(new uri_1.default(edit.oldUri))];
                    case 6:
                        if (!_d.sent()) return [3 /*break*/, 8];
                        useTrash = this.filePreferences['files.enableTrash'];
                        if (useTrash && !(this.fileService.hasCapability(new uri_1.default(edit.oldUri), 4096 /* Trash */))) {
                            useTrash = false; // not supported by provider
                        }
                        return [4 /*yield*/, this.fileService.delete(new uri_1.default(edit.oldUri), { useTrash: useTrash, recursive: options.recursive })];
                    case 7:
                        _d.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        if (!options.ignoreIfNotExists) {
                            throw new Error(edit.oldUri + " does not exist and can not be deleted");
                        }
                        _d.label = 9;
                    case 9: return [3 /*break*/, 14];
                    case 10:
                        if (!(edit.newUri && !edit.oldUri)) return [3 /*break*/, 14];
                        _b = options.overwrite === undefined && options.ignoreIfExists;
                        if (!_b) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.fileService.exists(new uri_1.default(edit.newUri))];
                    case 11:
                        _b = (_d.sent());
                        _d.label = 12;
                    case 12:
                        // create file
                        if (_b) {
                            return [2 /*return*/]; // not overwriting, but ignoring, and the target file exists
                        }
                        return [4 /*yield*/, this.fileService.create(new uri_1.default(edit.newUri), undefined, { overwrite: options.overwrite })];
                    case 13:
                        _d.sent();
                        _d.label = 14;
                    case 14:
                        edits_2_1 = edits_2.next();
                        return [3 /*break*/, 1];
                    case 15: return [3 /*break*/, 18];
                    case 16:
                        e_8_1 = _d.sent();
                        e_8 = { error: e_8_1 };
                        return [3 /*break*/, 18];
                    case 17:
                        try {
                            if (edits_2_1 && !edits_2_1.done && (_c = edits_2.return)) _c.call(edits_2);
                        }
                        finally { if (e_8) throw e_8.error; }
                        return [7 /*endfinally*/];
                    case 18: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        inversify_1.inject(file_service_1.FileService),
        __metadata("design:type", file_service_1.FileService)
    ], MonacoWorkspace.prototype, "fileService", void 0);
    __decorate([
        inversify_1.inject(browser_1.FileSystemPreferences),
        __metadata("design:type", Object)
    ], MonacoWorkspace.prototype, "filePreferences", void 0);
    __decorate([
        inversify_1.inject(monaco_text_model_service_1.MonacoTextModelService),
        __metadata("design:type", monaco_text_model_service_1.MonacoTextModelService)
    ], MonacoWorkspace.prototype, "textModelService", void 0);
    __decorate([
        inversify_1.inject(browser_2.EditorManager),
        __metadata("design:type", browser_2.EditorManager)
    ], MonacoWorkspace.prototype, "editorManager", void 0);
    __decorate([
        inversify_1.inject(browser_3.ProblemManager),
        __metadata("design:type", browser_3.ProblemManager)
    ], MonacoWorkspace.prototype, "problems", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], MonacoWorkspace.prototype, "init", null);
    MonacoWorkspace = __decorate([
        inversify_1.injectable()
    ], MonacoWorkspace);
    return MonacoWorkspace;
}());
exports.MonacoWorkspace = MonacoWorkspace;
//# sourceMappingURL=monaco-workspace.js.map