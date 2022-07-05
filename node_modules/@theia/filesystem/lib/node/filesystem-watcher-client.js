"use strict";
/********************************************************************************
 * Copyright (C) 2017 TypeFox and others.
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
exports.FileSystemWatcherServerClient = exports.NSFW_WATCHER = void 0;
var inversify_1 = require("inversify");
var filesystem_watcher_protocol_1 = require("../common/filesystem-watcher-protocol");
var filesystem_watcher_dispatcher_1 = require("./filesystem-watcher-dispatcher");
exports.NSFW_WATCHER = 'nsfw-watcher';
/**
 * Wraps the NSFW singleton service for each frontend.
 */
var FileSystemWatcherServerClient = /** @class */ (function () {
    function FileSystemWatcherServerClient() {
        /**
         * Track allocated watcherIds to de-allocate on disposal.
         */
        this.watcherIds = new Set();
        /**
         * @todo make this number precisely map to one specific frontend.
         */
        this.clientId = FileSystemWatcherServerClient_1.clientIdSequence++;
    }
    FileSystemWatcherServerClient_1 = FileSystemWatcherServerClient;
    FileSystemWatcherServerClient.prototype.watchFileChanges = function (uri, options) {
        return __awaiter(this, void 0, void 0, function () {
            var watcherId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.watcherService.watchFileChanges(this.clientId, uri, options)];
                    case 1:
                        watcherId = _a.sent();
                        this.watcherIds.add(watcherId);
                        return [2 /*return*/, watcherId];
                }
            });
        });
    };
    FileSystemWatcherServerClient.prototype.unwatchFileChanges = function (watcherId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.watcherIds.delete(watcherId);
                return [2 /*return*/, this.watcherService.unwatchFileChanges(watcherId)];
            });
        });
    };
    FileSystemWatcherServerClient.prototype.setClient = function (client) {
        if (client !== undefined) {
            this.watcherDispatcher.registerClient(this.clientId, client);
        }
        else {
            this.watcherDispatcher.unregisterClient(this.clientId);
        }
    };
    FileSystemWatcherServerClient.prototype.dispose = function () {
        var e_1, _a;
        this.setClient(undefined);
        try {
            for (var _b = __values(this.watcherIds), _c = _b.next(); !_c.done; _c = _b.next()) {
                var watcherId = _c.value;
                this.unwatchFileChanges(watcherId);
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
    var FileSystemWatcherServerClient_1;
    FileSystemWatcherServerClient.clientIdSequence = 0;
    __decorate([
        inversify_1.inject(filesystem_watcher_dispatcher_1.FileSystemWatcherServiceDispatcher),
        __metadata("design:type", filesystem_watcher_dispatcher_1.FileSystemWatcherServiceDispatcher)
    ], FileSystemWatcherServerClient.prototype, "watcherDispatcher", void 0);
    __decorate([
        inversify_1.inject(filesystem_watcher_protocol_1.FileSystemWatcherService),
        __metadata("design:type", Object)
    ], FileSystemWatcherServerClient.prototype, "watcherService", void 0);
    FileSystemWatcherServerClient = FileSystemWatcherServerClient_1 = __decorate([
        inversify_1.injectable()
    ], FileSystemWatcherServerClient);
    return FileSystemWatcherServerClient;
}());
exports.FileSystemWatcherServerClient = FileSystemWatcherServerClient;
//# sourceMappingURL=filesystem-watcher-client.js.map