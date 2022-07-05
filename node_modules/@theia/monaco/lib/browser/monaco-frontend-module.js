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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMonacoConfigurationService = exports.MonacoConfigurationService = void 0;
require("../../src/browser/style/index.css");
require("../../src/browser/style/symbol-sprite.svg");
require("../../src/browser/style/symbol-icons.css");
var inversify_1 = require("inversify");
var common_1 = require("@theia/core/lib/common");
var browser_1 = require("@theia/core/lib/browser");
var browser_2 = require("@theia/editor/lib/browser");
var editor_keybinding_contexts_1 = require("@theia/editor/lib/browser/editor-keybinding-contexts");
var monaco_editor_provider_1 = require("./monaco-editor-provider");
var monaco_menu_1 = require("./monaco-menu");
var monaco_command_1 = require("./monaco-command");
var monaco_keybinding_1 = require("./monaco-keybinding");
var monaco_languages_1 = require("./monaco-languages");
var monaco_workspace_1 = require("./monaco-workspace");
var monaco_editor_service_1 = require("./monaco-editor-service");
var monaco_text_model_service_1 = require("./monaco-text-model-service");
var monaco_context_menu_1 = require("./monaco-context-menu");
var monaco_outline_contribution_1 = require("./monaco-outline-contribution");
var monaco_status_bar_contribution_1 = require("./monaco-status-bar-contribution");
var monaco_command_service_1 = require("./monaco-command-service");
var monaco_command_registry_1 = require("./monaco-command-registry");
var monaco_quick_open_service_1 = require("./monaco-quick-open-service");
var monaco_diff_navigator_factory_1 = require("./monaco-diff-navigator-factory");
var monaco_keybinding_contexts_1 = require("./monaco-keybinding-contexts");
var monaco_frontend_application_contribution_1 = require("./monaco-frontend-application-contribution");
var monaco_textmate_frontend_bindings_1 = require("./textmate/monaco-textmate-frontend-bindings");
var monaco_bulk_edit_service_1 = require("./monaco-bulk-edit-service");
var monaco_outline_decorator_1 = require("./monaco-outline-decorator");
var outline_decorator_service_1 = require("@theia/outline-view/lib/browser/outline-decorator-service");
var monaco_snippet_suggest_provider_1 = require("./monaco-snippet-suggest-provider");
var context_key_service_1 = require("@theia/core/lib/browser/context-key-service");
var monaco_context_key_service_1 = require("./monaco-context-key-service");
var monaco_mime_service_1 = require("./monaco-mime-service");
var mime_service_1 = require("@theia/core/lib/browser/mime-service");
var monaco_editor_1 = require("./monaco-editor");
var monaco_color_registry_1 = require("./monaco-color-registry");
var color_registry_1 = require("@theia/core/lib/browser/color-registry");
var monaco_theming_service_1 = require("./monaco-theming-service");
var core_1 = require("@theia/core");
var workspace_symbol_command_1 = require("./workspace-symbol-command");
var language_service_1 = require("@theia/core/lib/browser/language-service");
var monaco_to_protocol_converter_1 = require("./monaco-to-protocol-converter");
var protocol_to_monaco_converter_1 = require("./protocol-to-monaco-converter");
var monaco_formatting_conflicts_1 = require("./monaco-formatting-conflicts");
inversify_1.decorate(inversify_1.injectable(), monaco.contextKeyService.ContextKeyService);
monaco_theming_service_1.MonacoThemingService.init();
exports.default = new inversify_1.ContainerModule(function (bind, unbind, isBound, rebind) {
    var e_1, _a;
    bind(monaco_theming_service_1.MonacoThemingService).toSelf().inSingletonScope();
    bind(monaco_context_key_service_1.MonacoContextKeyService).toSelf().inSingletonScope();
    rebind(context_key_service_1.ContextKeyService).toService(monaco_context_key_service_1.MonacoContextKeyService);
    bind(monaco_snippet_suggest_provider_1.MonacoSnippetSuggestProvider).toSelf().inSingletonScope();
    bind(browser_1.FrontendApplicationContribution).to(monaco_frontend_application_contribution_1.MonacoFrontendApplicationContribution).inSingletonScope();
    bind(monaco_to_protocol_converter_1.MonacoToProtocolConverter).toSelf().inSingletonScope();
    bind(protocol_to_monaco_converter_1.ProtocolToMonacoConverter).toSelf().inSingletonScope();
    bind(monaco_languages_1.MonacoLanguages).toSelf().inSingletonScope();
    rebind(language_service_1.LanguageService).toService(monaco_languages_1.MonacoLanguages);
    bind(workspace_symbol_command_1.WorkspaceSymbolCommand).toSelf().inSingletonScope();
    try {
        for (var _b = __values([common_1.CommandContribution, browser_1.KeybindingContribution, browser_1.QuickOpenContribution]), _c = _b.next(); !_c.done; _c = _b.next()) {
            var identifier = _c.value;
            bind(identifier).toService(workspace_symbol_command_1.WorkspaceSymbolCommand);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    bind(monaco_workspace_1.MonacoWorkspace).toSelf().inSingletonScope();
    bind(exports.MonacoConfigurationService).toDynamicValue(function (_a) {
        var container = _a.container;
        return createMonacoConfigurationService(container);
    }).inSingletonScope();
    bind(monaco.contextKeyService.ContextKeyService).toDynamicValue(function (_a) {
        var container = _a.container;
        return new monaco.contextKeyService.ContextKeyService(container.get(exports.MonacoConfigurationService));
    }).inSingletonScope();
    bind(monaco_bulk_edit_service_1.MonacoBulkEditService).toSelf().inSingletonScope();
    bind(monaco_editor_service_1.MonacoEditorService).toSelf().inSingletonScope();
    bind(monaco_text_model_service_1.MonacoTextModelService).toSelf().inSingletonScope();
    bind(monaco_context_menu_1.MonacoContextMenuService).toSelf().inSingletonScope();
    bind(monaco_editor_1.MonacoEditorServices).toSelf().inSingletonScope();
    bind(monaco_editor_provider_1.MonacoEditorProvider).toSelf().inSingletonScope();
    core_1.bindContributionProvider(bind, monaco_editor_provider_1.MonacoEditorFactory);
    core_1.bindContributionProvider(bind, monaco_text_model_service_1.MonacoEditorModelFactory);
    bind(monaco_command_service_1.MonacoCommandService).toSelf().inTransientScope();
    bind(monaco_command_service_1.MonacoCommandServiceFactory).toAutoFactory(monaco_command_service_1.MonacoCommandService);
    bind(browser_2.TextEditorProvider).toProvider(function (context) {
        return function (uri) { return context.container.get(monaco_editor_provider_1.MonacoEditorProvider).get(uri); };
    });
    bind(monaco_diff_navigator_factory_1.MonacoDiffNavigatorFactory).toSelf().inSingletonScope();
    bind(browser_2.DiffNavigatorProvider).toFactory(function (context) {
        return function (editor) { return context.container.get(monaco_editor_provider_1.MonacoEditorProvider).getDiffNavigator(editor); };
    });
    bind(monaco_outline_contribution_1.MonacoOutlineContribution).toSelf().inSingletonScope();
    bind(browser_1.FrontendApplicationContribution).toService(monaco_outline_contribution_1.MonacoOutlineContribution);
    bind(monaco_formatting_conflicts_1.MonacoFormattingConflictsContribution).toSelf().inSingletonScope();
    bind(browser_1.FrontendApplicationContribution).toService(monaco_formatting_conflicts_1.MonacoFormattingConflictsContribution);
    bind(monaco_status_bar_contribution_1.MonacoStatusBarContribution).toSelf().inSingletonScope();
    bind(browser_1.FrontendApplicationContribution).toService(monaco_status_bar_contribution_1.MonacoStatusBarContribution);
    bind(monaco_command_registry_1.MonacoCommandRegistry).toSelf().inSingletonScope();
    bind(common_1.CommandContribution).to(monaco_command_1.MonacoEditorCommandHandlers).inSingletonScope();
    bind(monaco_menu_1.MonacoEditorMenuContribution).toSelf().inSingletonScope();
    bind(common_1.MenuContribution).toService(monaco_menu_1.MonacoEditorMenuContribution);
    bind(monaco_keybinding_1.MonacoKeybindingContribution).toSelf().inSingletonScope();
    bind(browser_1.KeybindingContribution).toService(monaco_keybinding_1.MonacoKeybindingContribution);
    rebind(editor_keybinding_contexts_1.StrictEditorTextFocusContext).to(monaco_keybinding_contexts_1.MonacoStrictEditorTextFocusContext).inSingletonScope();
    bind(monaco_quick_open_service_1.MonacoQuickOpenService).toSelf().inSingletonScope();
    rebind(browser_1.QuickOpenService).toService(monaco_quick_open_service_1.MonacoQuickOpenService);
    monaco_textmate_frontend_bindings_1.default(bind, unbind, isBound, rebind);
    bind(monaco_outline_decorator_1.MonacoOutlineDecorator).toSelf().inSingletonScope();
    bind(outline_decorator_service_1.OutlineTreeDecorator).toService(monaco_outline_decorator_1.MonacoOutlineDecorator);
    bind(monaco_mime_service_1.MonacoMimeService).toSelf().inSingletonScope();
    rebind(mime_service_1.MimeService).toService(monaco_mime_service_1.MonacoMimeService);
    bind(monaco_color_registry_1.MonacoColorRegistry).toSelf().inSingletonScope();
    rebind(color_registry_1.ColorRegistry).toService(monaco_color_registry_1.MonacoColorRegistry);
});
exports.MonacoConfigurationService = Symbol('MonacoConfigurationService');
function createMonacoConfigurationService(container) {
    var preferences = container.get(browser_1.PreferenceService);
    var preferenceSchemaProvider = container.get(browser_1.PreferenceSchemaProvider);
    var service = monaco.services.StaticServices.configurationService.get();
    var _configuration = service._configuration;
    _configuration.getValue = function (section, overrides) {
        var overrideIdentifier = overrides && 'overrideIdentifier' in overrides && overrides['overrideIdentifier'] || undefined;
        var resourceUri = overrides && 'resource' in overrides && !!overrides['resource'] && overrides['resource'].toString();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var proxy = browser_1.createPreferenceProxy(preferences, preferenceSchemaProvider.getCombinedSchema(), {
            resourceUri: resourceUri, overrideIdentifier: overrideIdentifier,
            style: 'both'
        });
        if (section) {
            return proxy[section];
        }
        return proxy;
    };
    var toTarget = function (scope) {
        switch (scope) {
            case browser_1.PreferenceScope.Default: return 6 /* DEFAULT */;
            case browser_1.PreferenceScope.User: return 1 /* USER */;
            case browser_1.PreferenceScope.Workspace: return 4 /* WORKSPACE */;
            case browser_1.PreferenceScope.Folder: return 5 /* WORKSPACE_FOLDER */;
        }
    };
    var newFireDidChangeConfigurationContext = function () { return ({
        changes: [],
        affectedKeys: new Set(),
        keys: new Set(),
        overrides: new Map()
    }); };
    var fireDidChangeConfiguration = function (source, context) {
        var e_2, _a;
        if (!context.affectedKeys.size) {
            return;
        }
        var overrides = [];
        try {
            for (var _b = __values(context.overrides), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), override = _d[0], values = _d[1];
                overrides.push([override, __spread(values)]);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        service._onDidChangeConfiguration.fire({
            change: {
                keys: __spread(context.keys),
                overrides: overrides
            },
            affectedKeys: __spread(context.affectedKeys),
            source: source,
            affectsConfiguration: function (prefix, options) {
                var e_3, _a;
                var _b;
                if (!context.affectedKeys.has(prefix)) {
                    return false;
                }
                try {
                    for (var _c = __values(context.changes), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var change = _d.value;
                        var overridden = preferences.overriddenPreferenceName(change.preferenceName);
                        var preferenceName = overridden ? overridden.preferenceName : change.preferenceName;
                        if (preferenceName.startsWith(prefix)) {
                            if ((options === null || options === void 0 ? void 0 : options.overrideIdentifier) !== undefined) {
                                if (overridden && overridden.overrideIdentifier !== (options === null || options === void 0 ? void 0 : options.overrideIdentifier)) {
                                    continue;
                                }
                            }
                            if (change.affects((_b = options === null || options === void 0 ? void 0 : options.resource) === null || _b === void 0 ? void 0 : _b.toString())) {
                                return true;
                            }
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                return false;
            }
        });
    };
    preferences.onPreferencesChanged(function (event) {
        var e_4, _a;
        var _b;
        var source;
        var context = newFireDidChangeConfigurationContext();
        try {
            for (var _c = __values(Object.keys(event)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var key = _d.value;
                var change = event[key];
                var target = toTarget(change.scope);
                if (source !== undefined && target !== source) {
                    fireDidChangeConfiguration(source, context);
                    context = newFireDidChangeConfigurationContext();
                }
                context.changes.push(change);
                source = target;
                var overrideKeys = void 0;
                if (key.startsWith('[')) {
                    var index = key.indexOf('.');
                    var override = key.substring(0, index);
                    var overrideIdentifier = (_b = override.match(browser_1.OVERRIDE_PROPERTY_PATTERN)) === null || _b === void 0 ? void 0 : _b[1];
                    if (overrideIdentifier) {
                        context.keys.add(override);
                        context.affectedKeys.add(override);
                        overrideKeys = context.overrides.get(overrideIdentifier) || new Set();
                        context.overrides.set(overrideIdentifier, overrideKeys);
                        key = key.substring(index + 1);
                    }
                }
                while (key) {
                    if (overrideKeys) {
                        overrideKeys.add(key);
                    }
                    context.keys.add(key);
                    context.affectedKeys.add(key);
                    var index = key.lastIndexOf('.');
                    key = key.substring(0, index);
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_4) throw e_4.error; }
        }
        if (source) {
            fireDidChangeConfiguration(source, context);
        }
    });
    return service;
}
exports.createMonacoConfigurationService = createMonacoConfigurationService;
//# sourceMappingURL=monaco-frontend-module.js.map