"use strict";
/********************************************************************************
 * Copyright (C) 2019 Arm and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitHistorySupport = void 0;
var inversify_1 = require("inversify");
var core_1 = require("@theia/core");
var common_1 = require("../../common");
var git_scm_provider_1 = require("../git-scm-provider");
var git_repository_tracker_1 = require("../git-repository-tracker");
var GitHistorySupport = /** @class */ (function () {
    function GitHistorySupport() {
        var _this = this;
        this.onDidChangeHistoryEmitter = new core_1.Emitter({
            onFirstListenerAdd: function () { return _this.onFirstListenerAdd(); },
            onLastListenerRemove: function () { return _this.onLastListenerRemove(); }
        });
        this.onDidChangeHistory = this.onDidChangeHistoryEmitter.event;
    }
    GitHistorySupport.prototype.getCommitHistory = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var repository, gitOptions, commits, pathIsUnderVersionControl, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        repository = this.provider.repository;
                        gitOptions = {
                            uri: options ? options.uri : undefined,
                            maxCount: options ? options.maxCount : undefined,
                            shortSha: true
                        };
                        return [4 /*yield*/, this.git.log(repository, gitOptions)];
                    case 1:
                        commits = _b.sent();
                        if (!(commits.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, commits.map(function (commit) { return _this.provider.createScmHistoryCommit(commit); })];
                    case 2:
                        _a = !options || !options.uri;
                        if (_a) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.git.lsFiles(repository, options.uri, { errorUnmatch: true })];
                    case 3:
                        _a = (_b.sent());
                        _b.label = 4;
                    case 4:
                        pathIsUnderVersionControl = _a;
                        if (!pathIsUnderVersionControl) {
                            throw new Error('It is not under version control.');
                        }
                        else {
                            throw new Error('No commits have been committed.');
                        }
                        _b.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    GitHistorySupport.prototype.onFirstListenerAdd = function () {
        var _this = this;
        this.onGitEventDisposable = this.repositoryTracker.onGitEvent(function (event) {
            var _a = event || { status: undefined, oldStatus: undefined }, status = _a.status, oldStatus = _a.oldStatus;
            var isBranchChanged = false;
            var isHeaderChanged = false;
            if (oldStatus) {
                isBranchChanged = !!status && status.branch !== oldStatus.branch;
                isHeaderChanged = !!status && status.currentHead !== oldStatus.currentHead;
            }
            if (isBranchChanged || isHeaderChanged || oldStatus === undefined) {
                _this.onDidChangeHistoryEmitter.fire(undefined);
            }
        });
    };
    GitHistorySupport.prototype.onLastListenerRemove = function () {
        if (this.onGitEventDisposable) {
            this.onGitEventDisposable.dispose();
            this.onGitEventDisposable = undefined;
        }
    };
    __decorate([
        inversify_1.inject(git_scm_provider_1.GitScmProvider),
        __metadata("design:type", git_scm_provider_1.GitScmProvider)
    ], GitHistorySupport.prototype, "provider", void 0);
    __decorate([
        inversify_1.inject(common_1.Git),
        __metadata("design:type", Object)
    ], GitHistorySupport.prototype, "git", void 0);
    __decorate([
        inversify_1.inject(git_repository_tracker_1.GitRepositoryTracker),
        __metadata("design:type", git_repository_tracker_1.GitRepositoryTracker)
    ], GitHistorySupport.prototype, "repositoryTracker", void 0);
    GitHistorySupport = __decorate([
        inversify_1.injectable()
    ], GitHistorySupport);
    return GitHistorySupport;
}());
exports.GitHistorySupport = GitHistorySupport;
//# sourceMappingURL=git-history-support.js.map