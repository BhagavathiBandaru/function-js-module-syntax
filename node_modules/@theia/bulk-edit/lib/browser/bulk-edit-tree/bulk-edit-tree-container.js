"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBulkEditTreeWidget = exports.createBulkEditContainer = void 0;
var bulk_edit_tree_widget_1 = require("./bulk-edit-tree-widget");
var bulk_edit_tree_1 = require("./bulk-edit-tree");
var bulk_edit_tree_model_1 = require("./bulk-edit-tree-model");
var browser_1 = require("@theia/core/lib/browser");
function createBulkEditContainer(parent) {
    var child = browser_1.createTreeContainer(parent);
    child.unbind(browser_1.TreeImpl);
    child.bind(bulk_edit_tree_1.BulkEditTree).toSelf();
    child.rebind(browser_1.Tree).toService(bulk_edit_tree_1.BulkEditTree);
    child.unbind(browser_1.TreeWidget);
    child.bind(bulk_edit_tree_widget_1.BulkEditTreeWidget).toSelf();
    child.unbind(browser_1.TreeModelImpl);
    child.bind(bulk_edit_tree_model_1.BulkEditTreeModel).toSelf();
    child.rebind(browser_1.TreeModel).toService(bulk_edit_tree_model_1.BulkEditTreeModel);
    child.rebind(browser_1.TreeProps).toConstantValue(browser_1.defaultTreeProps);
    return child;
}
exports.createBulkEditContainer = createBulkEditContainer;
function createBulkEditTreeWidget(parent) {
    return createBulkEditContainer(parent).get(bulk_edit_tree_widget_1.BulkEditTreeWidget);
}
exports.createBulkEditTreeWidget = createBulkEditTreeWidget;
//# sourceMappingURL=bulk-edit-tree-container.js.map