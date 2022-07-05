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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.VSXExtensionEditorComponent = exports.VSXExtensionComponent = exports.AbstractVSXExtensionComponent = exports.VSXExtension = exports.VSXExtensionFactory = exports.VSXExtensionOptions = exports.VSXExtensionData = void 0;
var React = require("react");
var inversify_1 = require("inversify");
var uri_1 = require("@theia/core/lib/common/uri");
var opener_service_1 = require("@theia/core/lib/browser/opener-service");
var hosted_plugin_1 = require("@theia/plugin-ext/lib/hosted/browser/hosted-plugin");
var plugin_protocol_1 = require("@theia/plugin-ext/lib/common/plugin-protocol");
var vsx_extension_uri_1 = require("../common/vsx-extension-uri");
var progress_service_1 = require("@theia/core/lib/common/progress-service");
var endpoint_1 = require("@theia/core/lib/browser/endpoint");
var vsx_environment_1 = require("../common/vsx-environment");
var vsx_extensions_search_model_1 = require("./vsx-extensions-search-model");
var VSXExtensionData = /** @class */ (function () {
    function VSXExtensionData() {
    }
    VSXExtensionData.KEYS = new Set([
        'version',
        'iconUrl',
        'publisher',
        'name',
        'displayName',
        'description',
        'averageRating',
        'downloadCount',
        'readmeUrl',
        'licenseUrl',
        'repository',
        'license',
        'readme',
        'preview',
        'namespaceAccess',
        'publishedBy'
    ]);
    VSXExtensionData = __decorate([
        inversify_1.injectable()
    ], VSXExtensionData);
    return VSXExtensionData;
}());
exports.VSXExtensionData = VSXExtensionData;
var VSXExtensionOptions = /** @class */ (function () {
    function VSXExtensionOptions() {
    }
    VSXExtensionOptions = __decorate([
        inversify_1.injectable()
    ], VSXExtensionOptions);
    return VSXExtensionOptions;
}());
exports.VSXExtensionOptions = VSXExtensionOptions;
exports.VSXExtensionFactory = Symbol('VSXExtensionFactory');
var VSXExtension = /** @class */ (function () {
    function VSXExtension() {
        this.data = {};
        this._busy = 0;
    }
    Object.defineProperty(VSXExtension.prototype, "uri", {
        get: function () {
            return vsx_extension_uri_1.VSXExtensionUri.toUri(this.id);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VSXExtension.prototype, "id", {
        get: function () {
            return this.options.id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VSXExtension.prototype, "visible", {
        get: function () {
            return !!this.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VSXExtension.prototype, "plugin", {
        get: function () {
            return this.pluginSupport.getPlugin(this.id);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VSXExtension.prototype, "installed", {
        get: function () {
            return !!this.plugin;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VSXExtension.prototype, "builtin", {
        get: function () {
            var plugin = this.plugin;
            var type = plugin && plugin.type;
            return type === plugin_protocol_1.PluginType.System;
        },
        enumerable: false,
        configurable: true
    });
    VSXExtension.prototype.update = function (data) {
        var e_1, _a, _b;
        try {
            for (var _c = __values(VSXExtensionData.KEYS), _d = _c.next(); !_d.done; _d = _c.next()) {
                var key = _d.value;
                if (key in data) {
                    Object.assign(this.data, (_b = {}, _b[key] = data[key], _b));
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    VSXExtension.prototype.getData = function (key) {
        var plugin = this.plugin;
        var model = plugin && plugin.metadata.model;
        if (model && key in model) {
            return model[key];
        }
        return this.data[key];
    };
    Object.defineProperty(VSXExtension.prototype, "iconUrl", {
        get: function () {
            var plugin = this.plugin;
            var iconUrl = plugin && plugin.metadata.model.iconUrl;
            if (iconUrl) {
                return new endpoint_1.Endpoint({ path: iconUrl }).getRestUrl().toString();
            }
            return this.data['iconUrl'];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VSXExtension.prototype, "publisher", {
        get: function () {
            return this.getData('publisher');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VSXExtension.prototype, "name", {
        get: function () {
            return this.getData('name');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VSXExtension.prototype, "displayName", {
        get: function () {
            return this.getData('displayName') || this.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VSXExtension.prototype, "description", {
        get: function () {
            return this.getData('description');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VSXExtension.prototype, "version", {
        get: function () {
            return this.getData('version');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VSXExtension.prototype, "averageRating", {
        get: function () {
            return this.getData('averageRating');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VSXExtension.prototype, "downloadCount", {
        get: function () {
            return this.getData('downloadCount');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VSXExtension.prototype, "readmeUrl", {
        get: function () {
            var plugin = this.plugin;
            var readmeUrl = plugin && plugin.metadata.model.readmeUrl;
            if (readmeUrl) {
                return new endpoint_1.Endpoint({ path: readmeUrl }).getRestUrl().toString();
            }
            return this.data['readmeUrl'];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VSXExtension.prototype, "licenseUrl", {
        get: function () {
            var licenseUrl = this.data['licenseUrl'];
            if (licenseUrl) {
                return licenseUrl;
            }
            else {
                var plugin = this.plugin;
                licenseUrl = plugin && plugin.metadata.model.licenseUrl;
                if (licenseUrl) {
                    return new endpoint_1.Endpoint({ path: licenseUrl }).getRestUrl().toString();
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VSXExtension.prototype, "repository", {
        get: function () {
            return this.getData('repository');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VSXExtension.prototype, "license", {
        get: function () {
            return this.getData('license');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VSXExtension.prototype, "readme", {
        get: function () {
            return this.getData('readme');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VSXExtension.prototype, "preview", {
        get: function () {
            return this.getData('preview');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VSXExtension.prototype, "namespaceAccess", {
        get: function () {
            return this.getData('namespaceAccess');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VSXExtension.prototype, "publishedBy", {
        get: function () {
            return this.getData('publishedBy');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VSXExtension.prototype, "busy", {
        get: function () {
            return !!this._busy;
        },
        enumerable: false,
        configurable: true
    });
    VSXExtension.prototype.install = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._busy++;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 4]);
                        return [4 /*yield*/, this.progressService.withProgress("\"Installing '" + this.id + "' extension...", 'extensions', function () {
                                return _this.pluginServer.deploy(_this.uri.toString());
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        this._busy--;
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    VSXExtension.prototype.uninstall = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._busy++;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 4]);
                        return [4 /*yield*/, this.progressService.withProgress("Uninstalling '" + this.id + "' extension...", 'extensions', function () {
                                return _this.pluginServer.undeploy(_this.id);
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        this._busy--;
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    VSXExtension.prototype.open = function (options) {
        if (options === void 0) { options = { mode: 'reveal' }; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.doOpen(this.uri, options)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    VSXExtension.prototype.doOpen = function (uri, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, opener_service_1.open(this.openerService, uri, options)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    VSXExtension.prototype.render = function () {
        return React.createElement(VSXExtensionComponent, { extension: this });
    };
    __decorate([
        inversify_1.inject(VSXExtensionOptions),
        __metadata("design:type", VSXExtensionOptions)
    ], VSXExtension.prototype, "options", void 0);
    __decorate([
        inversify_1.inject(opener_service_1.OpenerService),
        __metadata("design:type", Object)
    ], VSXExtension.prototype, "openerService", void 0);
    __decorate([
        inversify_1.inject(hosted_plugin_1.HostedPluginSupport),
        __metadata("design:type", hosted_plugin_1.HostedPluginSupport)
    ], VSXExtension.prototype, "pluginSupport", void 0);
    __decorate([
        inversify_1.inject(plugin_protocol_1.PluginServer),
        __metadata("design:type", Object)
    ], VSXExtension.prototype, "pluginServer", void 0);
    __decorate([
        inversify_1.inject(progress_service_1.ProgressService),
        __metadata("design:type", progress_service_1.ProgressService)
    ], VSXExtension.prototype, "progressService", void 0);
    __decorate([
        inversify_1.inject(vsx_environment_1.VSXEnvironment),
        __metadata("design:type", vsx_environment_1.VSXEnvironment)
    ], VSXExtension.prototype, "environment", void 0);
    __decorate([
        inversify_1.inject(vsx_extensions_search_model_1.VSXExtensionsSearchModel),
        __metadata("design:type", vsx_extensions_search_model_1.VSXExtensionsSearchModel)
    ], VSXExtension.prototype, "search", void 0);
    VSXExtension = __decorate([
        inversify_1.injectable()
    ], VSXExtension);
    return VSXExtension;
}());
exports.VSXExtension = VSXExtension;
var AbstractVSXExtensionComponent = /** @class */ (function (_super) {
    __extends(AbstractVSXExtensionComponent, _super);
    function AbstractVSXExtensionComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.install = function () { return __awaiter(_this, void 0, void 0, function () {
            var pending;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.forceUpdate();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 4]);
                        pending = this.props.extension.install();
                        this.forceUpdate();
                        return [4 /*yield*/, pending];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        this.forceUpdate();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        _this.uninstall = function () { return __awaiter(_this, void 0, void 0, function () {
            var pending;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, , 2, 3]);
                        pending = this.props.extension.uninstall();
                        this.forceUpdate();
                        return [4 /*yield*/, pending];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        this.forceUpdate();
                        return [7 /*endfinally*/];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    AbstractVSXExtensionComponent.prototype.renderAction = function () {
        var extension = this.props.extension;
        var builtin = extension.builtin, busy = extension.busy, installed = extension.installed;
        if (builtin) {
            return undefined;
        }
        if (busy) {
            if (installed) {
                return React.createElement("button", { className: "theia-button action theia-mod-disabled" }, "Uninstalling");
            }
            return React.createElement("button", { className: "theia-button action prominent theia-mod-disabled" }, "Installing");
        }
        if (installed) {
            return React.createElement("button", { className: "theia-button action", onClick: this.uninstall }, "Uninstall");
        }
        return React.createElement("button", { className: "theia-button prominent action", onClick: this.install }, "Install");
    };
    return AbstractVSXExtensionComponent;
}(React.Component));
exports.AbstractVSXExtensionComponent = AbstractVSXExtensionComponent;
var downloadFormatter = new Intl.NumberFormat();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var downloadCompactFormatter = new Intl.NumberFormat(undefined, { notation: 'compact', compactDisplay: 'short' });
var VSXExtensionComponent = /** @class */ (function (_super) {
    __extends(VSXExtensionComponent, _super);
    function VSXExtensionComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VSXExtensionComponent.prototype.render = function () {
        var _a = this.props.extension, iconUrl = _a.iconUrl, publisher = _a.publisher, displayName = _a.displayName, description = _a.description, version = _a.version, downloadCount = _a.downloadCount, averageRating = _a.averageRating;
        return React.createElement("div", { className: 'theia-vsx-extension' },
            iconUrl ?
                React.createElement("img", { className: 'theia-vsx-extension-icon', src: iconUrl }) :
                React.createElement("div", { className: 'theia-vsx-extension-icon placeholder' }),
            React.createElement("div", { className: 'theia-vsx-extension-content' },
                React.createElement("div", { className: 'title' },
                    React.createElement("div", { className: 'noWrapInfo' },
                        React.createElement("span", { className: 'name' }, displayName),
                        " ",
                        React.createElement("span", { className: 'version' }, version)),
                    React.createElement("div", { className: 'stat' },
                        !!downloadCount && React.createElement("span", { className: 'download-count' },
                            React.createElement("i", { className: 'fa fa-download' }),
                            downloadCompactFormatter.format(downloadCount)),
                        !!averageRating && React.createElement("span", { className: 'average-rating' },
                            React.createElement("i", { className: 'fa fa-star' }),
                            averageRating.toFixed(1)))),
                React.createElement("div", { className: 'noWrapInfo theia-vsx-extension-description' }, description),
                React.createElement("div", { className: 'theia-vsx-extension-action-bar' },
                    React.createElement("span", { className: 'noWrapInfo theia-vsx-extension-publisher' }, publisher),
                    this.renderAction())));
    };
    return VSXExtensionComponent;
}(AbstractVSXExtensionComponent));
exports.VSXExtensionComponent = VSXExtensionComponent;
var VSXExtensionEditorComponent = /** @class */ (function (_super) {
    __extends(VSXExtensionEditorComponent, _super);
    function VSXExtensionEditorComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // TODO replace with webview
        _this.openLink = function (event) {
            if (!_this.body) {
                return;
            }
            var target = event.nativeEvent.target;
            if (!(target instanceof HTMLElement)) {
                return;
            }
            var node = target;
            while (node.tagName.toLowerCase() !== 'a') {
                if (node === _this.body) {
                    return;
                }
                if (!(node.parentElement instanceof HTMLElement)) {
                    return;
                }
                node = node.parentElement;
            }
            var href = node.getAttribute('href');
            if (href && !href.startsWith('#')) {
                event.preventDefault();
                _this.props.extension.doOpen(new uri_1.default(href));
            }
        };
        _this.openExtension = function (e) { return __awaiter(_this, void 0, void 0, function () {
            var extension, uri;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e.stopPropagation();
                        e.preventDefault();
                        extension = this.props.extension;
                        return [4 /*yield*/, extension.environment.getRegistryUri()];
                    case 1:
                        uri = _a.sent();
                        extension.doOpen(uri.resolve('extension/' + extension.id.replace('.', '/')));
                        return [2 /*return*/];
                }
            });
        }); };
        _this.searchPublisher = function (e) {
            e.stopPropagation();
            e.preventDefault();
            var extension = _this.props.extension;
            if (extension.publisher) {
                extension.search.query = extension.publisher;
            }
        };
        _this.openPublishedBy = function (e) { return __awaiter(_this, void 0, void 0, function () {
            var extension, homepage;
            return __generator(this, function (_a) {
                e.stopPropagation();
                e.preventDefault();
                extension = this.props.extension;
                homepage = extension.publishedBy && extension.publishedBy.homepage;
                if (homepage) {
                    extension.doOpen(new uri_1.default(homepage));
                }
                return [2 /*return*/];
            });
        }); };
        _this.openAverageRating = function (e) { return __awaiter(_this, void 0, void 0, function () {
            var extension, uri;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e.stopPropagation();
                        e.preventDefault();
                        extension = this.props.extension;
                        return [4 /*yield*/, extension.environment.getRegistryUri()];
                    case 1:
                        uri = _a.sent();
                        extension.doOpen(uri.resolve('extension/' + extension.id.replace('.', '/') + '/reviews'));
                        return [2 /*return*/];
                }
            });
        }); };
        _this.openRepository = function (e) {
            e.stopPropagation();
            e.preventDefault();
            var extension = _this.props.extension;
            if (extension.repository) {
                extension.doOpen(new uri_1.default(extension.repository));
            }
        };
        _this.openLicense = function (e) {
            e.stopPropagation();
            e.preventDefault();
            var extension = _this.props.extension;
            var licenseUrl = extension.licenseUrl;
            if (licenseUrl) {
                extension.doOpen(new uri_1.default(licenseUrl));
            }
        };
        return _this;
    }
    Object.defineProperty(VSXExtensionEditorComponent.prototype, "scrollContainer", {
        get: function () {
            return this._scrollContainer;
        },
        enumerable: false,
        configurable: true
    });
    VSXExtensionEditorComponent.prototype.render = function () {
        var _this = this;
        var _a = this.props.extension, builtin = _a.builtin, preview = _a.preview, id = _a.id, iconUrl = _a.iconUrl, publisher = _a.publisher, displayName = _a.displayName, description = _a.description, version = _a.version, averageRating = _a.averageRating, downloadCount = _a.downloadCount, repository = _a.repository, license = _a.license, readme = _a.readme;
        var _b = this.getSubcomponentStyles(), baseStyle = _b.baseStyle, scrollStyle = _b.scrollStyle;
        return React.createElement(React.Fragment, null,
            React.createElement("div", { className: 'header', style: baseStyle, ref: function (ref) { return _this.header = (ref || undefined); } },
                iconUrl ?
                    React.createElement("img", { className: 'icon-container', src: iconUrl }) :
                    React.createElement("div", { className: 'icon-container placeholder' }),
                React.createElement("div", { className: 'details' },
                    React.createElement("div", { className: 'title' },
                        React.createElement("span", { title: 'Extension name', className: 'name', onClick: this.openExtension }, displayName),
                        React.createElement("span", { title: 'Extension identifier', className: 'identifier' }, id),
                        preview && React.createElement("span", { className: 'preview' }, "Preview"),
                        builtin && React.createElement("span", { className: 'builtin' }, "Built-in")),
                    React.createElement("div", { className: 'subtitle' },
                        React.createElement("span", { title: 'Publisher name', className: 'publisher', onClick: this.searchPublisher },
                            this.renderNamespaceAccess(),
                            publisher),
                        !!downloadCount && React.createElement("span", { className: 'download-count', onClick: this.openExtension },
                            React.createElement("i", { className: "fa fa-download" }),
                            downloadFormatter.format(downloadCount)),
                        averageRating !== undefined && React.createElement("span", { className: 'average-rating', onClick: this.openAverageRating }, this.renderStars()),
                        repository && React.createElement("span", { className: 'repository', onClick: this.openRepository }, "Repository"),
                        license && React.createElement("span", { className: 'license', onClick: this.openLicense }, license),
                        version && React.createElement("span", { className: 'version' }, version)),
                    React.createElement("div", { className: 'description noWrapInfo' }, description),
                    this.renderAction())),
            readme &&
                React.createElement("div", { className: 'scroll-container', style: scrollStyle, ref: function (ref) { return _this._scrollContainer = (ref || undefined); } },
                    React.createElement("div", { className: 'body', ref: function (ref) { return _this.body = (ref || undefined); }, onClick: this.openLink, style: baseStyle, dangerouslySetInnerHTML: { __html: readme } })));
    };
    VSXExtensionEditorComponent.prototype.renderNamespaceAccess = function () {
        var _a = this.props.extension, publisher = _a.publisher, namespaceAccess = _a.namespaceAccess, publishedBy = _a.publishedBy;
        if (namespaceAccess === undefined) {
            return undefined;
        }
        var tooltip = publishedBy ? " Published by \"" + publishedBy.loginName + "\"." : '';
        var icon;
        if (namespaceAccess === 'public') {
            icon = 'globe';
            tooltip = "Everyone can publish to \"" + publisher + "\" namespace." + tooltip;
        }
        else {
            icon = 'shield';
            tooltip = "Only verified owners can publish to \"" + publisher + "\" namespace." + tooltip;
        }
        return React.createElement("i", { className: "fa fa-" + icon + " namespace-access", title: tooltip, onClick: this.openPublishedBy });
    };
    VSXExtensionEditorComponent.prototype.renderStars = function () {
        var rating = this.props.extension.averageRating || 0;
        var renderStarAt = function (position) { return position <= rating ?
            React.createElement("i", { className: 'fa fa-star' }) :
            position > rating && position - rating < 1 ?
                React.createElement("i", { className: 'fa fa-star-half-o' }) :
                React.createElement("i", { className: 'fa fa-star-o' }); };
        return React.createElement(React.Fragment, null,
            renderStarAt(1),
            renderStarAt(2),
            renderStarAt(3),
            renderStarAt(4),
            renderStarAt(5));
    };
    VSXExtensionEditorComponent.prototype.getSubcomponentStyles = function () {
        var _a;
        var visibility = this.header ? 'unset' : 'hidden';
        var baseStyle = { visibility: visibility };
        var scrollStyle = ((_a = this.header) === null || _a === void 0 ? void 0 : _a.clientHeight) ? { visibility: visibility, height: "calc(100% - (" + this.header.clientHeight + "px + 1px))" } : baseStyle;
        return { baseStyle: baseStyle, scrollStyle: scrollStyle };
    };
    return VSXExtensionEditorComponent;
}(AbstractVSXExtensionComponent));
exports.VSXExtensionEditorComponent = VSXExtensionEditorComponent;
//# sourceMappingURL=vsx-extension.js.map