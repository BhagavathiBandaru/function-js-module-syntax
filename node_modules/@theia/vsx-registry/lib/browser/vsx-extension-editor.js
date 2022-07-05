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
exports.VSXExtensionEditor = void 0;
var React = require("react");
var inversify_1 = require("inversify");
var browser_1 = require("@theia/core/lib/browser");
var vsx_extension_1 = require("./vsx-extension");
var vsx_extensions_model_1 = require("./vsx-extensions-model");
var promise_util_1 = require("@theia/core/lib/common/promise-util");
var VSXExtensionEditor = /** @class */ (function (_super) {
    __extends(VSXExtensionEditor, _super);
    function VSXExtensionEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.deferredScrollContainer = new promise_util_1.Deferred();
        _this.resolveScrollContainer = function (element) {
            _this.deferredScrollContainer.resolve(element === null || element === void 0 ? void 0 : element.scrollContainer);
        };
        return _this;
    }
    VSXExtensionEditor_1 = VSXExtensionEditor;
    VSXExtensionEditor.prototype.init = function () {
        var _this = this;
        this.addClass('theia-vsx-extension-editor');
        this.id = VSXExtensionEditor_1.ID + ':' + this.extension.id;
        this.title.closable = true;
        this.updateTitle();
        this.title.iconClass = 'fa fa-puzzle-piece';
        this.node.tabIndex = -1;
        this.update();
        this.toDispose.push(this.model.onDidChange(function () { return _this.update(); }));
    };
    VSXExtensionEditor.prototype.getScrollContainer = function () {
        return this.deferredScrollContainer.promise;
    };
    VSXExtensionEditor.prototype.onActivateRequest = function (msg) {
        _super.prototype.onActivateRequest.call(this, msg);
        this.node.focus();
    };
    VSXExtensionEditor.prototype.onUpdateRequest = function (msg) {
        _super.prototype.onUpdateRequest.call(this, msg);
        this.updateTitle();
    };
    VSXExtensionEditor.prototype.onAfterShow = function (msg) {
        _super.prototype.onAfterShow.call(this, msg);
        this.update();
    };
    VSXExtensionEditor.prototype.updateTitle = function () {
        var label = 'Extension: ' + (this.extension.displayName || this.extension.name);
        this.title.label = label;
        this.title.caption = label;
    };
    VSXExtensionEditor.prototype.onResize = function (msg) {
        _super.prototype.onResize.call(this, msg);
        this.update();
    };
    ;
    VSXExtensionEditor.prototype.render = function () {
        return React.createElement(vsx_extension_1.VSXExtensionEditorComponent, { ref: this.resolveScrollContainer, extension: this.extension });
    };
    var VSXExtensionEditor_1;
    VSXExtensionEditor.ID = 'vsx-extension-editor';
    __decorate([
        inversify_1.inject(vsx_extension_1.VSXExtension),
        __metadata("design:type", vsx_extension_1.VSXExtension)
    ], VSXExtensionEditor.prototype, "extension", void 0);
    __decorate([
        inversify_1.inject(vsx_extensions_model_1.VSXExtensionsModel),
        __metadata("design:type", vsx_extensions_model_1.VSXExtensionsModel)
    ], VSXExtensionEditor.prototype, "model", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], VSXExtensionEditor.prototype, "init", null);
    VSXExtensionEditor = VSXExtensionEditor_1 = __decorate([
        inversify_1.injectable()
    ], VSXExtensionEditor);
    return VSXExtensionEditor;
}(browser_1.ReactWidget));
exports.VSXExtensionEditor = VSXExtensionEditor;
//# sourceMappingURL=vsx-extension-editor.js.map