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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreferencesScopeTabBar = void 0;
var inversify_1 = require("inversify");
var widgets_1 = require("@phosphor/widgets");
var browser_1 = require("@theia/core/lib/browser");
var workspace_service_1 = require("@theia/workspace/lib/browser/workspace-service");
var uri_1 = require("@theia/core/lib/common/uri");
var preference_scope_command_manager_1 = require("../util/preference-scope-command-manager");
var preference_types_1 = require("../util/preference-types");
var core_1 = require("@theia/core");
var USER_TAB_LABEL = 'User';
var USER_TAB_INDEX = browser_1.PreferenceScope[USER_TAB_LABEL].toString();
var WORKSPACE_TAB_LABEL = 'Workspace';
var WORKSPACE_TAB_INDEX = browser_1.PreferenceScope[WORKSPACE_TAB_LABEL].toString();
var FOLDER_TAB_LABEL = 'Folder';
var FOLDER_TAB_INDEX = browser_1.PreferenceScope[FOLDER_TAB_LABEL].toString();
var PREFERENCE_TAB_CLASSNAME = 'preferences-scope-tab';
var GENERAL_FOLDER_TAB_CLASSNAME = 'preference-folder';
var LABELED_FOLDER_TAB_CLASSNAME = 'preferences-folder-tab';
var FOLDER_DROPDOWN_CLASSNAME = 'preferences-folder-dropdown';
var FOLDER_DROPDOWN_ICON_CLASSNAME = 'preferences-folder-dropdown-icon';
var TABBAR_UNDERLINE_CLASSNAME = 'tabbar-underline';
var SINGLE_FOLDER_TAB_CLASSNAME = PREFERENCE_TAB_CLASSNAME + " " + GENERAL_FOLDER_TAB_CLASSNAME + " " + LABELED_FOLDER_TAB_CLASSNAME;
var UNSELECTED_FOLDER_DROPDOWN_CLASSNAME = PREFERENCE_TAB_CLASSNAME + " " + GENERAL_FOLDER_TAB_CLASSNAME + " " + FOLDER_DROPDOWN_CLASSNAME;
var SELECTED_FOLDER_DROPDOWN_CLASSNAME = PREFERENCE_TAB_CLASSNAME + " " + GENERAL_FOLDER_TAB_CLASSNAME + " " + LABELED_FOLDER_TAB_CLASSNAME + " " + FOLDER_DROPDOWN_CLASSNAME;
var PreferencesScopeTabBar = /** @class */ (function (_super) {
    __extends(PreferencesScopeTabBar, _super);
    function PreferencesScopeTabBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onScopeChangedEmitter = new core_1.Emitter();
        _this.onScopeChanged = _this.onScopeChangedEmitter.event;
        _this.currentWorkspaceRoots = [];
        _this.currentSelection = preference_types_1.Preference.DEFAULT_SCOPE;
        _this.editorScrollAtTop = true;
        _this.folderSelectionCallback = function (newScope) { _this.setNewScopeSelection(newScope); };
        return _this;
    }
    PreferencesScopeTabBar_1 = PreferencesScopeTabBar;
    Object.defineProperty(PreferencesScopeTabBar.prototype, "currentScope", {
        get: function () {
            return this.currentSelection;
        },
        enumerable: false,
        configurable: true
    });
    PreferencesScopeTabBar.prototype.setNewScopeSelection = function (newSelection) {
        var newIndex = this.titles.findIndex(function (title) { return title.dataset.scope === newSelection.scope; });
        if (newIndex !== -1) {
            this.currentSelection = newSelection;
            this.currentIndex = newIndex;
            if (newSelection.scope === browser_1.PreferenceScope.Folder.toString()) {
                this.addOrUpdateFolderTab();
            }
            this.emitNewScope();
        }
    };
    PreferencesScopeTabBar.prototype.init = function () {
        var _this = this;
        this.id = PreferencesScopeTabBar_1.ID;
        this.setupInitialDisplay();
        this.tabActivateRequested.connect(function (sender, args) {
            if (!!args.title) {
                _this.setNewScopeSelection(args.title.dataset);
            }
        });
        this.workspaceService.onWorkspaceChanged(function (newRoots) {
            _this.doUpdateDisplay(newRoots);
        });
        this.workspaceService.onWorkspaceLocationChanged(function () { return _this.updateWorkspaceTab(); });
        var tabUnderline = document.createElement('div');
        tabUnderline.className = TABBAR_UNDERLINE_CLASSNAME;
        this.node.append(tabUnderline);
    };
    PreferencesScopeTabBar.prototype.setupInitialDisplay = function () {
        this.addUserTab();
        if (this.workspaceService.workspace) {
            this.addWorkspaceTab(this.workspaceService.workspace);
        }
        this.addOrUpdateFolderTab();
    };
    PreferencesScopeTabBar.prototype.onUpdateRequest = function (msg) {
        _super.prototype.onUpdateRequest.call(this, msg);
        this.addTabIndexToTabs();
    };
    PreferencesScopeTabBar.prototype.addTabIndexToTabs = function () {
        var _this = this;
        this.node.querySelectorAll('li').forEach(function (tab, index) {
            tab.tabIndex = 0;
            tab.onkeypress = function () {
                if (tab.className.includes(GENERAL_FOLDER_TAB_CLASSNAME) && _this.currentWorkspaceRoots.length > 1) {
                    var tabRect = tab.getBoundingClientRect();
                    _this.openContextMenu(tabRect, tab, 'keypress');
                }
                else {
                    _this.setNewScopeSelection(_this.titles[index].dataset);
                }
            };
        });
    };
    PreferencesScopeTabBar.prototype.addUserTab = function () {
        this.addTab(new widgets_1.Title({
            dataset: { uri: '', scope: USER_TAB_INDEX },
            label: USER_TAB_LABEL,
            owner: this,
            className: PREFERENCE_TAB_CLASSNAME
        }));
    };
    PreferencesScopeTabBar.prototype.addWorkspaceTab = function (currentWorkspace) {
        var workspaceTabTitle = new widgets_1.Title({
            dataset: this.getWorkspaceDataset(currentWorkspace),
            label: WORKSPACE_TAB_LABEL,
            owner: this,
            className: PREFERENCE_TAB_CLASSNAME,
        });
        this.addTab(workspaceTabTitle);
        return workspaceTabTitle;
    };
    PreferencesScopeTabBar.prototype.getWorkspaceDataset = function (currentWorkspace) {
        var resource = currentWorkspace.resource, isDirectory = currentWorkspace.isDirectory;
        var scope = WORKSPACE_TAB_INDEX;
        var activeScopeIsFolder = isDirectory.toString();
        return { uri: resource.toString(), activeScopeIsFolder: activeScopeIsFolder, scope: scope };
    };
    PreferencesScopeTabBar.prototype.addOrUpdateFolderTab = function () {
        if (!!this.workspaceService.workspace) {
            this.currentWorkspaceRoots = this.workspaceService.tryGetRoots();
            var multipleFolderRootsAreAvailable = this.currentWorkspaceRoots && this.currentWorkspaceRoots.length > 1;
            var noFolderRootsAreAvailable = this.currentWorkspaceRoots.length === 0;
            var shouldShowFoldersSeparately = this.workspaceService.saved;
            if (!noFolderRootsAreAvailable) {
                if (!this.folderTitle) {
                    this.folderTitle = new widgets_1.Title({
                        label: '',
                        caption: FOLDER_TAB_LABEL,
                        owner: this,
                    });
                }
                this.setFolderTitleProperties(multipleFolderRootsAreAvailable);
                this.getFolderContextMenu(this.currentWorkspaceRoots);
                if (multipleFolderRootsAreAvailable || shouldShowFoldersSeparately) {
                    this.addTab(this.folderTitle);
                }
            }
            else {
                var folderTabIndex = this.titles.findIndex(function (title) { return title.caption === FOLDER_TAB_LABEL; });
                if (folderTabIndex > -1) {
                    this.removeTabAt(folderTabIndex);
                }
            }
        }
    };
    PreferencesScopeTabBar.prototype.setFolderTitleProperties = function (multipleFolderRootsAreAvailable) {
        this.folderTitle.iconClass = multipleFolderRootsAreAvailable ? FOLDER_DROPDOWN_ICON_CLASSNAME : '';
        if (this.currentSelection.scope === FOLDER_TAB_INDEX) {
            this.folderTitle.label = this.labelProvider.getName(new uri_1.default(this.currentSelection.uri));
            this.folderTitle.dataset = __assign(__assign({}, this.currentSelection), { folderTitle: 'true' });
            this.folderTitle.className = multipleFolderRootsAreAvailable ? SELECTED_FOLDER_DROPDOWN_CLASSNAME : SINGLE_FOLDER_TAB_CLASSNAME;
        }
        else {
            var singleFolderRoot = this.currentWorkspaceRoots[0].resource;
            var singleFolderLabel = this.labelProvider.getName(singleFolderRoot);
            var defaultURI = multipleFolderRootsAreAvailable ? '' : singleFolderRoot.toString();
            this.folderTitle.label = multipleFolderRootsAreAvailable ? FOLDER_TAB_LABEL : singleFolderLabel;
            this.folderTitle.className = multipleFolderRootsAreAvailable ? UNSELECTED_FOLDER_DROPDOWN_CLASSNAME : SINGLE_FOLDER_TAB_CLASSNAME;
            this.folderTitle.dataset = { folderTitle: 'true', scope: FOLDER_TAB_INDEX, uri: defaultURI };
        }
    };
    PreferencesScopeTabBar.prototype.getFolderContextMenu = function (workspaceRoots) {
        if (workspaceRoots === void 0) { workspaceRoots = this.workspaceService.tryGetRoots(); }
        this.preferencesMenuFactory.createFolderWorkspacesMenu(workspaceRoots, this.currentSelection.uri);
    };
    PreferencesScopeTabBar.prototype.handleEvent = function (e) {
        var folderTab = this.contentNode.querySelector("." + GENERAL_FOLDER_TAB_CLASSNAME);
        if (folderTab && folderTab.contains(e.target) && this.currentWorkspaceRoots.length > 1) {
            var tabRect = folderTab.getBoundingClientRect();
            this.openContextMenu(tabRect, folderTab, 'click');
            return;
        }
        _super.prototype.handleEvent.call(this, e);
    };
    PreferencesScopeTabBar.prototype.openContextMenu = function (tabRect, folderTabNode, source) {
        this.contextMenuRenderer.render({
            menuPath: preference_scope_command_manager_1.FOLDER_SCOPE_MENU_PATH,
            anchor: { x: tabRect.left, y: tabRect.bottom },
            args: [this.folderSelectionCallback, 'from-tabbar'],
            onHide: function () {
                if (source === 'click') {
                    folderTabNode.blur();
                }
            }
        });
    };
    PreferencesScopeTabBar.prototype.doUpdateDisplay = function (newRoots) {
        var _this = this;
        var folderWasRemoved = newRoots.length < this.currentWorkspaceRoots.length;
        this.currentWorkspaceRoots = newRoots;
        if (folderWasRemoved) {
            var removedFolderWasSelectedScope = !this.currentWorkspaceRoots.some(function (root) { return root.resource.toString() === _this.currentSelection.uri; });
            if (removedFolderWasSelectedScope) {
                this.setNewScopeSelection(preference_types_1.Preference.DEFAULT_SCOPE);
            }
        }
        this.updateWorkspaceTab();
        this.addOrUpdateFolderTab();
    };
    PreferencesScopeTabBar.prototype.updateWorkspaceTab = function () {
        var _a;
        var currentWorkspace = this.workspaceService.workspace;
        if (currentWorkspace) {
            var workspaceTitle = (_a = this.titles.find(function (title) { return title.label === WORKSPACE_TAB_LABEL; })) !== null && _a !== void 0 ? _a : this.addWorkspaceTab(currentWorkspace);
            workspaceTitle.dataset = this.getWorkspaceDataset(currentWorkspace);
            if (this.currentSelection.scope === browser_1.PreferenceScope.Workspace.toString()) {
                this.setNewScopeSelection(workspaceTitle.dataset);
            }
        }
    };
    PreferencesScopeTabBar.prototype.emitNewScope = function () {
        this.onScopeChangedEmitter.fire(this.currentSelection);
    };
    PreferencesScopeTabBar.prototype.storeState = function () {
        return {
            scopeDetails: this.currentScope
        };
    };
    PreferencesScopeTabBar.prototype.restoreState = function (oldState) {
        this.setNewScopeSelection(oldState.scopeDetails);
    };
    var PreferencesScopeTabBar_1;
    PreferencesScopeTabBar.ID = 'preferences-scope-tab-bar';
    __decorate([
        inversify_1.inject(workspace_service_1.WorkspaceService),
        __metadata("design:type", workspace_service_1.WorkspaceService)
    ], PreferencesScopeTabBar.prototype, "workspaceService", void 0);
    __decorate([
        inversify_1.inject(preference_scope_command_manager_1.PreferenceScopeCommandManager),
        __metadata("design:type", preference_scope_command_manager_1.PreferenceScopeCommandManager)
    ], PreferencesScopeTabBar.prototype, "preferencesMenuFactory", void 0);
    __decorate([
        inversify_1.inject(browser_1.ContextMenuRenderer),
        __metadata("design:type", browser_1.ContextMenuRenderer)
    ], PreferencesScopeTabBar.prototype, "contextMenuRenderer", void 0);
    __decorate([
        inversify_1.inject(browser_1.LabelProvider),
        __metadata("design:type", browser_1.LabelProvider)
    ], PreferencesScopeTabBar.prototype, "labelProvider", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PreferencesScopeTabBar.prototype, "init", null);
    PreferencesScopeTabBar = PreferencesScopeTabBar_1 = __decorate([
        inversify_1.injectable()
    ], PreferencesScopeTabBar);
    return PreferencesScopeTabBar;
}(widgets_1.TabBar));
exports.PreferencesScopeTabBar = PreferencesScopeTabBar;
//# sourceMappingURL=preference-scope-tabbar-widget.js.map