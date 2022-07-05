"use strict";
/********************************************************************************
 * Copyright (C) 2017 TypeFox and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
require("../../src/browser/style/index.css");
var inversify_1 = require("inversify");
var browser_1 = require("@theia/core/lib/browser");
var navigator_widget_1 = require("./navigator-widget");
var navigator_keybinding_context_1 = require("./navigator-keybinding-context");
var navigator_contribution_1 = require("./navigator-contribution");
var navigator_container_1 = require("./navigator-container");
var widget_manager_1 = require("@theia/core/lib/browser/widget-manager");
var navigator_preferences_1 = require("./navigator-preferences");
var navigator_filter_1 = require("./navigator-filter");
var navigator_context_key_service_1 = require("./navigator-context-key-service");
var tab_bar_toolbar_1 = require("@theia/core/lib/browser/shell/tab-bar-toolbar");
var navigator_diff_1 = require("./navigator-diff");
var navigator_layout_migrations_1 = require("./navigator-layout-migrations");
var navigator_tab_bar_decorator_1 = require("./navigator-tab-bar-decorator");
var tab_bar_decorator_1 = require("@theia/core/lib/browser/shell/tab-bar-decorator");
var navigator_widget_factory_1 = require("./navigator-widget-factory");
exports.default = new inversify_1.ContainerModule(function (bind) {
    navigator_preferences_1.bindFileNavigatorPreferences(bind);
    bind(navigator_filter_1.FileNavigatorFilter).toSelf().inSingletonScope();
    bind(navigator_context_key_service_1.NavigatorContextKeyService).toSelf().inSingletonScope();
    browser_1.bindViewContribution(bind, navigator_contribution_1.FileNavigatorContribution);
    bind(browser_1.FrontendApplicationContribution).toService(navigator_contribution_1.FileNavigatorContribution);
    bind(tab_bar_toolbar_1.TabBarToolbarContribution).toService(navigator_contribution_1.FileNavigatorContribution);
    bind(browser_1.KeybindingContext).to(navigator_keybinding_context_1.NavigatorActiveContext).inSingletonScope();
    bind(navigator_widget_1.FileNavigatorWidget).toDynamicValue(function (ctx) {
        return navigator_container_1.createFileNavigatorWidget(ctx.container);
    });
    bind(widget_manager_1.WidgetFactory).toDynamicValue(function (_a) {
        var container = _a.container;
        return ({
            id: navigator_widget_1.FILE_NAVIGATOR_ID,
            createWidget: function () { return container.get(navigator_widget_1.FileNavigatorWidget); }
        });
    }).inSingletonScope();
    bind(navigator_widget_factory_1.NavigatorWidgetFactory).toSelf().inSingletonScope();
    bind(widget_manager_1.WidgetFactory).toService(navigator_widget_factory_1.NavigatorWidgetFactory);
    bind(browser_1.ApplicationShellLayoutMigration).to(navigator_layout_migrations_1.NavigatorLayoutVersion3Migration).inSingletonScope();
    bind(navigator_diff_1.NavigatorDiff).toSelf().inSingletonScope();
    bind(navigator_tab_bar_decorator_1.NavigatorTabBarDecorator).toSelf().inSingletonScope();
    bind(browser_1.FrontendApplicationContribution).toService(navigator_tab_bar_decorator_1.NavigatorTabBarDecorator);
    bind(tab_bar_decorator_1.TabBarDecorator).toService(navigator_tab_bar_decorator_1.NavigatorTabBarDecorator);
});
//# sourceMappingURL=navigator-frontend-module.js.map