"use strict";
/********************************************************************************
 * Copyright (C) 2018 TypeFox and others.
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
exports.compareSubstringIgnoreCase = exports.compareIgnoreCase = exports.compareSubstring = exports.compare = exports.unescapeInvisibleChars = exports.escapeInvisibleChars = exports.split = exports.startsWithIgnoreCase = exports.escapeRegExpCharacters = exports.commonPrefixLength = exports.equalsIgnoreCase = exports.isUpperAsciiLetter = exports.isLowerAsciiLetter = exports.endsWith = void 0;
/**
 * Determines if haystack ends with needle.
 */
function endsWith(haystack, needle) {
    var diff = haystack.length - needle.length;
    if (diff > 0) {
        return haystack.indexOf(needle, diff) === diff;
    }
    else if (diff === 0) {
        return haystack === needle;
    }
    else {
        return false;
    }
}
exports.endsWith = endsWith;
function isLowerAsciiLetter(code) {
    return code >= 97 /* a */ && code <= 122 /* z */;
}
exports.isLowerAsciiLetter = isLowerAsciiLetter;
function isUpperAsciiLetter(code) {
    return code >= 65 /* A */ && code <= 90 /* Z */;
}
exports.isUpperAsciiLetter = isUpperAsciiLetter;
function isAsciiLetter(code) {
    return isLowerAsciiLetter(code) || isUpperAsciiLetter(code);
}
function equalsIgnoreCase(a, b) {
    var len1 = a ? a.length : 0;
    var len2 = b ? b.length : 0;
    if (len1 !== len2) {
        return false;
    }
    return doEqualsIgnoreCase(a, b);
}
exports.equalsIgnoreCase = equalsIgnoreCase;
function doEqualsIgnoreCase(a, b, stopAt) {
    if (stopAt === void 0) { stopAt = a.length; }
    if (typeof a !== 'string' || typeof b !== 'string') {
        return false;
    }
    for (var i = 0; i < stopAt; i++) {
        var codeA = a.charCodeAt(i);
        var codeB = b.charCodeAt(i);
        if (codeA === codeB) {
            continue;
        }
        // a-z A-Z
        if (isAsciiLetter(codeA) && isAsciiLetter(codeB)) {
            var diff = Math.abs(codeA - codeB);
            if (diff !== 0 && diff !== 32) {
                return false;
            }
        }
        // Any other charcode
        // tslint:disable-next-line:one-line
        else {
            if (String.fromCharCode(codeA).toLowerCase() !== String.fromCharCode(codeB).toLowerCase()) {
                return false;
            }
        }
    }
    return true;
}
/**
 * @returns the length of the common prefix of the two strings.
 */
function commonPrefixLength(a, b) {
    var i;
    var len = Math.min(a.length, b.length);
    for (i = 0; i < len; i++) {
        if (a.charCodeAt(i) !== b.charCodeAt(i)) {
            return i;
        }
    }
    return len;
}
exports.commonPrefixLength = commonPrefixLength;
/**
 * Escapes regular expression characters in a given string
 */
function escapeRegExpCharacters(value) {
    return value.replace(/[\-\\\{\}\*\+\?\|\^\$\.\[\]\(\)\#]/g, '\\$&');
}
exports.escapeRegExpCharacters = escapeRegExpCharacters;
function startsWithIgnoreCase(str, candidate) {
    var candidateLength = candidate.length;
    if (candidate.length > str.length) {
        return false;
    }
    return doEqualsIgnoreCase(str, candidate, candidateLength);
}
exports.startsWithIgnoreCase = startsWithIgnoreCase;
function split(s, splitter) {
    var start, end;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                start = 0;
                _a.label = 1;
            case 1:
                if (!(start < s.length)) return [3 /*break*/, 3];
                end = s.indexOf(splitter, start);
                if (end === -1) {
                    end = s.length;
                }
                return [4 /*yield*/, s.substring(start, end)];
            case 2:
                _a.sent();
                start = end + splitter.length;
                return [3 /*break*/, 1];
            case 3: return [2 /*return*/];
        }
    });
}
exports.split = split;
function escapeInvisibleChars(value) {
    return value.replace(/\n/g, '\\n').replace(/\r/g, '\\r');
}
exports.escapeInvisibleChars = escapeInvisibleChars;
function unescapeInvisibleChars(value) {
    return value.replace(/\\n/g, '\n').replace(/\\r/g, '\r');
}
exports.unescapeInvisibleChars = unescapeInvisibleChars;
function compare(a, b) {
    if (a < b) {
        return -1;
    }
    else if (a > b) {
        return 1;
    }
    else {
        return 0;
    }
}
exports.compare = compare;
function compareSubstring(a, b, aStart, aEnd, bStart, bEnd) {
    if (aStart === void 0) { aStart = 0; }
    if (aEnd === void 0) { aEnd = a.length; }
    if (bStart === void 0) { bStart = 0; }
    if (bEnd === void 0) { bEnd = b.length; }
    for (; aStart < aEnd && bStart < bEnd; aStart++, bStart++) {
        var codeA = a.charCodeAt(aStart);
        var codeB = b.charCodeAt(bStart);
        if (codeA < codeB) {
            return -1;
        }
        else if (codeA > codeB) {
            return 1;
        }
    }
    var aLen = aEnd - aStart;
    var bLen = bEnd - bStart;
    if (aLen < bLen) {
        return -1;
    }
    else if (aLen > bLen) {
        return 1;
    }
    return 0;
}
exports.compareSubstring = compareSubstring;
function compareIgnoreCase(a, b) {
    return compareSubstringIgnoreCase(a, b, 0, a.length, 0, b.length);
}
exports.compareIgnoreCase = compareIgnoreCase;
function compareSubstringIgnoreCase(a, b, aStart, aEnd, bStart, bEnd) {
    if (aStart === void 0) { aStart = 0; }
    if (aEnd === void 0) { aEnd = a.length; }
    if (bStart === void 0) { bStart = 0; }
    if (bEnd === void 0) { bEnd = b.length; }
    for (; aStart < aEnd && bStart < bEnd; aStart++, bStart++) {
        var codeA = a.charCodeAt(aStart);
        var codeB = b.charCodeAt(bStart);
        if (codeA === codeB) {
            // equal
            continue;
        }
        var diff = codeA - codeB;
        if (diff === 32 && isUpperAsciiLetter(codeB)) { // codeB =[65-90] && codeA =[97-122]
            continue;
        }
        else if (diff === -32 && isUpperAsciiLetter(codeA)) { // codeB =[97-122] && codeA =[65-90]
            continue;
        }
        if (isLowerAsciiLetter(codeA) && isLowerAsciiLetter(codeB)) {
            //
            return diff;
        }
        else {
            return compareSubstring(a.toLowerCase(), b.toLowerCase(), aStart, aEnd, bStart, bEnd);
        }
    }
    var aLen = aEnd - aStart;
    var bLen = bEnd - bStart;
    if (aLen < bLen) {
        return -1;
    }
    else if (aLen > bLen) {
        return 1;
    }
    return 0;
}
exports.compareSubstringIgnoreCase = compareSubstringIgnoreCase;
//# sourceMappingURL=strings.js.map