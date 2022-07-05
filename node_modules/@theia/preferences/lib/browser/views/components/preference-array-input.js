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
exports.PreferenceArrayInput = void 0;
var React = require("react");
exports.PreferenceArrayInput = function (_a) {
    var e_1, _b;
    var preferenceDisplayNode = _a.preferenceDisplayNode, setPreference = _a.setPreference;
    var values = [];
    if (Array.isArray(preferenceDisplayNode.preference.value)) {
        try {
            for (var _c = __values(preferenceDisplayNode.preference.value), _d = _c.next(); !_d.done; _d = _c.next()) {
                var preferenceValue = _d.value;
                if (typeof preferenceValue === 'string') {
                    values.push(preferenceValue);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    var preferenceID = preferenceDisplayNode.id;
    var _e = __read(React.useState(''), 2), value = _e[0], setValue = _e[1];
    var doSubmit = React.useCallback(function () {
        if (value) {
            setPreference(preferenceID, __spread(values, [value]));
            setValue('');
        }
    }, [values, value]);
    var handleEnter = React.useCallback(function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            doSubmit();
        }
    }, []);
    var handleChange = React.useCallback(function (e) {
        setValue(e.target.value);
    }, []);
    var handleRemove = React.useCallback(function (e) {
        var target = e.currentTarget;
        var key = e.key;
        if (key && key !== 'Enter') {
            return;
        }
        var indexAttribute = target.getAttribute('data-index');
        var removalIndex = Number(indexAttribute);
        if (indexAttribute) {
            var newValues = __spread(values.slice(0, removalIndex), values.slice(removalIndex + 1));
            setPreference(preferenceID, newValues);
        }
    }, []);
    return (React.createElement("ul", { className: "preference-array" },
        values.map(function (val, i) { return (React.createElement("li", { className: "preference-array-element", key: preferenceID + "-li-" + i },
            React.createElement("span", { className: "preference-array-element-val" }, val),
            React.createElement("span", { className: "preference-array-element-btn remove-btn", onClick: handleRemove, onKeyDown: handleRemove, role: "button", tabIndex: 0, "data-index": i },
                React.createElement("i", { className: "preference-array-clear-item" })))); }),
        React.createElement("li", null,
            React.createElement("input", { className: "preference-array-input theia-input", type: "text", placeholder: "Add Value...", onKeyPress: handleEnter, onChange: handleChange, value: value, "aria-label": "Preference String Input" }),
            React.createElement("span", { className: "preference-array-element-btn add-btn", onClick: doSubmit, onKeyDown: doSubmit, role: "button", tabIndex: 0, "aria-label": "Submit Preference Input" },
                React.createElement("i", { className: "fa fa-plus" })))));
};
//# sourceMappingURL=preference-array-input.js.map