"use strict";
/********************************************************************************
 * Copyright (C) 2020 Alibaba Inc. and others.
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
exports.SidebarBottomMenuWidget = exports.SidebarBottomMenuWidgetFactory = void 0;
var inversify_1 = require("inversify");
var React = require("react");
var widgets_1 = require("../widgets");
var context_menu_renderer_1 = require("../context-menu-renderer");
exports.SidebarBottomMenuWidgetFactory = Symbol('SidebarBottomMenuWidgetFactory');
/**
 * The menu widget placed on the bottom of the sidebar.
 */
var SidebarBottomMenuWidget = /** @class */ (function (_super) {
    __extends(SidebarBottomMenuWidget, _super);
    function SidebarBottomMenuWidget() {
        var _this = _super.call(this) || this;
        _this.menus = [];
        return _this;
    }
    SidebarBottomMenuWidget.prototype.addMenu = function (menu) {
        var exists = this.menus.find(function (m) { return m.id === menu.id; });
        if (exists) {
            return;
        }
        this.menus.push(menu);
        this.update();
    };
    SidebarBottomMenuWidget.prototype.removeMenu = function (menuId) {
        var menu = this.menus.find(function (m) { return m.id === menuId; });
        if (menu) {
            var index = this.menus.indexOf(menu);
            if (index !== -1) {
                this.menus.splice(index, 1);
                this.update();
            }
        }
    };
    SidebarBottomMenuWidget.prototype.onClick = function (e, menuPath) {
        this.contextMenuRenderer.render({
            menuPath: menuPath,
            anchor: {
                x: e.clientX,
                y: e.clientY,
            }
        });
    };
    SidebarBottomMenuWidget.prototype.render = function () {
        var _this = this;
        return React.createElement(React.Fragment, null, this.menus.sort(function (a, b) { return a.order - b.order; }).map(function (menu) { return React.createElement("i", { key: menu.id, className: menu.iconClass, title: menu.title, onClick: function (e) { return _this.onClick(e, menu.menuPath); } }); }));
    };
    __decorate([
        inversify_1.inject(context_menu_renderer_1.ContextMenuRenderer),
        __metadata("design:type", context_menu_renderer_1.ContextMenuRenderer)
    ], SidebarBottomMenuWidget.prototype, "contextMenuRenderer", void 0);
    SidebarBottomMenuWidget = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], SidebarBottomMenuWidget);
    return SidebarBottomMenuWidget;
}(widgets_1.ReactWidget));
exports.SidebarBottomMenuWidget = SidebarBottomMenuWidget;
//# sourceMappingURL=sidebar-bottom-menu-widget.js.map