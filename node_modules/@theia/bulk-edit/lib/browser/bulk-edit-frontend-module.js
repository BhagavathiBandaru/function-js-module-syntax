"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/********************************************************************************
 * Copyright (c) 2021 SAP SE or an SAP affiliate company and others.
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
var inversify_1 = require("inversify");
var widget_manager_1 = require("@theia/core/lib/browser/widget-manager");
var bulk_edit_tree_1 = require("./bulk-edit-tree");
var browser_1 = require("@theia/core/lib/browser");
var browser_2 = require("@theia/core/lib/browser");
var bulk_edit_contribution_1 = require("./bulk-edit-contribution");
var tab_bar_toolbar_1 = require("@theia/core/lib/browser/shell/tab-bar-toolbar");
var bulk_edit_tree_label_provider_1 = require("./bulk-edit-tree-label-provider");
var common_1 = require("@theia/core/lib/common");
require("../../src/browser/style/bulk-edit.css");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(bulk_edit_tree_1.BulkEditTreeWidget).toDynamicValue(function (ctx) {
        return bulk_edit_tree_1.createBulkEditTreeWidget(ctx.container);
    });
    bind(widget_manager_1.WidgetFactory).toDynamicValue(function (context) { return ({
        id: bulk_edit_tree_1.BULK_EDIT_TREE_WIDGET_ID,
        createWidget: function () { return context.container.get(bulk_edit_tree_1.BulkEditTreeWidget); }
    }); });
    browser_2.bindViewContribution(bind, bulk_edit_contribution_1.BulkEditContribution);
    bind(browser_1.FrontendApplicationContribution).toService(bulk_edit_contribution_1.BulkEditContribution);
    bind(tab_bar_toolbar_1.TabBarToolbarContribution).toService(bulk_edit_contribution_1.BulkEditContribution);
    bind(bulk_edit_tree_label_provider_1.BulkEditTreeLabelProvider).toSelf().inSingletonScope();
    bind(browser_1.LabelProviderContribution).toService(bulk_edit_tree_label_provider_1.BulkEditTreeLabelProvider);
    bind(bulk_edit_tree_1.InMemoryTextResourceResolver).toSelf().inSingletonScope();
    bind(common_1.ResourceResolver).toService(bulk_edit_tree_1.InMemoryTextResourceResolver);
});
//# sourceMappingURL=bulk-edit-frontend-module.js.map