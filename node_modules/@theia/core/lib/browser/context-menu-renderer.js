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
exports.RenderContextMenuOptions = exports.ContextMenuRenderer = exports.ContextMenuAccess = exports.toAnchor = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
var inversify_1 = require("inversify");
var disposable_1 = require("../common/disposable");
function toAnchor(anchor) {
    return anchor instanceof HTMLElement ? { x: anchor.offsetLeft, y: anchor.offsetTop } : anchor;
}
exports.toAnchor = toAnchor;
var ContextMenuAccess = /** @class */ (function () {
    function ContextMenuAccess(toClose) {
        this.toDispose = new disposable_1.DisposableCollection();
        this.onDispose = this.toDispose.onDispose;
        this.toDispose.push(toClose);
    }
    Object.defineProperty(ContextMenuAccess.prototype, "disposed", {
        get: function () {
            return this.toDispose.disposed;
        },
        enumerable: false,
        configurable: true
    });
    ContextMenuAccess.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    return ContextMenuAccess;
}());
exports.ContextMenuAccess = ContextMenuAccess;
var ContextMenuRenderer = /** @class */ (function () {
    function ContextMenuRenderer() {
        this.toDisposeOnSetCurrent = new disposable_1.DisposableCollection();
    }
    Object.defineProperty(ContextMenuRenderer.prototype, "current", {
        /**
         * Currently opened context menu.
         * Rendering a new context menu will close the current.
         */
        get: function () {
            return this._current;
        },
        enumerable: false,
        configurable: true
    });
    ContextMenuRenderer.prototype.setCurrent = function (current) {
        var _this = this;
        if (this._current === current) {
            return;
        }
        this.toDisposeOnSetCurrent.dispose();
        this._current = current;
        if (current) {
            this.toDisposeOnSetCurrent.push(current.onDispose(function () {
                _this._current = undefined;
            }));
            this.toDisposeOnSetCurrent.push(current);
        }
    };
    ContextMenuRenderer.prototype.render = function (menuPathOrOptions, anchor, onHide) {
        var resolvedOptions = RenderContextMenuOptions.resolve(menuPathOrOptions, anchor, onHide);
        var access = this.doRender(resolvedOptions);
        this.setCurrent(access);
        return access;
    };
    ContextMenuRenderer = __decorate([
        inversify_1.injectable()
    ], ContextMenuRenderer);
    return ContextMenuRenderer;
}());
exports.ContextMenuRenderer = ContextMenuRenderer;
var RenderContextMenuOptions;
(function (RenderContextMenuOptions) {
    function resolve(menuPathOrOptions, anchor, onHide) {
        var menuPath;
        var args;
        if (Array.isArray(menuPathOrOptions)) {
            menuPath = menuPathOrOptions;
            args = [anchor];
        }
        else {
            menuPath = menuPathOrOptions.menuPath;
            anchor = menuPathOrOptions.anchor;
            onHide = menuPathOrOptions.onHide;
            args = menuPathOrOptions.args ? __spread(menuPathOrOptions.args, [anchor]) : [anchor];
        }
        return {
            menuPath: menuPath,
            anchor: anchor,
            onHide: onHide,
            args: args
        };
    }
    RenderContextMenuOptions.resolve = resolve;
})(RenderContextMenuOptions = exports.RenderContextMenuOptions || (exports.RenderContextMenuOptions = {}));
//# sourceMappingURL=context-menu-renderer.js.map