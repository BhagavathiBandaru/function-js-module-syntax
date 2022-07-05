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
exports.ScmTabBarDecorator = void 0;
var inversify_1 = require("inversify");
var event_1 = require("@theia/core/lib/common/event");
var scm_contribution_1 = require("../scm-contribution");
var scm_service_1 = require("../scm-service");
var disposable_1 = require("@theia/core/lib/common/disposable");
var ScmTabBarDecorator = /** @class */ (function () {
    function ScmTabBarDecorator() {
        this.id = 'theia-scm-tabbar-decorator';
        this.emitter = new event_1.Emitter();
        this.toDispose = new disposable_1.DisposableCollection();
        this.toDisposeOnDidChange = new disposable_1.DisposableCollection();
    }
    ScmTabBarDecorator.prototype.init = function () {
        var _this = this;
        this.toDispose.push(this.scmService.onDidChangeSelectedRepository(function (repository) {
            _this.toDisposeOnDidChange.dispose();
            if (repository) {
                _this.toDisposeOnDidChange.push(repository.provider.onDidChange(function () { return _this.fireDidChangeDecorations(); }));
            }
            _this.fireDidChangeDecorations();
        }));
    };
    ScmTabBarDecorator.prototype.decorate = function (title) {
        if (title.owner.id === scm_contribution_1.SCM_VIEW_CONTAINER_ID) {
            var changes = this.collectChangesCount();
            return changes > 0 ? [{ badge: changes }] : [];
        }
        else {
            return [];
        }
    };
    ScmTabBarDecorator.prototype.collectChangesCount = function () {
        var repository = this.scmService.selectedRepository;
        var changes = 0;
        if (!repository) {
            return 0;
        }
        repository.provider.groups.map(function (group) {
            if (group.id === 'index' || group.id === 'workingTree') {
                changes += group.resources.length;
            }
        });
        return changes;
    };
    Object.defineProperty(ScmTabBarDecorator.prototype, "onDidChangeDecorations", {
        get: function () {
            return this.emitter.event;
        },
        enumerable: false,
        configurable: true
    });
    ScmTabBarDecorator.prototype.fireDidChangeDecorations = function () {
        this.emitter.fire(undefined);
    };
    __decorate([
        inversify_1.inject(scm_service_1.ScmService),
        __metadata("design:type", scm_service_1.ScmService)
    ], ScmTabBarDecorator.prototype, "scmService", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ScmTabBarDecorator.prototype, "init", null);
    ScmTabBarDecorator = __decorate([
        inversify_1.injectable()
    ], ScmTabBarDecorator);
    return ScmTabBarDecorator;
}());
exports.ScmTabBarDecorator = ScmTabBarDecorator;
//# sourceMappingURL=scm-tab-bar-decorator.js.map