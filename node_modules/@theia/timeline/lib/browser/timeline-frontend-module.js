"use strict";
/********************************************************************************
 * Copyright (C) 2020 RedHat and others.
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
exports.createTimelineTreeContainer = void 0;
var inversify_1 = require("inversify");
var widget_manager_1 = require("@theia/core/lib/browser/widget-manager");
var timeline_service_1 = require("./timeline-service");
var timeline_widget_1 = require("./timeline-widget");
var timeline_tree_widget_1 = require("./timeline-tree-widget");
var browser_1 = require("@theia/core/lib/browser");
var timeline_tree_model_1 = require("./timeline-tree-model");
var timeline_empty_widget_1 = require("./timeline-empty-widget");
var timeline_context_key_service_1 = require("./timeline-context-key-service");
var timeline_contribution_1 = require("./timeline-contribution");
require("../../src/browser/style/index.css");
var common_1 = require("@theia/core/lib/common");
var tab_bar_toolbar_1 = require("@theia/core/lib/browser/shell/tab-bar-toolbar");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(timeline_contribution_1.TimelineContribution).toSelf().inSingletonScope();
    bind(common_1.CommandContribution).toService(timeline_contribution_1.TimelineContribution);
    bind(tab_bar_toolbar_1.TabBarToolbarContribution).toService(timeline_contribution_1.TimelineContribution);
    bind(timeline_context_key_service_1.TimelineContextKeyService).toSelf().inSingletonScope();
    bind(timeline_service_1.TimelineService).toSelf().inSingletonScope();
    bind(timeline_widget_1.TimelineWidget).toSelf();
    bind(widget_manager_1.WidgetFactory).toDynamicValue(function (_a) {
        var container = _a.container;
        return ({
            id: timeline_widget_1.TimelineWidget.ID,
            createWidget: function () { return container.get(timeline_widget_1.TimelineWidget); }
        });
    }).inSingletonScope();
    bind(timeline_tree_widget_1.TimelineTreeWidget).toDynamicValue(function (ctx) {
        var child = createTimelineTreeContainer(ctx.container);
        return child.get(timeline_tree_widget_1.TimelineTreeWidget);
    });
    bind(widget_manager_1.WidgetFactory).toDynamicValue(function (_a) {
        var container = _a.container;
        return ({
            id: timeline_tree_widget_1.TimelineTreeWidget.ID,
            createWidget: function () { return container.get(timeline_tree_widget_1.TimelineTreeWidget); }
        });
    }).inSingletonScope();
    bind(timeline_empty_widget_1.TimelineEmptyWidget).toSelf();
    bind(widget_manager_1.WidgetFactory).toDynamicValue(function (_a) {
        var container = _a.container;
        return ({
            id: timeline_empty_widget_1.TimelineEmptyWidget.ID,
            createWidget: function () { return container.get(timeline_empty_widget_1.TimelineEmptyWidget); }
        });
    }).inSingletonScope();
});
function createTimelineTreeContainer(parent) {
    var child = browser_1.createTreeContainer(parent, {
        virtualized: true,
        search: true
    });
    child.unbind(browser_1.TreeWidget);
    child.bind(timeline_tree_widget_1.TimelineTreeWidget).toSelf();
    child.unbind(browser_1.TreeModelImpl);
    child.bind(timeline_tree_model_1.TimelineTreeModel).toSelf();
    child.rebind(browser_1.TreeModel).toService(timeline_tree_model_1.TimelineTreeModel);
    return child;
}
exports.createTimelineTreeContainer = createTimelineTreeContainer;
//# sourceMappingURL=timeline-frontend-module.js.map