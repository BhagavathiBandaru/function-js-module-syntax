"use strict";
/********************************************************************************
 * Copyright (C) 2019 Ericsson and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionPreferenceProvider = exports.SectionPreferenceProviderSection = exports.SectionPreferenceProviderUri = void 0;
var inversify_1 = require("inversify");
var uri_1 = require("@theia/core/lib/common/uri");
var abstract_resource_preference_provider_1 = require("./abstract-resource-preference-provider");
var workspace_service_1 = require("@theia/workspace/lib/browser/workspace-service");
var preference_configurations_1 = require("@theia/core/lib/browser/preferences/preference-configurations");
exports.SectionPreferenceProviderUri = Symbol('SectionPreferenceProviderUri');
exports.SectionPreferenceProviderSection = Symbol('SectionPreferenceProviderSection');
/**
 * This class encapsulates the logic of using separate files for some workspace configuration like 'launch.json' or 'tasks.json'.
 * Anything that is not a contributed section will be in the main config file.
 */
var SectionPreferenceProvider = /** @class */ (function (_super) {
    __extends(SectionPreferenceProvider, _super);
    function SectionPreferenceProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SectionPreferenceProvider.prototype, "isSection", {
        get: function () {
            if (typeof this._isSection === 'undefined') {
                this._isSection = this.preferenceConfigurations.isSectionName(this.section);
            }
            return this._isSection;
        },
        enumerable: false,
        configurable: true
    });
    SectionPreferenceProvider.prototype.getUri = function () {
        return this.uri;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SectionPreferenceProvider.prototype.parse = function (content) {
        var prefs = _super.prototype.parse.call(this, content);
        if (this.isSection) {
            if (prefs === undefined) {
                return undefined;
            }
            var result = {};
            result[this.section] = __assign({}, prefs);
            return result;
        }
        else {
            return prefs;
        }
    };
    SectionPreferenceProvider.prototype.getPath = function (preferenceName) {
        if (!this.isSection) {
            return _super.prototype.getPath.call(this, preferenceName);
        }
        if (preferenceName === this.section) {
            return [];
        }
        if (preferenceName.startsWith(this.section + ".")) {
            return [preferenceName.slice(this.section.length + 1)];
        }
        return undefined;
    };
    __decorate([
        inversify_1.inject(workspace_service_1.WorkspaceService),
        __metadata("design:type", workspace_service_1.WorkspaceService)
    ], SectionPreferenceProvider.prototype, "workspaceService", void 0);
    __decorate([
        inversify_1.inject(exports.SectionPreferenceProviderUri),
        __metadata("design:type", uri_1.default)
    ], SectionPreferenceProvider.prototype, "uri", void 0);
    __decorate([
        inversify_1.inject(exports.SectionPreferenceProviderSection),
        __metadata("design:type", String)
    ], SectionPreferenceProvider.prototype, "section", void 0);
    __decorate([
        inversify_1.inject(preference_configurations_1.PreferenceConfigurations),
        __metadata("design:type", preference_configurations_1.PreferenceConfigurations)
    ], SectionPreferenceProvider.prototype, "preferenceConfigurations", void 0);
    SectionPreferenceProvider = __decorate([
        inversify_1.injectable()
    ], SectionPreferenceProvider);
    return SectionPreferenceProvider;
}(abstract_resource_preference_provider_1.AbstractResourcePreferenceProvider));
exports.SectionPreferenceProvider = SectionPreferenceProvider;
//# sourceMappingURL=section-preference-provider.js.map