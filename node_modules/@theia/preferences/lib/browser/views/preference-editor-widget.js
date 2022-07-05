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
exports.PreferencesEditorWidget = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
var inversify_1 = require("inversify");
var React = require("react");
var lodash_1 = require("lodash");
var vscode_jsonrpc_1 = require("vscode-jsonrpc");
var browser_1 = require("@theia/core/lib/browser");
var single_preference_display_factory_1 = require("./components/single-preference-display-factory");
var preference_tree_model_1 = require("../preference-tree-model");
var core_1 = require("@theia/core");
var HEADER_CLASS = 'settings-section-category-title';
var SUBHEADER_CLASS = 'settings-section-subcategory-title';
var PreferencesEditorWidget = /** @class */ (function (_super) {
    __extends(PreferencesEditorWidget, _super);
    function PreferencesEditorWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onEditorScrollEmitter = new core_1.Emitter();
        /**
         * true = at top; false = not at top
         */
        _this.onEditorDidScroll = _this.onEditorScrollEmitter.event;
        _this.scrollContainerRef = React.createRef();
        _this.hasRendered = false;
        _this.shouldScroll = true;
        _this.lastUserSelection = '';
        _this.isAtScrollTop = true;
        _this.firstVisibleChildID = '';
        _this.handleDisplayChange = function (filterWasCleared) {
            if (filterWasCleared === void 0) { filterWasCleared = false; }
            var currentVisibleChild = _this.firstVisibleChildID;
            _this.update();
            var oldVisibleNode = _this.model.currentRows.get(currentVisibleChild);
            // Scroll if the old visible node is visible in the new display. Otherwise go to top.
            if (!filterWasCleared && oldVisibleNode && !(browser_1.CompositeTreeNode.is(oldVisibleNode.node) && oldVisibleNode.visibleChildren === 0)) {
                setTimeout(function () { var _a; return (_a = Array.from(_this.node.getElementsByTagName('li')).find(function (element) { return element.getAttribute('data-id') === currentVisibleChild; })) === null || _a === void 0 ? void 0 : _a.scrollIntoView(); });
            }
            else {
                _this.node.scrollTop = 0;
            }
        };
        _this.doOnScroll = function () {
            var _a;
            var scrollContainer = _this.node;
            var _b = (_a = _this.findFirstVisibleChildID(scrollContainer)) !== null && _a !== void 0 ? _a : {}, selectionAncestorID = _b.selectionAncestorID, expansionAncestorID = _b.expansionAncestorID;
            if (selectionAncestorID !== _this.lastUserSelection) {
                _this.shouldScroll = false; // prevents event feedback loop.
                var selectionAncestor = _this.model.getNode(selectionAncestorID);
                var expansionAncestor = _this.model.getNode(expansionAncestorID);
                if (expansionAncestor) {
                    _this.model.collapseAllExcept(expansionAncestor);
                }
                if (selectionAncestor) {
                    _this.model.selectNode(selectionAncestor);
                }
                _this.shouldScroll = true;
            }
            if (_this.isAtScrollTop && scrollContainer.scrollTop !== 0) {
                _this.isAtScrollTop = false;
                _this.onEditorScrollEmitter.fire(false); // no longer at top
            }
            else if (!_this.isAtScrollTop && scrollContainer.scrollTop === 0) {
                _this.isAtScrollTop = true;
                _this.onEditorScrollEmitter.fire(true); // now at top
            }
            _this.lastUserSelection = '';
        };
        _this.onScroll = lodash_1.debounce(_this.doOnScroll, 10);
        _this.compare = function (value) { return ({
            isBetween: function (a, b) { return ((value >= a && value <= b) || (value >= b && value <= a)); }
        }); };
        return _this;
    }
    PreferencesEditorWidget_1 = PreferencesEditorWidget;
    PreferencesEditorWidget.prototype.init = function () {
        var _this = this;
        this.onRender.push(vscode_jsonrpc_1.Disposable.create(function () { return _this.hasRendered = true; }));
        this.id = PreferencesEditorWidget_1.ID;
        this.title.label = PreferencesEditorWidget_1.LABEL;
        this.preferenceValueRetrievalService.onPreferenceChanged(function () {
            _this.update();
        });
        this.model.onFilterChanged(function (_a) {
            var filterCleared = _a.filterCleared;
            return _this.handleDisplayChange(filterCleared);
        });
        this.model.onSelectionChanged(function (e) { return _this.handleSelectionChange(e); });
        this.update();
    };
    PreferencesEditorWidget.prototype.callAfterFirstRender = function (callback) {
        if (this.hasRendered) {
            callback();
        }
        else {
            this.onRender.push(vscode_jsonrpc_1.Disposable.create(function () { return callback(); }));
        }
    };
    PreferencesEditorWidget.prototype.onAfterAttach = function (msg) {
        var _this = this;
        this.callAfterFirstRender(function () {
            _super.prototype.onAfterAttach.call(_this, msg);
            _this.node.addEventListener('scroll', _this.onScroll);
        });
    };
    PreferencesEditorWidget.prototype.render = function () {
        var _this = this;
        var visibleNodes = Array.from(this.model.currentRows.values());
        return (React.createElement("div", { className: "settings-main" },
            React.createElement("div", { ref: this.scrollContainerRef, className: "settings-main-scroll-container", id: "settings-main-scroll-container" }, !this.model.totalVisibleLeaves ? this.renderNoResultMessage() : visibleNodes.map(function (nodeRow) {
                if (!browser_1.CompositeTreeNode.is(nodeRow.node)) {
                    return _this.renderSingleEntry(nodeRow.node);
                }
                else {
                    return _this.renderCategoryHeader(nodeRow);
                }
            }))));
    };
    PreferencesEditorWidget.prototype.findFirstVisibleChildID = function (container) {
        var children = container.getElementsByTagName('li');
        var selectionAncestorID = '';
        var expansionAncestorID = '';
        for (var i = 0; i < children.length; i++) {
            var currentChild = children[i];
            var id = currentChild.getAttribute('data-id');
            if (id) {
                if (currentChild.classList.contains(HEADER_CLASS)) {
                    selectionAncestorID = id;
                    expansionAncestorID = id;
                }
                else if (currentChild.classList.contains(SUBHEADER_CLASS)) {
                    selectionAncestorID = id;
                }
                if (this.isInView(currentChild, container)) {
                    this.firstVisibleChildID = id;
                    return { selectionAncestorID: selectionAncestorID, expansionAncestorID: expansionAncestorID };
                }
            }
        }
    };
    PreferencesEditorWidget.prototype.isInView = function (e, parent) {
        var scrollTop = this.node.scrollTop;
        var scrollCheckHeight = 0.7;
        return this.compare(e.offsetTop).isBetween(scrollTop, scrollTop + parent.offsetHeight) ||
            this.compare(scrollTop).isBetween(e.offsetTop, e.offsetTop + (e.offsetHeight * scrollCheckHeight));
    };
    PreferencesEditorWidget.prototype.renderSingleEntry = function (node) {
        var values = this.preferenceValueRetrievalService.inspect(node.id, this.model.currentScope.uri);
        var preferenceNodeWithValueInAllScopes = __assign(__assign({}, node), { preference: { data: this.model.propertyList[node.id], values: values } });
        return this.singlePreferenceFactory.render(preferenceNodeWithValueInAllScopes);
    };
    PreferencesEditorWidget.prototype.renderCategoryHeader = function (_a) {
        var node = _a.node, visibleChildren = _a.visibleChildren;
        if (visibleChildren === 0) {
            return undefined;
        }
        var isCategory = browser_1.ExpandableTreeNode.is(node);
        var className = isCategory ? HEADER_CLASS : SUBHEADER_CLASS;
        return node.visible && (React.createElement("ul", { className: 'settings-section', key: node.id + "-editor", id: node.id + "-editor" },
            React.createElement("li", { className: "settings-section-title " + className, "data-id": node.id }, node.name)));
    };
    PreferencesEditorWidget.prototype.renderNoResultMessage = function () {
        return React.createElement("div", { className: "settings-no-results-announcement" }, "That search query has returned no results.");
    };
    PreferencesEditorWidget.prototype.handleSelectionChange = function (selectionEvent) {
        var _a;
        if (this.shouldScroll) {
            var nodeID = (_a = selectionEvent[0]) === null || _a === void 0 ? void 0 : _a.id;
            if (nodeID) {
                this.lastUserSelection = nodeID;
                var el_1 = document.getElementById(nodeID + "-editor");
                if (el_1) {
                    // Timeout to allow render cycle to finish.
                    setTimeout(function () { return el_1.scrollIntoView(); });
                }
            }
        }
    };
    PreferencesEditorWidget.prototype.storeState = function () {
        return {
            firstVisibleChildID: this.firstVisibleChildID,
        };
    };
    PreferencesEditorWidget.prototype.restoreState = function (oldState) {
        this.firstVisibleChildID = oldState.firstVisibleChildID;
        this.handleDisplayChange();
    };
    var PreferencesEditorWidget_1;
    PreferencesEditorWidget.ID = 'settings.editor';
    PreferencesEditorWidget.LABEL = 'Settings Editor';
    __decorate([
        inversify_1.inject(browser_1.PreferenceService),
        __metadata("design:type", Object)
    ], PreferencesEditorWidget.prototype, "preferenceValueRetrievalService", void 0);
    __decorate([
        inversify_1.inject(preference_tree_model_1.PreferenceTreeModel),
        __metadata("design:type", preference_tree_model_1.PreferenceTreeModel)
    ], PreferencesEditorWidget.prototype, "model", void 0);
    __decorate([
        inversify_1.inject(single_preference_display_factory_1.SinglePreferenceDisplayFactory),
        __metadata("design:type", single_preference_display_factory_1.SinglePreferenceDisplayFactory)
    ], PreferencesEditorWidget.prototype, "singlePreferenceFactory", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PreferencesEditorWidget.prototype, "init", null);
    PreferencesEditorWidget = PreferencesEditorWidget_1 = __decorate([
        inversify_1.injectable()
    ], PreferencesEditorWidget);
    return PreferencesEditorWidget;
}(browser_1.ReactWidget));
exports.PreferencesEditorWidget = PreferencesEditorWidget;
//# sourceMappingURL=preference-editor-widget.js.map