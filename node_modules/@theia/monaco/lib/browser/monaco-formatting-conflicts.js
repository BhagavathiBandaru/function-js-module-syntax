"use strict";
/********************************************************************************
 * Copyright (C) 2020 Red Hat, Inc. and others.
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
exports.MonacoFormattingConflictsContribution = void 0;
var inversify_1 = require("inversify");
var monaco_quick_open_service_1 = require("./monaco-quick-open-service");
var quick_open_model_1 = require("@theia/core/lib/common/quick-open-model");
var promise_util_1 = require("@theia/core/lib/common/promise-util");
var browser_1 = require("@theia/core/lib/browser");
var browser_2 = require("@theia/core/lib/browser");
var browser_3 = require("@theia/editor/lib/browser");
var PREFERENCE_NAME = 'editor.defaultFormatter';
var MonacoFormattingConflictsContribution = /** @class */ (function () {
    function MonacoFormattingConflictsContribution() {
    }
    MonacoFormattingConflictsContribution.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                monaco.format.FormattingConflicts.setFormatterSelector(function (formatters, document, mode) {
                    return _this.selectFormatter(formatters, document, mode);
                });
                return [2 /*return*/];
            });
        });
    };
    MonacoFormattingConflictsContribution.prototype.setDefaultFormatter = function (language, formatter) {
        return __awaiter(this, void 0, void 0, function () {
            var name;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = this.preferenceSchema.overridePreferenceName({
                            preferenceName: PREFERENCE_NAME,
                            overrideIdentifier: language
                        });
                        return [4 /*yield*/, this.preferenceService.set(name, formatter)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MonacoFormattingConflictsContribution.prototype.getDefaultFormatter = function (language) {
        var name = this.preferenceSchema.overridePreferenceName({
            preferenceName: PREFERENCE_NAME,
            overrideIdentifier: language
        });
        return this.preferenceService.get(name);
    };
    MonacoFormattingConflictsContribution.prototype.selectFormatter = function (formatters, document, mode) {
        return __awaiter(this, void 0, void 0, function () {
            var currentEditor, languageId, defaultFormatterId, formatter, deferred, items, model;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (formatters.length === 0) {
                            return [2 /*return*/, undefined];
                        }
                        if (formatters.length === 1) {
                            return [2 /*return*/, formatters[0]];
                        }
                        currentEditor = this.editorManager.currentEditor;
                        if (!currentEditor) {
                            return [2 /*return*/, undefined];
                        }
                        languageId = currentEditor.editor.document.languageId;
                        return [4 /*yield*/, this.getDefaultFormatter(languageId)];
                    case 1:
                        defaultFormatterId = _a.sent();
                        if (defaultFormatterId) {
                            formatter = formatters.find(function (f) { return f.extensionId && f.extensionId.value === defaultFormatterId; });
                            if (formatter) {
                                return [2 /*return*/, formatter];
                            }
                        }
                        deferred = new promise_util_1.Deferred();
                        items = formatters
                            .filter(function (formatter) { return formatter.displayName; })
                            .map(function (formatter) {
                            var displayName = formatter.displayName;
                            var extensionId = formatter.extensionId ? formatter.extensionId.value : undefined;
                            return new quick_open_model_1.QuickOpenItem({
                                label: displayName,
                                detail: extensionId,
                                run: function (openMode) {
                                    if (openMode === quick_open_model_1.QuickOpenMode.OPEN) {
                                        if (deferred) {
                                            deferred.resolve(formatter);
                                            deferred = undefined;
                                        }
                                        _this.quickOpenService.hide();
                                        _this.setDefaultFormatter(languageId, extensionId ? extensionId : '');
                                        return true;
                                    }
                                    return false;
                                }
                            });
                        })
                            .sort(function (a, b) { return a.getLabel().localeCompare(b.getLabel()); });
                        model = {
                            onType: function (lookFor, acceptor) {
                                acceptor(items);
                            }
                        };
                        this.quickOpenService.open(model, {
                            fuzzyMatchDescription: true,
                            fuzzyMatchLabel: true,
                            fuzzyMatchDetail: true,
                            placeholder: 'Select formatter for the current document',
                            ignoreFocusOut: false,
                            onClose: function () {
                                if (deferred) {
                                    deferred.resolve(undefined);
                                    deferred = undefined;
                                }
                            }
                        });
                        return [2 /*return*/, deferred.promise];
                }
            });
        });
    };
    __decorate([
        inversify_1.inject(monaco_quick_open_service_1.MonacoQuickOpenService),
        __metadata("design:type", monaco_quick_open_service_1.MonacoQuickOpenService)
    ], MonacoFormattingConflictsContribution.prototype, "quickOpenService", void 0);
    __decorate([
        inversify_1.inject(browser_1.PreferenceService),
        __metadata("design:type", Object)
    ], MonacoFormattingConflictsContribution.prototype, "preferenceService", void 0);
    __decorate([
        inversify_1.inject(browser_2.PreferenceSchemaProvider),
        __metadata("design:type", browser_2.PreferenceSchemaProvider)
    ], MonacoFormattingConflictsContribution.prototype, "preferenceSchema", void 0);
    __decorate([
        inversify_1.inject(browser_3.EditorManager),
        __metadata("design:type", browser_3.EditorManager)
    ], MonacoFormattingConflictsContribution.prototype, "editorManager", void 0);
    MonacoFormattingConflictsContribution = __decorate([
        inversify_1.injectable()
    ], MonacoFormattingConflictsContribution);
    return MonacoFormattingConflictsContribution;
}());
exports.MonacoFormattingConflictsContribution = MonacoFormattingConflictsContribution;
//# sourceMappingURL=monaco-formatting-conflicts.js.map