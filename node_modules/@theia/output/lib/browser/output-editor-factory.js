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
exports.OutputEditorFactory = void 0;
var inversify_1 = require("inversify");
var uri_1 = require("@theia/core/lib/common/uri");
var monaco_context_menu_1 = require("@theia/monaco/lib/browser/monaco-context-menu");
var monaco_editor_1 = require("@theia/monaco/lib/browser/monaco-editor");
var output_uri_1 = require("../common/output-uri");
var output_context_menu_1 = require("./output-context-menu");
var OutputEditorFactory = /** @class */ (function () {
    function OutputEditorFactory() {
        this.scheme = output_uri_1.OutputUri.SCHEME;
    }
    OutputEditorFactory.prototype.create = function (model, defaultsOptions, defaultOverrides) {
        var uri = new uri_1.default(model.uri);
        var options = this.createOptions(model, defaultsOptions);
        var overrides = this.createOverrides(model, defaultOverrides);
        return new monaco_editor_1.MonacoEditor(uri, model, document.createElement('div'), this.services, options, overrides);
    };
    OutputEditorFactory.prototype.createOptions = function (model, defaultOptions) {
        return __assign(__assign({}, defaultOptions), { overviewRulerLanes: 3, lineNumbersMinChars: 3, fixedOverflowWidgets: true, wordWrap: 'off', lineNumbers: 'off', glyphMargin: false, lineDecorationsWidth: 20, rulers: [], folding: false, scrollBeyondLastLine: false, readOnly: true, renderLineHighlight: 'none', minimap: { enabled: false }, matchBrackets: 'never' });
    };
    OutputEditorFactory.prototype.createOverrides = function (model, defaultOverrides) {
        var contextMenuService = this.contextMenuService;
        return __assign(__assign({}, defaultOverrides), { contextMenuService: contextMenuService });
    };
    __decorate([
        inversify_1.inject(monaco_editor_1.MonacoEditorServices),
        __metadata("design:type", monaco_editor_1.MonacoEditorServices)
    ], OutputEditorFactory.prototype, "services", void 0);
    __decorate([
        inversify_1.inject(output_context_menu_1.OutputContextMenuService),
        __metadata("design:type", monaco_context_menu_1.MonacoContextMenuService)
    ], OutputEditorFactory.prototype, "contextMenuService", void 0);
    OutputEditorFactory = __decorate([
        inversify_1.injectable()
    ], OutputEditorFactory);
    return OutputEditorFactory;
}());
exports.OutputEditorFactory = OutputEditorFactory;
//# sourceMappingURL=output-editor-factory.js.map