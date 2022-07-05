"use strict";
/********************************************************************************
 * Copyright (C) 2020 Arm and others.
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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.GitDiffTreeModel = void 0;
var inversify_1 = require("inversify");
var common_1 = require("@theia/core/lib/common");
var uri_1 = require("@theia/core/lib/common/uri");
var scm_tree_model_1 = require("@theia/scm/lib/browser/scm-tree-model");
var common_2 = require("../../common");
var scm_service_1 = require("@theia/scm/lib/browser/scm-service");
var git_scm_provider_1 = require("../git-scm-provider");
var git_resource_opener_1 = require("./git-resource-opener");
var GitDiffTreeModel = /** @class */ (function (_super) {
    __extends(GitDiffTreeModel, _super);
    function GitDiffTreeModel() {
        var _this = _super.call(this) || this;
        _this._groups = [];
        _this.toDisposeOnContentChange = new common_1.DisposableCollection();
        _this.toDispose.push(_this.toDisposeOnContentChange);
        return _this;
    }
    GitDiffTreeModel.prototype.setContent = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var rootUri, diffOptions, scmRepository, provider_1;
            var _this = this;
            return __generator(this, function (_a) {
                rootUri = options.rootUri, diffOptions = options.diffOptions;
                this.toDisposeOnContentChange.dispose();
                scmRepository = this.scmService.findRepository(new uri_1.default(rootUri));
                if (scmRepository && scmRepository.provider.id === 'git') {
                    provider_1 = scmRepository.provider;
                    this.provider = provider_1;
                    this.diffOptions = diffOptions;
                    this.refreshRepository(provider_1);
                    this.toDisposeOnContentChange.push(provider_1.onDidChange(function () {
                        _this.refreshRepository(provider_1);
                    }));
                }
                return [2 /*return*/];
            });
        });
    };
    GitDiffTreeModel.prototype.refreshRepository = function (provider) {
        return __awaiter(this, void 0, void 0, function () {
            var repository, gitFileChanges, group, resources, changesGroup;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        repository = { localUri: provider.rootUri };
                        return [4 /*yield*/, this.git.diff(repository, this.diffOptions)];
                    case 1:
                        gitFileChanges = _a.sent();
                        group = { id: 'changes', label: 'Files Changed', resources: [], provider: provider, dispose: function () { } };
                        resources = gitFileChanges
                            .map(function (change) { return new git_scm_provider_1.GitScmFileChange(change, provider, _this.diffOptions.range); })
                            .map(function (change) { return ({
                            sourceUri: new uri_1.default(change.uri),
                            decorations: {
                                letter: common_2.GitFileStatus.toAbbreviation(change.gitFileChange.status, true),
                                color: common_2.GitFileStatus.getColor(change.gitFileChange.status, true),
                                tooltip: common_2.GitFileStatus.toString(change.gitFileChange.status, true)
                            },
                            open: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/, this.open(change)];
                            }); }); },
                            group: group,
                        }); });
                        changesGroup = __assign(__assign({}, group), { resources: resources });
                        this._groups = [changesGroup];
                        this.root = this.createTree();
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(GitDiffTreeModel.prototype, "rootUri", {
        get: function () {
            if (this.provider) {
                return this.provider.rootUri;
            }
        },
        enumerable: false,
        configurable: true
    });
    ;
    GitDiffTreeModel.prototype.canTabToWidget = function () {
        return true;
    };
    Object.defineProperty(GitDiffTreeModel.prototype, "groups", {
        get: function () {
            return this._groups;
        },
        enumerable: false,
        configurable: true
    });
    ;
    GitDiffTreeModel.prototype.open = function (change) {
        return __awaiter(this, void 0, void 0, function () {
            var uriToOpen;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uriToOpen = change.getUriToOpen();
                        return [4 /*yield*/, this.resourceOpener.open(uriToOpen)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GitDiffTreeModel.prototype.storeState = function () {
        if (this.provider) {
            return __assign(__assign({}, _super.prototype.storeState.call(this)), { rootUri: this.provider.rootUri, diffOptions: this.diffOptions });
        }
        else {
            return _super.prototype.storeState.call(this);
        }
    };
    GitDiffTreeModel.prototype.restoreState = function (oldState) {
        _super.prototype.restoreState.call(this, oldState);
        if (oldState.rootUri && oldState.diffOptions) {
            this.setContent(oldState);
        }
    };
    __decorate([
        inversify_1.inject(common_2.Git),
        __metadata("design:type", Object)
    ], GitDiffTreeModel.prototype, "git", void 0);
    __decorate([
        inversify_1.inject(scm_service_1.ScmService),
        __metadata("design:type", scm_service_1.ScmService)
    ], GitDiffTreeModel.prototype, "scmService", void 0);
    __decorate([
        inversify_1.inject(git_resource_opener_1.GitResourceOpener),
        __metadata("design:type", Object)
    ], GitDiffTreeModel.prototype, "resourceOpener", void 0);
    GitDiffTreeModel = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], GitDiffTreeModel);
    return GitDiffTreeModel;
}(scm_tree_model_1.ScmTreeModel));
exports.GitDiffTreeModel = GitDiffTreeModel;
(function (GitDiffTreeModel) {
    ;
})(GitDiffTreeModel = exports.GitDiffTreeModel || (exports.GitDiffTreeModel = {}));
exports.GitDiffTreeModel = GitDiffTreeModel;
//# sourceMappingURL=git-diff-tree-model.js.map