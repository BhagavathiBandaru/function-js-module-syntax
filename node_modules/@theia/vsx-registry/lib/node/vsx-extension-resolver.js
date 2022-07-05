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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VSXExtensionResolver = void 0;
var os = require("os");
var path = require("path");
var fs = require("fs-extra");
var uuid_1 = require("uuid");
var requestretry = require("requestretry");
var inversify_1 = require("inversify");
var uri_1 = require("@theia/core/lib/common/uri");
var vsx_extension_uri_1 = require("../common/vsx-extension-uri");
var vsx_registry_api_1 = require("../common/vsx-registry-api");
var VSXExtensionResolver = /** @class */ (function () {
    function VSXExtensionResolver() {
        this.downloadPath = path.resolve(os.tmpdir(), uuid_1.v4());
        fs.ensureDirSync(this.downloadPath);
        fs.emptyDirSync(this.downloadPath);
    }
    VSXExtensionResolver.prototype.accept = function (pluginId) {
        return !!vsx_extension_uri_1.VSXExtensionUri.toId(new uri_1.default(pluginId));
    };
    VSXExtensionResolver.prototype.resolve = function (context) {
        return __awaiter(this, void 0, void 0, function () {
            var id, extension, resolvedId, downloadUrl, extensionPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = vsx_extension_uri_1.VSXExtensionUri.toId(new uri_1.default(context.getOriginId()));
                        if (!id) {
                            return [2 /*return*/];
                        }
                        console.log("[" + id + "]: trying to resolve latest version...");
                        return [4 /*yield*/, this.api.getLatestCompatibleExtensionVersion(id)];
                    case 1:
                        extension = _a.sent();
                        if (!extension) {
                            return [2 /*return*/];
                        }
                        if (extension.error) {
                            throw new Error(extension.error);
                        }
                        resolvedId = id + '-' + extension.version;
                        downloadUrl = extension.files.download;
                        console.log("[" + id + "]: resolved to '" + resolvedId + "'");
                        extensionPath = path.resolve(this.downloadPath, path.basename(downloadUrl));
                        console.log("[" + resolvedId + "]: trying to download from \"" + downloadUrl + "\"...");
                        return [4 /*yield*/, this.download(downloadUrl, extensionPath)];
                    case 2:
                        if (!(_a.sent())) {
                            console.log("[" + resolvedId + "]: not found");
                            return [2 /*return*/];
                        }
                        console.log("[" + resolvedId + "]: downloaded to " + extensionPath + "\"");
                        context.addPlugin(resolvedId, extensionPath);
                        return [2 /*return*/];
                }
            });
        });
    };
    VSXExtensionResolver.prototype.download = function (downloadUrl, downloadPath) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        requestretry(downloadUrl, {
                            method: 'GET',
                            maxAttempts: 5,
                            retryDelay: 2000,
                            retryStrategy: requestretry.RetryStrategies.HTTPOrNetworkError
                        }, function (err, response) {
                            if (err) {
                                reject(err);
                            }
                            else if (response && response.statusCode === 404) {
                                resolve(false);
                            }
                            else if (response && response.statusCode !== 200) {
                                reject(new Error(response.statusMessage));
                            }
                        }).pipe(fs.createWriteStream(downloadPath))
                            .on('error', reject)
                            .on('close', function () { return resolve(true); });
                    })];
            });
        });
    };
    __decorate([
        inversify_1.inject(vsx_registry_api_1.VSXRegistryAPI),
        __metadata("design:type", vsx_registry_api_1.VSXRegistryAPI)
    ], VSXExtensionResolver.prototype, "api", void 0);
    VSXExtensionResolver = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], VSXExtensionResolver);
    return VSXExtensionResolver;
}());
exports.VSXExtensionResolver = VSXExtensionResolver;
//# sourceMappingURL=vsx-extension-resolver.js.map