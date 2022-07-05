"use strict";
/********************************************************************************
 * Copyright (C) 2020 Red Hat, Inc. and others.
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsContribution = void 0;
var inversify_1 = require("inversify");
var comments_decorator_1 = require("./comments-decorator");
var browser_1 = require("@theia/editor/lib/browser");
var monaco_diff_editor_1 = require("@theia/monaco/lib/browser/monaco-diff-editor");
var comment_thread_widget_1 = require("./comment-thread-widget");
var comments_service_1 = require("./comments-service");
var common_1 = require("@theia/core/lib/common");
var vscode_uri_1 = require("vscode-uri");
var comments_context_key_service_1 = require("./comments-context-key-service");
var context_key_service_1 = require("@theia/core/lib/browser/context-key-service");
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// some code copied and modified from https://github.com/microsoft/vscode/blob/1.49.3/src/vs/workbench/contrib/comments/browser/comments.contribution.ts
var CommentsContribution = /** @class */ (function () {
    function CommentsContribution(rangeDecorator, commentService, editorManager) {
        var _this = this;
        this.rangeDecorator = rangeDecorator;
        this.commentService = commentService;
        this.editorManager = editorManager;
        this.emptyThreadsToAddQueue = [];
        this.commentWidgets = [];
        this.commentInfos = [];
        this.commentService.onDidSetResourceCommentInfos(function (e) {
            var editor = _this.getCurrentEditor();
            var editorURI = editor && editor.editor instanceof monaco_diff_editor_1.MonacoDiffEditor && editor.editor.diffEditor.getModifiedEditor().getModel();
            if (editorURI && editorURI.toString() === e.resource.toString()) {
                _this.setComments(e.commentInfos.filter(function (commentInfo) { return commentInfo !== null; }));
            }
        });
        this.editorManager.onCreated(function (widget) { return __awaiter(_this, void 0, void 0, function () {
            var disposables, editor, originalEditorModel, originalComments, modifiedEditorModel, modifiedComments;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        disposables = new common_1.DisposableCollection();
                        editor = widget.editor;
                        if (!(editor instanceof monaco_diff_editor_1.MonacoDiffEditor)) return [3 /*break*/, 5];
                        originalEditorModel = editor.diffEditor.getOriginalEditor().getModel();
                        if (!originalEditorModel) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.commentService.getComments(originalEditorModel.uri)];
                    case 1:
                        originalComments = _a.sent();
                        if (originalComments) {
                            this.rangeDecorator.update(editor.diffEditor.getOriginalEditor(), originalComments.filter(function (c) { return !!c; }));
                        }
                        _a.label = 2;
                    case 2:
                        modifiedEditorModel = editor.diffEditor.getModifiedEditor().getModel();
                        if (!modifiedEditorModel) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.commentService.getComments(modifiedEditorModel.uri)];
                    case 3:
                        modifiedComments = _a.sent();
                        if (modifiedComments) {
                            this.rangeDecorator.update(editor.diffEditor.getModifiedEditor(), modifiedComments.filter(function (c) { return !!c; }));
                        }
                        _a.label = 4;
                    case 4:
                        disposables.push(editor.onMouseDown(function (e) { return _this.onEditorMouseDown(e); }));
                        disposables.push(this.commentService.onDidUpdateCommentThreads(function (e) { return __awaiter(_this, void 0, void 0, function () {
                            var editorURI, commentInfo, added, removed, changed;
                            var _this = this;
                            return __generator(this, function (_a) {
                                editorURI = editor.document.uri;
                                commentInfo = this.commentInfos.filter(function (info) { return info.owner === e.owner; });
                                if (!commentInfo || !commentInfo.length) {
                                    return [2 /*return*/];
                                }
                                added = e.added.filter(function (thread) { return thread.resource && thread.resource.toString() === editorURI.toString(); });
                                removed = e.removed.filter(function (thread) { return thread.resource && thread.resource.toString() === editorURI.toString(); });
                                changed = e.changed.filter(function (thread) { return thread.resource && thread.resource.toString() === editorURI.toString(); });
                                removed.forEach(function (thread) {
                                    var matchedZones = _this.commentWidgets.filter(function (zoneWidget) { return zoneWidget.owner === e.owner
                                        && zoneWidget.commentThread.threadId === thread.threadId && zoneWidget.commentThread.threadId !== ''; });
                                    if (matchedZones.length) {
                                        var matchedZone = matchedZones[0];
                                        var index = _this.commentWidgets.indexOf(matchedZone);
                                        _this.commentWidgets.splice(index, 1);
                                        matchedZone.dispose();
                                    }
                                });
                                changed.forEach(function (thread) {
                                    var matchedZones = _this.commentWidgets.filter(function (zoneWidget) { return zoneWidget.owner === e.owner
                                        && zoneWidget.commentThread.threadId === thread.threadId; });
                                    if (matchedZones.length) {
                                        var matchedZone = matchedZones[0];
                                        matchedZone.update();
                                    }
                                });
                                added.forEach(function (thread) {
                                    _this.displayCommentThread(e.owner, thread);
                                    _this.commentInfos.filter(function (info) { return info.owner === e.owner; })[0].threads.push(thread);
                                });
                                return [2 /*return*/];
                            });
                        }); }));
                        editor.onDispose(function () {
                            disposables.dispose();
                        });
                        this.beginCompute();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        }); });
    }
    CommentsContribution.prototype.onEditorMouseDown = function (e) {
        var mouseDownInfo = null;
        var range = e.target.range;
        if (!range) {
            return;
        }
        if (e.target.type !== monaco.editor.MouseTargetType.GUTTER_LINE_DECORATIONS) {
            return;
        }
        var data = e.target.detail;
        var gutterOffsetX = data.offsetX - data.glyphMarginWidth - data.lineNumbersWidth - data.glyphMarginLeft;
        // don't collide with folding and git decorations
        if (gutterOffsetX > 14) {
            return;
        }
        mouseDownInfo = { lineNumber: range.start };
        var lineNumber = mouseDownInfo.lineNumber;
        mouseDownInfo = null;
        if (!range || range.start !== lineNumber) {
            return;
        }
        if (!e.target.element) {
            return;
        }
        if (e.target.element.className.indexOf('comment-diff-added') >= 0) {
            this.addOrToggleCommentAtLine(e.target.position.line + 1, e);
        }
    };
    CommentsContribution.prototype.beginCompute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var editorModel, editorURI, comments;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        editorModel = this.editor && this.editor.getModel();
                        editorURI = this.editor && editorModel && editorModel.uri;
                        if (!editorURI) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.commentService.getComments(editorURI)];
                    case 1:
                        comments = _a.sent();
                        this.setComments(comments.filter(function (c) { return !!c; }));
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    CommentsContribution.prototype.setComments = function (commentInfos) {
        if (!this.editor) {
            return;
        }
        this.commentInfos = commentInfos;
    };
    Object.defineProperty(CommentsContribution.prototype, "editor", {
        get: function () {
            var editor = this.getCurrentEditor();
            if (editor && editor.editor instanceof monaco_diff_editor_1.MonacoDiffEditor) {
                return editor.editor.diffEditor.getModifiedEditor();
            }
        },
        enumerable: false,
        configurable: true
    });
    CommentsContribution.prototype.displayCommentThread = function (owner, thread) {
        var editor = this.editor;
        if (editor) {
            var provider = this.commentService.getCommentController(owner);
            if (provider) {
                this.commentsContextKeyService.commentController.set(provider.id);
            }
            var zoneWidget_1 = new comment_thread_widget_1.CommentThreadWidget(editor, owner, thread, this.commentService, this.menus, this.commentsContextKeyService, this.commands);
            zoneWidget_1.display({ afterLineNumber: thread.range.startLineNumber, heightInLines: 5 });
            var currentEditor = this.getCurrentEditor();
            if (currentEditor) {
                currentEditor.onDispose(function () { return zoneWidget_1.dispose(); });
            }
            this.commentWidgets.push(zoneWidget_1);
        }
    };
    CommentsContribution.prototype.addOrToggleCommentAtLine = function (lineNumber, e) {
        return __awaiter(this, void 0, void 0, function () {
            var existingCommentsAtLine;
            return __generator(this, function (_a) {
                // If an add is already in progress, queue the next add and process it after the current one finishes to
                // prevent empty comment threads from being added to the same line.
                if (!this.addInProgress) {
                    this.addInProgress = true;
                    existingCommentsAtLine = this.commentWidgets.filter(function (widget) { return widget.getGlyphPosition() === lineNumber; });
                    if (existingCommentsAtLine.length) {
                        existingCommentsAtLine.forEach(function (widget) { return widget.toggleExpand(lineNumber); });
                        this.processNextThreadToAdd();
                        return [2 /*return*/];
                    }
                    else {
                        this.addCommentAtLine(lineNumber, e);
                    }
                }
                else {
                    this.emptyThreadsToAddQueue.push([lineNumber, e]);
                }
                return [2 /*return*/];
            });
        });
    };
    CommentsContribution.prototype.processNextThreadToAdd = function () {
        this.addInProgress = false;
        var info = this.emptyThreadsToAddQueue.shift();
        if (info) {
            this.addOrToggleCommentAtLine(info[0], info[1]);
        }
    };
    CommentsContribution.prototype.getCurrentEditor = function () {
        return this.editorManager.currentEditor;
    };
    CommentsContribution.prototype.addCommentAtLine = function (lineNumber, e) {
        var newCommentInfos = this.rangeDecorator.getMatchedCommentAction(lineNumber);
        var editor = this.getCurrentEditor();
        if (!editor) {
            return Promise.resolve();
        }
        if (!newCommentInfos.length) {
            return Promise.resolve();
        }
        var ownerId = newCommentInfos[0].ownerId;
        this.addCommentAtLine2(lineNumber, ownerId);
        return Promise.resolve();
    };
    CommentsContribution.prototype.addCommentAtLine2 = function (lineNumber, ownerId) {
        var editorModel = this.editor && this.editor.getModel();
        var editorURI = this.editor && editorModel && editorModel.uri;
        if (editorURI) {
            this.commentService.createCommentThreadTemplate(ownerId, vscode_uri_1.URI.parse(editorURI.toString()), {
                startLineNumber: lineNumber,
                endLineNumber: lineNumber,
                startColumn: 1,
                endColumn: 1
            });
            this.processNextThreadToAdd();
        }
    };
    __decorate([
        inversify_1.inject(common_1.MenuModelRegistry),
        __metadata("design:type", common_1.MenuModelRegistry)
    ], CommentsContribution.prototype, "menus", void 0);
    __decorate([
        inversify_1.inject(comments_context_key_service_1.CommentsContextKeyService),
        __metadata("design:type", comments_context_key_service_1.CommentsContextKeyService)
    ], CommentsContribution.prototype, "commentsContextKeyService", void 0);
    __decorate([
        inversify_1.inject(context_key_service_1.ContextKeyService),
        __metadata("design:type", context_key_service_1.ContextKeyService)
    ], CommentsContribution.prototype, "contextKeyService", void 0);
    __decorate([
        inversify_1.inject(common_1.CommandRegistry),
        __metadata("design:type", common_1.CommandRegistry)
    ], CommentsContribution.prototype, "commands", void 0);
    CommentsContribution = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(comments_decorator_1.CommentingRangeDecorator)),
        __param(1, inversify_1.inject(comments_service_1.CommentsService)),
        __param(2, inversify_1.inject(browser_1.EditorManager)),
        __metadata("design:paramtypes", [comments_decorator_1.CommentingRangeDecorator, Object, browser_1.EditorManager])
    ], CommentsContribution);
    return CommentsContribution;
}());
exports.CommentsContribution = CommentsContribution;
//# sourceMappingURL=comments-contribution.js.map