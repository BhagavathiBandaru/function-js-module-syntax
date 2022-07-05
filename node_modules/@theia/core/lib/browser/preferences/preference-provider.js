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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreferenceProvider = exports.PreferenceProviderDataChange = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
var debounce = require("p-debounce");
var inversify_1 = require("inversify");
var json_1 = require("@phosphor/coreutils/lib/json");
var uri_1 = require("../../common/uri");
var common_1 = require("../../common");
var promise_util_1 = require("../../common/promise-util");
var PreferenceProviderDataChange;
(function (PreferenceProviderDataChange) {
    function affects(change, resourceUri) {
        var resourcePath = resourceUri && new uri_1.default(resourceUri).path;
        var domain = change.domain;
        return !resourcePath || !domain || domain.some(function (uri) { return new uri_1.default(uri).path.relativity(resourcePath) >= 0; });
    }
    PreferenceProviderDataChange.affects = affects;
})(PreferenceProviderDataChange = exports.PreferenceProviderDataChange || (exports.PreferenceProviderDataChange = {}));
/**
 * The {@link PreferenceProvider} is used to store and retrieve preference values. A {@link PreferenceProvider} does not operate in a global scope but is
 * configured for one or more {@link PreferenceScope}s. The (default implementation for the) {@link PreferenceService} aggregates all {@link PreferenceProvider}s and
 * serves as a common facade for manipulating preference values.
 */
var PreferenceProvider = /** @class */ (function () {
    function PreferenceProvider() {
        var _this = this;
        this.onDidPreferencesChangedEmitter = new common_1.Emitter();
        this.onDidPreferencesChanged = this.onDidPreferencesChangedEmitter.event;
        this.toDispose = new common_1.DisposableCollection();
        this._ready = new promise_util_1.Deferred();
        this._pendingChanges = Promise.resolve(false);
        this.fireDidPreferencesChanged = debounce(function () {
            var changes = _this.deferredChanges;
            _this.deferredChanges = undefined;
            if (changes && Object.keys(changes).length) {
                _this.onDidPreferencesChangedEmitter.fire(changes);
                return true;
            }
            return false;
        }, 0);
        this.toDispose.push(this.onDidPreferencesChangedEmitter);
    }
    PreferenceProvider.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    Object.defineProperty(PreferenceProvider.prototype, "pendingChanges", {
        get: function () {
            return this._pendingChanges;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Informs the listeners that one or more preferences of this provider are changed.
     * The listeners are able to find what was changed from the emitted event.
     */
    PreferenceProvider.prototype.emitPreferencesChangedEvent = function (changes) {
        var e_1, _a, e_2, _b;
        if (Array.isArray(changes)) {
            try {
                for (var changes_1 = __values(changes), changes_1_1 = changes_1.next(); !changes_1_1.done; changes_1_1 = changes_1.next()) {
                    var change = changes_1_1.value;
                    this.mergePreferenceProviderDataChange(change);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (changes_1_1 && !changes_1_1.done && (_a = changes_1.return)) _a.call(changes_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        else {
            try {
                for (var _c = __values(Object.keys(changes)), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var preferenceName = _d.value;
                    this.mergePreferenceProviderDataChange(changes[preferenceName]);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        return this._pendingChanges = this.fireDidPreferencesChanged();
    };
    PreferenceProvider.prototype.mergePreferenceProviderDataChange = function (change) {
        if (!this.deferredChanges) {
            this.deferredChanges = {};
        }
        var current = this.deferredChanges[change.preferenceName];
        var newValue = change.newValue, scope = change.scope, domain = change.domain;
        if (!current) {
            // new
            this.deferredChanges[change.preferenceName] = change;
        }
        else if (current.oldValue === newValue) {
            // delete
            delete this.deferredChanges[change.preferenceName];
        }
        else {
            // update
            Object.assign(current, { newValue: newValue, scope: scope, domain: domain });
        }
    };
    /**
     * Retrieve the stored value for the given preference and resource URI.
     *
     * @param preferenceName the preference identifier.
     * @param resourceUri the uri of the resource for which the preference is stored. This is used to retrieve
     * a potentially different value for the same preference for different resources, for example `files.encoding`.
     *
     * @returns the value stored for the given preference and resourceUri if it exists, otherwise `undefined`.
     */
    PreferenceProvider.prototype.get = function (preferenceName, resourceUri) {
        return this.resolve(preferenceName, resourceUri).value;
    };
    /**
     * Resolve the value for the given preference and resource URI.
     *
     * @param preferenceName the preference identifier.
     * @param resourceUri the URI of the resource for which this provider should resolve the preference. This is used to retrieve
     * a potentially different value for the same preference for different resources, for example `files.encoding`.
     *
     * @returns an object containing the value stored for the given preference and resourceUri if it exists,
     * otherwise `undefined`.
     */
    PreferenceProvider.prototype.resolve = function (preferenceName, resourceUri) {
        var value = this.getPreferences(resourceUri)[preferenceName];
        if (value !== undefined) {
            return {
                value: value,
                configUri: this.getConfigUri(resourceUri)
            };
        }
        return {};
    };
    Object.defineProperty(PreferenceProvider.prototype, "ready", {
        /**
         * Resolved when the preference provider is ready to provide preferences
         * It should be resolved by subclasses.
         */
        get: function () {
            return this._ready.promise;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Retrieve the domain for this provider.
     *
     * @returns the domain or `undefined` if this provider is suitable for all domains.
     */
    PreferenceProvider.prototype.getDomain = function () {
        return undefined;
    };
    /**
     * Retrieve the configuration URI for the given resource URI.
     * @param resourceUri the uri of the resource or `undefined`.
     * @param sectionName the section to return the URI for, e.g. `tasks` or `launch`. Defaults to settings.
     *
     * @returns the corresponding resource URI or `undefined` if there is no valid URI.
     */
    PreferenceProvider.prototype.getConfigUri = function (resourceUri, sectionName) {
        return undefined;
    };
    PreferenceProvider.merge = function (source, target) {
        var e_3, _a;
        if (source === undefined || !json_1.JSONExt.isObject(source)) {
            return json_1.JSONExt.deepCopy(target);
        }
        if (json_1.JSONExt.isPrimitive(target)) {
            return {};
        }
        try {
            for (var _b = __values(Object.keys(target)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                var value = target[key];
                if (key in source) {
                    if (json_1.JSONExt.isObject(source[key]) && json_1.JSONExt.isObject(value)) {
                        this.merge(source[key], value);
                        continue;
                    }
                }
                source[key] = json_1.JSONExt.deepCopy(value);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return source;
    };
    PreferenceProvider = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], PreferenceProvider);
    return PreferenceProvider;
}());
exports.PreferenceProvider = PreferenceProvider;
//# sourceMappingURL=preference-provider.js.map