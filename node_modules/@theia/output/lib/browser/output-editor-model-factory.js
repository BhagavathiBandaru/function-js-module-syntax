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
exports.OutputEditorModel = exports.OutputEditorModelFactory = void 0;
var inversify_1 = require("inversify");
var monaco_editor_model_1 = require("@theia/monaco/lib/browser/monaco-editor-model");
var output_uri_1 = require("../common/output-uri");
var monaco_to_protocol_converter_1 = require("@theia/monaco/lib/browser/monaco-to-protocol-converter");
var protocol_to_monaco_converter_1 = require("@theia/monaco/lib/browser/protocol-to-monaco-converter");
var OutputEditorModelFactory = /** @class */ (function () {
    function OutputEditorModelFactory() {
        this.scheme = output_uri_1.OutputUri.SCHEME;
    }
    OutputEditorModelFactory.prototype.createModel = function (resource) {
        return new OutputEditorModel(resource, this.m2p, this.p2m);
    };
    __decorate([
        inversify_1.inject(monaco_to_protocol_converter_1.MonacoToProtocolConverter),
        __metadata("design:type", monaco_to_protocol_converter_1.MonacoToProtocolConverter)
    ], OutputEditorModelFactory.prototype, "m2p", void 0);
    __decorate([
        inversify_1.inject(protocol_to_monaco_converter_1.ProtocolToMonacoConverter),
        __metadata("design:type", protocol_to_monaco_converter_1.ProtocolToMonacoConverter)
    ], OutputEditorModelFactory.prototype, "p2m", void 0);
    OutputEditorModelFactory = __decorate([
        inversify_1.injectable()
    ], OutputEditorModelFactory);
    return OutputEditorModelFactory;
}());
exports.OutputEditorModelFactory = OutputEditorModelFactory;
var OutputEditorModel = /** @class */ (function (_super) {
    __extends(OutputEditorModel, _super);
    function OutputEditorModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(OutputEditorModel.prototype, "readOnly", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    OutputEditorModel.prototype.setDirty = function (dirty) {
        // NOOP
    };
    return OutputEditorModel;
}(monaco_editor_model_1.MonacoEditorModel));
exports.OutputEditorModel = OutputEditorModel;
//# sourceMappingURL=output-editor-model-factory.js.map