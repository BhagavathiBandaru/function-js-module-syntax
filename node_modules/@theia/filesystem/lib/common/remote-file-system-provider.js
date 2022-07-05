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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
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
exports.FileSystemProviderServer = exports.RemoteFileSystemProvider = exports.RemoteFileSystemProxyFactory = exports.RemoteFileSystemProviderError = exports.RemoteFileSystemServer = exports.remoteFileSystemPath = void 0;
var inversify_1 = require("inversify");
var uri_1 = require("@theia/core/lib/common/uri");
var event_1 = require("@theia/core/lib/common/event");
var disposable_1 = require("@theia/core/lib/common/disposable");
var buffer_1 = require("@theia/core/lib/common/buffer");
var files_1 = require("./files");
var proxy_factory_1 = require("@theia/core/lib/common/messaging/proxy-factory");
var application_error_1 = require("@theia/core/lib/common/application-error");
var promise_util_1 = require("@theia/core/lib/common/promise-util");
var stream_1 = require("@theia/core/lib/common/stream");
var cancellation_1 = require("@theia/core/lib/common/cancellation");
exports.remoteFileSystemPath = '/services/remote-filesystem';
exports.RemoteFileSystemServer = Symbol('RemoteFileSystemServer');
exports.RemoteFileSystemProviderError = application_error_1.ApplicationError.declare(-33005, function (message, data, stack) {
    return ({ message: message, data: data, stack: stack });
});
var RemoteFileSystemProxyFactory = /** @class */ (function (_super) {
    __extends(RemoteFileSystemProxyFactory, _super);
    function RemoteFileSystemProxyFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    RemoteFileSystemProxyFactory.prototype.serializeError = function (e) {
        if (e instanceof files_1.FileSystemProviderError) {
            var code = e.code, name_1 = e.name;
            return _super.prototype.serializeError.call(this, exports.RemoteFileSystemProviderError(e.message, { code: code, name: name_1 }, e.stack));
        }
        return _super.prototype.serializeError.call(this, e);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    RemoteFileSystemProxyFactory.prototype.deserializeError = function (capturedError, e) {
        var error = _super.prototype.deserializeError.call(this, capturedError, e);
        if (exports.RemoteFileSystemProviderError.is(error)) {
            var fileOperationError = new files_1.FileSystemProviderError(error.message, error.data.code);
            fileOperationError.name = error.data.name;
            fileOperationError.stack = error.stack;
            return fileOperationError;
        }
        return e;
    };
    return RemoteFileSystemProxyFactory;
}(proxy_factory_1.JsonRpcProxyFactory));
exports.RemoteFileSystemProxyFactory = RemoteFileSystemProxyFactory;
/**
 * Frontend component.
 *
 * Wraps the remote filesystem provider living on the backend.
 */
var RemoteFileSystemProvider = /** @class */ (function () {
    function RemoteFileSystemProvider() {
        this.onDidChangeFileEmitter = new event_1.Emitter();
        this.onDidChangeFile = this.onDidChangeFileEmitter.event;
        this.onFileWatchErrorEmitter = new event_1.Emitter();
        this.onFileWatchError = this.onFileWatchErrorEmitter.event;
        this.onDidChangeCapabilitiesEmitter = new event_1.Emitter();
        this.onDidChangeCapabilities = this.onDidChangeCapabilitiesEmitter.event;
        this.onFileStreamDataEmitter = new event_1.Emitter();
        this.onFileStreamData = this.onFileStreamDataEmitter.event;
        this.onFileStreamEndEmitter = new event_1.Emitter();
        this.onFileStreamEnd = this.onFileStreamEndEmitter.event;
        this.toDispose = new disposable_1.DisposableCollection(this.onDidChangeFileEmitter, this.onDidChangeCapabilitiesEmitter, this.onFileStreamDataEmitter, this.onFileStreamEndEmitter);
        this.watcherSequence = 0;
        /**
         * We'll track the currently allocated watchers, in order to re-allocate them
         * with the same options once we reconnect to the backend after a disconnection.
         */
        this.watchOptions = new Map();
        this._capabilities = 0;
        this.readyDeferred = new promise_util_1.Deferred();
        this.ready = this.readyDeferred.promise;
    }
    Object.defineProperty(RemoteFileSystemProvider.prototype, "capabilities", {
        get: function () { return this._capabilities; },
        enumerable: false,
        configurable: true
    });
    RemoteFileSystemProvider.prototype.init = function () {
        var _this = this;
        this.server.getCapabilities().then(function (capabilities) {
            _this._capabilities = capabilities;
            _this.readyDeferred.resolve();
        }, this.readyDeferred.reject);
        this.server.setClient({
            notifyDidChangeFile: function (_a) {
                var changes = _a.changes;
                _this.onDidChangeFileEmitter.fire(changes.map(function (event) { return ({ resource: new uri_1.default(event.resource), type: event.type }); }));
            },
            notifyFileWatchError: function () {
                _this.onFileWatchErrorEmitter.fire();
            },
            notifyDidChangeCapabilities: function (capabilities) { return _this.setCapabilities(capabilities); },
            onFileStreamData: function (handle, data) { return _this.onFileStreamDataEmitter.fire([handle, Uint8Array.from(data)]); },
            onFileStreamEnd: function (handle, error) { return _this.onFileStreamEndEmitter.fire([handle, error]); }
        });
        var onInitialized = this.server.onDidOpenConnection(function () {
            // skip reconnection on the first connection
            onInitialized.dispose();
            _this.toDispose.push(_this.server.onDidOpenConnection(function () { return _this.reconnect(); }));
        });
    };
    RemoteFileSystemProvider.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    RemoteFileSystemProvider.prototype.setCapabilities = function (capabilities) {
        this._capabilities = capabilities;
        this.onDidChangeCapabilitiesEmitter.fire(undefined);
    };
    // --- forwarding calls
    RemoteFileSystemProvider.prototype.stat = function (resource) {
        return this.server.stat(resource.toString());
    };
    RemoteFileSystemProvider.prototype.access = function (resource, mode) {
        return this.server.access(resource.toString(), mode);
    };
    RemoteFileSystemProvider.prototype.fsPath = function (resource) {
        return this.server.fsPath(resource.toString());
    };
    RemoteFileSystemProvider.prototype.open = function (resource, opts) {
        return this.server.open(resource.toString(), opts);
    };
    RemoteFileSystemProvider.prototype.close = function (fd) {
        return this.server.close(fd);
    };
    RemoteFileSystemProvider.prototype.read = function (fd, pos, data, offset, length) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, bytes, bytesRead;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.server.read(fd, pos, length)];
                    case 1:
                        _a = _b.sent(), bytes = _a.bytes, bytesRead = _a.bytesRead;
                        // copy back the data that was written into the buffer on the remote
                        // side. we need to do this because buffers are not referenced by
                        // pointer, but only by value and as such cannot be directly written
                        // to from the other process.
                        data.set(bytes.slice(0, bytesRead), offset);
                        return [2 /*return*/, bytesRead];
                }
            });
        });
    };
    RemoteFileSystemProvider.prototype.readFile = function (resource) {
        return __awaiter(this, void 0, void 0, function () {
            var bytes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.server.readFile(resource.toString())];
                    case 1:
                        bytes = _a.sent();
                        return [2 /*return*/, Uint8Array.from(bytes)];
                }
            });
        });
    };
    RemoteFileSystemProvider.prototype.readFileStream = function (resource, opts, token) {
        var _this = this;
        var capturedError = new Error();
        // eslint-disable-next-line @typescript-eslint/no-shadow
        var stream = stream_1.newWriteableStream(function (data) { return buffer_1.BinaryBuffer.concat(data.map(function (data) { return buffer_1.BinaryBuffer.wrap(data); })).buffer; });
        this.server.readFileStream(resource.toString(), opts, token).then(function (streamHandle) {
            if (token.isCancellationRequested) {
                stream.end(cancellation_1.cancelled());
                return;
            }
            var toDispose = new disposable_1.DisposableCollection(token.onCancellationRequested(function () { return stream.end(cancellation_1.cancelled()); }), _this.onFileStreamData(function (_a) {
                var _b = __read(_a, 2), handle = _b[0], data = _b[1];
                if (streamHandle === handle) {
                    stream.write(data);
                }
            }), _this.onFileStreamEnd(function (_a) {
                var _b = __read(_a, 2), handle = _b[0], error = _b[1];
                if (streamHandle === handle) {
                    if (error) {
                        var code = ('code' in error && error.code) || files_1.FileSystemProviderErrorCode.Unknown;
                        var fileOperationError = new files_1.FileSystemProviderError(error.message, code);
                        fileOperationError.name = error.name;
                        var capturedStack = capturedError.stack || '';
                        fileOperationError.stack = capturedStack + "\nCaused by: " + error.stack;
                        stream.end(fileOperationError);
                    }
                    else {
                        stream.end();
                    }
                }
            }));
            stream.on('end', function () { return toDispose.dispose(); });
        }, function (error) { return stream.end(error); });
        return stream;
    };
    RemoteFileSystemProvider.prototype.write = function (fd, pos, data, offset, length) {
        return this.server.write(fd, pos, __spread(data.values()), offset, length);
    };
    RemoteFileSystemProvider.prototype.writeFile = function (resource, content, opts) {
        return this.server.writeFile(resource.toString(), __spread(content.values()), opts);
    };
    RemoteFileSystemProvider.prototype.delete = function (resource, opts) {
        return this.server.delete(resource.toString(), opts);
    };
    RemoteFileSystemProvider.prototype.mkdir = function (resource) {
        return this.server.mkdir(resource.toString());
    };
    RemoteFileSystemProvider.prototype.readdir = function (resource) {
        return this.server.readdir(resource.toString());
    };
    RemoteFileSystemProvider.prototype.rename = function (resource, target, opts) {
        return this.server.rename(resource.toString(), target.toString(), opts);
    };
    RemoteFileSystemProvider.prototype.copy = function (resource, target, opts) {
        return this.server.copy(resource.toString(), target.toString(), opts);
    };
    RemoteFileSystemProvider.prototype.updateFile = function (resource, changes, opts) {
        return this.server.updateFile(resource.toString(), changes, opts);
    };
    RemoteFileSystemProvider.prototype.watch = function (resource, options) {
        var _this = this;
        var watcherId = this.watcherSequence++;
        var uri = resource.toString();
        this.watchOptions.set(watcherId, { uri: uri, options: options });
        this.server.watch(watcherId, uri, options);
        var toUnwatch = disposable_1.Disposable.create(function () {
            _this.watchOptions.delete(watcherId);
            _this.server.unwatch(watcherId);
        });
        this.toDispose.push(toUnwatch);
        return toUnwatch;
    };
    /**
     * When a frontend disconnects (e.g. bad connection) the backend resources will be cleared.
     *
     * This means that we need to re-allocate the watchers when a frontend reconnects.
     */
    RemoteFileSystemProvider.prototype.reconnect = function () {
        var e_1, _a;
        try {
            for (var _b = __values(this.watchOptions.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), watcher = _d[0], _e = _d[1], uri = _e.uri, options = _e.options;
                this.server.watch(watcher, uri, options);
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
    __decorate([
        inversify_1.inject(exports.RemoteFileSystemServer),
        __metadata("design:type", Object)
    ], RemoteFileSystemProvider.prototype, "server", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], RemoteFileSystemProvider.prototype, "init", null);
    RemoteFileSystemProvider = __decorate([
        inversify_1.injectable()
    ], RemoteFileSystemProvider);
    return RemoteFileSystemProvider;
}());
exports.RemoteFileSystemProvider = RemoteFileSystemProvider;
/**
 * Backend component.
 *
 * JSON-RPC server exposing a wrapped file system provider remotely.
 */
