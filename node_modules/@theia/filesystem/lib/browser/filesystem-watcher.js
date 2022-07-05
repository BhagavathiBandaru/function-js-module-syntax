"use strict";
/********************************************************************************
 * Copyright (C) 2017 TypeFox and others.
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
exports.FileSystemWatcher = exports.FileOperationEmitter = exports.FileMoveEvent = exports.FileChangeEvent = exports.FileChange = void 0;
var inversify_1 = require("inversify");
var disposable_1 = require("@theia/core/lib/common/disposable");
var event_1 = require("@theia/core/lib/common/event");
var file_service_1 = require("./file-service");
var FileChange;
(function (FileChange) {
    function isUpdated(change, uri) {
        return change.type === 0 /* UPDATED */ && uri.toString() === change.uri.toString();
    }
    FileChange.isUpdated = isUpdated;
    function isAdded(change, uri) {
        return change.type === 1 /* ADDED */ && uri.toString() === change.uri.toString();
    }
    FileChange.isAdded = isAdded;
    function isDeleted(change, uri) {
        return change.type === 2 /* DELETED */ && change.uri.isEqualOrParent(uri);
    }
    FileChange.isDeleted = isDeleted;
    function isAffected(change, uri) {
        return isDeleted(change, uri) || uri.toString() === change.uri.toString();
    }
    FileChange.isAffected = isAffected;
    function isChanged(change, uri) {
        return !isDeleted(change, uri) && uri.toString() === change.uri.toString();
    }
    FileChange.isChanged = isChanged;
})(FileChange = exports.FileChange || (exports.FileChange = {}));
var FileChangeEvent;
(function (FileChangeEvent) {
    function isUpdated(event, uri) {
        return event.some(function (change) { return FileChange.isUpdated(change, uri); });
    }
    FileChangeEvent.isUpdated = isUpdated;
    function isAdded(event, uri) {
        return event.some(function (change) { return FileChange.isAdded(change, uri); });
    }
    FileChangeEvent.isAdded = isAdded;
    function isDeleted(event, uri) {
        return event.some(function (change) { return FileChange.isDeleted(change, uri); });
    }
    FileChangeEvent.isDeleted = isDeleted;
    function isAffected(event, uri) {
        return event.some(function (change) { return FileChange.isAffected(change, uri); });
    }
    FileChangeEvent.isAffected = isAffected;
    function isChanged(event, uri) {
        return !isDeleted(event, uri) && event.some(function (change) { return FileChange.isChanged(change, uri); });
    }
    FileChangeEvent.isChanged = isChanged;
})(FileChangeEvent = exports.FileChangeEvent || (exports.FileChangeEvent = {}));
var FileMoveEvent;
(function (FileMoveEvent) {
    function isRename(_a) {
        var sourceUri = _a.sourceUri, targetUri = _a.targetUri;
        return sourceUri.parent.toString() === targetUri.parent.toString();
    }
    FileMoveEvent.isRename = isRename;
})(FileMoveEvent = exports.FileMoveEvent || (exports.FileMoveEvent = {}));
var FileOperationEmitter = /** @class */ (function () {
    function FileOperationEmitter() {
        this.onWillEmitter = new event_1.Emitter();
        this.onWill = this.onWillEmitter.event;
        this.onDidFailEmitter = new event_1.Emitter();
        this.onDidFail = this.onDidFailEmitter.event;
        this.onDidEmitter = new event_1.Emitter();
        this.onDid = this.onDidEmitter.event;
        this.toDispose = new disposable_1.DisposableCollection(this.onWillEmitter, this.onDidFailEmitter, this.onDidEmitter);
    }
    FileOperationEmitter.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    FileOperationEmitter.prototype.fireWill = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, event_1.WaitUntilEvent.fire(this.onWillEmitter, event)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FileOperationEmitter.prototype.fireDid = function (failed, event) {
        return __awaiter(this, void 0, void 0, function () {
            var onDidEmitter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        onDidEmitter = failed ? this.onDidFailEmitter : this.onDidEmitter;
                        return [4 /*yield*/, event_1.WaitUntilEvent.fire(onDidEmitter, event)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return FileOperationEmitter;
}());
exports.FileOperationEmitter = FileOperationEmitter;
/**
 * React to file system events, including calls originating from the
 * application or event coming from the system's filesystem directly
 * (actual file watching).
 *
 * `on(will|did)(create|rename|delete)` events solely come from application
 * usage, not from actual filesystem.
 *
 * @deprecated since 1.4.0 - in order to support VS Code FS API (https://github.com/eclipse-theia/theia/pull/7908), use `FileService.watch` instead
 */
var FileSystemWatcher = /** @class */ (function () {
    function FileSystemWatcher() {
        this.toDispose = new disposable_1.DisposableCollection();
        this.toRestartAll = new disposable_1.DisposableCollection();
        this.onFileChangedEmitter = new event_1.Emitter();
        /**
         * @deprecated since 1.4.0 - in order to support VS Code FS API (https://github.com/eclipse-theia/theia/pull/7908), use `FileService.onDidFilesChange` instead
         */
        this.onFilesChanged = this.onFileChangedEmitter.event;
        this.fileCreateEmitter = new FileOperationEmitter();
        /**
         * @deprecated since 1.4.0 - in order to support VS Code FS API (https://github.com/eclipse-theia/theia/pull/7908), use `FileService.onWillRunUserOperation` instead
         */
        this.onWillCreate = this.fileCreateEmitter.onWill;
        /**
         * @deprecated since 1.4.0 - in order to support VS Code FS API (https://github.com/eclipse-theia/theia/pull/7908), use `FileService.onDidFailUserOperation` instead
         */
        this.onDidFailCreate = this.fileCreateEmitter.onDidFail;
        /**
         * @deprecated since 1.4.0 - in order to support VS Code FS API (https://github.com/eclipse-theia/theia/pull/7908),
         * instead use `FileService.onDidRunUserOperation` for events triggered by user gestures
         * or `FileService.onDidRunOperation` triggered by user gestures and programmatically
         */
        this.onDidCreate = this.fileCreateEmitter.onDid;
        this.fileDeleteEmitter = new FileOperationEmitter();
        /**
         * @deprecated since 1.4.0 - in order to support VS Code FS API (https://github.com/eclipse-theia/theia/pull/7908), use `FileService.onWillRunUserOperation` instead
         */
        this.onWillDelete = this.fileDeleteEmitter.onWill;
        /**
         * @deprecated since 1.4.0 - in order to support VS Code FS API (https://github.com/eclipse-theia/theia/pull/7908), use `FileService.onDidFailUserOperation` instead
         */
        this.onDidFailDelete = this.fileDeleteEmitter.onDidFail;
        /**
         * @deprecated since 1.4.0 - in order to support VS Code FS API (https://github.com/eclipse-theia/theia/pull/7908),
         * instead use `FileService.onDidRunUserOperation` for events triggered by user gestures
         * or `FileService.onDidRunOperation` triggered by user gestures and programmatically
         */
        this.onDidDelete = this.fileDeleteEmitter.onDid;
        this.fileMoveEmitter = new FileOperationEmitter();
        /**
         * @deprecated since 1.4.0 - in order to support VS Code FS API (https://github.com/eclipse-theia/theia/pull/7908), use `FileService.onWillRunUserOperation` instead
         */
        this.onWillMove = this.fileMoveEmitter.onWill;
        /**
         * @deprecated since 1.4.0 - in order to support VS Code FS API (https://github.com/eclipse-theia/theia/pull/7908), use `FileService.onDidFailUserOperation` instead
         */
        this.onDidFailMove = this.fileMoveEmitter.onDidFail;
        /**
         * @deprecated since 1.4.0 - in order to support VS Code FS API (https://github.com/eclipse-theia/theia/pull/7908),
         * instead use `FileService.onDidRunUserOperation` for events triggered by user gestures
         * or `FileService.onDidRunOperation` triggered by user gestures and programmatically
         */
        this.onDidMove = this.fileMoveEmitter.onDid;
    }
    FileSystemWatcher.prototype.init = function () {
        var _this = this;
        this.toDispose.push(this.onFileChangedEmitter);
        this.toDispose.push(this.fileDeleteEmitter);
        this.toDispose.push(this.fileMoveEmitter);
        this.toDispose.push(this.fileService.onWillRunUserOperation(function (event) {
            if (event.operation === 0 /* CREATE */) {
                _this.fileCreateEmitter.fireWill({ uri: event.target });
            }
            else if (event.operation === 1 /* DELETE */) {
                _this.fileDeleteEmitter.fireWill({ uri: event.target });
            }
            else if (event.operation === 2 /* MOVE */ && event.source) {
                _this.fileMoveEmitter.fireWill({ sourceUri: event.source, targetUri: event.target });
            }
        }));
        this.toDispose.push(this.fileService.onDidFailUserOperation(function (event) {
            if (event.operation === 0 /* CREATE */) {
                _this.fileCreateEmitter.fireDid(true, { uri: event.target });
            }
            else if (event.operation === 1 /* DELETE */) {
                _this.fileDeleteEmitter.fireDid(true, { uri: event.target });
            }
            else if (event.operation === 2 /* MOVE */ && event.source) {
                _this.fileMoveEmitter.fireDid(true, { sourceUri: event.source, targetUri: event.target });
            }
        }));
        this.toDispose.push(this.fileService.onDidRunUserOperation(function (event) {
            if (event.operation === 0 /* CREATE */) {
                _this.fileCreateEmitter.fireDid(false, { uri: event.target });
            }
            else if (event.operation === 1 /* DELETE */) {
                _this.fileDeleteEmitter.fireDid(false, { uri: event.target });
            }
            else if (event.operation === 2 /* MOVE */ && event.source) {
                _this.fileMoveEmitter.fireDid(false, { sourceUri: event.source, targetUri: event.target });
            }
        }));
    };
    /**
     * Stop watching.
     */
    FileSystemWatcher.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    /**
     * Start file watching under the given uri.
     *
     * Resolve when watching is started.
     * Return a disposable to stop file watching under the given uri.
     */
    FileSystemWatcher.prototype.watchFileChanges = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fileService.watch(uri)];
            });
        });
    };
    __decorate([
        inversify_1.inject(file_service_1.FileService),
        __metadata("design:type", file_service_1.FileService)
    ], FileSystemWatcher.prototype, "fileService", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], FileSystemWatcher.prototype, "init", null);
    FileSystemWatcher = __decorate([
        inversify_1.injectable()
    ], FileSystemWatcher);
    return FileSystemWatcher;
}());
exports.FileSystemWatcher = FileSystemWatcher;
//# sourceMappingURL=filesystem-watcher.js.map