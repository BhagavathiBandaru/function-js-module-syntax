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
exports.UriAwareCommandHandler = void 0;
var selection_1 = require("../common/selection");
var uri_1 = require("./uri");
var UriAwareCommandHandler = /** @class */ (function () {
    /**
     * @deprecated since 1.6.0. Please use `UriAwareCommandHandler.MonoSelect` or `UriAwareCommandHandler.MultiSelect`.
     */
    function UriAwareCommandHandler(selectionService, handler, options) {
        this.selectionService = selectionService;
        this.handler = handler;
        this.options = options;
    }
    UriAwareCommandHandler.prototype.getUri = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _a = __read(args, 1), maybeUriArray = _a[0];
        var firstArgIsOK = this.isMulti()
            ? Array.isArray(maybeUriArray) && maybeUriArray.every(function (uri) { return uri instanceof uri_1.default; })
            : maybeUriArray instanceof uri_1.default;
        if (firstArgIsOK) {
            return maybeUriArray;
        }
        var selection = this.selectionService.selection;
        var uriOrUris = this.isMulti()
            ? selection_1.UriSelection.getUris(selection)
            : selection_1.UriSelection.getUri(selection);
        return uriOrUris;
    };
    UriAwareCommandHandler.prototype.getArgsWithUri = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var uri = this.getUri.apply(this, __spread(args));
        var _a = __read(args), maybeUri = _a[0], others = _a.slice(1);
        if (uri === maybeUri) {
            return __spread([maybeUri], others);
        }
        return __spread([uri], args);
    };
    UriAwareCommandHandler.prototype.execute = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _b = __read(this.getArgsWithUri.apply(this, __spread(args))), uri = _b[0], others = _b.slice(1);
        return uri ? (_a = this.handler).execute.apply(_a, __spread([uri], others)) : undefined;
    };
    UriAwareCommandHandler.prototype.isVisible = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _b = __read(this.getArgsWithUri.apply(this, __spread(args))), uri = _b[0], others = _b.slice(1);
        if (uri) {
            if (this.handler.isVisible) {
                return (_a = this.handler).isVisible.apply(_a, __spread([uri], others));
            }
            return true;
        }
        return false;
    };
    UriAwareCommandHandler.prototype.isEnabled = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _b = __read(this.getArgsWithUri.apply(this, __spread(args))), uri = _b[0], others = _b.slice(1);
        if (uri) {
            if (this.handler.isEnabled) {
                return (_a = this.handler).isEnabled.apply(_a, __spread([uri], others));
            }
            return true;
        }
        return false;
    };
    UriAwareCommandHandler.prototype.isMulti = function () {
        return this.options && !!this.options.multi;
    };
    return UriAwareCommandHandler;
}());
exports.UriAwareCommandHandler = UriAwareCommandHandler;
(function (UriAwareCommandHandler) {
    /**
     * @returns a command handler for mono-select contexts that expects a `URI` as the first parameter of its methods.
     */
    function MonoSelect(selectionService, handler) {
        /* eslint-disable-next-line deprecation/deprecation*/ // Safe to use when the generic and the options agree.
        return new UriAwareCommandHandler(selectionService, handler, { multi: false });
    }
    UriAwareCommandHandler.MonoSelect = MonoSelect;
    /**
     * @returns a command handler for multi-select contexts that expects a `URI[]` as the first parameter of its methods.
     */
    function MultiSelect(selectionService, handler) {
        /* eslint-disable-next-line deprecation/deprecation*/ // Safe to use when the generic and the options agree.
        return new UriAwareCommandHandler(selectionService, handler, { multi: true });
    }
    UriAwareCommandHandler.MultiSelect = MultiSelect;
})(UriAwareCommandHandler = exports.UriAwareCommandHandler || (exports.UriAwareCommandHandler = {}));
exports.UriAwareCommandHandler = UriAwareCommandHandler;
//# sourceMappingURL=uri-command-handler.js.map