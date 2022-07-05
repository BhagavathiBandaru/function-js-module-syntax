"use strict";
/********************************************************************************
 * Copyright (C) 2018 TypeFox and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SvgHandler = exports.PdfHandler = exports.ImageHandler = exports.HtmlHandler = exports.MiniBrowserEndpoint = exports.MiniBrowserEndpointHandler = void 0;
var vhost = require('vhost');
var express = require("express");
var fs = require("fs-extra");
var mime_types_1 = require("mime-types");
var inversify_1 = require("inversify");
var file_uri_1 = require("@theia/core/lib/node/file-uri");
var logger_1 = require("@theia/core/lib/common/logger");
var contribution_provider_1 = require("@theia/core/lib/common/contribution-provider");
var mini_browser_endpoint_1 = require("../common/mini-browser-endpoint");
/**
 * Endpoint handler contribution for the `MiniBrowserEndpoint`.
 */
exports.MiniBrowserEndpointHandler = Symbol('MiniBrowserEndpointHandler');
var MiniBrowserEndpoint = /** @class */ (function () {
    function MiniBrowserEndpoint() {
        this.handlers = new Map();
    }
    MiniBrowserEndpoint.prototype.configure = function (app) {
        this.attachRequestHandlerPromise = this.attachRequestHandler(app);
    };
    MiniBrowserEndpoint.prototype.onStart = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(Array.from(this.getContributions(), function (handler) { return __awaiter(_this, void 0, void 0, function () {
                            var extensions, _a, _b, extension, existingHandler;
                            var e_1, _c;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0: return [4 /*yield*/, handler.supportedExtensions()];
                                    case 1:
                                        extensions = _d.sent();
                                        try {
                                            for (_a = __values((Array.isArray(extensions) ? extensions : [extensions]).map(function (e) { return e.toLocaleLowerCase(); })), _b = _a.next(); !_b.done; _b = _a.next()) {
                                                extension = _b.value;
                                                existingHandler = this.handlers.get(extension);
                                                if (!existingHandler || handler.priority > existingHandler.priority) {
                                                    this.handlers.set(extension, handler);
                                                }
                                            }
                                        }
                                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                                        finally {
                                            try {
                                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                                            }
                                            finally { if (e_1) throw e_1.error; }
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.attachRequestHandlerPromise];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MiniBrowserEndpoint.prototype.supportedFileExtensions = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Array.from(this.handlers.entries(), function (_a) {
                        var _b = __read(_a, 2), extension = _b[0], handler = _b[1];
                        return ({ extension: extension, priority: handler.priority() });
                    })];
            });
        });
    };
    MiniBrowserEndpoint.prototype.attachRequestHandler = function (app) {
        return __awaiter(this, void 0, void 0, function () {
            var miniBrowserApp, _a, _b, _c, _d;
            var _this = this;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        miniBrowserApp = express();
                        miniBrowserApp.get('*', function (request, response) { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _a = this.response;
                                    return [4 /*yield*/, this.getUri(request)];
                                case 1: return [2 /*return*/, _a.apply(this, [_b.sent(), response])];
                            }
                        }); }); });
                        _b = (_a = app).use;
                        _c = [mini_browser_endpoint_1.MiniBrowserEndpoint.PATH];
                        _d = vhost;
                        return [4 /*yield*/, this.getVirtualHostRegExp()];
                    case 1:
                        _b.apply(_a, _c.concat([_d.apply(void 0, [_e.sent(), miniBrowserApp])]));
                        return [2 /*return*/];
                }
            });
        });
    };
    MiniBrowserEndpoint.prototype.response = function (uri, response) {
        return __awaiter(this, void 0, void 0, function () {
            var exists, statWithContent, extension, handler;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs.pathExists(file_uri_1.FileUri.fsPath(uri))];
                    case 1:
                        exists = _a.sent();
                        if (!exists) {
                            return [2 /*return*/, this.missingResourceHandler()(uri, response)];
                        }
                        return [4 /*yield*/, this.readContent(uri)];
                    case 2:
                        statWithContent = _a.sent();
                        try {
                            if (!statWithContent.stat.isDirectory()) {
                                extension = uri.split('.').pop();
                                if (!extension) {
                                    return [2 /*return*/, this.defaultHandler()(statWithContent, response)];
                                }
                                handler = this.handlers.get(extension.toString().toLocaleLowerCase());
                                if (!handler) {
                                    return [2 /*return*/, this.defaultHandler()(statWithContent, response)];
                                }
                                return [2 /*return*/, handler.respond(statWithContent, response)];
                            }
                        }
                        catch (e) {
                            return [2 /*return*/, this.errorHandler()(e, uri, response)];
                        }
                        return [2 /*return*/, this.defaultHandler()(statWithContent, response)];
                }
            });
        });
    };
    MiniBrowserEndpoint.prototype.getContributions = function () {
        return this.contributions.getContributions();
    };
    MiniBrowserEndpoint.prototype.getUri = function (request) {
        return file_uri_1.FileUri.create(request.path).toString(true);
    };
    MiniBrowserEndpoint.prototype.readContent = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var fsPath, _a, stat, content;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        fsPath = file_uri_1.FileUri.fsPath(uri);
                        return [4 /*yield*/, Promise.all([fs.stat(fsPath), fs.readFile(fsPath, 'utf8')])];
                    case 1:
                        _a = __read.apply(void 0, [_b.sent(), 2]), stat = _a[0], content = _a[1];
                        return [2 /*return*/, { stat: Object.assign(stat, { uri: uri }), content: content }];
                }
            });
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MiniBrowserEndpoint.prototype.errorHandler = function () {
        var _this = this;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return function (error, uri, response) { return __awaiter(_this, void 0, void 0, function () {
            var details, message;
            return __generator(this, function (_a) {
                details = error.toString ? error.toString() : error;
                this.logger.error("Error occurred while handling request for " + uri + ". Details: " + details);
                if (error instanceof Error) {
                    message = error.message;
                    if (error.stack) {
                        message += "\n" + error.stack;
                    }
                    this.logger.error(message);
                }
                else if (typeof error === 'string') {
                    this.logger.error(error);
                }
                else {
                    this.logger.error("" + error);
                }
                return [2 /*return*/, response.send(500)];
            });
        }); };
    };
    MiniBrowserEndpoint.prototype.missingResourceHandler = function () {
        var _this = this;
        return function (uri, response) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.logger.error("Cannot handle missing resource. URI: " + uri + ".");
                return [2 /*return*/, response.sendStatus(404)];
            });
        }); };
    };
    MiniBrowserEndpoint.prototype.defaultHandler = function () {
        var _this = this;
        return function (statWithContent, response) { return __awaiter(_this, void 0, void 0, function () {
            var content, mimeType;
            return __generator(this, function (_a) {
                content = statWithContent.content;
                mimeType = mime_types_1.lookup(file_uri_1.FileUri.fsPath(statWithContent.stat.uri));
                if (!mimeType) {
                    this.logger.warn("Cannot handle unexpected resource. URI: " + statWithContent.stat.uri + ".");
                    response.contentType('application/octet-stream');
                }
                else {
                    response.contentType(mimeType);
                }
                return [2 /*return*/, response.send(content)];
            });
        }); };
    };
    MiniBrowserEndpoint.prototype.getVirtualHostRegExp = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pattern, vhostRe;
            return __generator(this, function (_a) {
                pattern = process.env[mini_browser_endpoint_1.MiniBrowserEndpoint.HOST_PATTERN_ENV] || mini_browser_endpoint_1.MiniBrowserEndpoint.HOST_PATTERN_DEFAULT;
                vhostRe = pattern
                    .replace(/\./g, '\\.')
                    .replace('{{uuid}}', '.+')
                    .replace('{{hostname}}', '.+');
                return [2 /*return*/, new RegExp(vhostRe, 'i')];
            });
        });
    };
    /**
     * Endpoint path to handle the request for the given resource.
     *
     * @deprecated since 1.8.0
     */
    MiniBrowserEndpoint.HANDLE_PATH = '/mini-browser/';
    __decorate([
        inversify_1.inject(logger_1.ILogger),
        __metadata("design:type", Object)
    ], MiniBrowserEndpoint.prototype, "logger", void 0);
    __decorate([
        inversify_1.inject(contribution_provider_1.ContributionProvider),
        inversify_1.named(exports.MiniBrowserEndpointHandler),
        __metadata("design:type", Object)
    ], MiniBrowserEndpoint.prototype, "contributions", void 0);
    MiniBrowserEndpoint = __decorate([
        inversify_1.injectable()
    ], MiniBrowserEndpoint);
    return MiniBrowserEndpoint;
}());
exports.MiniBrowserEndpoint = MiniBrowserEndpoint;
// See `EditorManager#canHandle`.
var CODE_EDITOR_PRIORITY = 100;
/**
 * Endpoint handler contribution for HTML files.
 */
