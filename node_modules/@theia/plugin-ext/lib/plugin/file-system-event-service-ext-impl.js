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
 * https://github.com/microsoft/vscode/blob/04c36be045a94fee58e5f8992d3e3fd980294a84/src/vs/workbench/api/common/extHostFileSystemEventService.ts
 * One should be able to diff them to see differences.
 */
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
exports.ExtHostFileSystemEventService = void 0;
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/tslint/config */
var event_1 = require("@theia/core/lib/common/event");
var glob_1 = require("@theia/callhierarchy/lib/common/glob");
var vscode_uri_1 = require("vscode-uri");
var typeConverter = require("./type-converters");
var types_impl_1 = require("./types-impl");
var arrays_1 = require("../common/arrays");
var plugin_api_rpc_1 = require("../common/plugin-api-rpc");
var FileSystemWatcher = /** @class */ (function () {
    function FileSystemWatcher(dispatcher, globPattern, ignoreCreateEvents, ignoreChangeEvents, ignoreDeleteEvents) {
        var _this = this;
        this._onDidCreate = new event_1.Emitter();
        this._onDidChange = new event_1.Emitter();
        this._onDidDelete = new event_1.Emitter();
        this._config = 0;
        if (ignoreCreateEvents) {
            this._config += 1;
        }
        if (ignoreChangeEvents) {
            this._config += 2;
        }
        if (ignoreDeleteEvents) {
            this._config += 4;
        }
        var parsedPattern = glob_1.parse(globPattern);
        var subscription = dispatcher(function (events) {
            var e_1, _a, e_2, _b, e_3, _c;
            if (!ignoreCreateEvents) {
                try {
                    for (var _d = __values(events.created), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var created = _e.value;
                        var uri = vscode_uri_1.URI.revive(created);
                        if (parsedPattern(uri.fsPath)) {
                            _this._onDidCreate.fire(uri);
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            if (!ignoreChangeEvents) {
                try {
                    for (var _f = __values(events.changed), _g = _f.next(); !_g.done; _g = _f.next()) {
                        var changed = _g.value;
                        var uri = vscode_uri_1.URI.revive(changed);
                        if (parsedPattern(uri.fsPath)) {
                            _this._onDidChange.fire(uri);
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            if (!ignoreDeleteEvents) {
                try {
                    for (var _h = __values(events.deleted), _j = _h.next(); !_j.done; _j = _h.next()) {
                        var deleted = _j.value;
                        var uri = vscode_uri_1.URI.revive(deleted);
                        if (parsedPattern(uri.fsPath)) {
                            _this._onDidDelete.fire(uri);
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
        });
        this._disposable = types_impl_1.Disposable.from(this._onDidCreate, this._onDidChange, this._onDidDelete, subscription);
    }
    Object.defineProperty(FileSystemWatcher.prototype, "ignoreCreateEvents", {
        get: function () {
            return Boolean(this._config & 1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FileSystemWatcher.prototype, "ignoreChangeEvents", {
        get: function () {
            return Boolean(this._config & 2);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FileSystemWatcher.prototype, "ignoreDeleteEvents", {
        get: function () {
            return Boolean(this._config & 4);
        },
        enumerable: false,
        configurable: true
    });
    FileSystemWatcher.prototype.dispose = function () {
        this._disposable.dispose();
    };
    Object.defineProperty(FileSystemWatcher.prototype, "onDidCreate", {
        get: function () {
            return this._onDidCreate.event;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FileSystemWatcher.prototype, "onDidChange", {
        get: function () {
            return this._onDidChange.event;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FileSystemWatcher.prototype, "onDidDelete", {
        get: function () {
            return this._onDidDelete.event;
        },
        enumerable: false,
        configurable: true
    });
    return FileSystemWatcher;
}());
var ExtHostFileSystemEventService = /** @class */ (function () {
    function ExtHostFileSystemEventService(rpc, _extHostDocumentsAndEditors, _mainThreadTextEditors) {
        if (_mainThreadTextEditors === void 0) { _mainThreadTextEditors = rpc.getProxy(plugin_api_rpc_1.PLUGIN_RPC_CONTEXT.TEXT_EDITORS_MAIN); }
        this._extHostDocumentsAndEditors = _extHostDocumentsAndEditors;
        this._mainThreadTextEditors = _mainThreadTextEditors;
        this._onFileSystemEvent = new event_1.Emitter();
        this._onDidRenameFile = new event_1.Emitter();
        this._onDidCreateFile = new event_1.Emitter();
        this._onDidDeleteFile = new event_1.Emitter();
        this._onWillRenameFile = new event_1.AsyncEmitter();
        this._onWillCreateFile = new event_1.AsyncEmitter();
        this._onWillDeleteFile = new event_1.AsyncEmitter();
        this.onDidRenameFile = this._onDidRenameFile.event;
        this.onDidCreateFile = this._onDidCreateFile.event;
        this.onDidDeleteFile = this._onDidDeleteFile.event;
        //
    }
    // --- file events
    ExtHostFileSystemEventService.prototype.createFileSystemWatcher = function (globPattern, ignoreCreateEvents, ignoreChangeEvents, ignoreDeleteEvents) {
        return new FileSystemWatcher(this._onFileSystemEvent.event, globPattern, ignoreCreateEvents, ignoreChangeEvents, ignoreDeleteEvents);
    };
    ExtHostFileSystemEventService.prototype.$onFileEvent = function (events) {
        this._onFileSystemEvent.fire(events);
    };
    // --- file operations
    ExtHostFileSystemEventService.prototype.$onDidRunFileOperation = function (operation, target, source) {
        switch (operation) {
            case 2 /* MOVE */:
                this._onDidRenameFile.fire(Object.freeze({ files: [{ oldUri: vscode_uri_1.URI.revive(source), newUri: vscode_uri_1.URI.revive(target) }] }));
                break;
            case 1 /* DELETE */:
                this._onDidDeleteFile.fire(Object.freeze({ files: [vscode_uri_1.URI.revive(target)] }));
                break;
            case 0 /* CREATE */:
                this._onDidCreateFile.fire(Object.freeze({ files: [vscode_uri_1.URI.revive(target)] }));
                break;
            default:
            // ignore, dont send
        }
    };
    ExtHostFileSystemEventService.prototype.getOnWillRenameFileEvent = function (extension) {
        return this._createWillExecuteEvent(extension, this._onWillRenameFile);
    };
    ExtHostFileSystemEventService.prototype.getOnWillCreateFileEvent = function (extension) {
        return this._createWillExecuteEvent(extension, this._onWillCreateFile);
    };
    ExtHostFileSystemEventService.prototype.getOnWillDeleteFileEvent = function (extension) {
        return this._createWillExecuteEvent(extension, this._onWillDeleteFile);
    };
    ExtHostFileSystemEventService.prototype._createWillExecuteEvent = function (extension, emitter) {
        return function (listener, thisArg, disposables) {
            var wrappedListener = function wrapped(e) { listener.call(thisArg, e); };
            wrappedListener.extension = extension;
            return emitter.event(wrappedListener, undefined, disposables);
        };
    };
    ExtHostFileSystemEventService.prototype.$onWillRunFileOperation = function (operation, target, source, timeout, token) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = operation;
                        switch (_a) {
                            case 2 /* MOVE */: return [3 /*break*/, 1];
                            case 1 /* DELETE */: return [3 /*break*/, 3];
                            case 0 /* CREATE */: return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 7];
                    case 1: return [4 /*yield*/, this._fireWillEvent(this._onWillRenameFile, { files: [{ oldUri: vscode_uri_1.URI.revive(source), newUri: vscode_uri_1.URI.revive(target) }] }, timeout, token)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 3: return [4 /*yield*/, this._fireWillEvent(this._onWillDeleteFile, { files: [vscode_uri_1.URI.revive(target)] }, timeout, token)];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this._fireWillEvent(this._onWillCreateFile, { files: [vscode_uri_1.URI.revive(target)] }, timeout, token)];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ExtHostFileSystemEventService.prototype._fireWillEvent = function (emitter, data, timeout, token) {
        return __awaiter(this, void 0, void 0, function () {
            var edits, allEdits, edits_1, edits_1_1, edit, edits_2;
            var e_4, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        edits = [];
                        return [4 /*yield*/, emitter.fire(data, token, function (thenable, listener) { return __awaiter(_this, void 0, void 0, function () {
                                var now, result;
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            now = Date.now();
                                            return [4 /*yield*/, Promise.resolve(thenable)];
                                        case 1:
                                            result = _b.sent();
                                            if (result instanceof types_impl_1.WorkspaceEdit) {
                                                edits.push(result);
                                            }
                                            if (Date.now() - now > timeout) {
                                                console.warn('SLOW file-participant', (_a = listener.extension) === null || _a === void 0 ? void 0 : _a.model.id);
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _b.sent();
                        if (token.isCancellationRequested) {
                            return [2 /*return*/];
                        }
                        if (edits.length > 0) {
                            allEdits = new Array();
                            try {
                                for (edits_1 = __values(edits), edits_1_1 = edits_1.next(); !edits_1_1.done; edits_1_1 = edits_1.next()) {
                                    edit = edits_1_1.value;
                                    edits_2 = typeConverter.fromWorkspaceEdit(edit, this._extHostDocumentsAndEditors).edits;
                                    allEdits.push(edits_2);
                                }
                            }
                            catch (e_4_1) { e_4 = { error: e_4_1 }; }
                            finally {
                                try {
                                    if (edits_1_1 && !edits_1_1.done && (_a = edits_1.return)) _a.call(edits_1);
                                }
                                finally { if (e_4) throw e_4.error; }
                            }
                            return [2 /*return*/, this._mainThreadTextEditors.$tryApplyWorkspaceEdit({ edits: arrays_1.flatten(allEdits) })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return ExtHostFileSystemEventService;
}());
exports.ExtHostFileSystemEventService = ExtHostFileSystemEventService;
//# sourceMappingURL=file-system-event-service-ext-impl.js.map