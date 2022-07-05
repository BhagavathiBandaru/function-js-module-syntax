"use strict";
/********************************************************************************
 * Copyright (C) 2020 TypeFox and others.
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
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// based on https://github.com/microsoft/vscode/blob/04c36be045a94fee58e5f8992d3e3fd980294a84/src/vs/platform/files/common/fileService.ts
// and https://github.com/microsoft/vscode/blob/04c36be045a94fee58e5f8992d3e3fd980294a84/src/vs/workbench/services/textfile/browser/textFileService.ts
// and https://github.com/microsoft/vscode/blob/04c36be045a94fee58e5f8992d3e3fd980294a84/src/vs/workbench/services/textfile/electron-browser/nativeTextFileService.ts
// and https://github.com/microsoft/vscode/blob/04c36be045a94fee58e5f8992d3e3fd980294a84/src/vs/workbench/services/workingCopy/common/workingCopyFileService.ts
// and https://github.com/microsoft/vscode/blob/04c36be045a94fee58e5f8992d3e3fd980294a84/src/vs/workbench/services/workingCopy/common/workingCopyFileOperationParticipant.ts
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = exports.TextFileOperationError = exports.FileServiceContribution = void 0;
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-null/no-null */
/* eslint-disable @typescript-eslint/tslint/config */
/* eslint-disable @typescript-eslint/no-explicit-any */
var inversify_1 = require("inversify");
var promise_util_1 = require("@theia/core/lib/common/promise-util");
var cancellation_1 = require("@theia/core/lib/common/cancellation");
var disposable_1 = require("@theia/core/lib/common/disposable");
var event_1 = require("@theia/core/lib/common/event");
var contribution_provider_1 = require("@theia/core/lib/common/contribution-provider");
var ternary_search_tree_1 = require("@theia/core/lib/common/ternary-search-tree");
var files_1 = require("../common/files");
var buffer_1 = require("@theia/core/lib/common/buffer");
var stream_1 = require("@theia/core/lib/common/stream");
var label_provider_1 = require("@theia/core/lib/browser/label-provider");
var filesystem_preferences_1 = require("./filesystem-preferences");
var progress_service_1 = require("@theia/core/lib/common/progress-service");
var delegating_file_system_provider_1 = require("../common/delegating-file-system-provider");
var encoding_registry_1 = require("@theia/core/lib/browser/encoding-registry");
var encodings_1 = require("@theia/core/lib/common/encodings");
var encoding_service_1 = require("@theia/core/lib/common/encoding-service");
var io_1 = require("../common/io");
var filesystem_watcher_error_handler_1 = require("./filesystem-watcher-error-handler");
var filesystem_utils_1 = require("../common/filesystem-utils");
exports.FileServiceContribution = Symbol('FileServiceContribution');
var TextFileOperationError = /** @class */ (function (_super) {
    __extends(TextFileOperationError, _super);
    function TextFileOperationError(message, textFileOperationResult, options) {
        var _this = _super.call(this, message, 11 /* FILE_OTHER_ERROR */) || this;
        _this.textFileOperationResult = textFileOperationResult;
        _this.options = options;
        Object.setPrototypeOf(_this, TextFileOperationError.prototype);
        return _this;
    }
    return TextFileOperationError;
}(files_1.FileOperationError));
exports.TextFileOperationError = TextFileOperationError;
/**
 * The {@link FileService} is the common facade responsible for all interactions with file systems.
 * It manages all registered {@link FileSystemProvider}s and
 *  forwards calls to the responsible {@link FileSystemProvider}, determined by the scheme.
 * For additional documentation regarding the provided functions see also {@link FileSystemProvider}.
 */
