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
exports.PreferenceSelectInput = void 0;
var React = require("react");
exports.PreferenceSelectInput = function (_a) {
    var preferenceDisplayNode = _a.preferenceDisplayNode, setPreference = _a.setPreference;
    var id = preferenceDisplayNode.id;
    var _b = preferenceDisplayNode.preference, value = _b.value, data = _b.data;
    var externalValue = (value !== undefined ? value : data.defaultValue) || '';
    var _c = __read(React.useState(0), 2), currentTimeout = _c[0], setCurrentTimetout = _c[1];
    var _d = __read(React.useState(externalValue), 2), currentValue = _d[0], setCurrentValue = _d[1];
    React.useEffect(function () {
        setCurrentValue(externalValue);
    }, [externalValue]);
    var onChange = React.useCallback(function (e) {
        var newValue = e.target.value;
        clearTimeout(currentTimeout);
        var newTimeout = setTimeout(function () { return setPreference(id, newValue); }, 250);
        setCurrentTimetout(Number(newTimeout));
        setCurrentValue(newValue);
    }, [currentTimeout]);
    return (React.createElement("select", { value: currentValue, className: "theia-select", onChange: onChange, "data-preference-id": id }, preferenceDisplayNode.preference.data.enum.map(function (option) { return React.createElement("option", { value: option, key: option }, option); })));
};
//# sourceMappingURL=preference-select-input.js.map