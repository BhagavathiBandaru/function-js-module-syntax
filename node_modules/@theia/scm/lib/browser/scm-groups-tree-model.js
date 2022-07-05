"use strict";
/********************************************************************************
 * Copyright (C) 2020 Arm and others.
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
exports.ScmGroupsTreeModel = void 0;
var inversify_1 = require("inversify");
var disposable_1 = require("@theia/core/lib/common/disposable");
var scm_service_1 = require("./scm-service");
var scm_tree_model_1 = require("./scm-tree-model");
var ScmGroupsTreeModel = /** @class */ (function (_super) {
    __extends(ScmGroupsTreeModel, _super);
    function ScmGroupsTreeModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toDisposeOnRepositoryChange = new disposable_1.DisposableCollection();
        return _this;
    }
    ScmGroupsTreeModel.prototype.init = function () {
        var _this = this;
        _super.prototype.init.call(this);
        this.refreshOnRepositoryChange();
        this.toDispose.push(this.scmService.onDidChangeSelectedRepository(function () {
            _this.refreshOnRepositoryChange();
        }));
    };
    ScmGroupsTreeModel.prototype.refreshOnRepositoryChange = function () {
        var repository = this.scmService.selectedRepository;
        if (repository) {
            this.changeRepository(repository.provider);
        }
        else {
            this.changeRepository(undefined);
        }
    };
    ScmGroupsTreeModel.prototype.changeRepository = function (provider) {
        var _this = this;
        this.toDisposeOnRepositoryChange.dispose();
        this.contextKeys.scmProvider.set(provider ? provider.id : undefined);
        this.provider = provider;
        if (provider) {
            this.toDisposeOnRepositoryChange.push(provider.onDidChange(function () { return _this.root = _this.createTree(); }));
            this.root = this.createTree();
        }
    };
    Object.defineProperty(ScmGroupsTreeModel.prototype, "rootUri", {
        get: function () {
            if (this.provider) {
                return this.provider.rootUri;
            }
        },
        enumerable: false,
        configurable: true
    });
    ;
    Object.defineProperty(ScmGroupsTreeModel.prototype, "groups", {
        get: function () {
            if (this.provider) {
                return this.provider.groups;
            }
            else {
                return [];
            }
        },
        enumerable: false,
        configurable: true
    });
    ;
    ScmGroupsTreeModel.prototype.canTabToWidget = function () {
        return !!this.provider;
    };
    __decorate([
        inversify_1.inject(scm_service_1.ScmService),
        __metadata("design:type", scm_service_1.ScmService)
    ], ScmGroupsTreeModel.prototype, "scmService", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ScmGroupsTreeModel.prototype, "init", null);
    ScmGroupsTreeModel = __decorate([
        inversify_1.injectable()
    ], ScmGroupsTreeModel);
    return ScmGroupsTreeModel;
}(scm_tree_model_1.ScmTreeModel));
exports.ScmGroupsTreeModel = ScmGroupsTreeModel;
//# sourceMappingURL=scm-groups-tree-model.js.map