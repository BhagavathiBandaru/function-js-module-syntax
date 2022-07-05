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
// based on https://github.com/microsoft/vscode/blob/04c36be045a94fee58e5f8992d3e3fd980294a84/src/vs/platform/files/common/io.ts
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
exports.readFileIntoStream = void 0;
var buffer_1 = require("@theia/core/lib/common//buffer");
var cancellation_1 = require("@theia/core/lib/common/cancellation");
var files_1 = require("./files");
/**
 * A helper to read a file from a provider with open/read/close capability into a stream.
 */
function readFileIntoStream(provider, resource, target, transformer, options, token) {
    return __awaiter(this, void 0, void 0, function () {
        var error, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    error = undefined;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, doReadFileIntoStream(provider, resource, target, transformer, options, token)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    err_1 = _a.sent();
                    error = err_1;
                    return [3 /*break*/, 5];
                case 4:
                    if (error && options.errorTransformer) {
                        error = options.errorTransformer(error);
                    }
                    target.end(error);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.readFileIntoStream = readFileIntoStream;
function doReadFileIntoStream(provider, resource, target, transformer, options, token) {
    return __awaiter(this, void 0, void 0, function () {
        var handle, totalBytesRead, bytesRead, allowedRemainingBytes, buffer, posInFile, posInBuffer, lastChunkLength, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Check for cancellation
                    throwIfCancelled(token);
                    return [4 /*yield*/, provider.open(resource, { create: false })];
                case 1:
                    handle = _a.sent();
                    // Check for cancellation
                    throwIfCancelled(token);
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 8, 9, 11]);
                    totalBytesRead = 0;
                    bytesRead = 0;
                    allowedRemainingBytes = (options && typeof options.length === 'number') ? options.length : undefined;
                    buffer = buffer_1.BinaryBuffer.alloc(Math.min(options.bufferSize, typeof allowedRemainingBytes === 'number' ? allowedRemainingBytes : options.bufferSize));
                    posInFile = options && typeof options.position === 'number' ? options.position : 0;
                    posInBuffer = 0;
                    _a.label = 3;
                case 3: return [4 /*yield*/, provider.read(handle, posInFile, buffer.buffer, posInBuffer, buffer.byteLength - posInBuffer)];
                case 4:
                    // read from source (handle) at current position (pos) into buffer (buffer) at
                    // buffer position (posInBuffer) up to the size of the buffer (buffer.byteLength).
                    bytesRead = _a.sent();
                    posInFile += bytesRead;
                    posInBuffer += bytesRead;
                    totalBytesRead += bytesRead;
                    if (typeof allowedRemainingBytes === 'number') {
                        allowedRemainingBytes -= bytesRead;
                    }
                    if (!(posInBuffer === buffer.byteLength)) return [3 /*break*/, 6];
                    return [4 /*yield*/, target.write(transformer(buffer))];
                case 5:
                    _a.sent();
                    buffer = buffer_1.BinaryBuffer.alloc(Math.min(options.bufferSize, typeof allowedRemainingBytes === 'number' ? allowedRemainingBytes : options.bufferSize));
                    posInBuffer = 0;
                    _a.label = 6;
                case 6:
                    if (bytesRead > 0 && (typeof allowedRemainingBytes !== 'number' || allowedRemainingBytes > 0) && throwIfCancelled(token) && throwIfTooLarge(totalBytesRead, options)) return [3 /*break*/, 3];
                    _a.label = 7;
                case 7:
                    // wrap up with last buffer (also respect maxBytes if provided)
                    if (posInBuffer > 0) {
                        lastChunkLength = posInBuffer;
                        if (typeof allowedRemainingBytes === 'number') {
                            lastChunkLength = Math.min(posInBuffer, allowedRemainingBytes);
                        }
                        target.write(transformer(buffer.slice(0, lastChunkLength)));
                    }
                    return [3 /*break*/, 11];
                case 8:
                    error_1 = _a.sent();
                    throw files_1.ensureFileSystemProviderError(error_1);
                case 9: return [4 /*yield*/, provider.close(handle)];
                case 10:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 11: return [2 /*return*/];
            }
        });
    });
}
function throwIfCancelled(token) {
    if (token.isCancellationRequested) {
        throw cancellation_1.cancelled();
    }
    return true;
}
function throwIfTooLarge(totalBytesRead, options) {
    // Return early if file is too large to load and we have configured limits
    if (options === null || options === void 0 ? void 0 : options.limits) {
        if (typeof options.limits.memory === 'number' && totalBytesRead > options.limits.memory) {
            throw files_1.createFileSystemProviderError('To open a file of this size, you need to restart and allow it to use more memory', files_1.FileSystemProviderErrorCode.FileExceedsMemoryLimit);
        }
        if (typeof options.limits.size === 'number' && totalBytesRead > options.limits.size) {
            throw files_1.createFileSystemProviderError('File is too large to open', files_1.FileSystemProviderErrorCode.FileTooLarge);
        }
    }
    return true;
}
//# sourceMappingURL=io.js.map