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
// based on https://github.com/microsoft/vscode/blob/04c36be045a94fee58e5f8992d3e3fd980294a84/src/vs/base/common/buffer.ts
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinaryBufferWriteableStream = exports.BinaryBufferReadableBufferedStream = exports.BinaryBufferReadableStream = exports.BinaryBufferReadable = exports.BinaryBuffer = void 0;
/* eslint-disable no-null/no-null */
var safer_buffer_1 = require("safer-buffer");
var iconv = require("iconv-lite");
var streams = require("./stream");
var hasBuffer = (typeof Buffer !== 'undefined');
var hasTextEncoder = (typeof TextEncoder !== 'undefined');
var hasTextDecoder = (typeof TextDecoder !== 'undefined');
var textEncoder;
var textDecoder;
var BinaryBuffer = /** @class */ (function () {
    function BinaryBuffer(buffer) {
        this.buffer = buffer;
        this.byteLength = this.buffer.byteLength;
    }
    BinaryBuffer.alloc = function (byteLength) {
        if (hasBuffer) {
            return new BinaryBuffer(Buffer.allocUnsafe(byteLength));
        }
        else {
            return new BinaryBuffer(new Uint8Array(byteLength));
        }
    };
    BinaryBuffer.wrap = function (actual) {
        if (hasBuffer && !(Buffer.isBuffer(actual))) {
            // https://nodejs.org/dist/latest-v10.x/docs/api/buffer.html#buffer_class_method_buffer_from_arraybuffer_byteoffset_length
            // Create a zero-copy Buffer wrapper around the ArrayBuffer pointed to by the Uint8Array
            actual = Buffer.from(actual.buffer, actual.byteOffset, actual.byteLength);
        }
        return new BinaryBuffer(actual);
    };
    BinaryBuffer.fromString = function (source) {
        if (hasBuffer) {
            return new BinaryBuffer(Buffer.from(source));
        }
        else if (hasTextEncoder) {
            if (!textEncoder) {
                textEncoder = new TextEncoder();
            }
            return new BinaryBuffer(textEncoder.encode(source));
        }
        else {
            return new BinaryBuffer(iconv.encode(source, 'utf8'));
        }
    };
    BinaryBuffer.concat = function (buffers, totalLength) {
        if (typeof totalLength === 'undefined') {
            totalLength = 0;
            for (var i = 0, len = buffers.length; i < len; i++) {
                totalLength += buffers[i].byteLength;
            }
        }
        var ret = BinaryBuffer.alloc(totalLength);
        var offset = 0;
        for (var i = 0, len = buffers.length; i < len; i++) {
            var element = buffers[i];
            ret.set(element, offset);
            offset += element.byteLength;
        }
        return ret;
    };
    BinaryBuffer.prototype.toString = function () {
        if (hasBuffer) {
            return this.buffer.toString();
        }
        else if (hasTextDecoder) {
            if (!textDecoder) {
                textDecoder = new TextDecoder();
            }
            return textDecoder.decode(this.buffer);
        }
        else {
            return iconv.decode(safer_buffer_1.Buffer.from(this.buffer), 'utf8');
        }
    };
    BinaryBuffer.prototype.slice = function (start, end) {
        // IMPORTANT: use subarray instead of slice because TypedArray#slice
        // creates shallow copy and NodeBuffer#slice doesn't. The use of subarray
        // ensures the same, performant, behaviour.
        return new BinaryBuffer(this.buffer.subarray(start, end));
    };
    BinaryBuffer.prototype.set = function (array, offset) {
        if (array instanceof BinaryBuffer) {
            this.buffer.set(array.buffer, offset);
        }
        else {
            this.buffer.set(array, offset);
        }
    };
    BinaryBuffer.prototype.readUInt32BE = function (offset) {
        return (this.buffer[offset] * Math.pow(2, 24)
            + this.buffer[offset + 1] * Math.pow(2, 16)
            + this.buffer[offset + 2] * Math.pow(2, 8)
            + this.buffer[offset + 3]);
    };
    BinaryBuffer.prototype.writeUInt32BE = function (value, offset) {
        this.buffer[offset + 3] = value;
        value = value >>> 8;
        this.buffer[offset + 2] = value;
        value = value >>> 8;
        this.buffer[offset + 1] = value;
        value = value >>> 8;
        this.buffer[offset] = value;
    };
    BinaryBuffer.prototype.readUInt32LE = function (offset) {
        return (((this.buffer[offset + 0] << 0) >>> 0) |
            ((this.buffer[offset + 1] << 8) >>> 0) |
            ((this.buffer[offset + 2] << 16) >>> 0) |
            ((this.buffer[offset + 3] << 24) >>> 0));
    };
    BinaryBuffer.prototype.writeUInt32LE = function (value, offset) {
        this.buffer[offset + 0] = (value & 255);
        value = value >>> 8;
        this.buffer[offset + 1] = (value & 255);
        value = value >>> 8;
        this.buffer[offset + 2] = (value & 255);
        value = value >>> 8;
        this.buffer[offset + 3] = (value & 255);
    };
    BinaryBuffer.prototype.readUInt8 = function (offset) {
        return this.buffer[offset];
    };
    BinaryBuffer.prototype.writeUInt8 = function (value, offset) {
        this.buffer[offset] = value;
    };
    return BinaryBuffer;
}());
exports.BinaryBuffer = BinaryBuffer;
var BinaryBufferReadable;
(function (BinaryBufferReadable) {
    function toBuffer(readable) {
        return streams.consumeReadable(readable, function (chunks) { return BinaryBuffer.concat(chunks); });
    }
    BinaryBufferReadable.toBuffer = toBuffer;
    function fromBuffer(buffer) {
        return streams.toReadable(buffer);
    }
    BinaryBufferReadable.fromBuffer = fromBuffer;
    function fromReadable(readable) {
        return {
            read: function () {
                var value = readable.read();
                if (typeof value === 'string') {
                    return BinaryBuffer.fromString(value);
                }
                return null;
            }
        };
    }
    BinaryBufferReadable.fromReadable = fromReadable;
})(BinaryBufferReadable = exports.BinaryBufferReadable || (exports.BinaryBufferReadable = {}));
var BinaryBufferReadableStream;
(function (BinaryBufferReadableStream) {
    function toBuffer(stream) {
        return streams.consumeStream(stream, function (chunks) { return BinaryBuffer.concat(chunks); });
    }
    BinaryBufferReadableStream.toBuffer = toBuffer;
    function fromBuffer(buffer) {
        return streams.toStream(buffer, function (chunks) { return BinaryBuffer.concat(chunks); });
    }
    BinaryBufferReadableStream.fromBuffer = fromBuffer;
})(BinaryBufferReadableStream = exports.BinaryBufferReadableStream || (exports.BinaryBufferReadableStream = {}));
var BinaryBufferReadableBufferedStream;
(function (BinaryBufferReadableBufferedStream) {
    function toBuffer(bufferedStream) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (bufferedStream.ended) {
                            return [2 /*return*/, BinaryBuffer.concat(bufferedStream.buffer)];
                        }
                        _b = (_a = BinaryBuffer).concat;
                        _c = [bufferedStream.buffer];
                        // ...and all additional chunks
                        return [4 /*yield*/, BinaryBufferReadableStream.toBuffer(bufferedStream.stream)];
                    case 1: return [2 /*return*/, _b.apply(_a, [__spread.apply(void 0, _c.concat([[
                                    // ...and all additional chunks
                                    _d.sent()
                                ]]))])];
                }
            });
        });
    }
    BinaryBufferReadableBufferedStream.toBuffer = toBuffer;
})(BinaryBufferReadableBufferedStream = exports.BinaryBufferReadableBufferedStream || (exports.BinaryBufferReadableBufferedStream = {}));
var BinaryBufferWriteableStream;
(function (BinaryBufferWriteableStream) {
    function create(options) {
        return streams.newWriteableStream(function (chunks) { return BinaryBuffer.concat(chunks); }, options);
    }
    BinaryBufferWriteableStream.create = create;
})(BinaryBufferWriteableStream = exports.BinaryBufferWriteableStream || (exports.BinaryBufferWriteableStream = {}));
//# sourceMappingURL=buffer.js.map