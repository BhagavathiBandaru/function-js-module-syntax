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
exports.DelegatingFileSystemProvider = void 0;
var common_1 = require("@theia/core/lib/common");
var disposable_1 = require("@theia/core/lib/common/disposable");
var files_1 = require("./files");
var DelegatingFileSystemProvider = /** @class */ (function () {
    function DelegatingFileSystemProvider(delegate, options, toDispose) {
        var _this = this;
        if (toDispose === void 0) { toDispose = new disposable_1.DisposableCollection(); }
        this.delegate = delegate;
        this.options = options;
        this.toDispose = toDispose;
        this.onDidChangeFileEmitter = new common_1.Emitter();
        this.onDidChangeFile = this.onDidChangeFileEmitter.event;
        this.onFileWatchErrorEmitter = new common_1.Emitter();
        this.onFileWatchError = this.onFileWatchErrorEmitter.event;
        this.toDispose.push(this.onDidChangeFileEmitter);
        this.toDispose.push(delegate.onDidChangeFile(function (changes) { return _this.handleFileChanges(changes); }));
        this.toDispose.push(this.onFileWatchErrorEmitter);
        this.toDispose.push(delegate.onFileWatchError(function (changes) { return _this.onFileWatchErrorEmitter.fire(); }));
    }
    DelegatingFileSystemProvider.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    Object.defineProperty(DelegatingFileSystemProvider.prototype, "capabilities", {
        get: function () {
            return this.delegate.capabilities;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DelegatingFileSystemProvider.prototype, "onDidChangeCapabilities", {
        get: function () {
            return this.delegate.onDidChangeCapabilities;
        },
        enumerable: false,
        configurable: true
    });
    DelegatingFileSystemProvider.prototype.watch = function (resource, opts) {
        return this.delegate.watch(this.toUnderlyingResource(resource), opts);
    };
    DelegatingFileSystemProvider.prototype.stat = function (resource) {
        return this.delegate.stat(this.toUnderlyingResource(resource));
    };
    DelegatingFileSystemProvider.prototype.access = function (resource, mode) {
        if (files_1.hasAccessCapability(this.delegate)) {
            return this.delegate.access(this.toUnderlyingResource(resource), mode);
        }
        throw new Error('not supported');
    };
    DelegatingFileSystemProvider.prototype.fsPath = function (resource) {
        if (files_1.hasAccessCapability(this.delegate)) {
            return this.delegate.fsPath(this.toUnderlyingResource(resource));
        }
        throw new Error('not supported');
    };
    DelegatingFileSystemProvider.prototype.mkdir = function (resource) {
        return this.delegate.mkdir(this.toUnderlyingResource(resource));
    };
    DelegatingFileSystemProvider.prototype.rename = function (from, to, opts) {
        return this.delegate.rename(this.toUnderlyingResource(from), this.toUnderlyingResource(to), opts);
    };
    DelegatingFileSystemProvider.prototype.copy = function (from, to, opts) {
        if (files_1.hasFileFolderCopyCapability(this.delegate)) {
            return this.delegate.copy(this.toUnderlyingResource(from), this.toUnderlyingResource(to), opts);
        }
        throw new Error('not supported');
    };
    DelegatingFileSystemProvider.prototype.readFile = function (resource) {
        if (files_1.hasReadWriteCapability(this.delegate)) {
            return this.delegate.readFile(this.toUnderlyingResource(resource));
        }
        throw new Error('not supported');
    };
    DelegatingFileSystemProvider.prototype.readFileStream = function (resource, opts, token) {
        if (files_1.hasFileReadStreamCapability(this.delegate)) {
            return this.delegate.readFileStream(this.toUnderlyingResource(resource), opts, token);
        }
        throw new Error('not supported');
    };
    DelegatingFileSystemProvider.prototype.readdir = function (resource) {
        return this.delegate.readdir(this.toUnderlyingResource(resource));
    };
    DelegatingFileSystemProvider.prototype.writeFile = function (resource, content, opts) {
        if (files_1.hasReadWriteCapability(this.delegate)) {
            return this.delegate.writeFile(this.toUnderlyingResource(resource), content, opts);
        }
        throw new Error('not supported');
    };
    DelegatingFileSystemProvider.prototype.open = function (resource, opts) {
        if (files_1.hasOpenReadWriteCloseCapability(this.delegate)) {
            return this.delegate.open(this.toUnderlyingResource(resource), opts);
        }
        throw new Error('not supported');
    };
    DelegatingFileSystemProvider.prototype.close = function (fd) {
        if (files_1.hasOpenReadWriteCloseCapability(this.delegate)) {
            return this.delegate.close(fd);
        }
        throw new Error('not supported');
    };
    DelegatingFileSystemProvider.prototype.read = function (fd, pos, data, offset, length) {
        if (files_1.hasOpenReadWriteCloseCapability(this.delegate)) {
            return this.delegate.read(fd, pos, data, offset, length);
        }
        throw new Error('not supported');
    };
    DelegatingFileSystemProvider.prototype.write = function (fd, pos, data, offset, length) {
        if (files_1.hasOpenReadWriteCloseCapability(this.delegate)) {
            return this.delegate.write(fd, pos, data, offset, length);
        }
        throw new Error('not supported');
    };
    DelegatingFileSystemProvider.prototype.delete = function (resource, opts) {
        return this.delegate.delete(this.toUnderlyingResource(resource), opts);
    };
    DelegatingFileSystemProvider.prototype.updateFile = function (resource, changes, opts) {
        if (files_1.hasUpdateCapability(this.delegate)) {
            return this.delegate.updateFile(resource, changes, opts);
        }
        throw new Error('not supported');
    };
    DelegatingFileSystemProvider.prototype.handleFileChanges = function (changes) {
        var e_1, _a;
        var delegatingChanges = [];
        try {
            for (var changes_1 = __values(changes), changes_1_1 = changes_1.next(); !changes_1_1.done; changes_1_1 = changes_1.next()) {
                var change = changes_1_1.value;
                var delegatingResource = this.fromUnderlyingResource(change.resource);
                if (delegatingResource) {
                    delegatingChanges.push({
                        resource: delegatingResource,
                        type: change.type
                    });
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (changes_1_1 && !changes_1_1.done && (_a = changes_1.return)) _a.call(changes_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (delegatingChanges.length) {
            this.onDidChangeFileEmitter.fire(delegatingChanges);
        }
    };
    /**
     * Converts to an underlying fs provider resource format.
     *
     * For example converting `user-storage` resources to `file` resources under a user home:
     * user-storage:/user/settings.json => file://home/.theia/settings.json
     */
    DelegatingFileSystemProvider.prototype.toUnderlyingResource = function (resource) {
        var underlying = this.options.uriConverter.to(resource);
        if (!underlying) {
            throw new Error('invalid resource: ' + resource.toString());
        }
        return underlying;
    };
    /**
     * Converts from an underlying fs provider resource format.
     *
     * For example converting `file` resources under a user home to `user-storage` resource:
     * - file://home/.theia/settings.json => user-storage:/user/settings.json
     * - file://documents/some-document.txt => undefined
     */
    DelegatingFileSystemProvider.prototype.fromUnderlyingResource = function (resource) {
        return this.options.uriConverter.from(resource);
    };
    return DelegatingFileSystemProvider;
}());
exports.DelegatingFileSystemProvider = DelegatingFileSystemProvider;
//# sourceMappingURL=delegating-file-system-provider.js.map