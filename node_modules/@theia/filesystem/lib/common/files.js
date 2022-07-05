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
// based on https://github.com/microsoft/vscode/blob/04c36be045a94fee58e5f8992d3e3fd980294a84/src/vs/platform/files/common/files.ts
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinarySize = exports.etag = exports.ETAG_DISABLED = exports.toFileOperationResult = exports.toFileSystemProviderErrorCode = exports.markAsFileSystemProviderError = exports.hasFileReadStreamCapability = exports.hasOpenReadWriteCloseCapability = exports.hasFileFolderCopyCapability = exports.hasReadWriteCapability = exports.hasUpdateCapability = exports.hasAccessCapability = exports.FileSystemProvider = exports.ensureFileSystemProviderError = exports.createFileSystemProviderError = exports.FileSystemProviderError = exports.FileSystemProviderErrorCode = exports.FileType = exports.FileOperationError = exports.FileStat = exports.BaseStat = exports.FileChangesEvent = exports.FileOperationEvent = void 0;
var uri_1 = require("@theia/core/lib/common/uri");
var FileOperationEvent = /** @class */ (function () {
    function FileOperationEvent(resource, operation, target) {
        this.resource = resource;
        this.operation = operation;
        this.target = target;
    }
    FileOperationEvent.prototype.isOperation = function (operation) {
        return this.operation === operation;
    };
    return FileOperationEvent;
}());
exports.FileOperationEvent = FileOperationEvent;
var FileChangesEvent = /** @class */ (function () {
    function FileChangesEvent(changes) {
        this.changes = changes;
    }
    /**
     * Returns true if this change event contains the provided file with the given change type (if provided). In case of
     * type DELETED, this method will also return true if a folder got deleted that is the parent of the
     * provided file path.
     */
    FileChangesEvent.prototype.contains = function (resource, type) {
        if (!resource) {
            return false;
        }
        var checkForChangeType = typeof type === 'number';
        return this.changes.some(function (change) {
            if (checkForChangeType && change.type !== type) {
                return false;
            }
            // For deleted also return true when deleted folder is parent of target path
            if (change.type === 2 /* DELETED */) {
                return resource.isEqualOrParent(change.resource);
            }
            return resource.toString() === change.resource.toString();
        });
    };
    /**
     * Returns the changes that describe added files.
     */
    FileChangesEvent.prototype.getAdded = function () {
        return this.getOfType(1 /* ADDED */);
    };
    /**
     * Returns if this event contains added files.
     */
    FileChangesEvent.prototype.gotAdded = function () {
        return this.hasType(1 /* ADDED */);
    };
    /**
     * Returns the changes that describe deleted files.
     */
    FileChangesEvent.prototype.getDeleted = function () {
        return this.getOfType(2 /* DELETED */);
    };
    /**
     * Returns if this event contains deleted files.
     */
    FileChangesEvent.prototype.gotDeleted = function () {
        return this.hasType(2 /* DELETED */);
    };
    /**
     * Returns the changes that describe updated files.
     */
    FileChangesEvent.prototype.getUpdated = function () {
        return this.getOfType(0 /* UPDATED */);
    };
    /**
     * Returns if this event contains updated files.
     */
    FileChangesEvent.prototype.gotUpdated = function () {
        return this.hasType(0 /* UPDATED */);
    };
    FileChangesEvent.prototype.getOfType = function (type) {
        return this.changes.filter(function (change) { return change.type === type; });
    };
    FileChangesEvent.prototype.hasType = function (type) {
        return this.changes.some(function (change) { return change.type === type; });
    };
    return FileChangesEvent;
}());
exports.FileChangesEvent = FileChangesEvent;
var BaseStat;
(function (BaseStat) {
    function is(arg) {
        return !!arg && typeof arg === 'object'
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            && ('resource' in arg && arg['resource'] instanceof uri_1.default)
            && ('name' in arg && typeof arg['name'] === 'string');
    }
    BaseStat.is = is;
})(BaseStat = exports.BaseStat || (exports.BaseStat = {}));
var FileStat;
(function (FileStat) {
    function is(arg) {
        return BaseStat.is(arg) &&
            ('isFile' in arg && typeof arg['isFile'] === 'boolean') &&
            ('isDirectory' in arg && typeof arg['isDirectory'] === 'boolean') &&
            ('isSymbolicLink' in arg && typeof arg['isSymbolicLink'] === 'boolean');
    }
    FileStat.is = is;
    function asFileType(stat) {
        var res = 0;
        if (stat.isFile) {
            res += FileType.File;
        }
        else if (stat.isDirectory) {
            res += FileType.Directory;
        }
        if (stat.isSymbolicLink) {
            res += FileType.SymbolicLink;
        }
        return res;
    }
    FileStat.asFileType = asFileType;
    function toStat(stat) {
        return {
            type: asFileType(stat),
            ctime: stat.ctime,
            mtime: stat.mtime,
            size: stat.size
        };
    }
    FileStat.toStat = toStat;
    function fromStat(resource, stat) {
        return {
            resource: resource,
            name: resource.path.base || resource.path.toString(),
            isFile: (stat.type & FileType.File) !== 0,
            isDirectory: (stat.type & FileType.Directory) !== 0,
            isSymbolicLink: (stat.type & FileType.SymbolicLink) !== 0,
            mtime: stat.mtime,
            ctime: stat.ctime,
            size: stat.size,
            etag: etag({ mtime: stat.mtime, size: stat.size })
        };
    }
    FileStat.fromStat = fromStat;
    function dir(resource, stat) {
        return fromStat(resource instanceof uri_1.default ? resource : new uri_1.default(resource), __assign({ type: FileType.Directory }, stat));
    }
    FileStat.dir = dir;
    function file(resource, stat) {
        return fromStat(resource instanceof uri_1.default ? resource : new uri_1.default(resource), __assign({ type: FileType.File }, stat));
    }
    FileStat.file = file;
})(FileStat = exports.FileStat || (exports.FileStat = {}));
var FileOperationError = /** @class */ (function (_super) {
    __extends(FileOperationError, _super);
    function FileOperationError(message, fileOperationResult, options) {
        var _this = _super.call(this, message) || this;
        _this.fileOperationResult = fileOperationResult;
        _this.options = options;
        Object.setPrototypeOf(_this, FileOperationError.prototype);
        return _this;
    }
    return FileOperationError;
}(Error));
exports.FileOperationError = FileOperationError;
var FileType;
(function (FileType) {
    FileType[FileType["Unknown"] = 0] = "Unknown";
    FileType[FileType["File"] = 1] = "File";
    FileType[FileType["Directory"] = 2] = "Directory";
    FileType[FileType["SymbolicLink"] = 64] = "SymbolicLink";
})(FileType = exports.FileType || (exports.FileType = {}));
var FileSystemProviderErrorCode;
(function (FileSystemProviderErrorCode) {
    FileSystemProviderErrorCode["FileExists"] = "EntryExists";
    FileSystemProviderErrorCode["FileNotFound"] = "EntryNotFound";
    FileSystemProviderErrorCode["FileNotADirectory"] = "EntryNotADirectory";
    FileSystemProviderErrorCode["FileIsADirectory"] = "EntryIsADirectory";
    FileSystemProviderErrorCode["FileExceedsMemoryLimit"] = "EntryExceedsMemoryLimit";
    FileSystemProviderErrorCode["FileTooLarge"] = "EntryTooLarge";
    FileSystemProviderErrorCode["NoPermissions"] = "NoPermissions";
    FileSystemProviderErrorCode["Unavailable"] = "Unavailable";
    FileSystemProviderErrorCode["Unknown"] = "Unknown";
})(FileSystemProviderErrorCode = exports.FileSystemProviderErrorCode || (exports.FileSystemProviderErrorCode = {}));
var FileSystemProviderError = /** @class */ (function (_super) {
    __extends(FileSystemProviderError, _super);
    function FileSystemProviderError(message, code) {
        var _this = _super.call(this, message) || this;
        _this.code = code;
        Object.setPrototypeOf(_this, FileSystemProviderError.prototype);
        return _this;
    }
    return FileSystemProviderError;
}(Error));
exports.FileSystemProviderError = FileSystemProviderError;
function createFileSystemProviderError(error, code) {
    var providerError = new FileSystemProviderError(error.toString(), code);
    markAsFileSystemProviderError(providerError, code);
    return providerError;
}
exports.createFileSystemProviderError = createFileSystemProviderError;
function ensureFileSystemProviderError(error) {
    if (!error) {
        return createFileSystemProviderError('Unknown Error', FileSystemProviderErrorCode.Unknown); // https://github.com/Microsoft/vscode/issues/72798
    }
    return error;
}
exports.ensureFileSystemProviderError = ensureFileSystemProviderError;
exports.FileSystemProvider = Symbol('FileSystemProvider');
function hasAccessCapability(provider) {
    return !!(provider.capabilities & 16777216 /* Access */);
}
exports.hasAccessCapability = hasAccessCapability;
function hasUpdateCapability(provider) {
    return !!(provider.capabilities & 33554432 /* Update */);
}
exports.hasUpdateCapability = hasUpdateCapability;
function hasReadWriteCapability(provider) {
    return !!(provider.capabilities & 2 /* FileReadWrite */);
}
exports.hasReadWriteCapability = hasReadWriteCapability;
function hasFileFolderCopyCapability(provider) {
    return !!(provider.capabilities & 8 /* FileFolderCopy */);
}
exports.hasFileFolderCopyCapability = hasFileFolderCopyCapability;
function hasOpenReadWriteCloseCapability(provider) {
    return !!(provider.capabilities & 4 /* FileOpenReadWriteClose */);
}
exports.hasOpenReadWriteCloseCapability = hasOpenReadWriteCloseCapability;
function hasFileReadStreamCapability(provider) {
    return !!(provider.capabilities & 16 /* FileReadStream */);
}
exports.hasFileReadStreamCapability = hasFileReadStreamCapability;
function markAsFileSystemProviderError(error, code) {
    error.name = code ? code + " (FileSystemError)" : 'FileSystemError';
    return error;
}
exports.markAsFileSystemProviderError = markAsFileSystemProviderError;
function toFileSystemProviderErrorCode(error) {
    // Guard against abuse
    if (!error) {
        return FileSystemProviderErrorCode.Unknown;
    }
    // FileSystemProviderError comes with the code
    if (error instanceof FileSystemProviderError) {
        return error.code;
    }
    // Any other error, check for name match by assuming that the error
    // went through the markAsFileSystemProviderError() method
    var match = /^(.+) \(FileSystemError\)$/.exec(error.name);
    if (!match) {
        return FileSystemProviderErrorCode.Unknown;
    }
    switch (match[1]) {
        case FileSystemProviderErrorCode.FileExists: return FileSystemProviderErrorCode.FileExists;
        case FileSystemProviderErrorCode.FileIsADirectory: return FileSystemProviderErrorCode.FileIsADirectory;
        case FileSystemProviderErrorCode.FileNotADirectory: return FileSystemProviderErrorCode.FileNotADirectory;
        case FileSystemProviderErrorCode.FileNotFound: return FileSystemProviderErrorCode.FileNotFound;
        case FileSystemProviderErrorCode.FileExceedsMemoryLimit: return FileSystemProviderErrorCode.FileExceedsMemoryLimit;
        case FileSystemProviderErrorCode.FileTooLarge: return FileSystemProviderErrorCode.FileTooLarge;
        case FileSystemProviderErrorCode.NoPermissions: return FileSystemProviderErrorCode.NoPermissions;
        case FileSystemProviderErrorCode.Unavailable: return FileSystemProviderErrorCode.Unavailable;
    }
    return FileSystemProviderErrorCode.Unknown;
}
exports.toFileSystemProviderErrorCode = toFileSystemProviderErrorCode;
function toFileOperationResult(error) {
    // FileSystemProviderError comes with the result already
    if (error instanceof FileOperationError) {
        return error.fileOperationResult;
    }
    // Otherwise try to find from code
    switch (toFileSystemProviderErrorCode(error)) {
        case FileSystemProviderErrorCode.FileNotFound:
            return 1 /* FILE_NOT_FOUND */;
        case FileSystemProviderErrorCode.FileIsADirectory:
            return 0 /* FILE_IS_DIRECTORY */;
        case FileSystemProviderErrorCode.FileNotADirectory:
            return 10 /* FILE_NOT_DIRECTORY */;
        case FileSystemProviderErrorCode.NoPermissions:
            return 6 /* FILE_PERMISSION_DENIED */;
        case FileSystemProviderErrorCode.FileExists:
            return 4 /* FILE_MOVE_CONFLICT */;
        case FileSystemProviderErrorCode.FileExceedsMemoryLimit:
            return 9 /* FILE_EXCEEDS_MEMORY_LIMIT */;
        case FileSystemProviderErrorCode.FileTooLarge:
            return 7 /* FILE_TOO_LARGE */;
        default:
            return 11 /* FILE_OTHER_ERROR */;
    }
}
exports.toFileOperationResult = toFileOperationResult;
/**
 * A hint to disable etag checking for reading/writing.
 */
