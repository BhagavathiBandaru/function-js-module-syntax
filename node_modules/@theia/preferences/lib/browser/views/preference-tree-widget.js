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
exports.PreferencesTreeWidget = void 0;
var inversify_1 = require("inversify");
var browser_1 = require("@theia/core/lib/browser");
var preference_configurations_1 = require("@theia/core/lib/browser/preferences/preference-configurations");
var React = require("react");
var preference_tree_model_1 = require("../preference-tree-model");
var PreferencesTreeWidget = /** @class */ (function (_super) {
    __extends(PreferencesTreeWidget, _super);
    function PreferencesTreeWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.shouldFireSelectionEvents = true;
        return _this;
    }
    PreferencesTreeWidget_1 = PreferencesTreeWidget;
    PreferencesTreeWidget.prototype.init = function () {
        var _this = this;
        _super.prototype.init.call(this);
        this.id = PreferencesTreeWidget_1.ID;
        this.toDispose.pushAll([
            this.model.onFilterChanged(function () {
                _this.updateRows();
            }),
        ]);
    };
    PreferencesTreeWidget.prototype.doUpdateRows = function () {
        var e_1, _a;
        this.rows = new Map();
        try {
            for (var _b = __values(this.model.currentRows.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), id = _d[0], nodeRow = _d[1];
                if (nodeRow.visibleChildren > 0 && (browser_1.ExpandableTreeNode.is(nodeRow.node) || browser_1.ExpandableTreeNode.isExpanded(nodeRow.node.parent))) {
                    this.rows.set(id, nodeRow);
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
        this.updateScrollToRow();
    };
    PreferencesTreeWidget.prototype.doRenderNodeRow = function (_a) {
        var depth = _a.depth, visibleChildren = _a.visibleChildren, node = _a.node, isExpansible = _a.isExpansible;
        return this.renderNode(node, { depth: depth, visibleChildren: visibleChildren, isExpansible: isExpansible });
    };
    PreferencesTreeWidget.prototype.renderNode = function (node, props) {
        if (!browser_1.TreeNode.isVisible(node)) {
            return undefined;
        }
        var attributes = this.createNodeAttributes(node, props);
        var printedNameWithVisibleChildren = node.name && this.model.isFiltered
            ? node.name + " (" + props.visibleChildren + ")"
            : node.name;
        var content = React.createElement("div", { className: browser_1.TREE_NODE_CONTENT_CLASS },
            this.renderExpansionToggle(node, props),
            this.renderCaption(__assign(__assign({}, node), { name: printedNameWithVisibleChildren }), props));
        return React.createElement('div', attributes, content);
    };
    PreferencesTreeWidget.prototype.renderExpansionToggle = function (node, props) {
        if (browser_1.ExpandableTreeNode.is(node) && !props.isExpansible) {
            return React.createElement("div", { className: 'preferences-tree-spacer' });
        }
        return _super.prototype.renderExpansionToggle.call(this, node, props);
    };
    var PreferencesTreeWidget_1;
    PreferencesTreeWidget.ID = 'preferences.tree';
    __decorate([
        inversify_1.inject(browser_1.PreferenceService),
        __metadata("design:type", Object)
    ], PreferencesTreeWidget.prototype, "preferenceService", void 0);
    __decorate([
        inversify_1.inject(preference_configurations_1.PreferenceConfigurations),
        __metadata("design:type", preference_configurations_1.PreferenceConfigurations)
    ], PreferencesTreeWidget.prototype, "preferenceConfigs", void 0);
    __decorate([
        inversify_1.inject(preference_tree_model_1.PreferenceTreeModel),
        __metadata("design:type", preference_tree_model_1.PreferenceTreeModel)
    ], PreferencesTreeWidget.prototype, "model", void 0);
    __decorate([
        inversify_1.inject(browser_1.TreeProps),
        __metadata("design:type", Object)
    ], PreferencesTreeWidget.prototype, "treeProps", void 0);
    __decorate([
        inversify_1.inject(browser_1.ContextMenuRenderer),
        __metadata("design:type", browser_1.ContextMenuRenderer)
    ], PreferencesTreeWidget.prototype, "contextMenuRenderer", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PreferencesTreeWidget.prototype, "init", null);
    PreferencesTreeWidget = PreferencesTreeWidget_1 = __decorate([
        inversify_1.injectable()
    ], PreferencesTreeWidget);
    return PreferencesTreeWidget;
}(browser_1.TreeWidget));
exports.PreferencesTreeWidget = PreferencesTreeWidget;
//# sourceMappingURL=preference-tree-widget.js.map