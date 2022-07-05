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
exports.DebugInlineValueDecorator = exports.INLINE_VALUE_DECORATION_KEY = void 0;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// Based on https://github.com/theia-ide/vscode/blob/standalone/0.19.x/src/vs/workbench/contrib/debug/browser/debugEditorContribution.ts
var inversify_1 = require("inversify");
var monaco_editor_service_1 = require("@theia/monaco/lib/browser/monaco-editor-service");
var debug_console_items_1 = require("../console/debug-console-items");
var debug_preferences_1 = require("../debug-preferences");
// https://github.com/theia-ide/vscode/blob/standalone/0.19.x/src/vs/workbench/contrib/debug/browser/debugEditorContribution.ts#L40-L43
exports.INLINE_VALUE_DECORATION_KEY = 'inlinevaluedecoration';
var MAX_NUM_INLINE_VALUES = 100; // JS Global scope can have 700+ entries. We want to limit ourselves for perf reasons
var MAX_INLINE_DECORATOR_LENGTH = 150; // Max string length of each inline decorator when debugging. If exceeded ... is added
var MAX_TOKENIZATION_LINE_LEN = 500; // If line is too long, then inline values for the line are skipped
var DEFAULT_WORD_REGEXP = monaco.wordHelper.DEFAULT_WORD_REGEXP;
/**
 * MAX SMI (SMall Integer) as defined in v8.
 * one bit is lost for boxing/unboxing flag.
 * one bit is lost for sign flag.
 * See https://thibaultlaurens.github.io/javascript/2013/04/29/how-the-v8-engine-works/#tagged-values
 */
