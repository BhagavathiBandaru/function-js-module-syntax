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
exports.CommentsMainImp = exports.CommentController = exports.CommentThreadImpl = void 0;
var event_1 = require("@theia/core/lib/common/event");
var plugin_api_rpc_1 = require("../../../common/plugin-api-rpc");
var comments_service_1 = require("./comments-service");
var vscode_uri_1 = require("vscode-uri");
var uuid_1 = require("uuid");
var comments_contribution_1 = require("./comments-contribution");
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// some code copied and modified from https://github.com/microsoft/vscode/blob/1.49.3/src/vs/workbench/api/browser/mainThreadComments.ts
var CommentThreadImpl = /** @class */ (function () {
    function CommentThreadImpl(commentThreadHandle, controllerHandle, extensionId, threadId, resource, _range) {
        this.commentThreadHandle = commentThreadHandle;
        this.controllerHandle = controllerHandle;
        this.extensionId = extensionId;
        this.threadId = threadId;
        this.resource = resource;
        this._range = _range;
        this.onDidChangeInputEmitter = new event_1.Emitter();
        this.onDidChangeLabelEmitter = new event_1.Emitter();
        this.onDidChangeLabel = this.onDidChangeLabelEmitter.event;
        this.onDidChangeCommentsEmitter = new event_1.Emitter();
        this.onDidChangeRangeEmitter = new event_1.Emitter();
        this.onDidChangeRange = this.onDidChangeRangeEmitter.event;
        this.onDidChangeCollapsibleStateEmitter = new event_1.Emitter();
        this.onDidChangeCollapsibleState = this.onDidChangeCollapsibleStateEmitter.event;
        this._isDisposed = false;
    }
    Object.defineProperty(CommentThreadImpl.prototype, "input", {
        get: function () {
            return this._input;
        },
        set: function (value) {
            this._input = value;
            this.onDidChangeInputEmitter.fire(value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommentThreadImpl.prototype, "onDidChangeInput", {
        get: function () { return this.onDidChangeInputEmitter.event; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommentThreadImpl.prototype, "label", {
        get: function () {
            return this._label;
        },
        set: function (label) {
            this._label = label;
            this.onDidChangeLabelEmitter.fire(this._label);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommentThreadImpl.prototype, "contextValue", {
        get: function () {
            return this._contextValue;
        },
        set: function (context) {
            this._contextValue = context;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommentThreadImpl.prototype, "comments", {
        get: function () {
            return this._comments;
        },
        set: function (newComments) {
            this._comments = newComments;
            this.onDidChangeCommentsEmitter.fire(this._comments);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommentThreadImpl.prototype, "onDidChangeComments", {
        get: function () { return this.onDidChangeCommentsEmitter.event; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommentThreadImpl.prototype, "range", {
        get: function () {
            return this._range;
        },
        set: function (range) {
            this._range = range;
            this.onDidChangeRangeEmitter.fire(this._range);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommentThreadImpl.prototype, "collapsibleState", {
        get: function () {
            return this._collapsibleState;
        },
        set: function (newState) {
            this._collapsibleState = newState;
            this.onDidChangeCollapsibleStateEmitter.fire(this._collapsibleState);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommentThreadImpl.prototype, "isDisposed", {
        get: function () {
            return this._isDisposed;
        },
        enumerable: false,
        configurable: true
    });
    CommentThreadImpl.prototype.batchUpdate = function (changes) {
        var modified = function (value) {
            return Object.prototype.hasOwnProperty.call(changes, value);
        };
        if (modified('range')) {
            this._range = changes.range;
        }
        if (modified('label')) {
            this._label = changes.label;
        }
        if (modified('contextValue')) {
            this._contextValue = changes.contextValue;
        }
        if (modified('comments')) {
            this._comments = changes.comments;
        }
        if (modified('collapseState')) {
            this._collapsibleState = changes.collapseState;
        }
    };
    CommentThreadImpl.prototype.dispose = function () {
        this._isDisposed = true;
        this.onDidChangeCollapsibleStateEmitter.dispose();
        this.onDidChangeCommentsEmitter.dispose();
        this.onDidChangeInputEmitter.dispose();
        this.onDidChangeLabelEmitter.dispose();
        this.onDidChangeRangeEmitter.dispose();
    };
    return CommentThreadImpl;
}());
exports.CommentThreadImpl = CommentThreadImpl;
var CommentController = /** @class */ (function () {
    function CommentController(_proxy, _commentService, _handle, _uniqueId, _id, _label, _features) {
        this._proxy = _proxy;
        this._commentService = _commentService;
        this._handle = _handle;
        this._uniqueId = _uniqueId;
        this._id = _id;
        this._label = _label;
        this._features = _features;
        this.threads = new Map();
    }
    Object.defineProperty(CommentController.prototype, "handle", {
        get: function () {
            return this._handle;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommentController.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommentController.prototype, "contextValue", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommentController.prototype, "proxy", {
        get: function () {
            return this._proxy;
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
    Object.defineProperty(CommentController.prototype, "options", {
        get: function () {
            return this._features.options;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommentController.prototype, "features", {
        get: function () {
            return this._features;
        },
        enumerable: false,
        configurable: true
    });
    CommentController.prototype.updateFeatures = function (features) {
        this._features = features;
    };
    CommentController.prototype.createCommentThread = function (extensionId, commentThreadHandle, threadId, resource, range) {
        var thread = new CommentThreadImpl(commentThreadHandle, this.handle, extensionId, threadId, vscode_uri_1.URI.revive(resource).toString(), range);
        this.threads.set(commentThreadHandle, thread);
        this._commentService.updateComments(this._uniqueId, {
            added: [thread],
            removed: [],
            changed: []
        });
        return thread;
    };
    CommentController.prototype.updateCommentThread = function (commentThreadHandle, threadId, resource, changes) {
        var thread = this.getKnownThread(commentThreadHandle);
        thread.batchUpdate(changes);
        this._commentService.updateComments(this._uniqueId, {
            added: [],
            removed: [],
            changed: [thread]
        });
    };
    CommentController.prototype.deleteCommentThread = function (commentThreadHandle) {
        var thread = this.getKnownThread(commentThreadHandle);
        this.threads.delete(commentThreadHandle);
        this._commentService.updateComments(this._uniqueId, {
            added: [],
            removed: [thread],
            changed: []
        });
        thread.dispose();
    };
    CommentController.prototype.deleteCommentThreadMain = function (commentThreadId) {
        var _this = this;
        this.threads.forEach(function (thread) {
            if (thread.threadId === commentThreadId) {
                _this._proxy.$deleteCommentThread(_this._handle, thread.commentThreadHandle);
            }
        });
    };
    CommentController.prototype.updateInput = function (input) {
        var thread = this.activeCommentThread;
        if (thread && thread.input) {
            var commentInput = thread.input;
            commentInput.value = input;
            thread.input = commentInput;
        }
    };
    CommentController.prototype.getKnownThread = function (commentThreadHandle) {
        var thread = this.threads.get(commentThreadHandle);
        if (!thread) {
            throw new Error('unknown thread');
        }
        return thread;
    };
    CommentController.prototype.getDocumentComments = function (resource, token) {
        return __awaiter(this, void 0, void 0, function () {
            var ret, _a, _b, thread, commentThread, commentingRanges;
            var e_1, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        ret = [];
                        try {
                            for (_a = __values(__spread(this.threads.keys())), _b = _a.next(); !_b.done; _b = _a.next()) {
                                thread = _b.value;
                                commentThread = this.threads.get(thread);
                                if (commentThread.resource === resource.toString()) {
                                    ret.push(commentThread);
                                }
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        return [4 /*yield*/, this._proxy.$provideCommentingRanges(this.handle, resource, token)];
                    case 1:
                        commentingRanges = _d.sent();
                        return [2 /*return*/, {
                                owner: this._uniqueId,
                                label: this.label,
                                threads: ret,
                                commentingRanges: {
                                    resource: resource,
                                    ranges: commentingRanges || []
                                }
                            }];
                }
            });
        });
    };
    CommentController.prototype.getCommentingRanges = function (resource, token) {
        return __awaiter(this, void 0, void 0, function () {
            var commentingRanges;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._proxy.$provideCommentingRanges(this.handle, resource, token)];
                    case 1:
                        commentingRanges = _a.sent();
                        return [2 /*return*/, commentingRanges || []];
                }
            });
        });
    };
    CommentController.prototype.getAllComments = function () {
        var e_2, _a;
        var ret = [];
        try {
            for (var _b = __values(__spread(this.threads.keys())), _c = _b.next(); !_c.done; _c = _b.next()) {
                var thread = _c.value;
                ret.push(this.threads.get(thread));
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return ret;
    };
    CommentController.prototype.createCommentThreadTemplate = function (resource, range) {
        this._proxy.$createCommentThreadTemplate(this.handle, resource, range);
    };
    CommentController.prototype.updateCommentThreadTemplate = function (threadHandle, range) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._proxy.$updateCommentThreadTemplate(this.handle, threadHandle, range)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return CommentController;
}());
exports.CommentController = CommentController;
var CommentsMainImp = /** @class */ (function () {
    function CommentsMainImp(rpc, container) {
        var _this = this;
        this.documentProviders = new Map();
        this.workspaceProviders = new Map();
        this.handlers = new Map();
        this.commentControllers = new Map();
        this.proxy = rpc.getProxy(plugin_api_rpc_1.MAIN_RPC_CONTEXT.COMMENTS_EXT);
        container.get(comments_contribution_1.CommentsContribution);
        this.commentService = container.get(comments_service_1.CommentsService);
        this.commentService.onDidChangeActiveCommentThread(function (thread) { return __awaiter(_this, void 0, void 0, function () {
            var handle, controller;
            return __generator(this, function (_a) {
                handle = thread.controllerHandle;
                controller = this.commentControllers.get(handle);
                if (!controller) {
                    return [2 /*return*/];
                }
                this.activeCommentThread = thread;
                controller.activeCommentThread = this.activeCommentThread;
                return [2 /*return*/];
            });
        }); });
    }
    CommentsMainImp.prototype.$registerCommentController = function (handle, id, label) {
        var providerId = uuid_1.v4();
        this.handlers.set(handle, providerId);
        var provider = new CommentController(this.proxy, this.commentService, handle, providerId, id, label, {});
        this.commentService.registerCommentController(providerId, provider);
        this.commentControllers.set(handle, provider);
        this.commentService.setWorkspaceComments(String(handle), []);
    };
    CommentsMainImp.prototype.$unregisterCommentController = function (handle) {
        var providerId = this.handlers.get(handle);
        if (typeof providerId !== 'string') {
            throw new Error('unknown handler');
        }
        this.commentService.unregisterCommentController(providerId);
        this.handlers.delete(handle);
        this.commentControllers.delete(handle);
    };
    CommentsMainImp.prototype.$updateCommentControllerFeatures = function (handle, features) {
        var provider = this.commentControllers.get(handle);
        if (!provider) {
            return undefined;
        }
        provider.updateFeatures(features);
    };
    CommentsMainImp.prototype.$createCommentThread = function (handle, commentThreadHandle, threadId, resource, range, extensionId) {
        var provider = this.commentControllers.get(handle);
        if (!provider) {
            return undefined;
        }
        return provider.createCommentThread(extensionId, commentThreadHandle, threadId, resource, range);
    };
    CommentsMainImp.prototype.$updateCommentThread = function (handle, commentThreadHandle, threadId, resource, changes) {
        var provider = this.commentControllers.get(handle);
        if (!provider) {
            return undefined;
        }
        return provider.updateCommentThread(commentThreadHandle, threadId, resource, changes);
    };
    CommentsMainImp.prototype.$deleteCommentThread = function (handle, commentThreadHandle) {
        var provider = this.commentControllers.get(handle);
        if (!provider) {
            return;
        }
        return provider.deleteCommentThread(commentThreadHandle);
    };
    CommentsMainImp.prototype.getHandler = function (handle) {
        if (!this.handlers.has(handle)) {
            throw new Error('Unknown handler');
        }
        return this.handlers.get(handle);
    };
    CommentsMainImp.prototype.$onDidCommentThreadsChange = function (handle, event) {
        var providerId = this.getHandler(handle);
        this.commentService.updateComments(providerId, event);
    };
    CommentsMainImp.prototype.dispose = function () {
        this.workspaceProviders.forEach(function (value) { return value.dispose(); });
        this.workspaceProviders.clear();
        this.documentProviders.forEach(function (value) { return value.dispose(); });
        this.documentProviders.clear();
    };
    return CommentsMainImp;
}());
exports.CommentsMainImp = CommentsMainImp;
//# sourceMappingURL=comments-main.js.map