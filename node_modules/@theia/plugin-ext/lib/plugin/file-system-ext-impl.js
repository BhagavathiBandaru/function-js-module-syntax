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
/**
 * **IMPORTANT** this code is running in the plugin host process and should be closed as possible to VS Code counterpart:
 * https://github.com/microsoft/vscode/blob/04c36be045a94fee58e5f8992d3e3fd980294a84/src/vs/workbench/api/common/extHostFileSystem.ts
 * One should be able to diff them to see differences.
 */
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
exports.FileSystemExtImpl = void 0;
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/tslint/config */
/* eslint-disable @typescript-eslint/no-explicit-any */
var vscode_uri_1 = require("vscode-uri");
var plugin_api_rpc_1 = require("../common/plugin-api-rpc");
var files = require("@theia/filesystem/lib/common/files");
var types_impl_1 = require("./types-impl");
var typeConverter = require("./type-converters");
var uri_components_1 = require("../common/uri-components");
var link_computer_1 = require("../common/link-computer");
var strings_1 = require("@theia/core/lib/common/strings");
var buffer_1 = require("@theia/core/lib/common/buffer");
var FsLinkProvider = /** @class */ (function () {
    function FsLinkProvider() {
        this._schemes = [];
    }
    FsLinkProvider.prototype.add = function (scheme) {
        this._stateMachine = undefined;
        this._schemes.push(scheme);
    };
    FsLinkProvider.prototype.delete = function (scheme) {
        var idx = this._schemes.indexOf(scheme);
        if (idx >= 0) {
            this._schemes.splice(idx, 1);
            this._stateMachine = undefined;
        }
    };
    FsLinkProvider.prototype._initStateMachine = function () {
        var e_1, _a;
        if (!this._stateMachine) {
            // sort and compute common prefix with previous scheme
            // then build state transitions based on the data
            var schemes = this._schemes.sort();
            var edges = [];
            var prevScheme = void 0;
            var prevState = void 0;
            var lastState = 14 /* LastKnownState */;
            var nextState = 14 /* LastKnownState */;
            try {
                for (var schemes_1 = __values(schemes), schemes_1_1 = schemes_1.next(); !schemes_1_1.done; schemes_1_1 = schemes_1.next()) {
                    var scheme = schemes_1_1.value;
                    // skip the common prefix of the prev scheme
                    // and continue with its last state
                    var pos = !prevScheme ? 0 : strings_1.commonPrefixLength(prevScheme, scheme);
                    if (pos === 0) {
                        prevState = 1 /* Start */;
                    }
                    else {
                        prevState = nextState;
                    }
                    for (; pos < scheme.length; pos++) {
                        // keep creating new (next) states until the
                        // end (and the BeforeColon-state) is reached
                        if (pos + 1 === scheme.length) {
                            // Save the last state here, because we need to continue for the next scheme
                            lastState = nextState;
                            nextState = 9 /* BeforeColon */;
                        }
                        else {
                            nextState += 1;
                        }
                        edges.push([prevState, scheme.toUpperCase().charCodeAt(pos), nextState]);
                        edges.push([prevState, scheme.toLowerCase().charCodeAt(pos), nextState]);
                        prevState = nextState;
                    }
                    prevScheme = scheme;
                    // Restore the last state
                    nextState = lastState;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (schemes_1_1 && !schemes_1_1.done && (_a = schemes_1.return)) _a.call(schemes_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            // all link must match this pattern `<scheme>:/<more>`
            edges.push([9 /* BeforeColon */, 58 /* Colon */, 10 /* AfterColon */]);
            edges.push([10 /* AfterColon */, 47 /* Slash */, 12 /* End */]);
            this._stateMachine = new link_computer_1.StateMachine(edges);
        }
    };
    FsLinkProvider.prototype.provideDocumentLinks = function (document) {
        var e_2, _a;
        this._initStateMachine();
        var result = [];
        var links = link_computer_1.LinkComputer.computeLinks({
            getLineContent: function (lineNumber) {
                return document.lineAt(lineNumber - 1).text;
            },
            getLineCount: function () {
                return document.lineCount;
            }
        }, this._stateMachine);
        try {
            for (var links_1 = __values(links), links_1_1 = links_1.next(); !links_1_1.done; links_1_1 = links_1.next()) {
                var link = links_1_1.value;
                var docLink = typeConverter.DocumentLink.to(link);
                if (docLink.target) {
                    result.push(docLink);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (links_1_1 && !links_1_1.done && (_a = links_1.return)) _a.call(links_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return result;
    };
    return FsLinkProvider;
}());
var ConsumerFileSystem = /** @class */ (function () {
    function ConsumerFileSystem(_proxy) {
        this._proxy = _proxy;
    }
    ConsumerFileSystem.prototype.stat = function (uri) {
        return this._proxy.$stat(uri).catch(ConsumerFileSystem._handleError);
    };
    ConsumerFileSystem.prototype.readDirectory = function (uri) {
        return this._proxy.$readdir(uri).catch(ConsumerFileSystem._handleError);
    };
    ConsumerFileSystem.prototype.createDirectory = function (uri) {
        return this._proxy.$mkdir(uri).catch(ConsumerFileSystem._handleError);
    };
    ConsumerFileSystem.prototype.readFile = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._proxy.$readFile(uri).then(function (buff) { return buff.buffer; }).catch(ConsumerFileSystem._handleError)];
            });
        });
    };
    ConsumerFileSystem.prototype.writeFile = function (uri, content) {
        return this._proxy.$writeFile(uri, buffer_1.BinaryBuffer.wrap(content)).catch(ConsumerFileSystem._handleError);
    };
    ConsumerFileSystem.prototype.delete = function (uri, options) {
        return this._proxy.$delete(uri, __assign({ recursive: false, useTrash: false }, options)).catch(ConsumerFileSystem._handleError);
    };
    ConsumerFileSystem.prototype.rename = function (oldUri, newUri, options) {
        return this._proxy.$rename(oldUri, newUri, __assign({ overwrite: false }, options)).catch(ConsumerFileSystem._handleError);
    };
    ConsumerFileSystem.prototype.copy = function (source, destination, options) {
        return this._proxy.$copy(source, destination, __assign({ overwrite: false }, options)).catch(ConsumerFileSystem._handleError);
    };
    ConsumerFileSystem._handleError = function (err) {
        // generic error
        if (!(err instanceof Error)) {
            throw new types_impl_1.FileSystemError(String(err));
        }
        // no provider (unknown scheme) error
        if (err.name === 'ENOPRO') {
            throw types_impl_1.FileSystemError.Unavailable(err.message);
        }
        // file system error
        switch (err.name) {
            case files.FileSystemProviderErrorCode.FileExists: throw types_impl_1.FileSystemError.FileExists(err.message);
            case files.FileSystemProviderErrorCode.FileNotFound: throw types_impl_1.FileSystemError.FileNotFound(err.message);
            case files.FileSystemProviderErrorCode.FileNotADirectory: throw types_impl_1.FileSystemError.FileNotADirectory(err.message);
            case files.FileSystemProviderErrorCode.FileIsADirectory: throw types_impl_1.FileSystemError.FileIsADirectory(err.message);
            case files.FileSystemProviderErrorCode.NoPermissions: throw types_impl_1.FileSystemError.NoPermissions(err.message);
            case files.FileSystemProviderErrorCode.Unavailable: throw types_impl_1.FileSystemError.Unavailable(err.message);
            default: throw new types_impl_1.FileSystemError(err.message, err.name);
        }
    };
    return ConsumerFileSystem;
}());
var FileSystemExtImpl = /** @class */ (function () {
    function FileSystemExtImpl(rpc, _extHostLanguageFeatures) {
        var _this = this;
        this._extHostLanguageFeatures = _extHostLanguageFeatures;
        this._linkProvider = new FsLinkProvider();
        this._fsProvider = new Map();
        this._usedSchemes = new Set();
        this._watches = new Map();
        this._handlePool = 0;
        this._proxy = rpc.getProxy(plugin_api_rpc_1.PLUGIN_RPC_CONTEXT.FILE_SYSTEM_MAIN);
        this.fileSystem = new ConsumerFileSystem(this._proxy);
        // register used schemes
        Object.keys(uri_components_1.Schemes).forEach(function (scheme) { return _this._usedSchemes.add(scheme); });
    }
    FileSystemExtImpl.prototype.dispose = function () {
        if (this._linkProviderRegistration) {
            this._linkProviderRegistration.dispose();
        }
    };
    FileSystemExtImpl.prototype._registerLinkProviderIfNotYetRegistered = function () {
        if (!this._linkProviderRegistration) {
            this._linkProviderRegistration = this._extHostLanguageFeatures.registerDocumentLinkProvider('*', this._linkProvider, {
                id: 'theia.fs-ext-impl',
                name: 'fs-ext-impl'
            });
        }
    };
    FileSystemExtImpl.prototype.registerFileSystemProvider = function (scheme, provider, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        if (this._usedSchemes.has(scheme)) {
            throw new Error("a provider for the scheme '" + scheme + "' is already registered");
        }
        //
        this._registerLinkProviderIfNotYetRegistered();
        var handle = this._handlePool++;
        this._linkProvider.add(scheme);
        this._usedSchemes.add(scheme);
        this._fsProvider.set(handle, provider);
        var capabilities = 2 /* FileReadWrite */;
        if (options.isCaseSensitive) {
            capabilities += 1024 /* PathCaseSensitive */;
        }
        if (options.isReadonly) {
            capabilities += 2048 /* Readonly */;
        }
        if (typeof provider.copy === 'function') {
            capabilities += 8 /* FileFolderCopy */;
        }
        if (typeof provider.open === 'function' && typeof provider.close === 'function'
            && typeof provider.read === 'function' && typeof provider.write === 'function') {
            capabilities += 4 /* FileOpenReadWriteClose */;
        }
        this._proxy.$registerFileSystemProvider(handle, scheme, capabilities);
        var subscription = provider.onDidChangeFile(function (event) {
            var e_3, _a;
            var mapped = [];
            try {
                for (var event_1 = __values(event), event_1_1 = event_1.next(); !event_1_1.done; event_1_1 = event_1.next()) {
                    var e = event_1_1.value;
                    var resource = e.uri, type = e.type;
                    if (resource.scheme !== scheme) {
                        // dropping events for wrong scheme
                        continue;
                    }
                    var newType = void 0;
                    switch (type) {
                        case types_impl_1.FileChangeType.Changed:
                            newType = 0 /* UPDATED */;
                            break;
                        case types_impl_1.FileChangeType.Created:
                            newType = 1 /* ADDED */;
                            break;
                        case types_impl_1.FileChangeType.Deleted:
                            newType = 2 /* DELETED */;
                            break;
                        default:
                            throw new Error('Unknown FileChangeType');
                    }
                    mapped.push({ resource: resource, type: newType });
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (event_1_1 && !event_1_1.done && (_a = event_1.return)) _a.call(event_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
            _this._proxy.$onFileSystemChange(handle, mapped);
        });
        return {
            dispose: function () {
                subscription.dispose();
                _this._linkProvider.delete(scheme);
                _this._usedSchemes.delete(scheme);
                _this._fsProvider.delete(handle);
                _this._proxy.$unregisterProvider(handle);
            }
        };
    };
    FileSystemExtImpl._asIStat = function (stat) {
        var type = stat.type, ctime = stat.ctime, mtime = stat.mtime, size = stat.size;
        return { type: type, ctime: ctime, mtime: mtime, size: size };
    };
    FileSystemExtImpl.prototype.$stat = function (handle, resource) {
        return Promise.resolve(this._getFsProvider(handle).stat(vscode_uri_1.URI.revive(resource))).then(FileSystemExtImpl._asIStat);
    };
    FileSystemExtImpl.prototype.$readdir = function (handle, resource) {
        return Promise.resolve(this._getFsProvider(handle).readDirectory(vscode_uri_1.URI.revive(resource)));
    };
    FileSystemExtImpl.prototype.$readFile = function (handle, resource) {
        return Promise.resolve(this._getFsProvider(handle).readFile(vscode_uri_1.URI.revive(resource))).then(function (data) { return buffer_1.BinaryBuffer.wrap(data); });
    };
    FileSystemExtImpl.prototype.$writeFile = function (handle, resource, content, opts) {
        return Promise.resolve(this._getFsProvider(handle).writeFile(vscode_uri_1.URI.revive(resource), content.buffer, opts));
    };
    FileSystemExtImpl.prototype.$delete = function (handle, resource, opts) {
        return Promise.resolve(this._getFsProvider(handle).delete(vscode_uri_1.URI.revive(resource), opts));
    };
    FileSystemExtImpl.prototype.$rename = function (handle, oldUri, newUri, opts) {
        return Promise.resolve(this._getFsProvider(handle).rename(vscode_uri_1.URI.revive(oldUri), vscode_uri_1.URI.revive(newUri), opts));
    };
    FileSystemExtImpl.prototype.$copy = function (handle, oldUri, newUri, opts) {
        var provider = this._getFsProvider(handle);
        if (!provider.copy) {
            throw new Error('FileSystemProvider does not implement "copy"');
        }
        return Promise.resolve(provider.copy(vscode_uri_1.URI.revive(oldUri), vscode_uri_1.URI.revive(newUri), opts));
    };
    FileSystemExtImpl.prototype.$mkdir = function (handle, resource) {
        return Promise.resolve(this._getFsProvider(handle).createDirectory(vscode_uri_1.URI.revive(resource)));
    };
    FileSystemExtImpl.prototype.$watch = function (handle, session, resource, opts) {
        var subscription = this._getFsProvider(handle).watch(vscode_uri_1.URI.revive(resource), opts);
        this._watches.set(session, subscription);
    };
    FileSystemExtImpl.prototype.$unwatch = function (_handle, session) {
        var subscription = this._watches.get(session);
        if (subscription) {
            subscription.dispose();
            this._watches.delete(session);
        }
    };
    FileSystemExtImpl.prototype.$open = function (handle, resource, opts) {
        var provider = this._getFsProvider(handle);
        if (!provider.open) {
            throw new Error('FileSystemProvider does not implement "open"');
        }
        return Promise.resolve(provider.open(vscode_uri_1.URI.revive(resource), opts));
    };
    FileSystemExtImpl.prototype.$close = function (handle, fd) {
        var provider = this._getFsProvider(handle);
        if (!provider.close) {
            throw new Error('FileSystemProvider does not implement "close"');
        }
        return Promise.resolve(provider.close(fd));
    };
    FileSystemExtImpl.prototype.$read = function (handle, fd, pos, length) {
        var provider = this._getFsProvider(handle);
        if (!provider.read) {
            throw new Error('FileSystemProvider does not implement "read"');
        }
        var data = buffer_1.BinaryBuffer.alloc(length);
        return Promise.resolve(provider.read(fd, pos, data.buffer, 0, length)).then(function (read) {
            return data.slice(0, read); // don't send zeros
        });
    };
    FileSystemExtImpl.prototype.$write = function (handle, fd, pos, data) {
        var provider = this._getFsProvider(handle);
        if (!provider.write) {
            throw new Error('FileSystemProvider does not implement "write"');
        }
        return Promise.resolve(provider.write(fd, pos, data.buffer, 0, data.byteLength));
    };
    FileSystemExtImpl.prototype._getFsProvider = function (handle) {
        var provider = this._fsProvider.get(handle);
        if (!provider) {
            var err = new Error();
            err.name = 'ENOPRO';
            err.message = "no provider";
            throw err;
        }
        return provider;
    };
    return FileSystemExtImpl;
}());
exports.FileSystemExtImpl = FileSystemExtImpl;
//# sourceMappingURL=file-system-ext-impl.js.map