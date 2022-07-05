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
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindScmPreferences = exports.createScmPreferences = exports.ScmPreferences = exports.scmPreferenceSchema = void 0;
var preferences_1 = require("@theia/core/lib/browser/preferences");
exports.scmPreferenceSchema = {
    type: 'object',
    properties: {
        'scm.defaultViewMode': {
            type: 'string',
            enum: ['tree', 'list'],
            enumDescriptions: [
                'Show the repository changes as a tree.',
                'Show the repository changes as a list.'
            ],
            description: 'Controls the default source control view mode.',
            default: 'list'
        }
    }
};
exports.ScmPreferences = Symbol('ScmPreferences');
function createScmPreferences(preferences) {
    return preferences_1.createPreferenceProxy(preferences, exports.scmPreferenceSchema);
}
exports.createScmPreferences = createScmPreferences;
function bindScmPreferences(bind) {
    bind(exports.ScmPreferences).toDynamicValue(function (ctx) {
        var preferences = ctx.container.get(preferences_1.PreferenceService);
        return createScmPreferences(preferences);
    }).inSingletonScope();
    bind(preferences_1.PreferenceContribution).toConstantValue({ schema: exports.scmPreferenceSchema });
}
exports.bindScmPreferences = bindScmPreferences;
//# sourceMappingURL=scm-preferences.js.map