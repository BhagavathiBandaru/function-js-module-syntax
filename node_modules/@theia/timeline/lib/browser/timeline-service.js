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
exports.TimelineAggregate = exports.TimelineService = void 0;
var inversify_1 = require("inversify");
var common_1 = require("@theia/core/lib/common");
var TimelineService = /** @class */ (function () {
    function TimelineService() {
        this.providers = new Map();
        this.onDidChangeProvidersEmitter = new common_1.Emitter();
        this.onDidChangeProviders = this.onDidChangeProvidersEmitter.event;
        this.onDidChangeTimelineEmitter = new common_1.Emitter();
        this.onDidChangeTimeline = this.onDidChangeTimelineEmitter.event;
    }
    TimelineService.prototype.registerTimelineProvider = function (provider) {
        var _this = this;
        var id = provider.id;
        this.providers.set(id, provider);
        if (provider.onDidChange) {
            provider.onDidChange(function (e) { return _this.onDidChangeTimelineEmitter.fire(e); });
        }
        this.onDidChangeProvidersEmitter.fire({ added: [id] });
        return common_1.Disposable.create(function () { return _this.unregisterTimelineProvider(id); });
    };
    TimelineService.prototype.unregisterTimelineProvider = function (id) {
        var provider = this.providers.get(id);
        if (provider) {
            provider.dispose();
            this.providers.delete(id);
            this.onDidChangeProvidersEmitter.fire({ removed: [id] });
        }
    };
    TimelineService.prototype.getSources = function () {
        return __spread(this.providers.values()).map(function (p) { return ({ id: p.id, label: p.label }); });
    };
    TimelineService.prototype.getSchemas = function () {
        var result = [];
        Array.from(this.providers.values()).forEach(function (provider) {
            var scheme = provider.scheme;
            if (typeof scheme === 'string') {
                result.push(scheme);
            }
            else {
                scheme.forEach(function (s) { return result.push(s); });
            }
        });
        return result;
    };
    TimelineService.prototype.getTimeline = function (id, uri, options, internalOptions) {
        var provider = this.providers.get(id);
        if (!provider) {
            return Promise.resolve(undefined);
        }
        if (typeof provider.scheme === 'string') {
            if (provider.scheme !== '*' && provider.scheme !== uri.scheme) {
                return Promise.resolve(undefined);
            }
        }
        return provider.provideTimeline(uri, options, internalOptions)
            .then(function (result) {
            if (!result) {
                return undefined;
            }
            result.items = result.items.map(function (item) { return (__assign(__assign({}, item), { source: provider.id })); });
            return result;
        });
    };
    TimelineService = __decorate([
        inversify_1.injectable()
    ], TimelineService);
    return TimelineService;
}());
exports.TimelineService = TimelineService;
var TimelineAggregate = /** @class */ (function () {
    function TimelineAggregate(timeline) {
        var _a;
        this.source = timeline.source;
        this.items = timeline.items;
        this._cursor = (_a = timeline.paging) === null || _a === void 0 ? void 0 : _a.cursor;
    }
    Object.defineProperty(TimelineAggregate.prototype, "cursor", {
        get: function () {
            return this._cursor;
        },
        set: function (cursor) {
            this._cursor = cursor;
        },
        enumerable: false,
        configurable: true
    });
    TimelineAggregate.prototype.add = function (items) {
        var _a;
        (_a = this.items).push.apply(_a, __spread(items));
        this.items.sort(function (a, b) { return b.timestamp - a.timestamp; });
    };
    return TimelineAggregate;
}());
exports.TimelineAggregate = TimelineAggregate;
//# sourceMappingURL=timeline-service.js.map