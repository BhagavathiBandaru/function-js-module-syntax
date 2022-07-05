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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.TimelineWidget = void 0;
var inversify_1 = require("inversify");
var browser_1 = require("@theia/core/lib/browser");
var timeline_tree_widget_1 = require("./timeline-tree-widget");
var timeline_service_1 = require("./timeline-service");
var common_1 = require("@theia/core/lib/common");
var timeline_empty_widget_1 = require("./timeline-empty-widget");
var algorithm_1 = require("@phosphor/algorithm");
var vscode_uri_1 = require("vscode-uri");
var timeline_service_2 = require("./timeline-service");
var TimelineWidget = /** @class */ (function (_super) {
    __extends(TimelineWidget, _super);
    function TimelineWidget() {
        var _this = _super.call(this) || this;
        _this.timelinesBySource = new Map();
        _this.id = TimelineWidget_1.ID;
        _this.title.label = 'Timeline';
        _this.title.caption = _this.title.label;
        _this.addClass('theia-timeline');
        return _this;
    }
    TimelineWidget_1 = TimelineWidget;
    TimelineWidget.prototype.init = function () {
        var _this = this;
        var layout = new browser_1.PanelLayout();
        this.layout = layout;
        this.panel = new browser_1.Panel({ layout: new browser_1.PanelLayout({}) });
        this.panel.node.tabIndex = -1;
        layout.addWidget(this.panel);
        this.containerLayout.addWidget(this.resourceWidget);
        this.containerLayout.addWidget(this.timelineEmptyWidget);
        this.refresh();
        this.toDispose.push(this.timelineService.onDidChangeTimeline(function (event) {
            var currentWidgetUri = _this.getCurrentWidgetUri();
            if (currentWidgetUri) {
                _this.loadTimeline(currentWidgetUri, event.reset);
            }
        }));
        this.toDispose.push(this.selectionService.onSelectionChanged(function (selection) {
            if (Array.isArray(selection) && 'uri' in selection[0]) {
                _this.refresh(selection[0].uri);
            }
        }));
        this.toDispose.push(this.applicationShell.onDidChangeCurrentWidget(function (e) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if ((e.newValue && browser_1.Navigatable.is(e.newValue)) || !this.suitableWidgetsOpened()) {
                    this.refresh();
                }
                return [2 /*return*/];
            });
        }); }));
        this.toDispose.push(this.applicationShell.onDidRemoveWidget(function (widget) {
            if (browser_1.NavigatableWidget.is(widget)) {
                _this.refresh();
            }
        }));
        this.toDispose.push(this.timelineService.onDidChangeProviders(function () { return _this.refresh(); }));
    };
    TimelineWidget.prototype.loadTimelineForSource = function (source, uri, reset) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var timeline, cursor, options, timelineResult, items;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (reset) {
                            this.timelinesBySource.delete(source);
                        }
                        timeline = this.timelinesBySource.get(source);
                        cursor = timeline === null || timeline === void 0 ? void 0 : timeline.cursor;
                        options = { cursor: reset ? undefined : cursor, limit: timeline_tree_widget_1.TimelineTreeWidget.PAGE_SIZE };
                        return [4 /*yield*/, this.timelineService.getTimeline(source, uri, options, { cacheResults: true, resetCache: reset })];
                    case 1:
                        timelineResult = _b.sent();
                        if (timelineResult) {
                            items = timelineResult.items;
                            if (items) {
                                if (timeline) {
                                    timeline.add(items);
                                    timeline.cursor = (_a = timelineResult.paging) === null || _a === void 0 ? void 0 : _a.cursor;
                                }
                                else {
                                    timeline = new timeline_service_2.TimelineAggregate(timelineResult);
                                }
                                this.timelinesBySource.set(source, timeline);
                                this.resourceWidget.model.updateTree(timeline.items, !!timeline.cursor);
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    TimelineWidget.prototype.loadTimeline = function (uri, reset) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, source;
            var e_1, _c;
            return __generator(this, function (_d) {
                try {
                    for (_a = __values(this.timelineService.getSources().map(function (s) { return s.id; })), _b = _a.next(); !_b.done; _b = _a.next()) {
                        source = _b.value;
                        this.loadTimelineForSource(source, vscode_uri_1.URI.parse(uri.toString()), reset);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return [2 /*return*/];
            });
        });
    };
    TimelineWidget.prototype.refresh = function (uri) {
        if (!uri) {
            uri = this.getCurrentWidgetUri();
        }
        if (uri) {
            this.timelineEmptyWidget.hide();
            this.resourceWidget.show();
            this.loadTimeline(uri, true);
        }
        else if (!this.suitableWidgetsOpened()) {
            this.timelineEmptyWidget.show();
            this.resourceWidget.hide();
        }
    };
    TimelineWidget.prototype.suitableWidgetsOpened = function () {
        var _this = this;
        return !!algorithm_1.toArray(this.applicationShell.mainPanel.widgets()).find(function (widget) {
            if (browser_1.NavigatableWidget.is(widget)) {
                var uri = widget.getResourceUri();
                if ((uri === null || uri === void 0 ? void 0 : uri.scheme) && _this.timelineService.getSchemas().indexOf(uri === null || uri === void 0 ? void 0 : uri.scheme) > -1) {
                    return true;
                }
            }
        });
    };
    TimelineWidget.prototype.getCurrentWidgetUri = function () {
        var current = this.applicationShell.currentWidget;
        if (!browser_1.NavigatableWidget.is(current)) {
            current = algorithm_1.toArray(this.applicationShell.mainPanel.widgets()).find(function (widget) {
                if (widget.isVisible && !widget.isHidden) {
                    return widget;
                }
            });
        }
        return browser_1.NavigatableWidget.is(current) ? current.getResourceUri() : undefined;
    };
    Object.defineProperty(TimelineWidget.prototype, "containerLayout", {
        get: function () {
            return this.panel.layout;
        },
        enumerable: false,
        configurable: true
    });
    TimelineWidget.prototype.onUpdateRequest = function (msg) {
        browser_1.MessageLoop.sendMessage(this.resourceWidget, msg);
        browser_1.MessageLoop.sendMessage(this.timelineEmptyWidget, msg);
        this.refresh();
        _super.prototype.onUpdateRequest.call(this, msg);
    };
    TimelineWidget.prototype.onAfterAttach = function (msg) {
        this.node.appendChild(this.resourceWidget.node);
        this.node.appendChild(this.timelineEmptyWidget.node);
        _super.prototype.onAfterAttach.call(this, msg);
        this.update();
    };
    var TimelineWidget_1;
    TimelineWidget.ID = 'timeline-view';
    __decorate([
        inversify_1.inject(timeline_tree_widget_1.TimelineTreeWidget),
        __metadata("design:type", timeline_tree_widget_1.TimelineTreeWidget)
    ], TimelineWidget.prototype, "resourceWidget", void 0);
    __decorate([
        inversify_1.inject(timeline_service_1.TimelineService),
        __metadata("design:type", timeline_service_1.TimelineService)
    ], TimelineWidget.prototype, "timelineService", void 0);
    __decorate([
        inversify_1.inject(common_1.CommandRegistry),
        __metadata("design:type", common_1.CommandRegistry)
    ], TimelineWidget.prototype, "commandRegistry", void 0);
    __decorate([
        inversify_1.inject(browser_1.ApplicationShell),
        __metadata("design:type", browser_1.ApplicationShell)
    ], TimelineWidget.prototype, "applicationShell", void 0);
    __decorate([
        inversify_1.inject(timeline_empty_widget_1.TimelineEmptyWidget),
        __metadata("design:type", timeline_empty_widget_1.TimelineEmptyWidget)
    ], TimelineWidget.prototype, "timelineEmptyWidget", void 0);
    __decorate([
        inversify_1.inject(common_1.SelectionService),
        __metadata("design:type", common_1.SelectionService)
    ], TimelineWidget.prototype, "selectionService", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TimelineWidget.prototype, "init", null);
    TimelineWidget = TimelineWidget_1 = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], TimelineWidget);
    return TimelineWidget;
}(browser_1.BaseWidget));
exports.TimelineWidget = TimelineWidget;
//# sourceMappingURL=timeline-widget.js.map