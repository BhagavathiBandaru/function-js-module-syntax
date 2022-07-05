"use strict";
/********************************************************************************
 * Copyright (C) 2019 Red Hat, Inc. and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScmWidget = void 0;
var inversify_1 = require("inversify");
var disposable_1 = require("@theia/core/lib/common/disposable");
var browser_1 = require("@theia/core/lib/browser");
var scm_commit_widget_1 = require("./scm-commit-widget");
var scm_amend_widget_1 = require("./scm-amend-widget");
var scm_no_repository_widget_1 = require("./scm-no-repository-widget");
var scm_service_1 = require("./scm-service");
var scm_tree_widget_1 = require("./scm-tree-widget");
var scm_preferences_1 = require("./scm-preferences");
var ScmWidget = /** @class */ (function (_super) {
    __extends(ScmWidget, _super);
    function ScmWidget() {
        var _this = _super.call(this) || this;
        _this.toDisposeOnRefresh = new disposable_1.DisposableCollection();
        _this.node.tabIndex = 0;
        _this.id = ScmWidget_1.ID;
        _this.addClass('theia-scm');
        _this.addClass('theia-scm-main-container');
        return _this;
    }
    ScmWidget_1 = ScmWidget;
    Object.defineProperty(ScmWidget.prototype, "viewMode", {
        get: function () {
            return this.resourceWidget.viewMode;
        },
        set: function (mode) {
            this.resourceWidget.viewMode = mode;
        },
        enumerable: false,
        configurable: true
    });
    ScmWidget.prototype.init = function () {
        var _this = this;
        var layout = new browser_1.PanelLayout();
        this.layout = layout;
        this.panel = new browser_1.Panel({
            layout: new browser_1.PanelLayout({})
        });
        this.panel.node.tabIndex = -1;
        this.panel.node.setAttribute('class', 'theia-scm-panel');
        layout.addWidget(this.panel);
        this.containerLayout.addWidget(this.commitWidget);
        this.containerLayout.addWidget(this.resourceWidget);
        this.containerLayout.addWidget(this.amendWidget);
        this.containerLayout.addWidget(this.noRepositoryWidget);
        this.refresh();
        this.toDispose.push(this.scmService.onDidChangeSelectedRepository(function () { return _this.refresh(); }));
        this.updateViewMode(this.scmPreferences.get('scm.defaultViewMode'));
        this.toDispose.push(this.scmPreferences.onPreferenceChanged(function (e) {
            if (e.preferenceName === 'scm.defaultViewMode') {
                _this.updateViewMode(e.newValue);
            }
        }));
    };
    Object.defineProperty(ScmWidget.prototype, "containerLayout", {
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
    ScmWidget.prototype.updateViewMode = function (preference) {
        this.viewMode = preference;
    };
    ScmWidget.prototype.refresh = function () {
        var _this = this;
        this.toDisposeOnRefresh.dispose();
        this.toDispose.push(this.toDisposeOnRefresh);
        var repository = this.scmService.selectedRepository;
        this.title.label = repository ? repository.provider.label : 'no repository found';
        this.title.caption = this.title.label;
        this.update();
        if (repository) {
            this.toDisposeOnRefresh.push(repository.onDidChange(function () { return _this.update(); }));
            // render synchronously to avoid cursor jumping
            // see https://stackoverflow.com/questions/28922275/in-reactjs-why-does-setstate-behave-differently-when-called-synchronously/28922465#28922465
            this.toDisposeOnRefresh.push(repository.input.onDidChange(function () { return _this.updateImmediately(); }));
            this.toDisposeOnRefresh.push(repository.input.onDidFocus(function () { return _this.focusInput(); }));
            this.commitWidget.show();
            this.resourceWidget.show();
            this.amendWidget.show();
            this.noRepositoryWidget.hide();
        }
        else {
            this.commitWidget.hide();
            this.resourceWidget.hide();
            this.amendWidget.hide();
            this.noRepositoryWidget.show();
        }
    };
    ScmWidget.prototype.updateImmediately = function () {
        this.onUpdateRequest(browser_1.Widget.Msg.UpdateRequest);
    };
    ScmWidget.prototype.onUpdateRequest = function (msg) {
        browser_1.MessageLoop.sendMessage(this.commitWidget, msg);
        browser_1.MessageLoop.sendMessage(this.resourceWidget, msg);
        browser_1.MessageLoop.sendMessage(this.amendWidget, msg);
        browser_1.MessageLoop.sendMessage(this.noRepositoryWidget, msg);
        _super.prototype.onUpdateRequest.call(this, msg);
    };
    ScmWidget.prototype.onAfterAttach = function (msg) {
        this.node.appendChild(this.commitWidget.node);
        this.node.appendChild(this.resourceWidget.node);
        this.node.appendChild(this.amendWidget.node);
        this.node.appendChild(this.noRepositoryWidget.node);
        _super.prototype.onAfterAttach.call(this, msg);
        this.update();
    };
    ScmWidget.prototype.onActivateRequest = function (msg) {
        _super.prototype.onActivateRequest.call(this, msg);
        this.refresh();
        if (this.commitWidget.isVisible) {
            this.commitWidget.focus();
        }
        else {
            this.node.focus();
        }
    };
    ScmWidget.prototype.focusInput = function () {
        this.commitWidget.focus();
    };
    ScmWidget.prototype.storeState = function () {
        var state = {
            commitState: this.commitWidget.storeState(),
            changesTreeState: this.resourceWidget.storeState(),
        };
        return state;
    };
    ScmWidget.prototype.restoreState = function (oldState) {
        var commitState = oldState.commitState, changesTreeState = oldState.changesTreeState;
        this.commitWidget.restoreState(commitState);
        this.resourceWidget.restoreState(changesTreeState);
    };
    ScmWidget.prototype.collapseScmTree = function () {
        var model = this.resourceWidget.model;
        var root = model.root;
        if (browser_1.CompositeTreeNode.is(root)) {
            root.children.map(function (group) {
                if (browser_1.CompositeTreeNode.is(group)) {
                    group.children.map(function (folderNode) {
                        if (browser_1.CompositeTreeNode.is(folderNode)) {
                            model.collapseAll(folderNode);
                        }
                        if (browser_1.SelectableTreeNode.isSelected(folderNode)) {
                            model.toggleNode(folderNode);
                        }
                    });
                }
            });
        }
    };
    var ScmWidget_1;
    ScmWidget.ID = 'scm-view';
    __decorate([
        inversify_1.inject(scm_service_1.ScmService),
        __metadata("design:type", scm_service_1.ScmService)
    ], ScmWidget.prototype, "scmService", void 0);
    __decorate([
        inversify_1.inject(scm_commit_widget_1.ScmCommitWidget),
        __metadata("design:type", scm_commit_widget_1.ScmCommitWidget)
    ], ScmWidget.prototype, "commitWidget", void 0);
    __decorate([
        inversify_1.inject(scm_tree_widget_1.ScmTreeWidget),
        __metadata("design:type", scm_tree_widget_1.ScmTreeWidget)
    ], ScmWidget.prototype, "resourceWidget", void 0);
    __decorate([
        inversify_1.inject(scm_amend_widget_1.ScmAmendWidget),
        __metadata("design:type", scm_amend_widget_1.ScmAmendWidget)
    ], ScmWidget.prototype, "amendWidget", void 0);
    __decorate([
        inversify_1.inject(scm_no_repository_widget_1.ScmNoRepositoryWidget),
        __metadata("design:type", scm_no_repository_widget_1.ScmNoRepositoryWidget)
    ], ScmWidget.prototype, "noRepositoryWidget", void 0);
    __decorate([
        inversify_1.inject(scm_preferences_1.ScmPreferences),
        __metadata("design:type", Object)
    ], ScmWidget.prototype, "scmPreferences", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ScmWidget.prototype, "init", null);
    ScmWidget = ScmWidget_1 = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], ScmWidget);
    return ScmWidget;
}(browser_1.BaseWidget));
exports.ScmWidget = ScmWidget;
//# sourceMappingURL=scm-widget.js.map