// https://github.com/theia-ide/vscode/blob/standalone/0.19.x/src/vs/base/common/uint.ts#L7-L13
var MAX_SAFE_SMALL_INTEGER = 1 << 30;
;
var DebugInlineValueDecorator = /** @class */ (function () {
    function DebugInlineValueDecorator() {
        this.enabled = false;
        this.wordToLineNumbersMap = new Map(); // TODO: can we get rid of this field?
    }
    DebugInlineValueDecorator.prototype.onStart = function () {
        var _this = this;
        this.editorService.registerDecorationType(exports.INLINE_VALUE_DECORATION_KEY, {});
        this.enabled = !!this.preferences['debug.inlineValues'];
        this.preferences.onPreferenceChanged(function (_a) {
            var preferenceName = _a.preferenceName, newValue = _a.newValue;
            if (preferenceName === 'debug.inlineValues' && !!newValue !== _this.enabled) {
                _this.enabled = !!newValue;
            }
        });
    };
    DebugInlineValueDecorator.prototype.calculateDecorations = function (debugEditorModel, stackFrame) {
        return __awaiter(this, void 0, void 0, function () {
            var model;
            return __generator(this, function (_a) {
                this.wordToLineNumbersMap = undefined;
                model = debugEditorModel.editor.getControl().getModel() || undefined;
                return [2 /*return*/, this.updateInlineValueDecorations(model, stackFrame)];
            });
        });
    };
    // https://github.com/theia-ide/vscode/blob/standalone/0.19.x/src/vs/workbench/contrib/debug/browser/debugEditorContribution.ts#L382-L408
    DebugInlineValueDecorator.prototype.updateInlineValueDecorations = function (model, stackFrame) {
        return __awaiter(this, void 0, void 0, function () {
            var stackFrameRange, scopes, decorationsPerScope;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.enabled || !model || !stackFrame || !stackFrame.source || model.uri.toString() !== stackFrame.source.uri.toString()) {
                            return [2 /*return*/, []];
                        }
                        stackFrameRange = stackFrame.range;
                        if (!stackFrameRange) {
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, stackFrame.getMostSpecificScopes(stackFrameRange)];
                    case 1:
                        scopes = _a.sent();
                        return [4 /*yield*/, Promise.all(scopes.map(function (scope) { return __awaiter(_this, void 0, void 0, function () {
                                var children, _a, _b, range;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            _b = (_a = Array).from;
                                            return [4 /*yield*/, scope.getElements()];
                                        case 1:
                                            children = _b.apply(_a, [_c.sent()]);
                                            range = new monaco.Range(0, 0, stackFrameRange.startLineNumber, stackFrameRange.startColumn);
                                            if (scope.range) {
                                                range = range.setStartPosition(scope.range.startLineNumber, scope.range.startColumn);
                                            }
                                            return [2 /*return*/, this.createInlineValueDecorationsInsideRange(children, range, model)];
                                    }
                                });
                            }); }))];
                    case 2:
                        decorationsPerScope = _a.sent();
                        return [2 /*return*/, decorationsPerScope.reduce(function (previous, current) { return previous.concat(current); }, [])];
                }
            });
        });
    };
    // https://github.com/theia-ide/vscode/blob/standalone/0.19.x/src/vs/workbench/contrib/debug/browser/debugEditorContribution.ts#L410-L452
    DebugInlineValueDecorator.prototype.createInlineValueDecorationsInsideRange = function (expressions, range, model) {
        var e_1, _a;
        var _this = this;
        var nameValueMap = new Map();
        try {
            for (var expressions_1 = __values(expressions), expressions_1_1 = expressions_1.next(); !expressions_1_1.done; expressions_1_1 = expressions_1.next()) {
                var expr = expressions_1_1.value;
                if (expr instanceof debug_console_items_1.DebugVariable) { // XXX: VS Code uses `IExpression` that has `name` and `value`.
                    nameValueMap.set(expr.name, expr.value);
                }
                // Limit the size of map. Too large can have a perf impact
                if (nameValueMap.size >= MAX_NUM_INLINE_VALUES) {
                    break;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (expressions_1_1 && !expressions_1_1.done && (_a = expressions_1.return)) _a.call(expressions_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var lineToNamesMap = new Map();
        var wordToPositionsMap = this.getWordToPositionsMap(model);
        // Compute unique set of names on each line
        nameValueMap.forEach(function (_, name) {
            var e_2, _a;
            var positions = wordToPositionsMap.get(name);
            if (positions) {
                try {
                    for (var positions_1 = __values(positions), positions_1_1 = positions_1.next(); !positions_1_1.done; positions_1_1 = positions_1.next()) {
                        var position = positions_1_1.value;
                        if (range.containsPosition(position)) {
                            if (!lineToNamesMap.has(position.lineNumber)) {
                                lineToNamesMap.set(position.lineNumber, []);
                            }
                            if (lineToNamesMap.get(position.lineNumber).indexOf(name) === -1) {
                                lineToNamesMap.get(position.lineNumber).push(name);
                            }
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (positions_1_1 && !positions_1_1.done && (_a = positions_1.return)) _a.call(positions_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        });
        var decorations = [];
        // Compute decorators for each line
        lineToNamesMap.forEach(function (names, line) {
            var contentText = names.sort(function (first, second) {
                var content = model.getLineContent(line);
                return content.indexOf(first) - content.indexOf(second);
            }).map(function (name) { return name + " = " + nameValueMap.get(name); }).join(', ');
            decorations.push(_this.createInlineValueDecoration(line, contentText));
        });
        return decorations;
    };
    // https://github.com/theia-ide/vscode/blob/standalone/0.19.x/src/vs/workbench/contrib/debug/browser/debugEditorContribution.ts#L454-L485
    DebugInlineValueDecorator.prototype.createInlineValueDecoration = function (lineNumber, contentText) {
        // If decoratorText is too long, trim and add ellipses. This could happen for minified files with everything on a single line
        if (contentText.length > MAX_INLINE_DECORATOR_LENGTH) {
            contentText = contentText.substr(0, MAX_INLINE_DECORATOR_LENGTH) + '...';
        }
        return {
            color: undefined,
            range: {
                startLineNumber: lineNumber,
                endLineNumber: lineNumber,
                startColumn: MAX_SAFE_SMALL_INTEGER,
                endColumn: MAX_SAFE_SMALL_INTEGER
            },
            renderOptions: {
                after: {
                    contentText: contentText,
                    backgroundColor: 'rgba(255, 200, 0, 0.2)',
                    margin: '10px'
                },
                dark: {
                    after: {
                        color: 'rgba(255, 255, 255, 0.5)',
                    }
                },
                light: {
                    after: {
                        color: 'rgba(0, 0, 0, 0.5)',
                    }
                }
            }
        };
    };
    // https://github.com/theia-ide/vscode/blob/standalone/0.19.x/src/vs/workbench/contrib/debug/browser/debugEditorContribution.ts#L487-L531
    DebugInlineValueDecorator.prototype.getWordToPositionsMap = function (model) {
        if (!this.wordToLineNumbersMap) {
            this.wordToLineNumbersMap = new Map();
            if (!model) {
                return this.wordToLineNumbersMap;
            }
            // For every word in every line, map its ranges for fast lookup
            for (var lineNumber = 1, len = model.getLineCount(); lineNumber <= len; ++lineNumber) {
                var lineContent = model.getLineContent(lineNumber);
                // If line is too long then skip the line
                if (lineContent.length > MAX_TOKENIZATION_LINE_LEN) {
                    continue;
                }
                model.forceTokenization(lineNumber);
                var lineTokens = model.getLineTokens(lineNumber);
                for (var tokenIndex = 0, tokenCount = lineTokens.getCount(); tokenIndex < tokenCount; tokenIndex++) {
                    var tokenStartOffset = lineTokens.getStartOffset(tokenIndex);
                    var tokenEndOffset = lineTokens.getEndOffset(tokenIndex);
                    var tokenType = lineTokens.getStandardTokenType(tokenIndex);
                    var tokenStr = lineContent.substring(tokenStartOffset, tokenEndOffset);
                    // Token is a word and not a comment
                    if (tokenType === 0 /* Other */) {
                        DEFAULT_WORD_REGEXP.lastIndex = 0; // We assume tokens will usually map 1:1 to words if they match
                        var wordMatch = DEFAULT_WORD_REGEXP.exec(tokenStr);
                        if (wordMatch) {
                            var word = wordMatch[0];
                            if (!this.wordToLineNumbersMap.has(word)) {
                                this.wordToLineNumbersMap.set(word, []);
                            }
                            this.wordToLineNumbersMap.get(word).push(new monaco.Position(lineNumber, tokenStartOffset));
                        }
                    }
                }
            }
        }
        return this.wordToLineNumbersMap;
    };
    __decorate([
        inversify_1.inject(monaco_editor_service_1.MonacoEditorService),
        __metadata("design:type", monaco_editor_service_1.MonacoEditorService)
    ], DebugInlineValueDecorator.prototype, "editorService", void 0);
    __decorate([
        inversify_1.inject(debug_preferences_1.DebugPreferences),
        __metadata("design:type", Object)
    ], DebugInlineValueDecorator.prototype, "preferences", void 0);
    DebugInlineValueDecorator = __decorate([
        inversify_1.injectable()
    ], DebugInlineValueDecorator);
    return DebugInlineValueDecorator;
}());
exports.DebugInlineValueDecorator = DebugInlineValueDecorator;
//# sourceMappingURL=debug-inline-value-decorator.js.map