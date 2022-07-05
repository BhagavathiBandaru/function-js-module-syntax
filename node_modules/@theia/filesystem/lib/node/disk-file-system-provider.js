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
// based on https://github.com/microsoft/vscode/blob/04c36be045a94fee58e5f8992d3e3fd980294a84/src/vs/platform/files/node/diskFileSystemProvider.ts
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiskFileSystemProvider = void 0;
/* eslint-disable no-null/no-null */
/* eslint-disable @typescript-eslint/no-shadow */
var inversify_1 = require("inversify");
var path_1 = require("path");
var uuid_1 = require("uuid");
var os = require("os");
var fs = require("fs");
var fs_1 = require("fs");
var util_1 = require("util");
var uri_1 = require("@theia/core/lib/common/uri");
var path_2 = require("@theia/core/lib/common/path");
var file_uri_1 = require("@theia/core/lib/node/file-uri");
var event_1 = require("@theia/core/lib/common/event");
var disposable_1 = require("@theia/core/lib/common/disposable");
var os_1 = require("@theia/core/lib/common/os");
var promise_util_1 = require("@theia/core/lib/common/promise-util");
var files_1 = require("../common/files");
var filesystem_watcher_protocol_1 = require("../common/filesystem-watcher-protocol");
var trash = require("trash");
var vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
var encoding_service_1 = require("@theia/core/lib/common/encoding-service");
var buffer_1 = require("@theia/core/lib/common/buffer");
var stream_1 = require("@theia/core/lib/common/stream");
var io_1 = require("../common/io");
var DiskFileSystemProvider = /** @class */ (function () {
    function DiskFileSystemProvider() {
        this.BUFFER_SIZE = 64 * 1024;
        this.onDidChangeFileEmitter = new event_1.Emitter();
        this.onDidChangeFile = this.onDidChangeFileEmitter.event;
        this.onFileWatchErrorEmitter = new event_1.Emitter();
        this.onFileWatchError = this.onFileWatchErrorEmitter.event;
        this.toDispose = new disposable_1.DisposableCollection(this.onDidChangeFileEmitter);
        // #region File Capabilities
        this.onDidChangeCapabilities = event_1.Event.None;
        this.mapHandleToPos = new Map();
        this.writeHandles = new Set();
        this.canFlush = true;
    }
    DiskFileSystemProvider.prototype.init = function () {
        var _this = this;
        this.toDispose.push(this.watcher);
        this.watcher.setClient({
            onDidFilesChanged: function (params) { return _this.onDidChangeFileEmitter.fire(params.changes.map(function (_a) {
                var uri = _a.uri, type = _a.type;
                return ({
                    resource: new uri_1.default(uri),
                    type: type
                });
            })); },
            onError: function () { return _this.onFileWatchErrorEmitter.fire(); }
        });
    };
    Object.defineProperty(DiskFileSystemProvider.prototype, "capabilities", {
        get: function () {
            if (!this._capabilities) {
                this._capabilities =
                    2 /* FileReadWrite */ |
                        4 /* FileOpenReadWriteClose */ |
                        16 /* FileReadStream */ |
                        8 /* FileFolderCopy */ |
                        16777216 /* Access */ |
                        4096 /* Trash */ |
                        33554432 /* Update */;
                if (os_1.OS.type() === os_1.OS.Type.Linux) {
                    this._capabilities |= 1024 /* PathCaseSensitive */;
                }
            }
            return this._capabilities;
        },
        enumerable: false,
        configurable: true
    });
    // #endregion
    // #region File Metadata Resolving
    DiskFileSystemProvider.prototype.stat = function (resource) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, stat_1, symbolicLink, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.statLink(this.toFilePath(resource))];
                    case 1:
                        _a = _b.sent(), stat_1 = _a.stat, symbolicLink = _a.symbolicLink;
                        return [2 /*return*/, {
                                type: this.toType(stat_1, symbolicLink),
                                ctime: stat_1.birthtime.getTime(),
                                mtime: stat_1.mtime.getTime(),
                                size: stat_1.size
                            }];
                    case 2:
                        error_1 = _b.sent();
                        throw this.toFileSystemProviderError(error_1);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DiskFileSystemProvider.prototype.access = function (resource, mode) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, util_1.promisify(fs.access)(this.toFilePath(resource), mode)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        throw this.toFileSystemProviderError(error_2);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DiskFileSystemProvider.prototype.fsPath = function (resource) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, file_uri_1.FileUri.fsPath(resource)];
            });
        });
    };
    DiskFileSystemProvider.prototype.statLink = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var lstats, error_3, stats, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, util_1.promisify(fs_1.lstat)(path)];
                    case 1:
                        lstats = _a.sent();
                        // Return early if the stat is not a symbolic link at all
                        if (!lstats.isSymbolicLink()) {
                            return [2 /*return*/, { stat: lstats }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, util_1.promisify(fs_1.stat)(path)];
                    case 4:
                        stats = _a.sent();
                        return [2 /*return*/, { stat: stats, symbolicLink: (lstats === null || lstats === void 0 ? void 0 : lstats.isSymbolicLink()) ? { dangling: false } : undefined }];
                    case 5:
                        error_4 = _a.sent();
                        // If the link points to a non-existing file we still want
                        // to return it as result while setting dangling: true flag
                        if (error_4.code === 'ENOENT' && lstats) {
                            return [2 /*return*/, { stat: lstats, symbolicLink: { dangling: true } }];
                        }
                        throw error_4;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    DiskFileSystemProvider.prototype.readdir = function (resource) {
        return __awaiter(this, void 0, void 0, function () {
            var children, result_1, error_5;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, util_1.promisify(fs.readdir)(this.toFilePath(resource))];
                    case 1:
                        children = _a.sent();
                        result_1 = [];
                        return [4 /*yield*/, Promise.all(children.map(function (child) { return __awaiter(_this, void 0, void 0, function () {
                                var stat_2, error_6;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 2, , 3]);
                                            return [4 /*yield*/, this.stat(resource.resolve(child))];
                                        case 1:
                                            stat_2 = _a.sent();
                                            result_1.push([child, stat_2.type]);
                                            return [3 /*break*/, 3];
                                        case 2:
                                            error_6 = _a.sent();
                                            console.trace(error_6); // ignore errors for individual entries that can arise from permission denied
                                            return [3 /*break*/, 3];
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, result_1];
                    case 3:
                        error_5 = _a.sent();
                        throw this.toFileSystemProviderError(error_5);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DiskFileSystemProvider.prototype.toType = function (entry, symbolicLink) {
        // Signal file type by checking for file / directory, except:
        // - symbolic links pointing to non-existing files are FileType.Unknown
        // - files that are neither file nor directory are FileType.Unknown
        var type;
        if (symbolicLink === null || symbolicLink === void 0 ? void 0 : symbolicLink.dangling) {
            type = files_1.FileType.Unknown;
        }
        else if (entry.isFile()) {
            type = files_1.FileType.File;
        }
        else if (entry.isDirectory()) {
            type = files_1.FileType.Directory;
        }
        else {
            type = files_1.FileType.Unknown;
        }
        // Always signal symbolic link as file type additionally
        if (symbolicLink) {
            type |= files_1.FileType.SymbolicLink;
        }
        return type;
    };
    // #endregion
    // #region File Reading/Writing
    DiskFileSystemProvider.prototype.readFile = function (resource) {
        return __awaiter(this, void 0, void 0, function () {
            var filePath, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        filePath = this.toFilePath(resource);
                        return [4 /*yield*/, util_1.promisify(fs_1.readFile)(filePath)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_7 = _a.sent();
                        throw this.toFileSystemProviderError(error_7);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DiskFileSystemProvider.prototype.readFileStream = function (resource, opts, token) {
        var stream = stream_1.newWriteableStream(function (data) { return buffer_1.BinaryBuffer.concat(data.map(function (data) { return buffer_1.BinaryBuffer.wrap(data); })).buffer; });
        io_1.readFileIntoStream(this, resource, stream, function (data) { return data.buffer; }, __assign(__assign({}, opts), { bufferSize: this.BUFFER_SIZE }), token);
        return stream;
    };
    DiskFileSystemProvider.prototype.writeFile = function (resource, content, opts) {
        return __awaiter(this, void 0, void 0, function () {
            var handle, filePath, fileExists, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        handle = undefined;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, 7, 10]);
                        filePath = this.toFilePath(resource);
                        if (!(!opts.create || !opts.overwrite)) return [3 /*break*/, 3];
                        return [4 /*yield*/, util_1.promisify(fs_1.exists)(filePath)];
                    case 2:
                        fileExists = _a.sent();
                        if (fileExists) {
                            if (!opts.overwrite) {
                                throw files_1.createFileSystemProviderError('File already exists', files_1.FileSystemProviderErrorCode.FileExists);
                            }
                        }
                        else {
                            if (!opts.create) {
                                throw files_1.createFileSystemProviderError('File does not exist', files_1.FileSystemProviderErrorCode.FileNotFound);
                            }
                        }
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this.open(resource, { create: true })];
                    case 4:
                        // Open
                        handle = _a.sent();
                        // Write content at once
                        return [4 /*yield*/, this.write(handle, 0, content, 0, content.byteLength)];
                    case 5:
                        // Write content at once
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 6:
                        error_8 = _a.sent();
                        throw this.toFileSystemProviderError(error_8);
                    case 7:
                        if (!(typeof handle === 'number')) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.close(handle)];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9: return [7 /*endfinally*/];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    DiskFileSystemProvider.prototype.open = function (resource, opts) {
        return __awaiter(this, void 0, void 0, function () {
            var filePath, flags, _a, error_9, handle, error_10;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 10, , 11]);
                        filePath = this.toFilePath(resource);
                        flags = undefined;
                        if (!opts.create) return [3 /*break*/, 7];
                        _a = os_1.isWindows;
                        if (!_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, util_1.promisify(fs_1.exists)(filePath)];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        if (!_a) return [3 /*break*/, 6];
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        // On Windows and if the file exists, we use a different strategy of saving the file
                        // by first truncating the file and then writing with r+ flag. This helps to save hidden files on Windows
                        // (see https://github.com/Microsoft/vscode/issues/931) and prevent removing alternate data streams
                        // (see https://github.com/Microsoft/vscode/issues/6363)
                        return [4 /*yield*/, util_1.promisify(fs_1.truncate)(filePath, 0)];
                    case 4:
                        // On Windows and if the file exists, we use a different strategy of saving the file
                        // by first truncating the file and then writing with r+ flag. This helps to save hidden files on Windows
                        // (see https://github.com/Microsoft/vscode/issues/931) and prevent removing alternate data streams
                        // (see https://github.com/Microsoft/vscode/issues/6363)
                        _b.sent();
                        // After a successful truncate() the flag can be set to 'r+' which will not truncate.
                        flags = 'r+';
                        return [3 /*break*/, 6];
                    case 5:
                        error_9 = _b.sent();
                        console.trace(error_9);
                        return [3 /*break*/, 6];
                    case 6:
                        // we take opts.create as a hint that the file is opened for writing
                        // as such we use 'w' to truncate an existing or create the
                        // file otherwise. we do not allow reading.
                        if (!flags) {
                            flags = 'w';
                        }
                        return [3 /*break*/, 8];
                    case 7:
                        // otherwise we assume the file is opened for reading
                        // as such we use 'r' to neither truncate, nor create
                        // the file.
                        flags = 'r';
                        _b.label = 8;
                    case 8: return [4 /*yield*/, util_1.promisify(fs_1.open)(filePath, flags)];
                    case 9:
                        handle = _b.sent();
                        // remember this handle to track file position of the handle
                        // we init the position to 0 since the file descriptor was
                        // just created and the position was not moved so far (see
                        // also http://man7.org/linux/man-pages/man2/open.2.html -
                        // "The file offset is set to the beginning of the file.")
                        this.mapHandleToPos.set(handle, 0);
                        // remember that this handle was used for writing
                        if (opts.create) {
                            this.writeHandles.add(handle);
                        }
                        return [2 /*return*/, handle];
                    case 10:
                        error_10 = _b.sent();
                        throw this.toFileSystemProviderError(error_10);
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    DiskFileSystemProvider.prototype.close = function (fd) {
        return __awaiter(this, void 0, void 0, function () {
            var error_11, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        // remove this handle from map of positions
                        this.mapHandleToPos.delete(fd);
                        if (!(this.writeHandles.delete(fd) && this.canFlush)) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, util_1.promisify(fs_1.fdatasync)(fd)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_11 = _a.sent();
                        // In some exotic setups it is well possible that node fails to sync
                        // In that case we disable flushing and log the error to our logger
                        this.canFlush = false;
                        console.error(error_11);
                        return [3 /*break*/, 4];
                    case 4: return [4 /*yield*/, util_1.promisify(fs_1.close)(fd)];
                    case 5: return [2 /*return*/, _a.sent()];
                    case 6:
                        error_12 = _a.sent();
                        throw this.toFileSystemProviderError(error_12);
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    DiskFileSystemProvider.prototype.read = function (fd, pos, data, offset, length) {
        return __awaiter(this, void 0, void 0, function () {
            var normalizedPos, bytesRead, result, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        normalizedPos = this.normalizePos(fd, pos);
                        bytesRead = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, util_1.promisify(fs_1.read)(fd, data, offset, length, normalizedPos)];
                    case 2:
                        result = _a.sent();
                        if (typeof result === 'number') {
                            bytesRead = result; // node.d.ts fail
                        }
                        else {
                            bytesRead = result.bytesRead;
                        }
                        return [2 /*return*/, bytesRead];
                    case 3:
                        error_13 = _a.sent();
                        throw this.toFileSystemProviderError(error_13);
                    case 4:
                        this.updatePos(fd, normalizedPos, bytesRead);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DiskFileSystemProvider.prototype.normalizePos = function (fd, pos) {
        // when calling fs.read/write we try to avoid passing in the "pos" argument and
        // rather prefer to pass in "null" because this avoids an extra seek(pos)
        // call that in some cases can even fail (e.g. when opening a file over FTP -
        // see https://github.com/microsoft/vscode/issues/73884).
        //
        // as such, we compare the passed in position argument with our last known
        // position for the file descriptor and use "null" if they match.
        if (pos === this.mapHandleToPos.get(fd)) {
            return null;
        }
        return pos;
    };
    DiskFileSystemProvider.prototype.updatePos = function (fd, pos, bytesLength) {
        var lastKnownPos = this.mapHandleToPos.get(fd);
        if (typeof lastKnownPos === 'number') {
            // pos !== null signals that previously a position was used that is
            // not null. node.js documentation explains, that in this case
            // the internal file pointer is not moving and as such we do not move
            // our position pointer.
            //
            // Docs: "If position is null, data will be read from the current file position,
            // and the file position will be updated. If position is an integer, the file position
            // will remain unchanged."
            if (typeof pos === 'number') {
                // do not modify the position
            }
            else if (typeof bytesLength === 'number') {
                this.mapHandleToPos.set(fd, lastKnownPos + bytesLength);
            }
            else {
                this.mapHandleToPos.delete(fd);
            }
        }
    };
    DiskFileSystemProvider.prototype.write = function (fd, pos, data, offset, length) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                // we know at this point that the file to write to is truncated and thus empty
                // if the write now fails, the file remains empty. as such we really try hard
                // to ensure the write succeeds by retrying up to three times.
                return [2 /*return*/, promise_util_1.retry(function () { return _this.doWrite(fd, pos, data, offset, length); }, 100 /* ms delay */, 3 /* retries */)];
            });
        });
    };
    DiskFileSystemProvider.prototype.doWrite = function (fd, pos, data, offset, length) {
        return __awaiter(this, void 0, void 0, function () {
            var normalizedPos, bytesWritten, result, error_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        normalizedPos = this.normalizePos(fd, pos);
                        bytesWritten = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, util_1.promisify(fs_1.write)(fd, data, offset, length, normalizedPos)];
                    case 2:
                        result = _a.sent();
                        if (typeof result === 'number') {
                            bytesWritten = result; // node.d.ts fail
                        }
                        else {
                            bytesWritten = result.bytesWritten;
                        }
                        return [2 /*return*/, bytesWritten];
                    case 3:
                        error_14 = _a.sent();
                        throw this.toFileSystemProviderError(error_14);
                    case 4:
                        this.updatePos(fd, normalizedPos, bytesWritten);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // #endregion
    // #region Move/Copy/Delete/Create Folder
    DiskFileSystemProvider.prototype.mkdir = function (resource) {
        return __awaiter(this, void 0, void 0, function () {
            var error_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, util_1.promisify(fs_1.mkdir)(this.toFilePath(resource))];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_15 = _a.sent();
                        throw this.toFileSystemProviderError(error_15);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DiskFileSystemProvider.prototype.delete = function (resource, opts) {
        return __awaiter(this, void 0, void 0, function () {
            var filePath, error_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        filePath = this.toFilePath(resource);
                        return [4 /*yield*/, this.doDelete(filePath, opts)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_16 = _a.sent();
                        throw this.toFileSystemProviderError(error_16);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DiskFileSystemProvider.prototype.doDelete = function (filePath, opts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!opts.useTrash) return [3 /*break*/, 5];
                        if (!opts.recursive) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.rimraf(filePath)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, util_1.promisify(fs_1.unlink)(filePath)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, trash(filePath)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    DiskFileSystemProvider.prototype.rimraf = function (path) {
        if (new path_2.Path(path).isRoot) {
            throw new Error('rimraf - will refuse to recursively delete root');
        }
        return this.rimrafMove(path);
    };
    DiskFileSystemProvider.prototype.rimrafMove = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var pathInTemp, error_17, error_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        pathInTemp = path_1.join(os.tmpdir(), uuid_1.v4());
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, util_1.promisify(fs_1.rename)(path, pathInTemp)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_17 = _a.sent();
                        return [2 /*return*/, this.rimrafUnlink(path)]; // if rename fails, delete without tmp dir
                    case 4:
                        // Delete but do not return as promise
                        this.rimrafUnlink(pathInTemp);
                        return [3 /*break*/, 6];
                    case 5:
                        error_18 = _a.sent();
                        if (error_18.code !== 'ENOENT') {
                            throw error_18;
                        }
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    DiskFileSystemProvider.prototype.rimrafUnlink = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var stat_3, children, mode, error_19;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        return [4 /*yield*/, util_1.promisify(fs_1.lstat)(path)];
                    case 1:
                        stat_3 = _a.sent();
                        if (!(stat_3.isDirectory() && !stat_3.isSymbolicLink())) return [3 /*break*/, 5];
                        return [4 /*yield*/, util_1.promisify(fs_1.readdir)(path)];
                    case 2:
                        children = _a.sent();
                        return [4 /*yield*/, Promise.all(children.map(function (child) { return _this.rimrafUnlink(path_1.join(path, child)); }))];
                    case 3:
                        _a.sent();
                        // Folder
                        return [4 /*yield*/, util_1.promisify(fs_1.rmdir)(path)];
                    case 4:
                        // Folder
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 5:
                        mode = stat_3.mode;
                        if (!!(mode & 128)) return [3 /*break*/, 7];
                        return [4 /*yield*/, util_1.promisify(fs_1.chmod)(path, mode | 128)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/, util_1.promisify(fs_1.unlink)(path)];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        error_19 = _a.sent();
                        if (error_19.code !== 'ENOENT') {
                            throw error_19;
                        }
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    DiskFileSystemProvider.prototype.rename = function (from, to, opts) {
        return __awaiter(this, void 0, void 0, function () {
            var fromFilePath, toFilePath, error_20;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fromFilePath = this.toFilePath(from);
                        toFilePath = this.toFilePath(to);
                        if (fromFilePath === toFilePath) {
                            return [2 /*return*/]; // simulate node.js behaviour here and do a no-op if paths match
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        // Ensure target does not exist
                        return [4 /*yield*/, this.validateTargetDeleted(from, to, 'move', opts.overwrite)];
                    case 2:
                        // Ensure target does not exist
                        _a.sent();
                        // Move
                        return [4 /*yield*/, this.move(fromFilePath, toFilePath)];
                    case 3:
                        // Move
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_20 = _a.sent();
                        // rewrite some typical errors that can happen especially around symlinks
                        // to something the user can better understand
                        if (error_20.code === 'EINVAL' || error_20.code === 'EBUSY' || error_20.code === 'ENAMETOOLONG') {
                            error_20 = new Error("Unable to move '" + path_1.basename(fromFilePath) + "' into '" + path_1.basename(path_1.dirname(toFilePath)) + "' (" + error_20.toString() + ").");
                        }
                        throw this.toFileSystemProviderError(error_20);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DiskFileSystemProvider.prototype.move = function (source, target) {
        return __awaiter(this, void 0, void 0, function () {
            function updateMtime(path) {
                return __awaiter(this, void 0, void 0, function () {
                    var stat, fd, error_22;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, util_1.promisify(fs_1.lstat)(path)];
                            case 1:
                                stat = _a.sent();
                                if (stat.isDirectory() || stat.isSymbolicLink()) {
                                    return [2 /*return*/, Promise.resolve()]; // only for files
                                }
                                return [4 /*yield*/, util_1.promisify(fs_1.open)(path, 'a')];
                            case 2:
                                fd = _a.sent();
                                _a.label = 3;
                            case 3:
                                _a.trys.push([3, 5, , 6]);
                                return [4 /*yield*/, util_1.promisify(fs_1.futimes)(fd, stat.atime, new Date())];
                            case 4:
                                _a.sent();
                                return [3 /*break*/, 6];
                            case 5:
                                error_22 = _a.sent();
                                return [3 /*break*/, 6];
                            case 6: return [2 /*return*/, util_1.promisify(fs_1.close)(fd)];
                        }
                    });
                });
            }
            var error_21;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (source === target) {
                            return [2 /*return*/, Promise.resolve()];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 10]);
                        return [4 /*yield*/, util_1.promisify(fs_1.rename)(source, target)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, updateMtime(target)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 4:
                        error_21 = _a.sent();
                        if (!(source.toLowerCase() !== target.toLowerCase() && error_21.code === 'EXDEV' || source.endsWith('.'))) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.doCopy(source, target)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.rimraf(source)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, updateMtime(target)];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 8: throw error_21;
                    case 9: return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    DiskFileSystemProvider.prototype.copy = function (from, to, opts) {
        return __awaiter(this, void 0, void 0, function () {
            var fromFilePath, toFilePath, error_23;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fromFilePath = this.toFilePath(from);
                        toFilePath = this.toFilePath(to);
                        if (fromFilePath === toFilePath) {
                            return [2 /*return*/]; // simulate node.js behaviour here and do a no-op if paths match
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        // Ensure target does not exist
                        return [4 /*yield*/, this.validateTargetDeleted(from, to, 'copy', opts.overwrite)];
                    case 2:
                        // Ensure target does not exist
                        _a.sent();
                        // Copy
                        return [4 /*yield*/, this.doCopy(fromFilePath, toFilePath)];
                    case 3:
                        // Copy
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_23 = _a.sent();
                        // rewrite some typical errors that can happen especially around symlinks
                        // to something the user can better understand
                        if (error_23.code === 'EINVAL' || error_23.code === 'EBUSY' || error_23.code === 'ENAMETOOLONG') {
                            error_23 = new Error("Unable to copy '" + path_1.basename(fromFilePath) + "' into '" + path_1.basename(path_1.dirname(toFilePath)) + "' (" + error_23.toString() + ").");
                        }
                        throw this.toFileSystemProviderError(error_23);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DiskFileSystemProvider.prototype.validateTargetDeleted = function (from, to, mode, overwrite) {
        return __awaiter(this, void 0, void 0, function () {
            var isPathCaseSensitive, fromFilePath, toFilePath, isSameResourceWithDifferentPathCase, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        isPathCaseSensitive = !!(this.capabilities & 1024 /* PathCaseSensitive */);
                        fromFilePath = this.toFilePath(from);
                        toFilePath = this.toFilePath(to);
                        isSameResourceWithDifferentPathCase = false;
                        if (!isPathCaseSensitive) {
                            isSameResourceWithDifferentPathCase = fromFilePath.toLowerCase() === toFilePath.toLowerCase();
                        }
                        if (isSameResourceWithDifferentPathCase && mode === 'copy') {
                            throw files_1.createFileSystemProviderError("'File cannot be copied to same path with different path case", files_1.FileSystemProviderErrorCode.FileExists);
                        }
                        _a = !isSameResourceWithDifferentPathCase;
                        if (!_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, util_1.promisify(fs_1.exists)(toFilePath)];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        if (!_a) return [3 /*break*/, 4];
                        if (!overwrite) {
                            throw files_1.createFileSystemProviderError('File at target already exists', files_1.FileSystemProviderErrorCode.FileExists);
                        }
                        // Delete target
                        return [4 /*yield*/, this.delete(to, { recursive: true, useTrash: false })];
                    case 3:
                        // Delete target
                        _b.sent();
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DiskFileSystemProvider.prototype.doCopy = function (source, target, copiedSourcesIn) {
        return __awaiter(this, void 0, void 0, function () {
            var copiedSources, fileStat, files, i, file;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        copiedSources = copiedSourcesIn ? copiedSourcesIn : Object.create(null);
                        return [4 /*yield*/, util_1.promisify(fs_1.stat)(source)];
                    case 1:
                        fileStat = _a.sent();
                        if (!fileStat.isDirectory()) {
                            return [2 /*return*/, this.doCopyFile(source, target, fileStat.mode & 511)];
                        }
                        if (copiedSources[source]) {
                            return [2 /*return*/, Promise.resolve()]; // escape when there are cycles (can happen with symlinks)
                        }
                        copiedSources[source] = true; // remember as copied
                        // Create folder
                        this.mkdirp(target, fileStat.mode & 511);
                        return [4 /*yield*/, util_1.promisify(fs_1.readdir)(source)];
                    case 2:
                        files = _a.sent();
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < files.length)) return [3 /*break*/, 6];
                        file = files[i];
                        return [4 /*yield*/, this.doCopy(path_1.join(source, file), path_1.join(target, file), copiedSources)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    DiskFileSystemProvider.prototype.mkdirp = function (path, mode) {
        return __awaiter(this, void 0, void 0, function () {
            var mkdir, error_24;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mkdir = function () { return __awaiter(_this, void 0, void 0, function () {
                            var error_25, targetIsFile, fileStat, statError_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 7]);
                                        return [4 /*yield*/, util_1.promisify(fs.mkdir)(path, mode)];
                                    case 1:
                                        _a.sent();
                                        return [3 /*break*/, 7];
                                    case 2:
                                        error_25 = _a.sent();
                                        // ENOENT: a parent folder does not exist yet
                                        if (error_25.code === 'ENOENT') {
                                            throw error_25;
                                        }
                                        targetIsFile = false;
                                        _a.label = 3;
                                    case 3:
                                        _a.trys.push([3, 5, , 6]);
                                        return [4 /*yield*/, util_1.promisify(fs.stat)(path)];
                                    case 4:
                                        fileStat = _a.sent();
                                        targetIsFile = !fileStat.isDirectory();
                                        return [3 /*break*/, 6];
                                    case 5:
                                        statError_1 = _a.sent();
                                        throw error_25; // rethrow original error if stat fails
                                    case 6:
                                        if (targetIsFile) {
                                            throw new Error("'" + path + "' exists and is not a directory.");
                                        }
                                        return [3 /*break*/, 7];
                                    case 7: return [2 /*return*/];
                                }
                            });
                        }); };
                        // stop at root
                        if (path === path_1.dirname(path)) {
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 6]);
                        return [4 /*yield*/, mkdir()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 3:
                        error_24 = _a.sent();
                        if (!(error_24.code === 'ENOENT')) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.mkdirp(path_1.dirname(path), mode)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, mkdir()];
                    case 5: 
                    // Any other error
                    throw error_24;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    DiskFileSystemProvider.prototype.doCopyFile = function (source, target, mode) {
        return new Promise(function (resolve, reject) {
            var reader = fs.createReadStream(source);
            var writer = fs.createWriteStream(target, { mode: mode });
            var finished = false;
            var finish = function (error) {
                if (!finished) {
                    finished = true;
                    // in error cases, pass to callback
                    if (error) {
                        return reject(error);
                    }
                    // we need to explicitly chmod because of https://github.com/nodejs/node/issues/1104
                    fs.chmod(target, mode, function (error) { return error ? reject(error) : resolve(); });
                }
            };
            // handle errors properly
            reader.once('error', function (error) { return finish(error); });
            writer.once('error', function (error) { return finish(error); });
            // we are done (underlying fd has been closed)
            writer.once('close', function () { return finish(); });
            // start piping
            reader.pipe(writer);
        });
    };
    // #endregion
    // #region File Watching
    DiskFileSystemProvider.prototype.watch = function (resource, opts) {
        var watcherService = this.watcher;
        /**
         * Disposable handle. Can be disposed early (before the watcher is allocated.)
         */
        var handle = {
            disposed: false,
            watcherId: undefined,
            dispose: function () {
                if (this.disposed) {
                    return;
                }
                if (this.watcherId !== undefined) {
                    watcherService.unwatchFileChanges(this.watcherId);
                }
                this.disposed = true;
            },
        };
        watcherService.watchFileChanges(resource.toString(), {
            // Convert from `files.WatchOptions` to internal `watcher-protocol.WatchOptions`:
            ignored: opts.excludes
        }).then(function (watcherId) {
            if (handle.disposed) {
                watcherService.unwatchFileChanges(watcherId);
            }
            else {
                handle.watcherId = watcherId;
            }
        });
        this.toDispose.push(handle);
        return handle;
    };
    // #endregion
    DiskFileSystemProvider.prototype.updateFile = function (resource, changes, opts) {
        return __awaiter(this, void 0, void 0, function () {
            var content, decoded, newContent, encoding, encoded, stat_4, error_26;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.readFile(resource)];
                    case 1:
                        content = _a.sent();
                        decoded = this.encodingService.decode(buffer_1.BinaryBuffer.wrap(content), opts.readEncoding);
                        newContent = vscode_languageserver_textdocument_1.TextDocument.update(vscode_languageserver_textdocument_1.TextDocument.create('', '', 1, decoded), changes, 2).getText();
                        return [4 /*yield*/, this.encodingService.toResourceEncoding(opts.writeEncoding, {
                                overwriteEncoding: opts.overwriteEncoding,
                                read: function (length) { return __awaiter(_this, void 0, void 0, function () {
                                    var fd, data;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, this.open(resource, { create: false })];
                                            case 1:
                                                fd = _a.sent();
                                                _a.label = 2;
                                            case 2:
                                                _a.trys.push([2, , 4, 6]);
                                                data = new Uint8Array(length);
                                                return [4 /*yield*/, this.read(fd, 0, data, 0, length)];
                                            case 3:
                                                _a.sent();
                                                return [2 /*return*/, data];
                                            case 4: return [4 /*yield*/, this.close(fd)];
                                            case 5:
                                                _a.sent();
                                                return [7 /*endfinally*/];
                                            case 6: return [2 /*return*/];
                                        }
                                    });
                                }); }
                            })];
                    case 2:
                        encoding = _a.sent();
                        encoded = this.encodingService.encode(newContent, encoding);
                        return [4 /*yield*/, this.writeFile(resource, encoded.buffer, { create: false, overwrite: true })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.stat(resource)];
                    case 4:
                        stat_4 = _a.sent();
                        return [2 /*return*/, Object.assign(stat_4, { encoding: encoding.encoding })];
                    case 5:
                        error_26 = _a.sent();
                        throw this.toFileSystemProviderError(error_26);
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    // #region Helpers
    DiskFileSystemProvider.prototype.toFilePath = function (resource) {
        return path_1.normalize(file_uri_1.FileUri.fsPath(resource));
    };
    DiskFileSystemProvider.prototype.toFileSystemProviderError = function (error) {
        if (error instanceof files_1.FileSystemProviderError) {
            return error; // avoid double conversion
        }
        var code;
        switch (error.code) {
            case 'ENOENT':
                code = files_1.FileSystemProviderErrorCode.FileNotFound;
                break;
            case 'EISDIR':
                code = files_1.FileSystemProviderErrorCode.FileIsADirectory;
                break;
            case 'ENOTDIR':
                code = files_1.FileSystemProviderErrorCode.FileNotADirectory;
                break;
            case 'EEXIST':
                code = files_1.FileSystemProviderErrorCode.FileExists;
                break;
            case 'EPERM':
            case 'EACCES':
                code = files_1.FileSystemProviderErrorCode.NoPermissions;
                break;
            default:
                code = files_1.FileSystemProviderErrorCode.Unknown;
        }
        return files_1.createFileSystemProviderError(error, code);
    };
    // #endregion
    DiskFileSystemProvider.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    __decorate([
        inversify_1.inject(filesystem_watcher_protocol_1.FileSystemWatcherServer),
        __metadata("design:type", Object)
    ], DiskFileSystemProvider.prototype, "watcher", void 0);
    __decorate([
        inversify_1.inject(encoding_service_1.EncodingService),
        __metadata("design:type", encoding_service_1.EncodingService)
    ], DiskFileSystemProvider.prototype, "encodingService", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DiskFileSystemProvider.prototype, "init", null);
    DiskFileSystemProvider = __decorate([
        inversify_1.injectable()
    ], DiskFileSystemProvider);
    return DiskFileSystemProvider;
}());
exports.DiskFileSystemProvider = DiskFileSystemProvider;
//# sourceMappingURL=disk-file-system-provider.js.map