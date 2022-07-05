"use strict";
/********************************************************************************
 * Copyright (C) 2020 RedHat and others.
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
exports.TimelineContribution = void 0;
var inversify_1 = require("inversify");
var browser_1 = require("@theia/core/lib/browser");
var browser_2 = require("@theia/navigator/lib/browser");
var timeline_widget_1 = require("./timeline-widget");
var timeline_service_1 = require("./timeline-service");
var common_1 = require("@theia/core/lib/common");
var tab_bar_toolbar_1 = require("@theia/core/lib/browser/shell/tab-bar-toolbar");
var algorithm_1 = require("@phosphor/algorithm");
var TimelineContribution = /** @class */ (function () {
    function TimelineContribution() {
        this.toolbarItem = {
            id: 'timeline-refresh-toolbar-item',
            command: 'timeline-refresh',
            tooltip: 'Refresh',
            icon: 'fa fa-refresh'
        };
    }
    TimelineContribution_1 = TimelineContribution;
    TimelineContribution.prototype.registerToolbarItems = function (registry) {
        registry.registerItem(this.toolbarItem);
    };
    TimelineContribution.prototype.registerCommands = function (commands) {
        var _this = this;
        var attachTimeline = function (explorer) { return __awaiter(_this, void 0, void 0, function () {
            var timeline;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.widgetManager.getOrCreateWidget(timeline_widget_1.TimelineWidget.ID)];
                    case 1:
                        timeline = _a.sent();
                        if (explorer instanceof browser_1.ViewContainer && explorer.getTrackableWidgets().indexOf(timeline) === -1) {
                            explorer.addWidget(timeline, { initiallyCollapsed: true });
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        this.widgetManager.onWillCreateWidget(function (event) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (event.widget.id === browser_2.EXPLORER_VIEW_CONTAINER_ID && this.timelineService.getSources().length > 0) {
                    event.waitUntil(attachTimeline(event.widget));
                }
                return [2 /*return*/];
            });
        }); });
        this.timelineService.onDidChangeProviders(function (event) { return __awaiter(_this, void 0, void 0, function () {
            var explorer, timeline;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.widgetManager.getWidget(browser_2.EXPLORER_VIEW_CONTAINER_ID)];
                    case 1:
                        explorer = _a.sent();
                        if (!(explorer && event.added && event.added.length > 0)) return [3 /*break*/, 2];
                        attachTimeline(explorer);
                        return [3 /*break*/, 4];
                    case 2:
                        if (!(event.removed && this.timelineService.getSources().length === 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.widgetManager.getWidget(timeline_widget_1.TimelineWidget.ID)];
                    case 3:
                        timeline = _a.sent();
                        if (timeline) {
                            timeline.close();
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        commands.registerCommand(TimelineContribution_1.LOAD_MORE_COMMAND, {
            execute: function () { return __awaiter(_this, void 0, void 0, function () {
                var widget, uri, timeline;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            widget = algorithm_1.toArray(this.shell.mainPanel.widgets()).find(function (w) { return browser_1.Navigatable.is(w) && w.isVisible && !w.isHidden; });
                            if (!browser_1.Navigatable.is(widget)) return [3 /*break*/, 2];
                            uri = widget.getResourceUri();
                            return [4 /*yield*/, this.widgetManager.getWidget(timeline_widget_1.TimelineWidget.ID)];
                        case 1:
                            timeline = _a.sent();
                            if (uri && timeline) {
                                timeline.loadTimeline(uri, false);
                            }
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            }); }
        });
        commands.registerCommand({ id: this.toolbarItem.command }, {
            execute: function (widget) { return _this.checkWidget(widget, function () { return __awaiter(_this, void 0, void 0, function () {
                var timeline;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.widgetManager.getWidget(timeline_widget_1.TimelineWidget.ID)];
                        case 1:
                            timeline = _a.sent();
                            if (timeline) {
                                timeline.update();
                            }
                            return [2 /*return*/];
                    }
                });
            }); }); },
            isEnabled: function (widget) { return _this.checkWidget(widget, function () { return true; }); },
            isVisible: function (widget) { return _this.checkWidget(widget, function () { return true; }); }
        });
    };
    TimelineContribution.prototype.checkWidget = function (widget, cb) {
        if (widget instanceof timeline_widget_1.TimelineWidget && widget.id === timeline_widget_1.TimelineWidget.ID) {
            return cb();
        }
        return false;
    };
    var TimelineContribution_1;
    TimelineContribution.LOAD_MORE_COMMAND = {
        id: 'timeline-load-more'
    };
    __decorate([
        inversify_1.inject(browser_1.WidgetManager),
        __metadata("design:type", browser_1.WidgetManager)
    ], TimelineContribution.prototype, "widgetManager", void 0);
    __decorate([
        inversify_1.inject(timeline_service_1.TimelineService),
        __metadata("design:type", timeline_service_1.TimelineService)
    ], TimelineContribution.prototype, "timelineService", void 0);
    __decorate([
        inversify_1.inject(common_1.CommandRegistry),
        __metadata("design:type", common_1.CommandRegistry)
    ], TimelineContribution.prototype, "commandRegistry", void 0);
    __decorate([
        inversify_1.inject(tab_bar_toolbar_1.TabBarToolbarRegistry),
        __metadata("design:type", tab_bar_toolbar_1.TabBarToolbarRegistry)
    ], TimelineContribution.prototype, "tabBarToolbar", void 0);
    __decorate([
        inversify_1.inject(browser_1.ApplicationShell),
        __metadata("design:type", browser_1.ApplicationShell)
    ], TimelineContribution.prototype, "shell", void 0);
    TimelineContribution = TimelineContribution_1 = __decorate([
        inversify_1.injectable()
    ], TimelineContribution);
    return TimelineContribution;
}());
exports.TimelineContribution = TimelineContribution;
//# sourceMappingURL=timeline-contribution.js.map