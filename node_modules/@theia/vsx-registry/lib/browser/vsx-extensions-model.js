"use strict";
/********************************************************************************
 * Copyright (C) 2020 TypeFox and others.
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
exports.VSXExtensionsModel = void 0;
var inversify_1 = require("inversify");
var p_debounce_1 = require("p-debounce");
var showdown = require("showdown");
var sanitize = require("sanitize-html");
var event_1 = require("@theia/core/lib/common/event");
var cancellation_1 = require("@theia/core/lib/common/cancellation");
var vsx_registry_api_1 = require("../common/vsx-registry-api");
var hosted_plugin_1 = require("@theia/plugin-ext/lib/hosted/browser/hosted-plugin");
var vsx_extension_1 = require("./vsx-extension");
var progress_service_1 = require("@theia/core/lib/common/progress-service");
var vsx_extensions_search_model_1 = require("./vsx-extensions-search-model");
var promise_util_1 = require("@theia/core/lib/common/promise-util");
var VSXExtensionsModel = /** @class */ (function () {
    function VSXExtensionsModel() {
        var _this = this;
        this.onDidChangeEmitter = new event_1.Emitter();
        this.onDidChange = this.onDidChangeEmitter.event;
        this.initialized = new promise_util_1.Deferred();
        /**
         * single source of all extensions
         */
        this.extensions = new Map();
        this._installed = new Set();
        this._searchResult = new Set();
        this.searchCancellationTokenSource = new cancellation_1.CancellationTokenSource();
        this.updateSearchResult = p_debounce_1.default(function () {
            _this.searchCancellationTokenSource.cancel();
            _this.searchCancellationTokenSource = new cancellation_1.CancellationTokenSource();
            var query = _this.search.query;
            return _this.doUpdateSearchResult({ query: query, includeAllVersions: true }, _this.searchCancellationTokenSource.token);
        }, 150);
    }
    VSXExtensionsModel.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            this.initInstalled(),
                            this.initSearchResult()
                        ])];
                    case 1:
                        _a.sent();
                        this.initialized.resolve();
                        return [2 /*return*/];
                }
            });
        });
    };
    VSXExtensionsModel.prototype.initInstalled = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pluginSupport.willStart];
                    case 1:
                        _a.sent();
                        this.pluginSupport.onDidChangePlugins(function () { return _this.updateInstalled(); });
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.updateInstalled()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    VSXExtensionsModel.prototype.initSearchResult = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.search.onDidChangeQuery(function () { return _this.updateSearchResult(); });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.updateSearchResult()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        console.error(e_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(VSXExtensionsModel.prototype, "installed", {
        get: function () {
            return this._installed.values();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VSXExtensionsModel.prototype, "searchResult", {
        get: function () {
            return this._searchResult.values();
        },
        enumerable: false,
        configurable: true
    });
    VSXExtensionsModel.prototype.getExtension = function (id) {
        return this.extensions.get(id);
    };
    VSXExtensionsModel.prototype.setExtension = function (id) {
        var extension = this.extensions.get(id);
        if (!extension) {
            extension = this.extensionFactory({ id: id });
            this.extensions.set(id, extension);
        }
        return extension;
    };
    VSXExtensionsModel.prototype.doChange = function (task, token) {
        var _this = this;
        if (token === void 0) { token = cancellation_1.CancellationToken.None; }
        return this.progressService.withProgress('', 'extensions', function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (token && token.isCancellationRequested) {
                            return [2 /*return*/, undefined];
                        }
                        return [4 /*yield*/, task()];
                    case 1:
                        result = _a.sent();
                        if (token && token.isCancellationRequested) {
                            return [2 /*return*/, undefined];
                        }
                        this.onDidChangeEmitter.fire(undefined);
                        return [2 /*return*/, result];
                }
            });
        }); });
    };
    VSXExtensionsModel.prototype.doUpdateSearchResult = function (param, token) {
        var _this = this;
        return this.doChange(function () { return __awaiter(_this, void 0, void 0, function () {
            var result, searchResult, _a, _b, data, id, extension;
            var e_3, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.api.search(param)];
                    case 1:
                        result = _d.sent();
                        if (token.isCancellationRequested) {
                            return [2 /*return*/];
                        }
                        searchResult = new Set();
                        try {
                            for (_a = __values(result.extensions), _b = _a.next(); !_b.done; _b = _a.next()) {
                                data = _b.value;
                                id = data.namespace.toLowerCase() + '.' + data.name.toLowerCase();
                                extension = this.api.getLatestCompatibleVersion(data.allVersions);
                                if (!extension) {
                                    continue;
                                }
                                this.setExtension(id).update(Object.assign(data, {
                                    publisher: data.namespace,
                                    downloadUrl: data.files.download,
                                    iconUrl: data.files.icon,
                                    readmeUrl: data.files.readme,
                                    licenseUrl: data.files.license,
                                    version: extension.version
                                }));
                                searchResult.add(id);
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                        this._searchResult = searchResult;
                        return [2 /*return*/];
                }
            });
        }); }, token);
    };
    VSXExtensionsModel.prototype.updateInstalled = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.doChange(function () { return __awaiter(_this, void 0, void 0, function () {
                        var plugins, installed, refreshing, plugins_1, plugins_1_1, plugin, id, extension, _a, _b, id, installedSorted;
                        var e_4, _c, e_5, _d;
                        var _this = this;
                        return __generator(this, function (_e) {
                            plugins = this.pluginSupport.plugins;
                            installed = new Set();
                            refreshing = [];
                            try {
                                for (plugins_1 = __values(plugins), plugins_1_1 = plugins_1.next(); !plugins_1_1.done; plugins_1_1 = plugins_1.next()) {
                                    plugin = plugins_1_1.value;
                                    if (plugin.model.engine.type === 'vscode') {
                                        id = plugin.model.id;
                                        this._installed.delete(id);
                                        extension = this.setExtension(id);
                                        installed.add(extension.id);
                                        refreshing.push(this.refresh(id));
                                    }
                                }
                            }
                            catch (e_4_1) { e_4 = { error: e_4_1 }; }
                            finally {
                                try {
                                    if (plugins_1_1 && !plugins_1_1.done && (_c = plugins_1.return)) _c.call(plugins_1);
                                }
                                finally { if (e_4) throw e_4.error; }
                            }
                            try {
                                for (_a = __values(this._installed), _b = _a.next(); !_b.done; _b = _a.next()) {
                                    id = _b.value;
                                    refreshing.push(this.refresh(id));
                                }
                            }
                            catch (e_5_1) { e_5 = { error: e_5_1 }; }
                            finally {
                                try {
                                    if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                                }
                                finally { if (e_5) throw e_5.error; }
                            }
                            Promise.all(refreshing);
                            installedSorted = Array.from(installed).sort(function (a, b) { return _this.compareExtensions(a, b); });
                            this._installed = new Set(installedSorted.values());
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    VSXExtensionsModel.prototype.resolve = function (id) {
        var _this = this;
        return this.doChange(function () { return __awaiter(_this, void 0, void 0, function () {
            var extension, rawReadme, readme, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initialized.promise];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.refresh(id)];
                    case 2:
                        extension = _a.sent();
                        if (!extension) {
                            throw new Error("Failed to resolve " + id + " extension.");
                        }
                        if (!extension.readmeUrl) return [3 /*break*/, 6];
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.api.fetchText(extension.readmeUrl)];
                    case 4:
                        rawReadme = _a.sent();
                        readme = this.compileReadme(rawReadme);
                        extension.update({ readme: readme });
                        return [3 /*break*/, 6];
                    case 5:
                        e_6 = _a.sent();
                        if (!vsx_registry_api_1.VSXResponseError.is(e_6) || e_6.statusCode !== 404) {
                            console.error("[" + id + "]: failed to compile readme, reason:", e_6);
                        }
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/, extension];
                }
            });
        }); });
    };
    VSXExtensionsModel.prototype.compileReadme = function (readmeMarkdown) {
        var markdownConverter = new showdown.Converter({
            noHeaderId: true,
            strikethrough: true,
            headerLevelStart: 2
        });
        var readmeHtml = markdownConverter.makeHtml(readmeMarkdown);
        return sanitize(readmeHtml, {
            allowedTags: sanitize.defaults.allowedTags.concat(['h1', 'h2', 'img'])
        });
    };
    VSXExtensionsModel.prototype.refresh = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var data, extension, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.api.getLatestCompatibleExtensionVersion(id)];
                    case 1:
                        data = _a.sent();
                        if (!data) {
                            return [2 /*return*/];
                        }
                        if (data.error) {
                            return [2 /*return*/, this.onDidFailRefresh(id, data.error)];
                        }
                        extension = this.setExtension(id);
                        extension.update(Object.assign(data, {
                            publisher: data.namespace,
                            downloadUrl: data.files.download,
                            iconUrl: data.files.icon,
                            readmeUrl: data.files.readme,
                            licenseUrl: data.files.license,
                            version: data.version
                        }));
                        return [2 /*return*/, extension];
                    case 2:
                        e_7 = _a.sent();
                        return [2 /*return*/, this.onDidFailRefresh(id, e_7)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    VSXExtensionsModel.prototype.onDidFailRefresh = function (id, error) {
        var cached = this.getExtension(id);
        if (cached && cached.installed) {
            return cached;
        }
        console.error("[" + id + "]: failed to refresh, reason:", error);
        return undefined;
    };
    /**
     * Compare two extensions based on their display name, and publisher if applicable.
     * @param a the first extension id for comparison.
     * @param b the second extension id for comparison.
     */
    VSXExtensionsModel.prototype.compareExtensions = function (a, b) {
        var extensionA = this.getExtension(a);
        var extensionB = this.getExtension(b);
        if (!extensionA || !extensionB) {
            return 0;
        }
        if (extensionA.displayName && extensionB.displayName) {
            return extensionA.displayName.localeCompare(extensionB.displayName);
        }
        if (extensionA.publisher && extensionB.publisher) {
            return extensionA.publisher.localeCompare(extensionB.publisher);
        }
        return 0;
    };
    __decorate([
        inversify_1.inject(vsx_registry_api_1.VSXRegistryAPI),
        __metadata("design:type", vsx_registry_api_1.VSXRegistryAPI)
    ], VSXExtensionsModel.prototype, "api", void 0);
    __decorate([
        inversify_1.inject(hosted_plugin_1.HostedPluginSupport),
        __metadata("design:type", hosted_plugin_1.HostedPluginSupport)
    ], VSXExtensionsModel.prototype, "pluginSupport", void 0);
    __decorate([
        inversify_1.inject(vsx_extension_1.VSXExtensionFactory),
        __metadata("design:type", Function)
    ], VSXExtensionsModel.prototype, "extensionFactory", void 0);
    __decorate([
        inversify_1.inject(progress_service_1.ProgressService),
        __metadata("design:type", progress_service_1.ProgressService)
    ], VSXExtensionsModel.prototype, "progressService", void 0);
    __decorate([
        inversify_1.inject(vsx_extensions_search_model_1.VSXExtensionsSearchModel),
        __metadata("design:type", vsx_extensions_search_model_1.VSXExtensionsSearchModel)
    ], VSXExtensionsModel.prototype, "search", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], VSXExtensionsModel.prototype, "init", null);
    VSXExtensionsModel = __decorate([
        inversify_1.injectable()
    ], VSXExtensionsModel);
    return VSXExtensionsModel;
}());
exports.VSXExtensionsModel = VSXExtensionsModel;
//# sourceMappingURL=vsx-extensions-model.js.map