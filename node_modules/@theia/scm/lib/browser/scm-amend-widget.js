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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScmAmendWidget = void 0;
var inversify_1 = require("inversify");
var common_1 = require("@theia/core/lib/common");
var React = require("react");
var browser_1 = require("@theia/core/lib/browser");
var scm_service_1 = require("./scm-service");
var scm_avatar_service_1 = require("./scm-avatar-service");
var scm_amend_component_1 = require("./scm-amend-component");
var ScmAmendWidget = /** @class */ (function (_super) {
    __extends(ScmAmendWidget, _super);
    function ScmAmendWidget(contextMenuRenderer) {
        var _this = _super.call(this) || this;
        _this.contextMenuRenderer = contextMenuRenderer;
        _this.shouldScrollToRow = true;
        _this.setInputValue = function (event) {
            var repository = _this.scmService.selectedRepository;
            if (repository) {
                repository.input.value = typeof event === 'string' ? event : event.currentTarget.value;
            }
        };
        _this.scrollOptions = {
            suppressScrollX: true,
            minScrollbarLength: 35
        };
        _this.addClass('theia-scm-commit-container');
        _this.id = ScmAmendWidget_1.ID;
        return _this;
    }
    ScmAmendWidget_1 = ScmAmendWidget;
    ScmAmendWidget.prototype.render = function () {
        var repository = this.scmService.selectedRepository;
        if (repository && repository.provider.amendSupport) {
            return React.createElement(scm_amend_component_1.ScmAmendComponent, {
                key: "amend:" + repository.provider.rootUri,
                style: { flexGrow: 0 },
                repository: repository,
                scmAmendSupport: repository.provider.amendSupport,
                setCommitMessage: this.setInputValue,
                avatarService: this.avatarService,
                storageService: this.storageService,
            });
        }
    };
    var ScmAmendWidget_1;
    ScmAmendWidget.ID = 'scm-amend-widget';
    __decorate([
        inversify_1.inject(scm_service_1.ScmService),
        __metadata("design:type", scm_service_1.ScmService)
    ], ScmAmendWidget.prototype, "scmService", void 0);
    __decorate([
        inversify_1.inject(scm_avatar_service_1.ScmAvatarService),
        __metadata("design:type", scm_avatar_service_1.ScmAvatarService)
    ], ScmAmendWidget.prototype, "avatarService", void 0);
    __decorate([
        inversify_1.inject(browser_1.StorageService),
        __metadata("design:type", Object)
    ], ScmAmendWidget.prototype, "storageService", void 0);
    __decorate([
        inversify_1.inject(common_1.SelectionService),
        __metadata("design:type", common_1.SelectionService)
    ], ScmAmendWidget.prototype, "selectionService", void 0);
    __decorate([
        inversify_1.inject(browser_1.LabelProvider),
        __metadata("design:type", browser_1.LabelProvider)
    ], ScmAmendWidget.prototype, "labelProvider", void 0);
    __decorate([
        inversify_1.inject(browser_1.KeybindingRegistry),
        __metadata("design:type", browser_1.KeybindingRegistry)
    ], ScmAmendWidget.prototype, "keybindings", void 0);
    ScmAmendWidget = ScmAmendWidget_1 = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(browser_1.ContextMenuRenderer)),
        __metadata("design:paramtypes", [browser_1.ContextMenuRenderer])
    ], ScmAmendWidget);
    return ScmAmendWidget;
}(browser_1.ReactWidget));
exports.ScmAmendWidget = ScmAmendWidget;
//# sourceMappingURL=scm-amend-widget.js.map