var FileService = /** @class */ (function () {
    function FileService() {
        this.BUFFER_SIZE = 64 * 1024;
        // #region Events
        this.correlationIds = 0;
        this.onWillRunUserOperationEmitter = new event_1.AsyncEmitter();
        /**
         * An event that is emitted when file operation is being performed.
         * This event is triggered by user gestures.
         */
        this.onWillRunUserOperation = this.onWillRunUserOperationEmitter.event;
        this.onDidFailUserOperationEmitter = new event_1.AsyncEmitter();
        /**
         * An event that is emitted when file operation is failed.
         * This event is triggered by user gestures.
         */
        this.onDidFailUserOperation = this.onDidFailUserOperationEmitter.event;
        this.onDidRunUserOperationEmitter = new event_1.AsyncEmitter();
        /**
         * An event that is emitted when file operation is finished.
         * This event is triggered by user gestures.
         */
        this.onDidRunUserOperation = this.onDidRunUserOperationEmitter.event;
        // #endregion
        // #region File System Provider
        this.onDidChangeFileSystemProviderRegistrationsEmitter = new event_1.Emitter();
        this.onDidChangeFileSystemProviderRegistrations = this.onDidChangeFileSystemProviderRegistrationsEmitter.event;
        this.onWillActivateFileSystemProviderEmitter = new event_1.Emitter();
        /**
         * See `FileServiceContribution.registerProviders`.
         */
        this.onWillActivateFileSystemProvider = this.onWillActivateFileSystemProviderEmitter.event;
        this.onDidChangeFileSystemProviderCapabilitiesEmitter = new event_1.Emitter();
        this.onDidChangeFileSystemProviderCapabilities = this.onDidChangeFileSystemProviderCapabilitiesEmitter.event;
        this.providers = new Map();
        this.activations = new Map();
        // #endregion
        this.onDidRunOperationEmitter = new event_1.Emitter();
        /**
         * An event that is emitted when operation is finished.
         * This event is triggered by user gestures and programmatically.
         */
        this.onDidRunOperation = this.onDidRunOperationEmitter.event;
        // #endregion
        // #region File Watching
        this.onDidFilesChangeEmitter = new event_1.Emitter();
        /**
         * An event that is emitted when files are changed on the disk.
         */
        this.onDidFilesChange = this.onDidFilesChangeEmitter.event;
        this.activeWatchers = new Map();
        // #endregion
        // #region Helpers
        this.writeQueues = new Map();
        // #endregion
        // #region File operation participants
        this.participants = [];
    }
    FileService.prototype.init = function () {
        var e_1, _a;
        try {
            for (var _b = __values(this.contributions.getContributions()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var contribution = _c.value;
                contribution.registerFileSystemProviders(this);
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
    /**
     * Registers a new {@link FileSystemProvider} for the given scheme.
     * @param scheme The (uri) scheme for which the provider should be registered.
     * @param provider The file system provider that should be registered.
     *
     * @returns A `Disposable` that can be invoked to unregister the given provider.
     */
    FileService.prototype.registerProvider = function (scheme, provider) {
        var _this = this;
        if (this.providers.has(scheme)) {
            throw new Error("A filesystem provider for the scheme '" + scheme + "' is already registered.");
        }
        this.providers.set(scheme, provider);
        this.onDidChangeFileSystemProviderRegistrationsEmitter.fire({ added: true, scheme: scheme, provider: provider });
        var providerDisposables = new disposable_1.DisposableCollection();
        providerDisposables.push(provider.onDidChangeFile(function (changes) { return _this.onDidFilesChangeEmitter.fire(new files_1.FileChangesEvent(changes)); }));
        providerDisposables.push(provider.onFileWatchError(function () { return _this.handleFileWatchError(); }));
        providerDisposables.push(provider.onDidChangeCapabilities(function () { return _this.onDidChangeFileSystemProviderCapabilitiesEmitter.fire({ provider: provider, scheme: scheme }); }));
        return disposable_1.Disposable.create(function () {
            _this.onDidChangeFileSystemProviderRegistrationsEmitter.fire({ added: false, scheme: scheme, provider: provider });
            _this.providers.delete(scheme);
            providerDisposables.dispose();
        });
    };
    /**
     * Try to activate the registered provider for the given scheme
     * @param scheme  The uri scheme for which the responsible provider should be activated.
     *
     * @returns A promise of the activated file system provider. Only resolves if a provider is available for this scheme, gets rejected otherwise.
     */
    FileService.prototype.activateProvider = function (scheme) {
        return __awaiter(this, void 0, void 0, function () {
            var provider, activation, deferredActivation_1;
            var _this = this;
            return __generator(this, function (_a) {
                provider = this.providers.get(scheme);
                if (provider) {
                    return [2 /*return*/, provider];
                }
                activation = this.activations.get(scheme);
                if (!activation) {
                    deferredActivation_1 = new promise_util_1.Deferred();
                    this.activations.set(scheme, activation = deferredActivation_1.promise);
                    event_1.WaitUntilEvent.fire(this.onWillActivateFileSystemProviderEmitter, { scheme: scheme }).then(function () {
                        provider = _this.providers.get(scheme);
                        if (!provider) {
                            var error = new Error();
                            error.name = 'ENOPRO';
                            error.message = "No file system provider found for scheme " + scheme;
                            throw error;
                        }
                        else {
                            deferredActivation_1.resolve(provider);
                        }
                    }).catch(function (e) { return deferredActivation_1.reject(e); });
                }
                return [2 /*return*/, activation];
            });
        });
    };
    /**
     * Tests if the service (i.e. any of its registered {@link FileSystemProvider}s) can handle the given resource.
     * @param resource `URI` of the resource to test.
     *
     * @returns `true` if the resource can be handled, `false` otherwise.
     */
    FileService.prototype.canHandleResource = function (resource) {
        return this.providers.has(resource.scheme);
    };
    /**
     * Tests if the service (i.e the {@link FileSystemProvider} registered for the given uri scheme) provides the given capability.
     * @param resource `URI` of the resource to test.
     * @param capability The required capability.
     *
     * @returns `true` if the resource can be handled and the required capability can be provided.
     */
    FileService.prototype.hasCapability = function (resource, capability) {
        var provider = this.providers.get(resource.scheme);
        return !!(provider && (provider.capabilities & capability));
    };
    FileService.prototype.withProvider = function (resource) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Assert path is absolute
                if (!resource.path.isAbsolute) {
                    throw new files_1.FileOperationError("Unable to resolve filesystem provider with relative file path " + this.resourceForError(resource), 8 /* FILE_INVALID_PATH */);
                }
                return [2 /*return*/, this.activateProvider(resource.scheme)];
            });
        });
    };
    FileService.prototype.withReadProvider = function (resource) {
        return __awaiter(this, void 0, void 0, function () {
            var provider;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.withProvider(resource)];
                    case 1:
                        provider = _a.sent();
                        if (files_1.hasOpenReadWriteCloseCapability(provider) || files_1.hasReadWriteCapability(provider)) {
                            return [2 /*return*/, provider];
                        }
                        throw new Error("Filesystem provider for scheme '" + resource.scheme + "' neither has FileReadWrite, FileReadStream nor FileOpenReadWriteClose capability which is needed for the read operation.");
                }
            });
        });
    };
    FileService.prototype.withWriteProvider = function (resource) {
        return __awaiter(this, void 0, void 0, function () {
            var provider;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.withProvider(resource)];
                    case 1:
                        provider = _a.sent();
                        if (files_1.hasOpenReadWriteCloseCapability(provider) || files_1.hasReadWriteCapability(provider)) {
                            return [2 /*return*/, provider];
                        }
                        throw new Error("Filesystem provider for scheme '" + resource.scheme + "' neither has FileReadWrite nor FileOpenReadWriteClose capability which is needed for the write operation.");
                }
            });
        });
    };
    FileService.prototype.resolve = function (resource, options) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.doResolveFile(resource, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_1 = _a.sent();
                        // Specially handle file not found case as file operation result
                        if (files_1.toFileSystemProviderErrorCode(error_1) === files_1.FileSystemProviderErrorCode.FileNotFound) {
                            throw new files_1.FileOperationError("Unable to resolve non-existing file '" + this.resourceForError(resource) + "'", 1 /* FILE_NOT_FOUND */);
                        }
                        // Bubble up any other error as is
                        throw files_1.ensureFileSystemProviderError(error_1);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FileService.prototype.doResolveFile = function (resource, options) {
        return __awaiter(this, void 0, void 0, function () {
            var provider, resolveTo, resolveSingleChildDescendants, resolveMetadata, stat, trie;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.withProvider(resource)];
                    case 1:
                        provider = _a.sent();
                        resolveTo = options === null || options === void 0 ? void 0 : options.resolveTo;
                        resolveSingleChildDescendants = options === null || options === void 0 ? void 0 : options.resolveSingleChildDescendants;
                        resolveMetadata = options === null || options === void 0 ? void 0 : options.resolveMetadata;
                        return [4 /*yield*/, provider.stat(resource)];
                    case 2:
                        stat = _a.sent();
                        return [2 /*return*/, this.toFileStat(provider, resource, stat, undefined, !!resolveMetadata, function (stat, siblings) {
                                // lazy trie to check for recursive resolving
                                if (!trie) {
                                    trie = ternary_search_tree_1.TernarySearchTree.forUris(!!(provider.capabilities & 1024 /* PathCaseSensitive */));
                                    trie.set(resource, true);
                                    if (Array.isArray(resolveTo) && resolveTo.length) {
                                        resolveTo.forEach(function (uri) { return trie.set(uri, true); });
                                    }
                                }
                                // check for recursive resolving
                                if (Boolean(trie.findSuperstr(stat.resource) || trie.get(stat.resource))) {
                                    return true;
                                }
                                // check for resolving single child folders
                                if (stat.isDirectory && resolveSingleChildDescendants) {
                                    return siblings === 1;
                                }
                                return false;
                            })];
                }
            });
        });
    };
    FileService.prototype.toFileStat = function (provider, resource, stat, siblings, resolveMetadata, recurse) {
        return __awaiter(this, void 0, void 0, function () {
            var fileStat, entries_1, resolvedEntries, error_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fileStat = files_1.FileStat.fromStat(resource, stat);
                        if (!(fileStat.isDirectory && recurse(fileStat, siblings))) return [3 /*break*/, 6];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, provider.readdir(resource)];
                    case 2:
                        entries_1 = _a.sent();
                        return [4 /*yield*/, Promise.all(entries_1.map(function (_a) {
                                var _b = __read(_a, 2), name = _b[0], type = _b[1];
                                return __awaiter(_this, void 0, void 0, function () {
                                    var childResource, childStat, _c, error_3;
                                    return __generator(this, function (_d) {
                                        switch (_d.label) {
                                            case 0:
                                                _d.trys.push([0, 5, , 6]);
                                                childResource = resource.resolve(name);
                                                if (!resolveMetadata) return [3 /*break*/, 2];
                                                return [4 /*yield*/, provider.stat(childResource)];
                                            case 1:
                                                _c = _d.sent();
                                                return [3 /*break*/, 3];
                                            case 2:
                                                _c = { type: type };
                                                _d.label = 3;
                                            case 3:
                                                childStat = _c;
                                                return [4 /*yield*/, this.toFileStat(provider, childResource, childStat, entries_1.length, resolveMetadata, recurse)];
                                            case 4: return [2 /*return*/, _d.sent()];
                                            case 5:
                                                error_3 = _d.sent();
                                                console.trace(error_3);
                                                return [2 /*return*/, null]; // can happen e.g. due to permission errors
                                            case 6: return [2 /*return*/];
                                        }
                                    });
                                });
                            }))];
                    case 3:
                        resolvedEntries = _a.sent();
                        // make sure to get rid of null values that signal a failure to resolve a particular entry
                        fileStat.children = resolvedEntries.filter(function (e) { return !!e; });
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        console.trace(error_2);
                        fileStat.children = []; // gracefully handle errors, we may not have permissions to read
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, fileStat];
                    case 6: return [2 /*return*/, fileStat];
                }
            });
        });
    };
    FileService.prototype.resolveAll = function (toResolve) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.all(toResolve.map(function (entry) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, error_4;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 2, , 3]);
                                    _a = {};
                                    return [4 /*yield*/, this.doResolveFile(entry.resource, entry.options)];
                                case 1: return [2 /*return*/, (_a.stat = _b.sent(), _a.success = true, _a)];
                                case 2:
                                    error_4 = _b.sent();
                                    console.trace(error_4);
                                    return [2 /*return*/, { stat: undefined, success: false }];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); }))];
            });
        });
    };
    /**
     * Tests if the given resource exists in the filesystem.
     * @param resource `URI` of the resource which should be tested.
     * @throws Will throw an error if no {@link FileSystemProvider} is registered for the given resource.
     *
     * @returns A promise that resolves to `true` if the resource exists.
     */
    FileService.prototype.exists = function (resource) {
        return __awaiter(this, void 0, void 0, function () {
            var provider, stat, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.withProvider(resource)];
                    case 1:
                        provider = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, provider.stat(resource)];
                    case 3:
                        stat = _a.sent();
                        return [2 /*return*/, !!stat];
                    case 4:
                        error_5 = _a.sent();
                        return [2 /*return*/, false];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Tests a user's permissions for the given resource.
     */
    FileService.prototype.access = function (resource, mode) {
        return __awaiter(this, void 0, void 0, function () {
            var provider, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.withProvider(resource)];
                    case 1:
                        provider = _a.sent();
                        if (!files_1.hasAccessCapability(provider)) {
                            return [2 /*return*/, false];
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, provider.access(resource, mode)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 4:
                        error_6 = _a.sent();
                        return [2 /*return*/, false];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Resolves the fs path of the given URI.
     *
     * USE WITH CAUTION: You should always prefer URIs to paths if possible, as they are
     * portable and platform independent. Paths should only be used in cases you directly
     * interact with the OS, e.g. when running a command on the shell.
     *
     * If you need to display human readable simple or long names then use `LabelProvider` instead.
     * @param resource `URI` of the resource that should be resolved.
     * @throws Will throw an error if no {@link FileSystemProvider} is registered for the given resource.
     *
     * @returns A promise of the resolved fs path.
     */
    FileService.prototype.fsPath = function (resource) {
        return __awaiter(this, void 0, void 0, function () {
            var provider;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.withProvider(resource)];
                    case 1:
                        provider = _a.sent();
                        if (!files_1.hasAccessCapability(provider)) {
                            return [2 /*return*/, resource.path.toString()];
                        }
                        return [2 /*return*/, provider.fsPath(resource)];
                }
            });
        });
    };
    // #region Text File Reading/Writing
    FileService.prototype.create = function (resource, value, options) {
        return __awaiter(this, void 0, void 0, function () {
            var event, stat, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if ((options === null || options === void 0 ? void 0 : options.fromUserGesture) === false) {
                            return [2 /*return*/, this.doCreate(resource, value, options)];
                        }
                        return [4 /*yield*/, this.runFileOperationParticipants(resource, undefined, 0 /* CREATE */)];
                    case 1:
                        _a.sent();
                        event = { correlationId: this.correlationIds++, operation: 0 /* CREATE */, target: resource };
                        return [4 /*yield*/, this.onWillRunUserOperationEmitter.fire(event)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 7]);
                        return [4 /*yield*/, this.doCreate(resource, value, options)];
                    case 4:
                        stat = _a.sent();
                        return [3 /*break*/, 7];
                    case 5:
                        error_7 = _a.sent();
                        return [4 /*yield*/, this.onDidFailUserOperationEmitter.fire(event)];
                    case 6:
                        _a.sent();
                        throw error_7;
                    case 7: return [4 /*yield*/, this.onDidRunUserOperationEmitter.fire(event)];
                    case 8:
                        _a.sent();
                        return [2 /*return*/, stat];
                }
            });
        });
    };
    FileService.prototype.doCreate = function (resource, value, options) {
        return __awaiter(this, void 0, void 0, function () {
            var encoding, encoded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getWriteEncoding(resource, options)];
                    case 1:
                        encoding = _a.sent();
                        return [4 /*yield*/, this.encodingService.encodeStream(value, encoding)];
                    case 2:
                        encoded = _a.sent();
                        return [2 /*return*/, this.createFile(resource, encoded, options)];
                }
            });
        });
    };
    FileService.prototype.write = function (resource, value, options) {
        return __awaiter(this, void 0, void 0, function () {
            var encoding, encoded, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.getWriteEncoding(resource, options)];
                    case 1:
                        encoding = _c.sent();
                        return [4 /*yield*/, this.encodingService.encodeStream(value, encoding)];
                    case 2:
                        encoded = _c.sent();
                        _b = (_a = Object).assign;
                        return [4 /*yield*/, this.writeFile(resource, encoded, options)];
                    case 3: return [2 /*return*/, _b.apply(_a, [_c.sent(), { encoding: encoding.encoding }])];
                }
            });
        });
    };
    FileService.prototype.read = function (resource, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, bufferStream, decoder, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.doRead(resource, __assign(__assign({}, options), { 
                            // optimization: since we know that the caller does not
                            // care about buffering, we indicate this to the reader.
                            // this reduces all the overhead the buffered reading
                            // has (open, read, close) if the provider supports
                            // unbuffered reading.
                            preferUnbuffered: true }))];
                    case 1:
                        _a = __read.apply(void 0, [_d.sent(), 2]), bufferStream = _a[0], decoder = _a[1];
                        _b = [__assign({}, bufferStream)];
                        _c = { encoding: decoder.detected.encoding || encodings_1.UTF8 };
                        return [4 /*yield*/, stream_1.consumeStream(decoder.stream, function (strings) { return strings.join(''); })];
                    case 2: return [2 /*return*/, __assign.apply(void 0, _b.concat([(_c.value = _d.sent(), _c)]))];
                }
            });
        });
    };
    FileService.prototype.readStream = function (resource, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, bufferStream, decoder;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.doRead(resource, options)];
                    case 1:
                        _a = __read.apply(void 0, [_b.sent(), 2]), bufferStream = _a[0], decoder = _a[1];
                        return [2 /*return*/, __assign(__assign({}, bufferStream), { encoding: decoder.detected.encoding || encodings_1.UTF8, value: decoder.stream })];
                }
            });
        });
    };
    FileService.prototype.doRead = function (resource, options) {
        return __awaiter(this, void 0, void 0, function () {
            var bufferStream, content, decoder;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = this.resolveReadOptions(options);
                        if (!(options === null || options === void 0 ? void 0 : options.preferUnbuffered)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.readFile(resource, options)];
                    case 1:
                        content = _a.sent();
                        bufferStream = __assign(__assign({}, content), { value: buffer_1.BinaryBufferReadableStream.fromBuffer(content.value) });
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.readFileStream(resource, options)];
                    case 3:
                        bufferStream = _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, this.encodingService.decodeStream(bufferStream.value, {
                            guessEncoding: options.autoGuessEncoding,
                            overwriteEncoding: function (detectedEncoding) { return _this.getReadEncoding(resource, options, detectedEncoding); }
                        })];
                    case 5:
                        decoder = _a.sent();
                        // validate binary
                        if ((options === null || options === void 0 ? void 0 : options.acceptTextOnly) && decoder.detected.seemsBinary) {
                            throw new TextFileOperationError('File seems to be binary and cannot be opened as text', 0 /* FILE_IS_BINARY */, options);
                        }
                        return [2 /*return*/, [bufferStream, decoder]];
                }
            });
        });
    };
    FileService.prototype.resolveReadOptions = function (options) {
        options = __assign(__assign({}, options), { autoGuessEncoding: typeof (options === null || options === void 0 ? void 0 : options.autoGuessEncoding) === 'boolean' ? options.autoGuessEncoding : this.preferences['files.autoGuessEncoding'] });
        var limits = options.limits = options.limits || {};
        if (typeof limits.size !== 'number') {
            limits.size = this.preferences['files.maxFileSizeMB'] * 1024 * 1024;
        }
        return options;
    };
    FileService.prototype.update = function (resource, changes, options) {
        return __awaiter(this, void 0, void 0, function () {
            var provider, _a, encoding, stat, error_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.throwIfFileSystemIsReadonly;
                        return [4 /*yield*/, this.withWriteProvider(resource)];
                    case 1:
                        provider = _a.apply(this, [_b.sent(), resource]);
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 8, , 9]);
                        return [4 /*yield*/, this.validateWriteFile(provider, resource, options)];
                    case 3:
                        _b.sent();
                        if (!files_1.hasUpdateCapability(provider)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.getEncodingForResource(resource, options ? options.encoding : undefined)];
                    case 4:
                        encoding = _b.sent();
                        ;
                        return [4 /*yield*/, provider.updateFile(resource, changes, {
                                readEncoding: options.readEncoding,
                                writeEncoding: encoding,
                                overwriteEncoding: options.overwriteEncoding || false
                            })];
                    case 5:
                        stat = _b.sent();
                        return [2 /*return*/, Object.assign(files_1.FileStat.fromStat(resource, stat), { encoding: stat.encoding })];
                    case 6: throw new Error('incremental file update is not supported');
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_8 = _b.sent();
                        this.rethrowAsFileOperationError('Unable to write file', resource, error_8, options);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    // #endregion
    // #region File Reading/Writing
    FileService.prototype.createFile = function (resource, bufferOrReadableOrStream, options) {
        if (bufferOrReadableOrStream === void 0) { bufferOrReadableOrStream = buffer_1.BinaryBuffer.fromString(''); }
        return __awaiter(this, void 0, void 0, function () {
            var _a, fileStat;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = !(options === null || options === void 0 ? void 0 : options.overwrite);
                        if (!_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.exists(resource)];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        // validate overwrite
                        if (_a) {
                            throw new files_1.FileOperationError("Unable to create file '" + this.resourceForError(resource) + "' that already exists when overwrite flag is not set", 3 /* FILE_MODIFIED_SINCE */, options);
                        }
                        return [4 /*yield*/, this.writeFile(resource, bufferOrReadableOrStream)];
                    case 3:
                        fileStat = _b.sent();
                        // events
                        this.onDidRunOperationEmitter.fire(new files_1.FileOperationEvent(resource, 0 /* CREATE */, fileStat));
                        return [2 /*return*/, fileStat];
                }
            });
        });
    };
    FileService.prototype.writeFile = function (resource, bufferOrReadableOrStream, options) {
        return __awaiter(this, void 0, void 0, function () {
            var provider, _a, stat, bufferOrReadableOrStreamOrBufferedStream, bufferedStream, error_9;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.throwIfFileSystemIsReadonly;
                        return [4 /*yield*/, this.withWriteProvider(resource)];
                    case 1:
                        provider = _a.apply(this, [_b.sent(), resource]);
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 15, , 16]);
                        return [4 /*yield*/, this.validateWriteFile(provider, resource, options)];
                    case 3:
                        stat = _b.sent();
                        if (!!stat) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.mkdirp(provider, resource.parent)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        bufferOrReadableOrStreamOrBufferedStream = void 0;
                        if (!(files_1.hasReadWriteCapability(provider) && !(bufferOrReadableOrStream instanceof buffer_1.BinaryBuffer))) return [3 /*break*/, 9];
                        if (!stream_1.isReadableStream(bufferOrReadableOrStream)) return [3 /*break*/, 7];
                        return [4 /*yield*/, stream_1.peekStream(bufferOrReadableOrStream, 3)];
                    case 6:
                        bufferedStream = _b.sent();
                        if (bufferedStream.ended) {
                            bufferOrReadableOrStreamOrBufferedStream = buffer_1.BinaryBuffer.concat(bufferedStream.buffer);
                        }
                        else {
                            bufferOrReadableOrStreamOrBufferedStream = bufferedStream;
                        }
                        return [3 /*break*/, 8];
                    case 7:
                        bufferOrReadableOrStreamOrBufferedStream = stream_1.peekReadable(bufferOrReadableOrStream, function (data) { return buffer_1.BinaryBuffer.concat(data); }, 3);
                        _b.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        bufferOrReadableOrStreamOrBufferedStream = bufferOrReadableOrStream;
                        _b.label = 10;
                    case 10:
                        if (!(!files_1.hasOpenReadWriteCloseCapability(provider) || (files_1.hasReadWriteCapability(provider) && bufferOrReadableOrStreamOrBufferedStream instanceof buffer_1.BinaryBuffer))) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.doWriteUnbuffered(provider, resource, bufferOrReadableOrStreamOrBufferedStream)];
                    case 11:
                        _b.sent();
                        return [3 /*break*/, 14];
                    case 12: return [4 /*yield*/, this.doWriteBuffered(provider, resource, bufferOrReadableOrStreamOrBufferedStream instanceof buffer_1.BinaryBuffer ? buffer_1.BinaryBufferReadable.fromBuffer(bufferOrReadableOrStreamOrBufferedStream) : bufferOrReadableOrStreamOrBufferedStream)];
                    case 13:
                        _b.sent();
                        _b.label = 14;
                    case 14: return [3 /*break*/, 16];
                    case 15:
                        error_9 = _b.sent();
                        this.rethrowAsFileOperationError('Unable to write file', resource, error_9, options);
                        return [3 /*break*/, 16];
                    case 16: return [2 /*return*/, this.resolve(resource, { resolveMetadata: true })];
                }
            });
        });
    };
    FileService.prototype.validateWriteFile = function (provider, resource, options) {
        return __awaiter(this, void 0, void 0, function () {
            var stat, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stat = undefined;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, provider.stat(resource)];
                    case 2:
                        stat = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_10 = _a.sent();
                        return [2 /*return*/, undefined]; // file might not exist
                    case 4:
                        // file cannot be directory
                        if ((stat.type & files_1.FileType.Directory) !== 0) {
                            throw new files_1.FileOperationError("Unable to write file " + this.resourceForError(resource) + " that is actually a directory", 0 /* FILE_IS_DIRECTORY */, options);
                        }
                        if (this.modifiedSince(stat, options)) {
                            throw new files_1.FileOperationError('File Modified Since', 3 /* FILE_MODIFIED_SINCE */, options);
                        }
                        return [2 /*return*/, stat];
                }
            });
        });
    };
    /**
     * Dirty write prevention: if the file on disk has been changed and does not match our expected
     * mtime and etag, we bail out to prevent dirty writing.
     *
     * First, we check for a mtime that is in the future before we do more checks. The assumption is
     * that only the mtime is an indicator for a file that has changed on disk.
     *
     * Second, if the mtime has advanced, we compare the size of the file on disk with our previous
     * one using the etag() function. Relying only on the mtime check has proven to produce false
     * positives due to file system weirdness (especially around remote file systems). As such, the
     * check for size is a weaker check because it can return a false negative if the file has changed
     * but to the same length. This is a compromise we take to avoid having to produce checksums of
     * the file content for comparison which would be much slower to compute.
     */
    FileService.prototype.modifiedSince = function (stat, options) {
        return !!options && typeof options.mtime === 'number' && typeof options.etag === 'string' && options.etag !== files_1.ETAG_DISABLED &&
            typeof stat.mtime === 'number' && typeof stat.size === 'number' &&
            options.mtime < stat.mtime && options.etag !== files_1.etag({ mtime: options.mtime /* not using stat.mtime for a reason, see above */, size: stat.size });
    };
    FileService.prototype.readFile = function (resource, options) {
        return __awaiter(this, void 0, void 0, function () {
            var provider, stream, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.withReadProvider(resource)];
                    case 1:
                        provider = _c.sent();
                        return [4 /*yield*/, this.doReadAsFileStream(provider, resource, __assign(__assign({}, options), { 
                                // optimization: since we know that the caller does not
                                // care about buffering, we indicate this to the reader.
                                // this reduces all the overhead the buffered reading
                                // has (open, read, close) if the provider supports
                                // unbuffered reading.
                                preferUnbuffered: true }))];
                    case 2:
                        stream = _c.sent();
                        _a = [__assign({}, stream)];
                        _b = {};
                        return [4 /*yield*/, buffer_1.BinaryBufferReadableStream.toBuffer(stream.value)];
                    case 3: return [2 /*return*/, __assign.apply(void 0, _a.concat([(_b.value = _c.sent(), _b)]))];
                }
            });
        });
    };
    FileService.prototype.readFileStream = function (resource, options) {
        return __awaiter(this, void 0, void 0, function () {
            var provider;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.withReadProvider(resource)];
                    case 1:
                        provider = _a.sent();
                        return [2 /*return*/, this.doReadAsFileStream(provider, resource, options)];
                }
            });
        });
    };
    FileService.prototype.doReadAsFileStream = function (provider, resource, options) {
        return __awaiter(this, void 0, void 0, function () {
            var cancellableSource, statPromise, fileStreamPromise, _a, fileStat, fileStream, error_11;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        cancellableSource = new cancellation_1.CancellationTokenSource();
                        statPromise = this.validateReadFile(resource, options).then(function (stat) { return stat; }, function (error) {
                            cancellableSource.cancel();
                            throw error;
                        });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        if (!(options && typeof options.etag === 'string' && options.etag !== files_1.ETAG_DISABLED)) return [3 /*break*/, 3];
                        return [4 /*yield*/, statPromise];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        fileStreamPromise = void 0;
                        // read unbuffered (only if either preferred, or the provider has no buffered read capability)
                        if (!(files_1.hasOpenReadWriteCloseCapability(provider) || files_1.hasFileReadStreamCapability(provider)) || (files_1.hasReadWriteCapability(provider) && (options === null || options === void 0 ? void 0 : options.preferUnbuffered))) {
                            fileStreamPromise = this.readFileUnbuffered(provider, resource, options);
                        }
                        // read streamed (always prefer over primitive buffered read)
                        else if (files_1.hasFileReadStreamCapability(provider)) {
                            fileStreamPromise = Promise.resolve(this.readFileStreamed(provider, resource, cancellableSource.token, options));
                        }
                        // read buffered
                        else {
                            fileStreamPromise = Promise.resolve(this.readFileBuffered(provider, resource, cancellableSource.token, options));
                        }
                        return [4 /*yield*/, Promise.all([statPromise, fileStreamPromise])];
                    case 4:
                        _a = __read.apply(void 0, [_b.sent(), 2]), fileStat = _a[0], fileStream = _a[1];
                        return [2 /*return*/, __assign(__assign({}, fileStat), { value: fileStream })];
                    case 5:
                        error_11 = _b.sent();
                        this.rethrowAsFileOperationError('Unable to read file', resource, error_11, options);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    FileService.prototype.readFileStreamed = function (provider, resource, token, options) {
        var _this = this;
        if (options === void 0) { options = Object.create(null); }
        var fileStream = provider.readFileStream(resource, options, token);
        return stream_1.transform(fileStream, {
            data: function (data) { return data instanceof buffer_1.BinaryBuffer ? data : buffer_1.BinaryBuffer.wrap(data); },
            error: function (error) { return _this.asFileOperationError('Unable to read file', resource, error, options); }
        }, function (data) { return buffer_1.BinaryBuffer.concat(data); });
    };
    FileService.prototype.readFileBuffered = function (provider, resource, token, options) {
        var _this = this;
        if (options === void 0) { options = Object.create(null); }
        var stream = buffer_1.BinaryBufferWriteableStream.create();
        io_1.readFileIntoStream(provider, resource, stream, function (data) { return data; }, __assign(__assign({}, options), { bufferSize: this.BUFFER_SIZE, errorTransformer: function (error) { return _this.asFileOperationError('Unable to read file', resource, error, options); } }), token);
        return stream;
    };
    FileService.prototype.rethrowAsFileOperationError = function (message, resource, error, options) {
        throw this.asFileOperationError(message, resource, error, options);
    };
    FileService.prototype.asFileOperationError = function (message, resource, error, options) {
        var fileOperationError = new files_1.FileOperationError(message + " '" + this.resourceForError(resource) + "' (" + files_1.ensureFileSystemProviderError(error).toString() + ")", files_1.toFileOperationResult(error), options);
        fileOperationError.stack = fileOperationError.stack + "\nCaused by: " + error.stack;
        return fileOperationError;
    };
    FileService.prototype.readFileUnbuffered = function (provider, resource, options) {
        return __awaiter(this, void 0, void 0, function () {
            var buffer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, provider.readFile(resource)];
                    case 1:
                        buffer = _a.sent();
                        // respect position option
                        if (options && typeof options.position === 'number') {
                            buffer = buffer.slice(options.position);
                        }
                        // respect length option
                        if (options && typeof options.length === 'number') {
                            buffer = buffer.slice(0, options.length);
                        }
                        // Throw if file is too large to load
                        this.validateReadFileLimits(resource, buffer.byteLength, options);
                        return [2 /*return*/, buffer_1.BinaryBufferReadableStream.fromBuffer(buffer_1.BinaryBuffer.wrap(buffer))];
                }
            });
        });
    };
    FileService.prototype.validateReadFile = function (resource, options) {
        return __awaiter(this, void 0, void 0, function () {
            var stat;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resolve(resource, { resolveMetadata: true })];
                    case 1:
                        stat = _a.sent();
                        // Throw if resource is a directory
                        if (stat.isDirectory) {
                            throw new files_1.FileOperationError("Unable to read file '" + this.resourceForError(resource) + "' that is actually a directory", 0 /* FILE_IS_DIRECTORY */, options);
                        }
                        // Throw if file not modified since (unless disabled)
                        if (options && typeof options.etag === 'string' && options.etag !== files_1.ETAG_DISABLED && options.etag === stat.etag) {
                            throw new files_1.FileOperationError('File not modified since', 2 /* FILE_NOT_MODIFIED_SINCE */, options);
                        }
                        // Throw if file is too large to load
                        this.validateReadFileLimits(resource, stat.size, options);
                        return [2 /*return*/, stat];
                }
            });
        });
    };
    FileService.prototype.validateReadFileLimits = function (resource, size, options) {
        if (options === null || options === void 0 ? void 0 : options.limits) {
            var tooLargeErrorResult = undefined;
            if (typeof options.limits.memory === 'number' && size > options.limits.memory) {
                tooLargeErrorResult = 9 /* FILE_EXCEEDS_MEMORY_LIMIT */;
            }
            if (typeof options.limits.size === 'number' && size > options.limits.size) {
                tooLargeErrorResult = 7 /* FILE_TOO_LARGE */;
            }
            if (typeof tooLargeErrorResult === 'number') {
                throw new files_1.FileOperationError("Unable to read file '" + this.resourceForError(resource) + "' that is too large to open", tooLargeErrorResult);
            }
        }
    };
    // #endregion
    // #region Move/Copy/Delete/Create Folder
    FileService.prototype.move = function (source, target, options) {
        return __awaiter(this, void 0, void 0, function () {
            var event, stat, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if ((options === null || options === void 0 ? void 0 : options.fromUserGesture) === false) {
                            return [2 /*return*/, this.doMove(source, target, options.overwrite)];
                        }
                        return [4 /*yield*/, this.runFileOperationParticipants(target, source, 2 /* MOVE */)];
                    case 1:
                        _a.sent();
                        event = { correlationId: this.correlationIds++, operation: 2 /* MOVE */, target: target, source: source };
                        return [4 /*yield*/, this.onWillRunUserOperationEmitter.fire(event)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 7]);
                        return [4 /*yield*/, this.doMove(source, target, options === null || options === void 0 ? void 0 : options.overwrite)];
                    case 4:
                        stat = _a.sent();
                        return [3 /*break*/, 7];
                    case 5:
                        error_12 = _a.sent();
                        return [4 /*yield*/, this.onDidFailUserOperationEmitter.fire(event)];
                    case 6:
                        _a.sent();
                        throw error_12;
                    case 7: return [4 /*yield*/, this.onDidRunUserOperationEmitter.fire(event)];
                    case 8:
                        _a.sent();
                        return [2 /*return*/, stat];
                }
            });
        });
    };
    FileService.prototype.doMove = function (source, target, overwrite) {
        return __awaiter(this, void 0, void 0, function () {
            var sourceProvider, _a, targetProvider, _b, mode, fileStat;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.throwIfFileSystemIsReadonly;
                        return [4 /*yield*/, this.withWriteProvider(source)];
                    case 1:
                        sourceProvider = _a.apply(this, [_c.sent(), source]);
                        _b = this.throwIfFileSystemIsReadonly;
                        return [4 /*yield*/, this.withWriteProvider(target)];
                    case 2:
                        targetProvider = _b.apply(this, [_c.sent(), target]);
                        return [4 /*yield*/, this.doMoveCopy(sourceProvider, source, targetProvider, target, 'move', !!overwrite)];
                    case 3:
                        mode = _c.sent();
                        return [4 /*yield*/, this.resolve(target, { resolveMetadata: true })];
                    case 4:
                        fileStat = _c.sent();
                        this.onDidRunOperationEmitter.fire(new files_1.FileOperationEvent(source, mode === 'move' ? 2 /* MOVE */ : 3 /* COPY */, fileStat));
                        return [2 /*return*/, fileStat];
                }
            });
        });
    };
    FileService.prototype.copy = function (source, target, options) {
        return __awaiter(this, void 0, void 0, function () {
            var event, stat, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if ((options === null || options === void 0 ? void 0 : options.fromUserGesture) === false) {
                            return [2 /*return*/, this.doCopy(source, target, options.overwrite)];
                        }
                        return [4 /*yield*/, this.runFileOperationParticipants(target, source, 3 /* COPY */)];
                    case 1:
                        _a.sent();
                        event = { correlationId: this.correlationIds++, operation: 3 /* COPY */, target: target, source: source };
                        return [4 /*yield*/, this.onWillRunUserOperationEmitter.fire(event)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 7]);
                        return [4 /*yield*/, this.doCopy(source, target, options === null || options === void 0 ? void 0 : options.overwrite)];
                    case 4:
                        stat = _a.sent();
                        return [3 /*break*/, 7];
                    case 5:
                        error_13 = _a.sent();
                        return [4 /*yield*/, this.onDidFailUserOperationEmitter.fire(event)];
                    case 6:
                        _a.sent();
                        throw error_13;
                    case 7: return [4 /*yield*/, this.onDidRunUserOperationEmitter.fire(event)];
                    case 8:
                        _a.sent();
                        return [2 /*return*/, stat];
                }
            });
        });
    };
    FileService.prototype.doCopy = function (source, target, overwrite) {
        return __awaiter(this, void 0, void 0, function () {
            var sourceProvider, targetProvider, _a, mode, fileStat;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.withReadProvider(source)];
                    case 1:
                        sourceProvider = _b.sent();
                        _a = this.throwIfFileSystemIsReadonly;
                        return [4 /*yield*/, this.withWriteProvider(target)];
                    case 2:
                        targetProvider = _a.apply(this, [_b.sent(), target]);
                        return [4 /*yield*/, this.doMoveCopy(sourceProvider, source, targetProvider, target, 'copy', !!overwrite)];
                    case 3:
                        mode = _b.sent();
                        return [4 /*yield*/, this.resolve(target, { resolveMetadata: true })];
                    case 4:
                        fileStat = _b.sent();
                        this.onDidRunOperationEmitter.fire(new files_1.FileOperationEvent(source, mode === 'copy' ? 3 /* COPY */ : 2 /* MOVE */, fileStat));
                        return [2 /*return*/, fileStat];
                }
            });
        });
    };
    FileService.prototype.doMoveCopy = function (sourceProvider, source, targetProvider, target, mode, overwrite) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, exists, isSameResourceWithDifferentPathCase, parent_1, name_1, sourceFile;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (source.toString() === target.toString()) {
                            return [2 /*return*/, mode]; // simulate node.js behaviour here and do a no-op if paths match
                        }
                        return [4 /*yield*/, this.doValidateMoveCopy(sourceProvider, source, targetProvider, target, mode, overwrite)];
                    case 1:
                        _a = _b.sent(), exists = _a.exists, isSameResourceWithDifferentPathCase = _a.isSameResourceWithDifferentPathCase;
                        if (!(exists && !overwrite)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.resolve(target.parent)];
                    case 2:
                        parent_1 = _b.sent();
                        name_1 = target.path.name + '_copy';
                        target = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(target.parent, parent_1, name_1, target.path.ext);
                        _b.label = 3;
                    case 3:
                        if (!(exists && !isSameResourceWithDifferentPathCase && overwrite)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.delete(target, { recursive: true })];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5: 
                    // create parent folders
                    return [4 /*yield*/, this.mkdirp(targetProvider, target.parent)];
                    case 6:
                        // create parent folders
                        _b.sent();
                        if (!(mode === 'copy')) return [3 /*break*/, 14];
                        if (!(sourceProvider === targetProvider && files_1.hasFileFolderCopyCapability(sourceProvider))) return [3 /*break*/, 8];
                        return [4 /*yield*/, sourceProvider.copy(source, target, { overwrite: overwrite })];
                    case 7:
                        _b.sent();
                        return [3 /*break*/, 13];
                    case 8: return [4 /*yield*/, this.resolve(source)];
                    case 9:
                        sourceFile = _b.sent();
                        if (!sourceFile.isDirectory) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.doCopyFolder(sourceProvider, sourceFile, targetProvider, target)];
                    case 10:
                        _b.sent();
                        return [3 /*break*/, 13];
                    case 11: return [4 /*yield*/, this.doCopyFile(sourceProvider, source, targetProvider, target)];
                    case 12:
                        _b.sent();
                        _b.label = 13;
                    case 13: return [2 /*return*/, mode];
                    case 14:
                        if (!(sourceProvider === targetProvider)) return [3 /*break*/, 16];
                        return [4 /*yield*/, sourceProvider.rename(source, target, { overwrite: overwrite })];
                    case 15:
                        _b.sent();
                        return [2 /*return*/, mode];
                    case 16: return [4 /*yield*/, this.doMoveCopy(sourceProvider, source, targetProvider, target, 'copy', overwrite)];
                    case 17:
                        _b.sent();
                        return [4 /*yield*/, this.delete(source, { recursive: true })];
                    case 18:
                        _b.sent();
                        return [2 /*return*/, 'copy'];
                }
            });
        });
    };
    FileService.prototype.doCopyFile = function (sourceProvider, source, targetProvider, target) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // copy: source (buffered) => target (buffered)
                if (files_1.hasOpenReadWriteCloseCapability(sourceProvider) && files_1.hasOpenReadWriteCloseCapability(targetProvider)) {
                    return [2 /*return*/, this.doPipeBuffered(sourceProvider, source, targetProvider, target)];
                }
                // copy: source (buffered) => target (unbuffered)
                if (files_1.hasOpenReadWriteCloseCapability(sourceProvider) && files_1.hasReadWriteCapability(targetProvider)) {
                    return [2 /*return*/, this.doPipeBufferedToUnbuffered(sourceProvider, source, targetProvider, target)];
                }
                // copy: source (unbuffered) => target (buffered)
                if (files_1.hasReadWriteCapability(sourceProvider) && files_1.hasOpenReadWriteCloseCapability(targetProvider)) {
                    return [2 /*return*/, this.doPipeUnbufferedToBuffered(sourceProvider, source, targetProvider, target)];
                }
                // copy: source (unbuffered) => target (unbuffered)
                if (files_1.hasReadWriteCapability(sourceProvider) && files_1.hasReadWriteCapability(targetProvider)) {
                    return [2 /*return*/, this.doPipeUnbuffered(sourceProvider, source, targetProvider, target)];
                }
                return [2 /*return*/];
            });
        });
    };
    FileService.prototype.doCopyFolder = function (sourceProvider, sourceFolder, targetProvider, targetFolder) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // create folder in target
                    return [4 /*yield*/, targetProvider.mkdir(targetFolder)];
                    case 1:
                        // create folder in target
                        _a.sent();
                        if (!Array.isArray(sourceFolder.children)) return [3 /*break*/, 3];
                        return [4 /*yield*/, Promise.all(sourceFolder.children.map(function (sourceChild) { return __awaiter(_this, void 0, void 0, function () {
                                var targetChild, _a, _b;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            targetChild = targetFolder.resolve(sourceChild.name);
                                            if (!sourceChild.isDirectory) return [3 /*break*/, 2];
                                            _a = this.doCopyFolder;
                                            _b = [sourceProvider];
                                            return [4 /*yield*/, this.resolve(sourceChild.resource)];
                                        case 1: return [2 /*return*/, _a.apply(this, _b.concat([_c.sent(), targetProvider, targetChild]))];
                                        case 2: return [2 /*return*/, this.doCopyFile(sourceProvider, sourceChild.resource, targetProvider, targetChild)];
                                    }
                                });
                            }); }))];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FileService.prototype.doValidateMoveCopy = function (sourceProvider, source, targetProvider, target, mode, overwrite) {
        return __awaiter(this, void 0, void 0, function () {
            var isSameResourceWithDifferentPathCase, isPathCaseSensitive, exists, isPathCaseSensitive;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isSameResourceWithDifferentPathCase = false;
                        // Check if source is equal or parent to target (requires providers to be the same)
                        if (sourceProvider === targetProvider) {
                            isPathCaseSensitive = !!(sourceProvider.capabilities & 1024 /* PathCaseSensitive */);
                            if (!isPathCaseSensitive) {
                                isSameResourceWithDifferentPathCase = source.toString().toLowerCase() === target.toString().toLowerCase();
                            }
                            if (isSameResourceWithDifferentPathCase && mode === 'copy') {
                                throw new Error("Unable to copy when source '" + this.resourceForError(source) + "' is same as target '" + this.resourceForError(target) + "' with different path case on a case insensitive file system");
                            }
                            if (!isSameResourceWithDifferentPathCase && target.isEqualOrParent(source, isPathCaseSensitive)) {
                                throw new Error("Unable to move/copy when source '" + this.resourceForError(source) + "' is parent of target '" + this.resourceForError(target) + "'.");
                            }
                        }
                        return [4 /*yield*/, this.exists(target)];
                    case 1:
                        exists = _a.sent();
                        if (exists && !isSameResourceWithDifferentPathCase) {
                            // Special case: if the target is a parent of the source, we cannot delete
                            // it as it would delete the source as well. In this case we have to throw
                            if (sourceProvider === targetProvider) {
                                isPathCaseSensitive = !!(sourceProvider.capabilities & 1024 /* PathCaseSensitive */);
                                if (source.isEqualOrParent(target, isPathCaseSensitive)) {
                                    throw new Error("Unable to move/copy '" + this.resourceForError(source) + "' into '" + this.resourceForError(target) + "' since a file would replace the folder it is contained in.");
                                }
                            }
                        }
                        return [2 /*return*/, { exists: exists, isSameResourceWithDifferentPathCase: isSameResourceWithDifferentPathCase }];
                }
            });
        });
    };
    FileService.prototype.createFolder = function (resource) {
        return __awaiter(this, void 0, void 0, function () {
            var provider, _a, fileStat;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.throwIfFileSystemIsReadonly;
                        return [4 /*yield*/, this.withProvider(resource)];
                    case 1:
                        provider = _a.apply(this, [_b.sent(), resource]);
                        // mkdir recursively
                        return [4 /*yield*/, this.mkdirp(provider, resource)];
                    case 2:
                        // mkdir recursively
                        _b.sent();
                        return [4 /*yield*/, this.resolve(resource, { resolveMetadata: true })];
                    case 3:
                        fileStat = _b.sent();
                        this.onDidRunOperationEmitter.fire(new files_1.FileOperationEvent(resource, 0 /* CREATE */, fileStat));
                        return [2 /*return*/, fileStat];
                }
            });
        });
    };
    FileService.prototype.mkdirp = function (provider, directory) {
        return __awaiter(this, void 0, void 0, function () {
            var directoriesToCreate, stat, error_14, i, error_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        directoriesToCreate = [];
                        _a.label = 1;
                    case 1:
                        if (!!directory.path.isRoot) return [3 /*break*/, 6];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, provider.stat(directory)];
                    case 3:
                        stat = _a.sent();
                        if ((stat.type & files_1.FileType.Directory) === 0) {
                            throw new Error("Unable to create folder " + this.resourceForError(directory) + " that already exists but is not a directory");
                        }
                        return [3 /*break*/, 6]; // we have hit a directory that exists -> good
                    case 4:
                        error_14 = _a.sent();
                        // Bubble up any other error that is not file not found
                        if (files_1.toFileSystemProviderErrorCode(error_14) !== files_1.FileSystemProviderErrorCode.FileNotFound) {
                            throw error_14;
                        }
                        // Upon error, remember directories that need to be created
                        directoriesToCreate.push(directory.path.base);
                        // Continue up
                        directory = directory.parent;
                        return [3 /*break*/, 5];
                    case 5: return [3 /*break*/, 1];
                    case 6:
                        i = directoriesToCreate.length - 1;
                        _a.label = 7;
                    case 7:
                        if (!(i >= 0)) return [3 /*break*/, 12];
                        directory = directory.resolve(directoriesToCreate[i]);
                        _a.label = 8;
                    case 8:
                        _a.trys.push([8, 10, , 11]);
                        return [4 /*yield*/, provider.mkdir(directory)];
                    case 9:
                        _a.sent();
                        return [3 /*break*/, 11];
                    case 10:
                        error_15 = _a.sent();
                        if (files_1.toFileSystemProviderErrorCode(error_15) !== files_1.FileSystemProviderErrorCode.FileExists) {
                            // For mkdirp() we tolerate that the mkdir() call fails
                            // in case the folder already exists. This follows node.js
                            // own implementation of fs.mkdir({ recursive: true }) and
                            // reduces the chances of race conditions leading to errors
                            // if multiple calls try to create the same folders
                            // As such, we only throw an error here if it is other than
                            // the fact that the file already exists.
                            // (see also https://github.com/microsoft/vscode/issues/89834)
                            throw error_15;
                        }
                        return [3 /*break*/, 11];
                    case 11:
                        i--;
                        return [3 /*break*/, 7];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    FileService.prototype.delete = function (resource, options) {
        return __awaiter(this, void 0, void 0, function () {
            var event, error_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if ((options === null || options === void 0 ? void 0 : options.fromUserGesture) === false) {
                            return [2 /*return*/, this.doDelete(resource, options)];
                        }
                        return [4 /*yield*/, this.runFileOperationParticipants(resource, undefined, 1 /* DELETE */)];
                    case 1:
                        _a.sent();
                        event = { correlationId: this.correlationIds++, operation: 1 /* DELETE */, target: resource };
                        return [4 /*yield*/, this.onWillRunUserOperationEmitter.fire(event)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 7]);
                        return [4 /*yield*/, this.doDelete(resource, options)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 5:
                        error_16 = _a.sent();
                        return [4 /*yield*/, this.onDidFailUserOperationEmitter.fire(event)];
                    case 6:
                        _a.sent();
                        throw error_16;
                    case 7: return [4 /*yield*/, this.onDidRunUserOperationEmitter.fire(event)];
                    case 8:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FileService.prototype.doDelete = function (resource, options) {
        return __awaiter(this, void 0, void 0, function () {
            var provider, _a, useTrash, exists, recursive, stat;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.throwIfFileSystemIsReadonly;
                        return [4 /*yield*/, this.withProvider(resource)];
                    case 1:
                        provider = _a.apply(this, [_b.sent(), resource]);
                        useTrash = !!(options === null || options === void 0 ? void 0 : options.useTrash);
                        if (useTrash && !(provider.capabilities & 4096 /* Trash */)) {
                            throw new Error("Unable to delete file '" + this.resourceForError(resource) + "' via trash because provider does not support it.");
                        }
                        return [4 /*yield*/, this.exists(resource)];
                    case 2:
                        exists = _b.sent();
                        if (!exists) {
                            throw new files_1.FileOperationError("Unable to delete non-existing file '" + this.resourceForError(resource) + "'", 1 /* FILE_NOT_FOUND */);
                        }
                        recursive = !!(options === null || options === void 0 ? void 0 : options.recursive);
                        if (!(!recursive && exists)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.resolve(resource)];
                    case 3:
                        stat = _b.sent();
                        if (stat.isDirectory && Array.isArray(stat.children) && stat.children.length > 0) {
                            throw new Error("Unable to delete non-empty folder '" + this.resourceForError(resource) + "'.");
                        }
                        _b.label = 4;
                    case 4: 
                    // Delete through provider
                    return [4 /*yield*/, provider.delete(resource, { recursive: recursive, useTrash: useTrash })];
                    case 5:
                        // Delete through provider
                        _b.sent();
                        // Events
                        this.onDidRunOperationEmitter.fire(new files_1.FileOperationEvent(resource, 1 /* DELETE */));
                        return [2 /*return*/];
                }
            });
        });
    };
    FileService.prototype.watch = function (resource, options) {
        if (options === void 0) { options = { recursive: false, excludes: [] }; }
        var resolvedOptions = __assign(__assign({}, options), { 
            // always ignore temporary upload files
            excludes: options.excludes.concat('**/theia_upload_*') });
        var watchDisposed = false;
        var watchDisposable = disposable_1.Disposable.create(function () { return watchDisposed = true; });
        // Watch and wire in disposable which is async but
        // check if we got disposed meanwhile and forward
        this.doWatch(resource, resolvedOptions).then(function (disposable) {
            if (watchDisposed) {
                disposable.dispose();
            }
            else {
                watchDisposable = disposable;
            }
        }, function (error) { return console.error(error); });
        return disposable_1.Disposable.create(function () { return watchDisposable.dispose(); });
    };
    FileService.prototype.doWatch = function (resource, options) {
        return __awaiter(this, void 0, void 0, function () {
            var provider, key, watcher;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.withProvider(resource)];
                    case 1:
                        provider = _a.sent();
                        key = this.toWatchKey(provider, resource, options);
                        watcher = this.activeWatchers.get(key) || { count: 0, disposable: provider.watch(resource, options) };
                        if (!this.activeWatchers.has(key)) {
                            this.activeWatchers.set(key, watcher);
                        }
                        // Increment usage counter
                        watcher.count += 1;
                        return [2 /*return*/, disposable_1.Disposable.create(function () {
                                // Unref
                                watcher.count--;
                                // Dispose only when last user is reached
                                if (watcher.count === 0) {
                                    watcher.disposable.dispose();
                                    _this.activeWatchers.delete(key);
                                }
                            })];
                }
            });
        });
    };
    FileService.prototype.toWatchKey = function (provider, resource, options) {
        return [
            this.toMapKey(provider, resource),
            String(options.recursive),
            options.excludes.join() // use excludes as part of the key
        ].join();
    };
    FileService.prototype.ensureWriteQueue = function (provider, resource, task) {
        // ensure to never write to the same resource without finishing
        // the one write. this ensures a write finishes consistently
        // (even with error) before another write is done.
        var queueKey = this.toMapKey(provider, resource);
        var writeQueue = (this.writeQueues.get(queueKey) || Promise.resolve()).then(task, task);
        this.writeQueues.set(queueKey, writeQueue);
        return writeQueue;
    };
    FileService.prototype.toMapKey = function (provider, resource) {
        var isPathCaseSensitive = !!(provider.capabilities & 1024 /* PathCaseSensitive */);
        return isPathCaseSensitive ? resource.toString() : resource.toString().toLowerCase();
    };
    FileService.prototype.doWriteBuffered = function (provider, resource, readableOrStreamOrBufferedStream) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.ensureWriteQueue(provider, resource, function () { return __awaiter(_this, void 0, void 0, function () {
                        var handle, error_17;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, provider.open(resource, { create: true })];
                                case 1:
                                    handle = _a.sent();
                                    _a.label = 2;
                                case 2:
                                    _a.trys.push([2, 7, 8, 10]);
                                    if (!(stream_1.isReadableStream(readableOrStreamOrBufferedStream) || stream_1.isReadableBufferedStream(readableOrStreamOrBufferedStream))) return [3 /*break*/, 4];
                                    return [4 /*yield*/, this.doWriteStreamBufferedQueued(provider, handle, readableOrStreamOrBufferedStream)];
                                case 3:
                                    _a.sent();
                                    return [3 /*break*/, 6];
                                case 4: return [4 /*yield*/, this.doWriteReadableBufferedQueued(provider, handle, readableOrStreamOrBufferedStream)];
                                case 5:
                                    _a.sent();
                                    _a.label = 6;
                                case 6: return [3 /*break*/, 10];
                                case 7:
                                    error_17 = _a.sent();
                                    throw files_1.ensureFileSystemProviderError(error_17);
                                case 8: 
                                // close handle always
                                return [4 /*yield*/, provider.close(handle)];
                                case 9:
                                    // close handle always
                                    _a.sent();
                                    return [7 /*endfinally*/];
                                case 10: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    FileService.prototype.doWriteStreamBufferedQueued = function (provider, handle, streamOrBufferedStream) {
        return __awaiter(this, void 0, void 0, function () {
            var posInFile, stream, chunk;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        posInFile = 0;
                        if (!stream_1.isReadableBufferedStream(streamOrBufferedStream)) return [3 /*break*/, 3];
                        if (!(streamOrBufferedStream.buffer.length > 0)) return [3 /*break*/, 2];
                        chunk = buffer_1.BinaryBuffer.concat(streamOrBufferedStream.buffer);
                        return [4 /*yield*/, this.doWriteBuffer(provider, handle, chunk, chunk.byteLength, posInFile, 0)];
                    case 1:
                        _a.sent();
                        posInFile += chunk.byteLength;
                        _a.label = 2;
                    case 2:
                        // If the stream has been consumed, return early
                        if (streamOrBufferedStream.ended) {
                            return [2 /*return*/];
                        }
                        stream = streamOrBufferedStream.stream;
                        return [3 /*break*/, 4];
                    case 3:
                        stream = streamOrBufferedStream;
                        _a.label = 4;
                    case 4: return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                stream.on('data', function (chunk) { return __awaiter(_this, void 0, void 0, function () {
                                    var error_18;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                // pause stream to perform async write operation
                                                stream.pause();
                                                _a.label = 1;
                                            case 1:
                                                _a.trys.push([1, 3, , 4]);
                                                return [4 /*yield*/, this.doWriteBuffer(provider, handle, chunk, chunk.byteLength, posInFile, 0)];
                                            case 2:
                                                _a.sent();
                                                return [3 /*break*/, 4];
                                            case 3:
                                                error_18 = _a.sent();
                                                return [2 /*return*/, reject(error_18)];
                                            case 4:
                                                posInFile += chunk.byteLength;
                                                // resume stream now that we have successfully written
                                                // run this on the next tick to prevent increasing the
                                                // execution stack because resume() may call the event
                                                // handler again before finishing.
                                                setTimeout(function () { return stream.resume(); });
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                                stream.on('error', function (error) { return reject(error); });
                                stream.on('end', function () { return resolve(); });
                                return [2 /*return*/];
                            });
                        }); })];
                }
            });
        });
    };
    FileService.prototype.doWriteReadableBufferedQueued = function (provider, handle, readable) {
        return __awaiter(this, void 0, void 0, function () {
            var posInFile, chunk;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        posInFile = 0;
                        _a.label = 1;
                    case 1:
                        if (!((chunk = readable.read()) !== null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.doWriteBuffer(provider, handle, chunk, chunk.byteLength, posInFile, 0)];
                    case 2:
                        _a.sent();
                        posInFile += chunk.byteLength;
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FileService.prototype.doWriteBuffer = function (provider, handle, buffer, length, posInFile, posInBuffer) {
        return __awaiter(this, void 0, void 0, function () {
            var totalBytesWritten, bytesWritten;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        totalBytesWritten = 0;
                        _a.label = 1;
                    case 1:
                        if (!(totalBytesWritten < length)) return [3 /*break*/, 3];
                        return [4 /*yield*/, provider.write(handle, posInFile + totalBytesWritten, buffer.buffer, posInBuffer + totalBytesWritten, length - totalBytesWritten)];
                    case 2:
                        bytesWritten = _a.sent();
                        totalBytesWritten += bytesWritten;
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FileService.prototype.doWriteUnbuffered = function (provider, resource, bufferOrReadableOrStreamOrBufferedStream) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.ensureWriteQueue(provider, resource, function () { return _this.doWriteUnbufferedQueued(provider, resource, bufferOrReadableOrStreamOrBufferedStream); })];
            });
        });
    };
    FileService.prototype.doWriteUnbufferedQueued = function (provider, resource, bufferOrReadableOrStreamOrBufferedStream) {
        return __awaiter(this, void 0, void 0, function () {
            var buffer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(bufferOrReadableOrStreamOrBufferedStream instanceof buffer_1.BinaryBuffer)) return [3 /*break*/, 1];
                        buffer = bufferOrReadableOrStreamOrBufferedStream;
                        return [3 /*break*/, 6];
                    case 1:
                        if (!stream_1.isReadableStream(bufferOrReadableOrStreamOrBufferedStream)) return [3 /*break*/, 3];
                        return [4 /*yield*/, buffer_1.BinaryBufferReadableStream.toBuffer(bufferOrReadableOrStreamOrBufferedStream)];
                    case 2:
                        buffer = _a.sent();
                        return [3 /*break*/, 6];
                    case 3:
                        if (!stream_1.isReadableBufferedStream(bufferOrReadableOrStreamOrBufferedStream)) return [3 /*break*/, 5];
                        return [4 /*yield*/, buffer_1.BinaryBufferReadableBufferedStream.toBuffer(bufferOrReadableOrStreamOrBufferedStream)];
                    case 4:
                        buffer = _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        buffer = buffer_1.BinaryBufferReadable.toBuffer(bufferOrReadableOrStreamOrBufferedStream);
                        _a.label = 6;
                    case 6: return [2 /*return*/, provider.writeFile(resource, buffer.buffer, { create: true, overwrite: true })];
                }
            });
        });
    };
    FileService.prototype.doPipeBuffered = function (sourceProvider, source, targetProvider, target) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.ensureWriteQueue(targetProvider, target, function () { return _this.doPipeBufferedQueued(sourceProvider, source, targetProvider, target); })];
            });
        });
    };
    FileService.prototype.doPipeBufferedQueued = function (sourceProvider, source, targetProvider, target) {
        return __awaiter(this, void 0, void 0, function () {
            var sourceHandle, targetHandle, buffer, posInFile, posInBuffer, bytesRead, error_19;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sourceHandle = undefined;
                        targetHandle = undefined;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 9, 10, 12]);
                        return [4 /*yield*/, sourceProvider.open(source, { create: false })];
                    case 2:
                        // Open handles
                        sourceHandle = _a.sent();
                        return [4 /*yield*/, targetProvider.open(target, { create: true })];
                    case 3:
                        targetHandle = _a.sent();
                        buffer = buffer_1.BinaryBuffer.alloc(this.BUFFER_SIZE);
                        posInFile = 0;
                        posInBuffer = 0;
                        bytesRead = 0;
                        _a.label = 4;
                    case 4: return [4 /*yield*/, sourceProvider.read(sourceHandle, posInFile, buffer.buffer, posInBuffer, buffer.byteLength - posInBuffer)];
                    case 5:
                        // read from source (sourceHandle) at current position (posInFile) into buffer (buffer) at
                        // buffer position (posInBuffer) up to the size of the buffer (buffer.byteLength).
                        bytesRead = _a.sent();
                        // write into target (targetHandle) at current position (posInFile) from buffer (buffer) at
                        // buffer position (posInBuffer) all bytes we read (bytesRead).
                        return [4 /*yield*/, this.doWriteBuffer(targetProvider, targetHandle, buffer, bytesRead, posInFile, posInBuffer)];
                    case 6:
                        // write into target (targetHandle) at current position (posInFile) from buffer (buffer) at
                        // buffer position (posInBuffer) all bytes we read (bytesRead).
                        _a.sent();
                        posInFile += bytesRead;
                        posInBuffer += bytesRead;
                        // when buffer full, fill it again from the beginning
                        if (posInBuffer === buffer.byteLength) {
                            posInBuffer = 0;
                        }
                        _a.label = 7;
                    case 7:
                        if (bytesRead > 0) return [3 /*break*/, 4];
                        _a.label = 8;
                    case 8: return [3 /*break*/, 12];
                    case 9:
                        error_19 = _a.sent();
                        throw files_1.ensureFileSystemProviderError(error_19);
                    case 10: return [4 /*yield*/, Promise.all([
                            typeof sourceHandle === 'number' ? sourceProvider.close(sourceHandle) : Promise.resolve(),
                            typeof targetHandle === 'number' ? targetProvider.close(targetHandle) : Promise.resolve(),
                        ])];
                    case 11:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    FileService.prototype.doPipeUnbuffered = function (sourceProvider, source, targetProvider, target) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.ensureWriteQueue(targetProvider, target, function () { return _this.doPipeUnbufferedQueued(sourceProvider, source, targetProvider, target); })];
            });
        });
    };
    FileService.prototype.doPipeUnbufferedQueued = function (sourceProvider, source, targetProvider, target) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = (_a = targetProvider).writeFile;
                        _c = [target];
                        return [4 /*yield*/, sourceProvider.readFile(source)];
                    case 1: return [2 /*return*/, _b.apply(_a, _c.concat([_d.sent(), { create: true, overwrite: true }]))];
                }
            });
        });
    };
    FileService.prototype.doPipeUnbufferedToBuffered = function (sourceProvider, source, targetProvider, target) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.ensureWriteQueue(targetProvider, target, function () { return _this.doPipeUnbufferedToBufferedQueued(sourceProvider, source, targetProvider, target); })];
            });
        });
    };
    FileService.prototype.doPipeUnbufferedToBufferedQueued = function (sourceProvider, source, targetProvider, target) {
        return __awaiter(this, void 0, void 0, function () {
            var targetHandle, buffer, error_20;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, targetProvider.open(target, { create: true })];
                    case 1:
                        targetHandle = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, 6, 8]);
                        return [4 /*yield*/, sourceProvider.readFile(source)];
                    case 3:
                        buffer = _a.sent();
                        return [4 /*yield*/, this.doWriteBuffer(targetProvider, targetHandle, buffer_1.BinaryBuffer.wrap(buffer), buffer.byteLength, 0, 0)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 5:
                        error_20 = _a.sent();
                        throw files_1.ensureFileSystemProviderError(error_20);
                    case 6: return [4 /*yield*/, targetProvider.close(targetHandle)];
                    case 7:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    FileService.prototype.doPipeBufferedToUnbuffered = function (sourceProvider, source, targetProvider, target) {
        return __awaiter(this, void 0, void 0, function () {
            var buffer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, buffer_1.BinaryBufferReadableStream.toBuffer(this.readFileBuffered(sourceProvider, source, cancellation_1.CancellationToken.None))];
                    case 1:
                        buffer = _a.sent();
                        // Write buffer into target at once
                        return [4 /*yield*/, this.doWriteUnbuffered(targetProvider, target, buffer)];
                    case 2:
                        // Write buffer into target at once
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FileService.prototype.throwIfFileSystemIsReadonly = function (provider, resource) {
        if (provider.capabilities & 2048 /* Readonly */) {
            throw new files_1.FileOperationError("Unable to modify readonly file " + this.resourceForError(resource), 6 /* FILE_PERMISSION_DENIED */);
        }
        return provider;
    };
    FileService.prototype.resourceForError = function (resource) {
        return this.labelProvider.getLongName(resource);
    };
    FileService.prototype.addFileOperationParticipant = function (participant) {
        var _this = this;
        this.participants.push(participant);
        return disposable_1.Disposable.create(function () {
            var index = _this.participants.indexOf(participant);
            if (index > -1) {
                _this.participants.splice(index, 1);
            }
        });
    };
    FileService.prototype.runFileOperationParticipants = function (target, source, operation) {
        return __awaiter(this, void 0, void 0, function () {
            var participantsTimeout, cancellationTokenSource;
            var _this = this;
            return __generator(this, function (_a) {
                participantsTimeout = this.preferences['files.participants.timeout'];
                if (participantsTimeout <= 0) {
                    return [2 /*return*/];
                }
                cancellationTokenSource = new cancellation_1.CancellationTokenSource();
                return [2 /*return*/, this.progressService.withProgress(this.progressLabel(operation), 'window', function () { return __awaiter(_this, void 0, void 0, function () {
                        var _a, _b, participant, promise, err_1, e_2_1;
                        var e_2, _c;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    _d.trys.push([0, 7, 8, 9]);
                                    _a = __values(this.participants), _b = _a.next();
                                    _d.label = 1;
                                case 1:
                                    if (!!_b.done) return [3 /*break*/, 6];
                                    participant = _b.value;
                                    if (cancellationTokenSource.token.isCancellationRequested) {
                                        return [3 /*break*/, 6];
                                    }
                                    _d.label = 2;
                                case 2:
                                    _d.trys.push([2, 4, , 5]);
                                    promise = participant.participate(target, source, operation, participantsTimeout, cancellationTokenSource.token);
                                    return [4 /*yield*/, Promise.race([
                                            promise,
                                            promise_util_1.timeout(participantsTimeout, cancellationTokenSource.token).then(function () { return cancellationTokenSource.dispose(); }, function () { })
                                        ])];
                                case 3:
                                    _d.sent();
                                    return [3 /*break*/, 5];
                                case 4:
                                    err_1 = _d.sent();
                                    console.warn(err_1);
                                    return [3 /*break*/, 5];
                                case 5:
                                    _b = _a.next();
                                    return [3 /*break*/, 1];
                                case 6: return [3 /*break*/, 9];
                                case 7:
                                    e_2_1 = _d.sent();
                                    e_2 = { error: e_2_1 };
                                    return [3 /*break*/, 9];
                                case 8:
                                    try {
                                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                                    }
                                    finally { if (e_2) throw e_2.error; }
                                    return [7 /*endfinally*/];
                                case 9: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    FileService.prototype.progressLabel = function (operation) {
        switch (operation) {
            case 0 /* CREATE */:
                return "Running 'File Create' participants...";
            case 2 /* MOVE */:
                return "Running 'File Rename' participants...";
            case 3 /* COPY */:
                return "Running 'File Copy' participants...";
            case 1 /* DELETE */:
                return "Running 'File Delete' participants...";
        }
    };
    // #endregion
    // #region encoding
    FileService.prototype.getWriteEncoding = function (resource, options) {
        return __awaiter(this, void 0, void 0, function () {
            var encoding;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getEncodingForResource(resource, options ? options.encoding : undefined)];
                    case 1:
                        encoding = _a.sent();
                        return [2 /*return*/, this.encodingService.toResourceEncoding(encoding, {
                                overwriteEncoding: options === null || options === void 0 ? void 0 : options.overwriteEncoding,
                                read: function (length) { return __awaiter(_this, void 0, void 0, function () {
                                    var buffer, _a, _b;
                                    return __generator(this, function (_c) {
                                        switch (_c.label) {
                                            case 0:
                                                _b = (_a = buffer_1.BinaryBufferReadableStream).toBuffer;
                                                return [4 /*yield*/, this.readFileStream(resource, { length: length })];
                                            case 1: return [4 /*yield*/, _b.apply(_a, [(_c.sent()).value])];
                                            case 2:
                                                buffer = _c.sent();
                                                return [2 /*return*/, buffer.buffer];
                                        }
                                    });
                                }); }
                            })];
                }
            });
        });
    };
    FileService.prototype.getReadEncoding = function (resource, options, detectedEncoding) {
        var preferredEncoding;
        // Encoding passed in as option
        if (options === null || options === void 0 ? void 0 : options.encoding) {
            if (detectedEncoding === encodings_1.UTF8_with_bom && options.encoding === encodings_1.UTF8) {
                preferredEncoding = encodings_1.UTF8_with_bom; // indicate the file has BOM if we are to resolve with UTF 8
            }
            else {
                preferredEncoding = options.encoding; // give passed in encoding highest priority
            }
        }
        else if (detectedEncoding) {
            preferredEncoding = detectedEncoding;
        }
        return this.getEncodingForResource(resource, preferredEncoding);
    };
    FileService.prototype.getEncodingForResource = function (resource, preferredEncoding) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toUnderlyingResource(resource)];
                    case 1:
                        resource = _a.sent();
                        return [2 /*return*/, this.encodingRegistry.getEncodingForResource(resource, preferredEncoding)];
                }
            });
        });
    };
    /**
     * Converts to an underlying fs provider resource format.
     *
     * For example converting `user-storage` resources to `file` resources under a user home:
     * user-storage:/user/settings.json => file://home/.theia/settings.json
     */
    FileService.prototype.toUnderlyingResource = function (resource) {
        return __awaiter(this, void 0, void 0, function () {
            var provider;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.withProvider(resource)];
                    case 1:
                        provider = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!(provider instanceof delegating_file_system_provider_1.DelegatingFileSystemProvider)) return [3 /*break*/, 4];
                        resource = provider.toUnderlyingResource(resource);
                        return [4 /*yield*/, this.withProvider(resource)];
                    case 3:
                        provider = _a.sent();
                        return [3 /*break*/, 2];
                    case 4: return [2 /*return*/, resource];
                }
            });
        });
    };
    // #endregion
    FileService.prototype.handleFileWatchError = function () {
        this.watcherErrorHandler.handleError();
    };
    __decorate([
        inversify_1.inject(label_provider_1.LabelProvider),
        __metadata("design:type", label_provider_1.LabelProvider)
    ], FileService.prototype, "labelProvider", void 0);
    __decorate([
        inversify_1.inject(filesystem_preferences_1.FileSystemPreferences),
        __metadata("design:type", Object)
    ], FileService.prototype, "preferences", void 0);
    __decorate([
        inversify_1.inject(progress_service_1.ProgressService),
        __metadata("design:type", progress_service_1.ProgressService)
    ], FileService.prototype, "progressService", void 0);
    __decorate([
        inversify_1.inject(encoding_registry_1.EncodingRegistry),
        __metadata("design:type", encoding_registry_1.EncodingRegistry)
    ], FileService.prototype, "encodingRegistry", void 0);
    __decorate([
        inversify_1.inject(encoding_service_1.EncodingService),
        __metadata("design:type", encoding_service_1.EncodingService)
    ], FileService.prototype, "encodingService", void 0);
    __decorate([
        inversify_1.inject(contribution_provider_1.ContributionProvider),
        inversify_1.named(exports.FileServiceContribution),
        __metadata("design:type", Object)
    ], FileService.prototype, "contributions", void 0);
    __decorate([
        inversify_1.inject(filesystem_watcher_error_handler_1.FileSystemWatcherErrorHandler),
        __metadata("design:type", filesystem_watcher_error_handler_1.FileSystemWatcherErrorHandler)
    ], FileService.prototype, "watcherErrorHandler", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], FileService.prototype, "init", null);
    FileService = __decorate([
        inversify_1.injectable()
    ], FileService);
    return FileService;
}());
exports.FileService = FileService;
//# sourceMappingURL=file-service.js.map