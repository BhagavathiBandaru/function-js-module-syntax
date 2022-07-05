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
exports.ScmFileChangeLabelProvider = void 0;
var inversify_1 = require("inversify");
var label_provider_1 = require("@theia/core/lib/browser/label-provider");
var scm_file_change_node_1 = require("./scm-file-change-node");
var uri_1 = require("@theia/core/lib/common/uri");
var scm_service_1 = require("@theia/scm/lib/browser/scm-service");
var ScmFileChangeLabelProvider = /** @class */ (function () {
    function ScmFileChangeLabelProvider() {
    }
    ScmFileChangeLabelProvider.prototype.canHandle = function (element) {
        return scm_file_change_node_1.ScmFileChangeNode.is(element) ? 100 : 0;
    };
    ScmFileChangeLabelProvider.prototype.getIcon = function (node) {
        return this.labelProvider.getIcon(new uri_1.default(node.fileChange.uri));
    };
    ScmFileChangeLabelProvider.prototype.getName = function (node) {
        return this.labelProvider.getName(new uri_1.default(node.fileChange.uri));
    };
    ScmFileChangeLabelProvider.prototype.getDescription = function (node) {
        return this.relativePath(new uri_1.default(node.fileChange.uri).parent);
    };
    ScmFileChangeLabelProvider.prototype.affects = function (node, event) {
        return event.affects(new uri_1.default(node.fileChange.uri));
    };
    ScmFileChangeLabelProvider.prototype.getCaption = function (node) {
        return node.fileChange.getCaption();
    };
    ScmFileChangeLabelProvider.prototype.relativePath = function (uri) {
        var parsedUri = typeof uri === 'string' ? new uri_1.default(uri) : uri;
        var repo = this.scmService.findRepository(parsedUri);
        if (repo) {
            var repositoryUri = new uri_1.default(repo.provider.rootUri);
            var relativePath = repositoryUri.relative(parsedUri);
            if (relativePath) {
                return relativePath.toString();
            }
        }
        return this.labelProvider.getLongName(parsedUri);
    };
    ScmFileChangeLabelProvider.prototype.getStatusCaption = function (node) {
        return node.fileChange.getStatusCaption();
    };
    __decorate([
        inversify_1.inject(label_provider_1.LabelProvider),
        __metadata("design:type", label_provider_1.LabelProvider)
    ], ScmFileChangeLabelProvider.prototype, "labelProvider", void 0);
    __decorate([
        inversify_1.inject(scm_service_1.ScmService),
        __metadata("design:type", scm_service_1.ScmService)
    ], ScmFileChangeLabelProvider.prototype, "scmService", void 0);
    ScmFileChangeLabelProvider = __decorate([
        inversify_1.injectable()
    ], ScmFileChangeLabelProvider);
    return ScmFileChangeLabelProvider;
}());
exports.ScmFileChangeLabelProvider = ScmFileChangeLabelProvider;
//# sourceMappingURL=scm-file-change-label-provider.js.map