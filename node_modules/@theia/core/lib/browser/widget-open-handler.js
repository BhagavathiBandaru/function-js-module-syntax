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
exports.WidgetOpenHandler = void 0;
var inversify_1 = require("inversify");
var common_1 = require("../common");
var shell_1 = require("./shell");
var widget_manager_1 = require("./widget-manager");
/**
 * Generic base class for {@link OpenHandler}s that are opening a widget for a given {@link URI}.
 */
var WidgetOpenHandler = /** @class */ (function () {
    function WidgetOpenHandler() {
        this.onCreatedEmitter = new common_1.Emitter();
        /**
         * Emit when a new widget is created.
         */
        this.onCreated = this.onCreatedEmitter.event;
    }
    WidgetOpenHandler.prototype.init = function () {
        var _this = this;
        this.widgetManager.onDidCreateWidget(function (_a) {
            var factoryId = _a.factoryId, widget = _a.widget;
            if (factoryId === _this.id) {
                _this.onCreatedEmitter.fire(widget);
            }
        });
    };
    /**
     * Open a widget for the given uri and options.
     * Reject if the given options are not widget options or a widget cannot be opened.
     * @param uri the uri of the resource that should be opened.
     * @param options the widget opener options.
     *
     * @returns promise of the widget that resolves when the widget has been opened.
     */
    WidgetOpenHandler.prototype.open = function (uri, options) {
        return __awaiter(this, void 0, void 0, function () {
            var widget;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getOrCreateWidget(uri, options)];
                    case 1:
                        widget = _a.sent();
                        return [4 /*yield*/, this.doOpen(widget, options)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, widget];
                }
            });
        });
    };
    WidgetOpenHandler.prototype.doOpen = function (widget, options) {
        return __awaiter(this, void 0, void 0, function () {
            var op;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        op = __assign({ mode: 'activate' }, options);
                        if (!widget.isAttached) {
                            this.shell.addWidget(widget, op.widgetOptions || { area: 'main' });
                        }
                        if (!(op.mode === 'activate')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.shell.activateWidget(widget.id)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        if (!(op.mode === 'reveal')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.shell.revealWidget(widget.id)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Tries to get an existing widget for the given uri.
     * @param uri the uri of the widget.
     *
     * @returns a promise that resolves to the existing widget or `undefined` if no widget for the given uri exists.
     */
    WidgetOpenHandler.prototype.getByUri = function (uri) {
        return this.getWidget(uri);
    };
    /**
     * Return an existing widget for the given uri or creates a new one.
     *
     * It does not open a widget, use {@link WidgetOpenHandler#open} instead.
     * @param uri uri of the widget.
     *
     * @returns a promise of the existing or newly created widget.
     */
    WidgetOpenHandler.prototype.getOrCreateByUri = function (uri) {
        return this.getOrCreateWidget(uri);
    };
    Object.defineProperty(WidgetOpenHandler.prototype, "all", {
        /**
         * Retrieves all open widgets that have been opened by this handler.
         *
         * @returns all open widgets for this open handler.
         */
        get: function () {
            return this.widgetManager.getWidgets(this.id);
        },
        enumerable: false,
        configurable: true
    });
    WidgetOpenHandler.prototype.getWidget = function (uri, options) {
        var widgetOptions = this.createWidgetOptions(uri, options);
        return this.widgetManager.getWidget(this.id, widgetOptions);
    };
    WidgetOpenHandler.prototype.getOrCreateWidget = function (uri, options) {
        var widgetOptions = this.createWidgetOptions(uri, options);
        return this.widgetManager.getOrCreateWidget(this.id, widgetOptions);
    };
    /**
     * Closes all widgets that have been opened by this open handler.
     * @param options the close options that should be applied to all widgets.
     *
     * @returns a promise of all closed widgets that resolves after they have been closed.
     */
    WidgetOpenHandler.prototype.closeAll = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var closed;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(this.all.map(function (widget) { return _this.shell.closeWidget(widget.id, options); }))];
                    case 1:
                        closed = _a.sent();
                        return [2 /*return*/, closed.filter(function (widget) { return !!widget; })];
                }
            });
        });
    };
    __decorate([
        inversify_1.inject(shell_1.ApplicationShell),
        __metadata("design:type", shell_1.ApplicationShell)
    ], WidgetOpenHandler.prototype, "shell", void 0);
    __decorate([
        inversify_1.inject(widget_manager_1.WidgetManager),
        __metadata("design:type", widget_manager_1.WidgetManager)
    ], WidgetOpenHandler.prototype, "widgetManager", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], WidgetOpenHandler.prototype, "init", null);
    WidgetOpenHandler = __decorate([
        inversify_1.injectable()
    ], WidgetOpenHandler);
    return WidgetOpenHandler;
}());
exports.WidgetOpenHandler = WidgetOpenHandler;
//# sourceMappingURL=widget-open-handler.js.map