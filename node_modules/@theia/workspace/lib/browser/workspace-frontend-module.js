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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var common_1 = require("@theia/core/lib/common");
var browser_1 = require("@theia/core/lib/browser");
var browser_2 = require("@theia/filesystem/lib/browser");
var storage_service_1 = require("@theia/core/lib/browser/storage-service");
var label_provider_1 = require("@theia/core/lib/browser/label-provider");
var browser_3 = require("@theia/variable-resolver/lib/browser");
var common_2 = require("../common");
var workspace_frontend_contribution_1 = require("./workspace-frontend-contribution");
var workspace_service_1 = require("./workspace-service");
var workspace_commands_1 = require("./workspace-commands");
var workspace_variable_contribution_1 = require("./workspace-variable-contribution");
var workspace_storage_service_1 = require("./workspace-storage-service");
var workspace_uri_contribution_1 = require("./workspace-uri-contribution");
var workspace_preferences_1 = require("./workspace-preferences");
var quick_open_workspace_1 = require("./quick-open-workspace");
var workspace_delete_handler_1 = require("./workspace-delete-handler");
var workspace_duplicate_handler_1 = require("./workspace-duplicate-handler");
var workspace_utils_1 = require("./workspace-utils");
var workspace_compare_handler_1 = require("./workspace-compare-handler");
var diff_service_1 = require("./diff-service");
var json_schema_store_1 = require("@theia/core/lib/browser/json-schema-store");
var workspace_schema_updater_1 = require("./workspace-schema-updater");
exports.default = new inversify_1.ContainerModule(function (bind, unbind, isBound, rebind) {
    var e_1, _a;
    workspace_preferences_1.bindWorkspacePreferences(bind);
    bind(workspace_service_1.WorkspaceService).toSelf().inSingletonScope();
    bind(browser_1.FrontendApplicationContribution).toService(workspace_service_1.WorkspaceService);
    bind(common_2.WorkspaceServer).toDynamicValue(function (ctx) {
        var provider = ctx.container.get(browser_1.WebSocketConnectionProvider);
        return provider.createProxy(common_2.workspacePath);
    }).inSingletonScope();
    bind(workspace_frontend_contribution_1.WorkspaceFrontendContribution).toSelf().inSingletonScope();
    try {
        for (var _b = __values([browser_1.FrontendApplicationContribution, common_1.CommandContribution, browser_1.KeybindingContribution, common_1.MenuContribution]), _c = _b.next(); !_c.done; _c = _b.next()) {
            var identifier = _c.value;
            bind(identifier).toService(workspace_frontend_contribution_1.WorkspaceFrontendContribution);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    bind(browser_2.OpenFileDialogFactory).toFactory(function (ctx) {
        return function (props) {
            return browser_2.createOpenFileDialogContainer(ctx.container, props).get(browser_2.OpenFileDialog);
        };
    });
    bind(browser_2.SaveFileDialogFactory).toFactory(function (ctx) {
        return function (props) {
            return browser_2.createSaveFileDialogContainer(ctx.container, props).get(browser_2.SaveFileDialog);
        };
    });
    bind(workspace_commands_1.WorkspaceCommandContribution).toSelf().inSingletonScope();
    bind(common_1.CommandContribution).toService(workspace_commands_1.WorkspaceCommandContribution);
    bind(workspace_commands_1.FileMenuContribution).toSelf().inSingletonScope();
    bind(common_1.MenuContribution).toService(workspace_commands_1.FileMenuContribution);
    bind(workspace_commands_1.EditMenuContribution).toSelf().inSingletonScope();
    bind(common_1.MenuContribution).toService(workspace_commands_1.EditMenuContribution);
    bind(workspace_delete_handler_1.WorkspaceDeleteHandler).toSelf().inSingletonScope();
    bind(workspace_duplicate_handler_1.WorkspaceDuplicateHandler).toSelf().inSingletonScope();
    bind(workspace_compare_handler_1.WorkspaceCompareHandler).toSelf().inSingletonScope();
    bind(diff_service_1.DiffService).toSelf().inSingletonScope();
    bind(workspace_storage_service_1.WorkspaceStorageService).toSelf().inSingletonScope();
    rebind(storage_service_1.StorageService).toService(workspace_storage_service_1.WorkspaceStorageService);
    bind(label_provider_1.LabelProviderContribution).to(workspace_uri_contribution_1.WorkspaceUriLabelProviderContribution).inSingletonScope();
    bind(workspace_variable_contribution_1.WorkspaceVariableContribution).toSelf().inSingletonScope();
    bind(browser_3.VariableContribution).toService(workspace_variable_contribution_1.WorkspaceVariableContribution);
    bind(quick_open_workspace_1.QuickOpenWorkspace).toSelf().inSingletonScope();
    bind(workspace_utils_1.WorkspaceUtils).toSelf().inSingletonScope();
    bind(workspace_schema_updater_1.WorkspaceSchemaUpdater).toSelf().inSingletonScope();
    bind(json_schema_store_1.JsonSchemaContribution).toService(workspace_schema_updater_1.WorkspaceSchemaUpdater);
});
//# sourceMappingURL=workspace-frontend-module.js.map