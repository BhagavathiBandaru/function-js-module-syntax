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
exports.BulkEditInfoNode = exports.BulkEditNode = exports.BulkEditTree = void 0;
var inversify_1 = require("inversify");
var browser_1 = require("@theia/core/lib/browser");
var selection_1 = require("@theia/core/lib/common/selection");
var bulk_edit_node_selection_1 = require("./bulk-edit-node-selection");
var uri_1 = require("@theia/core/lib/common/uri");
var monaco_workspace_1 = require("@theia/monaco/lib/browser/monaco-workspace");
var BulkEditTree = /** @class */ (function (_super) {
    __extends(BulkEditTree, _super);
    function BulkEditTree() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BulkEditTree.prototype.initTree = function (workspaceEdit, fileContents) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.root = {
                    visible: false,
                    id: 'theia-bulk-edit-tree-widget',
                    name: 'BulkEditTree',
                    children: this.getChildren(workspaceEdit, fileContents),
                    parent: undefined
                };
                return [2 /*return*/];
            });
        });
    };
    BulkEditTree.prototype.getChildren = function (workspaceEdit, fileContentsMap) {
        var _this = this;
        var bulkEditInfos = [];
        if (workspaceEdit.edits) {
            bulkEditInfos = workspaceEdit.edits
                .map(function (edit) { return _this.getResourcePath(edit); })
                .filter(function (path, index, arr) { return path && arr.indexOf(path) === index; })
                .map(function (path) { return _this.createBulkEditInfo(path, new uri_1.default(path), fileContentsMap.get(path)); })
                .filter(Boolean);
            if (bulkEditInfos.length > 0) {
                bulkEditInfos.forEach(function (editInfo) {
                    editInfo.children = workspaceEdit.edits.filter(function (edit) {
                        var _a, _b;
                        return ((('resource' in edit) && ((_a = edit === null || edit === void 0 ? void 0 : edit.resource) === null || _a === void 0 ? void 0 : _a.path) === editInfo.id)) ||
                            (('newUri' in edit) && ((_b = edit === null || edit === void 0 ? void 0 : edit.newUri) === null || _b === void 0 ? void 0 : _b.path) === editInfo.id);
                    })
                        .map(function (edit, index) { return _this.createBulkEditNode(edit, index, editInfo); });
                });
            }
        }
        return bulkEditInfos;
    };
    BulkEditTree.prototype.createBulkEditNode = function (bulkEdit, index, parent) {
        var id = parent.id + '_' + index;
        var existing = this.getNode(id);
        if (BulkEditNode.is(existing)) {
            existing.bulkEdit = bulkEdit;
            return existing;
        }
        return {
            id: id,
            name: 'bulkEdit',
            parent: parent,
            selected: false,
            uri: parent.uri,
            bulkEdit: bulkEdit
        };
    };
    BulkEditTree.prototype.createBulkEditInfo = function (id, uri, fileContents) {
        return {
            id: id,
            uri: uri,
            expanded: true,
            selected: false,
            parent: this.root,
            fileContents: fileContents,
            children: []
        };
    };
    BulkEditTree.prototype.getResourcePath = function (edit) {
        return monaco_workspace_1.WorkspaceTextEdit.is(edit) ? edit.resource.path : monaco_workspace_1.WorkspaceFileEdit.is(edit) && edit.newUri ? edit.newUri.path : undefined;
    };
    BulkEditTree = __decorate([
        inversify_1.injectable()
    ], BulkEditTree);
    return BulkEditTree;
}(browser_1.TreeImpl));
exports.BulkEditTree = BulkEditTree;
var BulkEditNode;
(function (BulkEditNode) {
    function is(node) {
        return selection_1.UriSelection.is(node) && browser_1.SelectableTreeNode.is(node) && bulk_edit_node_selection_1.BulkEditNodeSelection.is(node);
    }
    BulkEditNode.is = is;
})(BulkEditNode = exports.BulkEditNode || (exports.BulkEditNode = {}));
var BulkEditInfoNode;
(function (BulkEditInfoNode) {
    function is(node) {
        return browser_1.ExpandableTreeNode.is(node) && selection_1.UriSelection.is(node) && 'fileContents' in node;
    }
    BulkEditInfoNode.is = is;
})(BulkEditInfoNode = exports.BulkEditInfoNode || (exports.BulkEditInfoNode = {}));
//# sourceMappingURL=bulk-edit-tree.js.map