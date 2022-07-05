"use strict";
/********************************************************************************
 * Copyright (C) 2018 Ericsson and others.
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
exports.bindPreferences = void 0;
require("../../src/browser/style/index.css");
require("./preferences-monaco-contribution");
var inversify_1 = require("inversify");
var browser_1 = require("@theia/core/lib/browser");
var tab_bar_toolbar_1 = require("@theia/core/lib/browser/shell/tab-bar-toolbar");
var preference_tree_generator_1 = require("./util/preference-tree-generator");
var preference_bindings_1 = require("./preference-bindings");
var preference_widget_bindings_1 = require("./views/preference-widget-bindings");
var preferences_contribution_1 = require("./preferences-contribution");
var preference_scope_command_manager_1 = require("./util/preference-scope-command-manager");
var json_schema_store_1 = require("@theia/core/lib/browser/json-schema-store");
var preferences_json_schema_contribution_1 = require("./preferences-json-schema-contribution");
function bindPreferences(bind, unbind) {
    preference_bindings_1.bindPreferenceProviders(bind, unbind);
    preference_widget_bindings_1.bindPreferencesWidgets(bind);
    bind(preference_tree_generator_1.PreferenceTreeGenerator).toSelf().inSingletonScope();
    browser_1.bindViewContribution(bind, preferences_contribution_1.PreferencesContribution);
    bind(preference_scope_command_manager_1.PreferenceScopeCommandManager).toSelf().inSingletonScope();
    bind(tab_bar_toolbar_1.TabBarToolbarContribution).toService(preferences_contribution_1.PreferencesContribution);
    bind(preferences_json_schema_contribution_1.PreferencesJsonSchemaContribution).toSelf().inSingletonScope();
    bind(json_schema_store_1.JsonSchemaContribution).toService(preferences_json_schema_contribution_1.PreferencesJsonSchemaContribution);
}
exports.bindPreferences = bindPreferences;
exports.default = new inversify_1.ContainerModule(function (bind, unbind, isBound, rebind) {
    bindPreferences(bind, unbind);
});
//# sourceMappingURL=preference-frontend-module.js.map