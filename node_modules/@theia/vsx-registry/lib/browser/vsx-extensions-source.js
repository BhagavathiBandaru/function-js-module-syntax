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
exports.VSXExtensionsSource = exports.VSXExtensionsSourceOptions = void 0;
var inversify_1 = require("inversify");
var source_tree_1 = require("@theia/core/lib/browser/source-tree");
var vsx_extensions_model_1 = require("./vsx-extensions-model");
var VSXExtensionsSourceOptions = /** @class */ (function () {
    function VSXExtensionsSourceOptions() {
    }
    VSXExtensionsSourceOptions.INSTALLED = 'installed';
    VSXExtensionsSourceOptions.BUILT_IN = 'builtin';
    VSXExtensionsSourceOptions.SEARCH_RESULT = 'searchResult';
    VSXExtensionsSourceOptions = __decorate([
        inversify_1.injectable()
    ], VSXExtensionsSourceOptions);
    return VSXExtensionsSourceOptions;
}());
exports.VSXExtensionsSourceOptions = VSXExtensionsSourceOptions;
var VSXExtensionsSource = /** @class */ (function (_super) {
    __extends(VSXExtensionsSource, _super);
    function VSXExtensionsSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VSXExtensionsSource.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.fireDidChange();
                this.toDispose.push(this.model.onDidChange(function () { return _this.fireDidChange(); }));
                return [2 /*return*/];
            });
        });
    };
    VSXExtensionsSource.prototype.getElements = function () {
        var _a, _b, id, extension, e_1_1;
        var e_1, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 8, 9, 10]);
                    _a = __values(this.doGetElements()), _b = _a.next();
                    _d.label = 1;
                case 1:
                    if (!!_b.done) return [3 /*break*/, 7];
                    id = _b.value;
                    extension = this.model.getExtension(id);
                    if (!extension) {
                        return [3 /*break*/, 6];
                    }
                    if (!(this.options.id === VSXExtensionsSourceOptions.BUILT_IN)) return [3 /*break*/, 4];
                    if (!extension.builtin) return [3 /*break*/, 3];
                    return [4 /*yield*/, extension];
                case 2:
                    _d.sent();
                    _d.label = 3;
                case 3: return [3 /*break*/, 6];
                case 4:
                    if (!!extension.builtin) return [3 /*break*/, 6];
                    return [4 /*yield*/, extension];
                case 5:
                    _d.sent();
                    _d.label = 6;
                case 6:
                    _b = _a.next();
                    return [3 /*break*/, 1];
                case 7: return [3 /*break*/, 10];
                case 8:
                    e_1_1 = _d.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 10];
                case 9:
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/];
            }
        });
    };
    VSXExtensionsSource.prototype.doGetElements = function () {
        if (this.options.id === VSXExtensionsSourceOptions.SEARCH_RESULT) {
            return this.model.searchResult;
        }
        return this.model.installed;
    };
    __decorate([
        inversify_1.inject(VSXExtensionsSourceOptions),
        __metadata("design:type", VSXExtensionsSourceOptions)
    ], VSXExtensionsSource.prototype, "options", void 0);
    __decorate([
        inversify_1.inject(vsx_extensions_model_1.VSXExtensionsModel),
        __metadata("design:type", vsx_extensions_model_1.VSXExtensionsModel)
    ], VSXExtensionsSource.prototype, "model", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], VSXExtensionsSource.prototype, "init", null);
    VSXExtensionsSource = __decorate([
        inversify_1.injectable()
    ], VSXExtensionsSource);
    return VSXExtensionsSource;
}(source_tree_1.TreeSource));
exports.VSXExtensionsSource = VSXExtensionsSource;
//# sourceMappingURL=vsx-extensions-source.js.map