"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindPreferencesWidgets = void 0;
var browser_1 = require("@theia/core/lib/browser");
var single_preference_display_factory_1 = require("./components/single-preference-display-factory");
var single_preference_wrapper_1 = require("./components/single-preference-wrapper");
var preference_widget_1 = require("./preference-widget");
var preference_tree_widget_1 = require("./preference-tree-widget");
var preference_editor_widget_1 = require("./preference-editor-widget");
var preference_searchbar_widget_1 = require("./preference-searchbar-widget");
var preference_scope_tabbar_widget_1 = require("./preference-scope-tabbar-widget");
var preferences_decorator_1 = require("../preferences-decorator");
var preferences_decorator_service_1 = require("../preferences-decorator-service");
var preference_tree_model_1 = require("../preference-tree-model");
function bindPreferencesWidgets(bind) {
    bind(preference_widget_1.PreferencesWidget)
        .toDynamicValue(function (_a) {
        var container = _a.container;
        return createPreferencesWidgetContainer(container).get(preference_widget_1.PreferencesWidget);
    })
        .inSingletonScope();
    bind(browser_1.WidgetFactory).toDynamicValue(function (_a) {
        var container = _a.container;
        return ({
            id: preference_widget_1.PreferencesWidget.ID,
            createWidget: function () { return container.get(preference_widget_1.PreferencesWidget); }
        });
    }).inSingletonScope();
}
exports.bindPreferencesWidgets = bindPreferencesWidgets;
function createPreferencesWidgetContainer(parent) {
    var child = browser_1.createTreeContainer(parent);
    child.bind(preference_tree_model_1.PreferenceTreeModel).toSelf();
    child.rebind(browser_1.TreeModel).toService(preference_tree_model_1.PreferenceTreeModel);
    child.unbind(browser_1.TreeWidget);
    child.bind(preference_tree_widget_1.PreferencesTreeWidget).toSelf();
    child.rebind(browser_1.TreeProps).toConstantValue(__assign(__assign({}, browser_1.defaultTreeProps), { search: false }));
    child.bind(preference_editor_widget_1.PreferencesEditorWidget).toSelf();
    child.bind(preferences_decorator_1.PreferencesDecorator).toSelf();
    child.bind(preferences_decorator_service_1.PreferencesDecoratorService).toSelf();
    child.rebind(browser_1.TreeDecoratorService).toService(preferences_decorator_service_1.PreferencesDecoratorService);
    child.bind(single_preference_wrapper_1.SinglePreferenceWrapper).toSelf();
    child.bind(preference_searchbar_widget_1.PreferencesSearchbarWidget).toSelf();
    child.bind(preference_scope_tabbar_widget_1.PreferencesScopeTabBar).toSelf();
    child.bind(single_preference_display_factory_1.SinglePreferenceDisplayFactory).toSelf();
    child.bind(preference_widget_1.PreferencesWidget).toSelf();
    return child;
}
//# sourceMappingURL=preference-widget-bindings.js.map