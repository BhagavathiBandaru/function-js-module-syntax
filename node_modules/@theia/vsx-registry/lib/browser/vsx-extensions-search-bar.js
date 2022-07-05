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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VSXExtensionsSearchBar = void 0;
var React = require("react");
var inversify_1 = require("inversify");
var widgets_1 = require("@theia/core/lib/browser/widgets");
var vsx_extensions_search_model_1 = require("./vsx-extensions-search-model");
var VSXExtensionsSearchBar = /** @class */ (function (_super) {
    __extends(VSXExtensionsSearchBar, _super);
    function VSXExtensionsSearchBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.updateQuery = function (e) { return _this.model.query = e.target.value; };
        return _this;
    }
    VSXExtensionsSearchBar.prototype.init = function () {
        var _this = this;
        this.id = 'vsx-extensions-search-bar';
        this.addClass('theia-vsx-extensions-search-bar');
        this.model.onDidChangeQuery(function () { return _this.update(); });
    };
    VSXExtensionsSearchBar.prototype.render = function () {
        var _this = this;
        return React.createElement("input", { type: 'text', ref: function (input) { return _this.input = input || undefined; }, value: this.model.query, className: 'theia-input', placeholder: 'Search Extensions in Open VSX Registry', onChange: this.updateQuery });
    };
    VSXExtensionsSearchBar.prototype.onActivateRequest = function (msg) {
        _super.prototype.onActivateRequest.call(this, msg);
        if (this.input) {
            this.input.focus();
        }
    };
    VSXExtensionsSearchBar.prototype.onAfterAttach = function (msg) {
        _super.prototype.onAfterAttach.call(this, msg);
        this.update();
    };
    __decorate([
        inversify_1.inject(vsx_extensions_search_model_1.VSXExtensionsSearchModel),
        __metadata("design:type", vsx_extensions_search_model_1.VSXExtensionsSearchModel)
    ], VSXExtensionsSearchBar.prototype, "model", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], VSXExtensionsSearchBar.prototype, "init", null);
    VSXExtensionsSearchBar = __decorate([
        inversify_1.injectable()
    ], VSXExtensionsSearchBar);
    return VSXExtensionsSearchBar;
}(widgets_1.ReactWidget));
exports.VSXExtensionsSearchBar = VSXExtensionsSearchBar;
//# sourceMappingURL=vsx-extensions-search-bar.js.map