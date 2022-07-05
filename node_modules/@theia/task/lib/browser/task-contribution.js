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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskProviderRegistry = exports.TaskResolverRegistry = exports.TaskContribution = void 0;
var inversify_1 = require("inversify");
var event_1 = require("@theia/core/lib/common/event");
exports.TaskContribution = Symbol('TaskContribution');
/**
 * The {@link TaskResolverRegistry} is the common component for registration and provision of
 * {@link TaskResolver}s. Theia will collect all {@link TaskContribution}s and invoke {@link TaskContribution#registerResolvers}
 * for each contribution.
 */
var TaskResolverRegistry = /** @class */ (function () {
    function TaskResolverRegistry() {
        this.onWillProvideTaskResolverEmitter = new event_1.Emitter();
        /**
         * Emit when the registry provides a registered resolver. i.e. when the {@link TaskResolverRegistry#getResolver}
         * function is called.
         */
        this.onWillProvideTaskResolver = this.onWillProvideTaskResolverEmitter.event;
    }
    TaskResolverRegistry.prototype.init = function () {
        this.resolvers = new Map();
    };
    /**
     * Registers the given {@link TaskResolver} to resolve the `TaskConfiguration` of the specified type.
     * If there is already a `TaskResolver` registered for the specified type the registration will
     * be overwritten with the new value.
     * @param type the task configuration type for which the given resolver should be registered.
     * @param resolver the task resolver that should be registered.
     *
     * @returns a `Disposable` that can be invoked to unregister the given resolver
     */
    TaskResolverRegistry.prototype.register = function (type, resolver) {
        var _this = this;
        this.resolvers.set(type, resolver);
        return {
            dispose: function () { return _this.resolvers.delete(type); }
        };
    };
    /**
     * Retrieves the {@link TaskResolver} registered for the given type task configuration type.
     * @param type the task configuration type
     *
     * @returns a promise of the registered `TaskResolver` or `undefined` if no resolver is registered for the given type.
     */
    TaskResolverRegistry.prototype.getResolver = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, event_1.WaitUntilEvent.fire(this.onWillProvideTaskResolverEmitter, {})];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.resolvers.get(type)];
                }
            });
        });
    };
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TaskResolverRegistry.prototype, "init", null);
    TaskResolverRegistry = __decorate([
        inversify_1.injectable()
    ], TaskResolverRegistry);
    return TaskResolverRegistry;
}());
exports.TaskResolverRegistry = TaskResolverRegistry;
/**
 * The {@link TaskProviderRegistry} is the common component for registration and provision of
 * {@link TaskProvider}s. Theia will collect all {@link TaskContribution}s and invoke {@link TaskContribution#registerProviders}
 * for each contribution.
 */
var TaskProviderRegistry = /** @class */ (function () {
    function TaskProviderRegistry() {
        this.onWillProvideTaskProviderEmitter = new event_1.Emitter();
        /**
         * Emit when the registry provides a registered task provider. i.e. when the {@link TaskProviderRegistry#getProvider}
         * function is called.
         */
        this.onWillProvideTaskProvider = this.onWillProvideTaskProviderEmitter.event;
    }
    TaskProviderRegistry.prototype.init = function () {
        this.providers = new Map();
    };
    /**
     * Registers the given {@link TaskProvider} for task configurations of the specified type
     * @param type the task configuration type for which the given provider should be registered.
     * @param provider the `TaskProvider` that should be registered.
     *
     * @returns a `Disposable` that can be invoked to unregister the given resolver.
     */
    TaskProviderRegistry.prototype.register = function (type, provider, handle) {
        var _this = this;
        var key = handle === undefined ? type : type + "::" + handle;
        this.providers.set(key, provider);
        return {
            dispose: function () { return _this.providers.delete(key); }
        };
    };
    /**
     * Retrieves the {@link TaskProvider} registered for the given type task configuration type.
     * If there is already a `TaskProvider` registered for the specified type the registration will
     * be overwritten with the new value.
     * @param type the task configuration type.
     *
     * @returns a promise of the registered `TaskProvider`` or `undefined` if no provider is registered for the given type.
     */
    TaskProviderRegistry.prototype.getProvider = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, event_1.WaitUntilEvent.fire(this.onWillProvideTaskProviderEmitter, {})];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.providers.get(type)];
                }
            });
        });
    };
    /**
     * Retrieve all registered {@link TaskProvider}s.
     *
     * @returns a promise of all registered {@link TaskProvider}s.
     */
    TaskProviderRegistry.prototype.getProviders = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, event_1.WaitUntilEvent.fire(this.onWillProvideTaskProviderEmitter, {})];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, __spread(this.providers.values())];
                }
            });
        });
    };
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TaskProviderRegistry.prototype, "init", null);
    TaskProviderRegistry = __decorate([
        inversify_1.injectable()
    ], TaskProviderRegistry);
    return TaskProviderRegistry;
}());
exports.TaskProviderRegistry = TaskProviderRegistry;
//# sourceMappingURL=task-contribution.js.map