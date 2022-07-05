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
exports.VSXRegistryAPI = exports.VSXResponseError = void 0;
var bent = require("bent");
var semver = require("semver");
var inversify_1 = require("inversify");
var vsx_environment_1 = require("./vsx-environment");
var vsx_api_version_provider_1 = require("./vsx-api-version-provider");
var fetchText = bent('GET', 'string', 200);
var fetchJson = bent('GET', {
    'Accept': 'application/json'
}, 'json', 200);
var postJson = bent('POST', {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}, 'json', 200);
var VSXResponseError;
(function (VSXResponseError) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function is(error) {
        return !!error && typeof error === 'object'
            && 'statusCode' in error && typeof error['statusCode'] === 'number';
    }
    VSXResponseError.is = is;
})(VSXResponseError = exports.VSXResponseError || (exports.VSXResponseError = {}));
/**
 * Namespace reserved for vscode builtin extensions.
 */
var VSCODE_NAMESPACE = 'vscode';
var VSXRegistryAPI = /** @class */ (function () {
    function VSXRegistryAPI() {
    }
    VSXRegistryAPI.prototype.search = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            var searchUri;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.buildSearchUri(param)];
                    case 1:
                        searchUri = _a.sent();
                        return [2 /*return*/, this.fetchJson(searchUri)];
                }
            });
        });
    };
    VSXRegistryAPI.prototype.buildSearchUri = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            var apiUri, searchUri, query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.environment.getRegistryApiUri()];
                    case 1:
                        apiUri = _a.sent();
                        searchUri = apiUri.resolve('-/search').toString();
                        if (param) {
                            query = [];
                            if (param.query) {
                                query.push('query=' + encodeURIComponent(param.query));
                            }
                            if (param.category) {
                                query.push('category=' + encodeURIComponent(param.category));
                            }
                            if (param.size) {
                                query.push('size=' + param.size);
                            }
                            if (param.offset) {
                                query.push('offset=' + param.offset);
                            }
                            if (param.sortOrder) {
                                query.push('sortOrder=' + encodeURIComponent(param.sortOrder));
                            }
                            if (param.sortBy) {
                                query.push('sortBy=' + encodeURIComponent(param.sortBy));
                            }
                            if (param.includeAllVersions) {
                                query.push('includeAllVersions=' + param.includeAllVersions);
                            }
                            if (query.length > 0) {
                                searchUri += '?' + query.join('&');
                            }
                        }
                        return [2 /*return*/, searchUri];
                }
            });
        });
    };
    VSXRegistryAPI.prototype.getExtension = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var apiUri, param, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.environment.getRegistryApiUri()];
                    case 1:
                        apiUri = _a.sent();
                        param = {
                            extensionId: id
                        };
                        return [4 /*yield*/, this.postJson(apiUri.resolve('-/query').toString(), param)];
                    case 2:
                        result = _a.sent();
                        if (result.extensions && result.extensions.length > 0) {
                            return [2 /*return*/, result.extensions[0]];
                        }
                        throw new Error("Extension with id " + id + " not found at " + apiUri);
                }
            });
        });
    };
    /**
     * Get all versions of the given extension.
     * @param id the requested extension id.
     */
    VSXRegistryAPI.prototype.getAllVersions = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var apiUri, param, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.environment.getRegistryApiUri()];
                    case 1:
                        apiUri = _a.sent();
                        param = {
                            extensionId: id,
                            includeAllVersions: true,
                        };
                        return [4 /*yield*/, this.postJson(apiUri.resolve('-/query').toString(), param)];
                    case 2:
                        result = _a.sent();
                        if (result.extensions && result.extensions.length > 0) {
                            return [2 /*return*/, result.extensions];
                        }
                        throw new Error("Extension with id " + id + " not found at " + apiUri);
                }
            });
        });
    };
    VSXRegistryAPI.prototype.fetchJson = function (url) {
        return fetchJson(url);
    };
    VSXRegistryAPI.prototype.postJson = function (url, payload) {
        return postJson(url, JSON.stringify(payload));
    };
    VSXRegistryAPI.prototype.fetchText = function (url) {
        return fetchText(url);
    };
    /**
     * Get the latest compatible extension version.
     * - an extension satisfies compatibility if its `engines.vscode` version is supported.
     * @param id the extension id.
     *
     * @returns the data for the latest compatible extension version if available, else `undefined`.
     */
    VSXRegistryAPI.prototype.getLatestCompatibleExtensionVersion = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var extensions, i, extension;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAllVersions(id)];
                    case 1:
                        extensions = _a.sent();
                        for (i = 0; i < extensions.length; i++) {
                            extension = extensions[i];
                            // Skip vscode builtin extensions.
                            if (extension.namespace === VSCODE_NAMESPACE) {
                                return [2 /*return*/, extension];
                            }
                            else if (extension.engines && this.isEngineSupported(extension.engines.vscode)) {
                                return [2 /*return*/, extension];
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get the latest compatible version of an extension.
     * @param versions the `allVersions` property.
     *
     * @returns the latest compatible version of an extension if it exists, else `undefined`.
     */
    VSXRegistryAPI.prototype.getLatestCompatibleVersion = function (versions) {
        var e_1, _a;
        var _b;
        try {
            for (var versions_1 = __values(versions), versions_1_1 = versions_1.next(); !versions_1_1.done; versions_1_1 = versions_1.next()) {
                var version = versions_1_1.value;
                if (this.isEngineSupported((_b = version.engines) === null || _b === void 0 ? void 0 : _b.vscode)) {
                    return version;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (versions_1_1 && !versions_1_1.done && (_a = versions_1.return)) _a.call(versions_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    /**
     * Determine if the engine is supported by the application.
     * @param engine the engine.
     *
     * @returns `true` if the engine satisfies the API version.
     */
    VSXRegistryAPI.prototype.isEngineSupported = function (engine) {
        if (!engine) {
            return false;
        }
        // Determine engine compatibility.
        if (engine === '*') {
            return true;
        }
        else {
            var apiVersion = this.apiVersionProvider.getApiVersion();
            return semver.satisfies(apiVersion, engine);
        }
    };
    __decorate([
        inversify_1.inject(vsx_api_version_provider_1.VSXApiVersionProvider),
        __metadata("design:type", Object)
    ], VSXRegistryAPI.prototype, "apiVersionProvider", void 0);
    __decorate([
        inversify_1.inject(vsx_environment_1.VSXEnvironment),
        __metadata("design:type", vsx_environment_1.VSXEnvironment)
    ], VSXRegistryAPI.prototype, "environment", void 0);
    VSXRegistryAPI = __decorate([
        inversify_1.injectable()
    ], VSXRegistryAPI);
    return VSXRegistryAPI;
}());
exports.VSXRegistryAPI = VSXRegistryAPI;
//# sourceMappingURL=vsx-registry-api.js.map