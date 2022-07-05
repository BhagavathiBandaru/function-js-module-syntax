"use strict";
/********************************************************************************
 * Copyright (C) 2017-2018 TypeFox and others.
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
exports.bindFileResource = void 0;
require("../../src/browser/style/index.css");
var inversify_1 = require("inversify");
var common_1 = require("@theia/core/lib/common");
var browser_1 = require("@theia/core/lib/browser");
var file_resource_1 = require("./file-resource");
var filesystem_preferences_1 = require("./filesystem-preferences");
var filesystem_watcher_1 = require("./filesystem-watcher");
var filesystem_frontend_contribution_1 = require("./filesystem-frontend-contribution");
var file_upload_service_1 = require("./file-upload-service");
var file_tree_label_provider_1 = require("./file-tree/file-tree-label-provider");
var file_service_1 = require("./file-service");
var remote_file_system_provider_1 = require("../common/remote-file-system-provider");
var filesystem_1 = require("../common/filesystem");
var uri_1 = require("@theia/core/lib/common/uri");
var files_1 = require("../common/files");
var env_variables_1 = require("@theia/core/lib/common/env-variables");
var contribution_provider_1 = require("@theia/core/lib/common/contribution-provider");
var remote_file_service_contribution_1 = require("./remote-file-service-contribution");
var filesystem_watcher_error_handler_1 = require("./filesystem-watcher-error-handler");
var encodings_1 = require("@theia/core/lib/common/encodings");
exports.default = new inversify_1.ContainerModule(function (bind) {
    filesystem_preferences_1.bindFileSystemPreferences(bind);
    contribution_provider_1.bindContributionProvider(bind, file_service_1.FileServiceContribution);
    bind(file_service_1.FileService).toSelf().inSingletonScope();
    bind(remote_file_system_provider_1.RemoteFileSystemServer).toDynamicValue(function (ctx) {
        return browser_1.WebSocketConnectionProvider.createProxy(ctx.container, remote_file_system_provider_1.remoteFileSystemPath, new remote_file_system_provider_1.RemoteFileSystemProxyFactory());
    });
    bind(remote_file_system_provider_1.RemoteFileSystemProvider).toSelf().inSingletonScope();
    bind(remote_file_service_contribution_1.RemoteFileServiceContribution).toSelf().inSingletonScope();
    bind(file_service_1.FileServiceContribution).toService(remote_file_service_contribution_1.RemoteFileServiceContribution);
    bind(filesystem_watcher_1.FileSystemWatcher).toSelf().inSingletonScope();
    bind(filesystem_watcher_error_handler_1.FileSystemWatcherErrorHandler).toSelf().inSingletonScope();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    bind(filesystem_1.FileSystem).toDynamicValue(function (_a) {
        var container = _a.container;
        var fileService = container.get(file_service_1.FileService);
        var environments = container.get(env_variables_1.EnvVariablesServer);
        var convertStat = function (stat) {
            var _a;
            return ({
                uri: stat.resource.toString(),
                lastModification: stat.mtime,
                size: stat.size,
                isDirectory: 'isDirectory' in stat && stat.isDirectory,
                children: 'children' in stat ? (_a = stat.children) === null || _a === void 0 ? void 0 : _a.map(convertStat) : undefined
            });
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var rethrowError = function (uri, error) {
            if (error instanceof files_1.FileOperationError) {
                if (error.fileOperationResult === 1 /* FILE_NOT_FOUND */) {
                    throw filesystem_1.FileSystemError.FileNotFound(uri);
                }
                if (error.fileOperationResult === 0 /* FILE_IS_DIRECTORY */) {
                    throw filesystem_1.FileSystemError.FileIsDirectory(uri);
                }
                if (error.fileOperationResult === 10 /* FILE_NOT_DIRECTORY */) {
                    throw filesystem_1.FileSystemError.FileNotDirectory(uri);
                }
                if (error.fileOperationResult === 3 /* FILE_MODIFIED_SINCE */) {
                    throw filesystem_1.FileSystemError.FileIsOutOfSync(uri);
                }
            }
            throw error;
        };
        return new /** @class */ (function () {
            function class_1() {
            }
            class_1.prototype.getFileStat = function (uri) {
                return __awaiter(this, void 0, void 0, function () {
                    var stat, e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, fileService.resolve(new uri_1.default(uri), { resolveMetadata: true })];
                            case 1:
                                stat = _a.sent();
                                return [2 /*return*/, convertStat(stat)];
                            case 2:
                                e_1 = _a.sent();
                                if (e_1 instanceof files_1.FileOperationError && e_1.fileOperationResult === 1 /* FILE_NOT_FOUND */) {
                                    return [2 /*return*/, undefined];
                                }
                                rethrowError(uri, e_1);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            };
            class_1.prototype.exists = function (uri) {
                return fileService.exists(new uri_1.default(uri));
            };
            class_1.prototype.resolveContent = function (uri, options) {
                return __awaiter(this, void 0, void 0, function () {
                    var content, e_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, fileService.read(new uri_1.default(uri), options)];
                            case 1:
                                content = _a.sent();
                                return [2 /*return*/, {
                                        stat: convertStat(content),
                                        content: content.value
                                    }];
                            case 2:
                                e_2 = _a.sent();
                                rethrowError(uri, e_2);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            };
            class_1.prototype.setContent = function (file, content, options) {
                return __awaiter(this, void 0, void 0, function () {
                    var result, e_3;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, fileService.write(new uri_1.default(file.uri), content, __assign(__assign({}, options), { mtime: file.lastModification }))];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, convertStat(result)];
                            case 2:
                                e_3 = _a.sent();
                                rethrowError(file.uri, e_3);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            };
            class_1.prototype.updateContent = function (file, contentChanges, options) {
                return __awaiter(this, void 0, void 0, function () {
                    var result, e_4;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, fileService.update(new uri_1.default(file.uri), contentChanges, {
                                        mtime: file.lastModification,
                                        etag: files_1.etag({ size: file.size, mtime: file.lastModification }),
                                        readEncoding: (options === null || options === void 0 ? void 0 : options.encoding) || encodings_1.UTF8,
                                        encoding: options === null || options === void 0 ? void 0 : options.overwriteEncoding,
                                        overwriteEncoding: !!(options === null || options === void 0 ? void 0 : options.overwriteEncoding)
                                    })];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, convertStat(result)];
                            case 2:
                                e_4 = _a.sent();
                                rethrowError(file.uri, e_4);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            };
            class_1.prototype.move = function (sourceUri, targetUri, options) {
                return __awaiter(this, void 0, void 0, function () {
                    var result, e_5;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, fileService.move(new uri_1.default(sourceUri), new uri_1.default(targetUri), options)];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, convertStat(result)];
                            case 2:
                                e_5 = _a.sent();
                                rethrowError(sourceUri, e_5);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            };
            class_1.prototype.copy = function (sourceUri, targetUri, options) {
                return __awaiter(this, void 0, void 0, function () {
                    var result, e_6;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, fileService.copy(new uri_1.default(sourceUri), new uri_1.default(targetUri), options)];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, convertStat(result)];
                            case 2:
                                e_6 = _a.sent();
                                rethrowError(sourceUri, e_6);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            };
            class_1.prototype.createFile = function (uri, options) {
                return __awaiter(this, void 0, void 0, function () {
                    var result, e_7;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, fileService.create(new uri_1.default(uri), options === null || options === void 0 ? void 0 : options.content, { encoding: options === null || options === void 0 ? void 0 : options.encoding })];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, convertStat(result)];
                            case 2:
                                e_7 = _a.sent();
                                rethrowError(uri, e_7);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            };
            class_1.prototype.createFolder = function (uri) {
                return __awaiter(this, void 0, void 0, function () {
                    var result, e_8;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, fileService.createFolder(new uri_1.default(uri))];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, convertStat(result)];
                            case 2:
                                e_8 = _a.sent();
                                rethrowError(uri, e_8);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            };
            class_1.prototype.touchFile = function (uri) {
                throw new Error('Method not implemented.');
            };
            class_1.prototype.delete = function (uri, options) {
                return __awaiter(this, void 0, void 0, function () {
                    var e_9;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, fileService.delete(new uri_1.default(uri), { useTrash: options === null || options === void 0 ? void 0 : options.moveToTrash, recursive: true })];
                            case 1: return [2 /*return*/, _a.sent()];
                            case 2:
                                e_9 = _a.sent();
                                rethrowError(uri, e_9);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            };
            class_1.prototype.getEncoding = function (uri) {
                return __awaiter(this, void 0, void 0, function () {
                    var encoding;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fileService.read(new uri_1.default(uri))];
                            case 1:
                                encoding = (_a.sent()).encoding;
                                return [2 /*return*/, encoding];
                        }
                    });
                });
            };
            class_1.prototype.guessEncoding = function (uri) {
                return __awaiter(this, void 0, void 0, function () {
                    var encoding;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fileService.read(new uri_1.default(uri), { autoGuessEncoding: true })];
                            case 1:
                                encoding = (_a.sent()).encoding;
                                return [2 /*return*/, encoding];
                        }
                    });
                });
            };
            class_1.prototype.getRoots = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var drives, roots;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, environments.getDrives()];
                            case 1:
                                drives = _a.sent();
                                return [4 /*yield*/, Promise.all(drives.map(function (uri) { return _this.getFileStat(uri); }))];
                            case 2:
                                roots = _a.sent();
                                return [2 /*return*/, roots.filter(function (root) { return !!root; })];
                        }
                    });
                });
            };
            class_1.prototype.getCurrentUserHome = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = this.getFileStat;
                                return [4 /*yield*/, environments.getHomeDirUri()];
                            case 1: return [2 /*return*/, _a.apply(this, [_b.sent()])];
                        }
                    });
                });
            };
            class_1.prototype.getDrives = function () {
                return environments.getDrives();
            };
            class_1.prototype.access = function (uri, mode) {
                return fileService.access(new uri_1.default(uri), mode);
            };
            class_1.prototype.getFsPath = function (uri) {
                return fileService.fsPath(new uri_1.default(uri));
            };
            return class_1;
        }());
    }).inSingletonScope();
    bindFileResource(bind);
    bind(file_upload_service_1.FileUploadService).toSelf().inSingletonScope();
    bind(filesystem_frontend_contribution_1.FileSystemFrontendContribution).toSelf().inSingletonScope();
    bind(common_1.CommandContribution).toService(filesystem_frontend_contribution_1.FileSystemFrontendContribution);
    bind(browser_1.FrontendApplicationContribution).toService(filesystem_frontend_contribution_1.FileSystemFrontendContribution);
    bind(file_tree_label_provider_1.FileTreeLabelProvider).toSelf().inSingletonScope();
    bind(browser_1.LabelProviderContribution).toService(file_tree_label_provider_1.FileTreeLabelProvider);
});
function bindFileResource(bind) {
    bind(file_resource_1.FileResourceResolver).toSelf().inSingletonScope();
    bind(common_1.ResourceResolver).toService(file_resource_1.FileResourceResolver);
}
exports.bindFileResource = bindFileResource;
//# sourceMappingURL=filesystem-frontend-module.js.map