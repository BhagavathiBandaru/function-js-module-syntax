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
exports.AuthenticationProviderImpl = exports.AuthenticationMainImpl = void 0;
var plugin_api_rpc_1 = require("../../common/plugin-api-rpc");
var message_service_1 = require("@theia/core/lib/common/message-service");
var browser_1 = require("@theia/core/lib/browser");
var authentication_service_1 = require("@theia/core/lib/browser/authentication-service");
var quick_pick_service_1 = require("@theia/core/lib/common/quick-pick-service");
var AuthenticationMainImpl = /** @class */ (function () {
    function AuthenticationMainImpl(rpc, container) {
        var _this = this;
        this.proxy = rpc.getProxy(plugin_api_rpc_1.MAIN_RPC_CONTEXT.AUTHENTICATION_EXT);
        this.messageService = container.get(message_service_1.MessageService);
        this.storageService = container.get(browser_1.StorageService);
        this.authenticationService = container.get(authentication_service_1.AuthenticationService);
        this.quickPickService = container.get(quick_pick_service_1.QuickPickService);
        this.authenticationService.onDidChangeSessions(function (e) {
            _this.proxy.$onDidChangeAuthenticationSessions(e.providerId, e.label, e.event);
        });
        this.authenticationService.onDidRegisterAuthenticationProvider(function (info) {
            _this.proxy.$onDidChangeAuthenticationProviders([info], []);
        });
        this.authenticationService.onDidUnregisterAuthenticationProvider(function (providerId) {
            _this.proxy.$onDidChangeAuthenticationProviders([], [providerId]);
        });
    }
    AuthenticationMainImpl.prototype.$getProviderIds = function () {
        return Promise.resolve(this.authenticationService.getProviderIds());
    };
    AuthenticationMainImpl.prototype.$registerAuthenticationProvider = function (id, label, supportsMultipleAccounts) {
        return __awaiter(this, void 0, void 0, function () {
            var provider;
            return __generator(this, function (_a) {
                provider = new AuthenticationProviderImpl(this.proxy, id, label, supportsMultipleAccounts, this.storageService, this.messageService);
                this.authenticationService.registerAuthenticationProvider(id, provider);
                return [2 /*return*/];
            });
        });
    };
    AuthenticationMainImpl.prototype.$unregisterAuthenticationProvider = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.authenticationService.unregisterAuthenticationProvider(id);
                return [2 /*return*/];
            });
        });
    };
    AuthenticationMainImpl.prototype.$updateSessions = function (id, event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.authenticationService.updateSessions(id, event);
                return [2 /*return*/];
            });
        });
    };
    AuthenticationMainImpl.prototype.$logout = function (providerId, sessionId) {
        return this.authenticationService.logout(providerId, sessionId);
    };
    AuthenticationMainImpl.prototype.requestNewSession = function (providerId, scopes, extensionId, extensionName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.authenticationService.requestNewSession(providerId, scopes, extensionId, extensionName)];
            });
        });
    };
    AuthenticationMainImpl.prototype.$getSession = function (providerId, scopes, extensionId, extensionName, options) {
        return __awaiter(this, void 0, void 0, function () {
            var orderedScopes, sessions, label, session, allowed, selected_1, isAllowed, session;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderedScopes = scopes.sort().join(' ');
                        return [4 /*yield*/, this.authenticationService.getSessions(providerId)];
                    case 1:
                        sessions = (_a.sent()).filter(function (session) { return session.scopes.slice().sort().join(' ') === orderedScopes; });
                        label = this.authenticationService.getLabel(providerId);
                        if (!sessions.length) return [3 /*break*/, 5];
                        if (!!this.authenticationService.supportsMultipleAccounts(providerId)) return [3 /*break*/, 3];
                        session = sessions[0];
                        return [4 /*yield*/, this.getSessionsPrompt(providerId, session.account.label, label, extensionId, extensionName)];
                    case 2:
                        allowed = _a.sent();
                        if (allowed) {
                            return [2 /*return*/, session];
                        }
                        else {
                            throw new Error('User did not consent to login.');
                        }
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this.selectSession(providerId, label, extensionId, extensionName, sessions, scopes, !!options.clearSessionPreference)];
                    case 4:
                        selected_1 = _a.sent();
                        return [2 /*return*/, sessions.find(function (session) { return session.id === selected_1.id; })];
                    case 5:
                        if (!options.createIfNone) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.loginPrompt(label, extensionName)];
                    case 6:
                        isAllowed = _a.sent();
                        if (!isAllowed) {
                            throw new Error('User did not consent to login.');
                        }
                        return [4 /*yield*/, this.authenticationService.login(providerId, scopes)];
                    case 7:
                        session = _a.sent();
                        return [4 /*yield*/, this.setTrustedExtensionAndAccountPreference(providerId, session.account.label, extensionId, extensionName, session.id)];
                    case 8:
                        _a.sent();
                        return [2 /*return*/, session];
                    case 9: return [4 /*yield*/, this.requestNewSession(providerId, scopes, extensionId, extensionName)];
                    case 10:
                        _a.sent();
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    AuthenticationMainImpl.prototype.selectSession = function (providerId, providerName, extensionId, extensionName, potentialSessions, scopes, clearSessionPreference) {
        return __awaiter(this, void 0, void 0, function () {
            var existingSessionPreference_1, matchingSession, allowed;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!potentialSessions.length) {
                            throw new Error('No potential sessions found');
                        }
                        if (!clearSessionPreference) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.storageService.setData("authentication-session-" + extensionName + "-" + providerId, undefined)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 2: return [4 /*yield*/, this.storageService.getData("authentication-session-" + extensionName + "-" + providerId)];
                    case 3:
                        existingSessionPreference_1 = _a.sent();
                        if (!existingSessionPreference_1) return [3 /*break*/, 5];
                        matchingSession = potentialSessions.find(function (session) { return session.id === existingSessionPreference_1; });
                        if (!matchingSession) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.getSessionsPrompt(providerId, matchingSession.account.label, providerName, extensionId, extensionName)];
                    case 4:
                        allowed = _a.sent();
                        if (allowed) {
                            return [2 /*return*/, matchingSession];
                        }
                        _a.label = 5;
                    case 5: return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                            var items, selected, session, _a, accountName, allowList;
                            var _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        items = potentialSessions.map(function (session) { return ({
                                            label: session.account.label,
                                            value: { session: session }
                                        }); });
                                        items.push({
                                            label: 'Sign in to another account',
                                            value: { session: undefined }
                                        });
                                        return [4 /*yield*/, this.quickPickService.show(items, {
                                                title: "The extension '" + extensionName + "' wants to access a " + providerName + " account",
                                                ignoreFocusOut: true
                                            })];
                                    case 1:
                                        selected = _c.sent();
                                        if (!selected) return [3 /*break*/, 6];
                                        if (!((_b = selected.session) !== null && _b !== void 0)) return [3 /*break*/, 2];
                                        _a = _b;
                                        return [3 /*break*/, 4];
                                    case 2: return [4 /*yield*/, this.authenticationService.login(providerId, scopes)];
                                    case 3:
                                        _a = _c.sent();
                                        _c.label = 4;
                                    case 4:
                                        session = _a;
                                        accountName = session.account.label;
                                        return [4 /*yield*/, authentication_service_1.readAllowedExtensions(this.storageService, providerId, accountName)];
                                    case 5:
                                        allowList = _c.sent();
                                        if (!allowList.find(function (allowed) { return allowed.id === extensionId; })) {
                                            allowList.push({ id: extensionId, name: extensionName });
                                            this.storageService.setData("authentication-trusted-extensions-" + providerId + "-" + accountName, JSON.stringify(allowList));
                                        }
                                        this.storageService.setData("authentication-session-" + extensionName + "-" + providerId, session.id);
                                        resolve(session);
                                        return [3 /*break*/, 7];
                                    case 6:
                                        reject('User did not consent to account access');
                                        _c.label = 7;
                                    case 7: return [2 /*return*/];
                                }
                            });
                        }); })];
                }
            });
        });
    };
    AuthenticationMainImpl.prototype.getSessionsPrompt = function (providerId, accountName, providerName, extensionId, extensionName) {
        return __awaiter(this, void 0, void 0, function () {
            var allowList, extensionData, choice, allow;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, authentication_service_1.readAllowedExtensions(this.storageService, providerId, accountName)];
                    case 1:
                        allowList = _a.sent();
                        extensionData = allowList.find(function (extension) { return extension.id === extensionId; });
                        if (extensionData) {
                            addAccountUsage(this.storageService, providerId, accountName, extensionId, extensionName);
                            return [2 /*return*/, true];
                        }
                        return [4 /*yield*/, this.messageService.info("The extension '" + extensionName + "' wants to access the " + providerName + " account '" + accountName + "'.", 'Allow', 'Cancel')];
                    case 2:
                        choice = _a.sent();
                        allow = choice === 'Allow';
                        if (!allow) return [3 /*break*/, 4];
                        return [4 /*yield*/, addAccountUsage(this.storageService, providerId, accountName, extensionId, extensionName)];
                    case 3:
                        _a.sent();
                        allowList.push({ id: extensionId, name: extensionName });
                        this.storageService.setData("authentication-trusted-extensions-" + providerId + "-" + accountName, JSON.stringify(allowList));
                        _a.label = 4;
                    case 4: return [2 /*return*/, allow];
                }
            });
        });
    };
    AuthenticationMainImpl.prototype.loginPrompt = function (providerName, extensionName) {
        return __awaiter(this, void 0, void 0, function () {
            var choice;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageService.info("The extension '" + extensionName + "' wants to sign in using " + providerName + ".", 'Allow', 'Cancel')];
                    case 1:
                        choice = _a.sent();
                        return [2 /*return*/, choice === 'Allow'];
                }
            });
        });
    };
    AuthenticationMainImpl.prototype.setTrustedExtensionAndAccountPreference = function (providerId, accountName, extensionId, extensionName, sessionId) {
        return __awaiter(this, void 0, void 0, function () {
            var allowList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, authentication_service_1.readAllowedExtensions(this.storageService, providerId, accountName)];
                    case 1:
                        allowList = _a.sent();
                        if (!allowList.find(function (allowed) { return allowed.id === extensionId; })) {
                            allowList.push({ id: extensionId, name: extensionName });
                            this.storageService.setData("authentication-trusted-extensions-" + providerId + "-" + accountName, JSON.stringify(allowList));
                        }
                        this.storageService.setData("authentication-session-" + extensionName + "-" + providerId, sessionId);
                        return [2 /*return*/];
                }
            });
        });
    };
    return AuthenticationMainImpl;
}());
exports.AuthenticationMainImpl = AuthenticationMainImpl;
function addAccountUsage(storageService, providerId, accountName, extensionId, extensionName) {
    return __awaiter(this, void 0, void 0, function () {
        var accountKey, usages, existingUsageIndex;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    accountKey = "authentication-" + providerId + "-" + accountName + "-usages";
                    return [4 /*yield*/, readAccountUsages(storageService, providerId, accountName)];
                case 1:
                    usages = _a.sent();
                    existingUsageIndex = usages.findIndex(function (usage) { return usage.extensionId === extensionId; });
                    if (existingUsageIndex > -1) {
                        usages.splice(existingUsageIndex, 1, {
                            extensionId: extensionId,
                            extensionName: extensionName,
                            lastUsed: Date.now()
                        });
                    }
                    else {
                        usages.push({
                            extensionId: extensionId,
                            extensionName: extensionName,
                            lastUsed: Date.now()
                        });
                    }
                    return [4 /*yield*/, storageService.setData(accountKey, JSON.stringify(usages))];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
var AuthenticationProviderImpl = /** @class */ (function () {
    function AuthenticationProviderImpl(proxy, id, label, supportsMultipleAccounts, storageService, messageService) {
        this.proxy = proxy;
        this.id = id;
        this.label = label;
        this.supportsMultipleAccounts = supportsMultipleAccounts;
        this.storageService = storageService;
        this.messageService = messageService;
        this.accounts = new Map(); // Map account name to session ids
        this.sessions = new Map(); // Map account id to name
    }
    AuthenticationProviderImpl.prototype.hasSessions = function () {
        return !!this.sessions.size;
    };
    AuthenticationProviderImpl.prototype.registerSession = function (session) {
        this.sessions.set(session.id, session.account.label);
        var existingSessionsForAccount = this.accounts.get(session.account.label);
        if (existingSessionsForAccount) {
            this.accounts.set(session.account.label, existingSessionsForAccount.concat(session.id));
            return;
        }
        else {
            this.accounts.set(session.account.label, [session.id]);
        }
    };
    AuthenticationProviderImpl.prototype.signOut = function (accountName) {
        return __awaiter(this, void 0, void 0, function () {
            var accountUsages, sessionsForAccount, result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, readAccountUsages(this.storageService, this.id, accountName)];
                    case 1:
                        accountUsages = _a.sent();
                        sessionsForAccount = this.accounts.get(accountName);
                        return [4 /*yield*/, this.messageService.info(accountUsages.length ? "The account " + accountName + " has been used by: \n        " + accountUsages.map(function (usage) { return usage.extensionName; }).join(', ') + ". Sign out of these features?" : "Sign out of " + accountName + "?", 'Yes')];
                    case 2:
                        result = _a.sent();
                        if (result && result === 'Yes' && sessionsForAccount) {
                            sessionsForAccount.forEach(function (sessionId) { return _this.logout(sessionId); });
                            removeAccountUsage(this.storageService, this.id, accountName);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthenticationProviderImpl.prototype.getSessions = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.proxy.$getSessions(this.id)];
            });
        });
    };
    AuthenticationProviderImpl.prototype.updateSessionItems = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var added, removed, session, addedSessions;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        added = event.added, removed = event.removed;
                        return [4 /*yield*/, this.proxy.$getSessions(this.id)];
                    case 1:
                        session = _a.sent();
                        addedSessions = session.filter(function (s) { return added.some(function (id) { return id === s.id; }); });
                        removed.forEach(function (sessionId) {
                            var accountName = _this.sessions.get(sessionId);
                            if (accountName) {
                                _this.sessions.delete(sessionId);
                                var sessionsForAccount = _this.accounts.get(accountName) || [];
                                var sessionIndex = sessionsForAccount.indexOf(sessionId);
                                sessionsForAccount.splice(sessionIndex);
                                if (!sessionsForAccount.length) {
                                    _this.accounts.delete(accountName);
                                }
                            }
                        });
                        addedSessions.forEach(function (s) { return _this.registerSession(s); });
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthenticationProviderImpl.prototype.login = function (scopes) {
        return this.proxy.$login(this.id, scopes);
    };
    AuthenticationProviderImpl.prototype.logout = function (sessionId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.proxy.$logout(this.id, sessionId)];
                    case 1:
                        _a.sent();
                        this.messageService.info('Successfully signed out.');
                        return [2 /*return*/];
                }
            });
        });
    };
    return AuthenticationProviderImpl;
}());
exports.AuthenticationProviderImpl = AuthenticationProviderImpl;
function readAccountUsages(storageService, providerId, accountName) {
    return __awaiter(this, void 0, void 0, function () {
        var accountKey, storedUsages, usages;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    accountKey = "authentication-" + providerId + "-" + accountName + "-usages";
                    return [4 /*yield*/, storageService.getData(accountKey)];
                case 1:
                    storedUsages = _a.sent();
                    usages = [];
                    if (storedUsages) {
                        try {
                            usages = JSON.parse(storedUsages);
                        }
                        catch (e) {
                            console.log(e);
                        }
                    }
                    return [2 /*return*/, usages];
            }
        });
    });
}
function removeAccountUsage(storageService, providerId, accountName) {
    var accountKey = "authentication-" + providerId + "-" + accountName + "-usages";
    storageService.setData(accountKey, undefined);
}
//# sourceMappingURL=authentication-main.js.map