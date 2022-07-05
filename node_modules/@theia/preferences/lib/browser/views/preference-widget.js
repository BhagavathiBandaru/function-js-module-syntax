"use strict";
/********************************************************************************
 * Copyright (C) 2020 Ericsson and others.
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
exports.PreferencesWidget = void 0;
var inversify_1 = require("inversify");
var browser_1 = require("@theia/core/lib/browser");
var preference_editor_widget_1 = require("./preference-editor-widget");
var preference_tree_widget_1 = require("./preference-tree-widget");
var preference_searchbar_widget_1 = require("./preference-searchbar-widget");
var preference_scope_tabbar_widget_1 = require("./preference-scope-tabbar-widget");
var SHADOW_CLASSNAME = 'with-shadow';
var PreferencesWidget = /** @class */ (function (_super) {
    __extends(PreferencesWidget, _super);
    function PreferencesWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PreferencesWidget_1 = PreferencesWidget;
    Object.defineProperty(PreferencesWidget.prototype, "currentScope", {
        get: function () {
            return this.tabBarWidget.currentScope;
        },
        enumerable: false,
        configurable: true
    });
    PreferencesWidget.prototype.onResize = function (msg) {
        _super.prototype.onResize.call(this, msg);
        if (msg.width < 600 && this.treeWidget && !this.treeWidget.isHidden) {
            this.treeWidget.hide();
            this.editorWidget.addClass('full-pane');
        }
        else if (msg.width >= 600 && this.treeWidget && this.treeWidget.isHidden) {
            this.treeWidget.show();
            this.editorWidget.removeClass('full-pane');
        }
    };
    PreferencesWidget.prototype.onActivateRequest = function (msg) {
        _super.prototype.onActivateRequest.call(this, msg);
        this.searchbarWidget.focus();
    };
    PreferencesWidget.prototype.init = function () {
        var _this = this;
        this.id = PreferencesWidget_1.ID;
        this.title.label = PreferencesWidget_1.LABEL;
        this.title.closable = true;
        this.addClass('theia-settings-container');
        this.title.iconClass = 'fa fa-sliders';
        this.searchbarWidget.addClass('preferences-searchbar-widget');
        this.addWidget(this.searchbarWidget);
        this.tabBarWidget.addClass('preferences-tabbar-widget');
        this.addWidget(this.tabBarWidget);
        this.treeWidget.addClass('preferences-tree-widget');
        this.addWidget(this.treeWidget);
        this.editorWidget.addClass('preferences-editor-widget');
        this.addWidget(this.editorWidget);
        this.editorWidget.onEditorDidScroll(function (editorIsAtTop) {
            if (editorIsAtTop) {
                _this.tabBarWidget.removeClass(SHADOW_CLASSNAME);
            }
            else {
                _this.tabBarWidget.addClass(SHADOW_CLASSNAME);
            }
        });
        this.update();
    };
    PreferencesWidget.prototype.storeState = function () {
        return {
            scopeTabBarState: this.tabBarWidget.storeState(),
            editorState: this.editorWidget.storeState(),
            searchbarWidgetState: this.searchbarWidget.storeState(),
        };
    };
    PreferencesWidget.prototype.restoreState = function (state) {
        this.tabBarWidget.restoreState(state.scopeTabBarState);
        this.editorWidget.restoreState(state.editorState);
        this.searchbarWidget.restoreState(state.searchbarWidgetState);
    };
    var PreferencesWidget_1;
    /**
     * The widget `id`.
     */
    PreferencesWidget.ID = 'settings_widget';
    /**
     * The widget `label` which is used for display purposes.
     */
    PreferencesWidget.LABEL = 'Preferences';
    __decorate([
        inversify_1.inject(preference_editor_widget_1.PreferencesEditorWidget),
        __metadata("design:type", preference_editor_widget_1.PreferencesEditorWidget)
    ], PreferencesWidget.prototype, "editorWidget", void 0);
    __decorate([
        inversify_1.inject(preference_tree_widget_1.PreferencesTreeWidget),
        __metadata("design:type", preference_tree_widget_1.PreferencesTreeWidget)
    ], PreferencesWidget.prototype, "treeWidget", void 0);
    __decorate([
        inversify_1.inject(preference_searchbar_widget_1.PreferencesSearchbarWidget),
        __metadata("design:type", preference_searchbar_widget_1.PreferencesSearchbarWidget)
    ], PreferencesWidget.prototype, "searchbarWidget", void 0);
    __decorate([
        inversify_1.inject(preference_scope_tabbar_widget_1.PreferencesScopeTabBar),
        __metadata("design:type", preference_scope_tabbar_widget_1.PreferencesScopeTabBar)
    ], PreferencesWidget.prototype, "tabBarWidget", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PreferencesWidget.prototype, "init", null);
    PreferencesWidget = PreferencesWidget_1 = __decorate([
        inversify_1.injectable()
    ], PreferencesWidget);
    return PreferencesWidget;
}(browser_1.Panel));
exports.PreferencesWidget = PreferencesWidget;
//# sourceMappingURL=preference-widget.js.map