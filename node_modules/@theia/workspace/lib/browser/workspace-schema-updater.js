"use strict";
/********************************************************************************
 * Copyright (C) 2021 Ericsson and others.
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
exports.workspaceSchema = exports.workspaceSchemaId = exports.WorkspaceSchema = exports.WorkspaceSchemaUpdater = exports.AddKeyMessage = void 0;
var inversify_1 = require("inversify");
var common_1 = require("@theia/core/lib/common");
var uri_1 = require("@theia/core/lib/common/uri");
var promise_util_1 = require("@theia/core/lib/common/promise-util");
var AddKeyMessage;
(function (AddKeyMessage) {
    AddKeyMessage.is = function (message) { return !!message && message.schema !== undefined; };
})(AddKeyMessage = exports.AddKeyMessage || (exports.AddKeyMessage = {}));
var WorkspaceSchemaUpdater = /** @class */ (function () {
    function WorkspaceSchemaUpdater() {
        this.uri = new uri_1.default(exports.workspaceSchemaId);
        this.editQueue = [];
        this.safeToHandleQueue = new promise_util_1.Deferred();
    }
    WorkspaceSchemaUpdater.prototype.init = function () {
        this.inmemoryResources.add(this.uri, JSON.stringify(exports.workspaceSchema));
        this.safeToHandleQueue.resolve();
    };
    WorkspaceSchemaUpdater.prototype.registerSchemas = function (context) {
        context.registerSchema({
            fileMatch: ['*.theia-workspace', '*.code-workspace'],
            url: this.uri.toString()
        });
    };
    WorkspaceSchemaUpdater.prototype.retrieveCurrent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var current, content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.inmemoryResources.resolve(this.uri).readContents()];
                    case 1:
                        current = _a.sent();
                        content = JSON.parse(current);
                        if (!WorkspaceSchema.is(content)) {
                            throw new Error('Failed to retrieve current workspace schema.');
                        }
                        return [2 /*return*/, content];
                }
            });
        });
    };
    WorkspaceSchemaUpdater.prototype.updateSchema = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var doHandle, deferred;
            return __generator(this, function (_a) {
                doHandle = this.editQueue.length === 0;
                deferred = new promise_util_1.Deferred();
                this.editQueue.push(__assign(__assign({}, message), { deferred: deferred }));
                if (doHandle) {
                    this.handleQueue();
                }
                return [2 /*return*/, deferred.promise];
            });
        });
    };
    WorkspaceSchemaUpdater.prototype.handleQueue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cache, nextMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.safeToHandleQueue.promise];
                    case 1:
                        _a.sent();
                        this.safeToHandleQueue = new promise_util_1.Deferred();
                        return [4 /*yield*/, this.retrieveCurrent()];
                    case 2:
                        cache = _a.sent();
                        while (this.editQueue.length) {
                            nextMessage = this.editQueue.shift();
                            if (AddKeyMessage.is(nextMessage)) {
                                this.addKey(nextMessage, cache);
                            }
                            else if (nextMessage) {
                                this.removeKey(nextMessage, cache);
                            }
                        }
                        this.inmemoryResources.update(this.uri, JSON.stringify(cache));
                        this.safeToHandleQueue.resolve();
                        return [2 /*return*/];
                }
            });
        });
    };
    WorkspaceSchemaUpdater.prototype.addKey = function (_a, cache) {
        var key = _a.key, schema = _a.schema, deferred = _a.deferred;
        if (key in cache.properties) {
            return deferred.resolve(false);
        }
        cache.properties[key] = schema;
        deferred.resolve(true);
    };
    WorkspaceSchemaUpdater.prototype.removeKey = function (_a, cache) {
        var key = _a.key, deferred = _a.deferred;
        var canDelete = !cache.required.includes(key);
        if (!canDelete) {
            return deferred.resolve(false);
        }
        var keyPresent = delete cache.properties[key];
        deferred.resolve(keyPresent);
    };
    __decorate([
        inversify_1.inject(common_1.InMemoryResources),
        __metadata("design:type", common_1.InMemoryResources)
    ], WorkspaceSchemaUpdater.prototype, "inmemoryResources", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], WorkspaceSchemaUpdater.prototype, "init", null);
    WorkspaceSchemaUpdater = __decorate([
        inversify_1.injectable()
    ], WorkspaceSchemaUpdater);
    return WorkspaceSchemaUpdater;
}());
exports.WorkspaceSchemaUpdater = WorkspaceSchemaUpdater;
var WorkspaceSchema;
(function (WorkspaceSchema) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    WorkspaceSchema.is = function (candidate) { return !!candidate
        && typeof candidate === 'object'
        && 'properties' in candidate
        && typeof candidate.properties === 'object'
        && 'required' in candidate
        && Array.isArray(candidate.required); };
})(WorkspaceSchema = exports.WorkspaceSchema || (exports.WorkspaceSchema = {}));
exports.workspaceSchemaId = 'vscode://schemas/workspace';
exports.workspaceSchema = {
    $id: exports.workspaceSchemaId,
    type: 'object',
    title: 'Workspace File',
    required: ['folders'],
    default: { folders: [{ path: '' }], settings: {} },
    properties: {
        folders: {
            description: 'Root folders in the workspace',
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    path: {
                        type: 'string',
                    }
                },
                required: ['path']
            }
        }
    },
};
//# sourceMappingURL=workspace-schema-updater.js.map