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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
exports.readAllowedExtensions = exports.AuthenticationServiceImpl = exports.AuthenticationService = void 0;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// code copied and modified from https://github.com/microsoft/vscode/blob/1.47.3/src/vs/workbench/services/authentication/browser/authenticationService.ts
var inversify_1 = require("inversify");
var event_1 = require("../common/event");
var storage_service_1 = require("../browser/storage-service");
var menu_1 = require("../common/menu");
var command_1 = require("../common/command");
var disposable_1 = require("../common/disposable");
exports.AuthenticationService = Symbol('AuthenticationService');
var AuthenticationServiceImpl = /** @class */ (function () {
    function AuthenticationServiceImpl() {
        this.noAccountsCommand = { id: 'noAccounts' };
        this.signInRequestItems = new Map();
        this.authenticationProviders = new Map();
        this.onDidRegisterAuthenticationProviderEmitter = new event_1.Emitter();
        this.onDidRegisterAuthenticationProvider = this.onDidRegisterAuthenticationProviderEmitter.event;
        this.onDidUnregisterAuthenticationProviderEmitter = new event_1.Emitter();
        this.onDidUnregisterAuthenticationProvider = this.onDidUnregisterAuthenticationProviderEmitter.event;
        this.onDidChangeSessionsEmitter = new event_1.Emitter();
        this.onDidChangeSessions = this.onDidChangeSessionsEmitter.event;
    }
    AuthenticationServiceImpl.prototype.init = function () {
        var _this = this;
        var disposableMap = new Map();
        this.onDidChangeSessions(function (e) { return __awaiter(_this, void 0, void 0, function () {
            var sessions_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(e.event.added.length > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getSessions(e.providerId)];
                    case 1:
                        sessions_1 = _a.sent();
                        sessions_1.forEach(function (session) {
                            if (sessions_1.find(function (s) { return disposableMap.get(s.id); })) {
                                return;
                            }
                            var disposables = new disposable_1.DisposableCollection();
                            var commandId = "account-sign-out-" + e.providerId + "-" + session.id;
                            var command = _this.commands.registerCommand({ id: commandId }, {
                                execute: function () { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        this.signOutOfAccount(e.providerId, session.account.label);
                                        return [2 /*return*/];
                                    });
                                }); }
                            });
                            var subSubMenuPath = __spread(menu_1.ACCOUNTS_SUBMENU, ['account-sub-menu']);
                            _this.menus.registerSubmenu(subSubMenuPath, session.account.label + " (" + e.label + ")");
                            var menuAction = _this.menus.registerMenuAction(subSubMenuPath, {
                                label: 'Sign Out',
                                commandId: commandId
                            });
                            disposables.push(menuAction);
                            disposables.push(command);
                            disposableMap.set(session.id, disposables);
                        });
                        _a.label = 2;
                    case 2:
                        if (e.event.removed.length > 0) {
                            e.event.removed.forEach(function (removed) {
                                var toDispose = disposableMap.get(removed);
                                if (toDispose) {
                                    toDispose.dispose();
                                    disposableMap.delete(removed);
                                }
                            });
                        }
                        return [2 /*return*/];
                }
            });
        }); });
        this.commands.registerCommand(this.noAccountsCommand, {
            execute: function () { },
            isEnabled: function () { return false; }
        });
    };
    AuthenticationServiceImpl.prototype.getProviderIds = function () {
        var providerIds = [];
        this.authenticationProviders.forEach(function (provider) {
            providerIds.push(provider.id);
        });
        return providerIds;
    };
    AuthenticationServiceImpl.prototype.isAuthenticationProviderRegistered = function (id) {
        return this.authenticationProviders.has(id);
    };
    AuthenticationServiceImpl.prototype.updateAccountsMenuItem = function () {
        var _this = this;
        var hasSession = false;
        this.authenticationProviders.forEach(function (provider) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                hasSession = hasSession || provider.hasSessions();
                return [2 /*return*/];
            });
        }); });
        if (hasSession && this.noAccountsMenuItem) {
            this.noAccountsMenuItem.dispose();
            this.noAccountsMenuItem = undefined;
        }
        if (!hasSession && !this.noAccountsMenuItem) {
            this.noAccountsMenuItem = this.menus.registerMenuAction(menu_1.ACCOUNTS_MENU, {
                label: 'You are not signed in to any accounts',
                order: '0',
                commandId: this.noAccountsCommand.id
            });
        }
    };
    AuthenticationServiceImpl.prototype.registerAuthenticationProvider = function (id, authenticationProvider) {
        if (this.authenticationProviders.get(id)) {
            throw new Error("An authentication provider with id '" + id + "' is already registered.");
        }
        this.authenticationProviders.set(id, authenticationProvider);
        this.onDidRegisterAuthenticationProviderEmitter.fire({ id: id, label: authenticationProvider.label });
        this.updateAccountsMenuItem();
        console.log("An authentication provider with id '" + id + "' was registered.");
    };
    AuthenticationServiceImpl.prototype.unregisterAuthenticationProvider = function (id) {
        var provider = this.authenticationProviders.get(id);
        if (provider) {
            this.authenticationProviders.delete(id);
            this.onDidUnregisterAuthenticationProviderEmitter.fire({ id: id, label: provider.label });
            this.updateAccountsMenuItem();
        }
        else {
            console.error("Failed to unregister an authentication provider. A provider with id '" + id + "' was not found.");
        }
    };
    AuthenticationServiceImpl.prototype.updateSessions = function (id, event) {
        return __awaiter(this, void 0, void 0, function () {
            var provider;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        provider = this.authenticationProviders.get(id);
                        if (!provider) return [3 /*break*/, 4];
                        return [4 /*yield*/, provider.updateSessionItems(event)];
                    case 1:
                        _a.sent();
                        this.onDidChangeSessionsEmitter.fire({ providerId: id, label: provider.label, event: event });
                        this.updateAccountsMenuItem();
                        if (!event.added) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.updateNewSessionRequests(provider)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        console.error("Failed to update an authentication session. An authentication provider with id '" + id + "' was not found.");
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AuthenticationServiceImpl.prototype.updateNewSessionRequests = function (provider) {
        return __awaiter(this, void 0, void 0, function () {
            var existingRequestsForProvider, sessions;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        existingRequestsForProvider = this.signInRequestItems.get(provider.id);
                        if (!existingRequestsForProvider) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, provider.getSessions()];
                    case 1:
                        sessions = _a.sent();
                        Object.keys(existingRequestsForProvider).forEach(function (requestedScopes) {
                            if (sessions.some(function (session) { return session.scopes.slice().sort().join('') === requestedScopes; })) {
                                var sessionRequest = existingRequestsForProvider[requestedScopes];
                                if (sessionRequest) {
                                    sessionRequest.disposables.forEach(function (item) { return item.dispose(); });
                                }
                                delete existingRequestsForProvider[requestedScopes];
                                if (Object.keys(existingRequestsForProvider).length === 0) {
                                    _this.signInRequestItems.delete(provider.id);
                                }
                                else {
                                    _this.signInRequestItems.set(provider.id, existingRequestsForProvider);
                                }
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthenticationServiceImpl.prototype.requestNewSession = function (providerId, scopes, extensionId, extensionName) {
        return __awaiter(this, void 0, void 0, function () {
            var provider, providerRequests, scopesList, extensionHasExistingRequest, menuItem, signInCommand, existingRequest;
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        provider = this.authenticationProviders.get(providerId);
                        if (!!provider) return [3 /*break*/, 2];
                        // Activate has already been called for the authentication provider, but it cannot block on registering itself
                        // since this is sync and returns a disposable. So, wait for registration event to fire that indicates the
                        // provider is now in the map.
                        return [4 /*yield*/, new Promise(function (resolve, _) {
                                _this.onDidRegisterAuthenticationProvider(function (e) {
                                    if (e.id === providerId) {
                                        provider = _this.authenticationProviders.get(providerId);
                                        resolve();
                                    }
                                });
                            })];
                    case 1:
                        // Activate has already been called for the authentication provider, but it cannot block on registering itself
                        // since this is sync and returns a disposable. So, wait for registration event to fire that indicates the
                        // provider is now in the map.
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        if (provider) {
                            providerRequests = this.signInRequestItems.get(providerId);
                            scopesList = scopes.sort().join('');
                            extensionHasExistingRequest = providerRequests
                                && providerRequests[scopesList]
                                && providerRequests[scopesList].requestingExtensionIds.indexOf(extensionId) > -1;
                            if (extensionHasExistingRequest) {
                                return [2 /*return*/];
                            }
                            menuItem = this.menus.registerMenuAction(menu_1.ACCOUNTS_SUBMENU, {
                                label: "Sign in to use " + extensionName + " (1)",
                                order: '1',
                                commandId: extensionId + "signIn",
                            });
                            signInCommand = this.commands.registerCommand({ id: extensionId + "signIn" }, {
                                execute: function () { return __awaiter(_this, void 0, void 0, function () {
                                    var session, allowList;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, this.login(providerId, scopes)];
                                            case 1:
                                                session = _a.sent();
                                                return [4 /*yield*/, readAllowedExtensions(this.storageService, providerId, session.account.label)];
                                            case 2:
                                                allowList = _a.sent();
                                                if (!allowList.find(function (allowed) { return allowed.id === extensionId; })) {
                                                    allowList.push({ id: extensionId, name: extensionName });
                                                    this.storageService.setData("authentication-trusted-extensions-" + providerId + "-" + session.account.label, JSON.stringify(allowList));
                                                }
                                                // And also set it as the preferred account for the extension
                                                this.storageService.setData("authentication-session-" + extensionName + "-" + providerId, session.id);
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }
                            });
                            if (providerRequests) {
                                existingRequest = providerRequests[scopesList] || { disposables: [], requestingExtensionIds: [] };
                                providerRequests[scopesList] = {
                                    disposables: __spread(existingRequest.disposables, [menuItem, signInCommand]),
                                    requestingExtensionIds: __spread(existingRequest.requestingExtensionIds, [extensionId])
                                };
                                this.signInRequestItems.set(providerId, providerRequests);
                            }
                            else {
                                this.signInRequestItems.set(providerId, (_a = {},
                                    _a[scopesList] = {
                                        disposables: [menuItem, signInCommand],
                                        requestingExtensionIds: [extensionId]
                                    },
                                    _a));
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthenticationServiceImpl.prototype.getLabel = function (id) {
        var authProvider = this.authenticationProviders.get(id);
        if (authProvider) {
            return authProvider.label;
        }
        else {
            throw new Error("No authentication provider '" + id + "' is currently registered.");
        }
    };
    AuthenticationServiceImpl.prototype.supportsMultipleAccounts = function (id) {
        var authProvider = this.authenticationProviders.get(id);
        if (authProvider) {
            return authProvider.supportsMultipleAccounts;
        }
        else {
            throw new Error("No authentication provider '" + id + "' is currently registered.");
        }
    };
    AuthenticationServiceImpl.prototype.getSessions = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var authProvider;
            return __generator(this, function (_a) {
                authProvider = this.authenticationProviders.get(id);
                if (authProvider) {
                    return [2 /*return*/, authProvider.getSessions()];
                }
                else {
                    throw new Error("No authentication provider '" + id + "' is currently registered.");
                }
                return [2 /*return*/];
            });
        });
    };
    AuthenticationServiceImpl.prototype.login = function (id, scopes) {
        return __awaiter(this, void 0, void 0, function () {
            var authProvider;
            return __generator(this, function (_a) {
                authProvider = this.authenticationProviders.get(id);
                if (authProvider) {
                    return [2 /*return*/, authProvider.login(scopes)];
                }
                else {
                    throw new Error("No authentication provider '" + id + "' is currently registered.");
                }
                return [2 /*return*/];
            });
        });
    };
    AuthenticationServiceImpl.prototype.logout = function (id, sessionId) {
        return __awaiter(this, void 0, void 0, function () {
            var authProvider;
            return __generator(this, function (_a) {
                authProvider = this.authenticationProviders.get(id);
                if (authProvider) {
                    return [2 /*return*/, authProvider.logout(sessionId)];
                }
                else {
                    throw new Error("No authentication provider '" + id + "' is currently registered.");
                }
                return [2 /*return*/];
            });
        });
    };
    AuthenticationServiceImpl.prototype.signOutOfAccount = function (id, accountName) {
        return __awaiter(this, void 0, void 0, function () {
            var authProvider;
            return __generator(this, function (_a) {
                authProvider = this.authenticationProviders.get(id);
                if (authProvider) {
                    return [2 /*return*/, authProvider.signOut(accountName)];
                }
                else {
                    throw new Error("No authentication provider '" + id + "' is currently registered.");
                }
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        inversify_1.inject(menu_1.MenuModelRegistry),
        __metadata("design:type", menu_1.MenuModelRegistry)
    ], AuthenticationServiceImpl.prototype, "menus", void 0);
    __decorate([
        inversify_1.inject(command_1.CommandRegistry),
        __metadata("design:type", command_1.CommandRegistry)
    ], AuthenticationServiceImpl.prototype, "commands", void 0);
    __decorate([
        inversify_1.inject(storage_service_1.StorageService),
        __metadata("design:type", Object)
    ], AuthenticationServiceImpl.prototype, "storageService", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], AuthenticationServiceImpl.prototype, "init", null);
    AuthenticationServiceImpl = __decorate([
        inversify_1.injectable()
    ], AuthenticationServiceImpl);
    return AuthenticationServiceImpl;
}());
exports.AuthenticationServiceImpl = AuthenticationServiceImpl;
function readAllowedExtensions(storageService, providerId, accountName) {
    return __awaiter(this, void 0, void 0, function () {
        var trustedExtensions, trustedExtensionSrc, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    trustedExtensions = [];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, storageService.getData("authentication-trusted-extensions-" + providerId + "-" + accountName)];
                case 2:
                    trustedExtensionSrc = _a.sent();
                    if (trustedExtensionSrc) {
                        trustedExtensions = JSON.parse(trustedExtensionSrc);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.error(err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/, trustedExtensions];
            }
        });
    });
}
exports.readAllowedExtensions = readAllowedExtensions;
//# sourceMappingURL=authentication-service.js.map