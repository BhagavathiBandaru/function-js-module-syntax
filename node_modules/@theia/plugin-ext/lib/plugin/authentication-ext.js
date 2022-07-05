"use strict";
/********************************************************************************
 * Copyright (C) 2020 Red Hat, Inc. and others.
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationExtImpl = void 0;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// code copied and modified from https://github.com/microsoft/vscode/blob/1.47.3/src/vs/workbench/api/common/extHostAuthentication.ts
var types_impl_1 = require("./types-impl");
var plugin_api_rpc_1 = require("../common/plugin-api-rpc");
var event_1 = require("@theia/core/lib/common/event");
var AuthenticationExtImpl = /** @class */ (function () {
    function AuthenticationExtImpl(rpc) {
        this.authenticationProviders = new Map();
        this._providerIds = [];
        this._providers = [];
        this.onDidChangeAuthenticationProvidersEmitter = new event_1.Emitter();
        this.onDidChangeAuthenticationProviders = this.onDidChangeAuthenticationProvidersEmitter.event;
        this.onDidChangeSessionsEmitter = new event_1.Emitter();
        this.onDidChangeSessions = this.onDidChangeSessionsEmitter.event;
        this.proxy = rpc.getProxy(plugin_api_rpc_1.PLUGIN_RPC_CONTEXT.AUTHENTICATION_MAIN);
    }
    AuthenticationExtImpl.prototype.getProviderIds = function () {
        return this.proxy.$getProviderIds();
    };
    Object.defineProperty(AuthenticationExtImpl.prototype, "providerIds", {
        get: function () {
            return this._providerIds;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AuthenticationExtImpl.prototype, "providers", {
        get: function () {
            return Object.freeze(this._providers.slice());
        },
        enumerable: false,
        configurable: true
    });
    AuthenticationExtImpl.prototype.getSession = function (requestingExtension, providerId, scopes, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var extensionName, extensionId;
            return __generator(this, function (_a) {
                extensionName = requestingExtension.model.displayName || requestingExtension.model.name;
                extensionId = requestingExtension.model.id.toLowerCase();
                return [2 /*return*/, this.proxy.$getSession(providerId, scopes, extensionId, extensionName, options)];
            });
        });
    };
    AuthenticationExtImpl.prototype.logout = function (providerId, sessionId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.proxy.$logout(providerId, sessionId)];
            });
        });
    };
    AuthenticationExtImpl.prototype.registerAuthenticationProvider = function (provider) {
        var _this = this;
        if (this.authenticationProviders.get(provider.id)) {
            throw new Error("An authentication provider with id '" + provider.id + "' is already registered.");
        }
        this.authenticationProviders.set(provider.id, provider);
        if (this._providerIds.indexOf(provider.id) === -1) {
            this._providerIds.push(provider.id);
        }
        if (!this._providers.find(function (p) { return p.id === provider.id; })) {
            this._providers.push({
                id: provider.id,
                label: provider.label
            });
        }
        var listener = provider.onDidChangeSessions(function (e) {
            _this.proxy.$updateSessions(provider.id, e);
        });
        this.proxy.$registerAuthenticationProvider(provider.id, provider.label, provider.supportsMultipleAccounts);
        return new types_impl_1.Disposable(function () {
            listener.dispose();
            _this.authenticationProviders.delete(provider.id);
            var index = _this._providerIds.findIndex(function (id) { return id === provider.id; });
            if (index > -1) {
                _this._providerIds.splice(index);
            }
            var i = _this._providers.findIndex(function (p) { return p.id === provider.id; });
            if (i > -1) {
                _this._providers.splice(i);
            }
            _this.proxy.$unregisterAuthenticationProvider(provider.id);
        });
    };
    AuthenticationExtImpl.prototype.$login = function (providerId, scopes) {
        var authProvider = this.authenticationProviders.get(providerId);
        if (authProvider) {
            return Promise.resolve(authProvider.login(scopes));
        }
        throw new Error("Unable to find authentication provider with handle: " + providerId);
    };
    AuthenticationExtImpl.prototype.$logout = function (providerId, sessionId) {
        var authProvider = this.authenticationProviders.get(providerId);
        if (authProvider) {
            return Promise.resolve(authProvider.logout(sessionId));
        }
        throw new Error("Unable to find authentication provider with handle: " + providerId);
    };
    AuthenticationExtImpl.prototype.$getSessions = function (providerId) {
        return __awaiter(this, void 0, void 0, function () {
            var authProvider, sessions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authProvider = this.authenticationProviders.get(providerId);
                        if (!authProvider) return [3 /*break*/, 2];
                        return [4 /*yield*/, authProvider.getSessions()];
                    case 1:
                        sessions = _a.sent();
                        /* Wrap the session object received from the plugin to prevent serialization mismatches
                        e.g. if the plugin object is constructed with the help of getters they won't be serialized:
                        class SessionImpl implements AuthenticationSession {
                            private _id;
                            get id() {
                                return _id;
                            }
                        ...
                        } will translate to JSON as { _id: '<sessionid>' } not { id: '<sessionid>' } */
                        return [2 /*return*/, sessions.map(function (session) { return ({
                                id: session.id,
                                accessToken: session.accessToken,
                                account: { id: session.account.id, label: session.account.label },
                                scopes: session.scopes
                            }); })];
                    case 2: throw new Error("Unable to find authentication provider with handle: " + providerId);
                }
            });
        });
    };
    AuthenticationExtImpl.prototype.$onDidChangeAuthenticationSessions = function (id, label, event) {
        this.onDidChangeSessionsEmitter.fire(__assign({ provider: { id: id, label: label } }, event));
        return Promise.resolve();
    };
    AuthenticationExtImpl.prototype.$onDidChangeAuthenticationProviders = function (added, removed) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                added.forEach(function (id) {
                    if (_this._providers.indexOf(id) === -1) {
                        _this._providers.push(id);
                    }
                });
                removed.forEach(function (p) {
                    var index = _this._providers.findIndex(function (provider) { return provider.id === p.id; });
                    if (index > -1) {
                        _this._providers.splice(index);
                    }
                });
                this.onDidChangeAuthenticationProvidersEmitter.fire({ added: added, removed: removed });
                return [2 /*return*/];
            });
        });
    };
    return AuthenticationExtImpl;
}());
exports.AuthenticationExtImpl = AuthenticationExtImpl;
//# sourceMappingURL=authentication-ext.js.map