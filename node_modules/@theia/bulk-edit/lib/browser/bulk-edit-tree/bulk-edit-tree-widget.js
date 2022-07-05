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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BulkEditTreeWidget = exports.BULK_EDIT_WIDGET_NAME = exports.BULK_EDIT_TREE_WIDGET_ID = void 0;
var inversify_1 = require("inversify");
var browser_1 = require("@theia/core/lib/browser");
var React = require("react");
var bulk_edit_tree_1 = require("./bulk-edit-tree");
var bulk_edit_tree_model_1 = require("./bulk-edit-tree-model");
var browser_2 = require("@theia/filesystem/lib/browser");
var uri_1 = require("@theia/core/lib/common/uri");
var browser_3 = require("@theia/editor/lib/browser");
var browser_4 = require("@theia/core/lib/browser");
var in_memory_text_resource_1 = require("./in-memory-text-resource");
var disposable_1 = require("@theia/core/lib/common/disposable");
var quick_view_service_1 = require("@theia/core/lib/browser/quick-view-service");
exports.BULK_EDIT_TREE_WIDGET_ID = 'bulkedit';
exports.BULK_EDIT_WIDGET_NAME = 'Refactor Preview';
var BulkEditTreeWidget = /** @class */ (function (_super) {
    __extends(BulkEditTreeWidget, _super);
    function BulkEditTreeWidget(treeProps, model, contextMenuRenderer) {
        var _this = _super.call(this, treeProps, model, contextMenuRenderer) || this;
        _this.treeProps = treeProps;
        _this.model = model;
        _this.contextMenuRenderer = contextMenuRenderer;
        _this.editorWidgets = [];
        _this.id = exports.BULK_EDIT_TREE_WIDGET_ID;
        _this.title.label = exports.BULK_EDIT_WIDGET_NAME;
        _this.title.caption = exports.BULK_EDIT_WIDGET_NAME;
        _this.title.closable = true;
        _this.addClass('theia-bulk-edit-container');
        _this.toDispose.push(disposable_1.Disposable.create(function () {
            _this.disposeEditors();
        }));
        return _this;
    }
    BulkEditTreeWidget.prototype.initModel = function (workspaceEdit) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = (_a = this.model).initModel;
                        _c = [workspaceEdit];
                        return [4 /*yield*/, this.getFileContentsMap(workspaceEdit)];
                    case 1: return [4 /*yield*/, _b.apply(_a, _c.concat([_d.sent()]))];
                    case 2:
                        _d.sent();
                        this.quickView.showItem(exports.BULK_EDIT_WIDGET_NAME);
                        return [2 /*return*/];
                }
            });
        });
    };
    BulkEditTreeWidget.prototype.handleClickEvent = function (node, event) {
        _super.prototype.handleClickEvent.call(this, node, event);
        if (bulk_edit_tree_1.BulkEditNode.is(node)) {
            this.doOpen(node);
        }
    };
    BulkEditTreeWidget.prototype.handleDown = function (event) {
        var node = this.model.getNextSelectableNode();
        _super.prototype.handleDown.call(this, event);
        if (bulk_edit_tree_1.BulkEditNode.is(node)) {
            this.doOpen(node);
        }
    };
    BulkEditTreeWidget.prototype.handleUp = function (event) {
        var node = this.model.getPrevSelectableNode();
        _super.prototype.handleUp.call(this, event);
        if (bulk_edit_tree_1.BulkEditNode.is(node)) {
            this.doOpen(node);
        }
    };
    BulkEditTreeWidget.prototype.renderTree = function (model) {
        if (browser_1.CompositeTreeNode.is(model.root) && model.root.children.length > 0) {
            return _super.prototype.renderTree.call(this, model);
        }
        return React.createElement("div", { className: 'theia-widget-noInfo noEdits' }, "No edits have been detected in the workspace so far.");
    };
    BulkEditTreeWidget.prototype.renderCaption = function (node, props) {
        if (bulk_edit_tree_1.BulkEditInfoNode.is(node)) {
            return this.decorateBulkEditInfoNode(node);
        }
        else if (bulk_edit_tree_1.BulkEditNode.is(node)) {
            return this.decorateBulkEditNode(node);
        }
        return 'caption';
    };
    BulkEditTreeWidget.prototype.decorateBulkEditNode = function (node) {
        if ((node === null || node === void 0 ? void 0 : node.parent) && (node === null || node === void 0 ? void 0 : node.bulkEdit) && ('edit' in (node === null || node === void 0 ? void 0 : node.bulkEdit))) {
            var bulkEdit = node.bulkEdit;
            var parent_1 = node.parent;
            if (parent_1 === null || parent_1 === void 0 ? void 0 : parent_1.fileContents) {
                var lines = parent_1.fileContents.split('\n');
                var startLineNum = +bulkEdit.edit.range.startLineNumber;
                if (lines.length > startLineNum) {
                    var startColumn = +bulkEdit.edit.range.startColumn;
                    var endColumn = +bulkEdit.edit.range.endColumn;
                    var lineText = lines[startLineNum - 1];
                    var beforeMatch = (startColumn > 26 ? '... ' : '') + lineText.substr(0, startColumn - 1).substr(-25);
                    var replacedText = lineText.substring(startColumn - 1, endColumn - 1);
                    var afterMatch = lineText.substr(startColumn - 1 + replacedText.length, 75);
                    return React.createElement("div", { className: 'bulkEditNode' },
                        React.createElement("div", { className: 'message' },
                            beforeMatch,
                            React.createElement("span", { className: "replaced-text" }, replacedText),
                            React.createElement("span", { className: "inserted-text" }, bulkEdit.edit.text),
                            afterMatch));
                }
            }
        }
    };
    BulkEditTreeWidget.prototype.decorateBulkEditInfoNode = function (node) {
        var icon = this.toNodeIcon(node);
        var name = this.toNodeName(node);
        var description = this.toNodeDescription(node);
        var path = this.labelProvider.getLongName(node.uri.withScheme('bulkedit'));
        return React.createElement("div", { title: path, className: 'bulkEditInfoNode' },
            icon && React.createElement("div", { className: icon + ' file-icon' }),
            React.createElement("div", { className: 'name' }, name),
            React.createElement("div", { className: 'path' }, description));
    };
    BulkEditTreeWidget.prototype.getFileContentsMap = function (workspaceEdit) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var fileContentMap, _c, _d, element, filePath, fileUri, resource, _e, _f, _g, e_1_1;
            var e_1, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        fileContentMap = new Map();
                        if (!(workspaceEdit === null || workspaceEdit === void 0 ? void 0 : workspaceEdit.edits)) return [3 /*break*/, 9];
                        _j.label = 1;
                    case 1:
                        _j.trys.push([1, 7, 8, 9]);
                        _c = __values(workspaceEdit.edits), _d = _c.next();
                        _j.label = 2;
                    case 2:
                        if (!!_d.done) return [3 /*break*/, 6];
                        element = _d.value;
                        if (!element) return [3 /*break*/, 5];
                        filePath = (('newUri' in element) && ((_a = element === null || element === void 0 ? void 0 : element.newUri) === null || _a === void 0 ? void 0 : _a.path)) || (('resource' in element) && ((_b = element === null || element === void 0 ? void 0 : element.resource) === null || _b === void 0 ? void 0 : _b.path));
                        if (!(filePath && !fileContentMap.has(filePath))) return [3 /*break*/, 5];
                        fileUri = new uri_1.default(filePath).withScheme('file');
                        return [4 /*yield*/, this.fileResourceResolver.resolve(fileUri)];
                    case 3:
                        resource = _j.sent();
                        _f = (_e = fileContentMap).set;
                        _g = [filePath];
                        return [4 /*yield*/, resource.readContents()];
                    case 4:
                        _f.apply(_e, _g.concat([_j.sent()]));
                        _j.label = 5;
                    case 5:
                        _d = _c.next();
                        return [3 /*break*/, 2];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_1_1 = _j.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (_d && !_d.done && (_h = _c.return)) _h.call(_c);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/, fileContentMap];
                }
            });
        });
    };
    BulkEditTreeWidget.prototype.doOpen = function (node) {
        return __awaiter(this, void 0, void 0, function () {
            var resultNode, leftUri, rightUri, diffUri, editorWidget;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(node && node.parent && node.bulkEdit && ('edit' in node.bulkEdit))) return [3 /*break*/, 3];
                        resultNode = node.parent;
                        leftUri = node.uri;
                        return [4 /*yield*/, this.createReplacePreview(resultNode)];
                    case 1:
                        rightUri = _a.sent();
                        diffUri = browser_4.DiffUris.encode(leftUri, rightUri);
                        return [4 /*yield*/, this.editorManager.open(diffUri, this.getEditorOptions(node))];
                    case 2:
                        editorWidget = _a.sent();
                        this.editorWidgets.push(editorWidget);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BulkEditTreeWidget.prototype.createReplacePreview = function (bulkEditInfoNode) {
        return __awaiter(this, void 0, void 0, function () {
            var fileUri, lines;
            return __generator(this, function (_a) {
                fileUri = bulkEditInfoNode.uri;
                lines = [];
                if (bulkEditInfoNode === null || bulkEditInfoNode === void 0 ? void 0 : bulkEditInfoNode.fileContents) {
                    lines = bulkEditInfoNode.fileContents.split('\n');
                    bulkEditInfoNode.children.map(function (node) {
                        if (node.bulkEdit && ('edit' in node.bulkEdit)) {
                            var startLineNum = node.bulkEdit.edit.range.startLineNumber;
                            if (lines.length > startLineNum) {
                                var startColumn = node.bulkEdit.edit.range.startColumn;
                                var endColumn = node.bulkEdit.edit.range.endColumn;
                                var lineText = lines[startLineNum - 1];
                                var beforeMatch = lineText.substr(0, startColumn - 1);
                                var replacedText = lineText.substring(startColumn - 1, endColumn - 1);
                                var afterMatch = lineText.substr(startColumn - 1 + replacedText.length);
                                lines[startLineNum - 1] = beforeMatch + node.bulkEdit.edit.text + afterMatch;
                            }
                        }
                    });
                }
                return [2 /*return*/, fileUri.withScheme(in_memory_text_resource_1.MEMORY_TEXT).withQuery(lines.join('\n'))];
            });
        });
    };
    BulkEditTreeWidget.prototype.getEditorOptions = function (node) {
        var _a, _b;
        var options = {};
        if (('edit' in node.bulkEdit) && ((_b = (_a = node === null || node === void 0 ? void 0 : node.bulkEdit) === null || _a === void 0 ? void 0 : _a.edit) === null || _b === void 0 ? void 0 : _b.range)) {
            options = {
                selection: {
                    start: {
                        line: node.bulkEdit.edit.range.startLineNumber - 1,
                        character: node.bulkEdit.edit.range.startColumn - 1
                    },
                    end: {
                        line: node.bulkEdit.edit.range.endLineNumber - 1,
                        character: node.bulkEdit.edit.range.endColumn - 1
                    }
                }
            };
        }
        return options;
    };
    BulkEditTreeWidget.prototype.disposeEditors = function () {
        this.editorWidgets.forEach(function (w) { return w.dispose(); });
        this.quickView.hideItem(exports.BULK_EDIT_WIDGET_NAME);
    };
    __decorate([
        inversify_1.inject(browser_2.FileResourceResolver),
        __metadata("design:type", browser_2.FileResourceResolver)
    ], BulkEditTreeWidget.prototype, "fileResourceResolver", void 0);
    __decorate([
        inversify_1.inject(browser_3.EditorManager),
        __metadata("design:type", browser_3.EditorManager)
    ], BulkEditTreeWidget.prototype, "editorManager", void 0);
    __decorate([
        inversify_1.inject(quick_view_service_1.QuickViewService),
        __metadata("design:type", quick_view_service_1.QuickViewService)
    ], BulkEditTreeWidget.prototype, "quickView", void 0);
    BulkEditTreeWidget = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(browser_1.TreeProps)),
        __param(1, inversify_1.inject(bulk_edit_tree_model_1.BulkEditTreeModel)),
        __param(2, inversify_1.inject(browser_1.ContextMenuRenderer)),
        __metadata("design:paramtypes", [Object, bulk_edit_tree_model_1.BulkEditTreeModel,
            browser_1.ContextMenuRenderer])
    ], BulkEditTreeWidget);
    return BulkEditTreeWidget;
}(browser_1.TreeWidget));
exports.BulkEditTreeWidget = BulkEditTreeWidget;
//# sourceMappingURL=bulk-edit-tree-widget.js.map