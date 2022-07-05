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
// based on https://github.com/microsoft/vscode/blob/04c36be045a94fee58e5f8992d3e3fd980294a84/src/vs/workbench/api/browser/mainThreadFileSystem.ts
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemMainImpl = void 0;
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/tslint/config */
/* eslint-disable @typescript-eslint/no-explicit-any */
var vscode_uri_1 = require("vscode-uri");
var uri_1 = require("@theia/core/lib/common/uri");
var buffer_1 = require("@theia/core/lib/common/buffer");
var disposable_1 = require("@theia/core/lib/common/disposable");
var event_1 = require("@theia/core/lib/common/event");
var plugin_api_rpc_1 = require("../../common/plugin-api-rpc");
var files_1 = require("@theia/filesystem/lib/common/files");
var file_service_1 = require("@theia/filesystem/lib/browser/file-service");
var FileSystemMainImpl = /** @class */ (function () {
    function FileSystemMainImpl(rpc, container) {
        this._fileProvider = new Map();
        this._proxy = rpc.getProxy(plugin_api_rpc_1.MAIN_RPC_CONTEXT.FILE_SYSTEM_EXT);
        this._fileService = container.get(file_service_1.FileService);
    }
    FileSystemMainImpl.prototype.dispose = function () {
        this._fileProvider.forEach(function (value) { return value.dispose(); });
        this._fileProvider.clear();
    };
    FileSystemMainImpl.prototype.$registerFileSystemProvider = function (handle, scheme, capabilities) {
        this._fileProvider.set(handle, new RemoteFileSystemProvider(this._fileService, scheme, capabilities, handle, this._proxy));
    };
    FileSystemMainImpl.prototype.$unregisterProvider = function (handle) {
        var provider = this._fileProvider.get(handle);
        if (provider) {
            provider.dispose();
            this._fileProvider.delete(handle);
        }
    };
    FileSystemMainImpl.prototype.$onFileSystemChange = function (handle, changes) {
        var fileProvider = this._fileProvider.get(handle);
        if (!fileProvider) {
            throw new Error('Unknown file provider');
        }
        fileProvider.$onFileSystemChange(changes);
    };
    // --- consumer fs, vscode.workspace.fs
    FileSystemMainImpl.prototype.$stat = function (uri) {
        return this._fileService.resolve(new uri_1.default(vscode_uri_1.URI.revive(uri)), { resolveMetadata: true }).then(function (stat) { return ({
            ctime: stat.ctime,
            mtime: stat.mtime,
            size: stat.size,
            type: files_1.FileStat.asFileType(stat)
        }); }).catch(FileSystemMainImpl._handleError);
    };
    FileSystemMainImpl.prototype.$readdir = function (uri) {
        return this._fileService.resolve(new uri_1.default(vscode_uri_1.URI.revive(uri)), { resolveMetadata: false }).then(function (stat) {
            if (!stat.isDirectory) {
                var err = new Error(stat.name);
                err.name = files_1.FileSystemProviderErrorCode.FileNotADirectory;
                throw err;
            }
            return !stat.children ? [] : stat.children.map(function (child) { return [child.name, files_1.FileStat.asFileType(child)]; });
        }).catch(FileSystemMainImpl._handleError);
    };
    FileSystemMainImpl.prototype.$readFile = function (uri) {
        return this._fileService.readFile(new uri_1.default(vscode_uri_1.URI.revive(uri))).then(function (file) { return file.value; }).catch(FileSystemMainImpl._handleError);
    };
    FileSystemMainImpl.prototype.$writeFile = function (uri, content) {
        return this._fileService.writeFile(new uri_1.default(vscode_uri_1.URI.revive(uri)), content)
            .then(function () { return undefined; }).catch(FileSystemMainImpl._handleError);
    };
    FileSystemMainImpl.prototype.$rename = function (source, target, opts) {
        return this._fileService.move(new uri_1.default(vscode_uri_1.URI.revive(source)), new uri_1.default(vscode_uri_1.URI.revive(target)), __assign(__assign({}, opts), { fromUserGesture: false })).then(function () { return undefined; }).catch(FileSystemMainImpl._handleError);
    };
    FileSystemMainImpl.prototype.$copy = function (source, target, opts) {
        return this._fileService.copy(new uri_1.default(vscode_uri_1.URI.revive(source)), new uri_1.default(vscode_uri_1.URI.revive(target)), __assign(__assign({}, opts), { fromUserGesture: false })).then(function () { return undefined; }).catch(FileSystemMainImpl._handleError);
    };
    FileSystemMainImpl.prototype.$mkdir = function (uri) {
        return this._fileService.createFolder(new uri_1.default(vscode_uri_1.URI.revive(uri)))
            .then(function () { return undefined; }).catch(FileSystemMainImpl._handleError);
    };
    FileSystemMainImpl.prototype.$delete = function (uri, opts) {
        return this._fileService.delete(new uri_1.default(vscode_uri_1.URI.revive(uri)), opts).catch(FileSystemMainImpl._handleError);
    };
    FileSystemMainImpl._handleError = function (err) {
        if (err instanceof files_1.FileOperationError) {
            switch (err.fileOperationResult) {
                case 1 /* FILE_NOT_FOUND */:
                    err.name = files_1.FileSystemProviderErrorCode.FileNotFound;
                    break;
                case 0 /* FILE_IS_DIRECTORY */:
                    err.name = files_1.FileSystemProviderErrorCode.FileIsADirectory;
                    break;
                case 6 /* FILE_PERMISSION_DENIED */:
                    err.name = files_1.FileSystemProviderErrorCode.NoPermissions;
                    break;
                case 4 /* FILE_MOVE_CONFLICT */:
                    err.name = files_1.FileSystemProviderErrorCode.FileExists;
                    break;
            }
        }
        throw err;
    };
    return FileSystemMainImpl;
}());
exports.FileSystemMainImpl = FileSystemMainImpl;
var RemoteFileSystemProvider = /** @class */ (function () {
    function RemoteFileSystemProvider(fileService, scheme, capabilities, _handle, _proxy) {
        this._handle = _handle;
        this._proxy = _proxy;
        this._onDidChange = new event_1.Emitter();
        this.onDidChangeFile = this._onDidChange.event;
        this.onFileWatchError = new event_1.Emitter().event; // dummy, never fired
        this.onDidChangeCapabilities = event_1.Event.None;
        this.capabilities = capabilities;
        this._registration = fileService.registerProvider(scheme, this);
    }
    RemoteFileSystemProvider.prototype.dispose = function () {
        this._registration.dispose();
        this._onDidChange.dispose();
    };
    RemoteFileSystemProvider.prototype.watch = function (resource, opts) {
        var _this = this;
        var session = Math.random();
        this._proxy.$watch(this._handle, session, resource['codeUri'], opts);
        return disposable_1.Disposable.create(function () {
            _this._proxy.$unwatch(_this._handle, session);
        });
    };
    RemoteFileSystemProvider.prototype.$onFileSystemChange = function (changes) {
        this._onDidChange.fire(changes.map(RemoteFileSystemProvider._createFileChange));
    };
    RemoteFileSystemProvider._createFileChange = function (dto) {
        return { resource: new uri_1.default(vscode_uri_1.URI.revive(dto.resource)), type: dto.type };
    };
    // --- forwarding calls
    RemoteFileSystemProvider.prototype.stat = function (resource) {
        return this._proxy.$stat(this._handle, resource['codeUri']).then(undefined, function (err) {
            throw err;
        });
    };
    RemoteFileSystemProvider.prototype.readFile = function (resource) {
        return this._proxy.$readFile(this._handle, resource['codeUri']).then(function (buffer) { return buffer.buffer; });
    };
    RemoteFileSystemProvider.prototype.writeFile = function (resource, content, opts) {
        return this._proxy.$writeFile(this._handle, resource['codeUri'], buffer_1.BinaryBuffer.wrap(content), opts);
    };
    RemoteFileSystemProvider.prototype.delete = function (resource, opts) {
        return this._proxy.$delete(this._handle, resource['codeUri'], opts);
    };
    RemoteFileSystemProvider.prototype.mkdir = function (resource) {
        return this._proxy.$mkdir(this._handle, resource['codeUri']);
    };
    RemoteFileSystemProvider.prototype.readdir = function (resource) {
        return this._proxy.$readdir(this._handle, resource['codeUri']);
    };
    RemoteFileSystemProvider.prototype.rename = function (resource, target, opts) {
        return this._proxy.$rename(this._handle, resource['codeUri'], target['codeUri'], opts);
    };
    RemoteFileSystemProvider.prototype.copy = function (resource, target, opts) {
        return this._proxy.$copy(this._handle, resource['codeUri'], target['codeUri'], opts);
    };
    RemoteFileSystemProvider.prototype.open = function (resource, opts) {
        return this._proxy.$open(this._handle, resource['codeUri'], opts);
    };
    RemoteFileSystemProvider.prototype.close = function (fd) {
        return this._proxy.$close(this._handle, fd);
    };
    RemoteFileSystemProvider.prototype.read = function (fd, pos, data, offset, length) {
        return this._proxy.$read(this._handle, fd, pos, length).then(function (readData) {
            data.set(readData.buffer, offset);
            return readData.byteLength;
        });
    };
    RemoteFileSystemProvider.prototype.write = function (fd, pos, data, offset, length) {
        return this._proxy.$write(this._handle, fd, pos, buffer_1.BinaryBuffer.wrap(data).slice(offset, offset + length));
    };
    return RemoteFileSystemProvider;
}());
//# sourceMappingURL=file-system-main-impl.js.map