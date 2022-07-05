"use strict";
/********************************************************************************
 * Copyright (C) 2017 TypeFox and others.
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
exports.MonacoLanguages = void 0;
var inversify_1 = require("inversify");
var problem_manager_1 = require("@theia/markers/lib/browser/problem/problem-manager");
var uri_1 = require("@theia/core/lib/common/uri");
var disposable_1 = require("@theia/core/lib/common/disposable");
var monaco_diagnostic_collection_1 = require("./monaco-diagnostic-collection");
var protocol_to_monaco_converter_1 = require("./protocol-to-monaco-converter");
var MonacoLanguages = /** @class */ (function () {
    function MonacoLanguages() {
        this.workspaceSymbolProviders = [];
        this.makers = new Map();
    }
    MonacoLanguages.prototype.init = function () {
        var e_1, _a;
        var _this = this;
        try {
            for (var _b = __values(this.problemManager.getUris()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var uri = _c.value;
                this.updateMarkers(new uri_1.default(uri));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.problemManager.onDidChangeMarkers(function (uri) { return _this.updateMarkers(uri); });
    };
    MonacoLanguages.prototype.updateMarkers = function (uri) {
        var e_2, _a, e_3, _b, e_4, _c;
        var uriString = uri.toString();
        var owners = new Map();
        try {
            for (var _d = __values(this.problemManager.findMarkers({ uri: uri })), _e = _d.next(); !_e.done; _e = _d.next()) {
                var marker = _e.value;
                var diagnostics = owners.get(marker.owner) || [];
                diagnostics.push(marker.data);
                owners.set(marker.owner, diagnostics);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
            }
            finally { if (e_2) throw e_2.error; }
        }
        var toClean = new Set(this.makers.keys());
        try {
            for (var owners_1 = __values(owners), owners_1_1 = owners_1.next(); !owners_1_1.done; owners_1_1 = owners_1.next()) {
                var _f = __read(owners_1_1.value, 2), owner = _f[0], diagnostics = _f[1];
                toClean.delete(owner);
                var collection = this.makers.get(owner) || new monaco_diagnostic_collection_1.MonacoDiagnosticCollection(owner, this.p2m);
                collection.set(uriString, diagnostics);
                this.makers.set(owner, collection);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (owners_1_1 && !owners_1_1.done && (_b = owners_1.return)) _b.call(owners_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        try {
            for (var toClean_1 = __values(toClean), toClean_1_1 = toClean_1.next(); !toClean_1_1.done; toClean_1_1 = toClean_1.next()) {
                var owner = toClean_1_1.value;
                var collection = this.makers.get(owner);
                if (collection) {
                    collection.set(uriString, []);
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (toClean_1_1 && !toClean_1_1.done && (_c = toClean_1.return)) _c.call(toClean_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
    };
    MonacoLanguages.prototype.registerWorkspaceSymbolProvider = function (provider) {
        var _this = this;
        this.workspaceSymbolProviders.push(provider);
        return disposable_1.Disposable.create(function () {
            var index = _this.workspaceSymbolProviders.indexOf(provider);
            if (index !== -1) {
                _this.workspaceSymbolProviders.splice(index, 1);
            }
        });
    };
    Object.defineProperty(MonacoLanguages.prototype, "languages", {
        get: function () {
            return __spread(this.mergeLanguages(monaco.languages.getLanguages()).values());
        },
        enumerable: false,
        configurable: true
    });
    MonacoLanguages.prototype.getLanguage = function (languageId) {
        return this.mergeLanguages(monaco.languages.getLanguages().filter(function (language) { return language.id === languageId; })).get(languageId);
    };
    MonacoLanguages.prototype.mergeLanguages = function (registered) {
        var e_5, _a, e_6, _b, e_7, _c, e_8, _d;
        var languages = new Map();
        try {
            for (var registered_1 = __values(registered), registered_1_1 = registered_1.next(); !registered_1_1.done; registered_1_1 = registered_1.next()) {
                var _e = registered_1_1.value, id = _e.id, aliases = _e.aliases, extensions = _e.extensions, filenames = _e.filenames;
                var merged = languages.get(id) || {
                    id: id,
                    name: '',
                    extensions: new Set(),
                    filenames: new Set()
                };
                if (!merged.name && aliases && aliases.length) {
                    merged.name = aliases[0];
                }
                if (extensions && extensions.length) {
                    try {
                        for (var extensions_1 = (e_6 = void 0, __values(extensions)), extensions_1_1 = extensions_1.next(); !extensions_1_1.done; extensions_1_1 = extensions_1.next()) {
                            var extension = extensions_1_1.value;
                            merged.extensions.add(extension);
                        }
                    }
                    catch (e_6_1) { e_6 = { error: e_6_1 }; }
                    finally {
                        try {
                            if (extensions_1_1 && !extensions_1_1.done && (_b = extensions_1.return)) _b.call(extensions_1);
                        }
                        finally { if (e_6) throw e_6.error; }
                    }
                }
                if (filenames && filenames.length) {
                    try {
                        for (var filenames_1 = (e_7 = void 0, __values(filenames)), filenames_1_1 = filenames_1.next(); !filenames_1_1.done; filenames_1_1 = filenames_1.next()) {
                            var filename = filenames_1_1.value;
                            merged.filenames.add(filename);
                        }
                    }
                    catch (e_7_1) { e_7 = { error: e_7_1 }; }
                    finally {
                        try {
                            if (filenames_1_1 && !filenames_1_1.done && (_c = filenames_1.return)) _c.call(filenames_1);
                        }
                        finally { if (e_7) throw e_7.error; }
                    }
                }
                languages.set(id, merged);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (registered_1_1 && !registered_1_1.done && (_a = registered_1.return)) _a.call(registered_1);
            }
            finally { if (e_5) throw e_5.error; }
        }
        try {
            for (var languages_1 = __values(languages), languages_1_1 = languages_1.next(); !languages_1_1.done; languages_1_1 = languages_1.next()) {
                var _f = __read(languages_1_1.value, 2), id = _f[0], language = _f[1];
                if (!language.name) {
                    language.name = id;
                }
            }
        }
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (languages_1_1 && !languages_1_1.done && (_d = languages_1.return)) _d.call(languages_1);
            }
            finally { if (e_8) throw e_8.error; }
        }
        return languages;
    };
    __decorate([
        inversify_1.inject(problem_manager_1.ProblemManager),
        __metadata("design:type", problem_manager_1.ProblemManager)
    ], MonacoLanguages.prototype, "problemManager", void 0);
    __decorate([
        inversify_1.inject(protocol_to_monaco_converter_1.ProtocolToMonacoConverter),
        __metadata("design:type", protocol_to_monaco_converter_1.ProtocolToMonacoConverter)
    ], MonacoLanguages.prototype, "p2m", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], MonacoLanguages.prototype, "init", null);
    MonacoLanguages = __decorate([
        inversify_1.injectable()
    ], MonacoLanguages);
    return MonacoLanguages;
}());
exports.MonacoLanguages = MonacoLanguages;
//# sourceMappingURL=monaco-languages.js.map