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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NsfwFileSystemWatcherService = exports.NsfwWatcher = exports.WatcherDisposal = exports.NsfwFileSystemWatcherServerOptions = void 0;
var nsfw = require("nsfw");
var path_1 = require("path");
var fs_1 = require("fs");
var minimatch_1 = require("minimatch");
var file_uri_1 = require("@theia/core/lib/node/file-uri");
var file_change_collection_1 = require("../file-change-collection");
var promise_util_1 = require("@theia/core/lib/common/promise-util");
exports.NsfwFileSystemWatcherServerOptions = Symbol('NsfwFileSystemWatcherServerOptions');
/**
 * This is a flag value passed around upon disposal.
 */
exports.WatcherDisposal = Symbol('WatcherDisposal');
/**
 * Because URIs can be watched by different clients, we'll track
 * how many are listening for a given URI.
 *
 * This component wraps the whole start/stop process given some
 * reference count.
 *
 * Once there are no more references the handle
 * will wait for some time before destroying its resources.
 */
var NsfwWatcher = /** @class */ (function () {
    function NsfwWatcher(
    /** Initial reference to this handle. */
    initialClientId, 
    /** Filesystem path to be watched. */
    fsPath, 
    /** Watcher-specific options */
    watcherOptions, 
    /** Logging and Nsfw options */
    nsfwFileSystemWatchServerOptions, 
    /** The client to forward events to. */
    fileSystemWatcherClient, 
    /** Amount of time in ms to wait once this handle is not referenced anymore. */
    deferredDisposalTimeout) {
        var _this = this;
        if (deferredDisposalTimeout === void 0) { deferredDisposalTimeout = 10000; }
        this.fsPath = fsPath;
        this.watcherOptions = watcherOptions;
        this.nsfwFileSystemWatchServerOptions = nsfwFileSystemWatchServerOptions;
        this.fileSystemWatcherClient = fileSystemWatcherClient;
        this.deferredDisposalTimeout = deferredDisposalTimeout;
        this.disposed = false;
        /**
         * Used for debugging to keep track of the watchers.
         */
        this.debugId = NsfwWatcher.debugIdSequence++;
        /**
         * This deferred only rejects with `WatcherDisposal` and never resolves.
         */
        this.deferredDisposalDeferred = new promise_util_1.Deferred();
        /**
         * We count each reference made to this watcher, per client.
         *
         * We do this to know where to send events via the network.
         *
         * An entry should be removed when its value hits zero.
         */
        this.refsPerClient = new Map();
        /**
         * Ensures that events are processed in the order they are emitted,
         * despite being processed async.
         */
        this.nsfwEventProcessingQueue = Promise.resolve();
        /**
         * Resolves once this handle disposed itself and its resources. Never throws.
         */
        this.whenDisposed = this.deferredDisposalDeferred.promise.catch(function () { return undefined; });
        this.refsPerClient.set(initialClientId, { value: 1 });
        this.whenStarted = this.start().then(function () { return true; }, function (error) {
            if (error === exports.WatcherDisposal) {
                return false;
            }
            _this._dispose();
            _this.fireError();
            throw error;
        });
        this.debug('NEW', "initialClientId=" + initialClientId);
    }
    NsfwWatcher.prototype.addRef = function (clientId) {
        var refs = this.refsPerClient.get(clientId);
        if (typeof refs === 'undefined') {
            this.refsPerClient.set(clientId, refs = { value: 1 });
        }
        else {
            refs.value += 1;
        }
        var totalRefs = this.getTotalReferences();
        // If it was zero before, 1 means we were revived:
        var revived = totalRefs === 1;
        if (revived) {
            this.onRefsRevive();
        }
        this.debug('REF++', "clientId=" + clientId + ", clientRefs=" + refs.value + ", totalRefs=" + totalRefs + ". revived=" + revived);
    };
    NsfwWatcher.prototype.removeRef = function (clientId) {
        var refs = this.refsPerClient.get(clientId);
        if (typeof refs === 'undefined') {
            this.info('WARN REF--', "removed one too many reference: clientId=" + clientId);
            return;
        }
        refs.value -= 1;
        // We must remove the key from `this.clientReferences` because
        // we list active clients by reading the keys of this map.
        if (refs.value === 0) {
            this.refsPerClient.delete(clientId);
        }
        var totalRefs = this.getTotalReferences();
        var dead = totalRefs === 0;
        if (dead) {
            this.onRefsReachZero();
        }
        this.debug('REF--', "clientId=" + clientId + ", clientRefs=" + refs.value + ", totalRefs=" + totalRefs + ", dead=" + dead);
    };
    /**
     * All clients with at least one active reference.
     */
    NsfwWatcher.prototype.getClientIds = function () {
        return Array.from(this.refsPerClient.keys());
    };
    /**
     * Add the references for each client together.
     */
    NsfwWatcher.prototype.getTotalReferences = function () {
        var e_1, _a;
        var total = 0;
        try {
            for (var _b = __values(this.refsPerClient.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var refs = _c.value;
                total += refs.value;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return total;
    };
    /**
     * Returns true if at least one client listens to this handle.
     */
    NsfwWatcher.prototype.isInUse = function () {
        return this.refsPerClient.size > 0;
    };
    /**
     * When starting a watcher, we'll first check and wait for the path to exists
     * before running an NSFW watcher.
     */
    NsfwWatcher.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var watcher;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.orCancel(fs_1.promises.stat(this.fsPath).then(function () { return false; }, function () { return true; }))];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.orCancel(new Promise(function (resolve) { return setTimeout(resolve, 500); }))];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 0];
                    case 3: return [4 /*yield*/, this.orCancel(this.createNsfw())];
                    case 4:
                        watcher = _a.sent();
                        return [4 /*yield*/, this.orCancel(watcher.start().then(function () {
                                _this.debug('STARTED', "disposed=" + _this.disposed);
                                // The watcher could be disposed while it was starting, make sure to check for this:
                                if (_this.disposed) {
                                    _this.stopNsfw(watcher);
                                }
                            }))];
                    case 5:
                        _a.sent();
                        this.nsfw = watcher;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Given a started nsfw instance, gracefully shut it down.
     */
    NsfwWatcher.prototype.stopNsfw = function (watcher) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, watcher.stop()
                            .then(function () { return 'success=true'; }, function (error) { return error; })
                            .then(function (status) { return _this.debug('STOPPED', status); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NsfwWatcher.prototype.createNsfw = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fsPath;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs_1.promises.realpath(this.fsPath)];
                    case 1:
                        fsPath = _a.sent();
                        return [2 /*return*/, nsfw(fsPath, function (events) { return _this.handleNsfwEvents(events); }, __assign(__assign({}, this.nsfwFileSystemWatchServerOptions.nsfwOptions), { 
                                // The errorCallback is called whenever NSFW crashes *while* watching.
                                // See https://github.com/atom/github/issues/342
                                errorCallback: function (error) {
                                    console.error("NSFW service error on \"" + fsPath + "\":", error);
                                    _this._dispose();
                                    _this.fireError();
                                    // Make sure to call user's error handling code:
                                    if (_this.nsfwFileSystemWatchServerOptions.nsfwOptions.errorCallback) {
                                        _this.nsfwFileSystemWatchServerOptions.nsfwOptions.errorCallback(error);
                                    }
                                } }))];
                }
            });
        });
    };
    NsfwWatcher.prototype.handleNsfwEvents = function (events) {
        var _this = this;
        // Only process events if someone is listening.
        if (this.isInUse()) {
            // This callback is async, but nsfw won't wait for it to finish before firing the next one.
            // We will use a lock/queue to make sure everything is processed in the order it arrives.
            this.nsfwEventProcessingQueue = this.nsfwEventProcessingQueue.then(function () { return __awaiter(_this, void 0, void 0, function () {
                var fileChangeCollection, changes;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            fileChangeCollection = new file_change_collection_1.FileChangeCollection();
                            return [4 /*yield*/, Promise.all(events.map(function (event) { return __awaiter(_this, void 0, void 0, function () {
                                    var _a, oldPath, newPath, path;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                if (!(event.action === 3 /* RENAMED */)) return [3 /*break*/, 2];
                                                return [4 /*yield*/, Promise.all([
                                                        this.resolveEventPath(event.directory, event.oldFile),
                                                        this.resolveEventPath(event.newDirectory || event.directory, event.newFile),
                                                    ])];
                                            case 1:
                                                _a = __read.apply(void 0, [_b.sent(), 2]), oldPath = _a[0], newPath = _a[1];
                                                this.pushFileChange(fileChangeCollection, 2 /* DELETED */, oldPath);
                                                this.pushFileChange(fileChangeCollection, 1 /* ADDED */, newPath);
                                                return [3 /*break*/, 4];
                                            case 2: return [4 /*yield*/, this.resolveEventPath(event.directory, event.file)];
                                            case 3:
                                                path = _b.sent();
                                                if (event.action === 0 /* CREATED */) {
                                                    this.pushFileChange(fileChangeCollection, 1 /* ADDED */, path);
                                                }
                                                else if (event.action === 1 /* DELETED */) {
                                                    this.pushFileChange(fileChangeCollection, 2 /* DELETED */, path);
                                                }
                                                else if (event.action === 2 /* MODIFIED */) {
                                                    this.pushFileChange(fileChangeCollection, 0 /* UPDATED */, path);
                                                }
                                                _b.label = 4;
                                            case 4: return [2 /*return*/];
                                        }
                                    });
                                }); }))];
                        case 1:
                            _a.sent();
                            changes = fileChangeCollection.values();
                            // If all changes are part of the ignored files, the collection will be empty.
                            if (changes.length > 0) {
                                this.fileSystemWatcherClient.onDidFilesChanged({
                                    clients: this.getClientIds(),
                                    changes: changes,
                                });
                            }
                            return [2 /*return*/];
                    }
                });
            }); }, console.error);
        }
    };
    NsfwWatcher.prototype.resolveEventPath = function (directory, file) {
        return __awaiter(this, void 0, void 0, function () {
            var path, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        path = path_1.join(directory, file);
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 3, , 8]);
                        return [4 /*yield*/, fs_1.promises.realpath(path)];
                    case 2: return [2 /*return*/, _d.sent()];
                    case 3:
                        _a = _d.sent();
                        _d.label = 4;
                    case 4:
                        _d.trys.push([4, 6, , 7]);
                        _b = path_1.join;
                        return [4 /*yield*/, fs_1.promises.realpath(directory)];
                    case 5: 
                    // file does not exist try to resolve directory
                    return [2 /*return*/, _b.apply(void 0, [_d.sent(), file])];
                    case 6:
                        _c = _d.sent();
                        // directory does not exist fall back to symlink
                        return [2 /*return*/, path];
                    case 7: return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    NsfwWatcher.prototype.pushFileChange = function (changes, type, path) {
        if (!this.isIgnored(path)) {
            var uri = file_uri_1.FileUri.create(path).toString();
            changes.push({ type: type, uri: uri });
        }
    };
    NsfwWatcher.prototype.fireError = function () {
        this.fileSystemWatcherClient.onError({
            clients: this.getClientIds(),
            uri: this.fsPath,
        });
    };
    /**
     * Wrap a promise to reject as soon as this handle gets disposed.
     */
    NsfwWatcher.prototype.orCancel = function (promise) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.race([this.deferredDisposalDeferred.promise, promise])];
            });
        });
    };
    /**
     * When references hit zero, we'll schedule disposal for a bit later.
     *
     * This allows new references to reuse this watcher instead of creating a new one.
     *
     * e.g. A frontend disconnects for a few milliseconds before reconnecting again.
     */
    NsfwWatcher.prototype.onRefsReachZero = function () {
        var _this = this;
        this.deferredDisposalTimer = setTimeout(function () { return _this._dispose(); }, this.deferredDisposalTimeout);
    };
    /**
     * If we get new references after hitting zero, let's unschedule our disposal and keep watching.
     */
    NsfwWatcher.prototype.onRefsRevive = function () {
        if (this.deferredDisposalTimer) {
            clearTimeout(this.deferredDisposalTimer);
            this.deferredDisposalTimer = undefined;
        }
    };
    NsfwWatcher.prototype.isIgnored = function (path) {
        return this.watcherOptions.ignored.length > 0
            && this.watcherOptions.ignored.some(function (m) { return m.match(path); });
    };
    /**
     * Internal disposal mechanism.
     */
    NsfwWatcher.prototype._dispose = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.disposed) {
                    this.disposed = true;
                    this.deferredDisposalDeferred.reject(exports.WatcherDisposal);
                    if (this.nsfw) {
                        this.stopNsfw(this.nsfw);
                        this.nsfw = undefined;
                    }
                    this.debug('DISPOSED');
                }
                return [2 /*return*/];
            });
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    NsfwWatcher.prototype.info = function (prefix) {
        var _a;
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        (_a = this.nsfwFileSystemWatchServerOptions).info.apply(_a, __spread([prefix + " NsfwWatcher(" + this.debugId + " at \"" + this.fsPath + "\"):"], params));
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    NsfwWatcher.prototype.debug = function (prefix) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        if (this.nsfwFileSystemWatchServerOptions.verbose) {
            this.info.apply(this, __spread([prefix], params));
        }
    };
    NsfwWatcher.debugIdSequence = 0;
    return NsfwWatcher;
}());
exports.NsfwWatcher = NsfwWatcher;
var NsfwFileSystemWatcherService = /** @class */ (function () {
    function NsfwFileSystemWatcherService(options) {
        var _this = this;
        this.watcherId = 0;
        this.watchers = new Map();
        this.watcherHandles = new Map();
        /**
         * `this.client` is undefined until someone sets it.
         */
        this.maybeClient = {
            onDidFilesChanged: function (event) { var _a; return (_a = _this.client) === null || _a === void 0 ? void 0 : _a.onDidFilesChanged(event); },
            onError: function (event) { var _a; return (_a = _this.client) === null || _a === void 0 ? void 0 : _a.onError(event); },
        };
        this.options = __assign({ nsfwOptions: {}, verbose: false, info: function (message) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                return console.info.apply(console, __spread([message], args));
            }, error: function (message) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                return console.error.apply(console, __spread([message], args));
            } }, options);
    }
    NsfwFileSystemWatcherService.prototype.setClient = function (client) {
        this.client = client;
    };
    /**
     * A specific client requests us to watch a given `uri` according to some `options`.
     *
     * We internally re-use all the same `(uri, options)` pairs.
     */
    NsfwFileSystemWatcherService.prototype.watchFileChanges = function (clientId, uri, options) {
        return __awaiter(this, void 0, void 0, function () {
            var resolvedOptions, watcherKey, watcher, fsPath, watcherId;
            var _this = this;
            return __generator(this, function (_a) {
                resolvedOptions = this.resolveWatchOptions(options);
                watcherKey = this.getWatcherKey(uri, resolvedOptions);
                watcher = this.watchers.get(watcherKey);
                if (watcher === undefined) {
                    fsPath = file_uri_1.FileUri.fsPath(uri);
                    watcher = this.createWatcher(clientId, fsPath, resolvedOptions);
                    watcher.whenDisposed.then(function () { return _this.watchers.delete(watcherKey); });
                    this.watchers.set(watcherKey, watcher);
                }
                else {
                    watcher.addRef(clientId);
                }
                watcherId = this.watcherId++;
                this.watcherHandles.set(watcherId, { clientId: clientId, watcher: watcher });
                watcher.whenDisposed.then(function () { return _this.watcherHandles.delete(watcherId); });
                return [2 /*return*/, watcherId];
            });
        });
    };
    NsfwFileSystemWatcherService.prototype.createWatcher = function (clientId, fsPath, options) {
        var watcherOptions = {
            ignored: options.ignored
                .map(function (pattern) { return new minimatch_1.Minimatch(pattern, { dot: true }); }),
        };
        return new NsfwWatcher(clientId, fsPath, watcherOptions, this.options, this.maybeClient);
    };
    NsfwFileSystemWatcherService.prototype.unwatchFileChanges = function (watcherId) {
        return __awaiter(this, void 0, void 0, function () {
            var handle;
            return __generator(this, function (_a) {
                handle = this.watcherHandles.get(watcherId);
                if (handle === undefined) {
                    console.warn("tried to de-allocate a disposed watcher: watcherId=" + watcherId);
                }
                else {
                    this.watcherHandles.delete(watcherId);
                    handle.watcher.removeRef(handle.clientId);
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Given some `URI` and some `WatchOptions`, generate a unique key.
     */
    NsfwFileSystemWatcherService.prototype.getWatcherKey = function (uri, options) {
        return [
            uri,
            options.ignored.slice(0).sort().join() // use a **sorted copy** of `ignored` as part of the key
        ].join();
    };
    /**
     * Return fully qualified options.
     */
    NsfwFileSystemWatcherService.prototype.resolveWatchOptions = function (options) {
        return __assign({ ignored: [] }, options);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    NsfwFileSystemWatcherService.prototype.debug = function (message) {
        var _a;
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        if (this.options.verbose) {
            (_a = this.options).info.apply(_a, __spread([message], params));
        }
    };
    NsfwFileSystemWatcherService.prototype.dispose = function () {
        // Singletons shouldn't be disposed...
    };
    return NsfwFileSystemWatcherService;
}());
exports.NsfwFileSystemWatcherService = NsfwFileSystemWatcherService;
//# sourceMappingURL=nsfw-filesystem-service.js.map