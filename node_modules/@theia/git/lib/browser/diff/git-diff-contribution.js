"use strict";
/********************************************************************************
 * Copyright (C) 2018 TypeFox and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitDiffContribution = exports.ScmNavigatorMoreToolbarGroups = exports.GitDiffCommands = void 0;
var common_1 = require("@theia/core/lib/common");
var browser_1 = require("@theia/core/lib/browser");
var widget_manager_1 = require("@theia/core/lib/browser/widget-manager");
var browser_2 = require("@theia/editor/lib/browser");
var inversify_1 = require("inversify");
var git_diff_widget_1 = require("./git-diff-widget");
var git_commit_detail_widget_1 = require("../history/git-commit-detail-widget");
var scm_service_1 = require("@theia/scm/lib/browser/scm-service");
var browser_3 = require("@theia/core/lib/browser");
var navigator_contribution_1 = require("@theia/navigator/lib/browser/navigator-contribution");
var git_quick_open_service_1 = require("../git-quick-open-service");
var diff_uris_1 = require("@theia/core/lib/browser/diff-uris");
var git_resource_1 = require("../git-resource");
var workspace_commands_1 = require("@theia/workspace/lib/browser/workspace-commands");
var browser_4 = require("@theia/workspace/lib/browser");
var event_1 = require("@theia/core/lib/common/event");
var file_service_1 = require("@theia/filesystem/lib/browser/file-service");
var GitDiffCommands;
(function (GitDiffCommands) {
    GitDiffCommands.OPEN_FILE_DIFF = {
        id: 'git-diff:open-file-diff',
        category: 'Git Diff',
        label: 'Compare With...'
    };
    GitDiffCommands.TREE_VIEW_MODE = {
        id: 'git.viewmode.tree',
        tooltip: 'Toggle to Tree View',
        iconClass: 'codicon codicon-list-tree',
        label: 'Toggle to Tree View',
    };
    GitDiffCommands.LIST_VIEW_MODE = {
        id: 'git.viewmode.list',
        tooltip: 'Toggle to List View',
        iconClass: 'codicon codicon-list-flat',
        label: 'Toggle to List View',
    };
    GitDiffCommands.PREVIOUS_CHANGE = {
        id: 'git.navigate-changes.previous',
        tooltip: 'Toggle to List View',
        iconClass: 'fa fa-arrow-left',
        label: 'Previous Change',
    };
    GitDiffCommands.NEXT_CHANGE = {
        id: 'git.navigate-changes.next',
        tooltip: 'Toggle to List View',
        iconClass: 'fa fa-arrow-right',
        label: 'Next Change',
    };
})(GitDiffCommands = exports.GitDiffCommands || (exports.GitDiffCommands = {}));
var ScmNavigatorMoreToolbarGroups;
(function (ScmNavigatorMoreToolbarGroups) {
    ScmNavigatorMoreToolbarGroups.SCM = '3_navigator_scm';
})(ScmNavigatorMoreToolbarGroups = exports.ScmNavigatorMoreToolbarGroups || (exports.ScmNavigatorMoreToolbarGroups = {}));
var GitDiffContribution = /** @class */ (function (_super) {
    __extends(GitDiffContribution, _super);
    function GitDiffContribution(selectionService, widgetManager, app, quickOpenService, fileService, openerService, notifications, scmService) {
        var _this = _super.call(this, {
            widgetId: git_diff_widget_1.GIT_DIFF,
            widgetName: 'Git diff',
            defaultWidgetOptions: {
                area: 'left',
                rank: 500
            }
        }) || this;
        _this.selectionService = selectionService;
        _this.widgetManager = widgetManager;
        _this.app = app;
        _this.quickOpenService = quickOpenService;
        _this.fileService = fileService;
        _this.openerService = openerService;
        _this.notifications = notifications;
        _this.scmService = scmService;
        return _this;
    }
    GitDiffContribution.prototype.registerMenus = function (menus) {
        menus.registerMenuAction(navigator_contribution_1.NavigatorContextMenu.COMPARE, {
            commandId: GitDiffCommands.OPEN_FILE_DIFF.id
        });
    };
    GitDiffContribution.prototype.registerCommands = function (commands) {
        var _this = this;
        commands.registerCommand(GitDiffCommands.OPEN_FILE_DIFF, this.newWorkspaceRootUriAwareCommandHandler({
            isVisible: function (uri) { return !!_this.findGitRepository(uri); },
            isEnabled: function (uri) { return !!_this.findGitRepository(uri); },
            execute: function (fileUri) { return __awaiter(_this, void 0, void 0, function () {
                var repository;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            repository = this.findGitRepository(fileUri);
                            if (!repository) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.quickOpenService.chooseTagsAndBranches(function (fromRevision, toRevision) { return __awaiter(_this, void 0, void 0, function () {
                                    var uri, fileStat, diffOptions, fromURI, toURI, diffUri;
                                    var _this = this;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                uri = fileUri.toString();
                                                return [4 /*yield*/, this.fileService.resolve(fileUri)];
                                            case 1:
                                                fileStat = _a.sent();
                                                diffOptions = {
                                                    uri: uri,
                                                    range: {
                                                        fromRevision: fromRevision
                                                    }
                                                };
                                                if (fileStat.isDirectory) {
                                                    this.showWidget({ rootUri: repository.localUri, diffOptions: diffOptions });
                                                }
                                                else {
                                                    fromURI = fileUri.withScheme(git_resource_1.GIT_RESOURCE_SCHEME).withQuery(fromRevision);
                                                    toURI = fileUri;
                                                    diffUri = diff_uris_1.DiffUris.encode(fromURI, toURI);
                                                    if (diffUri) {
                                                        browser_3.open(this.openerService, diffUri).catch(function (e) {
                                                            _this.notifications.error(e.message);
                                                        });
                                                    }
                                                }
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }, repository)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            }); }
        }));
        commands.registerCommand(GitDiffCommands.PREVIOUS_CHANGE, {
            execute: function (widget) {
                if (widget instanceof git_diff_widget_1.GitDiffWidget) {
                    widget.goToPreviousChange();
                }
            },
            isVisible: function (widget) { return widget instanceof git_diff_widget_1.GitDiffWidget; },
        });
        commands.registerCommand(GitDiffCommands.NEXT_CHANGE, {
            execute: function (widget) {
                if (widget instanceof git_diff_widget_1.GitDiffWidget) {
                    widget.goToNextChange();
                }
            },
            isVisible: function (widget) { return widget instanceof git_diff_widget_1.GitDiffWidget; },
        });
    };
    GitDiffContribution.prototype.registerToolbarItems = function (registry) {
        var _this = this;
        this.fileNavigatorContribution.registerMoreToolbarItem({
            id: GitDiffCommands.OPEN_FILE_DIFF.id,
            command: GitDiffCommands.OPEN_FILE_DIFF.id,
            tooltip: GitDiffCommands.OPEN_FILE_DIFF.label,
            group: ScmNavigatorMoreToolbarGroups.SCM,
        });
        var viewModeEmitter = new event_1.Emitter();
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        var extractDiffWidget = function (widget) {
            if (widget instanceof git_diff_widget_1.GitDiffWidget) {
                return widget;
            }
        };
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        var extractCommitDetailWidget = function (widget) {
            var ref = widget ? widget : _this.editorManager.currentEditor;
            if (ref instanceof git_commit_detail_widget_1.GitCommitDetailWidget) {
                return ref;
            }
            return undefined;
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
                    var widgetWithChanges = extractDiffWidget(widget) || extractCommitDetailWidget(widget);
                    if (widgetWithChanges) {
                        widgetWithChanges.viewMode = mode;
                        viewModeEmitter.fire();
                    }
                },
                isVisible: function (widget) {
                    var widgetWithChanges = extractDiffWidget(widget) || extractCommitDetailWidget(widget);
                    if (widgetWithChanges) {
                        return widgetWithChanges.viewMode !== mode;
                    }
                    return false;
                },
            });
            registry.registerItem(item);
        };
        registerToggleViewItem(GitDiffCommands.TREE_VIEW_MODE, 'tree');
        registerToggleViewItem(GitDiffCommands.LIST_VIEW_MODE, 'list');
        registry.registerItem({
            id: GitDiffCommands.PREVIOUS_CHANGE.id,
            command: GitDiffCommands.PREVIOUS_CHANGE.id,
            tooltip: GitDiffCommands.PREVIOUS_CHANGE.label,
        });
        registry.registerItem({
            id: GitDiffCommands.NEXT_CHANGE.id,
            command: GitDiffCommands.NEXT_CHANGE.id,
            tooltip: GitDiffCommands.NEXT_CHANGE.label,
        });
    };
    GitDiffContribution.prototype.findGitRepository = function (uri) {
        var repo = this.scmService.findRepository(uri);
        if (repo && repo.provider.id === 'git') {
            return { localUri: repo.provider.rootUri };
        }
        return undefined;
    };
    GitDiffContribution.prototype.showWidget = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var widget;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.widget];
                    case 1:
                        widget = _a.sent();
                        return [4 /*yield*/, widget.setContent(options)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, this.openView({
                                activate: true
                            })];
                }
            });
        });
    };
    GitDiffContribution.prototype.newWorkspaceRootUriAwareCommandHandler = function (handler) {
        return new workspace_commands_1.WorkspaceRootUriAwareCommandHandler(this.workspaceService, this.selectionService, handler);
    };
    __decorate([
        inversify_1.inject(browser_2.EditorManager),
        __metadata("design:type", browser_2.EditorManager)
    ], GitDiffContribution.prototype, "editorManager", void 0);
    __decorate([
        inversify_1.inject(common_1.CommandRegistry),
        __metadata("design:type", common_1.CommandRegistry)
    ], GitDiffContribution.prototype, "commandRegistry", void 0);
    __decorate([
        inversify_1.inject(navigator_contribution_1.FileNavigatorContribution),
        __metadata("design:type", navigator_contribution_1.FileNavigatorContribution)
    ], GitDiffContribution.prototype, "fileNavigatorContribution", void 0);
    __decorate([
        inversify_1.inject(browser_4.WorkspaceService),
        __metadata("design:type", browser_4.WorkspaceService)
    ], GitDiffContribution.prototype, "workspaceService", void 0);
    GitDiffContribution = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(common_1.SelectionService)),
        __param(1, inversify_1.inject(widget_manager_1.WidgetManager)),
        __param(2, inversify_1.inject(browser_1.FrontendApplication)),
        __param(3, inversify_1.inject(git_quick_open_service_1.GitQuickOpenService)),
        __param(4, inversify_1.inject(file_service_1.FileService)),
        __param(5, inversify_1.inject(browser_3.OpenerService)),
        __param(6, inversify_1.inject(common_1.MessageService)),
        __param(7, inversify_1.inject(scm_service_1.ScmService)),
        __metadata("design:paramtypes", [common_1.SelectionService,
            widget_manager_1.WidgetManager,
            browser_1.FrontendApplication,
            git_quick_open_service_1.GitQuickOpenService,
            file_service_1.FileService, Object, common_1.MessageService,
            scm_service_1.ScmService])
    ], GitDiffContribution);
    return GitDiffContribution;
}(browser_1.AbstractViewContribution));
exports.GitDiffContribution = GitDiffContribution;
//# sourceMappingURL=git-diff-contribution.js.map