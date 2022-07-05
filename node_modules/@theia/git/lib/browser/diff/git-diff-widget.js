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
exports.GitDiffWidget = exports.GIT_DIFF = void 0;
var inversify_1 = require("inversify");
var browser_1 = require("@theia/core/lib/browser");
var browser_2 = require("@theia/editor/lib/browser");
var git_diff_tree_model_1 = require("./git-diff-tree-model");
var common_1 = require("../../common");
var git_diff_header_widget_1 = require("./git-diff-header-widget");
var scm_service_1 = require("@theia/scm/lib/browser/scm-service");
var git_repository_provider_1 = require("../git-repository-provider");
var scm_tree_widget_1 = require("@theia/scm/lib/browser/scm-tree-widget");
var scm_preferences_1 = require("@theia/scm/lib/browser/scm-preferences");
/* eslint-disable @typescript-eslint/no-explicit-any */
exports.GIT_DIFF = 'git-diff';
var GitDiffWidget = /** @class */ (function (_super) {
    __extends(GitDiffWidget, _super);
    function GitDiffWidget() {
        var _this = _super.call(this) || this;
        _this.GIT_DIFF_TITLE = 'Diff';
        _this.id = exports.GIT_DIFF;
        _this.title.label = _this.GIT_DIFF_TITLE;
        _this.title.caption = _this.GIT_DIFF_TITLE;
        _this.title.closable = true;
        _this.title.iconClass = 'theia-git-diff-icon';
        _this.addClass('theia-scm');
        _this.addClass('theia-git');
        _this.addClass('git-diff-container');
        return _this;
    }
    GitDiffWidget.prototype.init = function () {
        var _this = this;
        var layout = new browser_1.PanelLayout();
        this.layout = layout;
        this.panel = new browser_1.Panel({
            layout: new browser_1.PanelLayout({})
        });
        this.panel.node.tabIndex = -1;
        this.panel.node.setAttribute('class', 'theia-scm-panel');
        layout.addWidget(this.panel);
        this.containerLayout.addWidget(this.diffHeaderWidget);
        this.containerLayout.addWidget(this.resourceWidget);
        this.updateViewMode(this.scmPreferences.get('scm.defaultViewMode'));
        this.toDispose.push(this.scmPreferences.onPreferenceChanged(function (e) {
            if (e.preferenceName === 'scm.defaultViewMode') {
                _this.updateViewMode(e.newValue);
            }
        }));
    };
    Object.defineProperty(GitDiffWidget.prototype, "viewMode", {
        get: function () {
            return this.resourceWidget.viewMode;
        },
        set: function (mode) {
            this.resourceWidget.viewMode = mode;
        },
        enumerable: false,
        configurable: true
    });
    GitDiffWidget.prototype.setContent = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.model.setContent(options);
                this.diffHeaderWidget.setContent(options.diffOptions);
                this.update();
                return [2 /*return*/];
            });
        });
    };
    Object.defineProperty(GitDiffWidget.prototype, "containerLayout", {
        get: function () {
            return this.panel.layout;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Updates the view mode based on the preference value.
     * @param preference the view mode preference.
     */
    GitDiffWidget.prototype.updateViewMode = function (preference) {
        this.viewMode = preference;
    };
    GitDiffWidget.prototype.updateImmediately = function () {
        this.onUpdateRequest(browser_1.Widget.Msg.UpdateRequest);
    };
    GitDiffWidget.prototype.onUpdateRequest = function (msg) {
        browser_1.MessageLoop.sendMessage(this.diffHeaderWidget, msg);
        browser_1.MessageLoop.sendMessage(this.resourceWidget, msg);
        _super.prototype.onUpdateRequest.call(this, msg);
    };
    GitDiffWidget.prototype.onAfterAttach = function (msg) {
        this.node.appendChild(this.diffHeaderWidget.node);
        this.node.appendChild(this.resourceWidget.node);
        _super.prototype.onAfterAttach.call(this, msg);
        this.update();
    };
    GitDiffWidget.prototype.goToPreviousChange = function () {
        this.resourceWidget.goToPreviousChange();
    };
    GitDiffWidget.prototype.goToNextChange = function () {
        this.resourceWidget.goToNextChange();
    };
    GitDiffWidget.prototype.storeState = function () {
        var state = {
            commitState: this.diffHeaderWidget.storeState(),
            changesTreeState: this.resourceWidget.storeState(),
        };
        return state;
    };
    GitDiffWidget.prototype.restoreState = function (oldState) {
        var commitState = oldState.commitState, changesTreeState = oldState.changesTreeState;
        this.diffHeaderWidget.restoreState(commitState);
        this.resourceWidget.restoreState(changesTreeState);
    };
    __decorate([
        inversify_1.inject(git_repository_provider_1.GitRepositoryProvider),
        __metadata("design:type", git_repository_provider_1.GitRepositoryProvider)
    ], GitDiffWidget.prototype, "repositoryProvider", void 0);
    __decorate([
        inversify_1.inject(browser_2.DiffNavigatorProvider),
        __metadata("design:type", Function)
    ], GitDiffWidget.prototype, "diffNavigatorProvider", void 0);
    __decorate([
        inversify_1.inject(browser_2.EditorManager),
        __metadata("design:type", browser_2.EditorManager)
    ], GitDiffWidget.prototype, "editorManager", void 0);
    __decorate([
        inversify_1.inject(common_1.GitWatcher),
        __metadata("design:type", common_1.GitWatcher)
    ], GitDiffWidget.prototype, "gitWatcher", void 0);
    __decorate([
        inversify_1.inject(git_diff_header_widget_1.GitDiffHeaderWidget),
        __metadata("design:type", git_diff_header_widget_1.GitDiffHeaderWidget)
    ], GitDiffWidget.prototype, "diffHeaderWidget", void 0);
    __decorate([
        inversify_1.inject(scm_tree_widget_1.ScmTreeWidget),
        __metadata("design:type", scm_tree_widget_1.ScmTreeWidget)
    ], GitDiffWidget.prototype, "resourceWidget", void 0);
    __decorate([
        inversify_1.inject(git_diff_tree_model_1.GitDiffTreeModel),
        __metadata("design:type", git_diff_tree_model_1.GitDiffTreeModel)
    ], GitDiffWidget.prototype, "model", void 0);
    __decorate([
        inversify_1.inject(scm_service_1.ScmService),
        __metadata("design:type", scm_service_1.ScmService)
    ], GitDiffWidget.prototype, "scmService", void 0);
    __decorate([
        inversify_1.inject(scm_preferences_1.ScmPreferences),
        __metadata("design:type", Object)
    ], GitDiffWidget.prototype, "scmPreferences", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], GitDiffWidget.prototype, "init", null);
    GitDiffWidget = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], GitDiffWidget);
    return GitDiffWidget;
}(browser_1.BaseWidget));
exports.GitDiffWidget = GitDiffWidget;
//# sourceMappingURL=git-diff-widget.js.map