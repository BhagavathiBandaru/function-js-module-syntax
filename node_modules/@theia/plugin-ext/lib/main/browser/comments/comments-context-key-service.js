"use strict";
/********************************************************************************
 * Copyright (C) 2020 Red Hat, Inc. and others.
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
exports.CommentsContextKeyService = void 0;
var inversify_1 = require("inversify");
var context_key_service_1 = require("@theia/core/lib/browser/context-key-service");
var common_1 = require("@theia/core/lib/common");
var CommentsContextKeyService = /** @class */ (function () {
    function CommentsContextKeyService() {
        this.contextKeys = new Set();
        this.onDidChangeEmitter = new common_1.Emitter();
        this.onDidChange = this.onDidChangeEmitter.event;
    }
    Object.defineProperty(CommentsContextKeyService.prototype, "commentController", {
        get: function () {
            return this._commentController;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommentsContextKeyService.prototype, "comment", {
        get: function () {
            return this._comment;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommentsContextKeyService.prototype, "commentIsEmpty", {
        get: function () {
            return this._commentIsEmpty;
        },
        enumerable: false,
        configurable: true
    });
    CommentsContextKeyService.prototype.init = function () {
        var _this = this;
        this.contextKeys.add('commentIsEmpty');
        this._commentController = this.contextKeyService.createKey('commentController', undefined);
        this._comment = this.contextKeyService.createKey('comment', undefined);
        this._commentIsEmpty = this.contextKeyService.createKey('commentIsEmpty', true);
        this.contextKeyService.onDidChange(function (event) {
            if (event.affects(_this.contextKeys)) {
                _this.onDidChangeEmitter.fire();
            }
        });
    };
    CommentsContextKeyService.prototype.setExpression = function (expression) {
        var _this = this;
        this.contextKeyService.parseKeys(expression).forEach(function (key) {
            _this.contextKeys.add(key);
        });
    };
    CommentsContextKeyService.prototype.match = function (expression) {
        return !expression || this.contextKeyService.match(expression);
    };
    __decorate([
        inversify_1.inject(context_key_service_1.ContextKeyService),
        __metadata("design:type", context_key_service_1.ContextKeyService)
    ], CommentsContextKeyService.prototype, "contextKeyService", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], CommentsContextKeyService.prototype, "init", null);
    CommentsContextKeyService = __decorate([
        inversify_1.injectable()
    ], CommentsContextKeyService);
    return CommentsContextKeyService;
}());
exports.CommentsContextKeyService = CommentsContextKeyService;
//# sourceMappingURL=comments-context-key-service.js.map