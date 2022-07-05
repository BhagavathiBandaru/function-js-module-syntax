"use strict";
/********************************************************************************
 * Copyright (C) 2017 TypeFox and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonacoEditorModel = exports.TextDocumentSaveReason = void 0;
var vscode_languageserver_protocol_1 = require("vscode-languageserver-protocol");
Object.defineProperty(exports, "TextDocumentSaveReason", { enumerable: true, get: function () { return vscode_languageserver_protocol_1.TextDocumentSaveReason; } });
var browser_1 = require("@theia/editor/lib/browser");
var disposable_1 = require("@theia/core/lib/common/disposable");
var event_1 = require("@theia/core/lib/common/event");
var cancellation_1 = require("@theia/core/lib/common/cancellation");
var resource_1 = require("@theia/core/lib/common/resource");
var vscode_languageserver_types_1 = require("vscode-languageserver-types");
var MonacoEditorModel = /** @class */ (function () {
    function MonacoEditorModel(resource, m2p, p2m, logger, editorPreferences) {
        var _this = this;
        this.resource = resource;
        this.m2p = m2p;
        this.p2m = p2m;
        this.logger = logger;
        this.editorPreferences = editorPreferences;
        this.autoSave = 'on';
        this.autoSaveDelay = 500;
        this.suppressOpenEditorWhenDirty = false;
        this.lineNumbersMinChars = 3;
        /* @deprecated there is no general save timeout, each participant should introduce a sensible timeout  */
        this.onWillSaveLoopTimeOut = 1500;
        this.toDispose = new disposable_1.DisposableCollection();
        this.toDisposeOnAutoSave = new disposable_1.DisposableCollection();
        this.onDidChangeContentEmitter = new event_1.Emitter();
        this.onDidChangeContent = this.onDidChangeContentEmitter.event;
        this.onDidSaveModelEmitter = new event_1.Emitter();
        this.onDidSaveModel = this.onDidSaveModelEmitter.event;
        this.onWillSaveModelEmitter = new event_1.Emitter();
        this.onWillSaveModel = this.onWillSaveModelEmitter.event;
        this.onDidChangeValidEmitter = new event_1.Emitter();
        this.onDidChangeValid = this.onDidChangeValidEmitter.event;
        this.onDidChangeEncodingEmitter = new event_1.Emitter();
        this.onDidChangeEncoding = this.onDidChangeEncodingEmitter.event;
        /**
         * Use `valid` to access it.
         * Use `setValid` to mutate it.
         */
        this._valid = false;
        this._dirty = false;
        this.onDirtyChangedEmitter = new event_1.Emitter();
        this.pendingOperation = Promise.resolve();
        this.syncCancellationTokenSource = new cancellation_1.CancellationTokenSource();
        this.ignoreDirtyEdits = false;
        this.saveCancellationTokenSource = new cancellation_1.CancellationTokenSource();
        this.ignoreContentChanges = false;
        this.contentChanges = [];
        this.toDispose.push(resource);
        this.toDispose.push(this.toDisposeOnAutoSave);
        this.toDispose.push(this.onDidChangeContentEmitter);
        this.toDispose.push(this.onDidSaveModelEmitter);
        this.toDispose.push(this.onWillSaveModelEmitter);
        this.toDispose.push(this.onDirtyChangedEmitter);
        this.toDispose.push(this.onDidChangeValidEmitter);
        this.toDispose.push(disposable_1.Disposable.create(function () { return _this.cancelSave(); }));
        this.toDispose.push(disposable_1.Disposable.create(function () { return _this.cancelSync(); }));
        this.resolveModel = this.readContents().then(function (content) { return _this.initialize(content || ''); });
    }
    MonacoEditorModel.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    MonacoEditorModel.prototype.setEncoding = function (encoding, mode) {
        if (mode === 1 /* Decode */ && this.dirty) {
            return Promise.resolve();
        }
        if (!this.setPreferredEncoding(encoding)) {
            return Promise.resolve();
        }
        if (mode === 1 /* Decode */) {
            return this.sync();
        }
        return this.scheduleSave(vscode_languageserver_protocol_1.TextDocumentSaveReason.Manual, this.cancelSave(), true);
    };
    MonacoEditorModel.prototype.getEncoding = function () {
        return this.preferredEncoding || this.contentEncoding;
    };
    MonacoEditorModel.prototype.setPreferredEncoding = function (encoding) {
        if (encoding === this.preferredEncoding || (!this.preferredEncoding && encoding === this.contentEncoding)) {
            return false;
        }
        this.preferredEncoding = encoding;
        this.onDidChangeEncodingEmitter.fire(encoding);
        return true;
    };
    MonacoEditorModel.prototype.updateContentEncoding = function () {
        var contentEncoding = this.resource.encoding;
        if (!contentEncoding || this.contentEncoding === contentEncoding) {
            return;
        }
        this.contentEncoding = contentEncoding;
        if (!this.preferredEncoding) {
            this.onDidChangeEncodingEmitter.fire(contentEncoding);
        }
    };
    /**
     * #### Important
     * Only this method can create an instance of `monaco.editor.IModel`,
     * there should not be other calls to `monaco.editor.createModel`.
     */
    MonacoEditorModel.prototype.initialize = function (value) {
        var _this = this;
        if (!this.toDispose.disposed) {
            var uri = monaco.Uri.parse(this.resource.uri.toString());
            var firstLine = void 0;
            if (typeof value === 'string') {
                firstLine = value;
                var firstLF = value.indexOf('\n');
                if (firstLF !== -1) {
                    firstLine = value.substring(0, firstLF);
                }
            }
            else {
                firstLine = value.getFirstLineText(1000);
            }
            var languageSelection = monaco.services.StaticServices.modeService.get().createByFilepathOrFirstLine(uri, firstLine);
            this.model = monaco.services.StaticServices.modelService.get().createModel(value, languageSelection, uri);
            this.resourceVersion = this.resource.version;
            this.updateSavedVersionId();
            this.toDispose.push(this.model);
            this.toDispose.push(this.model.onDidChangeContent(function (event) { return _this.fireDidChangeContent(event); }));
            if (this.resource.onDidChangeContents) {
                this.toDispose.push(this.resource.onDidChangeContents(function () { return _this.sync(); }));
            }
        }
    };
    Object.defineProperty(MonacoEditorModel.prototype, "valid", {
        /**
         * Whether it is possible to load content from the underlying resource.
         */
        get: function () {
            return this._valid;
        },
        enumerable: false,
        configurable: true
    });
    MonacoEditorModel.prototype.setValid = function (valid) {
        if (valid === this._valid) {
            return;
        }
        this._valid = valid;
        this.onDidChangeValidEmitter.fire(undefined);
    };
    Object.defineProperty(MonacoEditorModel.prototype, "dirty", {
        get: function () {
            return this._dirty;
        },
        enumerable: false,
        configurable: true
    });
    MonacoEditorModel.prototype.setDirty = function (dirty) {
        if (dirty === this._dirty) {
            return;
        }
        this._dirty = dirty;
        if (dirty === false) {
            this.updateSavedVersionId();
        }
        this.onDirtyChangedEmitter.fire(undefined);
    };
    MonacoEditorModel.prototype.updateSavedVersionId = function () {
        this.bufferSavedVersionId = this.model.getAlternativeVersionId();
    };
    Object.defineProperty(MonacoEditorModel.prototype, "onDirtyChanged", {
        get: function () {
            return this.onDirtyChangedEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MonacoEditorModel.prototype, "uri", {
        get: function () {
            return this.resource.uri.toString();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MonacoEditorModel.prototype, "languageId", {
        get: function () {
            return this._languageId !== undefined ? this._languageId : this.model.getModeId();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * It's a hack to dispatch close notification with an old language id, don't use it.
     */
    MonacoEditorModel.prototype.setLanguageId = function (languageId) {
        this._languageId = languageId;
    };
    Object.defineProperty(MonacoEditorModel.prototype, "version", {
        get: function () {
            return this.model.getVersionId();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Return selected text by Range or all text by default
     */
    MonacoEditorModel.prototype.getText = function (range) {
        if (!range) {
            return this.model.getValue();
        }
        else {
            return this.model.getValueInRange(this.p2m.asRange(range));
        }
    };
    MonacoEditorModel.prototype.positionAt = function (offset) {
        var _a = this.model.getPositionAt(offset), lineNumber = _a.lineNumber, column = _a.column;
        return this.m2p.asPosition(lineNumber, column);
    };
    MonacoEditorModel.prototype.offsetAt = function (position) {
        return this.model.getOffsetAt(this.p2m.asPosition(position));
    };
    Object.defineProperty(MonacoEditorModel.prototype, "lineCount", {
        get: function () {
            return this.model.getLineCount();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Retrieves a line in a text document expressed as a one-based position.
     */
    MonacoEditorModel.prototype.getLineContent = function (lineNumber) {
        return this.model.getLineContent(lineNumber);
    };
    MonacoEditorModel.prototype.getLineMaxColumn = function (lineNumber) {
        return this.model.getLineMaxColumn(lineNumber);
    };
    Object.defineProperty(MonacoEditorModel.prototype, "readOnly", {
        get: function () {
            return this.resource.saveContents === undefined;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MonacoEditorModel.prototype, "onDispose", {
        get: function () {
            return this.toDispose.onDispose;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MonacoEditorModel.prototype, "textEditorModel", {
        get: function () {
            return this.model;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Find all matches in an editor for the given options.
     * @param options the options for finding matches.
     *
     * @returns the list of matches.
     */
    MonacoEditorModel.prototype.findMatches = function (options) {
        var wordSeparators = this.editorPreferences ? this.editorPreferences['editor.wordSeparators'] : browser_1.DEFAULT_WORD_SEPARATORS;
        var results = this.model.findMatches(options.searchString, false, options.isRegex, options.matchCase, 
        // eslint-disable-next-line no-null/no-null
        options.matchWholeWord ? wordSeparators : null, true, options.limitResultCount);
        var extractedMatches = [];
        results.forEach(function (r) {
            if (r.matches) {
                extractedMatches.push({
                    matches: r.matches,
                    range: vscode_languageserver_types_1.Range.create(r.range.startLineNumber, r.range.startColumn, r.range.endLineNumber, r.range.endColumn)
                });
            }
        });
        return extractedMatches;
    };
    MonacoEditorModel.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resolveModel];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    MonacoEditorModel.prototype.save = function (options) {
        return this.scheduleSave(vscode_languageserver_protocol_1.TextDocumentSaveReason.Manual, undefined, undefined, options);
    };
    MonacoEditorModel.prototype.run = function (operation) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this.toDispose.disposed) {
                    return [2 /*return*/];
                }
                return [2 /*return*/, this.pendingOperation = this.pendingOperation.then(function () { return __awaiter(_this, void 0, void 0, function () {
                        var e_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, operation()];
                                case 1:
                                    _a.sent();
                                    return [3 /*break*/, 3];
                                case 2:
                                    e_1 = _a.sent();
                                    console.error(e_1);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    MonacoEditorModel.prototype.cancelSync = function () {
        this.trace(function (log) { return log('MonacoEditorModel.cancelSync'); });
        this.syncCancellationTokenSource.cancel();
        this.syncCancellationTokenSource = new cancellation_1.CancellationTokenSource();
        return this.syncCancellationTokenSource.token;
    };
    MonacoEditorModel.prototype.sync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            var _this = this;
            return __generator(this, function (_a) {
                token = this.cancelSync();
                return [2 /*return*/, this.run(function () { return _this.doSync(token); })];
            });
        });
    };
    MonacoEditorModel.prototype.doSync = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var value;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.trace(function (log) { return log('MonacoEditorModel.doSync - enter'); });
                        if (token.isCancellationRequested) {
                            this.trace(function (log) { return log('MonacoEditorModel.doSync - exit - cancelled'); });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.readContents()];
                    case 1:
                        value = _a.sent();
                        if (value === undefined) {
                            this.trace(function (log) { return log('MonacoEditorModel.doSync - exit - resource not found'); });
                            return [2 /*return*/];
                        }
                        if (token.isCancellationRequested) {
                            this.trace(function (log) { return log('MonacoEditorModel.doSync - exit - cancelled while looking for a resource'); });
                            return [2 /*return*/];
                        }
                        if (this._dirty) {
                            this.trace(function (log) { return log('MonacoEditorModel.doSync - exit - pending dirty changes'); });
                            return [2 /*return*/];
                        }
                        this.resourceVersion = this.resource.version;
                        this.updateModel(function () { return monaco.services.StaticServices.modelService.get().updateModel(_this.model, value); }, {
                            ignoreDirty: true,
                            ignoreContentChanges: true
                        });
                        this.trace(function (log) { return log('MonacoEditorModel.doSync - exit'); });
                        return [2 /*return*/];
                }
            });
        });
    };
    MonacoEditorModel.prototype.readContents = function () {
        return __awaiter(this, void 0, void 0, function () {
            var options, content, value, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        options = { encoding: this.getEncoding() };
                        return [4 /*yield*/, (this.resource.readStream ? this.resource.readStream(options) : this.resource.readContents(options))];
                    case 1:
                        content = _a.sent();
                        value = void 0;
                        if (typeof content === 'string') {
                            value = content;
                        }
                        else {
                            value = monaco.textModel.createTextBufferFactoryFromStream(content);
                        }
                        this.updateContentEncoding();
                        this.setValid(true);
                        return [2 /*return*/, value];
                    case 2:
                        e_2 = _a.sent();
                        this.setValid(false);
                        if (resource_1.ResourceError.NotFound.is(e_2)) {
                            return [2 /*return*/, undefined];
                        }
                        throw e_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MonacoEditorModel.prototype.markAsDirty = function () {
        this.trace(function (log) { return log('MonacoEditorModel.markAsDirty - enter'); });
        if (this.ignoreDirtyEdits) {
            this.trace(function (log) { return log('MonacoEditorModel.markAsDirty - exit - ignoring dirty changes enabled'); });
            return;
        }
        this.cancelSync();
        this.setDirty(true);
        this.doAutoSave();
        this.trace(function (log) { return log('MonacoEditorModel.markAsDirty - exit'); });
    };
    MonacoEditorModel.prototype.doAutoSave = function () {
        var _this = this;
        if (this.autoSave === 'on') {
            var token_1 = this.cancelSave();
            this.toDisposeOnAutoSave.dispose();
            var handle_1 = window.setTimeout(function () {
                _this.scheduleSave(vscode_languageserver_protocol_1.TextDocumentSaveReason.AfterDelay, token_1);
            }, this.autoSaveDelay);
            this.toDisposeOnAutoSave.push(disposable_1.Disposable.create(function () {
                return window.clearTimeout(handle_1);
            }));
        }
    };
    MonacoEditorModel.prototype.cancelSave = function () {
        this.trace(function (log) { return log('MonacoEditorModel.cancelSave'); });
        this.saveCancellationTokenSource.cancel();
        this.saveCancellationTokenSource = new cancellation_1.CancellationTokenSource();
        return this.saveCancellationTokenSource.token;
    };
    MonacoEditorModel.prototype.scheduleSave = function (reason, token, overwriteEncoding, options) {
        var _this = this;
        if (token === void 0) { token = this.cancelSave(); }
        return this.run(function () { return _this.doSave(reason, token, overwriteEncoding, options); });
    };
    MonacoEditorModel.prototype.pushContentChanges = function (contentChanges) {
        var _a;
        if (!this.ignoreContentChanges) {
            (_a = this.contentChanges).push.apply(_a, __spread(contentChanges));
        }
    };
    MonacoEditorModel.prototype.fireDidChangeContent = function (event) {
        this.trace(function (log) { return log("MonacoEditorModel.fireDidChangeContent - enter - " + JSON.stringify(event, undefined, 2)); });
        if (this.model.getAlternativeVersionId() === this.bufferSavedVersionId) {
            this.setDirty(false);
        }
        else {
            this.markAsDirty();
        }
        var changeContentEvent = this.asContentChangedEvent(event);
        this.onDidChangeContentEmitter.fire(changeContentEvent);
        this.pushContentChanges(changeContentEvent.contentChanges);
        this.trace(function (log) { return log('MonacoEditorModel.fireDidChangeContent - exit'); });
    };
    MonacoEditorModel.prototype.asContentChangedEvent = function (event) {
        var _this = this;
        var contentChanges = event.changes.map(function (change) { return _this.asTextDocumentContentChangeEvent(change); });
        return { model: this, contentChanges: contentChanges };
    };
    MonacoEditorModel.prototype.asTextDocumentContentChangeEvent = function (change) {
        var range = this.m2p.asRange(change.range);
        var rangeLength = change.rangeLength;
        var text = change.text;
        return { range: range, rangeLength: rangeLength, text: text };
    };
    MonacoEditorModel.prototype.applyEdits = function (operations, options) {
        var _this = this;
        return this.updateModel(function () { return _this.model.applyEdits(operations); }, options);
    };
    MonacoEditorModel.prototype.updateModel = function (doUpdate, options) {
        var resolvedOptions = __assign({ ignoreDirty: false, ignoreContentChanges: false }, options);
        var _a = this, ignoreDirtyEdits = _a.ignoreDirtyEdits, ignoreContentChanges = _a.ignoreContentChanges;
        this.ignoreDirtyEdits = resolvedOptions.ignoreDirty;
        this.ignoreContentChanges = resolvedOptions.ignoreContentChanges;
        try {
            return doUpdate();
        }
        finally {
            this.ignoreDirtyEdits = ignoreDirtyEdits;
            this.ignoreContentChanges = ignoreContentChanges;
        }
    };
    MonacoEditorModel.prototype.doSave = function (reason, token, overwriteEncoding, options) {
        return __awaiter(this, void 0, void 0, function () {
            var changes, contentLength, content, encoding, version, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (token.isCancellationRequested || !this.resource.saveContents) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.fireWillSaveModel(reason, token, options)];
                    case 1:
                        _a.sent();
                        if (token.isCancellationRequested) {
                            return [2 /*return*/];
                        }
                        changes = __spread(this.contentChanges);
                        if (changes.length === 0 && !overwriteEncoding && reason !== vscode_languageserver_protocol_1.TextDocumentSaveReason.Manual) {
                            return [2 /*return*/];
                        }
                        contentLength = this.model.getValueLength();
                        content = this.model.createSnapshot() || this.model.getValue();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        encoding = this.getEncoding();
                        version = this.resourceVersion;
                        return [4 /*yield*/, resource_1.Resource.save(this.resource, { changes: changes, content: content, contentLength: contentLength, options: { encoding: encoding, overwriteEncoding: overwriteEncoding, version: version } }, token)];
                    case 3:
                        _a.sent();
                        this.contentChanges.splice(0, changes.length);
                        this.resourceVersion = this.resource.version;
                        this.updateContentEncoding();
                        this.setValid(true);
                        if (token.isCancellationRequested) {
                            return [2 /*return*/];
                        }
                        this.setDirty(false);
                        this.fireDidSaveModel();
                        return [3 /*break*/, 5];
                    case 4:
                        e_3 = _a.sent();
                        if (!resource_1.ResourceError.OutOfSync.is(e_3)) {
                            throw e_3;
                        }
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    MonacoEditorModel.prototype.fireWillSaveModel = function (reason, token, options) {
        return __awaiter(this, void 0, void 0, function () {
            var firing, e_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        firing = this.onWillSaveModelEmitter.sequence(function (listener) { return __awaiter(_this, void 0, void 0, function () {
                            var waitables, version, event, edits;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (token.isCancellationRequested) {
                                            return [2 /*return*/, false];
                                        }
                                        waitables = [];
                                        version = this.version;
                                        event = {
                                            model: this,
                                            reason: reason, options: options,
                                            waitUntil: function (thenable) {
                                                if (Object.isFrozen(waitables)) {
                                                    throw new Error('waitUntil cannot be called asynchronously.');
                                                }
                                                waitables.push(thenable);
                                            }
                                        };
                                        // Fire.
                                        try {
                                            listener(event);
                                        }
                                        catch (err) {
                                            console.error(err);
                                            return [2 /*return*/, true];
                                        }
                                        // Asynchronous calls to `waitUntil` should fail.
                                        Object.freeze(waitables);
                                        return [4 /*yield*/, Promise.all(waitables).then(function (allOperations) {
                                                var _a;
                                                return (_a = []).concat.apply(_a, __spread(allOperations));
                                            })];
                                    case 1:
                                        edits = _a.sent();
                                        if (token.isCancellationRequested) {
                                            return [2 /*return*/, false];
                                        }
                                        // In a perfect world, we should only apply edits if document is clean.
                                        if (version !== this.version) {
                                            console.error('onWillSave listeners should provide edits, not directly alter the document.');
                                        }
                                        // Finally apply edits provided by this listener before firing the next.
                                        if (edits && edits.length > 0) {
                                            this.applyEdits(edits, {
                                                ignoreDirty: true,
                                            });
                                        }
                                        return [2 /*return*/, true];
                                }
                            });
                        }); });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, firing];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_4 = _a.sent();
                        console.error(e_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MonacoEditorModel.prototype.fireDidSaveModel = function () {
        this.onDidSaveModelEmitter.fire(this.model);
    };
    MonacoEditorModel.prototype.revert = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var soft, dirty;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.trace(function (log) { return log('MonacoEditorModel.revert - enter'); });
                        this.cancelSave();
                        soft = options && options.soft;
                        if (!(soft !== true)) return [3 /*break*/, 4];
                        dirty = this._dirty;
                        this._dirty = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 4]);
                        return [4 /*yield*/, this.sync()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        this._dirty = dirty;
                        return [7 /*endfinally*/];
                    case 4:
                        this.setDirty(false);
                        this.trace(function (log) { return log('MonacoEditorModel.revert - exit'); });
                        return [2 /*return*/];
                }
            });
        });
    };
    MonacoEditorModel.prototype.createSnapshot = function () {
        return {
            value: this.getText()
        };
    };
    MonacoEditorModel.prototype.applySnapshot = function (snapshot) {
        this.model.setValue(snapshot.value);
    };
    MonacoEditorModel.prototype.trace = function (loggable) {
        var _this = this;
        if (this.logger) {
            this.logger.debug(function (log) {
                return loggable(function (message) {
                    var params = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        params[_i - 1] = arguments[_i];
                    }
                    return log.apply(void 0, __spread([message], params, [_this.resource.uri.toString(true)]));
                });
            });
        }
    };
    return MonacoEditorModel;
}());
exports.MonacoEditorModel = MonacoEditorModel;
//# sourceMappingURL=monaco-editor-model.js.map