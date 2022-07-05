"use strict";
/********************************************************************************
 * Copyright (C) 2018-2020 Red Hat, Inc. and others.
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
exports.EnvVariablesServerImpl = void 0;
var path_1 = require("path");
var os_1 = require("os");
var inversify_1 = require("inversify");
var drivelist = require("drivelist");
var os_2 = require("../../common/os");
var file_uri_1 = require("../file-uri");
var EnvVariablesServerImpl = /** @class */ (function () {
    function EnvVariablesServerImpl() {
        var _this = this;
        this.envs = {};
        this.homeDirUri = file_uri_1.FileUri.create(os_1.homedir()).toString();
        this.configDirUri = this.createConfigDirUri();
        this.configDirUri.then(function (configDirUri) { return console.log("Configuration directory URI: '" + configDirUri + "'"); });
        var prEnv = process.env;
        Object.keys(prEnv).forEach(function (key) {
            var keyName = key;
            if (os_2.isWindows) {
                keyName = key.toLowerCase();
            }
            _this.envs[keyName] = { 'name': keyName, 'value': prEnv[key] };
        });
    }
    EnvVariablesServerImpl.prototype.createConfigDirUri = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, file_uri_1.FileUri.create(process.env.THEIA_CONFIG_DIR || path_1.join(os_1.homedir(), '.theia')).toString()];
            });
        });
    };
    EnvVariablesServerImpl.prototype.getExecPath = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, process.execPath];
            });
        });
    };
    EnvVariablesServerImpl.prototype.getVariables = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, Object.keys(this.envs).map(function (key) { return _this.envs[key]; })];
            });
        });
    };
    EnvVariablesServerImpl.prototype.getValue = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (os_2.isWindows) {
                    key = key.toLowerCase();
                }
                return [2 /*return*/, this.envs[key]];
            });
        });
    };
    EnvVariablesServerImpl.prototype.getConfigDirUri = function () {
        return this.configDirUri;
    };
    EnvVariablesServerImpl.prototype.getHomeDirUri = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.homeDirUri];
            });
        });
    };
    EnvVariablesServerImpl.prototype.getDrives = function () {
        return __awaiter(this, void 0, void 0, function () {
            var uris, drives, drives_1, drives_1_1, drive, _a, _b, mountpoint;
            var e_1, _c, e_2, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        uris = [];
                        return [4 /*yield*/, drivelist.list()];
                    case 1:
                        drives = _e.sent();
                        try {
                            for (drives_1 = __values(drives), drives_1_1 = drives_1.next(); !drives_1_1.done; drives_1_1 = drives_1.next()) {
                                drive = drives_1_1.value;
                                try {
                                    for (_a = (e_2 = void 0, __values(drive.mountpoints)), _b = _a.next(); !_b.done; _b = _a.next()) {
                                        mountpoint = _b.value;
                                        if (this.filterHiddenPartitions(mountpoint.path)) {
                                            uris.push(file_uri_1.FileUri.create(mountpoint.path).toString());
                                        }
                                    }
                                }
                                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                                finally {
                                    try {
                                        if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                                    }
                                    finally { if (e_2) throw e_2.error; }
                                }
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (drives_1_1 && !drives_1_1.done && (_c = drives_1.return)) _c.call(drives_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        return [2 /*return*/, uris];
                }
            });
        });
    };
    /**
     * Filters hidden and system partitions.
     */
    EnvVariablesServerImpl.prototype.filterHiddenPartitions = function (path) {
        // OS X: This is your sleep-image. When your Mac goes to sleep it writes the contents of its memory to the hard disk. (https://bit.ly/2R6cztl)
        if (path === '/private/var/vm') {
            return false;
        }
        // Ubuntu: This system partition is simply the boot partition created when the computers mother board runs UEFI rather than BIOS. (https://bit.ly/2N5duHr)
        if (path === '/boot/efi') {
            return false;
        }
        return true;
    };
    EnvVariablesServerImpl = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], EnvVariablesServerImpl);
    return EnvVariablesServerImpl;
}());
exports.EnvVariablesServerImpl = EnvVariablesServerImpl;
//# sourceMappingURL=env-variables-server.js.map