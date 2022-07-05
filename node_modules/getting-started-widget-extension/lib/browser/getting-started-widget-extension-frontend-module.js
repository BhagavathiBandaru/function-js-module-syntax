"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var widget_manager_1 = require("@theia/core/lib/browser/widget-manager");
var getting_started_widget_1 = require("@theia/getting-started/lib/browser/getting-started-widget");
require("../../src/browser/style/index.css");
require("./branding");
var getting_started_widget_extension_contribution_1 = require("./getting-started-widget-extension-contribution");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(getting_started_widget_extension_contribution_1.CustomGettingStartedWidget).toSelf();
    bind(widget_manager_1.WidgetFactory).toDynamicValue(function (context) { return ({
        id: getting_started_widget_1.GettingStartedWidget.ID,
        createWidget: function () { return context.container.get(getting_started_widget_extension_contribution_1.CustomGettingStartedWidget); },
    }); }).inSingletonScope();
});
//# sourceMappingURL=getting-started-widget-extension-frontend-module.js.map