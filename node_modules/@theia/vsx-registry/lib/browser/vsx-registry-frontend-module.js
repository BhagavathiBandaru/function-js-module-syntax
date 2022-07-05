"use strict";
/********************************************************************************
 * Copyright (C) 2020 TypeFox and others.
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
require("../../src/browser/style/index.css");
var inversify_1 = require("inversify");
var browser_1 = require("@theia/core/lib/browser");
var vsx_extensions_view_container_1 = require("./vsx-extensions-view-container");
var vsx_extensions_contribution_1 = require("./vsx-extensions-contribution");
var vsx_extensions_search_bar_1 = require("./vsx-extensions-search-bar");
var vsx_registry_api_1 = require("../common/vsx-registry-api");
var vsx_extensions_model_1 = require("./vsx-extensions-model");
var color_application_contribution_1 = require("@theia/core/lib/browser/color-application-contribution");
var vsx_extensions_widget_1 = require("./vsx-extensions-widget");
var tab_bar_toolbar_1 = require("@theia/core/lib/browser/shell/tab-bar-toolbar");
var vsx_extension_1 = require("./vsx-extension");
var vsx_extension_editor_1 = require("./vsx-extension-editor");
var vsx_extension_editor_manager_1 = require("./vsx-extension-editor-manager");
var vsx_extensions_source_1 = require("./vsx-extensions-source");
var vsx_environment_1 = require("../common/vsx-environment");
var vsx_extensions_search_model_1 = require("./vsx-extensions-search-model");
var vsx_api_version_provider_frontend_impl_1 = require("./vsx-api-version-provider-frontend-impl");
var vsx_api_version_provider_1 = require("../common/vsx-api-version-provider");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(vsx_environment_1.VSXEnvironment).toSelf().inRequestScope();
    bind(vsx_registry_api_1.VSXRegistryAPI).toSelf().inSingletonScope();
    bind(vsx_extension_1.VSXExtension).toSelf();
    bind(vsx_extension_1.VSXExtensionFactory).toFactory(function (ctx) { return function (option) {
        var child = ctx.container.createChild();
        child.bind(vsx_extension_1.VSXExtensionOptions).toConstantValue(option);
        return child.get(vsx_extension_1.VSXExtension);
    }; });
    bind(vsx_extensions_model_1.VSXExtensionsModel).toSelf().inSingletonScope();
    bind(vsx_extension_editor_1.VSXExtensionEditor).toSelf();
    bind(browser_1.WidgetFactory).toDynamicValue(function (ctx) { return ({
        id: vsx_extension_editor_1.VSXExtensionEditor.ID,
        createWidget: function (options) { return __awaiter(void 0, void 0, void 0, function () {
            var extension, child;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ctx.container.get(vsx_extensions_model_1.VSXExtensionsModel).resolve(options.id)];
                    case 1:
                        extension = _a.sent();
                        child = ctx.container.createChild();
                        child.bind(vsx_extension_1.VSXExtension).toConstantValue(extension);
                        return [2 /*return*/, child.get(vsx_extension_editor_1.VSXExtensionEditor)];
                }
            });
        }); }
    }); }).inSingletonScope();
    bind(vsx_extension_editor_manager_1.VSXExtensionEditorManager).toSelf().inSingletonScope();
    bind(browser_1.OpenHandler).toService(vsx_extension_editor_manager_1.VSXExtensionEditorManager);
    bind(browser_1.WidgetFactory).toDynamicValue(function (_a) {
        var container = _a.container;
        return ({
            id: vsx_extensions_widget_1.VSXExtensionsWidget.ID,
            createWidget: function (options) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, vsx_extensions_widget_1.VSXExtensionsWidget.createWidget(container, options)];
            }); }); }
        });
    }).inSingletonScope();
    bind(browser_1.WidgetFactory).toDynamicValue(function (ctx) { return ({
        id: vsx_extensions_view_container_1.VSXExtensionsViewContainer.ID,
        createWidget: function () { return __awaiter(void 0, void 0, void 0, function () {
            var child, viewContainer, widgetManager, _a, _b, id, widget, e_1_1;
            var e_1, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        child = ctx.container.createChild();
                        child.bind(browser_1.ViewContainerIdentifier).toConstantValue({
                            id: vsx_extensions_view_container_1.VSXExtensionsViewContainer.ID,
                            progressLocationId: 'extensions'
                        });
                        child.bind(vsx_extensions_view_container_1.VSXExtensionsViewContainer).toSelf();
                        viewContainer = child.get(vsx_extensions_view_container_1.VSXExtensionsViewContainer);
                        widgetManager = child.get(browser_1.WidgetManager);
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 8]);
                        _a = __values([vsx_extensions_source_1.VSXExtensionsSourceOptions.SEARCH_RESULT, vsx_extensions_source_1.VSXExtensionsSourceOptions.INSTALLED, vsx_extensions_source_1.VSXExtensionsSourceOptions.BUILT_IN]), _b = _a.next();
                        _d.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 5];
                        id = _b.value;
                        return [4 /*yield*/, widgetManager.getOrCreateWidget(vsx_extensions_widget_1.VSXExtensionsWidget.ID, { id: id })];
                    case 3:
                        widget = _d.sent();
                        viewContainer.addWidget(widget, {
                            initiallyCollapsed: id === vsx_extensions_source_1.VSXExtensionsSourceOptions.BUILT_IN
                        });
                        _d.label = 4;
                    case 4:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_1_1 = _d.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/, viewContainer];
                }
            });
        }); }
    }); }).inSingletonScope();
    bind(vsx_extensions_search_model_1.VSXExtensionsSearchModel).toSelf().inSingletonScope();
    bind(vsx_extensions_search_bar_1.VSXExtensionsSearchBar).toSelf().inSingletonScope();
    browser_1.bindViewContribution(bind, vsx_extensions_contribution_1.VSXExtensionsContribution);
    bind(browser_1.FrontendApplicationContribution).toService(vsx_extensions_contribution_1.VSXExtensionsContribution);
    bind(color_application_contribution_1.ColorContribution).toService(vsx_extensions_contribution_1.VSXExtensionsContribution);
    bind(tab_bar_toolbar_1.TabBarToolbarContribution).toService(vsx_extensions_contribution_1.VSXExtensionsContribution);
    bind(vsx_api_version_provider_frontend_impl_1.VSXApiVersionProviderImpl).toSelf().inSingletonScope();
    bind(browser_1.FrontendApplicationContribution).toService(vsx_api_version_provider_frontend_impl_1.VSXApiVersionProviderImpl);
    bind(vsx_api_version_provider_1.VSXApiVersionProvider).toService(vsx_api_version_provider_frontend_impl_1.VSXApiVersionProviderImpl);
});
//# sourceMappingURL=vsx-registry-frontend-module.js.map