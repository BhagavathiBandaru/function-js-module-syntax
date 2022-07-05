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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
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
exports.TaskRestartRunningQuickOpen = exports.RunningTaskQuickOpenItem = exports.TaskRunningQuickOpen = exports.TaskTerminateQuickOpen = exports.TaskConfigureQuickOpenItem = exports.ConfigureBuildOrTestTaskQuickOpenItem = exports.TaskRunQuickOpenItem = exports.QuickOpenTask = exports.TaskActionProvider = exports.ConfigureTaskAction = void 0;
var inversify_1 = require("inversify");
var task_service_1 = require("./task-service");
var task_protocol_1 = require("../common/task-protocol");
var task_definition_registry_1 = require("./task-definition-registry");
var uri_1 = require("@theia/core/lib/common/uri");
var browser_1 = require("@theia/core/lib/browser");
var browser_2 = require("@theia/workspace/lib/browser");
var terminal_service_1 = require("@theia/terminal/lib/browser/base/terminal-service");
var quick_open_model_1 = require("@theia/core/lib/common/quick-open-model");
var browser_3 = require("@theia/core/lib/browser");
var task_name_resolver_1 = require("./task-name-resolver");
var task_source_resolver_1 = require("./task-source-resolver");
var task_configuration_manager_1 = require("./task-configuration-manager");
var ConfigureTaskAction = /** @class */ (function (_super) {
    __extends(ConfigureTaskAction, _super);
    function ConfigureTaskAction() {
        var _this = _super.call(this, { id: 'configure:task', label: 'Configure Task' }) || this;
        _this.updateClass();
        return _this;
    }
    ConfigureTaskAction.prototype.run = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (item instanceof TaskRunQuickOpenItem) {
                    this.taskService.configure(item.getToken(), item.getTask());
                }
                return [2 /*return*/];
            });
        });
    };
    ConfigureTaskAction.prototype.updateClass = function () {
        this.class = 'codicon-gear quick-open-task-configure';
    };
    __decorate([
        inversify_1.inject(task_service_1.TaskService),
        __metadata("design:type", task_service_1.TaskService)
    ], ConfigureTaskAction.prototype, "taskService", void 0);
    ConfigureTaskAction = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], ConfigureTaskAction);
    return ConfigureTaskAction;
}(browser_1.QuickOpenBaseAction));
exports.ConfigureTaskAction = ConfigureTaskAction;
var TaskActionProvider = /** @class */ (function () {
    function TaskActionProvider() {
    }
    TaskActionProvider.prototype.hasActions = function () {
        return true;
    };
    TaskActionProvider.prototype.getActions = function () {
        return [this.configureTaskAction];
    };
    __decorate([
        inversify_1.inject(ConfigureTaskAction),
        __metadata("design:type", ConfigureTaskAction)
    ], TaskActionProvider.prototype, "configureTaskAction", void 0);
    TaskActionProvider = __decorate([
        inversify_1.injectable()
    ], TaskActionProvider);
    return TaskActionProvider;
}());
exports.TaskActionProvider = TaskActionProvider;
var QuickOpenTask = /** @class */ (function () {
    function QuickOpenTask() {
        this.prefix = 'task ';
        this.description = 'Run Task';
    }
    QuickOpenTask.prototype.init = function () {
        return this.doInit(this.taskService.startUserAction());
    };
    /** Initialize this quick open model with the tasks. */
    QuickOpenTask.prototype.doInit = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var recentTasks, configuredTasks, providedTasks, _a, filteredRecentTasks, filteredConfiguredTasks, filteredProvidedTasks, isMulti;
            var _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        recentTasks = this.taskService.recentTasks;
                        return [4 /*yield*/, this.taskService.getConfiguredTasks(token)];
                    case 1:
                        configuredTasks = _c.sent();
                        return [4 /*yield*/, this.taskService.getProvidedTasks(token)];
                    case 2:
                        providedTasks = _c.sent();
                        _a = this.getFilteredTasks(recentTasks, configuredTasks, providedTasks), filteredRecentTasks = _a.filteredRecentTasks, filteredConfiguredTasks = _a.filteredConfiguredTasks, filteredProvidedTasks = _a.filteredProvidedTasks;
                        isMulti = this.workspaceService.isMultiRootWorkspaceOpened;
                        this.items = [];
                        (_b = this.items).push.apply(_b, __spread(filteredRecentTasks.map(function (task, index) {
                            var item = new TaskRunQuickOpenItem(token, task, _this.taskService, isMulti, {
                                groupLabel: index === 0 ? 'recently used tasks' : undefined,
                                showBorder: false
                            }, _this.taskDefinitionRegistry, _this.taskNameResolver, _this.taskSourceResolver);
                            return item;
                        }), filteredConfiguredTasks.map(function (task, index) {
                            var item = new TaskRunQuickOpenItem(token, task, _this.taskService, isMulti, {
                                groupLabel: index === 0 ? 'configured tasks' : undefined,
                                showBorder: (filteredRecentTasks.length <= 0
                                    ? false
                                    : index === 0 ? true : false)
                            }, _this.taskDefinitionRegistry, _this.taskNameResolver, _this.taskSourceResolver);
                            return item;
                        }), filteredProvidedTasks.map(function (task, index) {
                            var item = new TaskRunQuickOpenItem(token, task, _this.taskService, isMulti, {
                                groupLabel: index === 0 ? 'detected tasks' : undefined,
                                showBorder: (filteredRecentTasks.length <= 0 && filteredConfiguredTasks.length <= 0
                                    ? false
                                    : index === 0 ? true : false)
                            }, _this.taskDefinitionRegistry, _this.taskNameResolver, _this.taskSourceResolver);
                            return item;
                        })));
                        this.actionProvider = this.items.length ? this.taskActionProvider : undefined;
                        return [2 /*return*/];
                }
            });
        });
    };
    QuickOpenTask.prototype.open = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = this.taskService.startUserAction();
                        return [4 /*yield*/, this.doInit(token)];
                    case 1:
                        _a.sent();
                        if (!this.items.length) {
                            this.items.push(new quick_open_model_1.QuickOpenItem({
                                label: 'No task to run found. Configure Tasks...',
                                run: function (mode) {
                                    if (mode !== quick_open_model_1.QuickOpenMode.OPEN) {
                                        return false;
                                    }
                                    _this.configure();
                                    return true;
                                }
                            }));
                        }
                        this.quickOpenService.open(this, {
                            placeholder: 'Select the task to run',
                            fuzzyMatchLabel: true,
                            fuzzySort: false
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    QuickOpenTask.prototype.getModel = function () {
        return this;
    };
    QuickOpenTask.prototype.getOptions = function () {
        return {
            fuzzyMatchLabel: true,
            fuzzySort: false
        };
    };
    QuickOpenTask.prototype.attach = function () {
        var _this = this;
        this.items = [];
        this.actionProvider = undefined;
        var isMulti = this.workspaceService.isMultiRootWorkspaceOpened;
        this.taskService.getRunningTasks().then(function (tasks) {
            if (!tasks.length) {
                _this.items.push(new quick_open_model_1.QuickOpenItem({
                    label: 'No tasks found',
                    run: function (_mode) { return false; }
                }));
            }
            else {
                tasks.forEach(function (task) {
                    // can only attach to terminal processes, so only list those
                    if (task.terminalId) {
                        _this.items.push(new RunningTaskQuickOpenItem(task, _this.taskService, _this.taskNameResolver, _this.taskSourceResolver, _this.taskDefinitionRegistry, _this.labelProvider, isMulti, {
                            run: function (mode) {
                                if (mode !== quick_open_model_1.QuickOpenMode.OPEN) {
                                    return false;
                                }
                                _this.taskService.attach(task.terminalId, task.taskId);
                                return true;
                            }
                        }));
                    }
                });
            }
            _this.quickOpenService.open(_this, {
                placeholder: 'Choose task to open',
                fuzzyMatchLabel: true,
                fuzzySort: true
            });
        });
    };
    QuickOpenTask.prototype.configure = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var token, configuredTasks, providedTasks, _b, filteredConfiguredTasks, filteredProvidedTasks, groupedTasks, scopes, roots, isFirstGroup, groupLabel, optionsGenerator, scopes_1, scopes_1_1, scope, configs;
            var e_1, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        this.items = [];
                        this.actionProvider = undefined;
                        token = this.taskService.startUserAction();
                        return [4 /*yield*/, this.taskService.getConfiguredTasks(token)];
                    case 1:
                        configuredTasks = _e.sent();
                        return [4 /*yield*/, this.taskService.getProvidedTasks(token)];
                    case 2:
                        providedTasks = _e.sent();
                        _b = this.getFilteredTasks([], configuredTasks, providedTasks), filteredConfiguredTasks = _b.filteredConfiguredTasks, filteredProvidedTasks = _b.filteredProvidedTasks;
                        groupedTasks = this.getGroupedTasksByWorkspaceFolder(__spread(filteredConfiguredTasks, filteredProvidedTasks));
                        scopes = [task_protocol_1.TaskScope.Global];
                        if (!this.workspaceService.opened) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.workspaceService.roots];
                    case 3:
                        roots = _e.sent();
                        scopes.push.apply(scopes, __spread(roots.map(function (rootStat) { return rootStat.resource.toString(); })));
                        if (this.workspaceService.saved || ((_a = groupedTasks.get(task_protocol_1.TaskScope.Workspace.toString())) === null || _a === void 0 ? void 0 : _a.length)) {
                            scopes.push(task_protocol_1.TaskScope.Workspace);
                        }
                        _e.label = 4;
                    case 4:
                        isFirstGroup = true;
                        groupLabel = '';
                        optionsGenerator = function (index) { return ({
                            showBorder: !isFirstGroup && index === 0,
                            groupLabel: index === 0 ? groupLabel : '',
                            description: groupLabel,
                        }); };
                        try {
                            for (scopes_1 = __values(scopes), scopes_1_1 = scopes_1.next(); !scopes_1_1.done; scopes_1_1 = scopes_1.next()) {
                                scope = scopes_1_1.value;
                                groupLabel = typeof scope === 'string' ? this.labelProvider.getName(new uri_1.default(scope)) : task_protocol_1.TaskScope[scope];
                                configs = groupedTasks.get(scope.toString());
                                if (configs === null || configs === void 0 ? void 0 : configs.length) {
                                    (_d = this.items).push.apply(_d, __spread(this.getTaskConfigureQuickOpenItems(configs, token, optionsGenerator)));
                                }
                                else {
                                    this.items.push(this.getOpenFileItem(scope, optionsGenerator.bind(this, 0)));
                                }
                                isFirstGroup = false;
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (scopes_1_1 && !scopes_1_1.done && (_c = scopes_1.return)) _c.call(scopes_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        if (this.items.length === 0) {
                            this.items.push(new quick_open_model_1.QuickOpenItem({
                                label: 'No tasks found',
                                run: function (_mode) { return false; }
                            }));
                        }
                        this.quickOpenService.open(this, {
                            placeholder: 'Select a task to configure',
                            fuzzyMatchLabel: true,
                            fuzzySort: false
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    QuickOpenTask.prototype.getTaskConfigureQuickOpenItems = function (configs, token, optionsGenerator) {
        var _this = this;
        return configs.map(function (taskConfig, index) {
            var item = new TaskConfigureQuickOpenItem(token, taskConfig, _this.taskService, _this.taskNameResolver, _this.workspaceService, _this.workspaceService.isMultiRootWorkspaceOpened, optionsGenerator(index));
            item['taskDefinitionRegistry'] = _this.taskDefinitionRegistry;
            return item;
        });
    };
    QuickOpenTask.prototype.getOpenFileItem = function (scope, optionsGenerator) {
        var _this = this;
        return new quick_open_model_1.QuickOpenGroupItem(__assign({ label: 'Configure new task.', run: function (mode) {
                if (mode !== quick_open_model_1.QuickOpenMode.OPEN) {
                    return false;
                }
                setTimeout(function () { return _this.taskConfigurationManager.openConfiguration(scope); });
                return true;
            } }, optionsGenerator()));
    };
    QuickOpenTask.prototype.runBuildOrTestTask = function (buildOrTestType) {
        return __awaiter(this, void 0, void 0, function () {
            var shouldRunBuildTask, token, buildOrTestTasks, defaultBuildOrTestTasks, defaultBuildOrTestTask, taskToRun, scope;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        shouldRunBuildTask = buildOrTestType === 'build';
                        token = this.taskService.startUserAction();
                        return [4 /*yield*/, this.doInit(token)];
                    case 1:
                        _a.sent();
                        if (this.items.length > 1 ||
                            this.items.length === 1 && this.items[0].getTask !== undefined) { // the item in `this.items` is not 'No tasks found'
                            buildOrTestTasks = this.items.filter(function (t) {
                                return shouldRunBuildTask ? task_protocol_1.TaskCustomization.isBuildTask(t.getTask()) : task_protocol_1.TaskCustomization.isTestTask(t.getTask());
                            });
                            this.actionProvider = undefined;
                            if (buildOrTestTasks.length > 0) { // build / test tasks are defined in the workspace
                                defaultBuildOrTestTasks = buildOrTestTasks.filter(function (t) {
                                    return shouldRunBuildTask ? task_protocol_1.TaskCustomization.isDefaultBuildTask(t.getTask()) : task_protocol_1.TaskCustomization.isDefaultTestTask(t.getTask());
                                });
                                if (defaultBuildOrTestTasks.length === 1) { // run the default build / test task
                                    defaultBuildOrTestTask = defaultBuildOrTestTasks[0];
                                    taskToRun = defaultBuildOrTestTask.getTask();
                                    scope = taskToRun._scope;
                                    if (this.taskDefinitionRegistry && !!this.taskDefinitionRegistry.getDefinition(taskToRun)) {
                                        this.taskService.run(token, taskToRun.source, taskToRun.label, scope);
                                    }
                                    else {
                                        this.taskService.run(token, taskToRun._source, taskToRun.label, scope);
                                    }
                                    return [2 /*return*/];
                                }
                                // if default build / test task is not found, or there are more than one default,
                                // display the list of build /test tasks to let the user decide which to run
                                this.items = buildOrTestTasks;
                            }
                            else { // no build / test tasks, display an action item to configure the build / test task
                                this.items = [new quick_open_model_1.QuickOpenItem({
                                        label: "No " + buildOrTestType + " task to run found. Configure " + (buildOrTestType.charAt(0).toUpperCase() + buildOrTestType.slice(1)) + " Task...",
                                        run: function (mode) {
                                            if (mode !== quick_open_model_1.QuickOpenMode.OPEN) {
                                                return false;
                                            }
                                            _this.doInit(token).then(function () {
                                                // update the `tasks.json` file, instead of running the task itself
                                                _this.items = _this.items.map(function (item) {
                                                    var newItem = new ConfigureBuildOrTestTaskQuickOpenItem(token, item.getTask(), _this.taskService, _this.workspaceService.isMultiRootWorkspaceOpened, item.options, _this.taskNameResolver, shouldRunBuildTask, _this.taskConfigurationManager, _this.taskDefinitionRegistry, _this.taskSourceResolver);
                                                    return newItem;
                                                });
                                                _this.quickOpenService.open(_this, {
                                                    placeholder: "Select the task to be used as the default " + buildOrTestType + " task",
                                                    fuzzyMatchLabel: true,
                                                    fuzzySort: false
                                                });
                                            });
                                            return true;
                                        }
                                    })];
                            }
                        }
                        else { // no tasks are currently present, prompt users if they'd like to configure a task.
                            this.items = [
                                new quick_open_model_1.QuickOpenItem({
                                    label: "No " + buildOrTestType + " task to run found. Configure " + (buildOrTestType.charAt(0).toUpperCase() + buildOrTestType.slice(1)) + " Task...",
                                    run: function (mode) {
                                        if (mode !== quick_open_model_1.QuickOpenMode.OPEN) {
                                            return false;
                                        }
                                        _this.configure();
                                        return true;
                                    }
                                })
                            ];
                        }
                        this.quickOpenService.open(this, {
                            placeholder: "Select the " + buildOrTestType + " task to run",
                            fuzzyMatchLabel: true,
                            fuzzySort: false
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    QuickOpenTask.prototype.onType = function (lookFor, acceptor) {
        acceptor(this.items, this.actionProvider);
    };
    QuickOpenTask.prototype.getRunningTaskLabel = function (task) {
        return "Task id: " + task.taskId + ", label: " + task.config.label;
    };
    QuickOpenTask.prototype.getFilteredTasks = function (recentTasks, configuredTasks, providedTasks) {
        var _this = this;
        var filteredRecentTasks = [];
        recentTasks.forEach(function (recent) {
            var originalTaskConfig = __spread(configuredTasks, providedTasks).find(function (t) { return _this.taskDefinitionRegistry.compareTasks(recent, t); });
            if (originalTaskConfig) {
                filteredRecentTasks.push(originalTaskConfig);
            }
        });
        var filteredProvidedTasks = [];
        providedTasks.forEach(function (provided) {
            var exist = __spread(filteredRecentTasks, configuredTasks).some(function (t) { return _this.taskDefinitionRegistry.compareTasks(provided, t); });
            if (!exist) {
                filteredProvidedTasks.push(provided);
            }
        });
        var filteredConfiguredTasks = [];
        configuredTasks.forEach(function (configured) {
            var exist = filteredRecentTasks.some(function (t) { return _this.taskDefinitionRegistry.compareTasks(configured, t); });
            if (!exist) {
                filteredConfiguredTasks.push(configured);
            }
        });
        return {
            filteredRecentTasks: filteredRecentTasks, filteredConfiguredTasks: filteredConfiguredTasks, filteredProvidedTasks: filteredProvidedTasks
        };
    };
    QuickOpenTask.prototype.getGroupedTasksByWorkspaceFolder = function (tasks) {
        var e_2, _a, e_3, _b;
        var grouped = new Map();
        try {
            for (var tasks_1 = __values(tasks), tasks_1_1 = tasks_1.next(); !tasks_1_1.done; tasks_1_1 = tasks_1.next()) {
                var task = tasks_1_1.value;
                var scope = task._scope;
                if (grouped.has(scope.toString())) {
                    grouped.get(scope.toString()).push(task);
                }
                else {
                    grouped.set(scope.toString(), [task]);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (tasks_1_1 && !tasks_1_1.done && (_a = tasks_1.return)) _a.call(tasks_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        try {
            for (var _c = __values(grouped.values()), _d = _c.next(); !_d.done; _d = _c.next()) {
                var taskConfigs = _d.value;
                taskConfigs.sort(function (t1, t2) { return t1.label.localeCompare(t2.label); });
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return grouped;
    };
    __decorate([
        inversify_1.inject(task_service_1.TaskService),
        __metadata("design:type", task_service_1.TaskService)
    ], QuickOpenTask.prototype, "taskService", void 0);
    __decorate([
        inversify_1.inject(browser_1.QuickOpenService),
        __metadata("design:type", browser_1.QuickOpenService)
    ], QuickOpenTask.prototype, "quickOpenService", void 0);
    __decorate([
        inversify_1.inject(TaskActionProvider),
        __metadata("design:type", TaskActionProvider)
    ], QuickOpenTask.prototype, "taskActionProvider", void 0);
    __decorate([
        inversify_1.inject(browser_2.WorkspaceService),
        __metadata("design:type", browser_2.WorkspaceService)
    ], QuickOpenTask.prototype, "workspaceService", void 0);
    __decorate([
        inversify_1.inject(task_definition_registry_1.TaskDefinitionRegistry),
        __metadata("design:type", task_definition_registry_1.TaskDefinitionRegistry)
    ], QuickOpenTask.prototype, "taskDefinitionRegistry", void 0);
    __decorate([
        inversify_1.inject(task_name_resolver_1.TaskNameResolver),
        __metadata("design:type", task_name_resolver_1.TaskNameResolver)
    ], QuickOpenTask.prototype, "taskNameResolver", void 0);
    __decorate([
        inversify_1.inject(task_source_resolver_1.TaskSourceResolver),
        __metadata("design:type", task_source_resolver_1.TaskSourceResolver)
    ], QuickOpenTask.prototype, "taskSourceResolver", void 0);
    __decorate([
        inversify_1.inject(task_configuration_manager_1.TaskConfigurationManager),
        __metadata("design:type", task_configuration_manager_1.TaskConfigurationManager)
    ], QuickOpenTask.prototype, "taskConfigurationManager", void 0);
    __decorate([
        inversify_1.inject(browser_3.PreferenceService),
        __metadata("design:type", Object)
    ], QuickOpenTask.prototype, "preferences", void 0);
    __decorate([
        inversify_1.inject(browser_1.LabelProvider),
        __metadata("design:type", browser_1.LabelProvider)
    ], QuickOpenTask.prototype, "labelProvider", void 0);
    QuickOpenTask = __decorate([
        inversify_1.injectable()
    ], QuickOpenTask);
    return QuickOpenTask;
}());
exports.QuickOpenTask = QuickOpenTask;
var TaskRunQuickOpenItem = /** @class */ (function (_super) {
    __extends(TaskRunQuickOpenItem, _super);
    function TaskRunQuickOpenItem(token, task, taskService, isMulti, options, taskDefinitionRegistry, taskNameResolver, taskSourceResolver) {
        var _this = _super.call(this, options) || this;
        _this.token = token;
        _this.task = task;
        _this.taskService = taskService;
        _this.isMulti = isMulti;
        _this.options = options;
        _this.taskDefinitionRegistry = taskDefinitionRegistry;
        _this.taskNameResolver = taskNameResolver;
        _this.taskSourceResolver = taskSourceResolver;
        return _this;
    }
    TaskRunQuickOpenItem.prototype.getTask = function () {
        return this.task;
    };
    TaskRunQuickOpenItem.prototype.getLabel = function () {
        return this.taskNameResolver.resolve(this.task);
    };
    TaskRunQuickOpenItem.prototype.getToken = function () {
        return this.token;
    };
    TaskRunQuickOpenItem.prototype.getGroupLabel = function () {
        return this.options.groupLabel || '';
    };
    TaskRunQuickOpenItem.prototype.getDescription = function () {
        return this.options.description || renderScope(this.task._scope, this.isMulti);
    };
    TaskRunQuickOpenItem.prototype.run = function (mode) {
        if (mode !== quick_open_model_1.QuickOpenMode.OPEN) {
            return false;
        }
        var scope = this.task._scope;
        if (this.taskDefinitionRegistry && !!this.taskDefinitionRegistry.getDefinition(this.task)) {
            this.taskService.run(this.token, this.task.source || this.task._source, this.task.label, scope);
        }
        else {
            this.taskService.run(this.token, this.task._source, this.task.label, scope);
        }
        return true;
    };
    TaskRunQuickOpenItem.prototype.getDetail = function () {
        return this.task.detail;
    };
    return TaskRunQuickOpenItem;
}(quick_open_model_1.QuickOpenGroupItem));
exports.TaskRunQuickOpenItem = TaskRunQuickOpenItem;
var ConfigureBuildOrTestTaskQuickOpenItem = /** @class */ (function (_super) {
    __extends(ConfigureBuildOrTestTaskQuickOpenItem, _super);
    function ConfigureBuildOrTestTaskQuickOpenItem(token, task, taskService, isMulti, options, taskNameResolver, isBuildTask, taskConfigurationManager, taskDefinitionRegistry, taskSourceResolver) {
        var _this = _super.call(this, token, task, taskService, isMulti, options, taskDefinitionRegistry, taskNameResolver, taskSourceResolver) || this;
        _this.token = token;
        _this.task = task;
        _this.taskService = taskService;
        _this.isMulti = isMulti;
        _this.options = options;
        _this.taskNameResolver = taskNameResolver;
        _this.isBuildTask = isBuildTask;
        _this.taskConfigurationManager = taskConfigurationManager;
        _this.taskDefinitionRegistry = taskDefinitionRegistry;
        _this.taskSourceResolver = taskSourceResolver;
        return _this;
    }
    ConfigureBuildOrTestTaskQuickOpenItem.prototype.run = function (mode) {
        var _this = this;
        if (mode !== quick_open_model_1.QuickOpenMode.OPEN) {
            return false;
        }
        this.taskService.updateTaskConfiguration(this.token, this.task, { group: { kind: this.isBuildTask ? 'build' : 'test', isDefault: true } })
            .then(function () {
            if (_this.task._scope) {
                _this.taskConfigurationManager.openConfiguration(_this.task._scope);
            }
        });
        return true;
    };
    return ConfigureBuildOrTestTaskQuickOpenItem;
}(TaskRunQuickOpenItem));
exports.ConfigureBuildOrTestTaskQuickOpenItem = ConfigureBuildOrTestTaskQuickOpenItem;
function renderScope(scope, isMulti) {
    if (typeof scope === 'string') {
        if (isMulti) {
            return new uri_1.default(scope).displayName;
        }
        else {
            return '';
        }
    }
    else {
        return task_protocol_1.TaskScope[scope];
    }
}
var TaskConfigureQuickOpenItem = /** @class */ (function (_super) {
    __extends(TaskConfigureQuickOpenItem, _super);
    function TaskConfigureQuickOpenItem(token, task, taskService, taskNameResolver, workspaceService, isMulti, options) {
        var _this = _super.call(this, options) || this;
        _this.token = token;
        _this.task = task;
        _this.taskService = taskService;
        _this.taskNameResolver = taskNameResolver;
        _this.workspaceService = workspaceService;
        _this.isMulti = isMulti;
        _this.options = options;
        var stat = _this.workspaceService.workspace;
        _this.isMulti = stat ? !stat.isDirectory : false;
        return _this;
    }
    TaskConfigureQuickOpenItem.prototype.getLabel = function () {
        return this.taskNameResolver.resolve(this.task);
    };
    TaskConfigureQuickOpenItem.prototype.getGroupLabel = function () {
        return this.options.groupLabel || '';
    };
    TaskConfigureQuickOpenItem.prototype.getDescription = function () {
        return renderScope(this.task._scope, this.isMulti);
    };
    TaskConfigureQuickOpenItem.prototype.run = function (mode) {
        if (mode !== quick_open_model_1.QuickOpenMode.OPEN) {
            return false;
        }
        this.taskService.configure(this.token, this.task);
        return true;
    };
    return TaskConfigureQuickOpenItem;
}(quick_open_model_1.QuickOpenGroupItem));
exports.TaskConfigureQuickOpenItem = TaskConfigureQuickOpenItem;
var TaskTerminateQuickOpen = /** @class */ (function () {
    function TaskTerminateQuickOpen() {
    }
    TaskTerminateQuickOpen.prototype.onType = function (_lookFor, acceptor) {
        return __awaiter(this, void 0, void 0, function () {
            var items, runningTasks, isMulti;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        items = [];
                        return [4 /*yield*/, this.taskService.getRunningTasks()];
                    case 1:
                        runningTasks = _a.sent();
                        isMulti = this.workspaceService.isMultiRootWorkspaceOpened;
                        if (runningTasks.length <= 0) {
                            items.push(new quick_open_model_1.QuickOpenItem({
                                label: 'No task is currently running',
                                run: function () { return false; },
                            }));
                        }
                        else {
                            runningTasks.forEach(function (task) {
                                items.push(new RunningTaskQuickOpenItem(task, _this.taskService, _this.taskNameResolver, _this.taskSourceResolver, _this.taskDefinitionRegistry, _this.labelProvider, isMulti, {
                                    run: function (mode) {
                                        if (mode !== quick_open_model_1.QuickOpenMode.OPEN) {
                                            return false;
                                        }
                                        _this.taskService.kill(task.taskId);
                                        return true;
                                    }
                                }));
                            });
                            if (runningTasks.length > 1) {
                                items.push(new quick_open_model_1.QuickOpenItem({
                                    label: 'All running tasks',
                                    run: function (mode) {
                                        if (mode !== quick_open_model_1.QuickOpenMode.OPEN) {
                                            return false;
                                        }
                                        runningTasks.forEach(function (t) {
                                            _this.taskService.kill(t.taskId);
                                        });
                                        return true;
                                    }
                                }));
                            }
                        }
                        acceptor(items);
                        return [2 /*return*/];
                }
            });
        });
    };
    TaskTerminateQuickOpen.prototype.open = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.quickOpenService.open(this, {
                    placeholder: 'Select task to terminate',
                    fuzzyMatchLabel: true,
                    fuzzyMatchDescription: true,
                });
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        inversify_1.inject(browser_1.LabelProvider),
        __metadata("design:type", browser_1.LabelProvider)
    ], TaskTerminateQuickOpen.prototype, "labelProvider", void 0);
    __decorate([
        inversify_1.inject(browser_1.QuickOpenService),
        __metadata("design:type", browser_1.QuickOpenService)
    ], TaskTerminateQuickOpen.prototype, "quickOpenService", void 0);
    __decorate([
        inversify_1.inject(task_definition_registry_1.TaskDefinitionRegistry),
        __metadata("design:type", task_definition_registry_1.TaskDefinitionRegistry)
    ], TaskTerminateQuickOpen.prototype, "taskDefinitionRegistry", void 0);
    __decorate([
        inversify_1.inject(task_name_resolver_1.TaskNameResolver),
        __metadata("design:type", task_name_resolver_1.TaskNameResolver)
    ], TaskTerminateQuickOpen.prototype, "taskNameResolver", void 0);
    __decorate([
        inversify_1.inject(task_source_resolver_1.TaskSourceResolver),
        __metadata("design:type", task_source_resolver_1.TaskSourceResolver)
    ], TaskTerminateQuickOpen.prototype, "taskSourceResolver", void 0);
    __decorate([
        inversify_1.inject(task_service_1.TaskService),
        __metadata("design:type", task_service_1.TaskService)
    ], TaskTerminateQuickOpen.prototype, "taskService", void 0);
    __decorate([
        inversify_1.inject(browser_2.WorkspaceService),
        __metadata("design:type", browser_2.WorkspaceService)
    ], TaskTerminateQuickOpen.prototype, "workspaceService", void 0);
    TaskTerminateQuickOpen = __decorate([
        inversify_1.injectable()
    ], TaskTerminateQuickOpen);
    return TaskTerminateQuickOpen;
}());
exports.TaskTerminateQuickOpen = TaskTerminateQuickOpen;
var TaskRunningQuickOpen = /** @class */ (function () {
    function TaskRunningQuickOpen() {
    }
    TaskRunningQuickOpen.prototype.onType = function (_lookFor, acceptor) {
        return __awaiter(this, void 0, void 0, function () {
            var items, runningTasks, isMulti;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        items = [];
                        return [4 /*yield*/, this.taskService.getRunningTasks()];
                    case 1:
                        runningTasks = _a.sent();
                        isMulti = this.workspaceService.isMultiRootWorkspaceOpened;
                        if (runningTasks.length <= 0) {
                            items.push(new quick_open_model_1.QuickOpenItem({
                                label: 'No task is currently running',
                                run: function () { return false; },
                            }));
                        }
                        else {
                            runningTasks.forEach(function (task) {
                                items.push(new RunningTaskQuickOpenItem(task, _this.taskService, _this.taskNameResolver, _this.taskSourceResolver, _this.taskDefinitionRegistry, _this.labelProvider, isMulti, {
                                    run: function (mode) {
                                        if (mode !== quick_open_model_1.QuickOpenMode.OPEN) {
                                            return false;
                                        }
                                        if (task.terminalId) {
                                            var terminal = _this.terminalService.getByTerminalId(task.terminalId);
                                            if (terminal) {
                                                _this.terminalService.open(terminal);
                                            }
                                        }
                                        return true;
                                    }
                                }));
                            });
                        }
                        acceptor(items);
                        return [2 /*return*/];
                }
            });
        });
    };
    TaskRunningQuickOpen.prototype.open = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.quickOpenService.open(this, {
                    placeholder: 'Select the task to show its output',
                    fuzzyMatchLabel: true,
                    fuzzyMatchDescription: true,
                });
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        inversify_1.inject(browser_1.LabelProvider),
        __metadata("design:type", browser_1.LabelProvider)
    ], TaskRunningQuickOpen.prototype, "labelProvider", void 0);
    __decorate([
        inversify_1.inject(browser_1.QuickOpenService),
        __metadata("design:type", browser_1.QuickOpenService)
    ], TaskRunningQuickOpen.prototype, "quickOpenService", void 0);
    __decorate([
        inversify_1.inject(task_definition_registry_1.TaskDefinitionRegistry),
        __metadata("design:type", task_definition_registry_1.TaskDefinitionRegistry)
    ], TaskRunningQuickOpen.prototype, "taskDefinitionRegistry", void 0);
    __decorate([
        inversify_1.inject(task_name_resolver_1.TaskNameResolver),
        __metadata("design:type", task_name_resolver_1.TaskNameResolver)
    ], TaskRunningQuickOpen.prototype, "taskNameResolver", void 0);
    __decorate([
        inversify_1.inject(task_source_resolver_1.TaskSourceResolver),
        __metadata("design:type", task_source_resolver_1.TaskSourceResolver)
    ], TaskRunningQuickOpen.prototype, "taskSourceResolver", void 0);
    __decorate([
        inversify_1.inject(task_service_1.TaskService),
        __metadata("design:type", task_service_1.TaskService)
    ], TaskRunningQuickOpen.prototype, "taskService", void 0);
    __decorate([
        inversify_1.inject(browser_2.WorkspaceService),
        __metadata("design:type", browser_2.WorkspaceService)
    ], TaskRunningQuickOpen.prototype, "workspaceService", void 0);
    __decorate([
        inversify_1.inject(terminal_service_1.TerminalService),
        __metadata("design:type", Object)
    ], TaskRunningQuickOpen.prototype, "terminalService", void 0);
    TaskRunningQuickOpen = __decorate([
        inversify_1.injectable()
    ], TaskRunningQuickOpen);
    return TaskRunningQuickOpen;
}());
exports.TaskRunningQuickOpen = TaskRunningQuickOpen;
var RunningTaskQuickOpenItem = /** @class */ (function (_super) {
    __extends(RunningTaskQuickOpenItem, _super);
    function RunningTaskQuickOpenItem(taskInfo, taskService, taskNameResolver, taskSourceResolver, taskDefinitionRegistry, labelProvider, isMulti, options) {
        var _this = _super.call(this, options) || this;
        _this.taskInfo = taskInfo;
        _this.taskService = taskService;
        _this.taskNameResolver = taskNameResolver;
        _this.taskSourceResolver = taskSourceResolver;
        _this.taskDefinitionRegistry = taskDefinitionRegistry;
        _this.labelProvider = labelProvider;
        _this.isMulti = isMulti;
        _this.options = options;
        return _this;
    }
    RunningTaskQuickOpenItem.prototype.getLabel = function () {
        return this.taskNameResolver.resolve(this.taskInfo.config);
    };
    RunningTaskQuickOpenItem.prototype.getDescription = function () {
        return renderScope(this.taskInfo.config._scope, this.isMulti);
    };
    RunningTaskQuickOpenItem.prototype.run = function (mode) {
        if (mode !== quick_open_model_1.QuickOpenMode.OPEN || !this.options.run) {
            return false;
        }
        return this.options.run(mode);
    };
    RunningTaskQuickOpenItem.prototype.getDetail = function () {
        return this.taskInfo.config.detail;
    };
    return RunningTaskQuickOpenItem;
}(quick_open_model_1.QuickOpenItem));
exports.RunningTaskQuickOpenItem = RunningTaskQuickOpenItem;
var TaskRestartRunningQuickOpen = /** @class */ (function () {
    function TaskRestartRunningQuickOpen() {
    }
    TaskRestartRunningQuickOpen.prototype.onType = function (_lookFor, acceptor) {
        return __awaiter(this, void 0, void 0, function () {
            var items, runningTasks, isMulti;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        items = [];
                        return [4 /*yield*/, this.taskService.getRunningTasks()];
                    case 1:
                        runningTasks = _a.sent();
                        isMulti = this.workspaceService.isMultiRootWorkspaceOpened;
                        if (runningTasks.length <= 0) {
                            items.push(new quick_open_model_1.QuickOpenItem({
                                label: 'No task to restart',
                                run: function () { return false; },
                            }));
                        }
                        else {
                            runningTasks.forEach(function (task) {
                                items.push(new RunningTaskQuickOpenItem(task, _this.taskService, _this.taskNameResolver, _this.taskSourceResolver, _this.taskDefinitionRegistry, _this.labelProvider, isMulti, {
                                    run: function (mode) {
                                        if (mode !== quick_open_model_1.QuickOpenMode.OPEN) {
                                            return false;
                                        }
                                        _this.taskService.restartTask(task);
                                        return true;
                                    }
                                }));
                            });
                        }
                        acceptor(items);
                        return [2 /*return*/];
                }
            });
        });
    };
    TaskRestartRunningQuickOpen.prototype.open = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.quickOpenService.open(this, {
                    placeholder: 'Select task to restart',
                    fuzzyMatchLabel: true,
                    fuzzyMatchDescription: true,
                });
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        inversify_1.inject(browser_1.LabelProvider),
        __metadata("design:type", browser_1.LabelProvider)
    ], TaskRestartRunningQuickOpen.prototype, "labelProvider", void 0);
    __decorate([
        inversify_1.inject(browser_1.QuickOpenService),
        __metadata("design:type", browser_1.QuickOpenService)
    ], TaskRestartRunningQuickOpen.prototype, "quickOpenService", void 0);
    __decorate([
        inversify_1.inject(task_definition_registry_1.TaskDefinitionRegistry),
        __metadata("design:type", task_definition_registry_1.TaskDefinitionRegistry)
    ], TaskRestartRunningQuickOpen.prototype, "taskDefinitionRegistry", void 0);
    __decorate([
        inversify_1.inject(task_name_resolver_1.TaskNameResolver),
        __metadata("design:type", task_name_resolver_1.TaskNameResolver)
    ], TaskRestartRunningQuickOpen.prototype, "taskNameResolver", void 0);
    __decorate([
        inversify_1.inject(task_source_resolver_1.TaskSourceResolver),
        __metadata("design:type", task_source_resolver_1.TaskSourceResolver)
    ], TaskRestartRunningQuickOpen.prototype, "taskSourceResolver", void 0);
    __decorate([
        inversify_1.inject(task_service_1.TaskService),
        __metadata("design:type", task_service_1.TaskService)
    ], TaskRestartRunningQuickOpen.prototype, "taskService", void 0);
    __decorate([
        inversify_1.inject(browser_2.WorkspaceService),
        __metadata("design:type", browser_2.WorkspaceService)
    ], TaskRestartRunningQuickOpen.prototype, "workspaceService", void 0);
    TaskRestartRunningQuickOpen = __decorate([
        inversify_1.injectable()
    ], TaskRestartRunningQuickOpen);
    return TaskRestartRunningQuickOpen;
}());
exports.TaskRestartRunningQuickOpen = TaskRestartRunningQuickOpen;
//# sourceMappingURL=quick-open-task.js.map