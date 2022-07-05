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
exports.PreferenceNumberInput = void 0;
var React = require("react");
exports.PreferenceNumberInput = function (_a) {
    var _b;
    var preferenceDisplayNode = _a.preferenceDisplayNode, setPreference = _a.setPreference;
    var id = preferenceDisplayNode.id;
    var _c = preferenceDisplayNode.preference, data = _c.data, value = _c.value;
    var externalValue = (_b = (value !== undefined ? value : data.defaultValue)) !== null && _b !== void 0 ? _b : '';
    var _d = __read(React.useState(0), 2), currentTimeout = _d[0], setCurrentTimetout = _d[1];
    var _e = __read(React.useState(externalValue), 2), currentValue = _e[0], setCurrentValue = _e[1];
    var _f = __read(React.useState(''), 2), validationMessage = _f[0], setValidationMessage = _f[1];
    React.useEffect(function () {
        setCurrentValue(externalValue);
    }, [externalValue]);
    var onBlur = React.useCallback(function () {
        setCurrentValue(externalValue);
        setValidationMessage('');
    }, [externalValue]);
    var onChange = React.useCallback(function (e) {
        clearTimeout(currentTimeout);
        var newValue = e.target.value;
        setCurrentValue(newValue);
        var _a = getInputValidation(newValue), inputValue = _a.value, message = _a.message;
        setValidationMessage(message);
        if (!isNaN(inputValue)) {
            var newTimeout = setTimeout(function () { return setPreference(id, inputValue); }, 750);
            setCurrentTimetout(Number(newTimeout));
        }
    }, [currentTimeout]);
    /**
     * Validate the input value.
     * @param input the input value.
     */
    var getInputValidation = function (input) {
        var inputValue = Number(input);
        var errorMessages = [];
        if (input === '' || isNaN(inputValue)) {
            return { value: NaN, message: 'Value must be a number.' };
        }
        if (data.minimum && inputValue < data.minimum) {
            errorMessages.push("Value must be greater than or equal to " + data.minimum + ".");
        }
        ;
        if (data.maximum && inputValue > data.maximum) {
            errorMessages.push("Value must be less than or equal to " + data.maximum + ".");
        }
        ;
        if (data.type === 'integer' && inputValue % 1 !== 0) {
            errorMessages.push('Value must be an integer.');
        }
        return {
            value: errorMessages.length ? NaN : inputValue,
            message: errorMessages.join(' ')
        };
    };
    return (React.createElement("div", { className: 'pref-input-container' },
        React.createElement("input", { type: "number", className: "theia-input", pattern: "[0-9]*", value: currentValue, onChange: onChange, onBlur: onBlur, "data-preference-id": id }),
        !!validationMessage.length ? React.createElement("div", { className: 'pref-error-notification' }, validationMessage) : undefined));
};
//# sourceMappingURL=preference-number-input.js.map