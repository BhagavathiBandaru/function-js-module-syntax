"use strict";
/********************************************************************************
 * Copyright (C) 2017 Ericsson and others.
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
exports.KeymapsService = void 0;
var inversify_1 = require("inversify");
var browser_1 = require("@theia/core/lib/browser");
var keybinding_1 = require("@theia/core/lib/browser/keybinding");
var keybinding_2 = require("@theia/core/lib/common/keybinding");
var browser_2 = require("@theia/userstorage/lib/browser");
var jsoncparser = require("jsonc-parser");
var event_1 = require("@theia/core/lib/common/event");
var monaco_text_model_service_1 = require("@theia/monaco/lib/browser/monaco-text-model-service");
var promise_util_1 = require("@theia/core/lib/common/promise-util");
var uri_1 = require("@theia/core/lib/common/uri");
var monaco_workspace_1 = require("@theia/monaco/lib/browser/monaco-workspace");
var message_service_1 = require("@theia/core/lib/common/message-service");
var KeymapsService = /** @class */ (function () {
    function KeymapsService() {
        this.changeKeymapEmitter = new event_1.Emitter();
        this.onDidChangeKeymaps = this.changeKeymapEmitter.event;
        this.deferredModel = new promise_util_1.Deferred();
    }
    /**
     * Initialize the keybinding service.
     */
    KeymapsService.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var reference;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.textModelService.createModelReference(browser_2.UserStorageUri.resolve('keymaps.json'))];
                    case 1:
                        reference = _a.sent();
                        this.model = reference.object;
                        this.deferredModel.resolve(this.model);
                        this.reconcile();
                        this.model.onDidChangeContent(function () { return _this.reconcile(); });
                        this.model.onDirtyChanged(function () { return _this.reconcile(); });
                        this.model.onDidChangeValid(function () { return _this.reconcile(); });
                        this.keybindingRegistry.onKeybindingsChanged(function () { return _this.changeKeymapEmitter.fire(undefined); });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Reconcile all the keybindings, registering them to the registry.
     */
    KeymapsService.prototype.reconcile = function () {
        var e_1, _a;
        var model = this.model;
        if (!model || model.dirty) {
            return;
        }
        try {
            var keybindings = [];
            if (model.valid) {
                var content = model.getText();
                var json = jsoncparser.parse(content, undefined, { disallowComments: false });
                if (Array.isArray(json)) {
                    try {
                        for (var json_1 = __values(json), json_1_1 = json_1.next(); !json_1_1.done; json_1_1 = json_1.next()) {
                            var value = json_1_1.value;
                            if (keybinding_2.Keybinding.is(value)) {
                                keybindings.push(value);
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (json_1_1 && !json_1_1.done && (_a = json_1.return)) _a.call(json_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
            }
            this.keybindingRegistry.setKeymap(keybinding_1.KeybindingScope.USER, keybindings);
        }
        catch (e) {
            console.error("Failed to load keymaps from '" + model.uri + "'.", e);
        }
    };
    /**
     * Open the keybindings widget.
     * @param ref the optional reference for opening the widget.
     */
    KeymapsService.prototype.open = function (ref) {
        return __awaiter(this, void 0, void 0, function () {
            var model, options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.deferredModel.promise];
                    case 1:
                        model = _a.sent();
                        options = {
                            widgetOptions: ref ? { area: 'main', mode: 'split-right', ref: ref } : { area: 'main' },
                            mode: 'activate'
                        };
                        if (!!model.valid) return [3 /*break*/, 3];
                        return [4 /*yield*/, model.save()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, browser_1.open(this.opener, new uri_1.default(model.uri), options)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Set the keybinding in the JSON.
     * @param newKeybinding the JSON keybindings.
     */
    KeymapsService.prototype.setKeybinding = function (newKeybinding, oldKeybinding) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.updateKeymap(function () {
                        var e_2, _a;
                        var newAdded = false;
                        var oldRemoved = false;
                        var keybindings = [];
                        try {
                            for (var _b = __values(_this.keybindingRegistry.getKeybindingsByScope(keybinding_1.KeybindingScope.USER)), _c = _b.next(); !_c.done; _c = _b.next()) {
                                var keybinding = _c.value;
                                if (keybinding_2.Keybinding.equals(keybinding, newKeybinding, true, true)) {
                                    newAdded = true;
                                    keybinding = __assign(__assign({}, keybinding), { keybinding: newKeybinding.keybinding });
                                }
                                if (oldKeybinding && keybinding_2.Keybinding.equals(keybinding, __assign(__assign({}, newKeybinding), { keybinding: oldKeybinding, command: '-' + newKeybinding.command }), false, true)) {
                                    oldRemoved = true;
                                }
                                keybindings.push(keybinding);
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        if (!newAdded) {
                            keybindings.push({
                                command: newKeybinding.command,
                                keybinding: newKeybinding.keybinding,
                                context: newKeybinding.context,
                                when: newKeybinding.when,
                                args: newKeybinding.args
                            });
                            newAdded = true;
                        }
                        if (!oldRemoved && oldKeybinding) {
                            var disabledBinding_1 = {
                                command: '-' + newKeybinding.command,
                                // TODO key: oldKeybinding, see https://github.com/eclipse-theia/theia/issues/6879
                                keybinding: oldKeybinding,
                                context: newKeybinding.context,
                                when: newKeybinding.when,
                                args: newKeybinding.args
                            };
                            // Add disablement of the old keybinding if it isn't already disabled in the list to avoid duplicate disabled entries
                            if (!keybindings.some(function (binding) { return keybinding_2.Keybinding.equals(binding, disabledBinding_1, true, true); })) {
                                keybindings.push(disabledBinding_1);
                            }
                            oldRemoved = true;
                        }
                        if (newAdded || oldRemoved) {
                            return keybindings;
                        }
                    })];
            });
        });
    };
    /**
     * Remove the given keybinding with the given command id from the JSON.
     * @param commandId the keybinding command id.
     */
    KeymapsService.prototype.removeKeybinding = function (commandId) {
        var _this = this;
        return this.updateKeymap(function () {
            var keybindings = _this.keybindingRegistry.getKeybindingsByScope(keybinding_1.KeybindingScope.USER);
            var removedCommand = '-' + commandId;
            var filtered = keybindings.filter(function (a) { return a.command !== commandId && a.command !== removedCommand; });
            if (filtered.length !== keybindings.length) {
                return filtered;
            }
        });
    };
    KeymapsService.prototype.updateKeymap = function (op) {
        return __awaiter(this, void 0, void 0, function () {
            var model, keybindings, content, textModel, _a, insertSpaces, tabSize, defaultEOL, editOperations, _b, _c, edit, start, end, e_3, message;
            var e_4, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.deferredModel.promise];
                    case 1:
                        model = _e.sent();
                        _e.label = 2;
                    case 2:
                        _e.trys.push([2, 5, , 6]);
                        keybindings = op();
                        if (!keybindings) return [3 /*break*/, 4];
                        content = model.getText().trim();
                        textModel = model.textEditorModel;
                        _a = textModel.getOptions(), insertSpaces = _a.insertSpaces, tabSize = _a.tabSize, defaultEOL = _a.defaultEOL;
                        editOperations = [];
                        try {
                            for (_b = __values(jsoncparser.modify(content, [], keybindings.map(function (binding) { return keybinding_2.Keybinding.apiObjectify(binding); }), {
                                formattingOptions: {
                                    insertSpaces: insertSpaces,
                                    tabSize: tabSize,
                                    eol: defaultEOL === monaco.editor.DefaultEndOfLine.LF ? '\n' : '\r\n'
                                }
                            })), _c = _b.next(); !_c.done; _c = _b.next()) {
                                edit = _c.value;
                                start = textModel.getPositionAt(edit.offset);
                                end = textModel.getPositionAt(edit.offset + edit.length);
                                editOperations.push({
                                    range: monaco.Range.fromPositions(start, end),
                                    text: edit.content,
                                    forceMoveMarkers: false
                                });
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (_c && !_c.done && (_d = _b.return)) _d.call(_b);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                        return [4 /*yield*/, this.workspace.applyBackgroundEdit(model, editOperations)];
                    case 3:
                        _e.sent();
                        _e.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_3 = _e.sent();
                        message = "Failed to update a keymap in '" + model.uri + "'.";
                        this.messageService.error(message + " Please check if it is corrupted.");
                        console.error("" + message, e_3);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        inversify_1.inject(monaco_workspace_1.MonacoWorkspace),
        __metadata("design:type", monaco_workspace_1.MonacoWorkspace)
    ], KeymapsService.prototype, "workspace", void 0);
    __decorate([
        inversify_1.inject(monaco_text_model_service_1.MonacoTextModelService),
        __metadata("design:type", monaco_text_model_service_1.MonacoTextModelService)
    ], KeymapsService.prototype, "textModelService", void 0);
    __decorate([
        inversify_1.inject(keybinding_1.KeybindingRegistry),
        __metadata("design:type", keybinding_1.KeybindingRegistry)
    ], KeymapsService.prototype, "keybindingRegistry", void 0);
    __decorate([
        inversify_1.inject(browser_1.OpenerService),
        __metadata("design:type", Object)
    ], KeymapsService.prototype, "opener", void 0);
    __decorate([
        inversify_1.inject(message_service_1.MessageService),
        __metadata("design:type", message_service_1.MessageService)
    ], KeymapsService.prototype, "messageService", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], KeymapsService.prototype, "init", null);
    KeymapsService = __decorate([
        inversify_1.injectable()
    ], KeymapsService);
    return KeymapsService;
}());
exports.KeymapsService = KeymapsService;
//# sourceMappingURL=keymaps-service.js.map