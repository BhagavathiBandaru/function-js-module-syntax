"use strict";
/********************************************************************************
 * Copyright (C) 2021 Ericsson and others.
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
exports.bindWindowPreferences = exports.createElectronWindowPreferences = exports.ElectronWindowPreferences = exports.ElectronWindowConfiguration = exports.electronWindowPreferencesSchema = exports.ZoomLevel = void 0;
var preferences_1 = require("../../browser/preferences");
var ZoomLevel;
(function (ZoomLevel) {
    ZoomLevel.DEFAULT = 0;
    // copied from https://github.com/microsoft/vscode/blob/dda96b69bfc63f309e60cfc5f98cb863c46b32ac/src/vs/workbench/electron-sandbox/actions/windowActions.ts#L47-L48
    ZoomLevel.MIN = -8;
    ZoomLevel.MAX = 9;
    // amount to increment or decrement the window zoom level.
    ZoomLevel.VARIATION = 0.5;
})(ZoomLevel = exports.ZoomLevel || (exports.ZoomLevel = {}));
exports.electronWindowPreferencesSchema = {
    type: 'object',
    properties: {
        'window.zoomLevel': {
            'type': 'number',
            'default': ZoomLevel.DEFAULT,
            'minimum': ZoomLevel.MIN,
            'maximum': ZoomLevel.MAX,
            'scope': 'application',
            // eslint-disable-next-line max-len
            'description': 'Adjust the zoom level of the window. The original size is 0 and each increment above (e.g. 1.0) or below (e.g. -1.0) represents zooming 20% larger or smaller. You can also enter decimals to adjust the zoom level with a finer granularity.'
        },
    }
};
var ElectronWindowConfiguration = /** @class */ (function () {
    function ElectronWindowConfiguration() {
    }
    return ElectronWindowConfiguration;
}());
exports.ElectronWindowConfiguration = ElectronWindowConfiguration;
exports.ElectronWindowPreferences = Symbol('ElectronWindowPreferences');
function createElectronWindowPreferences(preferences) {
    return preferences_1.createPreferenceProxy(preferences, exports.electronWindowPreferencesSchema);
}
exports.createElectronWindowPreferences = createElectronWindowPreferences;
function bindWindowPreferences(bind) {
    bind(exports.ElectronWindowPreferences).toDynamicValue(function (ctx) {
        var preferences = ctx.container.get(preferences_1.PreferenceService);
        return createElectronWindowPreferences(preferences);
    }).inSingletonScope();
    bind(preferences_1.PreferenceContribution).toConstantValue({ schema: exports.electronWindowPreferencesSchema });
}
exports.bindWindowPreferences = bindWindowPreferences;
//# sourceMappingURL=electron-window-preferences.js.map