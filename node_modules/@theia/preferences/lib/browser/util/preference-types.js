"use strict";
/********************************************************************************
 * Copyright (C) 2020 Ericsson and others.
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
exports.PreferenceMenus = exports.PreferencesCommands = exports.Preference = void 0;
var browser_1 = require("@theia/core/lib/browser");
var Preference;
(function (Preference) {
    var EditorCommandArgs;
    (function (EditorCommandArgs) {
        function is(prefObject) {
            return !!prefObject && 'id' in prefObject && 'value' in prefObject;
        }
        EditorCommandArgs.is = is;
    })(EditorCommandArgs = Preference.EditorCommandArgs || (Preference.EditorCommandArgs = {}));
    Preference.getValueInScope = function (preferenceInfo, scope) {
        if (!preferenceInfo) {
            return undefined;
        }
        switch (scope) {
            case browser_1.PreferenceScope.User:
                return preferenceInfo.globalValue;
            case browser_1.PreferenceScope.Workspace:
                return preferenceInfo.workspaceValue;
            case browser_1.PreferenceScope.Folder:
                return preferenceInfo.workspaceFolderValue;
            default:
                return undefined;
        }
    };
    ;
    Preference.DEFAULT_SCOPE = {
        scope: browser_1.PreferenceScope.User.toString(),
        uri: '',
        activeScopeIsFolder: 'false'
    };
})(Preference = exports.Preference || (exports.Preference = {}));
var PreferencesCommands;
(function (PreferencesCommands) {
    PreferencesCommands.OPEN_PREFERENCES_JSON_TOOLBAR = {
        id: 'preferences:openJson.toolbar',
        iconClass: 'codicon codicon-json'
    };
    PreferencesCommands.COPY_JSON_NAME = {
        id: 'preferences:copyJson.name',
        label: 'Copy Setting ID'
    };
    PreferencesCommands.RESET_PREFERENCE = {
        id: 'preferences:reset',
        label: 'Reset Setting'
    };
    PreferencesCommands.COPY_JSON_VALUE = {
        id: 'preferences:copyJson.value',
        label: 'Copy Setting as JSON',
    };
})(PreferencesCommands = exports.PreferencesCommands || (exports.PreferencesCommands = {}));
var PreferenceMenus;
(function (PreferenceMenus) {
    PreferenceMenus.PREFERENCE_EDITOR_CONTEXT_MENU = ['preferences:editor.contextMenu'];
    PreferenceMenus.PREFERENCE_EDITOR_COPY_ACTIONS = __spread(PreferenceMenus.PREFERENCE_EDITOR_CONTEXT_MENU, ['preferences:editor.contextMenu.copy']);
})(PreferenceMenus = exports.PreferenceMenus || (exports.PreferenceMenus = {}));
//# sourceMappingURL=preference-types.js.map