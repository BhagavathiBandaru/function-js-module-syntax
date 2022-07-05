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
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var output_widget_1 = require("./output-widget");
var tab_bar_toolbar_1 = require("@theia/core/lib/browser/shell/tab-bar-toolbar");
var common_1 = require("@theia/core/lib/common");
var browser_1 = require("@theia/core/lib/browser");
var output_channel_1 = require("../common/output-channel");
var output_preferences_1 = require("../common/output-preferences");
var output_toolbar_contribution_1 = require("./output-toolbar-contribution");
var output_contribution_1 = require("./output-contribution");
var monaco_editor_provider_1 = require("@theia/monaco/lib/browser/monaco-editor-provider");
var output_context_menu_1 = require("./output-context-menu");
var output_editor_factory_1 = require("./output-editor-factory");
var monaco_text_model_service_1 = require("@theia/monaco/lib/browser/monaco-text-model-service");
var output_editor_model_factory_1 = require("./output-editor-model-factory");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(output_channel_1.OutputChannelManager).toSelf().inSingletonScope();
    bind(common_1.ResourceResolver).toService(output_channel_1.OutputChannelManager);
    bind(monaco_editor_provider_1.MonacoEditorFactory).to(output_editor_factory_1.OutputEditorFactory).inSingletonScope();
    bind(monaco_text_model_service_1.MonacoEditorModelFactory).to(output_editor_model_factory_1.OutputEditorModelFactory).inSingletonScope();
    bind(output_context_menu_1.OutputContextMenuService).toSelf().inSingletonScope();
    output_preferences_1.bindOutputPreferences(bind);
    bind(output_widget_1.OutputWidget).toSelf();
    bind(browser_1.WidgetFactory).toDynamicValue(function (context) { return ({
        id: output_widget_1.OUTPUT_WIDGET_KIND,
        createWidget: function () { return context.container.get(output_widget_1.OutputWidget); }
    }); });
    browser_1.bindViewContribution(bind, output_contribution_1.OutputContribution);
    bind(browser_1.OpenHandler).to(output_contribution_1.OutputContribution).inSingletonScope();
    bind(output_toolbar_contribution_1.OutputToolbarContribution).toSelf().inSingletonScope();
    bind(tab_bar_toolbar_1.TabBarToolbarContribution).toService(output_toolbar_contribution_1.OutputToolbarContribution);
});
//# sourceMappingURL=output-frontend-module.js.map