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
// based on https://github.com/microsoft/vscode/blob/04c36be045a94fee58e5f8992d3e3fd980294a84/src/vs/workbench/services/textfile/common/encoding.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.EncodingService = void 0;
/* eslint-disable no-null/no-null */
var iconv = require("iconv-lite");
var safer_buffer_1 = require("safer-buffer");
var inversify_1 = require("inversify");
var buffer_1 = require("./buffer");
var encodings_1 = require("./encodings");
var stream_1 = require("./stream");
var ZERO_BYTE_DETECTION_BUFFER_MAX_LEN = 512; // number of bytes to look at to decide about a file being binary or not
var NO_ENCODING_GUESS_MIN_BYTES = 512; // when not auto guessing the encoding, small number of bytes are enough
var AUTO_ENCODING_GUESS_MIN_BYTES = 512 * 8; // with auto guessing we want a lot more content to be read for guessing
var AUTO_ENCODING_GUESS_MAX_BYTES = 512 * 128; // set an upper limit for the number of bytes we pass on to jschardet
// we explicitly ignore a specific set of encodings from auto guessing
// - ASCII: we never want this encoding (most UTF-8 files would happily detect as
//          ASCII files and then you could not type non-ASCII characters anymore)
// - UTF-16: we have our own detection logic for UTF-16
// - UTF-32: we do not support this encoding in VSCode
var IGNORE_ENCODINGS = ['ascii', 'utf-16', 'utf-32'];
var EncodingService = /** @class */ (function () {
    function EncodingService() {
    }
    EncodingService.prototype.encode = function (value, options) {
        var encoding = options === null || options === void 0 ? void 0 : options.encoding;
        var addBOM = options === null || options === void 0 ? void 0 : options.hasBOM;
        encoding = this.toIconvEncoding(encoding);
        if (encoding === encodings_1.UTF8 && !addBOM) {
            return buffer_1.BinaryBuffer.fromString(value);
        }
        var buffer = iconv.encode(value, encoding, { addBOM: addBOM });
        return buffer_1.BinaryBuffer.wrap(buffer);
    };
    EncodingService.prototype.decode = function (value, encoding) {
        var buffer = safer_buffer_1.Buffer.from(value.buffer);
        encoding = this.toIconvEncoding(encoding);
        return iconv.decode(buffer, encoding);
    };
    EncodingService.prototype.exists = function (encoding) {
        encoding = this.toIconvEncoding(encoding);
        return iconv.encodingExists(encoding);
    };
    EncodingService.prototype.toIconvEncoding = function (encoding) {
        if (encoding === encodings_1.UTF8_with_bom || !encoding) {
            return encodings_1.UTF8; // iconv does not distinguish UTF 8 with or without BOM, so we need to help it
        }
        return encoding;
    };
    EncodingService.prototype.toResourceEncoding = function (encoding, options) {
        return __awaiter(this, void 0, void 0, function () {
            var overwriteEncoding, buffer, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Some encodings come with a BOM automatically
                        if (encoding === encodings_1.UTF16be || encoding === encodings_1.UTF16le || encoding === encodings_1.UTF8_with_bom) {
                            return [2 /*return*/, { encoding: encoding, hasBOM: true }];
                        }
                        overwriteEncoding = options === null || options === void 0 ? void 0 : options.overwriteEncoding;
                        if (!(!overwriteEncoding && encoding === encodings_1.UTF8)) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, options.read(encodings_1.UTF8_BOM.length)];
                    case 2:
                        buffer = _a.sent();
                        if (this.detectEncodingByBOMFromBuffer(safer_buffer_1.Buffer.from(buffer), buffer.byteLength) === encodings_1.UTF8_with_bom) {
                            return [2 /*return*/, { encoding: encoding, hasBOM: true }];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, { encoding: encoding, hasBOM: false }];
                }
            });
        });
    };
    EncodingService.prototype.detectEncoding = function (data, autoGuessEncoding) {
        return __awaiter(this, void 0, void 0, function () {
            var buffer, bytesRead, encoding, seemsBinary, couldBeUTF16LE, couldBeUTF16BE, containsZeroByte, i, isEndian, isZeroByte, guessedEncoding;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        buffer = safer_buffer_1.Buffer.from(data.buffer);
                        bytesRead = data.byteLength;
                        encoding = this.detectEncodingByBOMFromBuffer(buffer, bytesRead);
                        seemsBinary = false;
                        if (encoding !== encodings_1.UTF16be && encoding !== encodings_1.UTF16le && buffer) {
                            couldBeUTF16LE = true;
                            couldBeUTF16BE = true;
                            containsZeroByte = false;
                            // This is a simplified guess to detect UTF-16 BE or LE by just checking if
                            // the first 512 bytes have the 0-byte at a specific location. For UTF-16 LE
                            // this would be the odd byte index and for UTF-16 BE the even one.
                            // Note: this can produce false positives (a binary file that uses a 2-byte
                            // encoding of the same format as UTF-16) and false negatives (a UTF-16 file
                            // that is using 4 bytes to encode a character).
                            for (i = 0; i < bytesRead && i < ZERO_BYTE_DETECTION_BUFFER_MAX_LEN; i++) {
                                isEndian = (i % 2 === 1);
                                isZeroByte = (buffer.readUInt8(i) === 0);
                                if (isZeroByte) {
                                    containsZeroByte = true;
                                }
                                // UTF-16 LE: expect e.g. 0xAA 0x00
                                if (couldBeUTF16LE && (isEndian && !isZeroByte || !isEndian && isZeroByte)) {
                                    couldBeUTF16LE = false;
                                }
                                // UTF-16 BE: expect e.g. 0x00 0xAA
                                if (couldBeUTF16BE && (isEndian && isZeroByte || !isEndian && !isZeroByte)) {
                                    couldBeUTF16BE = false;
                                }
                                // Return if this is neither UTF16-LE nor UTF16-BE and thus treat as binary
                                if (isZeroByte && !couldBeUTF16LE && !couldBeUTF16BE) {
                                    break;
                                }
                            }
                            // Handle case of 0-byte included
                            if (containsZeroByte) {
                                if (couldBeUTF16LE) {
                                    encoding = encodings_1.UTF16le;
                                }
                                else if (couldBeUTF16BE) {
                                    encoding = encodings_1.UTF16be;
                                }
                                else {
                                    seemsBinary = true;
                                }
                            }
                        }
                        if (!(autoGuessEncoding && !seemsBinary && !encoding && buffer)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.guessEncodingByBuffer(buffer.slice(0, bytesRead))];
                    case 1:
                        guessedEncoding = _a.sent();
                        return [2 /*return*/, {
                                seemsBinary: false,
                                encoding: guessedEncoding
                            }];
                    case 2: return [2 /*return*/, { seemsBinary: seemsBinary, encoding: encoding }];
                }
            });
        });
    };
    EncodingService.prototype.detectEncodingByBOMFromBuffer = function (buffer, bytesRead) {
        if (!buffer || bytesRead < encodings_1.UTF16be_BOM.length) {
            return undefined;
        }
        var b0 = buffer.readUInt8(0);
        var b1 = buffer.readUInt8(1);
        // UTF-16 BE
        if (b0 === encodings_1.UTF16be_BOM[0] && b1 === encodings_1.UTF16be_BOM[1]) {
            return encodings_1.UTF16be;
        }
        // UTF-16 LE
        if (b0 === encodings_1.UTF16le_BOM[0] && b1 === encodings_1.UTF16le_BOM[1]) {
            return encodings_1.UTF16le;
        }
        if (bytesRead < encodings_1.UTF8_BOM.length) {
            return undefined;
        }
        var b2 = buffer.readUInt8(2);
        // UTF-8
        if (b0 === encodings_1.UTF8_BOM[0] && b1 === encodings_1.UTF8_BOM[1] && b2 === encodings_1.UTF8_BOM[2]) {
            return encodings_1.UTF8_with_bom;
        }
        return undefined;
    };
    EncodingService.prototype.guessEncodingByBuffer = function (buffer) {
        return __awaiter(this, void 0, void 0, function () {
            var jschardet, guessed, enc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('jschardet'); })];
                    case 1:
                        jschardet = _a.sent();
                        guessed = jschardet.detect(buffer.slice(0, AUTO_ENCODING_GUESS_MAX_BYTES));
                        if (!guessed || !guessed.encoding) {
                            return [2 /*return*/, undefined];
                        }
                        enc = guessed.encoding.toLowerCase();
                        if (0 <= IGNORE_ENCODINGS.indexOf(enc)) {
                            return [2 /*return*/, undefined]; // see comment above why we ignore some encodings
                        }
                        return [2 /*return*/, this.toIconvEncoding(guessed.encoding)];
                }
            });
        });
    };
    EncodingService.prototype.decodeStream = function (source, options) {
        var _this = this;
        var _a;
        var minBytesRequiredForDetection = ((_a = options.minBytesRequiredForDetection) !== null && _a !== void 0 ? _a : options.guessEncoding) ? AUTO_ENCODING_GUESS_MIN_BYTES : NO_ENCODING_GUESS_MIN_BYTES;
        return new Promise(function (resolve, reject) {
            var target = stream_1.newWriteableStream(function (strings) { return strings.join(''); });
            var bufferedChunks = [];
            var bytesBuffered = 0;
            var decoder = undefined;
            var createDecoder = function () { return __awaiter(_this, void 0, void 0, function () {
                var detected, _a, decoded, error_2;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, this.detectEncoding(buffer_1.BinaryBuffer.concat(bufferedChunks), options.guessEncoding)];
                        case 1:
                            detected = _b.sent();
                            // ensure to respect overwrite of encoding
                            _a = detected;
                            return [4 /*yield*/, options.overwriteEncoding(detected.encoding)];
                        case 2:
                            // ensure to respect overwrite of encoding
                            _a.encoding = _b.sent();
                            // decode and write buffered content
                            decoder = iconv.getDecoder(this.toIconvEncoding(detected.encoding));
                            decoded = decoder.write(safer_buffer_1.Buffer.from(buffer_1.BinaryBuffer.concat(bufferedChunks).buffer));
                            target.write(decoded);
                            bufferedChunks.length = 0;
                            bytesBuffered = 0;
                            // signal to the outside our detected encoding and final decoder stream
                            resolve({
                                stream: target,
                                detected: detected
                            });
                            return [3 /*break*/, 4];
                        case 3:
                            error_2 = _b.sent();
                            reject(error_2);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); };
            // Stream error: forward to target
            source.on('error', function (error) { return target.error(error); });
            // Stream data
            source.on('data', function (chunk) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!decoder) return [3 /*break*/, 1];
                            target.write(decoder.write(safer_buffer_1.Buffer.from(chunk.buffer)));
                            return [3 /*break*/, 3];
                        case 1:
                            bufferedChunks.push(chunk);
                            bytesBuffered += chunk.byteLength;
                            if (!(bytesBuffered >= minBytesRequiredForDetection)) return [3 /*break*/, 3];
                            // pause stream here until the decoder is ready
                            source.pause();
                            return [4 /*yield*/, createDecoder()];
                        case 2:
                            _a.sent();
                            // resume stream now that decoder is ready but
                            // outside of this stack to reduce recursion
                            setTimeout(function () { return source.resume(); });
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // Stream end
            source.on('end', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!decoder) return [3 /*break*/, 2];
                            return [4 /*yield*/, createDecoder()];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            // end the target with the remainders of the decoder
                            target.end(decoder === null || decoder === void 0 ? void 0 : decoder.end());
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    };
    EncodingService.prototype.encodeStream = function (value, options) {
        return __awaiter(this, void 0, void 0, function () {
            var encoding, addBOM, readable, encoder, bytesWritten, done;
            return __generator(this, function (_a) {
                encoding = options === null || options === void 0 ? void 0 : options.encoding;
                addBOM = options === null || options === void 0 ? void 0 : options.hasBOM;
                encoding = this.toIconvEncoding(encoding);
                if (encoding === encodings_1.UTF8 && !addBOM) {
                    return [2 /*return*/, value === undefined ? undefined : typeof value === 'string' ?
                            buffer_1.BinaryBuffer.fromString(value) : buffer_1.BinaryBufferReadable.fromReadable(value)];
                }
                value = value || '';
                readable = typeof value === 'string' ? stream_1.Readable.fromString(value) : value;
                encoder = iconv.getEncoder(encoding, { addBOM: addBOM });
                bytesWritten = false;
                done = false;
                return [2 /*return*/, {
                        read: function () {
                            if (done) {
                                return null;
                            }
                            var chunk = readable.read();
                            if (typeof chunk !== 'string') {
                                done = true;
                                // If we are instructed to add a BOM but we detect that no
                                // bytes have been written, we must ensure to return the BOM
                                // ourselves so that we comply with the contract.
                                if (!bytesWritten && addBOM) {
                                    switch (encoding) {
                                        case encodings_1.UTF8:
                                        case encodings_1.UTF8_with_bom:
                                            return buffer_1.BinaryBuffer.wrap(Uint8Array.from(encodings_1.UTF8_BOM));
                                        case encodings_1.UTF16be:
                                            return buffer_1.BinaryBuffer.wrap(Uint8Array.from(encodings_1.UTF16be_BOM));
                                        case encodings_1.UTF16le:
                                            return buffer_1.BinaryBuffer.wrap(Uint8Array.from(encodings_1.UTF16le_BOM));
                                    }
                                }
                                var leftovers = encoder.end();
                                if (leftovers && leftovers.length > 0) {
                                    bytesWritten = true;
                                    return buffer_1.BinaryBuffer.wrap(leftovers);
                                }
                                return null;
                            }
                            bytesWritten = true;
                            return buffer_1.BinaryBuffer.wrap(encoder.write(chunk));
                        }
                    }];
            });
        });
    };
    EncodingService = __decorate([
        inversify_1.injectable()
    ], EncodingService);
    return EncodingService;
}());
exports.EncodingService = EncodingService;
//# sourceMappingURL=encoding-service.js.map