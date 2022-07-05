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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SinglePreferenceWrapper = void 0;
var React = require("react");
var browser_1 = require("@theia/core/lib/browser");
var _1 = require(".");
var preference_types_1 = require("../../util/preference-types");
var SinglePreferenceWrapper = /** @class */ (function (_super) {
    __extends(SinglePreferenceWrapper, _super);
    function SinglePreferenceWrapper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            showCog: false,
            menuOpen: false
        };
        _this.handleOnCogClick = function (e) {
            if (_this.value !== undefined) {
                var target = e.target;
                var domRect = target.getBoundingClientRect();
                _this.props.contextMenuRenderer.render({
                    menuPath: preference_types_1.PreferenceMenus.PREFERENCE_EDITOR_CONTEXT_MENU,
                    anchor: { x: domRect.left, y: domRect.bottom },
                    args: [{ id: _this.props.preferenceDisplayNode.id, value: _this.value }],
                    onHide: _this.setMenuHidden
                });
                _this.setMenuShown();
            }
        };
        _this.setMenuShown = function () {
            _this.setState({ menuOpen: true });
        };
        _this.setMenuHidden = function () {
            _this.setState({ menuOpen: false });
        };
        _this.showCog = function () {
            _this.setState({ showCog: true });
        };
        _this.hideCog = function () {
            _this.setState({ showCog: false });
        };
        _this.openJSONForCurrentPreference = function () {
            _this.props.openJSON(_this.props.preferenceDisplayNode);
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _this.setPreference = function (preferenceName, preferenceValue) {
            _this.props.preferencesService.set(preferenceName, preferenceValue, _this.props.currentScope, _this.props.currentScopeURI);
        };
        _this.getInputType = function (preferenceDisplayNode) {
            var _a = preferenceDisplayNode.preference.data, type = _a.type, items = _a.items;
            if (preferenceDisplayNode.preference.data.enum) {
                return React.createElement(_1.PreferenceSelectInput, { preferenceDisplayNode: preferenceDisplayNode, setPreference: _this.setPreference });
            }
            if (type === 'boolean') {
                return React.createElement(_1.PreferenceBooleanInput, { preferenceDisplayNode: preferenceDisplayNode, setPreference: _this.setPreference });
            }
            if (type === 'string') {
                return React.createElement(_1.PreferenceStringInput, { preferenceDisplayNode: preferenceDisplayNode, setPreference: _this.setPreference });
            }
            if (type === 'number' || type === 'integer') {
                return React.createElement(_1.PreferenceNumberInput, { preferenceDisplayNode: preferenceDisplayNode, setPreference: _this.setPreference });
            }
            if (type === 'array') {
                if (items && items.type === 'string') {
                    return React.createElement(_1.PreferenceArrayInput, { preferenceDisplayNode: preferenceDisplayNode, setPreference: _this.setPreference });
                }
                return React.createElement(_1.PreferenceJSONInput, { preferenceDisplayNode: preferenceDisplayNode, onClick: _this.openJSONForCurrentPreference });
            }
            if (type === 'object') {
                return React.createElement(_1.PreferenceJSONInput, { preferenceDisplayNode: preferenceDisplayNode, onClick: _this.openJSONForCurrentPreference });
            }
            return React.createElement(_1.PreferenceJSONInput, { preferenceDisplayNode: preferenceDisplayNode, onClick: _this.openJSONForCurrentPreference });
        };
        return _this;
    }
    SinglePreferenceWrapper.prototype.render = function () {
        var _a;
        var preferenceDisplayNode = this.props.preferenceDisplayNode;
        var _b = preferenceDisplayNode.preference, data = _b.data, values = _b.values;
        this.value = (_a = preference_types_1.Preference.getValueInScope(values, this.props.currentScope)) !== null && _a !== void 0 ? _a : data.defaultValue;
        var currentValueIsDefaultValue = this.value === data.defaultValue;
        var singlePreferenceValueDisplayNode = __assign(__assign({}, preferenceDisplayNode), { preference: { data: data, value: this.value } });
        var description = data.markdownDescription || data.description;
        if (preferenceDisplayNode.visible) {
            return (React.createElement("li", { className: 'single-pref', id: preferenceDisplayNode.id + "-editor", key: preferenceDisplayNode.id, "data-id": preferenceDisplayNode.id },
                React.createElement("div", { className: "pref-name" },
                    preferenceDisplayNode.name,
                    this.renderOtherModifiedScopes(singlePreferenceValueDisplayNode.id, values, this.props.currentScope, this.props.preferencesService)),
                React.createElement("div", { className: "pref-context-gutter " + (!currentValueIsDefaultValue ? 'theia-mod-item-modified' : ''), onMouseOver: this.showCog, onMouseOut: this.hideCog },
                    React.createElement("i", { className: "codicon codicon-settings-gear settings-context-menu-btn " + ((this.state.showCog || this.state.menuOpen) ? 'show-cog' : ''), "aria-label": "Open Context Menu", role: "button", onClick: this.handleOnCogClick, onKeyDown: this.handleOnCogClick, title: "More actions..." })),
                React.createElement("div", { className: "pref-content-container " + (data.type || 'open-json'), onFocus: this.showCog, onBlur: this.hideCog },
                    description && React.createElement("div", { className: 'pref-description' }, description),
                    React.createElement("div", { className: 'pref-input' }, this.getInputType(singlePreferenceValueDisplayNode)))));
        }
        else {
            return React.createElement(React.Fragment, null);
        }
    };
    SinglePreferenceWrapper.prototype.renderOtherModifiedScopes = function (id, preferenceValuesInAllScopes, currentScope, service) {
        if (preferenceValuesInAllScopes) {
            return ['User', 'Workspace'].map(function (scope) {
                var otherScope = browser_1.PreferenceScope[scope];
                if (currentScope !== otherScope) {
                    var info = service.inspect(id);
                    if (!info) {
                        return;
                    }
                    var defaultValue = info.defaultValue;
                    var currentValue = preference_types_1.Preference.getValueInScope(info, currentScope);
                    var otherValue = preference_types_1.Preference.getValueInScope(info, otherScope);
                    if (otherValue !== undefined && otherValue !== defaultValue) {
                        var bothOverridden = ((currentValue !== defaultValue && currentValue !== undefined) &&
                            (otherValue !== defaultValue && otherValue !== undefined));
                        var message = bothOverridden ? 'Also modified in:' : 'Modified in:';
                        return React.createElement("i", { key: "modified-in-" + scope + "-alert" },
                            React.createElement("span", null,
                                " (",
                                message,
                                " ",
                                React.createElement("span", { className: 'settings-scope-underlined' }, scope),
                                ")"));
                    }
                }
            });
        }
    };
    return SinglePreferenceWrapper;
}(React.Component));
exports.SinglePreferenceWrapper = SinglePreferenceWrapper;
//# sourceMappingURL=single-preference-wrapper.js.map