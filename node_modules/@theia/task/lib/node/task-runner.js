"use strict";
/********************************************************************************
 * Copyright (C) 2018 Red Hat, Inc. and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRunnerRegistry = exports.TaskRunner = exports.TaskRunnerContribution = void 0;
var inversify_1 = require("inversify");
var process_task_runner_1 = require("./process/process-task-runner");
exports.TaskRunnerContribution = Symbol('TaskRunnerContribution');
exports.TaskRunner = Symbol('TaskRunner');
/**
 * The {@link TaskRunnerRegistry} is the common component for the registration and provisioning of
 * {@link TaskRunner}s. Theia will collect all {@link TaskRunner}s and invoke {@link TaskRunnerContribution#registerRunner}
 * for each contribution. The `TaskServer` will use the runners provided by this registry to execute `TaskConfiguration`s that
 * have been triggered by the user.
 */
var TaskRunnerRegistry = /** @class */ (function () {
    function TaskRunnerRegistry() {
    }
    TaskRunnerRegistry.prototype.init = function () {
        this.runners = new Map();
        this.defaultRunner = this.processTaskRunner;
    };
    /**
     * Registers the given {@link TaskRunner} to execute Tasks of the specified type.
     * If there is already a {@link TaskRunner} registered for the specified type the registration will
     * be overwritten with the new value.
     * @param type the task type for which the given runner should be registered.
     * @param runner the task runner that should be registered.
     *
     * @returns a `Disposable` that can be invoked to unregister the given runner.
     */
    TaskRunnerRegistry.prototype.registerRunner = function (type, runner) {
        var _this = this;
        this.runners.set(type, runner);
        return {
            dispose: function () { return _this.runners.delete(type); }
        };
    };
    /**
     * Retrieves the {@link TaskRunner} registered for the specified Task type.
     * @param type the task type.
     *
     * @returns the registered {@link TaskRunner} or a default runner if none is registered for the specified type.
     */
    TaskRunnerRegistry.prototype.getRunner = function (type) {
        var runner = this.runners.get(type);
        return runner ? runner : this.defaultRunner;
    };
    /**
     * Derives all task types for which a {@link TaskRunner} is registered.
     *
     * @returns all derived task types.
     */
    TaskRunnerRegistry.prototype.getRunnerTypes = function () {
        return __spread(this.runners.keys());
    };
    __decorate([
        inversify_1.inject(process_task_runner_1.ProcessTaskRunner),
        __metadata("design:type", process_task_runner_1.ProcessTaskRunner)
    ], TaskRunnerRegistry.prototype, "processTaskRunner", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TaskRunnerRegistry.prototype, "init", null);
    TaskRunnerRegistry = __decorate([
        inversify_1.injectable()
    ], TaskRunnerRegistry);
    return TaskRunnerRegistry;
}());
exports.TaskRunnerRegistry = TaskRunnerRegistry;
//# sourceMappingURL=task-runner.js.map