"use strict";
/********************************************************************************
 * Copyright (C) 2020 Ericsson and others.
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
exports.TaskTerminalWidgetManager = exports.TaskTerminalWidgetOpenerOptions = exports.TaskTerminalWidget = void 0;
var inversify_1 = require("inversify");
var browser_1 = require("@theia/core/lib/browser");
var terminal_service_1 = require("@theia/terminal/lib/browser/base/terminal-service");
var common_1 = require("../common");
var task_protocol_1 = require("../common/process/task-protocol");
var task_definition_registry_1 = require("./task-definition-registry");
var workspace_service_1 = require("@theia/workspace/lib/browser/workspace-service");
var TaskTerminalWidget;
(function (TaskTerminalWidget) {
    function is(widget) {
        return widget.kind === 'task';
    }
    TaskTerminalWidget.is = is;
})(TaskTerminalWidget = exports.TaskTerminalWidget || (exports.TaskTerminalWidget = {}));
var TaskTerminalWidgetOpenerOptions;
(function (TaskTerminalWidgetOpenerOptions) {
    function isDedicatedTerminal(options) {
        var taskConfig = options.taskInfo ? options.taskInfo.config : options.taskConfig;
        return !!taskConfig && !!taskConfig.presentation && taskConfig.presentation.panel === common_1.PanelKind.Dedicated;
    }
    TaskTerminalWidgetOpenerOptions.isDedicatedTerminal = isDedicatedTerminal;
    function isNewTerminal(options) {
        var taskConfig = options.taskInfo ? options.taskInfo.config : options.taskConfig;
        return !!taskConfig && !!taskConfig.presentation && taskConfig.presentation.panel === common_1.PanelKind.New;
    }
    TaskTerminalWidgetOpenerOptions.isNewTerminal = isNewTerminal;
    function isSharedTerminal(options) {
        var taskConfig = options.taskInfo ? options.taskInfo.config : options.taskConfig;
        return !!taskConfig && (taskConfig.presentation === undefined || taskConfig.presentation.panel === undefined || taskConfig.presentation.panel === common_1.PanelKind.Shared);
    }
    TaskTerminalWidgetOpenerOptions.isSharedTerminal = isSharedTerminal;
    function echoExecutedCommand(options) {
        var taskConfig = options.taskInfo ? options.taskInfo.config : options.taskConfig;
        return !!taskConfig && (taskConfig.presentation === undefined || taskConfig.presentation.echo === undefined || taskConfig.presentation.echo);
    }
    TaskTerminalWidgetOpenerOptions.echoExecutedCommand = echoExecutedCommand;
})(TaskTerminalWidgetOpenerOptions = exports.TaskTerminalWidgetOpenerOptions || (exports.TaskTerminalWidgetOpenerOptions = {}));
var TaskTerminalWidgetManager = /** @class */ (function () {
    function TaskTerminalWidgetManager() {
    }
    TaskTerminalWidgetManager.prototype.init = function () {
        var _this = this;
        this.taskWatcher.onTaskExit(function (event) {
            var e_1, _a;
            var finishedTaskId = event.taskId;
            try {
                // find the terminal where the task ran, and mark it as "idle"
                for (var _b = __values(_this.getTaskTerminalWidgets()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var terminal = _c.value;
                    if (terminal.taskId === finishedTaskId) {
                        var showReuseMessage = !!event.config && common_1.TaskOutputPresentation.shouldShowReuseMessage(event.config);
                        _this.notifyTaskFinished(terminal, showReuseMessage);
                        break;
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
        });
        this.terminalService.onDidCreateTerminal(function (widget) { return __awaiter(_this, void 0, void 0, function () {
            var terminal, didConnectListener_1, didConnectFailureListener_1;
            var _this = this;
            return __generator(this, function (_a) {
                terminal = TaskTerminalWidget.is(widget) && widget;
                if (terminal) {
                    didConnectListener_1 = terminal.onDidOpen(function () { return __awaiter(_this, void 0, void 0, function () {
                        var context, tasksInfo, taskInfo, taskConfig;
                        var _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    context = (_b = (_a = this.workspaceService) === null || _a === void 0 ? void 0 : _a.workspace) === null || _b === void 0 ? void 0 : _b.resource.toString();
                                    return [4 /*yield*/, this.taskServer.getTasks(context)];
                                case 1:
                                    tasksInfo = _c.sent();
                                    taskInfo = tasksInfo.find(function (info) { return info.terminalId === widget.terminalId; });
                                    if (taskInfo) {
                                        taskConfig = taskInfo.config;
                                        terminal.dedicated = !!taskConfig.presentation && !!taskConfig.presentation.panel && taskConfig.presentation.panel === common_1.PanelKind.Dedicated;
                                        terminal.taskId = taskInfo.taskId;
                                        terminal.taskConfig = taskConfig;
                                        terminal.busy = true;
                                    }
                                    else {
                                        this.notifyTaskFinished(terminal, true);
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    didConnectFailureListener_1 = terminal.onDidOpenFailure(function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            this.notifyTaskFinished(terminal, true);
                            return [2 /*return*/];
                        });
                    }); });
                    terminal.onDidDispose(function () {
                        didConnectListener_1.dispose();
                        didConnectFailureListener_1.dispose();
                    });
                }
                return [2 /*return*/];
            });
        }); });
    };
    TaskTerminalWidgetManager.prototype.newTaskTerminal = function (factoryOptions) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.terminalService.newTerminal(__assign(__assign({}, factoryOptions), { kind: 'task' }))];
            });
        });
    };
    TaskTerminalWidgetManager.prototype.open = function (factoryOptions, openerOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var taskInfo, taskConfig, dedicated, _a, isNew, widget;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        taskInfo = openerOptions.taskInfo;
                        taskConfig = taskInfo ? taskInfo.config : openerOptions.taskConfig;
                        dedicated = TaskTerminalWidgetOpenerOptions.isDedicatedTerminal(openerOptions);
                        if (dedicated && !taskConfig) {
                            throw new Error('"taskConfig" must be included as part of the "option.taskInfo" if "isDedicated" is true');
                        }
                        return [4 /*yield*/, this.getWidgetToRunTask(factoryOptions, openerOptions)];
                    case 1:
                        _a = _b.sent(), isNew = _a.isNew, widget = _a.widget;
                        if (isNew) {
                            this.shell.addWidget(widget, { area: openerOptions.widgetOptions ? openerOptions.widgetOptions.area : 'bottom' });
                            widget.resetTerminal();
                        }
                        else {
                            if (factoryOptions.title) {
                                widget.setTitle(factoryOptions.title);
                            }
                            if (taskConfig && common_1.TaskOutputPresentation.shouldClearTerminalBeforeRun(taskConfig)) {
                                widget.clearOutput();
                            }
                        }
                        this.terminalService.open(widget, openerOptions);
                        if (TaskTerminalWidgetOpenerOptions.echoExecutedCommand(openerOptions) &&
                            taskInfo && task_protocol_1.ProcessTaskInfo.is(taskInfo) && taskInfo.command && taskInfo.command.length > 0) {
                            widget.writeLine("\u001B[1m> Executing task: " + taskInfo.command + " <\u001B[0m\n");
                        }
                        return [2 /*return*/, widget];
                }
            });
        });
    };
    TaskTerminalWidgetManager.prototype.getWidgetToRunTask = function (factoryOptions, openerOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var reusableTerminalWidget, taskConfig, _a, _b, widget, availableWidgets, _c, _d, widget, lastUsedWidget, widget;
            var e_2, _e, e_3, _f;
            var _this = this;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        taskConfig = openerOptions.taskInfo ? openerOptions.taskInfo.config : openerOptions.taskConfig;
                        if (TaskTerminalWidgetOpenerOptions.isDedicatedTerminal(openerOptions)) {
                            try {
                                for (_a = __values(this.getTaskTerminalWidgets()), _b = _a.next(); !_b.done; _b = _a.next()) {
                                    widget = _b.value;
                                    // to run a task whose `taskPresentation === 'dedicated'`, the terminal to be reused must be
                                    // 1) dedicated, 2) idle, 3) the one that ran the same task
                                    if (widget.dedicated &&
                                        !widget.busy &&
                                        widget.taskConfig && taskConfig &&
                                        this.taskDefinitionRegistry.compareTasks(taskConfig, widget.taskConfig)) {
                                        reusableTerminalWidget = widget;
                                        break;
                                    }
                                }
                            }
                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                            finally {
                                try {
                                    if (_b && !_b.done && (_e = _a.return)) _e.call(_a);
                                }
                                finally { if (e_2) throw e_2.error; }
                            }
                        }
                        else if (TaskTerminalWidgetOpenerOptions.isSharedTerminal(openerOptions)) {
                            availableWidgets = [];
                            try {
                                for (_c = __values(this.getTaskTerminalWidgets()), _d = _c.next(); !_d.done; _d = _c.next()) {
                                    widget = _d.value;
                                    // to run a task whose `taskPresentation === 'shared'`, the terminal to be used must be
                                    // 1) not dedicated, and 2) idle
                                    if (!widget.dedicated && !widget.busy) {
                                        availableWidgets.push(widget);
                                    }
                                }
                            }
                            catch (e_3_1) { e_3 = { error: e_3_1 }; }
                            finally {
                                try {
                                    if (_d && !_d.done && (_f = _c.return)) _f.call(_c);
                                }
                                finally { if (e_3) throw e_3.error; }
                            }
                            lastUsedWidget = availableWidgets.find(function (w) {
                                var lastUsedTerminal = _this.terminalService.lastUsedTerminal;
                                return lastUsedTerminal && lastUsedTerminal.id === w.id;
                            });
                            reusableTerminalWidget = lastUsedWidget || availableWidgets[0];
                        }
                        if (!!reusableTerminalWidget) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.newTaskTerminal(factoryOptions)];
                    case 1:
                        widget = _g.sent();
                        return [2 /*return*/, { isNew: true, widget: widget }];
                    case 2: return [2 /*return*/, { isNew: false, widget: reusableTerminalWidget }];
                }
            });
        });
    };
    TaskTerminalWidgetManager.prototype.getTaskTerminalWidgets = function () {
        return this.terminalService.all.filter(TaskTerminalWidget.is);
    };
    TaskTerminalWidgetManager.prototype.notifyTaskFinished = function (terminal, showReuseMessage) {
        terminal.busy = false;
        terminal.scrollToBottom();
        if (showReuseMessage) {
            terminal.writeLine('\x1b[1m\n\rTerminal will be reused by tasks. \x1b[0m\n');
        }
    };
    __decorate([
        inversify_1.inject(browser_1.ApplicationShell),
        __metadata("design:type", browser_1.ApplicationShell)
    ], TaskTerminalWidgetManager.prototype, "shell", void 0);
    __decorate([
        inversify_1.inject(task_definition_registry_1.TaskDefinitionRegistry),
        __metadata("design:type", task_definition_registry_1.TaskDefinitionRegistry)
    ], TaskTerminalWidgetManager.prototype, "taskDefinitionRegistry", void 0);
    __decorate([
        inversify_1.inject(terminal_service_1.TerminalService),
        __metadata("design:type", Object)
    ], TaskTerminalWidgetManager.prototype, "terminalService", void 0);
    __decorate([
        inversify_1.inject(common_1.TaskWatcher),
        __metadata("design:type", common_1.TaskWatcher)
    ], TaskTerminalWidgetManager.prototype, "taskWatcher", void 0);
    __decorate([
        inversify_1.inject(common_1.TaskServer),
        __metadata("design:type", Object)
    ], TaskTerminalWidgetManager.prototype, "taskServer", void 0);
    __decorate([
        inversify_1.inject(workspace_service_1.WorkspaceService),
        __metadata("design:type", workspace_service_1.WorkspaceService)
    ], TaskTerminalWidgetManager.prototype, "workspaceService", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TaskTerminalWidgetManager.prototype, "init", null);
    TaskTerminalWidgetManager = __decorate([
        inversify_1.injectable()
    ], TaskTerminalWidgetManager);
    return TaskTerminalWidgetManager;
}());
exports.TaskTerminalWidgetManager = TaskTerminalWidgetManager;
//# sourceMappingURL=task-terminal-widget-manager.js.map