var FileSystemProviderServer = /** @class */ (function () {
    function FileSystemProviderServer() {
        this.BUFFER_SIZE = 64 * 1024;
        /**
         * Mapping of `watcherId` to a disposable watcher handle.
         */
        this.watchers = new Map();
        this.toDispose = new disposable_1.DisposableCollection();
        this.readFileStreamSeq = 0;
    }
    FileSystemProviderServer.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    FileSystemProviderServer.prototype.setClient = function (client) {
        this.client = client;
    };
    FileSystemProviderServer.prototype.init = function () {
        var _this = this;
        if (this.provider.dispose) {
            this.toDispose.push(disposable_1.Disposable.create(function () { return _this.provider.dispose(); }));
        }
        this.toDispose.push(this.provider.onDidChangeCapabilities(function () {
            if (_this.client) {
                _this.client.notifyDidChangeCapabilities(_this.provider.capabilities);
            }
        }));
        this.toDispose.push(this.provider.onDidChangeFile(function (changes) {
            if (_this.client) {
                _this.client.notifyDidChangeFile({
                    changes: changes.map(function (_a) {
                        var resource = _a.resource, type = _a.type;
                        return ({ resource: resource.toString(), type: type });
                    })
                });
            }
        }));
        this.toDispose.push(this.provider.onFileWatchError(function () {
            if (_this.client) {
                _this.client.notifyFileWatchError();
            }
        }));
    };
    FileSystemProviderServer.prototype.getCapabilities = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.provider.capabilities];
            });
        });
    };
    FileSystemProviderServer.prototype.stat = function (resource) {
        return this.provider.stat(new uri_1.default(resource));
    };
    FileSystemProviderServer.prototype.access = function (resource, mode) {
        if (files_1.hasAccessCapability(this.provider)) {
            return this.provider.access(new uri_1.default(resource), mode);
        }
        throw new Error('not supported');
    };
    FileSystemProviderServer.prototype.fsPath = function (resource) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (files_1.hasAccessCapability(this.provider)) {
                    return [2 /*return*/, this.provider.fsPath(new uri_1.default(resource))];
                }
                throw new Error('not supported');
            });
        });
    };
    FileSystemProviderServer.prototype.open = function (resource, opts) {
        if (files_1.hasOpenReadWriteCloseCapability(this.provider)) {
            return this.provider.open(new uri_1.default(resource), opts);
        }
        throw new Error('not supported');
    };
    FileSystemProviderServer.prototype.close = function (fd) {
        if (files_1.hasOpenReadWriteCloseCapability(this.provider)) {
            return this.provider.close(fd);
        }
        throw new Error('not supported');
    };
    FileSystemProviderServer.prototype.read = function (fd, pos, length) {
        return __awaiter(this, void 0, void 0, function () {
            var buffer, bytes, bytesRead;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!files_1.hasOpenReadWriteCloseCapability(this.provider)) return [3 /*break*/, 2];
                        buffer = buffer_1.BinaryBuffer.alloc(this.BUFFER_SIZE);
                        bytes = buffer.buffer;
                        return [4 /*yield*/, this.provider.read(fd, pos, bytes, 0, length)];
                    case 1:
                        bytesRead = _a.sent();
                        return [2 /*return*/, { bytes: __spread(bytes.values()), bytesRead: bytesRead }];
                    case 2: throw new Error('not supported');
                }
            });
        });
    };
    FileSystemProviderServer.prototype.write = function (fd, pos, data, offset, length) {
        if (files_1.hasOpenReadWriteCloseCapability(this.provider)) {
            return this.provider.write(fd, pos, Uint8Array.from(data), offset, length);
        }
        throw new Error('not supported');
    };
    FileSystemProviderServer.prototype.readFile = function (resource) {
        return __awaiter(this, void 0, void 0, function () {
            var buffer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!files_1.hasReadWriteCapability(this.provider)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.provider.readFile(new uri_1.default(resource))];
                    case 1:
                        buffer = _a.sent();
                        return [2 /*return*/, __spread(buffer.values())];
                    case 2: throw new Error('not supported');
                }
            });
        });
    };
    FileSystemProviderServer.prototype.writeFile = function (resource, content, opts) {
        if (files_1.hasReadWriteCapability(this.provider)) {
            return this.provider.writeFile(new uri_1.default(resource), Uint8Array.from(content), opts);
        }
        throw new Error('not supported');
    };
    FileSystemProviderServer.prototype.delete = function (resource, opts) {
        return this.provider.delete(new uri_1.default(resource), opts);
    };
    FileSystemProviderServer.prototype.mkdir = function (resource) {
        return this.provider.mkdir(new uri_1.default(resource));
    };
    FileSystemProviderServer.prototype.readdir = function (resource) {
        return this.provider.readdir(new uri_1.default(resource));
    };
    FileSystemProviderServer.prototype.rename = function (source, target, opts) {
        return this.provider.rename(new uri_1.default(source), new uri_1.default(target), opts);
    };
    FileSystemProviderServer.prototype.copy = function (source, target, opts) {
        if (files_1.hasFileFolderCopyCapability(this.provider)) {
            return this.provider.copy(new uri_1.default(source), new uri_1.default(target), opts);
        }
        throw new Error('not supported');
    };
    FileSystemProviderServer.prototype.updateFile = function (resource, changes, opts) {
        if (files_1.hasUpdateCapability(this.provider)) {
            return this.provider.updateFile(new uri_1.default(resource), changes, opts);
        }
        throw new Error('not supported');
    };
    FileSystemProviderServer.prototype.watch = function (requestedWatcherId, resource, opts) {
        return __awaiter(this, void 0, void 0, function () {
            var watcher;
            var _this = this;
            return __generator(this, function (_a) {
                if (this.watchers.has(requestedWatcherId)) {
                    throw new Error('watcher id is already allocated!');
                }
                watcher = this.provider.watch(new uri_1.default(resource), opts);
                this.watchers.set(requestedWatcherId, watcher);
                this.toDispose.push(disposable_1.Disposable.create(function () { return _this.unwatch(requestedWatcherId); }));
                return [2 /*return*/];
            });
        });
    };
    FileSystemProviderServer.prototype.unwatch = function (watcherId) {
        return __awaiter(this, void 0, void 0, function () {
            var watcher;
            return __generator(this, function (_a) {
                watcher = this.watchers.get(watcherId);
                if (watcher) {
                    this.watchers.delete(watcherId);
                    watcher.dispose();
                }
                return [2 /*return*/];
            });
        });
    };
    FileSystemProviderServer.prototype.readFileStream = function (resource, opts, token) {
        return __awaiter(this, void 0, void 0, function () {
            var handle_1, stream;
            var _this = this;
            return __generator(this, function (_a) {
                if (files_1.hasFileReadStreamCapability(this.provider)) {
                    handle_1 = this.readFileStreamSeq++;
                    stream = this.provider.readFileStream(new uri_1.default(resource), opts, token);
                    stream.on('data', function (data) { var _a; return (_a = _this.client) === null || _a === void 0 ? void 0 : _a.onFileStreamData(handle_1, __spread(data.values())); });
                    stream.on('error', function (error) {
                        var _a;
                        var code = error instanceof files_1.FileSystemProviderError ? error.code : undefined;
                        var name = error.name, message = error.message, stack = error.stack;
                        // eslint-disable-next-line no-unused-expressions
                        (_a = _this.client) === null || _a === void 0 ? void 0 : _a.onFileStreamEnd(handle_1, { code: code, name: name, message: message, stack: stack });
                    });
                    stream.on('end', function () { var _a; return (_a = _this.client) === null || _a === void 0 ? void 0 : _a.onFileStreamEnd(handle_1, undefined); });
                    return [2 /*return*/, handle_1];
                }
                throw new Error('not supported');
            });
        });
    };
    __decorate([
        inversify_1.inject(files_1.FileSystemProvider),
        __metadata("design:type", Object)
    ], FileSystemProviderServer.prototype, "provider", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], FileSystemProviderServer.prototype, "init", null);
    FileSystemProviderServer = __decorate([
        inversify_1.injectable()
    ], FileSystemProviderServer);
    return FileSystemProviderServer;
}());
exports.FileSystemProviderServer = FileSystemProviderServer;
//# sourceMappingURL=remote-file-system-provider.js.map