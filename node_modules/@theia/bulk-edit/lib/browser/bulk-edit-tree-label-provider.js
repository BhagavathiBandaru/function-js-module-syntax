"use strict";
/********************************************************************************
 * Copyright (c) 2021 SAP SE or an SAP affiliate company and others.
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
exports.BulkEditTreeLabelProvider = void 0;
var inversify_1 = require("inversify");
var label_provider_1 = require("@theia/core/lib/browser/label-provider");
var bulk_edit_tree_1 = require("./bulk-edit-tree");
var tree_label_provider_1 = require("@theia/core/lib/browser/tree/tree-label-provider");
var browser_1 = require("@theia/workspace/lib/browser");
var BulkEditTreeLabelProvider = /** @class */ (function () {
    function BulkEditTreeLabelProvider() {
    }
    BulkEditTreeLabelProvider.prototype.canHandle = function (element) {
        return bulk_edit_tree_1.BulkEditInfoNode.is(element) ?
            this.treeLabelProvider.canHandle(element) + 1 :
            0;
    };
    BulkEditTreeLabelProvider.prototype.getIcon = function (node) {
        return this.labelProvider.getIcon(node.uri);
    };
    BulkEditTreeLabelProvider.prototype.getName = function (node) {
        return this.labelProvider.getName(node.uri);
    };
    BulkEditTreeLabelProvider.prototype.getLongName = function (node) {
        var description = [];
        var rootUri = this.workspaceService.getWorkspaceRootUri(node.uri);
        // In a multiple-root workspace include the root name to the label before the parent directory.
        if (this.workspaceService.isMultiRootWorkspaceOpened && rootUri) {
            description.push(this.labelProvider.getName(rootUri));
        }
        // If the given resource is not at the workspace root, include the parent directory to the label.
        if ((rootUri === null || rootUri === void 0 ? void 0 : rootUri.toString()) !== node.uri.parent.toString()) {
            description.push(this.labelProvider.getLongName(node.uri.parent));
        }
        return description.join(' ● ');
    };
    BulkEditTreeLabelProvider.prototype.getDescription = function (node) {
        return this.labelProvider.getLongName(node.uri.parent);
    };
    BulkEditTreeLabelProvider.prototype.affects = function (node, event) {
        return event.affects(node.uri) || event.affects(node.uri.parent);
    };
    __decorate([
        inversify_1.inject(label_provider_1.LabelProvider),
        __metadata("design:type", label_provider_1.LabelProvider)
    ], BulkEditTreeLabelProvider.prototype, "labelProvider", void 0);
    __decorate([
        inversify_1.inject(tree_label_provider_1.TreeLabelProvider),
        __metadata("design:type", tree_label_provider_1.TreeLabelProvider)
    ], BulkEditTreeLabelProvider.prototype, "treeLabelProvider", void 0);
    __decorate([
        inversify_1.inject(browser_1.WorkspaceService),
        __metadata("design:type", browser_1.WorkspaceService)
    ], BulkEditTreeLabelProvider.prototype, "workspaceService", void 0);
    BulkEditTreeLabelProvider = __decorate([
        inversify_1.injectable()
    ], BulkEditTreeLabelProvider);
    return BulkEditTreeLabelProvider;
}());
exports.BulkEditTreeLabelProvider = BulkEditTreeLabelProvider;
//# sourceMappingURL=bulk-edit-tree-label-provider.js.map