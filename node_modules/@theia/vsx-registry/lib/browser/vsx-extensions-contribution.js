"use strict";
/********************************************************************************
 * Copyright (C) 2020 TypeFox and others.
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
exports.VSXExtensionsContribution = exports.VSXExtensionsCommands = void 0;
var inversify_1 = require("inversify");
var command_1 = require("@theia/core/lib/common/command");
var view_contribution_1 = require("@theia/core/lib/browser/shell/view-contribution");
var vsx_extensions_view_container_1 = require("./vsx-extensions-view-container");
var vsx_extensions_model_1 = require("./vsx-extensions-model");
var color_registry_1 = require("@theia/core/lib/browser/color-registry");
var tab_bar_toolbar_1 = require("@theia/core/lib/browser/shell/tab-bar-toolbar");
var common_1 = require("@theia/core/lib/common");
var browser_1 = require("@theia/filesystem/lib/browser");
var browser_2 = require("@theia/core/lib/browser");
var plugin_vscode_commands_contribution_1 = require("@theia/plugin-ext-vscode/lib/browser/plugin-vscode-commands-contribution");
var VSXExtensionsCommands;
(function (VSXExtensionsCommands) {
    VSXExtensionsCommands.CLEAR_ALL = {
        id: 'vsxExtensions.clearAll',
        category: 'Extensions',
        label: 'Clear Search Results',
        iconClass: 'clear-all'
    };
    VSXExtensionsCommands.INSTALL_FROM_VSIX = {
        id: 'vsxExtensions.installFromVSIX',
        category: 'Extensions',
        label: 'Install from VSIX...',
        dialogLabel: 'Install from VSIX'
    };
})(VSXExtensionsCommands = exports.VSXExtensionsCommands || (exports.VSXExtensionsCommands = {}));
var VSXExtensionsContribution = /** @class */ (function (_super) {
    __extends(VSXExtensionsContribution, _super);
    function VSXExtensionsContribution() {
        var _this = _super.call(this, {
            widgetId: vsx_extensions_view_container_1.VSXExtensionsViewContainer.ID,
            widgetName: vsx_extensions_view_container_1.VSXExtensionsViewContainer.LABEL,
            defaultWidgetOptions: {
                area: 'left',
                rank: 500
            },
            toggleCommandId: 'vsxExtensions.toggle',
            toggleKeybinding: 'ctrlcmd+shift+x'
        }) || this;
        /**
         * Register commands to the `More Actions...` extensions toolbar item.
         */
        _this.registerMoreToolbarItem = function (item) {
            var commandId = item.command;
            var id = 'vsxExtensions.tabbar.toolbar.' + commandId;
            var command = _this.commandRegistry.getCommand(commandId);
            _this.commandRegistry.registerCommand({ id: id, iconClass: command && command.iconClass }, {
                execute: function (w) {
                    var _a;
                    var args = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        args[_i - 1] = arguments[_i];
                    }
                    return w instanceof vsx_extensions_view_container_1.VSXExtensionsViewContainer
                        && (_a = _this.commandRegistry).executeCommand.apply(_a, __spread([commandId], args));
                },
                isEnabled: function (w) {
                    var _a;
                    var args = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        args[_i - 1] = arguments[_i];
                    }
                    return w instanceof vsx_extensions_view_container_1.VSXExtensionsViewContainer
                        && (_a = _this.commandRegistry).isEnabled.apply(_a, __spread([commandId], args));
                },
                isVisible: function (w) {
                    var _a;
                    var args = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        args[_i - 1] = arguments[_i];
                    }
                    return w instanceof vsx_extensions_view_container_1.VSXExtensionsViewContainer
                        && (_a = _this.commandRegistry).isVisible.apply(_a, __spread([commandId], args));
                },
                isToggled: function (w) {
                    var _a;
                    var args = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        args[_i - 1] = arguments[_i];
                    }
                    return w instanceof vsx_extensions_view_container_1.VSXExtensionsViewContainer
                        && (_a = _this.commandRegistry).isToggled.apply(_a, __spread([commandId], args));
                },
            });
            item.command = id;
            _this.tabbarToolbarRegistry.registerItem(item);
        };
        return _this;
    }
    VSXExtensionsContribution.prototype.initializeLayout = function (app) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.openView({ activate: false })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    VSXExtensionsContribution.prototype.registerCommands = function (commands) {
        var _this = this;
        _super.prototype.registerCommands.call(this, commands);
        commands.registerCommand(VSXExtensionsCommands.CLEAR_ALL, {
            execute: function (w) { return _this.withWidget(w, function () { return _this.model.search.query = ''; }); },
            isEnabled: function (w) { return _this.withWidget(w, function () { return !!_this.model.search.query; }); },
            isVisible: function (w) { return _this.withWidget(w, function () { return true; }); }
        });
        commands.registerCommand(VSXExtensionsCommands.INSTALL_FROM_VSIX, {
            execute: function () { return _this.installFromVSIX(); }
        });
    };
    VSXExtensionsContribution.prototype.registerToolbarItems = function (registry) {
        registry.registerItem({
            id: VSXExtensionsCommands.CLEAR_ALL.id,
            command: VSXExtensionsCommands.CLEAR_ALL.id,
            tooltip: VSXExtensionsCommands.CLEAR_ALL.label,
            priority: 1,
            onDidChange: this.model.onDidChange
        });
        this.registerMoreToolbarItem({
            id: VSXExtensionsCommands.INSTALL_FROM_VSIX.id,
            command: VSXExtensionsCommands.INSTALL_FROM_VSIX.id,
            tooltip: VSXExtensionsCommands.INSTALL_FROM_VSIX.label,
            group: 'other_1'
        });
    };
    VSXExtensionsContribution.prototype.registerColors = function (colors) {
        // VS Code colors should be aligned with https://code.visualstudio.com/api/references/theme-color#extensions
        colors.register({
            id: 'extensionButton.prominentBackground', defaults: {
                dark: '#327e36',
                light: '#327e36'
            }, description: 'Button background color for actions extension that stand out (e.g. install button).'
        }, {
            id: 'extensionButton.prominentForeground', defaults: {
                dark: color_registry_1.Color.white,
                light: color_registry_1.Color.white
            }, description: 'Button foreground color for actions extension that stand out (e.g. install button).'
        }, {
            id: 'extensionButton.prominentHoverBackground', defaults: {
                dark: '#28632b',
                light: '#28632b'
            }, description: 'Button background hover color for actions extension that stand out (e.g. install button).'
        });
    };
    VSXExtensionsContribution.prototype.withWidget = function (widget, fn) {
        if (widget === void 0) { widget = this.tryGetWidget(); }
        if (widget instanceof vsx_extensions_view_container_1.VSXExtensionsViewContainer && widget.id === vsx_extensions_view_container_1.VSXExtensionsViewContainer.ID) {
            return fn(widget);
        }
        return false;
    };
    /**
     * Installs a local .vsix file after prompting the `Open File` dialog. Resolves to the URI of the file.
     */
    VSXExtensionsContribution.prototype.installFromVSIX = function () {
        return __awaiter(this, void 0, void 0, function () {
            var props, extensionUri, extensionName, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        props = {
                            title: VSXExtensionsCommands.INSTALL_FROM_VSIX.dialogLabel,
                            openLabel: 'Install',
                            filters: { 'VSIX Extensions (*.vsix)': ['vsix'] },
                            canSelectMany: false
                        };
                        return [4 /*yield*/, this.fileDialogService.showOpenDialog(props)];
                    case 1:
                        extensionUri = _a.sent();
                        if (!extensionUri) return [3 /*break*/, 7];
                        if (!(extensionUri.path.ext === '.vsix')) return [3 /*break*/, 6];
                        extensionName = this.labelProvider.getName(extensionUri);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.commandRegistry.executeCommand(plugin_vscode_commands_contribution_1.VscodeCommands.INSTALL_FROM_VSIX.id, extensionUri)];
                    case 3:
                        _a.sent();
                        this.messageService.info("Completed installing " + extensionName + " from VSIX.");
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        this.messageService.error("Failed to install " + extensionName + " from VSIX.");
                        console.warn(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        this.messageService.error('The selected file is not a valid "*.vsix" plugin.');
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        inversify_1.inject(vsx_extensions_model_1.VSXExtensionsModel),
        __metadata("design:type", vsx_extensions_model_1.VSXExtensionsModel)
    ], VSXExtensionsContribution.prototype, "model", void 0);
    __decorate([
        inversify_1.inject(command_1.CommandRegistry),
        __metadata("design:type", command_1.CommandRegistry)
    ], VSXExtensionsContribution.prototype, "commandRegistry", void 0);
    __decorate([
        inversify_1.inject(tab_bar_toolbar_1.TabBarToolbarRegistry),
        __metadata("design:type", tab_bar_toolbar_1.TabBarToolbarRegistry)
    ], VSXExtensionsContribution.prototype, "tabbarToolbarRegistry", void 0);
    __decorate([
        inversify_1.inject(browser_1.FileDialogService),
        __metadata("design:type", Object)
    ], VSXExtensionsContribution.prototype, "fileDialogService", void 0);
    __decorate([
        inversify_1.inject(common_1.MessageService),
        __metadata("design:type", common_1.MessageService)
    ], VSXExtensionsContribution.prototype, "messageService", void 0);
    __decorate([
        inversify_1.inject(browser_2.LabelProvider),
        __metadata("design:type", browser_2.LabelProvider)
    ], VSXExtensionsContribution.prototype, "labelProvider", void 0);
    VSXExtensionsContribution = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], VSXExtensionsContribution);
    return VSXExtensionsContribution;
}(view_contribution_1.AbstractViewContribution));
exports.VSXExtensionsContribution = VSXExtensionsContribution;
//# sourceMappingURL=vsx-extensions-contribution.js.map