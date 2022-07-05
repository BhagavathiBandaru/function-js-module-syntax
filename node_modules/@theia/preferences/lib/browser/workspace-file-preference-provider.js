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
exports.WorkspaceFilePreferenceProvider = exports.WorkspaceFilePreferenceProviderFactory = exports.WorkspaceFilePreferenceProviderOptions = void 0;
var inversify_1 = require("inversify");
var preferences_1 = require("@theia/core/lib/browser/preferences");
var workspace_service_1 = require("@theia/workspace/lib/browser/workspace-service");
var abstract_resource_preference_provider_1 = require("./abstract-resource-preference-provider");
var WorkspaceFilePreferenceProviderOptions = /** @class */ (function () {
    function WorkspaceFilePreferenceProviderOptions() {
    }
    WorkspaceFilePreferenceProviderOptions = __decorate([
        inversify_1.injectable()
    ], WorkspaceFilePreferenceProviderOptions);
    return WorkspaceFilePreferenceProviderOptions;
}());
exports.WorkspaceFilePreferenceProviderOptions = WorkspaceFilePreferenceProviderOptions;
exports.WorkspaceFilePreferenceProviderFactory = Symbol('WorkspaceFilePreferenceProviderFactory');
var WorkspaceFilePreferenceProvider = /** @class */ (function (_super) {
    __extends(WorkspaceFilePreferenceProvider, _super);
    function WorkspaceFilePreferenceProvider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sectionsInsideSettings = new Set();
        return _this;
    }
    WorkspaceFilePreferenceProvider.prototype.getUri = function () {
        return this.options.workspaceUri;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    WorkspaceFilePreferenceProvider.prototype.parse = function (content) {
        var e_1, _a;
        var data = _super.prototype.parse.call(this, content);
        if (workspace_service_1.WorkspaceData.is(data)) {
            var settings = __assign({}, data.settings);
            try {
                for (var _b = __values(this.configurations.getSectionNames().filter(function (name) { return name !== 'settings'; })), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    // If the user has written configuration inside the "settings" object, we will respect that.
                    if (settings[key]) {
                        this.sectionsInsideSettings.add(key);
                    }
                    // Favor sections outside the "settings" object to agree with VSCode behavior
                    if (data[key]) {
                        settings[key] = data[key];
                        this.sectionsInsideSettings.delete(key);
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
            return settings;
        }
        return {};
    };
    WorkspaceFilePreferenceProvider.prototype.getPath = function (preferenceName) {
        var firstSegment = preferenceName.split('.')[0];
        if (firstSegment && this.configurations.isSectionName(firstSegment)) {
            // Default to writing sections outside the "settings" object.
            var path = [firstSegment];
            var pathRemainder = preferenceName.slice(firstSegment.length + 1);
            if (pathRemainder) {
                path.push(pathRemainder);
            }
            // If the user has already written this section inside the "settings" object, modify it there.
            if (this.sectionsInsideSettings.has(firstSegment)) {
                path.unshift('settings');
            }
            return path;
        }
        return ['settings', preferenceName];
    };
    WorkspaceFilePreferenceProvider.prototype.getScope = function () {
        return preferences_1.PreferenceScope.Workspace;
    };
    WorkspaceFilePreferenceProvider.prototype.getDomain = function () {
        // workspace file is treated as part of the workspace
        return this.workspaceService.tryGetRoots().map(function (r) { return r.resource.toString(); }).concat([this.options.workspaceUri.toString()]);
    };
    __decorate([
        inversify_1.inject(workspace_service_1.WorkspaceService),
        __metadata("design:type", workspace_service_1.WorkspaceService)
    ], WorkspaceFilePreferenceProvider.prototype, "workspaceService", void 0);
    __decorate([
        inversify_1.inject(WorkspaceFilePreferenceProviderOptions),
        __metadata("design:type", WorkspaceFilePreferenceProviderOptions)
    ], WorkspaceFilePreferenceProvider.prototype, "options", void 0);
    WorkspaceFilePreferenceProvider = __decorate([
        inversify_1.injectable()
    ], WorkspaceFilePreferenceProvider);
    return WorkspaceFilePreferenceProvider;
}(abstract_resource_preference_provider_1.AbstractResourcePreferenceProvider));
exports.WorkspaceFilePreferenceProvider = WorkspaceFilePreferenceProvider;
//# sourceMappingURL=workspace-file-preference-provider.js.map