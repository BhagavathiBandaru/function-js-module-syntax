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
exports.ExtHostCommentThread = exports.CommentsExtImpl = void 0;
var vscode_uri_1 = require("vscode-uri");
var plugin_api_rpc_model_1 = require("../common/plugin-api-rpc-model");
var event_1 = require("@theia/core/lib/common/event");
var disposable_1 = require("@theia/core/lib/common/disposable");
var type_converters_1 = require("./type-converters");
var types_impl_1 = require("./types-impl");
var plugin_api_rpc_1 = require("../common/plugin-api-rpc");
var CommentsExtImpl = /** @class */ (function () {
    function CommentsExtImpl(rpc, commands, _documents) {
        var _this = this;
        this.rpc = rpc;
        this.commands = commands;
        this._documents = _documents;
        this.handle = 0;
        this.commentControllers = new Map();
        this.commentControllersByExtension = new Map();
        this.proxy = rpc.getProxy(plugin_api_rpc_1.PLUGIN_RPC_CONTEXT.COMMENTS_MAIN);
        commands.registerArgumentProcessor({
            processArgument: function (arg) {
                if (plugin_api_rpc_1.CommentsCommandArg.is(arg)) {
                    var commentController = _this.commentControllers.get(arg.commentControlHandle);
                    if (!commentController) {
                        return arg;
                    }
                    var commentThread = commentController.getCommentThread(arg.commentThreadHandle);
                    if (!commentThread) {
                        return arg;
                    }
                    return {
                        thread: commentThread,
                        text: arg.text
                    };
                }
                else if (plugin_api_rpc_1.CommentsContextCommandArg.is(arg)) {
                    var commentController = _this.commentControllers.get(arg.commentControlHandle);
                    if (!commentController) {
                        return arg;
                    }
                    var commentThread = commentController.getCommentThread(arg.commentThreadHandle);
                    if (!commentThread) {
                        return arg;
                    }
                    var comment = commentThread.getCommentByUniqueId(arg.commentUniqueId);
                    if (!comment) {
                        return arg;
                    }
                    return comment;
                }
                else if (plugin_api_rpc_1.CommentsEditCommandArg.is(arg)) {
                    var commentController = _this.commentControllers.get(arg.commentControlHandle);
                    if (!commentController) {
                        return arg;
                    }
                    var commentThread = commentController.getCommentThread(arg.commentThreadHandle);
                    if (!commentThread) {
                        return arg;
                    }
                    var comment = commentThread.getCommentByUniqueId(arg.commentUniqueId);
                    if (!comment) {
                        return arg;
                    }
                    comment.body = arg.text;
                    return comment;
                }
                return arg;
            }
        });
    }
    CommentsExtImpl.prototype.createCommentController = function (plugin, id, label) {
        var handle = this.handle++;
        var commentController = new CommentController(plugin.model.id, this.proxy, handle, id, label);
        this.commentControllers.set(commentController.handle, commentController);
        var commentControllers = this.commentControllersByExtension.get(plugin.model.id.toLowerCase()) || [];
        commentControllers.push(commentController);
        this.commentControllersByExtension.set(plugin.model.id.toLowerCase(), commentControllers);
        return commentController;
    };
    CommentsExtImpl.prototype.$createCommentThreadTemplate = function (commentControllerHandle, uriComponents, range) {
        var commentController = this.commentControllers.get(commentControllerHandle);
        if (!commentController) {
            return;
        }
        commentController.$createCommentThreadTemplate(uriComponents, range);
    };
    CommentsExtImpl.prototype.$updateCommentThreadTemplate = function (commentControllerHandle, threadHandle, range) {
        return __awaiter(this, void 0, void 0, function () {
            var commentController;
            return __generator(this, function (_a) {
                commentController = this.commentControllers.get(commentControllerHandle);
                if (!commentController) {
                    return [2 /*return*/];
                }
                commentController.$updateCommentThreadTemplate(threadHandle, range);
                return [2 /*return*/];
            });
        });
    };
    CommentsExtImpl.prototype.$deleteCommentThread = function (commentControllerHandle, commentThreadHandle) {
        return __awaiter(this, void 0, void 0, function () {
            var commentController;
            return __generator(this, function (_a) {
                commentController = this.commentControllers.get(commentControllerHandle);
                if (commentController) {
                    commentController.$deleteCommentThread(commentThreadHandle);
                }
                return [2 /*return*/];
            });
        });
    };
    CommentsExtImpl.prototype.$provideCommentingRanges = function (commentControllerHandle, uriComponents, token) {
        return __awaiter(this, void 0, void 0, function () {
            var commentController, documentData, ranges;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        commentController = this.commentControllers.get(commentControllerHandle);
                        if (!commentController || !commentController.commentingRangeProvider) {
                            return [2 /*return*/, Promise.resolve(undefined)];
                        }
                        documentData = this._documents.getDocumentData(vscode_uri_1.URI.revive(uriComponents));
                        if (!documentData) return [3 /*break*/, 2];
                        return [4 /*yield*/, commentController.commentingRangeProvider.provideCommentingRanges(documentData.document, token)];
                    case 1:
                        ranges = _a.sent();
                        if (ranges) {
                            return [2 /*return*/, ranges.map(function (x) { return type_converters_1.fromRange(x); })];
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    return CommentsExtImpl;
}());
exports.CommentsExtImpl = CommentsExtImpl;
var ExtHostCommentThread = /** @class */ (function () {
    function ExtHostCommentThread(proxy, commentController, _id, _uri, _range, _comments, extensionId) {
        var _this = this;
        this.proxy = proxy;
        this.commentController = commentController;
        this._id = _id;
        this._uri = _uri;
        this._range = _range;
        this._comments = _comments;
        this.handle = ExtHostCommentThread._handlePool++;
        this.commentHandle = 0;
        this.modifications = Object.create(null);
        this._onDidUpdateCommentThread = new event_1.Emitter();
        this.onDidUpdateCommentThread = this._onDidUpdateCommentThread.event;
        this.commentsMap = new Map();
        this.acceptInputDisposables = new disposable_1.DisposableCollection();
        if (this._id === undefined) {
            this._id = commentController.id + "." + this.handle;
        }
        this.proxy.$createCommentThread(this.commentController.handle, this.handle, this._id, this._uri, type_converters_1.fromRange(this._range), extensionId);
        this.localDisposables = [];
        this._isDisposed = false;
        this.localDisposables.push(this.onDidUpdateCommentThread(function () {
            _this.eventuallyUpdateCommentThread();
        }));
        // set up comments after ctor to batch update events.
        this.comments = _comments;
    }
    Object.defineProperty(ExtHostCommentThread.prototype, "threadId", {
        get: function () {
            return this._id;
        },
        set: function (id) {
            this._id = id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExtHostCommentThread.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExtHostCommentThread.prototype, "resource", {
        get: function () {
            return this._uri;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExtHostCommentThread.prototype, "uri", {
        get: function () {
            return this._uri;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExtHostCommentThread.prototype, "range", {
        get: function () {
            return this._range;
        },
        set: function (range) {
            if (!range.isEqual(this._range)) {
                this._range = range;
                this.modifications.range = range;
                this._onDidUpdateCommentThread.fire();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExtHostCommentThread.prototype, "label", {
        get: function () {
            return this._label;
        },
        set: function (label) {
            this._label = label;
            this.modifications.label = label;
            this._onDidUpdateCommentThread.fire();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExtHostCommentThread.prototype, "contextValue", {
        get: function () {
            return this._contextValue;
        },
        set: function (context) {
            this._contextValue = context;
            this.modifications.contextValue = context;
            this._onDidUpdateCommentThread.fire();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExtHostCommentThread.prototype, "comments", {
        get: function () {
            return this._comments;
        },
        set: function (newComments) {
            this._comments = newComments;
            this.modifications.comments = newComments;
            this._onDidUpdateCommentThread.fire();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExtHostCommentThread.prototype, "collapsibleState", {
        get: function () {
            return this.collapseState;
        },
        set: function (newState) {
            this.collapseState = newState;
            this.modifications.collapsibleState = newState;
            this._onDidUpdateCommentThread.fire();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExtHostCommentThread.prototype, "isDisposed", {
        get: function () {
            return this._isDisposed;
        },
        enumerable: false,
        configurable: true
    });
    ExtHostCommentThread.prototype.eventuallyUpdateCommentThread = function () {
        var _this = this;
        if (this._isDisposed) {
            return;
        }
        var modified = function (value) {
            return Object.prototype.hasOwnProperty.call(_this.modifications, value);
        };
        var formattedModifications = {};
        if (modified('range')) {
            formattedModifications.range = type_converters_1.fromRange(this._range);
        }
        if (modified('label')) {
            formattedModifications.label = this.label;
        }
        if (modified('contextValue')) {
            formattedModifications.contextValue = this.contextValue;
        }
        if (modified('comments')) {
            formattedModifications.comments =
                this._comments.map(function (cmt) { return convertToModeComment(_this, _this.commentController, cmt, _this.commentsMap); });
        }
        if (modified('collapsibleState')) {
            formattedModifications.collapseState = convertToCollapsibleState(this.collapseState);
        }
        this.modifications = {};
        this.proxy.$updateCommentThread(this.commentController.handle, this.handle, this._id, this._uri, formattedModifications);
    };
    ExtHostCommentThread.prototype.getCommentByUniqueId = function (uniqueId) {
        var e_1, _a;
        try {
            for (var _b = __values(this.commentsMap), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                var comment = key[0];
                var id = key[1];
                if (uniqueId === id) {
                    return comment;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return;
    };
    ExtHostCommentThread.prototype.dispose = function () {
        this._isDisposed = true;
        this.acceptInputDisposables.dispose();
        this.localDisposables.forEach(function (disposable) { return disposable.dispose(); });
        this.proxy.$deleteCommentThread(this.commentController.handle, this.handle);
    };
    ExtHostCommentThread._handlePool = 0;
    return ExtHostCommentThread;
}());
exports.ExtHostCommentThread = ExtHostCommentThread;
var CommentController = /** @class */ (function () {
    function CommentController(extension, proxy, _handle, _id, _label) {
        this.extension = extension;
        this.proxy = proxy;
        this._handle = _handle;
        this._id = _id;
        this._label = _label;
        this.threads = new Map();
        this.proxy.$registerCommentController(this.handle, _id, _label);
    }
    Object.defineProperty(CommentController.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommentController.prototype, "label", {
        get: function () {
            return this._label;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommentController.prototype, "handle", {
        get: function () {
            return this._handle;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommentController.prototype, "options", {
        get: function () {
            return this._options;
        },
        set: function (options) {
            this._options = options;
            this.proxy.$updateCommentControllerFeatures(this.handle, { options: this._options });
        },
        enumerable: false,
        configurable: true
    });
    CommentController.prototype.createCommentThread = function (arg0, arg1, arg2, arg3) {
        if (typeof arg0 === 'string') {
            var commentThread = new ExtHostCommentThread(this.proxy, this, arg0, arg1, arg2, arg3, this.extension);
            this.threads.set(commentThread.handle, commentThread);
            return commentThread;
        }
        else {
            var commentThread = new ExtHostCommentThread(this.proxy, this, undefined, arg0, arg1, arg2, this.extension);
            this.threads.set(commentThread.handle, commentThread);
            return commentThread;
        }
    };
    CommentController.prototype.$createCommentThreadTemplate = function (uriComponents, range) {
        var commentThread = new ExtHostCommentThread(this.proxy, this, undefined, vscode_uri_1.URI.revive(uriComponents), type_converters_1.toRange(range), [], this.extension);
        commentThread.collapsibleState = plugin_api_rpc_model_1.CommentThreadCollapsibleState.Expanded;
        this.threads.set(commentThread.handle, commentThread);
        return commentThread;
    };
    CommentController.prototype.$updateCommentThreadTemplate = function (threadHandle, range) {
        var thread = this.threads.get(threadHandle);
        if (thread) {
            thread.range = type_converters_1.toRange(range);
        }
    };
    CommentController.prototype.$deleteCommentThread = function (threadHandle) {
        var thread = this.threads.get(threadHandle);
        if (thread) {
            thread.dispose();
        }
        this.threads.delete(threadHandle);
    };
    CommentController.prototype.getCommentThread = function (handle) {
        return this.threads.get(handle);
    };
    CommentController.prototype.dispose = function () {
        this.threads.forEach(function (value) {
            value.dispose();
        });
        this.proxy.$unregisterCommentController(this.handle);
    };
    return CommentController;
}());
function convertToModeComment(thread, commentController, theiaComment, commentsMap) {
    var commentUniqueId = commentsMap.get(theiaComment);
    if (!commentUniqueId) {
        commentUniqueId = ++thread.commentHandle;
        commentsMap.set(theiaComment, commentUniqueId);
    }
    var iconPath = theiaComment.author && theiaComment.author.iconPath ? theiaComment.author.iconPath.toString() : undefined;
    return {
        mode: theiaComment.mode,
        contextValue: theiaComment.contextValue,
        uniqueIdInThread: commentUniqueId,
        body: type_converters_1.fromMarkdown(theiaComment.body),
        userName: theiaComment.author.name,
        userIconPath: iconPath,
        label: theiaComment.label,
    };
}
function convertToCollapsibleState(kind) {
    if (kind !== undefined) {
        switch (kind) {
            case types_impl_1.CommentThreadCollapsibleState.Expanded:
                return plugin_api_rpc_model_1.CommentThreadCollapsibleState.Expanded;
            case types_impl_1.CommentThreadCollapsibleState.Collapsed:
                return plugin_api_rpc_model_1.CommentThreadCollapsibleState.Collapsed;
        }
    }
    return plugin_api_rpc_model_1.CommentThreadCollapsibleState.Collapsed;
}
//# sourceMappingURL=comments.js.map