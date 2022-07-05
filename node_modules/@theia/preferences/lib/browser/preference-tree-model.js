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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
exports.PreferenceTreeModel = void 0;
var inversify_1 = require("inversify");
var browser_1 = require("@theia/core/lib/browser");
var core_1 = require("@theia/core");
var preference_searchbar_widget_1 = require("./views/preference-searchbar-widget");
var preference_tree_generator_1 = require("./util/preference-tree-generator");
var fuzzy = require("fuzzy");
var preference_scope_tabbar_widget_1 = require("./views/preference-scope-tabbar-widget");
var preference_types_1 = require("./util/preference-types");
var PreferenceTreeModel = /** @class */ (function (_super) {
    __extends(PreferenceTreeModel, _super);
    function PreferenceTreeModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onTreeFilterChangedEmitter = new core_1.Emitter();
        _this.onFilterChanged = _this.onTreeFilterChangedEmitter.event;
        _this.lastSearchedFuzzy = '';
        _this.lastSearchedLiteral = '';
        _this._currentScope = Number(preference_types_1.Preference.DEFAULT_SCOPE.scope);
        _this._isFiltered = false;
        _this._currentRows = new Map();
        _this._totalVisibleLeaves = 0;
        return _this;
    }
    Object.defineProperty(PreferenceTreeModel.prototype, "currentRows", {
        get: function () {
            return this._currentRows;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PreferenceTreeModel.prototype, "totalVisibleLeaves", {
        get: function () {
            return this._totalVisibleLeaves;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PreferenceTreeModel.prototype, "isFiltered", {
        get: function () {
            return this._isFiltered;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PreferenceTreeModel.prototype, "propertyList", {
        get: function () {
            return this.schemaProvider.getCombinedSchema().properties;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PreferenceTreeModel.prototype, "currentScope", {
        get: function () {
            return this.scopeTracker.currentScope;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PreferenceTreeModel.prototype, "onSchemaChanged", {
        get: function () {
            return this.treeGenerator.onSchemaChanged;
        },
        enumerable: false,
        configurable: true
    });
    PreferenceTreeModel.prototype.init = function () {
        var _this = this;
        _super.prototype.init.call(this);
        this.toDispose.pushAll([
            this.treeGenerator.onSchemaChanged(function (newTree) {
                _this.root = newTree;
                _this.updateFilteredRows();
            }),
            this.scopeTracker.onScopeChanged(function (scopeDetails) {
                _this._currentScope = Number(scopeDetails.scope);
                _this.updateFilteredRows();
            }),
            this.filterInput.onFilterChanged(function (newSearchTerm) {
                _this.lastSearchedLiteral = newSearchTerm;
                _this.lastSearchedFuzzy = newSearchTerm.replace(/\s/g, '');
                var wasFiltered = _this._isFiltered;
                _this._isFiltered = newSearchTerm.length > 2;
                _this.updateFilteredRows(wasFiltered && !_this._isFiltered);
            }),
            this.onFilterChanged(function () {
                _this.filterInput.updateResultsCount(_this._totalVisibleLeaves);
            }),
            this.onTreeFilterChangedEmitter,
        ]);
    };
    PreferenceTreeModel.prototype.updateRows = function () {
        var e_1, _a;
        var root = this.root;
        this._currentRows = new Map();
        if (root) {
            this._totalVisibleLeaves = 0;
            var depths = new Map();
            var index = 0;
            try {
                for (var _b = __values(new browser_1.TopDownTreeIterator(root, {
                    pruneCollapsed: false,
                    pruneSiblings: true
                })), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var node = _c.value;
                    if (browser_1.TreeNode.isVisible(node)) {
                        if (browser_1.CompositeTreeNode.is(node) || this.passesCurrentFilters(node.id)) {
                            var depth = this.getDepthForNode(depths, node);
                            this.updateVisibleChildren(node);
                            this._currentRows.set(node.id, {
                                index: index++,
                                node: node,
                                depth: depth,
                                visibleChildren: 0,
                            });
                        }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
    };
    PreferenceTreeModel.prototype.updateFilteredRows = function (filterWasCleared) {
        if (filterWasCleared === void 0) { filterWasCleared = false; }
        this.updateRows();
        this.onTreeFilterChangedEmitter.fire({ filterCleared: filterWasCleared, rows: this._currentRows });
    };
    PreferenceTreeModel.prototype.passesCurrentFilters = function (nodeID) {
        var currentNodeShouldBeVisible = this.schemaProvider.isValidInScope(nodeID, this._currentScope)
            && (!this._isFiltered // search too short.
                || fuzzy.test(this.lastSearchedFuzzy, nodeID || '') // search matches preference name.
                // search matches description. Fuzzy isn't ideal here because the score depends on the order of discovery.
                || (this.schemaProvider.getCombinedSchema().properties[nodeID].description || '').includes(this.lastSearchedLiteral));
        return currentNodeShouldBeVisible;
    };
    PreferenceTreeModel.prototype.getDepthForNode = function (depths, node) {
        var parentDepth = depths.get(node.parent);
        var depth = parentDepth === undefined ? 0 : browser_1.TreeNode.isVisible(node.parent) ? parentDepth + 1 : parentDepth;
        if (browser_1.CompositeTreeNode.is(node)) {
            depths.set(node, depth);
        }
        return depth;
    };
    PreferenceTreeModel.prototype.updateVisibleChildren = function (node) {
        var _a, _b, _c, _d;
        if (!browser_1.CompositeTreeNode.is(node)) {
            this._totalVisibleLeaves++;
            var nextParent = ((_a = node.parent) === null || _a === void 0 ? void 0 : _a.id) && this._currentRows.get((_b = node.parent) === null || _b === void 0 ? void 0 : _b.id);
            while (nextParent && nextParent.node !== this.root) {
                if (nextParent) {
                    nextParent.visibleChildren += 1;
                }
                nextParent = ((_c = nextParent.node.parent) === null || _c === void 0 ? void 0 : _c.id) && this._currentRows.get((_d = nextParent.node.parent) === null || _d === void 0 ? void 0 : _d.id);
                if (nextParent) {
                    nextParent.isExpansible = true;
                }
            }
        }
    };
    PreferenceTreeModel.prototype.collapseAllExcept = function (openNode) {
        var _this = this;
        this.expandNode(openNode);
        var children = this.root.children;
        children.forEach(function (child) {
            if (child !== openNode && child.expanded) {
                _this.collapseNode(child);
            }
        });
    };
    __decorate([
        inversify_1.inject(browser_1.PreferenceSchemaProvider),
        __metadata("design:type", browser_1.PreferenceSchemaProvider)
    ], PreferenceTreeModel.prototype, "schemaProvider", void 0);
    __decorate([
        inversify_1.inject(preference_searchbar_widget_1.PreferencesSearchbarWidget),
        __metadata("design:type", preference_searchbar_widget_1.PreferencesSearchbarWidget)
    ], PreferenceTreeModel.prototype, "filterInput", void 0);
    __decorate([
        inversify_1.inject(preference_tree_generator_1.PreferenceTreeGenerator),
        __metadata("design:type", preference_tree_generator_1.PreferenceTreeGenerator)
    ], PreferenceTreeModel.prototype, "treeGenerator", void 0);
    __decorate([
        inversify_1.inject(preference_scope_tabbar_widget_1.PreferencesScopeTabBar),
        __metadata("design:type", preference_scope_tabbar_widget_1.PreferencesScopeTabBar)
    ], PreferenceTreeModel.prototype, "scopeTracker", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PreferenceTreeModel.prototype, "init", null);
    PreferenceTreeModel = __decorate([
        inversify_1.injectable()
    ], PreferenceTreeModel);
    return PreferenceTreeModel;
}(browser_1.TreeModelImpl));
exports.PreferenceTreeModel = PreferenceTreeModel;
//# sourceMappingURL=preference-tree-model.js.map