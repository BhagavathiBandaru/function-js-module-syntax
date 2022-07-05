"use strict";
/********************************************************************************
 * Copyright (C) 2019 TypeFox and others.
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
exports.ResourceContextKey = void 0;
var inversify_1 = require("inversify");
var uri_1 = require("../common/uri");
var context_key_service_1 = require("./context-key-service");
var language_service_1 = require("./language-service");
var ResourceContextKey = /** @class */ (function () {
    function ResourceContextKey() {
    }
    ResourceContextKey.prototype.init = function () {
        this.resource = this.contextKeyService.createKey('resource', undefined);
        this.resourceSchemeKey = this.contextKeyService.createKey('resourceScheme', undefined);
        this.resourceFileName = this.contextKeyService.createKey('resourceFilename', undefined);
        this.resourceExtname = this.contextKeyService.createKey('resourceExtname', undefined);
        this.resourceLangId = this.contextKeyService.createKey('resourceLangId', undefined);
    };
    ResourceContextKey.prototype.get = function () {
        var codeUri = this.resource.get();
        return codeUri && new uri_1.default(codeUri);
    };
    ResourceContextKey.prototype.set = function (resourceUri) {
        this.resource.set(resourceUri && resourceUri['codeUri']);
        this.resourceSchemeKey.set(resourceUri && resourceUri.scheme);
        this.resourceFileName.set(resourceUri && resourceUri.path.base);
        this.resourceExtname.set(resourceUri && resourceUri.path.ext);
        this.resourceLangId.set(resourceUri && this.getLanguageId(resourceUri));
    };
    ResourceContextKey.prototype.getLanguageId = function (uri) {
        var e_1, _a;
        if (uri) {
            try {
                for (var _b = __values(this.languages.languages), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var language = _c.value;
                    if (language.extensions.has(uri.path.ext)) {
                        return language.id;
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
        }
        return undefined;
    };
    __decorate([
        inversify_1.inject(language_service_1.LanguageService),
        __metadata("design:type", language_service_1.LanguageService)
    ], ResourceContextKey.prototype, "languages", void 0);
    __decorate([
        inversify_1.inject(context_key_service_1.ContextKeyService),
        __metadata("design:type", context_key_service_1.ContextKeyService)
    ], ResourceContextKey.prototype, "contextKeyService", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ResourceContextKey.prototype, "init", null);
    ResourceContextKey = __decorate([
        inversify_1.injectable()
    ], ResourceContextKey);
    return ResourceContextKey;
}());
exports.ResourceContextKey = ResourceContextKey;
//# sourceMappingURL=resource-context-key.js.map