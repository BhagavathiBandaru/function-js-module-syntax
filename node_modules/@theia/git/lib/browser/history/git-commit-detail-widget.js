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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitCommitDetailWidget = void 0;
var inversify_1 = require("inversify");
var browser_1 = require("@theia/core/lib/browser");
var git_commit_detail_widget_options_1 = require("./git-commit-detail-widget-options");
var git_commit_detail_header_widget_1 = require("./git-commit-detail-header-widget");
var scm_service_1 = require("@theia/scm/lib/browser/scm-service");
var git_diff_tree_model_1 = require("../diff/git-diff-tree-model");
var scm_tree_widget_1 = require("@theia/scm/lib/browser/scm-tree-widget");
var scm_preferences_1 = require("@theia/scm/lib/browser/scm-preferences");
var GitCommitDetailWidget = /** @class */ (function (_super) {
    __extends(GitCommitDetailWidget, _super);
    function GitCommitDetailWidget(options) {
        var _this = _super.call(this) || this;
        _this.options = options;
        _this.id = 'commit' + options.commitSha;
        _this.title.label = options.commitSha.substr(0, 8);
        _this.title.closable = true;
        _this.title.iconClass = 'icon-git-commit tab-git-icon';
        _this.addClass('theia-scm');
        _this.addClass('theia-git');
        _this.addClass('git-diff-container');
        return _this;
    }
    Object.defineProperty(GitCommitDetailWidget.prototype, "viewMode", {
        get: function () {
            return this.resourceWidget.viewMode;
        },
        set: function (mode) {
            this.resourceWidget.viewMode = mode;
        },
        enumerable: false,
        configurable: true
    });
    GitCommitDetailWidget.prototype.init = function () {
        var _this = this;
        var layout = new browser_1.PanelLayout();
        this.layout = layout;
        this.panel = new browser_1.Panel({
            layout: new browser_1.PanelLayout({})
        });
        this.panel.node.tabIndex = -1;
        this.panel.node.setAttribute('class', 'theia-scm-panel');
        layout.addWidget(this.panel);
        this.containerLayout.addWidget(this.commitDetailHeaderWidget);
        this.containerLayout.addWidget(this.resourceWidget);
        this.updateViewMode(this.scmPreferences.get('scm.defaultViewMode'));
        this.toDispose.push(this.scmPreferences.onPreferenceChanged(function (e) {
            if (e.preferenceName === 'scm.defaultViewMode') {
                _this.updateViewMode(e.newValue);
            }
        }));
        var diffOptions = {
            range: {
                fromRevision: this.options.commitSha + '~1',
                toRevision: this.options.commitSha
            }
        };
        this.model.setContent({ rootUri: this.options.rootUri, diffOptions: diffOptions });
    };
    Object.defineProperty(GitCommitDetailWidget.prototype, "containerLayout", {
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
    GitCommitDetailWidget.prototype.updateViewMode = function (preference) {
        this.viewMode = preference;
    };
    GitCommitDetailWidget.prototype.updateImmediately = function () {
        this.onUpdateRequest(browser_1.Widget.Msg.UpdateRequest);
    };
    GitCommitDetailWidget.prototype.onUpdateRequest = function (msg) {
        browser_1.MessageLoop.sendMessage(this.commitDetailHeaderWidget, msg);
        browser_1.MessageLoop.sendMessage(this.resourceWidget, msg);
        _super.prototype.onUpdateRequest.call(this, msg);
    };
    GitCommitDetailWidget.prototype.onAfterAttach = function (msg) {
        this.node.appendChild(this.commitDetailHeaderWidget.node);
        this.node.appendChild(this.resourceWidget.node);
        _super.prototype.onAfterAttach.call(this, msg);
        this.update();
    };
    GitCommitDetailWidget.prototype.storeState = function () {
        var state = {
            changesTreeState: this.resourceWidget.storeState(),
        };
        return state;
    };
    GitCommitDetailWidget.prototype.restoreState = function (oldState) {
        var changesTreeState = oldState.changesTreeState;
        this.resourceWidget.restoreState(changesTreeState);
    };
    __decorate([
        inversify_1.inject(scm_service_1.ScmService),
        __metadata("design:type", scm_service_1.ScmService)
    ], GitCommitDetailWidget.prototype, "scmService", void 0);
    __decorate([
        inversify_1.inject(git_commit_detail_header_widget_1.GitCommitDetailHeaderWidget),
        __metadata("design:type", git_commit_detail_header_widget_1.GitCommitDetailHeaderWidget)
    ], GitCommitDetailWidget.prototype, "commitDetailHeaderWidget", void 0);
    __decorate([
        inversify_1.inject(scm_tree_widget_1.ScmTreeWidget),
        __metadata("design:type", scm_tree_widget_1.ScmTreeWidget)
    ], GitCommitDetailWidget.prototype, "resourceWidget", void 0);
    __decorate([
        inversify_1.inject(git_diff_tree_model_1.GitDiffTreeModel),
        __metadata("design:type", git_diff_tree_model_1.GitDiffTreeModel)
    ], GitCommitDetailWidget.prototype, "model", void 0);
    __decorate([
        inversify_1.inject(scm_preferences_1.ScmPreferences),
        __metadata("design:type", Object)
    ], GitCommitDetailWidget.prototype, "scmPreferences", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], GitCommitDetailWidget.prototype, "init", null);
    GitCommitDetailWidget = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(git_commit_detail_widget_options_1.GitCommitDetailWidgetOptions)),
        __metadata("design:paramtypes", [Object])
    ], GitCommitDetailWidget);
    return GitCommitDetailWidget;
}(browser_1.BaseWidget));
exports.GitCommitDetailWidget = GitCommitDetailWidget;
//# sourceMappingURL=git-commit-detail-widget.js.map