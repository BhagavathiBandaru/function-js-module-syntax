"use strict";
/********************************************************************************
 * Copyright (C) 2017 TypeFox and others.
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceFrontendContribution = exports.WorkspaceStates = void 0;
var inversify_1 = require("inversify");
var common_1 = require("@theia/core/lib/common");
var core_1 = require("@theia/core");
var browser_1 = require("@theia/core/lib/browser");
var browser_2 = require("@theia/filesystem/lib/browser");
var context_key_service_1 = require("@theia/core/lib/browser/context-key-service");
var workspace_service_1 = require("./workspace-service");
var common_2 = require("../common");
var workspace_commands_1 = require("./workspace-commands");
var quick_open_workspace_1 = require("./quick-open-workspace");
var workspace_preferences_1 = require("./workspace-preferences");
var uri_command_handler_1 = require("@theia/core/lib/common/uri-command-handler");
var file_service_1 = require("@theia/filesystem/lib/browser/file-service");
var encoding_registry_1 = require("@theia/core/lib/browser/encoding-registry");
var encodings_1 = require("@theia/core/lib/common/encodings");
var disposable_1 = require("@theia/core/lib/common/disposable");
var preference_configurations_1 = require("@theia/core/lib/browser/preferences/preference-configurations");
var WorkspaceStates;
(function (WorkspaceStates) {
    /**
     * The state is `empty` when no workspace is opened.
     */
    WorkspaceStates["empty"] = "empty";
    /**
     * The state is `workspace` when a workspace is opened.
     */
    WorkspaceStates["workspace"] = "workspace";
    /**
     * The state is `folder` when a folder is opened. (1 folder)
     */
    WorkspaceStates["folder"] = "folder";
})(WorkspaceStates = exports.WorkspaceStates || (exports.WorkspaceStates = {}));
;
var WorkspaceFrontendContribution = /** @class */ (function () {
    function WorkspaceFrontendContribution() {
        this.toDisposeOnUpdateEncodingOverrides = new disposable_1.DisposableCollection();
    }
    WorkspaceFrontendContribution_1 = WorkspaceFrontendContribution;
    WorkspaceFrontendContribution.prototype.configure = function () {
        var _this = this;
        this.encodingRegistry.registerOverride({ encoding: encodings_1.UTF8, extension: common_2.THEIA_EXT });
        this.encodingRegistry.registerOverride({ encoding: encodings_1.UTF8, extension: common_2.VSCODE_EXT });
        this.updateEncodingOverrides();
        var workspaceFolderCountKey = this.contextKeyService.createKey('workspaceFolderCount', 0);
        var updateWorkspaceFolderCountKey = function () { return workspaceFolderCountKey.set(_this.workspaceService.tryGetRoots().length); };
        updateWorkspaceFolderCountKey();
        var workspaceStateKey = this.contextKeyService.createKey('workspaceState', 'empty');
        var updateWorkspaceStateKey = function () { return workspaceStateKey.set(_this.updateWorkspaceStateKey()); };
        updateWorkspaceStateKey();
        this.updateStyles();
        this.workspaceService.onWorkspaceChanged(function () {
            _this.updateEncodingOverrides();
            updateWorkspaceFolderCountKey();
            updateWorkspaceStateKey();
            _this.updateStyles();
        });
    };
    WorkspaceFrontendContribution.prototype.updateEncodingOverrides = function () {
        var e_1, _a, e_2, _b;
        this.toDisposeOnUpdateEncodingOverrides.dispose();
        try {
            for (var _c = __values(this.workspaceService.tryGetRoots()), _d = _c.next(); !_d.done; _d = _c.next()) {
                var root = _d.value;
                try {
                    for (var _e = (e_2 = void 0, __values(this.preferenceConfigurations.getPaths())), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var configPath = _f.value;
                        var parent_1 = root.resource.resolve(configPath);
                        this.toDisposeOnUpdateEncodingOverrides.push(this.encodingRegistry.registerOverride({ encoding: encodings_1.UTF8, parent: parent_1 }));
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    WorkspaceFrontendContribution.prototype.updateStyles = function () {
        document.body.classList.remove('theia-no-open-workspace');
        // Display the 'no workspace opened' theme color when no folders are opened (single-root).
        if (!this.workspaceService.isMultiRootWorkspaceOpened &&
            !this.workspaceService.tryGetRoots().length) {
            document.body.classList.add('theia-no-open-workspace');
        }
    };
    WorkspaceFrontendContribution.prototype.registerCommands = function (commands) {
        var _this = this;
        // Not visible/enabled on Windows/Linux in electron.
        commands.registerCommand(workspace_commands_1.WorkspaceCommands.OPEN, {
            isEnabled: function () { return core_1.isOSX || !_this.isElectron(); },
            isVisible: function () { return core_1.isOSX || !_this.isElectron(); },
            execute: function () { return _this.doOpen(); }
        });
        // Visible/enabled only on Windows/Linux in electron.
        commands.registerCommand(workspace_commands_1.WorkspaceCommands.OPEN_FILE, {
            isEnabled: function () { return true; },
            execute: function () { return _this.doOpenFile(); }
        });
        // Visible/enabled only on Windows/Linux in electron.
        commands.registerCommand(workspace_commands_1.WorkspaceCommands.OPEN_FOLDER, {
            isEnabled: function () { return true; },
            execute: function () { return _this.doOpenFolder(); }
        });
        commands.registerCommand(workspace_commands_1.WorkspaceCommands.OPEN_WORKSPACE, {
            isEnabled: function () { return true; },
            execute: function () { return _this.doOpenWorkspace(); }
        });
        commands.registerCommand(workspace_commands_1.WorkspaceCommands.CLOSE, {
            isEnabled: function () { return _this.workspaceService.opened; },
            execute: function () { return _this.closeWorkspace(); }
        });
        commands.registerCommand(workspace_commands_1.WorkspaceCommands.OPEN_RECENT_WORKSPACE, {
            execute: function () { return _this.quickOpenWorkspace.select(); }
        });
        commands.registerCommand(workspace_commands_1.WorkspaceCommands.SAVE_WORKSPACE_AS, {
            isEnabled: function () { return _this.workspaceService.isMultiRootWorkspaceEnabled; },
            execute: function () { return _this.saveWorkspaceAs(); }
        });
        commands.registerCommand(workspace_commands_1.WorkspaceCommands.SAVE_AS, uri_command_handler_1.UriAwareCommandHandler.MonoSelect(this.selectionService, {
            execute: function (uri) { return _this.saveAs(uri); },
        }));
        commands.registerCommand(workspace_commands_1.WorkspaceCommands.OPEN_WORKSPACE_FILE, {
            isEnabled: function () { return _this.workspaceService.saved; },
            execute: function () {
                if (_this.workspaceService.saved && _this.workspaceService.workspace) {
                    browser_1.open(_this.openerService, _this.workspaceService.workspace.resource);
                }
            }
        });
    };
    WorkspaceFrontendContribution.prototype.registerMenus = function (menus) {
        if (core_1.isOSX || !this.isElectron()) {
            menus.registerMenuAction(browser_1.CommonMenus.FILE_OPEN, {
                commandId: workspace_commands_1.WorkspaceCommands.OPEN.id,
                order: 'a00'
            });
        }
        if (!core_1.isOSX && this.isElectron()) {
            menus.registerMenuAction(browser_1.CommonMenus.FILE_OPEN, {
                commandId: workspace_commands_1.WorkspaceCommands.OPEN_FILE.id,
                label: workspace_commands_1.WorkspaceCommands.OPEN_FILE.dialogLabel + "...",
                order: 'a01'
            });
            menus.registerMenuAction(browser_1.CommonMenus.FILE_OPEN, {
                commandId: workspace_commands_1.WorkspaceCommands.OPEN_FOLDER.id,
                label: workspace_commands_1.WorkspaceCommands.OPEN_FOLDER.dialogLabel + "...",
                order: 'a02'
            });
        }
        menus.registerMenuAction(browser_1.CommonMenus.FILE_OPEN, {
            commandId: workspace_commands_1.WorkspaceCommands.OPEN_WORKSPACE.id,
            order: 'a10'
        });
        menus.registerMenuAction(browser_1.CommonMenus.FILE_OPEN, {
            commandId: workspace_commands_1.WorkspaceCommands.OPEN_RECENT_WORKSPACE.id,
            order: 'a20'
        });
        menus.registerMenuAction(browser_1.CommonMenus.FILE_OPEN, {
            commandId: workspace_commands_1.WorkspaceCommands.SAVE_WORKSPACE_AS.id,
            order: 'a30'
        });
        menus.registerMenuAction(browser_1.CommonMenus.FILE_CLOSE, {
            commandId: workspace_commands_1.WorkspaceCommands.CLOSE.id
        });
        menus.registerMenuAction(browser_1.CommonMenus.FILE_SAVE, {
            commandId: workspace_commands_1.WorkspaceCommands.SAVE_AS.id,
        });
    };
    WorkspaceFrontendContribution.prototype.registerKeybindings = function (keybindings) {
        keybindings.registerKeybinding({
            command: workspace_commands_1.WorkspaceCommands.NEW_FILE.id,
            keybinding: this.isElectron() ? 'ctrlcmd+n' : 'alt+n',
        });
        keybindings.registerKeybinding({
            command: core_1.isOSX || !this.isElectron() ? workspace_commands_1.WorkspaceCommands.OPEN.id : workspace_commands_1.WorkspaceCommands.OPEN_FILE.id,
            keybinding: this.isElectron() ? 'ctrlcmd+o' : 'ctrlcmd+alt+o',
        });
        if (!core_1.isOSX && this.isElectron()) {
            keybindings.registerKeybinding({
                command: workspace_commands_1.WorkspaceCommands.OPEN_FOLDER.id,
                keybinding: 'ctrl+k ctrl+o',
            });
        }
        keybindings.registerKeybinding({
            command: workspace_commands_1.WorkspaceCommands.OPEN_WORKSPACE.id,
            keybinding: 'ctrlcmd+alt+w',
        });
        keybindings.registerKeybinding({
            command: workspace_commands_1.WorkspaceCommands.OPEN_RECENT_WORKSPACE.id,
            keybinding: 'ctrlcmd+alt+r',
        });
        keybindings.registerKeybinding({
            command: workspace_commands_1.WorkspaceCommands.SAVE_AS.id,
            keybinding: 'ctrlcmd+shift+s',
        });
    };
    /**
     * This is the generic `Open` method. Opens files and directories too. Resolves to the opened URI.
     * Except when you are on either Windows or Linux `AND` running in electron. If so, it opens a file.
     */
    WorkspaceFrontendContribution.prototype.doOpen = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, rootStat, destinationUri, destination;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!core_1.isOSX && this.isElectron()) {
                            return [2 /*return*/, this.doOpenFile()];
                        }
                        return [4 /*yield*/, this.workspaceService.roots];
                    case 1:
                        _b = __read.apply(void 0, [_c.sent(), 1]), rootStat = _b[0];
                        return [4 /*yield*/, this.fileDialogService.showOpenDialog({
                                title: workspace_commands_1.WorkspaceCommands.OPEN.dialogLabel,
                                canSelectFolders: true,
                                canSelectFiles: true
                            }, rootStat)];
                    case 2:
                        destinationUri = _c.sent();
                        if (!(destinationUri && ((_a = this.getCurrentWorkspaceUri()) === null || _a === void 0 ? void 0 : _a.toString()) !== destinationUri.toString())) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.fileService.resolve(destinationUri)];
                    case 3:
                        destination = _c.sent();
                        if (!destination.isDirectory) return [3 /*break*/, 4];
                        this.workspaceService.open(destinationUri);
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, browser_1.open(this.openerService, destinationUri)];
                    case 5:
                        _c.sent();
                        _c.label = 6;
                    case 6: return [2 /*return*/, destinationUri];
                    case 7: return [2 /*return*/, undefined];
                }
            });
        });
    };
    /**
     * Opens a file after prompting the `Open File` dialog. Resolves to `undefined`, if
     *  - the workspace root is not set,
     *  - the file to open does not exist, or
     *  - it was not a file, but a directory.
     *
     * Otherwise, resolves to the URI of the file.
     */
    WorkspaceFrontendContribution.prototype.doOpenFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var props, _a, rootStat, destinationFileUri, destinationFile;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        props = {
                            title: workspace_commands_1.WorkspaceCommands.OPEN_FILE.dialogLabel,
                            canSelectFolders: false,
                            canSelectFiles: true
                        };
                        return [4 /*yield*/, this.workspaceService.roots];
                    case 1:
                        _a = __read.apply(void 0, [_b.sent(), 1]), rootStat = _a[0];
                        return [4 /*yield*/, this.fileDialogService.showOpenDialog(props, rootStat)];
                    case 2:
                        destinationFileUri = _b.sent();
                        if (!destinationFileUri) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.fileService.resolve(destinationFileUri)];
                    case 3:
                        destinationFile = _b.sent();
                        if (!!destinationFile.isDirectory) return [3 /*break*/, 5];
                        return [4 /*yield*/, browser_1.open(this.openerService, destinationFileUri)];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, destinationFileUri];
                    case 5: return [2 /*return*/, undefined];
                }
            });
        });
    };
    /**
     * Opens a folder after prompting the `Open Folder` dialog. Resolves to `undefined`, if
     *  - the workspace root is not set,
     *  - the folder to open does not exist, or
     *  - it was not a directory, but a file resource.
     *
     * Otherwise, resolves to the URI of the folder.
     */
    WorkspaceFrontendContribution.prototype.doOpenFolder = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var props, _b, rootStat, destinationFolderUri, destinationFolder;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        props = {
                            title: workspace_commands_1.WorkspaceCommands.OPEN_FOLDER.dialogLabel,
                            canSelectFolders: true,
                            canSelectFiles: false
                        };
                        return [4 /*yield*/, this.workspaceService.roots];
                    case 1:
                        _b = __read.apply(void 0, [_c.sent(), 1]), rootStat = _b[0];
                        return [4 /*yield*/, this.fileDialogService.showOpenDialog(props, rootStat)];
                    case 2:
                        destinationFolderUri = _c.sent();
                        if (!(destinationFolderUri &&
                            ((_a = this.getCurrentWorkspaceUri()) === null || _a === void 0 ? void 0 : _a.toString()) !== destinationFolderUri.toString())) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.fileService.resolve(destinationFolderUri)];
                    case 3:
                        destinationFolder = _c.sent();
                        if (destinationFolder.isDirectory) {
                            this.workspaceService.open(destinationFolderUri);
                            return [2 /*return*/, destinationFolderUri];
                        }
                        _c.label = 4;
                    case 4: return [2 /*return*/, undefined];
                }
            });
        });
    };
    /**
     * Opens a workspace after raising the `Open Workspace` dialog. Resolves to the URI of the recently opened workspace,
     * if it was successful. Otherwise, resolves to `undefined`.
     *
     * **Caveat**: this behaves differently on different platforms, the `workspace.supportMultiRootWorkspace` preference value **does** matter,
     * and `electron`/`browser` version has impact too. See [here](https://github.com/eclipse-theia/theia/pull/3202#issuecomment-430884195) for more details.
     *
     * Legend:
     *  - `workspace.supportMultiRootWorkspace` is `false`: => `N`
     *  - `workspace.supportMultiRootWorkspace` is `true`: => `Y`
     *  - Folders only: => `F`
     *  - Workspace files only: => `W`
     *  - Folders and workspace files: => `FW`
     *
     * -----
     *
     * |---------|-----------|-----------|------------|------------|
     * |         | browser Y | browser N | electron Y | electron N |
     * |---------|-----------|-----------|------------|------------|
     * | Linux   |     FW    |     F     |     W      |     F      |
     * | Windows |     FW    |     F     |     W      |     F      |
     * | OS X    |     FW    |     F     |     FW     |     FW     |
     * |---------|-----------|-----------|------------|------------|
     *
     */
    WorkspaceFrontendContribution.prototype.doOpenWorkspace = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var props, _b, rootStat, workspaceFolderOrWorkspaceFileUri, destinationFolder;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.openWorkspaceOpenFileDialogProps()];
                    case 1:
                        props = _c.sent();
                        return [4 /*yield*/, this.workspaceService.roots];
                    case 2:
                        _b = __read.apply(void 0, [_c.sent(), 1]), rootStat = _b[0];
                        return [4 /*yield*/, this.fileDialogService.showOpenDialog(props, rootStat)];
                    case 3:
                        workspaceFolderOrWorkspaceFileUri = _c.sent();
                        if (!(workspaceFolderOrWorkspaceFileUri &&
                            ((_a = this.getCurrentWorkspaceUri()) === null || _a === void 0 ? void 0 : _a.toString()) !== workspaceFolderOrWorkspaceFileUri.toString())) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.fileService.exists(workspaceFolderOrWorkspaceFileUri)];
                    case 4:
                        destinationFolder = _c.sent();
                        if (destinationFolder) {
                            this.workspaceService.open(workspaceFolderOrWorkspaceFileUri);
                            return [2 /*return*/, workspaceFolderOrWorkspaceFileUri];
                        }
                        _c.label = 5;
                    case 5: return [2 /*return*/, undefined];
                }
            });
        });
    };
    WorkspaceFrontendContribution.prototype.openWorkspaceOpenFileDialogProps = function () {
        return __awaiter(this, void 0, void 0, function () {
            var supportMultiRootWorkspace, type, electron;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.preferences.ready];
                    case 1:
                        _a.sent();
                        supportMultiRootWorkspace = this.preferences['workspace.supportMultiRootWorkspace'];
                        type = core_1.OS.type();
                        electron = this.isElectron();
                        return [2 /*return*/, WorkspaceFrontendContribution_1.createOpenWorkspaceOpenFileDialogProps({
                                type: type,
                                electron: electron,
                                supportMultiRootWorkspace: supportMultiRootWorkspace
                            })];
                }
            });
        });
    };
    WorkspaceFrontendContribution.prototype.closeWorkspace = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dialog;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dialog = new browser_1.ConfirmDialog({
                            title: workspace_commands_1.WorkspaceCommands.CLOSE.label,
                            msg: 'Do you really want to close the workspace?'
                        });
                        return [4 /*yield*/, dialog.open()];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.workspaceService.close()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    WorkspaceFrontendContribution.prototype.saveWorkspaceAs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var exist, overwrite, selected, displayName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        exist = false;
                        overwrite = false;
                        _a.label = 1;
                    case 1: return [4 /*yield*/, this.fileDialogService.showSaveDialog({
                            title: workspace_commands_1.WorkspaceCommands.SAVE_WORKSPACE_AS.label,
                            filters: WorkspaceFrontendContribution_1.DEFAULT_FILE_FILTER
                        })];
                    case 2:
                        selected = _a.sent();
                        if (!selected) return [3 /*break*/, 5];
                        displayName = selected.displayName;
                        if (!displayName.endsWith("." + common_2.THEIA_EXT) && !displayName.endsWith("." + common_2.VSCODE_EXT)) {
                            selected = selected.parent.resolve(displayName + "." + common_2.THEIA_EXT);
                        }
                        return [4 /*yield*/, this.fileService.exists(selected)];
                    case 3:
                        exist = _a.sent();
                        if (!exist) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.confirmOverwrite(selected)];
                    case 4:
                        overwrite = _a.sent();
                        _a.label = 5;
                    case 5:
                        if (selected && exist && !overwrite) return [3 /*break*/, 1];
                        _a.label = 6;
                    case 6:
                        if (selected) {
                            this.workspaceService.save(selected);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Save source `URI` to target.
     *
     * @param uri the source `URI`.
     */
    WorkspaceFrontendContribution.prototype.saveAs = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var exist, overwrite, selected, stat, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        exist = false;
                        overwrite = false;
                        return [4 /*yield*/, this.fileService.resolve(uri)];
                    case 1:
                        stat = _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.fileDialogService.showSaveDialog({
                            title: workspace_commands_1.WorkspaceCommands.SAVE_AS.label,
                            filters: {},
                            inputValue: uri.path.base
                        }, stat)];
                    case 3:
                        selected = _a.sent();
                        if (!selected) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.fileService.exists(selected)];
                    case 4:
                        exist = _a.sent();
                        if (!exist) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.confirmOverwrite(selected)];
                    case 5:
                        overwrite = _a.sent();
                        _a.label = 6;
                    case 6:
                        if (selected && exist && !overwrite) return [3 /*break*/, 2];
                        _a.label = 7;
                    case 7:
                        if (!selected) return [3 /*break*/, 12];
                        _a.label = 8;
                    case 8:
                        _a.trys.push([8, 11, , 12]);
                        return [4 /*yield*/, this.commandRegistry.executeCommand(browser_1.CommonCommands.SAVE.id)];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, this.fileService.copy(uri, selected, { overwrite: overwrite })];
                    case 10:
                        _a.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        e_3 = _a.sent();
                        console.warn(e_3);
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    WorkspaceFrontendContribution.prototype.updateWorkspaceStateKey = function () {
        if (this.workspaceService.opened) {
            return this.workspaceService.isMultiRootWorkspaceOpened ? 'folder' : 'workspace';
        }
        return 'empty';
    };
    WorkspaceFrontendContribution.prototype.confirmOverwrite = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var confirmed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Electron already handles the confirmation so do not prompt again.
                        if (this.isElectron()) {
                            return [2 /*return*/, true];
                        }
                        return [4 /*yield*/, new browser_1.ConfirmDialog({
                                title: 'Overwrite',
                                msg: "Do you really want to overwrite \"" + uri.toString() + "\"?"
                            }).open()];
                    case 1:
                        confirmed = _a.sent();
                        return [2 /*return*/, !!confirmed];
                }
            });
        });
    };
    WorkspaceFrontendContribution.prototype.isElectron = function () {
        return core_1.environment.electron.is();
    };
    /**
     * Get the current workspace URI.
     *
     * @returns the current workspace URI.
     */
    WorkspaceFrontendContribution.prototype.getCurrentWorkspaceUri = function () {
        var _a;
        return (_a = this.workspaceService.workspace) === null || _a === void 0 ? void 0 : _a.resource;
    };
    var WorkspaceFrontendContribution_1;
    __decorate([
        inversify_1.inject(file_service_1.FileService),
        __metadata("design:type", file_service_1.FileService)
    ], WorkspaceFrontendContribution.prototype, "fileService", void 0);
    __decorate([
        inversify_1.inject(browser_1.OpenerService),
        __metadata("design:type", Object)
    ], WorkspaceFrontendContribution.prototype, "openerService", void 0);
    __decorate([
        inversify_1.inject(workspace_service_1.WorkspaceService),
        __metadata("design:type", workspace_service_1.WorkspaceService)
    ], WorkspaceFrontendContribution.prototype, "workspaceService", void 0);
    __decorate([
        inversify_1.inject(browser_1.StorageService),
        __metadata("design:type", Object)
    ], WorkspaceFrontendContribution.prototype, "workspaceStorage", void 0);
    __decorate([
        inversify_1.inject(browser_1.LabelProvider),
        __metadata("design:type", browser_1.LabelProvider)
    ], WorkspaceFrontendContribution.prototype, "labelProvider", void 0);
    __decorate([
        inversify_1.inject(quick_open_workspace_1.QuickOpenWorkspace),
        __metadata("design:type", quick_open_workspace_1.QuickOpenWorkspace)
    ], WorkspaceFrontendContribution.prototype, "quickOpenWorkspace", void 0);
    __decorate([
        inversify_1.inject(browser_2.FileDialogService),
        __metadata("design:type", Object)
    ], WorkspaceFrontendContribution.prototype, "fileDialogService", void 0);
    __decorate([
        inversify_1.inject(workspace_preferences_1.WorkspacePreferences),
        __metadata("design:type", Object)
    ], WorkspaceFrontendContribution.prototype, "preferences", void 0);
    __decorate([
        inversify_1.inject(common_1.SelectionService),
        __metadata("design:type", common_1.SelectionService)
    ], WorkspaceFrontendContribution.prototype, "selectionService", void 0);
    __decorate([
        inversify_1.inject(common_1.CommandRegistry),
        __metadata("design:type", common_1.CommandRegistry)
    ], WorkspaceFrontendContribution.prototype, "commandRegistry", void 0);
    __decorate([
        inversify_1.inject(context_key_service_1.ContextKeyService),
        __metadata("design:type", context_key_service_1.ContextKeyService)
    ], WorkspaceFrontendContribution.prototype, "contextKeyService", void 0);
    __decorate([
        inversify_1.inject(encoding_registry_1.EncodingRegistry),
        __metadata("design:type", encoding_registry_1.EncodingRegistry)
    ], WorkspaceFrontendContribution.prototype, "encodingRegistry", void 0);
    __decorate([
        inversify_1.inject(preference_configurations_1.PreferenceConfigurations),
        __metadata("design:type", preference_configurations_1.PreferenceConfigurations)
    ], WorkspaceFrontendContribution.prototype, "preferenceConfigurations", void 0);
    WorkspaceFrontendContribution = WorkspaceFrontendContribution_1 = __decorate([
        inversify_1.injectable()
    ], WorkspaceFrontendContribution);
    return WorkspaceFrontendContribution;
}());
exports.WorkspaceFrontendContribution = WorkspaceFrontendContribution;
(function (WorkspaceFrontendContribution) {
    /**
     * File filter for all Theia and VS Code workspace file types.
     */
    WorkspaceFrontendContribution.DEFAULT_FILE_FILTER = {
        'Theia Workspace (*.theia-workspace)': [common_2.THEIA_EXT],
        'VS Code Workspace (*.code-workspace)': [common_2.VSCODE_EXT]
    };
    /**
     * Returns with an `OpenFileDialogProps` for opening the `Open Workspace` dialog.
     */
    function createOpenWorkspaceOpenFileDialogProps(options) {
        var electron = options.electron, type = options.type, supportMultiRootWorkspace = options.supportMultiRootWorkspace;
        var title = workspace_commands_1.WorkspaceCommands.OPEN_WORKSPACE.dialogLabel;
        // If browser
        if (!electron) {
            // and multi-root workspace is supported, it is always folder + workspace files.
            if (supportMultiRootWorkspace) {
                return {
                    title: title,
                    canSelectFiles: true,
                    canSelectFolders: true,
                    filters: WorkspaceFrontendContribution.DEFAULT_FILE_FILTER
                };
            }
            else {
                // otherwise, it is always folders. No files at all.
                return {
                    title: title,
                    canSelectFiles: false,
                    canSelectFolders: true
                };
            }
        }
        // If electron
        if (core_1.OS.Type.OSX === type) {
            // `Finder` can select folders and files at the same time. We allow folders and workspace files.
            return {
                title: title,
                canSelectFiles: true,
                canSelectFolders: true,
                filters: WorkspaceFrontendContribution.DEFAULT_FILE_FILTER
            };
        }
        // In electron, only workspace files can be selected when the multi-root workspace feature is enabled.
        if (supportMultiRootWorkspace) {
            return {
                title: title,
                canSelectFiles: true,
                canSelectFolders: false,
                filters: WorkspaceFrontendContribution.DEFAULT_FILE_FILTER
            };
        }
        // Otherwise, it is always a folder.
        return {
            title: title,
            canSelectFiles: false,
            canSelectFolders: true
        };
    }
    WorkspaceFrontendContribution.createOpenWorkspaceOpenFileDialogProps = createOpenWorkspaceOpenFileDialogProps;
})(WorkspaceFrontendContribution = exports.WorkspaceFrontendContribution || (exports.WorkspaceFrontendContribution = {}));
exports.WorkspaceFrontendContribution = WorkspaceFrontendContribution;
//# sourceMappingURL=workspace-frontend-contribution.js.map