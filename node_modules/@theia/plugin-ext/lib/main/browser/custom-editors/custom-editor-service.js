"use strict";
/********************************************************************************
 * Copyright (c) 2021 SAP SE or an SAP affiliate company and others.
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
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// copied and modified from https://github.com/microsoft/vscode/blob/53eac52308c4611000a171cc7bf1214293473c78/src/vs/workbench/contrib/customEditor/browser/customEditors.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.once = exports.CustomEditorModelManager = exports.CustomEditorService = void 0;
var inversify_1 = require("inversify");
var CustomEditorService = /** @class */ (function () {
    function CustomEditorService() {
        this._models = new CustomEditorModelManager();
    }
    Object.defineProperty(CustomEditorService.prototype, "models", {
        get: function () { return this._models; },
        enumerable: false,
        configurable: true
    });
    CustomEditorService = __decorate([
        inversify_1.injectable()
    ], CustomEditorService);
    return CustomEditorService;
}());
exports.CustomEditorService = CustomEditorService;
var CustomEditorModelManager = /** @class */ (function () {
    function CustomEditorModelManager() {
        this.references = new Map();
    }
    CustomEditorModelManager.prototype.add = function (resource, viewType, model) {
        var key = this.key(resource, viewType);
        var existing = this.references.get(key);
        if (existing) {
            throw new Error('Model already exists');
        }
        this.references.set(key, { viewType: viewType, model: model, counter: 0 });
        return this.tryRetain(resource, viewType);
    };
    CustomEditorModelManager.prototype.get = function (resource, viewType) {
        return __awaiter(this, void 0, void 0, function () {
            var key, entry;
            return __generator(this, function (_a) {
                key = this.key(resource, viewType);
                entry = this.references.get(key);
                return [2 /*return*/, entry === null || entry === void 0 ? void 0 : entry.model];
            });
        });
    };
    CustomEditorModelManager.prototype.tryRetain = function (resource, viewType) {
        var _this_1 = this;
        var key = this.key(resource, viewType);
        var entry = this.references.get(key);
        if (!entry) {
            return undefined;
        }
        entry.counter++;
        return entry.model.then(function (model) { return ({
            object: model,
            dispose: once(function () {
                if (--entry.counter <= 0) {
                    entry.model.then(function (x) { return x.dispose(); });
                    _this_1.references.delete(key);
                }
            }),
        }); });
    };
    CustomEditorModelManager.prototype.disposeAllModelsForView = function (viewType) {
        var e_1, _a;
        try {
            for (var _b = __values(this.references), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
                if (value.viewType === viewType) {
                    value.model.then(function (x) { return x.dispose(); });
                    this.references.delete(key);
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
    };
    CustomEditorModelManager.prototype.key = function (resource, viewType) {
        return resource.toString() + "@@@" + viewType;
    };
    return CustomEditorModelManager;
}());
exports.CustomEditorModelManager = CustomEditorModelManager;
function once(fn) {
    var _this = this;
    var didCall = false;
    var result;
    return function () {
        if (didCall) {
            return result;
        }
        didCall = true;
        result = fn.apply(_this, arguments);
        return result;
    };
}
exports.once = once;
//# sourceMappingURL=custom-editor-service.js.map