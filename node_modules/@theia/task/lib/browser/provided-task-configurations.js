"use strict";
/********************************************************************************
 * Copyright (C) 2019 Ericsson and others.
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
exports.ProvidedTaskConfigurations = void 0;
var inversify_1 = require("inversify");
var task_contribution_1 = require("./task-contribution");
var task_definition_registry_1 = require("./task-definition-registry");
var common_1 = require("../common");
var ProvidedTaskConfigurations = /** @class */ (function () {
    function ProvidedTaskConfigurations() {
        /**
         * Map of source (name of extension, or path of root folder that the task config comes from) and `task config map`.
         * For the second level of inner map, the key is task label.
         * For the third level of inner map, the key is the task scope and value TaskConfiguration.
         */
        this.tasksMap = new Map();
        this.currentToken = 0;
        this.nextToken = 1;
    }
    ProvidedTaskConfigurations.prototype.startUserAction = function () {
        return this.nextToken++;
    };
    /** returns a list of provided tasks */
    ProvidedTaskConfigurations.prototype.getTasks = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var tasks, _a, _b, taskLabelMap, _c, _d, taskScopeMap, _e, _f, task;
            var e_1, _g, e_2, _h, e_3, _j;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0: return [4 /*yield*/, this.refreshTasks(token)];
                    case 1:
                        _k.sent();
                        tasks = [];
                        try {
                            for (_a = __values(this.tasksMap.values()), _b = _a.next(); !_b.done; _b = _a.next()) {
                                taskLabelMap = _b.value;
                                try {
                                    for (_c = (e_2 = void 0, __values(taskLabelMap.values())), _d = _c.next(); !_d.done; _d = _c.next()) {
                                        taskScopeMap = _d.value;
                                        try {
                                            for (_e = (e_3 = void 0, __values(taskScopeMap.values())), _f = _e.next(); !_f.done; _f = _e.next()) {
                                                task = _f.value;
                                                tasks.push(task);
                                            }
                                        }
                                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                                        finally {
                                            try {
                                                if (_f && !_f.done && (_j = _e.return)) _j.call(_e);
                                            }
                                            finally { if (e_3) throw e_3.error; }
                                        }
                                    }
                                }
                                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                                finally {
                                    try {
                                        if (_d && !_d.done && (_h = _c.return)) _h.call(_c);
                                    }
                                    finally { if (e_2) throw e_2.error; }
                                }
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_g = _a.return)) _g.call(_a);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        return [2 /*return*/, tasks];
                }
            });
        });
    };
    ProvidedTaskConfigurations.prototype.refreshTasks = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var providers, providedTasks;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(token !== this.currentToken)) return [3 /*break*/, 3];
                        this.currentToken = token;
                        return [4 /*yield*/, this.taskProviderRegistry.getProviders()];
                    case 1:
                        providers = _a.sent();
                        return [4 /*yield*/, Promise.all(providers.map(function (p) { return p.provideTasks(); }))];
                    case 2:
                        providedTasks = (_a.sent())
                            .reduce(function (acc, taskArray) { return acc.concat(taskArray); }, [])
                            // Global/User tasks from providers are not supported.
                            .filter(function (task) { return task.scope !== common_1.TaskScope.Global; })
                            .map(function (providedTask) {
                            var originalPresentation = providedTask.presentation || {};
                            return __assign(__assign({}, providedTask), { presentation: __assign(__assign({}, common_1.TaskOutputPresentation.getDefault()), originalPresentation) });
                        });
                        this.cacheTasks(providedTasks);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /** returns the task configuration for a given source and label or undefined if none */
    ProvidedTaskConfigurations.prototype.getTask = function (token, source, taskLabel, scope) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.refreshTasks(token)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.getCachedTask(source, taskLabel, scope)];
                }
            });
        });
    };
    /**
     * Finds the detected task for the given task customization.
     * The detected task is considered as a "match" to the task customization if it has all the `required` properties.
     * In case that more than one customization is found, return the one that has the biggest number of matched properties.
     *
     * @param customization the task customization
     * @return the detected task for the given task customization. If the task customization is not found, `undefined` is returned.
     */
    ProvidedTaskConfigurations.prototype.getTaskToCustomize = function (token, customization, scope) {
        return __awaiter(this, void 0, void 0, function () {
            var definition, matchedTasks, highest, tasks, _loop_1, tasks_1, tasks_1_1, task, scopes, matchedTask;
            var e_4, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        definition = this.taskDefinitionRegistry.getDefinition(customization);
                        if (!definition) {
                            return [2 /*return*/, undefined];
                        }
                        matchedTasks = [];
                        highest = -1;
                        return [4 /*yield*/, this.getTasks(token)];
                    case 1:
                        tasks = _b.sent();
                        _loop_1 = function (task) {
                            var score = 0;
                            if (!definition.properties.required.every(function (requiredProp) { return customization[requiredProp] !== undefined; })) {
                                return "continue";
                            }
                            score += definition.properties.required.length; // number of required properties
                            var requiredProps = new Set(definition.properties.required);
                            // number of optional properties
                            score += definition.properties.all.filter(function (p) { return !requiredProps.has(p) && customization[p] !== undefined; }).length;
                            if (score >= highest) {
                                if (score > highest) {
                                    highest = score;
                                    matchedTasks.length = 0;
                                }
                                matchedTasks.push(task);
                            }
                        };
                        try {
                            for (tasks_1 = __values(tasks), tasks_1_1 = tasks_1.next(); !tasks_1_1.done; tasks_1_1 = tasks_1.next()) {
                                task = tasks_1_1.value;
                                _loop_1(task);
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (tasks_1_1 && !tasks_1_1.done && (_a = tasks_1.return)) _a.call(tasks_1);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                        scopes = [scope, common_1.TaskScope.Workspace];
                        matchedTask = matchedTasks.find(function (t) {
                            return scopes.some(function (scp) { return scp === t._scope; }) && definition.properties.all.every(function (p) { return t[p] === customization[p]; });
                        });
                        return [2 /*return*/, matchedTask];
                }
            });
        });
    };
    ProvidedTaskConfigurations.prototype.getCachedTask = function (source, taskLabel, scope) {
        var labelConfigMap = this.tasksMap.get(source);
        if (labelConfigMap) {
            var scopeConfigMap = labelConfigMap.get(taskLabel);
            if (scopeConfigMap) {
                if (scope) {
                    return scopeConfigMap.get(scope.toString());
                }
                return Array.from(scopeConfigMap.values())[0];
            }
        }
    };
    ProvidedTaskConfigurations.prototype.cacheTasks = function (tasks) {
        var e_5, _a;
        this.tasksMap.clear();
        try {
            for (var tasks_2 = __values(tasks), tasks_2_1 = tasks_2.next(); !tasks_2_1.done; tasks_2_1 = tasks_2.next()) {
                var task = tasks_2_1.value;
                var label = task.label;
                var source = task._source;
                var scope = task._scope;
                if (this.tasksMap.has(source)) {
                    var labelConfigMap = this.tasksMap.get(source);
                    if (labelConfigMap.has(label)) {
                        labelConfigMap.get(label).set(scope.toString(), task);
                    }
                    else {
                        var newScopeConfigMap = new Map();
                        newScopeConfigMap.set(scope.toString(), task);
                        labelConfigMap.set(label, newScopeConfigMap);
                    }
                }
                else {
                    var newLabelConfigMap = new Map();
                    var newScopeConfigMap = new Map();
                    newScopeConfigMap.set(scope.toString(), task);
                    newLabelConfigMap.set(label, newScopeConfigMap);
                    this.tasksMap.set(source, newLabelConfigMap);
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (tasks_2_1 && !tasks_2_1.done && (_a = tasks_2.return)) _a.call(tasks_2);
            }
            finally { if (e_5) throw e_5.error; }
        }
    };
    __decorate([
        inversify_1.inject(task_contribution_1.TaskProviderRegistry),
        __metadata("design:type", task_contribution_1.TaskProviderRegistry)
    ], ProvidedTaskConfigurations.prototype, "taskProviderRegistry", void 0);
    __decorate([
        inversify_1.inject(task_definition_registry_1.TaskDefinitionRegistry),
        __metadata("design:type", task_definition_registry_1.TaskDefinitionRegistry)
    ], ProvidedTaskConfigurations.prototype, "taskDefinitionRegistry", void 0);
    ProvidedTaskConfigurations = __decorate([
        inversify_1.injectable()
    ], ProvidedTaskConfigurations);
    return ProvidedTaskConfigurations;
}());
exports.ProvidedTaskConfigurations = ProvidedTaskConfigurations;
//# sourceMappingURL=provided-task-configurations.js.map