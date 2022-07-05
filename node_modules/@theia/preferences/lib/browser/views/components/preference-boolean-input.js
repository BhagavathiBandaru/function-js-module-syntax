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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreferenceBooleanInput = void 0;
var React = require("react");
exports.PreferenceBooleanInput = function (_a) {
    var preferenceDisplayNode = _a.preferenceDisplayNode, setPreference = _a.setPreference;
    var id = preferenceDisplayNode.id;
    var value = typeof preferenceDisplayNode.preference.value === 'boolean' ? preferenceDisplayNode.preference.value : undefined;
    // Tracks local state for quicker refreshes on user click.
    var _b = __read(React.useState(!!value), 2), checked = _b[0], setChecked = _b[1];
    // Allows user to reset value using cogwheel.
    React.useEffect(function () {
        setChecked(!!value);
    }, [value]);
    var setValue = React.useCallback(function (e) {
        setChecked(!checked);
        setPreference(id, e.target.checked);
    }, [checked]);
    return (React.createElement("label", { htmlFor: "preference-checkbox-" + id },
        React.createElement("input", { type: "checkbox", className: "theia-input", checked: checked, readOnly: false, onChange: setValue, id: "preference-checkbox-" + id, "data-preference-id": id })));
};
//# sourceMappingURL=preference-boolean-input.js.map