var HtmlHandler = /** @class */ (function () {
    function HtmlHandler() {
    }
    HtmlHandler.prototype.supportedExtensions = function () {
        return ['html', 'xhtml', 'htm'];
    };
    HtmlHandler.prototype.priority = function () {
        // Prefer Code Editor over Mini Browser
        // https://github.com/eclipse-theia/theia/issues/2051
        return 1;
    };
    HtmlHandler.prototype.respond = function (statWithContent, response) {
        response.contentType('text/html');
        return response.send(statWithContent.content);
    };
    HtmlHandler = __decorate([
        inversify_1.injectable()
    ], HtmlHandler);
    return HtmlHandler;
}());
exports.HtmlHandler = HtmlHandler;
/**
 * Handler for JPG resources.
 */
var ImageHandler = /** @class */ (function () {
    function ImageHandler() {
    }
    ImageHandler.prototype.supportedExtensions = function () {
        return ['jpg', 'jpeg', 'png', 'bmp', 'gif'];
    };
    ImageHandler.prototype.priority = function () {
        return CODE_EDITOR_PRIORITY + 1;
    };
    ImageHandler.prototype.respond = function (statWithContent, response) {
        fs.readFile(file_uri_1.FileUri.fsPath(statWithContent.stat.uri), function (error, data) {
            if (error) {
                throw error;
            }
            response.contentType('image/jpeg');
            response.send(data);
        });
        return response;
    };
    ImageHandler = __decorate([
        inversify_1.injectable()
    ], ImageHandler);
    return ImageHandler;
}());
exports.ImageHandler = ImageHandler;
/**
 * PDF endpoint handler.
 */
