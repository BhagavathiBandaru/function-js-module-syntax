"use strict";
/********************************************************************************
 * Copyright (C) 2018 Red Hat, Inc. and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginPathsServiceImpl = void 0;
var inversify_1 = require("inversify");
var uri_1 = require("@theia/core/lib/common/uri");
var path = require("path");
var fs = require("fs-extra");
var fs_extra_1 = require("fs-extra");
var crypto = require("crypto");
var core_1 = require("@theia/core");
var node_1 = require("@theia/core/lib/node");
var const_1 = require("./const");
var common_1 = require("@theia/workspace/lib/common");
var env_variables_1 = require("@theia/core/lib/common/env-variables");
var plugin_cli_contribution_1 = require("../plugin-cli-contribution");
var SESSION_TIMESTAMP_PATTERN = /^\d{8}T\d{6}$/;
// Service to provide configuration paths for plugin api.
var PluginPathsServiceImpl = /** @class */ (function () {
    function PluginPathsServiceImpl() {
    }
    PluginPathsServiceImpl.prototype.getHostLogPath = function () {
        return __awaiter(this, void 0, void 0, function () {
            var parentLogsDir, pluginDirPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getLogsDirPath()];
                    case 1:
                        parentLogsDir = _a.sent();
                        if (!parentLogsDir) {
                            throw new Error('Unable to get parent log directory');
                        }
                        pluginDirPath = path.join(parentLogsDir, this.generateTimeFolderName(), 'host');
                        return [4 /*yield*/, fs.mkdirs(pluginDirPath)];
                    case 2:
                        _a.sent();
                        // no `await` as We should never wait for the cleanup
                        this.cleanupOldLogs(parentLogsDir);
                        return [2 /*return*/, pluginDirPath];
                }
            });
        });
    };
    PluginPathsServiceImpl.prototype.getHostStoragePath = function (workspaceUri, rootUris) {
        return __awaiter(this, void 0, void 0, function () {
            var parentStorageDir, storageDirName, storageDirPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getWorkspaceStorageDirPath()];
                    case 1:
                        parentStorageDir = _a.sent();
                        if (!parentStorageDir) {
                            throw new Error('Unable to get parent storage directory');
                        }
                        if (!workspaceUri) {
                            return [2 /*return*/, undefined];
                        }
                        return [4 /*yield*/, fs.mkdirs(parentStorageDir)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.buildWorkspaceId(workspaceUri, rootUris)];
                    case 3:
                        storageDirName = _a.sent();
                        storageDirPath = path.join(parentStorageDir, storageDirName);
                        return [4 /*yield*/, fs.mkdirs(storageDirPath)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, storageDirPath];
                }
            });
        });
    };
    PluginPathsServiceImpl.prototype.buildWorkspaceId = function (workspaceUri, rootUris) {
        return __awaiter(this, void 0, void 0, function () {
            var untitledWorkspace, rootsStr, stat, _a, displayName;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, common_1.getTemporaryWorkspaceFileUri(this.envServer)];
                    case 1:
                        untitledWorkspace = _b.sent();
                        if (!(untitledWorkspace.toString() === workspaceUri)) return [3 /*break*/, 2];
                        rootsStr = rootUris.sort().join(',');
                        return [2 /*return*/, this.createHash(rootsStr)];
                    case 2:
                        stat = void 0;
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, fs.stat(node_1.FileUri.fsPath(workspaceUri))];
                    case 4:
                        stat = _b.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        _a = _b.sent();
                        return [3 /*break*/, 6];
                    case 6:
                        displayName = new uri_1.default(workspaceUri).displayName;
                        if ((!stat || !stat.isDirectory()) && (displayName.endsWith("." + common_1.THEIA_EXT) || displayName.endsWith("." + common_1.VSCODE_EXT))) {
                            displayName = displayName.slice(0, displayName.lastIndexOf('.'));
                        }
                        return [2 /*return*/, this.createHash(workspaceUri)];
                }
            });
        });
    };
    /**
     * Creates a hash digest of the given string.
     */
    PluginPathsServiceImpl.prototype.createHash = function (str) {
        try {
            // md5 is not FIPS-approved but we have to continue use it as there're existing storage folders based on it
            return crypto.createHash('md5').update(str).digest('hex');
        }
        catch (e) {
            if (e.message.indexOf('disabled for FIPS') > -1) {
                // SHA256 is FIPS-compliant
                return crypto.createHash('sha256').update(str).digest('hex');
            }
            else {
                throw e;
            }
        }
        // see more details in the issues 8378
    };
    /**
     * Generate time folder name in format: YYYYMMDDTHHMMSS, for example: 20181205T093828
     */
    PluginPathsServiceImpl.prototype.generateTimeFolderName = function () {
        var timeStamp = new Date().toISOString().replace(/[-:]|(\..*)/g, '');
        // Helps ensure our timestamp generation logic is "valid".
        // Changes to the timestamp structure may break old logs deletion logic.
        if (!SESSION_TIMESTAMP_PATTERN.test(timeStamp)) {
            this.logger.error("Generated log folder name: \"" + timeStamp + "\" does not match expected pattern: " + SESSION_TIMESTAMP_PATTERN);
        }
        return timeStamp;
    };
    PluginPathsServiceImpl.prototype.getLogsDirPath = function () {
        return __awaiter(this, void 0, void 0, function () {
            var configDirUri;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.envServer.getConfigDirUri()];
                    case 1:
                        configDirUri = _a.sent();
                        return [2 /*return*/, path.join(node_1.FileUri.fsPath(configDirUri), const_1.PluginPaths.PLUGINS_LOGS_DIR)];
                }
            });
        });
    };
    PluginPathsServiceImpl.prototype.getWorkspaceStorageDirPath = function () {
        return __awaiter(this, void 0, void 0, function () {
            var configDirUri;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.envServer.getConfigDirUri()];
                    case 1:
                        configDirUri = _a.sent();
                        return [2 /*return*/, path.join(node_1.FileUri.fsPath(configDirUri), const_1.PluginPaths.PLUGINS_WORKSPACE_STORAGE_DIR)];
                }
            });
        });
    };
    PluginPathsServiceImpl.prototype.cleanupOldLogs = function (parentLogsDir) {
        return __awaiter(this, void 0, void 0, function () {
            var dirEntries, subDirEntries, subDirNames, sessionSubDirNames, sortedSessionSubDirNames, maxSessionLogsFolders, oldSessionSubDirNames;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs_extra_1.readdir(parentLogsDir, { withFileTypes: true })];
                    case 1:
                        dirEntries = _a.sent();
                        subDirEntries = dirEntries.filter(function (dirent) { return dirent.isDirectory(); });
                        subDirNames = subDirEntries.map(function (dirent) { return dirent.name; });
                        sessionSubDirNames = subDirNames.filter(function (dirName) { return SESSION_TIMESTAMP_PATTERN.test(dirName); });
                        sortedSessionSubDirNames = sessionSubDirNames.sort().reverse();
                        maxSessionLogsFolders = this.cliContribution.maxSessionLogsFolders();
                        oldSessionSubDirNames = sortedSessionSubDirNames.slice(maxSessionLogsFolders);
                        oldSessionSubDirNames.forEach(function (sessionDir) {
                            var sessionDirPath = path.resolve(parentLogsDir, sessionDir);
                            // we are not waiting for the async `remove` to finish before returning
                            // in order to minimize impact on Theia startup time.
                            fs_extra_1.remove(sessionDirPath);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        inversify_1.inject(core_1.ILogger),
        __metadata("design:type", Object)
    ], PluginPathsServiceImpl.prototype, "logger", void 0);
    __decorate([
        inversify_1.inject(env_variables_1.EnvVariablesServer),
        __metadata("design:type", Object)
    ], PluginPathsServiceImpl.prototype, "envServer", void 0);
    __decorate([
        inversify_1.inject(plugin_cli_contribution_1.PluginCliContribution),
        __metadata("design:type", plugin_cli_contribution_1.PluginCliContribution)
    ], PluginPathsServiceImpl.prototype, "cliContribution", void 0);
    PluginPathsServiceImpl = __decorate([
        inversify_1.injectable()
    ], PluginPathsServiceImpl);
    return PluginPathsServiceImpl;
}());
exports.PluginPathsServiceImpl = PluginPathsServiceImpl;
//# sourceMappingURL=plugin-paths-service.js.map