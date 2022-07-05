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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.FileSystemWatcherServiceDispatcher = void 0;
var inversify_1 = require("inversify");
/**
 * This component routes watch events to the right clients.
 */
var FileSystemWatcherServiceDispatcher = /** @class */ (function () {
    function FileSystemWatcherServiceDispatcher() {
        /**
         * Mapping of `clientId` to actual clients.
         */
        this.clients = new Map();
    }
    FileSystemWatcherServiceDispatcher.prototype.onDidFilesChanged = function (event) {
        var e_1, _a;
        try {
            for (var _b = __values(this.iterRegisteredClients(event.clients)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var client = _c.value;
                client.onDidFilesChanged(event);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    FileSystemWatcherServiceDispatcher.prototype.onError = function (event) {
        var e_2, _a;
        try {
            for (var _b = __values(this.iterRegisteredClients(event.clients)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var client = _c.value;
                client.onError();
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    /**
     * Listen for events targeted at `clientId`.
     */
    FileSystemWatcherServiceDispatcher.prototype.registerClient = function (clientId, client) {
        if (this.clients.has(clientId)) {
            console.warn("FileSystemWatcherServer2Dispatcher: a client was already registered! clientId=" + clientId);
        }
        this.clients.set(clientId, client);
    };
    FileSystemWatcherServiceDispatcher.prototype.unregisterClient = function (clientId) {
        if (!this.clients.has(clientId)) {
            console.warn("FileSystemWatcherServer2Dispatcher: tried to remove unknown client! clientId=" + clientId);
        }
        this.clients.delete(clientId);
    };
    /**
     * Only yield registered clients for the given `clientIds`.
     *
     * If clientIds is empty, will return all clients.
     */
    FileSystemWatcherServiceDispatcher.prototype.iterRegisteredClients = function (clientIds) {
        var clientIds_1, clientIds_1_1, clientId, client, e_3_1;
        var e_3, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(!Array.isArray(clientIds) || clientIds.length === 0)) return [3 /*break*/, 2];
                    // If we receive an event targeted to "no client",
                    // interpret that as notifying all clients:
                    return [5 /*yield**/, __values(this.clients.values())];
                case 1:
                    // If we receive an event targeted to "no client",
                    // interpret that as notifying all clients:
                    _b.sent();
                    return [3 /*break*/, 9];
                case 2:
                    _b.trys.push([2, 7, 8, 9]);
                    clientIds_1 = __values(clientIds), clientIds_1_1 = clientIds_1.next();
                    _b.label = 3;
                case 3:
                    if (!!clientIds_1_1.done) return [3 /*break*/, 6];
                    clientId = clientIds_1_1.value;
                    client = this.clients.get(clientId);
                    if (!(client !== undefined)) return [3 /*break*/, 5];
                    return [4 /*yield*/, client];
                case 4:
                    _b.sent();
                    _b.label = 5;
                case 5:
                    clientIds_1_1 = clientIds_1.next();
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 9];
                case 7:
                    e_3_1 = _b.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 9];
                case 8:
                    try {
                        if (clientIds_1_1 && !clientIds_1_1.done && (_a = clientIds_1.return)) _a.call(clientIds_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                    return [7 /*endfinally*/];
                case 9: return [2 /*return*/];
            }
        });
    };
    FileSystemWatcherServiceDispatcher = __decorate([
        inversify_1.injectable()
    ], FileSystemWatcherServiceDispatcher);
    return FileSystemWatcherServiceDispatcher;
}());
exports.FileSystemWatcherServiceDispatcher = FileSystemWatcherServiceDispatcher;
//# sourceMappingURL=filesystem-watcher-dispatcher.js.map