var PdfHandler = /** @class */ (function () {
    function PdfHandler() {
    }
    PdfHandler.prototype.supportedExtensions = function () {
        return 'pdf';
    };
    PdfHandler.prototype.priority = function () {
        return CODE_EDITOR_PRIORITY + 1;
    };
    PdfHandler.prototype.respond = function (statWithContent, response) {
        // https://stackoverflow.com/questions/11598274/display-pdf-in-browser-using-express-js
        var encodeRFC5987ValueChars = function (input) {
            return encodeURIComponent(input).
                // Note that although RFC3986 reserves "!", RFC5987 does not, so we do not need to escape it.
                replace(/['()]/g, escape). // i.e., %27 %28 %29
                replace(/\*/g, '%2A').
                // The following are not required for percent-encoding per RFC5987, so we can allow for a little better readability over the wire: |`^.
                replace(/%(?:7C|60|5E)/g, unescape);
        };
        var fileName = file_uri_1.FileUri.create(statWithContent.stat.uri).path.base;
        fs.readFile(file_uri_1.FileUri.fsPath(statWithContent.stat.uri), function (error, data) {
            if (error) {
                throw error;
            }
            // Change `inline` to `attachment` if you would like to force downloading the PDF instead of previewing in the browser.
            response.setHeader('Content-disposition', "inline; filename*=UTF-8''" + encodeRFC5987ValueChars(fileName));
            response.contentType('application/pdf');
            response.send(data);
        });
        return response;
    };
    PdfHandler = __decorate([
        inversify_1.injectable()
    ], PdfHandler);
    return PdfHandler;
}());
exports.PdfHandler = PdfHandler;
/**
 * Endpoint contribution for SVG resources.
 */
var SvgHandler = /** @class */ (function () {
    function SvgHandler() {
    }
    SvgHandler.prototype.supportedExtensions = function () {
        return 'svg';
    };
    SvgHandler.prototype.priority = function () {
        return 1;
    };
    SvgHandler.prototype.respond = function (statWithContent, response) {
        response.contentType('image/svg+xml');
        return response.send(statWithContent.content);
    };
    SvgHandler = __decorate([
        inversify_1.injectable()
    ], SvgHandler);
    return SvgHandler;
}());
exports.SvgHandler = SvgHandler;
//# sourceMappingURL=mini-browser-endpoint.js.map