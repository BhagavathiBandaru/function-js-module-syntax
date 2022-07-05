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
exports.DocumentRangeSemanticTokensAdapter = exports.DocumentSemanticTokensAdapter = void 0;
var types_impl_1 = require("../types-impl");
var type_converters_1 = require("../type-converters");
var semantic_tokens_dto_1 = require("../../common/semantic-tokens-dto");
var SemanticTokensPreviousResult = /** @class */ (function () {
    function SemanticTokensPreviousResult(resultId, tokens) {
        this.resultId = resultId;
        this.tokens = tokens;
    }
    return SemanticTokensPreviousResult;
}());
var DocumentSemanticTokensAdapter = /** @class */ (function () {
    function DocumentSemanticTokensAdapter(_documents, _provider) {
        this._documents = _documents;
        this._provider = _provider;
        this._nextResultId = 1;
        this._previousResults = new Map();
    }
    DocumentSemanticTokensAdapter.prototype.provideDocumentSemanticTokens = function (resource, previousResultId, token) {
        return __awaiter(this, void 0, void 0, function () {
            var doc, previousResult, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        doc = this._documents.getDocument(resource);
                        previousResult = (previousResultId !== 0 ? this._previousResults.get(previousResultId) : null);
                        if (!(previousResult && typeof previousResult.resultId === 'string' && typeof this._provider.provideDocumentSemanticTokensEdits === 'function')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._provider.provideDocumentSemanticTokensEdits(doc, previousResult.resultId, token)];
                    case 1:
                        value = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this._provider.provideDocumentSemanticTokens(doc, token)];
                    case 3:
                        value = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (previousResult) {
                            this._previousResults.delete(previousResultId);
                        }
                        if (!value) {
                            return [2 /*return*/, null];
                        }
                        value = DocumentSemanticTokensAdapter._fixProvidedSemanticTokens(value);
                        return [2 /*return*/, this._send(DocumentSemanticTokensAdapter._convertToEdits(previousResult, value), value)];
                }
            });
        });
    };
    DocumentSemanticTokensAdapter.prototype.releaseDocumentSemanticColoring = function (semanticColoringResultId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._previousResults.delete(semanticColoringResultId);
                return [2 /*return*/];
            });
        });
    };
    DocumentSemanticTokensAdapter._fixProvidedSemanticTokens = function (v) {
        if (DocumentSemanticTokensAdapter._isSemanticTokens(v)) {
            if (DocumentSemanticTokensAdapter._isCorrectSemanticTokens(v)) {
                return v;
            }
            return new types_impl_1.SemanticTokens(new Uint32Array(v.data), v.resultId);
        }
        else if (DocumentSemanticTokensAdapter._isSemanticTokensEdits(v)) {
            if (DocumentSemanticTokensAdapter._isCorrectSemanticTokensEdits(v)) {
                return v;
            }
            return new types_impl_1.SemanticTokensEdits(v.edits.map(function (edit) { return new types_impl_1.SemanticTokensEdit(edit.start, edit.deleteCount, edit.data ?
                new Uint32Array(edit.data) : edit.data); }), v.resultId);
        }
        return v;
    };
    DocumentSemanticTokensAdapter._isSemanticTokens = function (v) {
        return v && !!(v.data);
    };
    DocumentSemanticTokensAdapter._isCorrectSemanticTokens = function (v) {
        return (v.data instanceof Uint32Array);
    };
    DocumentSemanticTokensAdapter._isSemanticTokensEdits = function (v) {
        return v && Array.isArray(v.edits);
    };
    DocumentSemanticTokensAdapter._isCorrectSemanticTokensEdits = function (v) {
        var e_1, _a;
        try {
            for (var _b = __values(v.edits), _c = _b.next(); !_c.done; _c = _b.next()) {
                var edit = _c.value;
                if (!(edit.data instanceof Uint32Array)) {
                    return false;
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
        return true;
    };
    DocumentSemanticTokensAdapter._convertToEdits = function (previousResult, newResult) {
        if (!DocumentSemanticTokensAdapter._isSemanticTokens(newResult)) {
            return newResult;
        }
        if (!previousResult || !previousResult.tokens) {
            return newResult;
        }
        var oldData = previousResult.tokens;
        var oldLength = oldData.length;
        var newData = newResult.data;
        var newLength = newData.length;
        var commonPrefixLength = 0;
        var maxCommonPrefixLength = Math.min(oldLength, newLength);
        while (commonPrefixLength < maxCommonPrefixLength && oldData[commonPrefixLength] === newData[commonPrefixLength]) {
            commonPrefixLength++;
        }
        if (commonPrefixLength === oldLength && commonPrefixLength === newLength) {
            // complete overlap!
            return new types_impl_1.SemanticTokensEdits([], newResult.resultId);
        }
        var commonSuffixLength = 0;
        var maxCommonSuffixLength = maxCommonPrefixLength - commonPrefixLength;
        while (commonSuffixLength < maxCommonSuffixLength && oldData[oldLength - commonSuffixLength - 1] === newData[newLength - commonSuffixLength - 1]) {
            commonSuffixLength++;
        }
        return new types_impl_1.SemanticTokensEdits([{
                start: commonPrefixLength,
                deleteCount: (oldLength - commonPrefixLength - commonSuffixLength),
                data: newData.subarray(commonPrefixLength, newLength - commonSuffixLength)
            }], newResult.resultId);
    };
    DocumentSemanticTokensAdapter.prototype._send = function (value, original) {
        if (DocumentSemanticTokensAdapter._isSemanticTokens(value)) {
            var myId = this._nextResultId++;
            this._previousResults.set(myId, new SemanticTokensPreviousResult(value.resultId, value.data));
            return semantic_tokens_dto_1.encodeSemanticTokensDto({
                id: myId,
                type: 'full',
                data: value.data
            });
        }
        if (DocumentSemanticTokensAdapter._isSemanticTokensEdits(value)) {
            var myId = this._nextResultId++;
            if (DocumentSemanticTokensAdapter._isSemanticTokens(original)) {
                // store the original
                this._previousResults.set(myId, new SemanticTokensPreviousResult(original.resultId, original.data));
            }
            else {
                this._previousResults.set(myId, new SemanticTokensPreviousResult(value.resultId));
            }
            return semantic_tokens_dto_1.encodeSemanticTokensDto({
                id: myId,
                type: 'delta',
                deltas: (value.edits || []).map(function (edit) { return ({ start: edit.start, deleteCount: edit.deleteCount, data: edit.data }); })
            });
        }
        return null;
    };
    return DocumentSemanticTokensAdapter;
}());
exports.DocumentSemanticTokensAdapter = DocumentSemanticTokensAdapter;
var DocumentRangeSemanticTokensAdapter = /** @class */ (function () {
    function DocumentRangeSemanticTokensAdapter(_documents, _provider) {
        this._documents = _documents;
        this._provider = _provider;
    }
    DocumentRangeSemanticTokensAdapter.prototype.provideDocumentRangeSemanticTokens = function (resource, range, token) {
        return __awaiter(this, void 0, void 0, function () {
            var doc, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        doc = this._documents.getDocument(resource);
                        return [4 /*yield*/, this._provider.provideDocumentRangeSemanticTokens(doc, type_converters_1.toRange(range), token)];
                    case 1:
                        value = _a.sent();
                        if (!value) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, this._send(value)];
                }
            });
        });
    };
    DocumentRangeSemanticTokensAdapter.prototype._send = function (value) {
        return semantic_tokens_dto_1.encodeSemanticTokensDto({
            id: 0,
            type: 'full',
            data: value.data
        });
    };
    return DocumentRangeSemanticTokensAdapter;
}());
exports.DocumentRangeSemanticTokensAdapter = DocumentRangeSemanticTokensAdapter;
//# sourceMappingURL=semantic-highlighting.js.map