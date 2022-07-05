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
exports.VSXExtensionsWidget = exports.VSXExtensionsWidgetOptions = void 0;
var inversify_1 = require("inversify");
var source_tree_1 = require("@theia/core/lib/browser/source-tree");
var vsx_extensions_source_1 = require("./vsx-extensions-source");
var VSXExtensionsWidgetOptions = /** @class */ (function (_super) {
    __extends(VSXExtensionsWidgetOptions, _super);
    function VSXExtensionsWidgetOptions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VSXExtensionsWidgetOptions = __decorate([
        inversify_1.injectable()
    ], VSXExtensionsWidgetOptions);
    return VSXExtensionsWidgetOptions;
}(vsx_extensions_source_1.VSXExtensionsSourceOptions));
exports.VSXExtensionsWidgetOptions = VSXExtensionsWidgetOptions;
var VSXExtensionsWidget = /** @class */ (function (_super) {
    __extends(VSXExtensionsWidget, _super);
    function VSXExtensionsWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VSXExtensionsWidget_1 = VSXExtensionsWidget;
    VSXExtensionsWidget.createWidget = function (parent, options) {
        var child = source_tree_1.SourceTreeWidget.createContainer(parent, {
            virtualized: false,
            scrollIfActive: true
        });
        child.bind(vsx_extensions_source_1.VSXExtensionsSourceOptions).toConstantValue(options);
        child.bind(vsx_extensions_source_1.VSXExtensionsSource).toSelf();
        child.unbind(source_tree_1.SourceTreeWidget);
        child.bind(VSXExtensionsWidgetOptions).toConstantValue(options);
        child.bind(VSXExtensionsWidget_1).toSelf();
        return child.get(VSXExtensionsWidget_1);
    };
    VSXExtensionsWidget.prototype.init = function () {
        _super.prototype.init.call(this);
        this.addClass('theia-vsx-extensions');
        this.id = VSXExtensionsWidget_1.ID + ':' + this.options.id;
        var title = this.computeTitle();
        this.title.label = title;
        this.title.caption = title;
        this.toDispose.push(this.extensionsSource);
        this.source = this.extensionsSource;
    };
    VSXExtensionsWidget.prototype.computeTitle = function () {
        if (this.id === VSXExtensionsWidget_1.INSTALLED_ID) {
            return 'Installed';
        }
        if (this.id === VSXExtensionsWidget_1.BUILT_IN_ID) {
            return 'Built-in';
        }
        return 'Open VSX Registry';
    };
    var VSXExtensionsWidget_1;
    VSXExtensionsWidget.ID = 'vsx-extensions';
    VSXExtensionsWidget.INSTALLED_ID = VSXExtensionsWidget_1.ID + ':' + vsx_extensions_source_1.VSXExtensionsSourceOptions.INSTALLED;
    VSXExtensionsWidget.SEARCH_RESULT_ID = VSXExtensionsWidget_1.ID + ':' + vsx_extensions_source_1.VSXExtensionsSourceOptions.SEARCH_RESULT;
    VSXExtensionsWidget.BUILT_IN_ID = VSXExtensionsWidget_1.ID + ':' + vsx_extensions_source_1.VSXExtensionsSourceOptions.BUILT_IN;
    __decorate([
        inversify_1.inject(VSXExtensionsWidgetOptions),
        __metadata("design:type", VSXExtensionsWidgetOptions)
    ], VSXExtensionsWidget.prototype, "options", void 0);
    __decorate([
        inversify_1.inject(vsx_extensions_source_1.VSXExtensionsSource),
        __metadata("design:type", vsx_extensions_source_1.VSXExtensionsSource)
    ], VSXExtensionsWidget.prototype, "extensionsSource", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], VSXExtensionsWidget.prototype, "init", null);
    VSXExtensionsWidget = VSXExtensionsWidget_1 = __decorate([
        inversify_1.injectable()
    ], VSXExtensionsWidget);
    return VSXExtensionsWidget;
}(source_tree_1.SourceTreeWidget));
exports.VSXExtensionsWidget = VSXExtensionsWidget;
//# sourceMappingURL=vsx-extensions-widget.js.map