exports.ETAG_DISABLED = '';
function etag(stat) {
    if (typeof stat.size !== 'number' || typeof stat.mtime !== 'number') {
        return undefined;
    }
    return stat.mtime.toString(29) + stat.size.toString(31);
}
exports.etag = etag;
/**
 * Helper to format a raw byte size into a human readable label.
 */
var BinarySize = /** @class */ (function () {
    function BinarySize() {
    }
    BinarySize.formatSize = function (size) {
        if (size < BinarySize.KB) {
            return size + 'B';
        }
        if (size < BinarySize.MB) {
            return (size / BinarySize.KB).toFixed(2) + 'KB';
        }
        if (size < BinarySize.GB) {
            return (size / BinarySize.MB).toFixed(2) + 'MB';
        }
        if (size < BinarySize.TB) {
            return (size / BinarySize.GB).toFixed(2) + 'GB';
        }
        return (size / BinarySize.TB).toFixed(2) + 'TB';
    };
    BinarySize.KB = 1024;
    BinarySize.MB = BinarySize.KB * BinarySize.KB;
    BinarySize.GB = BinarySize.MB * BinarySize.KB;
    BinarySize.TB = BinarySize.GB * BinarySize.KB;
    return BinarySize;
}());
exports.BinarySize = BinarySize;
//# sourceMappingURL=files.js.map