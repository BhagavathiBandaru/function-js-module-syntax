"use strict";
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
exports.TimelineExtImpl = void 0;
/********************************************************************************
 * Copyright (C) 2019 Red Hat, Inc. and others.
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
var common_1 = require("../common");
var types_impl_1 = require("./types-impl");
var common_2 = require("../common");
var disposable_1 = require("@theia/core/lib/common/disposable");
var vscode_uri_1 = require("vscode-uri");
var cancellation_1 = require("@theia/core/lib/common/cancellation");
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// copied and modified from https://github.com/microsoft/theia/blob/afacd2bdfe7060f09df9b9139521718915949757/src/vs/workbench/api/common/extHostTimeline.ts
var TimelineExtImpl = /** @class */ (function () {
    function TimelineExtImpl(rpc, commands) {
        var _this = this;
        this.rpc = rpc;
        this.commands = commands;
        this.providers = new Map();
        this.itemsBySourceAndUriMap = new Map();
        this.proxy = rpc.getProxy(common_2.PLUGIN_RPC_CONTEXT.TIMELINE_MAIN);
        commands.registerArgumentProcessor({
            processArgument: function (arg) {
                var _a, _b, _c;
                if (!common_1.TimelineCommandArg.is(arg)) {
                    return arg;
                }
                else {
                    return (_c = (_a = _this.itemsBySourceAndUriMap.get(arg.source)) === null || _a === void 0 ? void 0 : _a.get((_b = arg.uri) === null || _b === void 0 ? void 0 : _b.toString())) === null || _c === void 0 ? void 0 : _c.get(arg.timelineHandle);
                }
            }
        });
    }
    TimelineExtImpl.prototype.$getTimeline = function (id, uri, options, internalOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var provider;
            return __generator(this, function (_a) {
                provider = this.providers.get(id);
                return [2 /*return*/, provider === null || provider === void 0 ? void 0 : provider.provideTimeline(vscode_uri_1.URI.revive(uri), options, internalOptions)];
            });
        });
    };
    TimelineExtImpl.prototype.registerTimelineProvider = function (plugin, scheme, provider) {
        var _this = this;
        var timelineDisposables = new disposable_1.DisposableCollection();
        var convertTimelineItem = this.convertTimelineItem(provider.id, timelineDisposables).bind(this);
        var disposable;
        if (provider.onDidChange) {
            disposable = types_impl_1.Disposable.from(provider.onDidChange(function (e) { return _this.proxy.$fireTimelineChanged(__assign(__assign({ uri: undefined, reset: true }, e), { id: provider.id })); }, this));
        }
        var itemsBySourceAndUriMap = this.itemsBySourceAndUriMap;
        return this.registerTimelineProviderCore(__assign(__assign({}, provider), { scheme: scheme, onDidChange: undefined, provideTimeline: function (uri, options, internalOptions) {
                return __awaiter(this, void 0, void 0, function () {
                    var items, result, convertItem;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (internalOptions === null || internalOptions === void 0 ? void 0 : internalOptions.resetCache) {
                                    timelineDisposables.dispose();
                                    items = itemsBySourceAndUriMap.get(provider.id);
                                    if (items) {
                                        items.clear();
                                    }
                                }
                                return [4 /*yield*/, provider.provideTimeline(uri, options, cancellation_1.CancellationToken.None)];
                            case 1:
                                result = _a.sent();
                                if (!result) {
                                    return [2 /*return*/, undefined];
                                }
                                convertItem = convertTimelineItem(uri, internalOptions);
                                return [2 /*return*/, __assign(__assign({}, result), { source: provider.id, items: result.items.map(convertItem) })];
                        }
                    });
                });
            },
            dispose: function () {
                var e_1, _a;
                try {
                    for (var _b = __values(itemsBySourceAndUriMap.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var sourceMap = _c.value;
                        var source = sourceMap.get(provider.id);
                        if (source) {
                            source.clear();
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
                if (disposable) {
                    disposable.dispose();
                }
                timelineDisposables.dispose();
            } }));
    };
    TimelineExtImpl.prototype.convertTimelineItem = function (source, disposables) {
        var _this = this;
        return function (uri, options) {
            var items;
            if (options === null || options === void 0 ? void 0 : options.cacheResults) {
                var itemsByUri = _this.itemsBySourceAndUriMap.get(source);
                if (itemsByUri === undefined) {
                    itemsByUri = new Map();
                    _this.itemsBySourceAndUriMap.set(source, itemsByUri);
                }
                var uriKey = getUriKey(uri);
                items = itemsByUri.get(uriKey);
                if (items === undefined) {
                    items = new Map();
                    itemsByUri.set(uriKey, items);
                }
            }
            return function (item) {
                var _a, _b;
                var iconPath = item.iconPath, props = __rest(item, ["iconPath"]);
                var handle = source + "|" + ((_a = item.id) !== null && _a !== void 0 ? _a : item.timestamp);
                if (items) {
                    items.set(handle, item);
                }
                return __assign(__assign({}, props), { uri: uri.toString(), id: (_b = props.id) !== null && _b !== void 0 ? _b : undefined, handle: handle, source: source, command: item.command ? _this.commands.converter.toSafeCommand(item.command, disposables) : undefined });
            };
        };
    };
    TimelineExtImpl.prototype.registerTimelineProviderCore = function (provider) {
        var _this = this;
        var existing = this.providers.get(provider.id);
        if (existing) {
            throw new Error("Timeline Provider " + provider.id + " already exists.");
        }
        this.proxy.$registerTimelineProvider({
            id: provider.id,
            label: provider.label,
            scheme: provider.scheme
        });
        this.providers.set(provider.id, provider);
        return types_impl_1.Disposable.create(function () {
            var e_2, _a;
            try {
                for (var _b = __values(_this.itemsBySourceAndUriMap.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var sourceMap = _c.value;
                    var items = sourceMap.get(provider.id);
                    if (items) {
                        items.clear();
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            _this.providers.delete(provider.id);
            _this.proxy.$unregisterTimelineProvider(provider.id);
            provider.dispose();
        });
    };
    return TimelineExtImpl;
}());
exports.TimelineExtImpl = TimelineExtImpl;
function getUriKey(uri) {
    return uri === null || uri === void 0 ? void 0 : uri.toString();
}
//# sourceMappingURL=timeline.js.map