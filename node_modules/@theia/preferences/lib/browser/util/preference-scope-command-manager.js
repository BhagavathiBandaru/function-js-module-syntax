"use strict";
/********************************************************************************
 * Copyright (C) 2018 Red Hat, Inc. and others.
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
exports.PreferenceScopeCommandManager = exports.FOLDER_SCOPE_MENU_PATH = void 0;
var inversify_1 = require("inversify");
var browser_1 = require("@theia/core/lib/browser");
var common_1 = require("@theia/core/lib/common");
exports.FOLDER_SCOPE_MENU_PATH = ['preferences:scope.menu'];
var PreferenceScopeCommandManager = /** @class */ (function () {
    function PreferenceScopeCommandManager() {
        this.foldersAsCommands = [];
    }
    PreferenceScopeCommandManager.prototype.createFolderWorkspacesMenu = function (folderWorkspaces, currentFolderURI) {
        var _this = this;
        this.foldersAsCommands.forEach(function (folderCommand) {
            _this.menuModelRegistry.unregisterMenuAction(folderCommand, exports.FOLDER_SCOPE_MENU_PATH);
            _this.commandRegistry.unregisterCommand(folderCommand);
        });
        this.foldersAsCommands.length = 0;
        folderWorkspaces.forEach(function (folderWorkspace) {
            var folderLabel = _this.labelProvider.getName(folderWorkspace.resource);
            var iconClass = currentFolderURI === folderWorkspace.resource.toString() ? 'fa fa-check' : '';
            var newFolderAsCommand = {
                id: "preferenceScopeCommand:" + folderWorkspace.resource.toString(),
                label: folderLabel,
                iconClass: iconClass
            };
            _this.foldersAsCommands.push(newFolderAsCommand);
            _this.commandRegistry.registerCommand(newFolderAsCommand, {
                isVisible: function (callback, check) { return check === 'from-tabbar'; },
                isEnabled: function (callback, check) { return check === 'from-tabbar'; },
                execute: function (callback) {
                    callback({ scope: browser_1.PreferenceScope.Folder.toString(), uri: folderWorkspace.resource.toString(), activeScopeIsFolder: 'true' });
                }
            });
            _this.menuModelRegistry.registerMenuAction(exports.FOLDER_SCOPE_MENU_PATH, {
                commandId: newFolderAsCommand.id,
                label: newFolderAsCommand.label
            });
        });
    };
    __decorate([
        inversify_1.inject(common_1.CommandRegistry),
        __metadata("design:type", common_1.CommandRegistry)
    ], PreferenceScopeCommandManager.prototype, "commandRegistry", void 0);
    __decorate([
        inversify_1.inject(common_1.MenuModelRegistry),
        __metadata("design:type", common_1.MenuModelRegistry)
    ], PreferenceScopeCommandManager.prototype, "menuModelRegistry", void 0);
    __decorate([
        inversify_1.inject(browser_1.LabelProvider),
        __metadata("design:type", browser_1.LabelProvider)
    ], PreferenceScopeCommandManager.prototype, "labelProvider", void 0);
    PreferenceScopeCommandManager = __decorate([
        inversify_1.injectable()
    ], PreferenceScopeCommandManager);
    return PreferenceScopeCommandManager;
}());
exports.PreferenceScopeCommandManager = PreferenceScopeCommandManager;
//# sourceMappingURL=preference-scope-command-manager.js.map