"use strict";
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.ScmContribution = exports.ScmColors = exports.SCM_COMMANDS = exports.SCM_VIEW_CONTAINER_TITLE_OPTIONS = exports.SCM_VIEW_CONTAINER_ID = exports.SCM_WIDGET_FACTORY_ID = void 0;
/********************************************************************************
 * Copyright (C) 2019 Red Hat, Inc. and others.
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
var inversify_1 = require("inversify");
var event_1 = require("@theia/core/lib/common/event");
var algorithm_1 = require("@phosphor/algorithm");
var browser_1 = require("@theia/core/lib/browser");
var common_1 = require("@theia/core/lib/common");
var context_key_service_1 = require("@theia/core/lib/browser/context-key-service");
var scm_service_1 = require("./scm-service");
var scm_widget_1 = require("../browser/scm-widget");
var uri_1 = require("@theia/core/lib/common/uri");
var scm_quick_open_service_1 = require("./scm-quick-open-service");
var color_registry_1 = require("@theia/core/lib/browser/color-registry");
exports.SCM_WIDGET_FACTORY_ID = scm_widget_1.ScmWidget.ID;
exports.SCM_VIEW_CONTAINER_ID = 'scm-view-container';
exports.SCM_VIEW_CONTAINER_TITLE_OPTIONS = {
    label: 'Source Control',
    iconClass: 'scm-tab-icon',
    closeable: true
};
var SCM_COMMANDS;
(function (SCM_COMMANDS) {
    SCM_COMMANDS.CHANGE_REPOSITORY = {
        id: 'scm.change.repository',
        category: 'SCM',
        label: 'Change Repository...'
    };
    SCM_COMMANDS.ACCEPT_INPUT = {
        id: 'scm.acceptInput'
    };
    SCM_COMMANDS.TREE_VIEW_MODE = {
        id: 'scm.viewmode.tree',
        tooltip: 'Toggle to Tree View',
        iconClass: 'codicon codicon-list-tree',
        label: 'Toggle to Tree View',
    };
    SCM_COMMANDS.LIST_VIEW_MODE = {
        id: 'scm.viewmode.list',
        tooltip: 'Toggle to List View',
        iconClass: 'codicon codicon-list-flat',
        label: 'Toggle to List View',
    };
    SCM_COMMANDS.COLLAPSE_ALL = {
        id: 'scm.collapseAll',
        category: 'SCM',
        tooltip: 'Collapse All',
        iconClass: 'codicon codicon-collapse-all',
        label: 'Collapse All',
    };
})(SCM_COMMANDS = exports.SCM_COMMANDS || (exports.SCM_COMMANDS = {}));
var ScmColors;
(function (ScmColors) {
    ScmColors.editorGutterModifiedBackground = 'editorGutter.modifiedBackground';
    ScmColors.editorGutterAddedBackground = 'editorGutter.addedBackground';
    ScmColors.editorGutterDeletedBackground = 'editorGutter.deletedBackground';
})(ScmColors = exports.ScmColors || (exports.ScmColors = {}));
var ScmContribution = /** @class */ (function (_super) {
    __extends(ScmContribution, _super);
    function ScmContribution() {
        var _this = _super.call(this, {
            viewContainerId: exports.SCM_VIEW_CONTAINER_ID,
            widgetId: exports.SCM_WIDGET_FACTORY_ID,
            widgetName: 'Source Control',
            defaultWidgetOptions: {
                area: 'left',
                rank: 300
            },
            toggleCommandId: 'scmView:toggle',
            toggleKeybinding: 'ctrlcmd+shift+g'
        }) || this;
        _this.statusBarDisposable = new common_1.DisposableCollection();
        return _this;
    }
    ScmContribution.prototype.init = function () {
        this.scmFocus = this.contextKeys.createKey('scmFocus', false);
    };
    ScmContribution.prototype.initializeLayout = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.openView()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ScmContribution.prototype.onStart = function () {
        var _this = this;
        this.updateStatusBar();
        this.scmService.onDidAddRepository(function () { return _this.updateStatusBar(); });
        this.scmService.onDidRemoveRepository(function () { return _this.updateStatusBar(); });
        this.scmService.onDidChangeSelectedRepository(function () { return _this.updateStatusBar(); });
        this.scmService.onDidChangeStatusBarCommands(function () { return _this.updateStatusBar(); });
        this.labelProvider.onDidChange(function () { return _this.updateStatusBar(); });
        this.updateContextKeys();
        this.shell.currentChanged.connect(function () { return _this.updateContextKeys(); });
    };
    ScmContribution.prototype.updateContextKeys = function () {
        this.scmFocus.set(this.shell.currentWidget instanceof scm_widget_1.ScmWidget);
    };
    ScmContribution.prototype.registerCommands = function (commandRegistry) {
        var _this = this;
        _super.prototype.registerCommands.call(this, commandRegistry);
        commandRegistry.registerCommand(SCM_COMMANDS.CHANGE_REPOSITORY, {
            execute: function () { return _this.scmQuickOpenService.changeRepository(); },
            isEnabled: function () { return _this.scmService.repositories.length > 1; }
        });
        commandRegistry.registerCommand(SCM_COMMANDS.ACCEPT_INPUT, {
            execute: function () { return _this.acceptInput(); },
            isEnabled: function () { return !!_this.scmFocus.get() && !!_this.acceptInputCommand(); }
        });
    };
    ScmContribution.prototype.registerToolbarItems = function (registry) {
        var _this = this;
        var viewModeEmitter = new event_1.Emitter();
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        var extractScmWidget = function (widget) {
            if (widget instanceof browser_1.ViewContainer) {
                var layout = widget.containerLayout;
                var scmWidgetPart = algorithm_1.find(layout.iter(), function (part) { return part.wrapped instanceof scm_widget_1.ScmWidget; });
                if (scmWidgetPart && scmWidgetPart.wrapped instanceof scm_widget_1.ScmWidget) {
                    return scmWidgetPart.wrapped;
                }
            }
        };
        var registerToggleViewItem = function (command, mode) {
            var id = command.id;
            var item = {
                id: id,
                command: id,
                tooltip: command.label,
                onDidChange: viewModeEmitter.event
            };
            _this.commandRegistry.registerCommand({ id: id, iconClass: command && command.iconClass }, {
                execute: function (widget) {
                    var scmWidget = extractScmWidget(widget);
                    if (scmWidget) {
                        scmWidget.viewMode = mode;
                        viewModeEmitter.fire();
                    }
                },
                isVisible: function (widget) {
                    var scmWidget = extractScmWidget(widget);
                    if (scmWidget) {
                        return !!_this.scmService.selectedRepository
                            && scmWidget.viewMode !== mode;
                    }
                    return false;
                },
            });
            registry.registerItem(item);
        };
        registerToggleViewItem(SCM_COMMANDS.TREE_VIEW_MODE, 'tree');
        registerToggleViewItem(SCM_COMMANDS.LIST_VIEW_MODE, 'list');
        this.commandRegistry.registerCommand(SCM_COMMANDS.COLLAPSE_ALL, {
            execute: function (widget) {
                var scmWidget = extractScmWidget(widget);
                if (scmWidget && scmWidget.viewMode === 'tree') {
                    scmWidget.collapseScmTree();
                }
            },
            isVisible: function (widget) {
                var scmWidget = extractScmWidget(widget);
                if (scmWidget) {
                    return !!_this.scmService.selectedRepository && scmWidget.viewMode === 'tree';
                }
                return false;
            }
        });
        registry.registerItem(__assign(__assign({}, SCM_COMMANDS.COLLAPSE_ALL), { command: SCM_COMMANDS.COLLAPSE_ALL.id }));
    };
    ScmContribution.prototype.registerKeybindings = function (keybindings) {
        _super.prototype.registerKeybindings.call(this, keybindings);
        keybindings.registerKeybinding({
            command: SCM_COMMANDS.ACCEPT_INPUT.id,
            keybinding: 'ctrlcmd+enter',
            when: 'scmFocus'
        });
    };
    ScmContribution.prototype.acceptInput = function () {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        command = this.acceptInputCommand();
                        if (!(command && command.command)) return [3 /*break*/, 2];
                        return [4 /*yield*/, (_a = this.commands).executeCommand.apply(_a, __spread([command.command], command.arguments ? command.arguments : []))];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    ScmContribution.prototype.acceptInputCommand = function () {
        var repository = this.scmService.selectedRepository;
        if (!repository) {
            return undefined;
        }
        return repository.provider.acceptInputCommand;
    };
    ScmContribution.prototype.updateStatusBar = function () {
        var _this = this;
        this.statusBarDisposable.dispose();
        var repository = this.scmService.selectedRepository;
        if (!repository) {
            return;
        }
        var name = this.labelProvider.getName(new uri_1.default(repository.provider.rootUri));
        if (this.scmService.repositories.length > 1) {
            this.setStatusBarEntry(SCM_COMMANDS.CHANGE_REPOSITORY.id, {
                text: "$(database) " + name,
                tooltip: name.toString(),
                command: SCM_COMMANDS.CHANGE_REPOSITORY.id,
                alignment: browser_1.StatusBarAlignment.LEFT,
                priority: 100
            });
        }
        var label = repository.provider.rootUri ? name + " (" + repository.provider.label + ")" : repository.provider.label;
        this.scmService.statusBarCommands.forEach(function (value, index) { return _this.setStatusBarEntry("scm.status." + index, {
            text: value.title,
            tooltip: label + (value.tooltip ? " - " + value.tooltip : ''),
            command: value.command,
            arguments: value.arguments,
            alignment: browser_1.StatusBarAlignment.LEFT,
            priority: 100
        }); });
    };
    ScmContribution.prototype.setStatusBarEntry = function (id, entry) {
        var _this = this;
        this.statusBar.setElement(id, entry);
        this.statusBarDisposable.push(common_1.Disposable.create(function () { return _this.statusBar.removeElement(id); }));
    };
    /**
     * It should be aligned with https://github.com/microsoft/vscode/blob/0dfa355b3ad185a6289ba28a99c141ab9e72d2be/src/vs/workbench/contrib/scm/browser/dirtydiffDecorator.ts#L808
     */
    ScmContribution.prototype.registerColors = function (colors) {
        colors.register({
            id: ScmColors.editorGutterModifiedBackground, defaults: {
                dark: color_registry_1.Color.rgba(12, 125, 157),
                light: color_registry_1.Color.rgba(102, 175, 224),
                hc: color_registry_1.Color.rgba(0, 155, 249)
            }, description: 'Editor gutter background color for lines that are modified.'
        }, {
            id: ScmColors.editorGutterAddedBackground, defaults: {
                dark: color_registry_1.Color.rgba(88, 124, 12),
                light: color_registry_1.Color.rgba(129, 184, 139),
                hc: color_registry_1.Color.rgba(51, 171, 78)
            }, description: 'Editor gutter background color for lines that are added.'
        }, {
            id: ScmColors.editorGutterDeletedBackground, defaults: {
                dark: color_registry_1.Color.rgba(148, 21, 27),
                light: color_registry_1.Color.rgba(202, 75, 81),
                hc: color_registry_1.Color.rgba(252, 93, 109)
            }, description: 'Editor gutter background color for lines that are deleted.'
        }, {
            id: 'minimapGutter.modifiedBackground', defaults: {
                dark: color_registry_1.Color.rgba(12, 125, 157),
                light: color_registry_1.Color.rgba(102, 175, 224),
                hc: color_registry_1.Color.rgba(0, 155, 249)
            }, description: 'Minimap gutter background color for lines that are modified.'
        }, {
            id: 'minimapGutter.addedBackground',
            defaults: {
                dark: color_registry_1.Color.rgba(88, 124, 12),
                light: color_registry_1.Color.rgba(129, 184, 139),
                hc: color_registry_1.Color.rgba(51, 171, 78)
            }, description: 'Minimap gutter background color for lines that are added.'
        }, {
            id: 'minimapGutter.deletedBackground', defaults: {
                dark: color_registry_1.Color.rgba(148, 21, 27),
                light: color_registry_1.Color.rgba(202, 75, 81),
                hc: color_registry_1.Color.rgba(252, 93, 109)
            }, description: 'Minimap gutter background color for lines that are deleted.'
        }, {
            id: 'editorOverviewRuler.modifiedForeground', defaults: {
                dark: color_registry_1.Color.transparent(ScmColors.editorGutterModifiedBackground, 0.6),
                light: color_registry_1.Color.transparent(ScmColors.editorGutterModifiedBackground, 0.6),
                hc: color_registry_1.Color.transparent(ScmColors.editorGutterModifiedBackground, 0.6)
            }, description: 'Overview ruler marker color for modified content.'
        }, {
            id: 'editorOverviewRuler.addedForeground', defaults: {
                dark: color_registry_1.Color.transparent(ScmColors.editorGutterAddedBackground, 0.6),
                light: color_registry_1.Color.transparent(ScmColors.editorGutterAddedBackground, 0.6),
                hc: color_registry_1.Color.transparent(ScmColors.editorGutterAddedBackground, 0.6)
            }, description: 'Overview ruler marker color for added content.'
        }, {
            id: 'editorOverviewRuler.deletedForeground', defaults: {
                dark: color_registry_1.Color.transparent(ScmColors.editorGutterDeletedBackground, 0.6),
                light: color_registry_1.Color.transparent(ScmColors.editorGutterDeletedBackground, 0.6),
                hc: color_registry_1.Color.transparent(ScmColors.editorGutterDeletedBackground, 0.6)
            }, description: 'Overview ruler marker color for deleted content.'
        });
    };
    __decorate([
        inversify_1.inject(browser_1.StatusBar),
        __metadata("design:type", Object)
    ], ScmContribution.prototype, "statusBar", void 0);
    __decorate([
        inversify_1.inject(scm_service_1.ScmService),
        __metadata("design:type", scm_service_1.ScmService)
    ], ScmContribution.prototype, "scmService", void 0);
    __decorate([
        inversify_1.inject(browser_1.QuickOpenService),
        __metadata("design:type", browser_1.QuickOpenService)
    ], ScmContribution.prototype, "quickOpenService", void 0);
    __decorate([
        inversify_1.inject(scm_quick_open_service_1.ScmQuickOpenService),
        __metadata("design:type", scm_quick_open_service_1.ScmQuickOpenService)
    ], ScmContribution.prototype, "scmQuickOpenService", void 0);
    __decorate([
        inversify_1.inject(browser_1.LabelProvider),
        __metadata("design:type", browser_1.LabelProvider)
    ], ScmContribution.prototype, "labelProvider", void 0);
    __decorate([
        inversify_1.inject(common_1.CommandService),
        __metadata("design:type", Object)
    ], ScmContribution.prototype, "commands", void 0);
    __decorate([
        inversify_1.inject(common_1.CommandRegistry),
        __metadata("design:type", common_1.CommandRegistry)
    ], ScmContribution.prototype, "commandRegistry", void 0);
    __decorate([
        inversify_1.inject(context_key_service_1.ContextKeyService),
        __metadata("design:type", context_key_service_1.ContextKeyService)
    ], ScmContribution.prototype, "contextKeys", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ScmContribution.prototype, "init", null);
    ScmContribution = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], ScmContribution);
    return ScmContribution;
}(browser_1.AbstractViewContribution));
exports.ScmContribution = ScmContribution;
//# sourceMappingURL=scm-contribution.js.map