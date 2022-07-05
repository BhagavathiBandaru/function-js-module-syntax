"use strict";
/********************************************************************************
 * Copyright (C) 2020 Ericsson and others.
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugTabBarDecorator = void 0;
var inversify_1 = require("inversify");
var debug_session_manager_1 = require("./debug-session-manager");
var debug_widget_1 = require("./view/debug-widget");
var event_1 = require("@theia/core/lib/common/event");
var common_1 = require("@theia/core/lib/common");
var DebugTabBarDecorator = /** @class */ (function () {
    function DebugTabBarDecorator() {
        this.id = 'theia-debug-tabbar-decorator';
        this.emitter = new event_1.Emitter();
        this.toDispose = new common_1.DisposableCollection();
    }
    DebugTabBarDecorator.prototype.init = function () {
        var _this = this;
        this.toDispose.pushAll([
            this.debugSessionManager.onDidStartDebugSession(function () { return _this.fireDidChangeDecorations(); }),
            this.debugSessionManager.onDidDestroyDebugSession(function () { return _this.fireDidChangeDecorations(); })
        ]);
    };
    DebugTabBarDecorator.prototype.decorate = function (title) {
        return (title.owner.id === debug_widget_1.DebugWidget.ID)
            ? [{ badge: this.debugSessionManager.sessions.length }]
            : [];
    };
    Object.defineProperty(DebugTabBarDecorator.prototype, "onDidChangeDecorations", {
        get: function () {
            return this.emitter.event;
        },
        enumerable: false,
        configurable: true
    });
    DebugTabBarDecorator.prototype.fireDidChangeDecorations = function () {
        this.emitter.fire(undefined);
    };
    __decorate([
        inversify_1.inject(debug_session_manager_1.DebugSessionManager),
        __metadata("design:type", debug_session_manager_1.DebugSessionManager)
    ], DebugTabBarDecorator.prototype, "debugSessionManager", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DebugTabBarDecorator.prototype, "init", null);
    DebugTabBarDecorator = __decorate([
        inversify_1.injectable()
    ], DebugTabBarDecorator);
    return DebugTabBarDecorator;
}());
exports.DebugTabBarDecorator = DebugTabBarDecorator;
//# sourceMappingURL=debug-tab-bar-decorator.js.map