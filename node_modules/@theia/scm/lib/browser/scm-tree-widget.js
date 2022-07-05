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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScmInlineAction = exports.ScmInlineActions = exports.ScmResourceFolderElement = exports.ScmResourceGroupElement = exports.ScmResourceComponent = exports.ScmElement = exports.ScmTreeWidget = void 0;
/* eslint-disable no-null/no-null, @typescript-eslint/no-explicit-any */
var React = require("react");
var inversify_1 = require("inversify");
var uri_1 = require("@theia/core/lib/common/uri");
var os_1 = require("@theia/core/lib/common/os");
var disposable_1 = require("@theia/core/lib/common/disposable");
var tree_1 = require("@theia/core/lib/browser/tree");
var menu_1 = require("@theia/core/lib/common/menu");
var command_1 = require("@theia/core/lib/common/command");
var browser_1 = require("@theia/core/lib/browser");
var scm_context_key_service_1 = require("./scm-context-key-service");
var browser_2 = require("@theia/editor/lib/browser");
var icon_theme_service_1 = require("@theia/core/lib/browser/icon-theme-service");
var scm_tree_model_1 = require("./scm-tree-model");
var ScmTreeWidget = /** @class */ (function (_super) {
    __extends(ScmTreeWidget, _super);
    function ScmTreeWidget(props, treeModel, contextMenuRenderer) {
        var _this = _super.call(this, props, treeModel, contextMenuRenderer) || this;
        _this.props = props;
        _this.treeModel = treeModel;
        _this.contextMenuRenderer = contextMenuRenderer;
        _this.id = ScmTreeWidget_1.ID;
        _this.addClass('groups-outer-container');
        _this.model = treeModel;
        return _this;
    }
    ScmTreeWidget_1 = ScmTreeWidget;
    Object.defineProperty(ScmTreeWidget.prototype, "viewMode", {
        get: function () {
            return this.model.viewMode;
        },
        set: function (id) {
            // Close the search box because the structure of the tree will change dramatically
            // and the search results will be out of date.
            this.searchBox.hide();
            this.model.viewMode = id;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Render the node given the tree node and node properties.
     * @param node the tree node.
     * @param props the node properties.
     */
    ScmTreeWidget.prototype.renderNode = function (node, props) {
        var _this = this;
        var _a;
        if (!tree_1.TreeNode.isVisible(node)) {
            return undefined;
        }
        var attributes = this.createNodeAttributes(node, props);
        var label = this.labelProvider.getName(node);
        var searchHighlights = (_a = this.searchHighlights) === null || _a === void 0 ? void 0 : _a.get(node.id);
        // The group nodes should not be subject to highlighting.
        var caption = (searchHighlights && !scm_tree_model_1.ScmFileChangeGroupNode.is(node)) ? this.toReactNode(label, searchHighlights) : label;
        if (scm_tree_model_1.ScmFileChangeGroupNode.is(node)) {
            var content = React.createElement(ScmResourceGroupElement, { key: "" + node.groupId, model: this.model, treeNode: node, renderExpansionToggle: function () { return _this.renderExpansionToggle(node, props); }, contextMenuRenderer: this.contextMenuRenderer, commands: this.commands, menus: this.menus, contextKeys: this.contextKeys, labelProvider: this.labelProvider, corePreferences: this.corePreferences, caption: caption });
            return React.createElement('div', attributes, content);
        }
        if (scm_tree_model_1.ScmFileChangeFolderNode.is(node)) {
            var content = React.createElement(ScmResourceFolderElement, { key: String(node.sourceUri), model: this.model, treeNode: node, sourceUri: node.sourceUri, renderExpansionToggle: function () { return _this.renderExpansionToggle(node, props); }, contextMenuRenderer: this.contextMenuRenderer, commands: this.commands, menus: this.menus, contextKeys: this.contextKeys, labelProvider: this.labelProvider, corePreferences: this.corePreferences, caption: caption });
            return React.createElement('div', attributes, content);
        }
        if (scm_tree_model_1.ScmFileChangeNode.is(node)) {
            var parentPath = (node.parent && scm_tree_model_1.ScmFileChangeFolderNode.is(node.parent))
                ? new uri_1.default(node.parent.sourceUri) : new uri_1.default(this.model.rootUri);
            var content = React.createElement(ScmResourceComponent, __assign({ key: node.sourceUri, model: this.model, treeNode: node, contextMenuRenderer: this.contextMenuRenderer, commands: this.commands, menus: this.menus, contextKeys: this.contextKeys, labelProvider: this.labelProvider, corePreferences: this.corePreferences, caption: caption }, __assign(__assign({}, this.props), { parentPath: parentPath, sourceUri: node.sourceUri, decorations: node.decorations, renderExpansionToggle: function () { return _this.renderExpansionToggle(node, props); } })));
            return React.createElement('div', attributes, content);
        }
        return _super.prototype.renderNode.call(this, node, props);
    };
    ScmTreeWidget.prototype.createContainerAttributes = function () {
        if (this.model.canTabToWidget()) {
            return __assign(__assign({}, _super.prototype.createContainerAttributes.call(this)), { tabIndex: 0 });
        }
        return _super.prototype.createContainerAttributes.call(this);
    };
    /**
     * The ARROW_LEFT key controls both the movement around the file tree and also
     * the movement through the change chunks within a file.
     *
     * If the selected tree node is a folder then the ARROW_LEFT key behaves exactly
     * as it does in explorer.  It collapses the tree node if the folder is expanded and
     * it moves the selection up to the parent folder if the folder is collapsed (no-op if no parent folder, as
     * group headers are not selectable).  This behavior is the default behavior implemented
     * in the TreeWidget super class.
     *
     * If the selected tree node is a file then the ARROW_LEFT key moves up through the
     * change chunks within each file.  If the selected chunk is the first chunk in the file
     * then the file selection is moved to the previous file (no-op if no previous file).
     *
     * Note that when cursoring through change chunks, the ARROW_LEFT key cannot be used to
     * move up through the parent folders of the file tree.  If users want to do this, using
     * keys only, then they must press ARROW_UP repeatedly until the selected node is the folder
     * node and then press ARROW_LEFT.
     */
    ScmTreeWidget.prototype.handleLeft = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var selectedNode, selectedResource, widget, diffNavigator, previousNode, previousResource;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.model.selectedNodes.length === 1)) return [3 /*break*/, 2];
                        selectedNode = this.model.selectedNodes[0];
                        if (!scm_tree_model_1.ScmFileChangeNode.is(selectedNode)) return [3 /*break*/, 2];
                        selectedResource = this.model.getResourceFromNode(selectedNode);
                        if (!selectedResource) {
                            return [2 /*return*/, _super.prototype.handleLeft.call(this, event)];
                        }
                        return [4 /*yield*/, this.openResource(selectedResource)];
                    case 1:
                        widget = _a.sent();
                        if (widget) {
                            diffNavigator = this.diffNavigatorProvider(widget.editor);
                            if (diffNavigator.canNavigate() && diffNavigator.hasPrevious()) {
                                diffNavigator.previous();
                            }
                            else {
                                previousNode = this.moveToPreviousFileNode();
                                if (previousNode) {
                                    previousResource = this.model.getResourceFromNode(previousNode);
                                    if (previousResource) {
                                        this.openResource(previousResource);
                                    }
                                }
                            }
                            return [2 /*return*/];
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/, _super.prototype.handleLeft.call(this, event)];
                }
            });
        });
    };
    /**
     * The ARROW_RIGHT key controls both the movement around the file tree and also
     * the movement through the change chunks within a file.
     *
     * If the selected tree node is a folder then the ARROW_RIGHT key behaves exactly
     * as it does in explorer.  It expands the tree node if the folder is collapsed and
     * it moves the selection to the first child node if the folder is expanded.
     * This behavior is the default behavior implemented
     * in the TreeWidget super class.
     *
     * If the selected tree node is a file then the ARROW_RIGHT key moves down through the
     * change chunks within each file.  If the selected chunk is the last chunk in the file
     * then the file selection is moved to the next file (no-op if no next file).
     */
    ScmTreeWidget.prototype.handleRight = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var firstNode, selectedNode, selectedResource, widget, diffNavigator, nextNode, nextResource;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.model.selectedNodes.length === 0) {
                            firstNode = this.getFirstSelectableNode();
                            // Selects the first visible resource as none are selected.
                            if (!firstNode) {
                                return [2 /*return*/];
                            }
                            this.model.selectNode(firstNode);
                            return [2 /*return*/];
                        }
                        if (!(this.model.selectedNodes.length === 1)) return [3 /*break*/, 2];
                        selectedNode = this.model.selectedNodes[0];
                        if (!scm_tree_model_1.ScmFileChangeNode.is(selectedNode)) return [3 /*break*/, 2];
                        selectedResource = this.model.getResourceFromNode(selectedNode);
                        if (!selectedResource) {
                            return [2 /*return*/, _super.prototype.handleRight.call(this, event)];
                        }
                        return [4 /*yield*/, this.openResource(selectedResource)];
                    case 1:
                        widget = _a.sent();
                        if (widget) {
                            diffNavigator = this.diffNavigatorProvider(widget.editor);
                            if (diffNavigator.canNavigate() && diffNavigator.hasNext()) {
                                diffNavigator.next();
                            }
                            else {
                                nextNode = this.moveToNextFileNode();
                                if (nextNode) {
                                    nextResource = this.model.getResourceFromNode(nextNode);
                                    if (nextResource) {
                                        this.openResource(nextResource);
                                    }
                                }
                            }
                        }
                        return [2 /*return*/];
                    case 2: return [2 /*return*/, _super.prototype.handleRight.call(this, event)];
                }
            });
        });
    };
    ScmTreeWidget.prototype.handleEnter = function (event) {
        if (this.model.selectedNodes.length === 1) {
            var selectedNode = this.model.selectedNodes[0];
            if (scm_tree_model_1.ScmFileChangeNode.is(selectedNode)) {
                var selectedResource = this.model.getResourceFromNode(selectedNode);
                if (selectedResource) {
                    this.openResource(selectedResource);
                }
                return;
            }
        }
        _super.prototype.handleEnter.call(this, event);
    };
    ScmTreeWidget.prototype.goToPreviousChange = function () {
        return __awaiter(this, void 0, void 0, function () {
            var selectedNode, selectedResource, widget, diffNavigator, previousNode, previousResource;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.model.selectedNodes.length === 1)) return [3 /*break*/, 2];
                        selectedNode = this.model.selectedNodes[0];
                        if (!scm_tree_model_1.ScmFileChangeNode.is(selectedNode)) return [3 /*break*/, 2];
                        if (!scm_tree_model_1.ScmFileChangeNode.is(selectedNode)) return [3 /*break*/, 2];
                        selectedResource = this.model.getResourceFromNode(selectedNode);
                        if (!selectedResource) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.openResource(selectedResource)];
                    case 1:
                        widget = _a.sent();
                        if (widget) {
                            diffNavigator = this.diffNavigatorProvider(widget.editor);
                            if (diffNavigator.canNavigate() && diffNavigator.hasPrevious()) {
                                diffNavigator.previous();
                            }
                            else {
                                previousNode = this.moveToPreviousFileNode();
                                if (previousNode) {
                                    previousResource = this.model.getResourceFromNode(previousNode);
                                    if (previousResource) {
                                        this.openResource(previousResource);
                                    }
                                }
                            }
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    ScmTreeWidget.prototype.goToNextChange = function () {
        return __awaiter(this, void 0, void 0, function () {
            var firstNode, selectedNode, selectedResource, widget, diffNavigator, nextNode, nextResource;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.model.selectedNodes.length === 0) {
                            firstNode = this.getFirstSelectableNode();
                            // Selects the first visible resource as none are selected.
                            if (!firstNode) {
                                return [2 /*return*/];
                            }
                            this.model.selectNode(firstNode);
                            return [2 /*return*/];
                        }
                        if (!(this.model.selectedNodes.length === 1)) return [3 /*break*/, 2];
                        selectedNode = this.model.selectedNodes[0];
                        if (!scm_tree_model_1.ScmFileChangeNode.is(selectedNode)) return [3 /*break*/, 2];
                        selectedResource = this.model.getResourceFromNode(selectedNode);
                        if (!selectedResource) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.openResource(selectedResource)];
                    case 1:
                        widget = _a.sent();
                        if (widget) {
                            diffNavigator = this.diffNavigatorProvider(widget.editor);
                            if (diffNavigator.canNavigate() && diffNavigator.hasNext()) {
                                diffNavigator.next();
                            }
                            else {
                                nextNode = this.moveToNextFileNode();
                                if (nextNode) {
                                    nextResource = this.model.getResourceFromNode(nextNode);
                                    if (nextResource) {
                                        this.openResource(nextResource);
                                    }
                                }
                            }
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    ScmTreeWidget.prototype.getFirstSelectableNode = function () {
        if (this.model.root) {
            var root = this.model.root;
            var groupNode = root.children[0];
            return groupNode.children[0];
        }
    };
    ScmTreeWidget.prototype.moveToPreviousFileNode = function () {
        var previousNode = this.model.getPrevSelectableNode();
        while (previousNode) {
            if (scm_tree_model_1.ScmFileChangeNode.is(previousNode)) {
                this.model.selectNode(previousNode);
                return previousNode;
            }
            previousNode = this.model.getPrevSelectableNode(previousNode);
        }
        ;
    };
    ScmTreeWidget.prototype.moveToNextFileNode = function () {
        var nextNode = this.model.getNextSelectableNode();
        while (nextNode) {
            if (scm_tree_model_1.ScmFileChangeNode.is(nextNode)) {
                this.model.selectNode(nextNode);
                return nextNode;
            }
            nextNode = this.model.getNextSelectableNode(nextNode);
        }
        ;
    };
    ScmTreeWidget.prototype.openResource = function (resource) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1, standaloneEditor, resourcePath, _a, _b, widget, resourceUri, editorResourcePath;
            var e_2, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, resource.open()];
                    case 1:
                        _d.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _d.sent();
                        console.error('Failed to open a SCM resource', e_1);
                        return [2 /*return*/, undefined];
                    case 3:
                        resourcePath = resource.sourceUri.path.toString();
                        try {
                            for (_a = __values(this.editorManager.all), _b = _a.next(); !_b.done; _b = _a.next()) {
                                widget = _b.value;
                                resourceUri = widget.editor.document.uri;
                                editorResourcePath = new uri_1.default(resourceUri).path.toString();
                                if (resourcePath === editorResourcePath) {
                                    if (widget.editor.uri.scheme === browser_1.DiffUris.DIFF_SCHEME) {
                                        // prefer diff editor
                                        return [2 /*return*/, widget];
                                    }
                                    else {
                                        standaloneEditor = widget;
                                    }
                                }
                                if (widget.editor.uri.scheme === browser_1.DiffUris.DIFF_SCHEME
                                    && resourceUri === resource.sourceUri.toString()) {
                                    return [2 /*return*/, widget];
                                }
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        // fallback to standalone editor
                        return [2 /*return*/, standaloneEditor];
                }
            });
        });
    };
    ScmTreeWidget.prototype.getPaddingLeft = function (node, props) {
        if (this.viewMode === 'list') {
            if (props.depth === 1) {
                return this.props.expansionTogglePadding;
            }
        }
        return _super.prototype.getPaddingLeft.call(this, node, props);
    };
    ScmTreeWidget.prototype.needsExpansionTogglePadding = function (node) {
        var theme = this.iconThemeService.getDefinition(this.iconThemeService.current);
        if (theme && (theme.hidesExplorerArrows || (theme.hasFileIcons && !theme.hasFolderIcons))) {
            return false;
        }
        return _super.prototype.needsExpansionTogglePadding.call(this, node);
    };
    var ScmTreeWidget_1;
    ScmTreeWidget.ID = 'scm-resource-widget';
    ScmTreeWidget.RESOURCE_GROUP_CONTEXT_MENU = ['RESOURCE_GROUP_CONTEXT_MENU'];
    ScmTreeWidget.RESOURCE_GROUP_INLINE_MENU = ['RESOURCE_GROUP_INLINE_MENU'];
    ScmTreeWidget.RESOURCE_FOLDER_CONTEXT_MENU = ['RESOURCE_FOLDER_CONTEXT_MENU'];
    ScmTreeWidget.RESOURCE_FOLDER_INLINE_MENU = ['RESOURCE_FOLDER_INLINE_MENU'];
    ScmTreeWidget.RESOURCE_INLINE_MENU = ['RESOURCE_INLINE_MENU'];
    ScmTreeWidget.RESOURCE_CONTEXT_MENU = ['RESOURCE_CONTEXT_MENU'];
    __decorate([
        inversify_1.inject(menu_1.MenuModelRegistry),
        __metadata("design:type", menu_1.MenuModelRegistry)
    ], ScmTreeWidget.prototype, "menus", void 0);
    __decorate([
        inversify_1.inject(command_1.CommandRegistry),
        __metadata("design:type", command_1.CommandRegistry)
    ], ScmTreeWidget.prototype, "commands", void 0);
    __decorate([
        inversify_1.inject(browser_1.CorePreferences),
        __metadata("design:type", Object)
    ], ScmTreeWidget.prototype, "corePreferences", void 0);
    __decorate([
        inversify_1.inject(scm_context_key_service_1.ScmContextKeyService),
        __metadata("design:type", scm_context_key_service_1.ScmContextKeyService)
    ], ScmTreeWidget.prototype, "contextKeys", void 0);
    __decorate([
        inversify_1.inject(browser_2.EditorManager),
        __metadata("design:type", browser_2.EditorManager)
    ], ScmTreeWidget.prototype, "editorManager", void 0);
    __decorate([
        inversify_1.inject(browser_2.DiffNavigatorProvider),
        __metadata("design:type", Function)
    ], ScmTreeWidget.prototype, "diffNavigatorProvider", void 0);
    __decorate([
        inversify_1.inject(icon_theme_service_1.IconThemeService),
        __metadata("design:type", icon_theme_service_1.IconThemeService)
    ], ScmTreeWidget.prototype, "iconThemeService", void 0);
    ScmTreeWidget = ScmTreeWidget_1 = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(tree_1.TreeProps)),
        __param(1, inversify_1.inject(tree_1.TreeModel)),
        __param(2, inversify_1.inject(browser_1.ContextMenuRenderer)),
        __metadata("design:paramtypes", [Object, Object, browser_1.ContextMenuRenderer])
    ], ScmTreeWidget);
    return ScmTreeWidget;
}(tree_1.TreeWidget));
exports.ScmTreeWidget = ScmTreeWidget;
(function (ScmTreeWidget) {
    var Styles;
    (function (Styles) {
        Styles.NO_SELECT = 'no-select';
    })(Styles = ScmTreeWidget.Styles || (ScmTreeWidget.Styles = {}));
})(ScmTreeWidget = exports.ScmTreeWidget || (exports.ScmTreeWidget = {}));
exports.ScmTreeWidget = ScmTreeWidget;
var ScmElement = /** @class */ (function (_super) {
    __extends(ScmElement, _super);
    function ScmElement(props) {
        var _this = _super.call(this, props) || this;
        _this.toDisposeOnUnmount = new disposable_1.DisposableCollection();
        _this.detectHover = function (element) {
            if (element) {
                window.requestAnimationFrame(function () {
                    var hover = element.matches(':hover');
                    _this.setState({ hover: hover });
                });
            }
        };
        _this.showHover = function () { return _this.setState({ hover: true }); };
        _this.hideHover = function () { return _this.setState({ hover: false }); };
        _this.renderContextMenu = function (event) {
            event.preventDefault();
            var _a = _this.props, node = _a.treeNode, contextMenuRenderer = _a.contextMenuRenderer;
            _this.props.model.execInNodeContext(node, function () {
                contextMenuRenderer.render({
                    menuPath: _this.contextMenuPath,
                    anchor: event.nativeEvent,
                    args: _this.contextMenuArgs
                });
            });
        };
        _this.state = {
            hover: false
        };
        var setState = _this.setState.bind(_this);
        _this.setState = function (newState) {
            if (!_this.toDisposeOnUnmount.disposed) {
                setState(newState);
            }
        };
        return _this;
    }
    ScmElement.prototype.componentDidMount = function () {
        this.toDisposeOnUnmount.push(disposable_1.Disposable.create(function () { }));
    };
    ScmElement.prototype.componentWillUnmount = function () {
        this.toDisposeOnUnmount.dispose();
    };
    return ScmElement;
}(React.Component));
exports.ScmElement = ScmElement;
var ScmResourceComponent = /** @class */ (function (_super) {
    __extends(ScmResourceComponent, _super);
    function ScmResourceComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.open = function () {
            var resource = _this.props.model.getResourceFromNode(_this.props.treeNode);
            if (resource) {
                resource.open();
            }
        };
        _this.contextMenuPath = ScmTreeWidget.RESOURCE_CONTEXT_MENU;
        /**
         * Handle the single clicking of nodes present in the widget.
         */
        _this.handleClick = function (event) {
            if (!_this.hasCtrlCmdOrShiftMask(event)) {
                // Determine the behavior based on the preference value.
                var isSingle = _this.props.corePreferences && _this.props.corePreferences['workbench.list.openMode'] === 'singleClick';
                if (isSingle) {
                    _this.open();
                }
            }
        };
        /**
         * Handle the double clicking of nodes present in the widget.
         */
        _this.handleDoubleClick = function () {
            // Determine the behavior based on the preference value.
            var isDouble = _this.props.corePreferences && _this.props.corePreferences['workbench.list.openMode'] === 'doubleClick';
            // Nodes should only be opened through double clicking if the correct preference is set.
            if (isDouble) {
                _this.open();
            }
        };
        return _this;
    }
    ScmResourceComponent.prototype.render = function () {
        var hover = this.state.hover;
        var _a = this.props, model = _a.model, treeNode = _a.treeNode, parentPath = _a.parentPath, sourceUri = _a.sourceUri, decorations = _a.decorations, labelProvider = _a.labelProvider, commands = _a.commands, menus = _a.menus, contextKeys = _a.contextKeys, caption = _a.caption;
        var resourceUri = new uri_1.default(sourceUri);
        var icon = labelProvider.getIcon(resourceUri);
        var color = decorations && decorations.color || '';
        var letter = decorations && decorations.letter || '';
        var tooltip = decorations && decorations.tooltip || '';
        var relativePath = parentPath.relative(resourceUri.parent);
        var path = relativePath ? relativePath.toString() : labelProvider.getLongName(resourceUri.parent);
        return React.createElement("div", { key: sourceUri, className: "scmItem " + tree_1.TREE_NODE_SEGMENT_CLASS + " " + tree_1.TREE_NODE_SEGMENT_GROW_CLASS, onContextMenu: this.renderContextMenu, onMouseEnter: this.showHover, onMouseLeave: this.hideHover, ref: this.detectHover, onClick: this.handleClick, onDoubleClick: this.handleDoubleClick },
            React.createElement("span", { className: icon + ' file-icon' }),
            this.props.renderExpansionToggle(),
            React.createElement("div", { className: "noWrapInfo " + tree_1.TREE_NODE_SEGMENT_GROW_CLASS },
                React.createElement("span", { className: 'name' }, caption),
                React.createElement("span", { className: 'path' }, path)),
            React.createElement(ScmInlineActions, __assign({}, {
                hover: hover,
                menu: menus.getMenu(ScmTreeWidget.RESOURCE_INLINE_MENU),
                args: this.contextMenuArgs,
                commands: commands,
                contextKeys: contextKeys,
                model: model,
                treeNode: treeNode
            }),
                React.createElement("div", { title: tooltip, className: 'status', style: { color: color } }, letter)));
    };
    Object.defineProperty(ScmResourceComponent.prototype, "contextMenuArgs", {
        get: function () {
            var _this = this;
            if (!this.props.model.selectedNodes.some(function (node) { return scm_tree_model_1.ScmFileChangeNode.is(node) && node.sourceUri === _this.props.sourceUri; })) {
                // Clicked node is not in selection, so ignore selection and action on just clicked node
                return this.singleNodeArgs;
            }
            else {
                return this.props.model.getSelectionArgs(this.props.model.selectedNodes);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScmResourceComponent.prototype, "singleNodeArgs", {
        get: function () {
            var selectedResource = this.props.model.getResourceFromNode(this.props.treeNode);
            if (selectedResource) {
                return [selectedResource];
            }
            else {
                // Repository status not yet available. Empty args disables the action.
                return [];
            }
        },
        enumerable: false,
        configurable: true
    });
    ScmResourceComponent.prototype.hasCtrlCmdOrShiftMask = function (event) {
        var metaKey = event.metaKey, ctrlKey = event.ctrlKey, shiftKey = event.shiftKey;
        return (os_1.isOSX && metaKey) || ctrlKey || shiftKey;
    };
    return ScmResourceComponent;
}(ScmElement));
exports.ScmResourceComponent = ScmResourceComponent;
var ScmResourceGroupElement = /** @class */ (function (_super) {
    __extends(ScmResourceGroupElement, _super);
    function ScmResourceGroupElement() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.contextMenuPath = ScmTreeWidget.RESOURCE_GROUP_CONTEXT_MENU;
        return _this;
    }
    ScmResourceGroupElement.prototype.render = function () {
        var hover = this.state.hover;
        var _a = this.props, model = _a.model, treeNode = _a.treeNode, menus = _a.menus, commands = _a.commands, contextKeys = _a.contextKeys, caption = _a.caption;
        return React.createElement("div", { className: "theia-header scm-theia-header " + tree_1.TREE_NODE_SEGMENT_GROW_CLASS, onContextMenu: this.renderContextMenu, onMouseEnter: this.showHover, onMouseLeave: this.hideHover, ref: this.detectHover },
            this.props.renderExpansionToggle(),
            React.createElement("div", { className: "noWrapInfo " + tree_1.TREE_NODE_SEGMENT_GROW_CLASS }, caption),
            React.createElement(ScmInlineActions, __assign({}, {
                hover: hover,
                args: this.contextMenuArgs,
                menu: menus.getMenu(ScmTreeWidget.RESOURCE_GROUP_INLINE_MENU),
                commands: commands,
                contextKeys: contextKeys,
                model: model,
                treeNode: treeNode
            }), this.renderChangeCount()));
    };
    ScmResourceGroupElement.prototype.renderChangeCount = function () {
        var group = this.props.model.getResourceGroupFromNode(this.props.treeNode);
        return React.createElement("div", { className: 'notification-count-container scm-change-count' },
            React.createElement("span", { className: 'notification-count' }, group ? group.resources.length : 0));
    };
    Object.defineProperty(ScmResourceGroupElement.prototype, "contextMenuArgs", {
        get: function () {
            var group = this.props.model.getResourceGroupFromNode(this.props.treeNode);
            if (group) {
                return [group];
            }
            else {
                // Repository status not yet available. Empty args disables the action.
                return [];
            }
        },
        enumerable: false,
        configurable: true
    });
    return ScmResourceGroupElement;
}(ScmElement));
exports.ScmResourceGroupElement = ScmResourceGroupElement;
var ScmResourceFolderElement = /** @class */ (function (_super) {
    __extends(ScmResourceFolderElement, _super);
    function ScmResourceFolderElement() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.contextMenuPath = ScmTreeWidget.RESOURCE_FOLDER_CONTEXT_MENU;
        return _this;
    }
    ScmResourceFolderElement.prototype.render = function () {
        var hover = this.state.hover;
        var _a = this.props, model = _a.model, treeNode = _a.treeNode, sourceUri = _a.sourceUri, labelProvider = _a.labelProvider, commands = _a.commands, menus = _a.menus, contextKeys = _a.contextKeys, caption = _a.caption;
        var sourceFileStat = { uri: sourceUri, isDirectory: true, lastModification: 0 };
        var icon = labelProvider.getIcon(sourceFileStat);
        return React.createElement("div", { key: sourceUri, className: "scmItem  " + tree_1.TREE_NODE_SEGMENT_CLASS + " " + tree_1.TREE_NODE_SEGMENT_GROW_CLASS + " " + ScmTreeWidget.Styles.NO_SELECT, onContextMenu: this.renderContextMenu, onMouseEnter: this.showHover, onMouseLeave: this.hideHover, ref: this.detectHover },
            this.props.renderExpansionToggle(),
            React.createElement("span", { className: icon + ' file-icon' }),
            React.createElement("div", { className: "noWrapInfo " + tree_1.TREE_NODE_SEGMENT_GROW_CLASS },
                React.createElement("span", { className: 'name' }, caption)),
            React.createElement(ScmInlineActions, __assign({}, {
                hover: hover,
                menu: menus.getMenu(ScmTreeWidget.RESOURCE_FOLDER_INLINE_MENU),
                args: this.contextMenuArgs,
                commands: commands,
                contextKeys: contextKeys,
                model: model,
                treeNode: treeNode
            })));
    };
    Object.defineProperty(ScmResourceFolderElement.prototype, "contextMenuArgs", {
        get: function () {
            var _this = this;
            if (!this.props.model.selectedNodes.some(function (node) { return scm_tree_model_1.ScmFileChangeFolderNode.is(node) && node.sourceUri === _this.props.sourceUri; })) {
                // Clicked node is not in selection, so ignore selection and action on just clicked node
                return this.singleNodeArgs;
            }
            else {
                return this.props.model.getSelectionArgs(this.props.model.selectedNodes);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScmResourceFolderElement.prototype, "singleNodeArgs", {
        get: function () {
            return this.props.model.getResourcesFromFolderNode(this.props.treeNode);
        },
        enumerable: false,
        configurable: true
    });
    return ScmResourceFolderElement;
}(ScmElement));
exports.ScmResourceFolderElement = ScmResourceFolderElement;
var ScmInlineActions = /** @class */ (function (_super) {
    __extends(ScmInlineActions, _super);
    function ScmInlineActions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScmInlineActions.prototype.render = function () {
        var _a = this.props, hover = _a.hover, menu = _a.menu, args = _a.args, commands = _a.commands, model = _a.model, treeNode = _a.treeNode, contextKeys = _a.contextKeys, children = _a.children;
        return React.createElement("div", { className: 'theia-scm-inline-actions-container' },
            React.createElement("div", { className: 'theia-scm-inline-actions' }, hover && menu.children
                .map(function (node, index) { return node instanceof menu_1.ActionMenuNode && React.createElement(ScmInlineAction, __assign({ key: index }, { node: node, args: args, commands: commands, model: model, treeNode: treeNode, contextKeys: contextKeys })); })),
            children);
    };
    return ScmInlineActions;
}(React.Component));
exports.ScmInlineActions = ScmInlineActions;
var ScmInlineAction = /** @class */ (function (_super) {
    __extends(ScmInlineAction, _super);
    function ScmInlineAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.execute = function (event) {
            event.stopPropagation();
            var _a = _this.props, commands = _a.commands, node = _a.node, args = _a.args;
            commands.executeCommand.apply(commands, __spread([node.action.commandId], args));
        };
        return _this;
    }
    ScmInlineAction.prototype.render = function () {
        var _a = this.props, node = _a.node, model = _a.model, treeNode = _a.treeNode, args = _a.args, commands = _a.commands, contextKeys = _a.contextKeys;
        var isActive = false;
        model.execInNodeContext(treeNode, function () {
            isActive = contextKeys.match(node.action.when);
        });
        if (!commands.isVisible.apply(commands, __spread([node.action.commandId], args)) || !isActive) {
            return false;
        }
        return React.createElement("div", { className: 'theia-scm-inline-action' },
            React.createElement("a", { className: node.icon, title: node.label, onClick: this.execute }));
    };
    return ScmInlineAction;
}(React.Component));
exports.ScmInlineAction = ScmInlineAction;
//# sourceMappingURL=scm-tree-widget.js.map