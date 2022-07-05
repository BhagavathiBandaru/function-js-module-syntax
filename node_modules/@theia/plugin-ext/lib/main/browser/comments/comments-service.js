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
exports.PluginCommentService = exports.CommentsService = void 0;
var inversify_1 = require("inversify");
var event_1 = require("@theia/core/lib/common/event");
var cancellation_1 = require("@theia/core/lib/common/cancellation");
exports.CommentsService = Symbol('CommentsService');
var PluginCommentService = /** @class */ (function () {
    function PluginCommentService() {
        this.onDidSetDataProviderEmitter = new event_1.Emitter();
        this.onDidSetDataProvider = this.onDidSetDataProviderEmitter.event;
        this.onDidDeleteDataProviderEmitter = new event_1.Emitter();
        this.onDidDeleteDataProvider = this.onDidDeleteDataProviderEmitter.event;
        this.onDidSetResourceCommentInfosEmitter = new event_1.Emitter();
        this.onDidSetResourceCommentInfos = this.onDidSetResourceCommentInfosEmitter.event;
        this.onDidSetAllCommentThreadsEmitter = new event_1.Emitter();
        this.onDidSetAllCommentThreads = this.onDidSetAllCommentThreadsEmitter.event;
        this.onDidUpdateCommentThreadsEmitter = new event_1.Emitter();
        this.onDidUpdateCommentThreads = this.onDidUpdateCommentThreadsEmitter.event;
        this.onDidChangeActiveCommentThreadEmitter = new event_1.Emitter();
        this.onDidChangeActiveCommentThread = this.onDidChangeActiveCommentThreadEmitter.event;
        this.onDidChangeActiveCommentingRangeEmitter = new event_1.Emitter();
        this.onDidChangeActiveCommentingRange = this.onDidChangeActiveCommentingRangeEmitter.event;
        this.commentControls = new Map();
    }
    PluginCommentService.prototype.setActiveCommentThread = function (commentThread) {
        this.onDidChangeActiveCommentThreadEmitter.fire(commentThread);
    };
    PluginCommentService.prototype.setDocumentComments = function (resource, commentInfos) {
        this.onDidSetResourceCommentInfosEmitter.fire({ resource: resource, commentInfos: commentInfos });
    };
    PluginCommentService.prototype.setWorkspaceComments = function (owner, commentsByResource) {
        this.onDidSetAllCommentThreadsEmitter.fire({ ownerId: owner, commentThreads: commentsByResource });
    };
    PluginCommentService.prototype.removeWorkspaceComments = function (owner) {
        this.onDidSetAllCommentThreadsEmitter.fire({ ownerId: owner, commentThreads: [] });
    };
    PluginCommentService.prototype.registerCommentController = function (owner, commentControl) {
        this.commentControls.set(owner, commentControl);
        this.onDidSetDataProviderEmitter.fire();
    };
    PluginCommentService.prototype.unregisterCommentController = function (owner) {
        this.commentControls.delete(owner);
        this.onDidDeleteDataProviderEmitter.fire(owner);
    };
    PluginCommentService.prototype.getCommentController = function (owner) {
        return this.commentControls.get(owner);
    };
    PluginCommentService.prototype.createCommentThreadTemplate = function (owner, resource, range) {
        var commentController = this.commentControls.get(owner);
        if (!commentController) {
            return;
        }
        commentController.createCommentThreadTemplate(resource, range);
    };
    PluginCommentService.prototype.updateCommentThreadTemplate = function (owner, threadHandle, range) {
        return __awaiter(this, void 0, void 0, function () {
            var commentController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        commentController = this.commentControls.get(owner);
                        if (!commentController) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, commentController.updateCommentThreadTemplate(threadHandle, range)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PluginCommentService.prototype.disposeCommentThread = function (owner, threadId) {
        var controller = this.getCommentController(owner);
        if (controller) {
            controller.deleteCommentThreadMain(threadId);
        }
    };
    PluginCommentService.prototype.updateComments = function (ownerId, event) {
        var evt = Object.assign({}, event, { owner: ownerId });
        this.onDidUpdateCommentThreadsEmitter.fire(evt);
    };
    PluginCommentService.prototype.getComments = function (resource) {
        return __awaiter(this, void 0, void 0, function () {
            var commentControlResult;
            return __generator(this, function (_a) {
                commentControlResult = [];
                this.commentControls.forEach(function (control) {
                    commentControlResult.push(control.getDocumentComments(resource, cancellation_1.CancellationToken.None)
                        .catch(function (e) {
                        console.log(e);
                        return null;
                    }));
                });
                return [2 /*return*/, Promise.all(commentControlResult)];
            });
        });
    };
    PluginCommentService.prototype.getCommentingRanges = function (resource) {
        return __awaiter(this, void 0, void 0, function () {
            var commentControlResult, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        commentControlResult = [];
                        this.commentControls.forEach(function (control) {
                            commentControlResult.push(control.getCommentingRanges(resource, cancellation_1.CancellationToken.None));
                        });
                        return [4 /*yield*/, Promise.all(commentControlResult)];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret.reduce(function (prev, curr) {
                                prev.push.apply(prev, __spread(curr));
                                return prev;
                            }, [])];
                }
            });
        });
    };
    PluginCommentService = __decorate([
        inversify_1.injectable()
    ], PluginCommentService);
    return PluginCommentService;
}());
exports.PluginCommentService = PluginCommentService;
//# sourceMappingURL=comments-service.js.map