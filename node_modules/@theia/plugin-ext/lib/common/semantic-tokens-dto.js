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
exports.decodeSemanticTokensDto = exports.encodeSemanticTokensDto = void 0;
// copied and modified from https://github.com/microsoft/vscode/blob/0eb3a02ca2bcfab5faa3dc6e52d7c079efafcab0/src/vs/workbench/api/common/shared/semanticTokensDto.ts
var buffer_1 = require("@theia/core/lib/common/buffer");
var _isLittleEndian = true;
var _isLittleEndianComputed = false;
function isLittleEndian() {
    if (!_isLittleEndianComputed) {
        _isLittleEndianComputed = true;
        var test_1 = new Uint8Array(2);
        test_1[0] = 1;
        test_1[1] = 2;
        var view = new Uint16Array(test_1.buffer);
        _isLittleEndian = (view[0] === (2 << 8) + 1);
    }
    return _isLittleEndian;
}
function reverseEndianness(arr) {
    for (var i = 0, len = arr.length; i < len; i += 4) {
        // flip bytes 0<->3 and 1<->2
        var b0 = arr[i + 0];
        var b1 = arr[i + 1];
        var b2 = arr[i + 2];
        var b3 = arr[i + 3];
        arr[i + 0] = b3;
        arr[i + 1] = b2;
        arr[i + 2] = b1;
        arr[i + 3] = b0;
    }
}
function toLittleEndianBuffer(arr) {
    var uint8Arr = new Uint8Array(arr.buffer, arr.byteOffset, arr.length * 4);
    if (!isLittleEndian()) {
        // the byte order must be changed
        reverseEndianness(uint8Arr);
    }
    return buffer_1.BinaryBuffer.wrap(uint8Arr);
}
function fromLittleEndianBuffer(buff) {
    var uint8Arr = buff.buffer;
    if (!isLittleEndian()) {
        // the byte order must be changed
        reverseEndianness(uint8Arr);
    }
    if (uint8Arr.byteOffset % 4 === 0) {
        return new Uint32Array(uint8Arr.buffer, uint8Arr.byteOffset, uint8Arr.length / 4);
    }
    else {
        // unaligned memory access doesn't work on all platforms
        var data = new Uint8Array(uint8Arr.byteLength);
        data.set(uint8Arr);
        return new Uint32Array(data.buffer, data.byteOffset, data.length / 4);
    }
}
function encodeSemanticTokensDto(semanticTokens) {
    var e_1, _a;
    var dest = new Uint32Array(encodeSemanticTokensDtoSize(semanticTokens));
    var offset = 0;
    dest[offset++] = semanticTokens.id;
    if (semanticTokens.type === 'full') {
        dest[offset++] = 1 /* Full */;
        dest[offset++] = semanticTokens.data.length;
        dest.set(semanticTokens.data, offset);
        offset += semanticTokens.data.length;
    }
    else {
        dest[offset++] = 2 /* Delta */;
        dest[offset++] = semanticTokens.deltas.length;
        try {
            for (var _b = __values(semanticTokens.deltas), _c = _b.next(); !_c.done; _c = _b.next()) {
                var delta = _c.value;
                dest[offset++] = delta.start;
                dest[offset++] = delta.deleteCount;
                if (delta.data) {
                    dest[offset++] = delta.data.length;
                    dest.set(delta.data, offset);
                    offset += delta.data.length;
                }
                else {
                    dest[offset++] = 0;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    return toLittleEndianBuffer(dest);
}
exports.encodeSemanticTokensDto = encodeSemanticTokensDto;
function encodeSemanticTokensDtoSize(semanticTokens) {
    var e_2, _a;
    var result = 0;
    result += (+1 // id
        + 1 // type
    );
    if (semanticTokens.type === 'full') {
        result += (+1 // data length
            + semanticTokens.data.length);
    }
    else {
        result += (+1 // delta count
        );
        result += (+1 // start
            + 1 // deleteCount
            + 1 // data length
        ) * semanticTokens.deltas.length;
        try {
            for (var _b = __values(semanticTokens.deltas), _c = _b.next(); !_c.done; _c = _b.next()) {
                var delta = _c.value;
                if (delta.data) {
                    result += delta.data.length;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
    return result;
}
function decodeSemanticTokensDto(_buff) {
    var src = fromLittleEndianBuffer(_buff);
    var offset = 0;
    var id = src[offset++];
    var type = src[offset++];
    if (type === 1 /* Full */) {
        var length_1 = src[offset++];
        var data = src.subarray(offset, offset + length_1);
        offset += length_1;
        return {
            id: id,
            type: 'full',
            data: data
        };
    }
    var deltaCount = src[offset++];
    var deltas = [];
    for (var i = 0; i < deltaCount; i++) {
        var start = src[offset++];
        var deleteCount = src[offset++];
        var length_2 = src[offset++];
        var data = void 0;
        if (length_2 > 0) {
            data = src.subarray(offset, offset + length_2);
            offset += length_2;
        }
        deltas[i] = { start: start, deleteCount: deleteCount, data: data };
    }
    return {
        id: id,
        type: 'delta',
        deltas: deltas
    };
}
exports.decodeSemanticTokensDto = decodeSemanticTokensDto;
//# sourceMappingURL=semantic-tokens-dto.js.map