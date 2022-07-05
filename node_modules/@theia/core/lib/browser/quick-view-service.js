"use strict";
/********************************************************************************
 * Copyright (C) 2019 TypeFox and others.
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
exports.QuickViewService = void 0;
var inversify_1 = require("inversify");
var quick_open_1 = require("./quick-open");
var disposable_1 = require("../common/disposable");
var context_key_service_1 = require("./context-key-service");
var QuickViewService = /** @class */ (function () {
    function QuickViewService() {
        // hiddenItemLabels contains item labels hidden from Quick View
        this.hiddenItemLabels = new Set();
        this.prefix = 'view ';
        this.description = 'Open View';
        this.items = [];
    }
    QuickViewService.prototype.registerItem = function (item) {
        var _this = this;
        var quickOpenItem = Object.assign(new quick_open_1.QuickOpenItem({
            label: item.label,
            run: function (mode) {
                if (mode !== quick_open_1.QuickOpenMode.OPEN) {
                    return false;
                }
                item.open();
                return true;
            }
        }), { when: item.when });
        this.items.push(quickOpenItem);
        this.items.sort(function (a, b) { return a.getLabel().localeCompare(b.getLabel()); });
        return disposable_1.Disposable.create(function () {
            var index = _this.items.indexOf(quickOpenItem);
            if (index !== -1) {
                _this.items.splice(index, 1);
            }
        });
    };
    QuickViewService.prototype.hideItem = function (label) {
        this.hiddenItemLabels.add(label);
    };
    QuickViewService.prototype.showItem = function (label) {
        this.hiddenItemLabels.delete(label);
    };
    QuickViewService.prototype.getModel = function () {
        return this;
    };
    QuickViewService.prototype.getOptions = function () {
        return {
            skipPrefix: this.prefix.length,
            fuzzyMatchLabel: true
        };
    };
    QuickViewService.prototype.onType = function (_, acceptor) {
        var _this = this;
        var items = this.items.filter(function (item) {
            return (item.when === undefined || _this.contextKexService.match(item.when)) &&
                (!_this.hiddenItemLabels.has(item.getLabel()));
        });
        acceptor(items);
    };
    QuickViewService.prototype.registerQuickOpenHandlers = function (handlers) {
        handlers.registerHandler(this);
    };
    __decorate([
        inversify_1.inject(context_key_service_1.ContextKeyService),
        __metadata("design:type", context_key_service_1.ContextKeyService)
    ], QuickViewService.prototype, "contextKexService", void 0);
    QuickViewService = __decorate([
        inversify_1.injectable()
    ], QuickViewService);
    return QuickViewService;
}());
exports.QuickViewService = QuickViewService;
//# sourceMappingURL=quick-view-service.js.map