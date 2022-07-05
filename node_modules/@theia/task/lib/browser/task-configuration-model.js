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
exports.TaskConfigurationModel = void 0;
var event_1 = require("@theia/core/lib/common/event");
var disposable_1 = require("@theia/core/lib/common/disposable");
var browser_1 = require("@theia/core/lib/browser");
/**
 * Holds the task configurations associated with a particular file. Uses an editor model to facilitate
 * non-destructive editing and coordination with editing the file by hand.
 */
var TaskConfigurationModel = /** @class */ (function () {
    function TaskConfigurationModel(scope, preferences) {
        var _this = this;
        this.scope = scope;
        this.preferences = preferences;
        this.onDidChangeEmitter = new event_1.Emitter();
        this.onDidChange = this.onDidChangeEmitter.event;
        this.toDispose = new disposable_1.DisposableCollection(this.onDidChangeEmitter);
        this.reconcile();
        this.toDispose.push(this.preferences.onDidPreferencesChanged(function (e) {
            var change = e['tasks'];
            if (change && browser_1.PreferenceProviderDataChange.affects(change, _this.getWorkspaceFolder())) {
                _this.reconcile();
            }
        }));
    }
    Object.defineProperty(TaskConfigurationModel.prototype, "uri", {
        get: function () {
            return this.json.uri;
        },
        enumerable: false,
        configurable: true
    });
    TaskConfigurationModel.prototype.getWorkspaceFolder = function () {
        return typeof this.scope === 'string' ? this.scope : undefined;
    };
    TaskConfigurationModel.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    Object.defineProperty(TaskConfigurationModel.prototype, "onDispose", {
        get: function () {
            return this.toDispose.onDispose;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskConfigurationModel.prototype, "configurations", {
        get: function () {
            return this.json.configurations;
        },
        enumerable: false,
        configurable: true
    });
    TaskConfigurationModel.prototype.reconcile = function () {
        this.json = this.parseConfigurations();
        this.onDidChangeEmitter.fire(undefined);
    };
    TaskConfigurationModel.prototype.setConfigurations = function (value) {
        return this.preferences.setPreference('tasks.tasks', value, this.getWorkspaceFolder());
    };
    TaskConfigurationModel.prototype.parseConfigurations = function () {
        var e_1, _a;
        var configurations = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var _b = this.preferences.resolve('tasks', this.getWorkspaceFolder()), configUri = _b.configUri, value = _b.value;
        if (value && typeof value === 'object' && 'tasks' in value) {
            if (Array.isArray(value.tasks)) {
                try {
                    for (var _c = __values(value.tasks), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var taskConfig = _d.value;
                        configurations.push(taskConfig);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        }
        return {
            uri: configUri,
            configurations: configurations
        };
    };
    return TaskConfigurationModel;
}());
exports.TaskConfigurationModel = TaskConfigurationModel;
//# sourceMappingURL=task-configuration-model.js.map