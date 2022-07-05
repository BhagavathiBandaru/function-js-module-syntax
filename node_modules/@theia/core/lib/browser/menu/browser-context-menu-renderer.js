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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserContextMenuRenderer = exports.BrowserContextMenuAccess = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
var inversify_1 = require("inversify");
var context_menu_renderer_1 = require("../context-menu-renderer");
var browser_menu_plugin_1 = require("./browser-menu-plugin");
var BrowserContextMenuAccess = /** @class */ (function (_super) {
    __extends(BrowserContextMenuAccess, _super);
    function BrowserContextMenuAccess(menu) {
        var _this = _super.call(this, menu) || this;
        _this.menu = menu;
        return _this;
    }
    return BrowserContextMenuAccess;
}(context_menu_renderer_1.ContextMenuAccess));
exports.BrowserContextMenuAccess = BrowserContextMenuAccess;
var BrowserContextMenuRenderer = /** @class */ (function (_super) {
    __extends(BrowserContextMenuRenderer, _super);
    function BrowserContextMenuRenderer(menuFactory) {
        var _this = _super.call(this) || this;
        _this.menuFactory = menuFactory;
        return _this;
    }
    BrowserContextMenuRenderer.prototype.doRender = function (_a) {
        var menuPath = _a.menuPath, anchor = _a.anchor, args = _a.args, onHide = _a.onHide;
        var contextMenu = this.menuFactory.createContextMenu(menuPath, args);
        var _b = anchor instanceof MouseEvent ? { x: anchor.clientX, y: anchor.clientY } : anchor, x = _b.x, y = _b.y;
        if (onHide) {
            contextMenu.aboutToClose.connect(function () { return onHide(); });
        }
        contextMenu.open(x, y);
        return new BrowserContextMenuAccess(contextMenu);
    };
    BrowserContextMenuRenderer = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(browser_menu_plugin_1.BrowserMainMenuFactory)),
        __metadata("design:paramtypes", [browser_menu_plugin_1.BrowserMainMenuFactory])
    ], BrowserContextMenuRenderer);
    return BrowserContextMenuRenderer;
}(context_menu_renderer_1.ContextMenuRenderer));
exports.BrowserContextMenuRenderer = BrowserContextMenuRenderer;
//# sourceMappingURL=browser-context-menu-renderer.js.map