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
exports.bindPreferenceProviders = exports.bindFactory = exports.bindWorkspaceFilePreferenceProvider = void 0;
var inversify_1 = require("inversify");
var preferences_1 = require("@theia/core/lib/browser/preferences");
var user_preference_provider_1 = require("./user-preference-provider");
var workspace_preference_provider_1 = require("./workspace-preference-provider");
var workspace_file_preference_provider_1 = require("./workspace-file-preference-provider");
var folders_preferences_provider_1 = require("./folders-preferences-provider");
var folder_preference_provider_1 = require("./folder-preference-provider");
var user_configs_preference_provider_1 = require("./user-configs-preference-provider");
var section_preference_provider_1 = require("./section-preference-provider");
function bindWorkspaceFilePreferenceProvider(bind) {
    bind(workspace_file_preference_provider_1.WorkspaceFilePreferenceProviderFactory).toFactory(function (ctx) { return function (options) {
        var child = new inversify_1.Container({ defaultScope: 'Singleton' });
        child.parent = ctx.container;
        child.bind(workspace_file_preference_provider_1.WorkspaceFilePreferenceProvider).toSelf();
        child.bind(workspace_file_preference_provider_1.WorkspaceFilePreferenceProviderOptions).toConstantValue(options);
        return child.get(workspace_file_preference_provider_1.WorkspaceFilePreferenceProvider);
    }; });
}
exports.bindWorkspaceFilePreferenceProvider = bindWorkspaceFilePreferenceProvider;
function bindFactory(bind, factoryId, constructor) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var parameterBindings = [];
    for (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var _i = 3; 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _i < arguments.length; 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _i++) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        parameterBindings[_i - 3] = arguments[_i];
    }
    bind(factoryId).toFactory(function (ctx) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var child = new inversify_1.Container({ defaultScope: 'Singleton' });
            child.parent = ctx.container;
            for (var i = 0; i < parameterBindings.length; i++) {
                child.bind(parameterBindings[i]).toConstantValue(args[i]);
            }
            child.bind(constructor).to(constructor);
            return child.get(constructor);
        };
    });
}
exports.bindFactory = bindFactory;
function bindPreferenceProviders(bind, unbind) {
    unbind(preferences_1.PreferenceProvider);
    bind(preferences_1.PreferenceProvider).to(user_configs_preference_provider_1.UserConfigsPreferenceProvider).inSingletonScope().whenTargetNamed(preferences_1.PreferenceScope.User);
    bind(preferences_1.PreferenceProvider).to(workspace_preference_provider_1.WorkspacePreferenceProvider).inSingletonScope().whenTargetNamed(preferences_1.PreferenceScope.Workspace);
    bind(preferences_1.PreferenceProvider).to(folders_preferences_provider_1.FoldersPreferencesProvider).inSingletonScope().whenTargetNamed(preferences_1.PreferenceScope.Folder);
    bindWorkspaceFilePreferenceProvider(bind);
    bindFactory(bind, user_preference_provider_1.UserPreferenceProviderFactory, user_preference_provider_1.UserPreferenceProvider, section_preference_provider_1.SectionPreferenceProviderUri, section_preference_provider_1.SectionPreferenceProviderSection);
    bindFactory(bind, folder_preference_provider_1.FolderPreferenceProviderFactory, folder_preference_provider_1.FolderPreferenceProvider, section_preference_provider_1.SectionPreferenceProviderUri, section_preference_provider_1.SectionPreferenceProviderSection, folder_preference_provider_1.FolderPreferenceProviderFolder);
}
exports.bindPreferenceProviders = bindPreferenceProviders;
//# sourceMappingURL=preference-bindings.js.map