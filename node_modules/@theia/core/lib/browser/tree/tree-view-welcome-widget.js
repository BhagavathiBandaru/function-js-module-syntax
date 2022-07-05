"use strict";
/********************************************************************************
 * Copyright (c) 2020 SAP SE or an SAP affiliate company and others.
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
exports.TreeViewWelcomeWidget = void 0;
/*---------------------------------------------------------------------------------------------
*  Copyright (c) Microsoft Corporation. All rights reserved.
*  Licensed under the MIT License. See License.txt in the project root for license information.
*--------------------------------------------------------------------------------------------*/
// some code is copied and modified from: https://github.com/microsoft/vscode/blob/573e5145ae3b50523925a6f6315d373e649d1b06/src/vs/base/common/linkedText.ts
var React = require("react");
var inversify_1 = require("inversify");
var common_1 = require("../../common");
var context_key_service_1 = require("../context-key-service");
var tree_widget_1 = require("./tree-widget");
var window_service_1 = require("../window/window-service");
var TreeViewWelcomeWidget = /** @class */ (function (_super) {
    __extends(TreeViewWelcomeWidget, _super);
    function TreeViewWelcomeWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewWelcomeNodes = [];
        _this.items = [];
        _this.openLinkOrCommand = function (event, href) {
            event.stopPropagation();
            if (href.startsWith('command:')) {
                var command = href.replace('command:', '');
                _this.commands.executeCommand(command);
            }
            else {
                _this.windowService.openNewWindow(href, { external: true });
            }
        };
        return _this;
    }
    Object.defineProperty(TreeViewWelcomeWidget.prototype, "visibleItems", {
        get: function () {
            var visibleItems = this.items.filter(function (v) { return v.visible; });
            if (visibleItems.length && this.defaultItem) {
                return [this.defaultItem.welcomeInfo];
            }
            return visibleItems.map(function (v) { return v.welcomeInfo; });
        },
        enumerable: false,
        configurable: true
    });
    TreeViewWelcomeWidget.prototype.renderTree = function (model) {
        if (this.shouldShowWelcomeView() && this.visibleItems.length) {
            return this.renderViewWelcome();
        }
        return _super.prototype.renderTree.call(this, model);
    };
    TreeViewWelcomeWidget.prototype.shouldShowWelcomeView = function () {
        return false;
    };
    TreeViewWelcomeWidget.prototype.renderViewWelcome = function () {
        return (React.createElement("div", { className: 'theia-WelcomeView' }, this.viewWelcomeNodes));
    };
    TreeViewWelcomeWidget.prototype.handleViewWelcomeContentChange = function (viewWelcomes) {
        var e_1, _a;
        this.items = [];
        try {
            for (var viewWelcomes_1 = __values(viewWelcomes), viewWelcomes_1_1 = viewWelcomes_1.next(); !viewWelcomes_1_1.done; viewWelcomes_1_1 = viewWelcomes_1.next()) {
                var welcomeInfo = viewWelcomes_1_1.value;
                if (welcomeInfo.when === 'default') {
                    this.defaultItem = { welcomeInfo: welcomeInfo, visible: true };
                }
                else {
                    var visible = welcomeInfo.when === undefined || this.contextService.match(welcomeInfo.when);
                    this.items.push({ welcomeInfo: welcomeInfo, visible: visible });
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (viewWelcomes_1_1 && !viewWelcomes_1_1.done && (_a = viewWelcomes_1.return)) _a.call(viewWelcomes_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.updateViewWelcomeNodes();
        this.update();
    };
    TreeViewWelcomeWidget.prototype.handleWelcomeContextChange = function () {
        var e_2, _a;
        var didChange = false;
        try {
            for (var _b = __values(this.items), _c = _b.next(); !_c.done; _c = _b.next()) {
                var item = _c.value;
                if (!item.welcomeInfo.when || item.welcomeInfo.when === 'default') {
                    continue;
                }
                var visible = item.welcomeInfo.when === undefined || this.contextService.match(item.welcomeInfo.when);
                if (item.visible === visible) {
                    continue;
                }
                item.visible = visible;
                didChange = true;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        if (didChange) {
            this.updateViewWelcomeNodes();
            this.update();
        }
    };
    TreeViewWelcomeWidget.prototype.updateViewWelcomeNodes = function () {
        var e_3, _a, e_4, _b, e_5, _c;
        this.viewWelcomeNodes = [];
        var items = this.visibleItems.sort(function (a, b) { return a.order - b.order; });
        try {
            for (var _d = __values(items.entries()), _e = _d.next(); !_e.done; _e = _d.next()) {
                var _f = __read(_e.value, 2), iIndex = _f[0], content = _f[1].content;
                var lines = content.split('\n');
                try {
                    for (var _g = (e_4 = void 0, __values(lines.entries())), _h = _g.next(); !_h.done; _h = _g.next()) {
                        var _j = __read(_h.value, 2), lIndex = _j[0], line = _j[1];
                        var lineKey = iIndex + "-" + lIndex;
                        line = line.trim();
                        if (!line) {
                            continue;
                        }
                        var linkedTextItems = this.parseLinkedText(line);
                        if (linkedTextItems.length === 1 && typeof linkedTextItems[0] !== 'string') {
                            this.viewWelcomeNodes.push(this.renderButtonNode(linkedTextItems[0], lineKey));
                        }
                        else {
                            var linkedTextNodes = [];
                            try {
                                for (var _k = (e_5 = void 0, __values(linkedTextItems.entries())), _l = _k.next(); !_l.done; _l = _k.next()) {
                                    var _m = __read(_l.value, 2), nIndex = _m[0], node = _m[1];
                                    var linkedTextKey = lineKey + "-" + nIndex;
                                    if (typeof node === 'string') {
                                        linkedTextNodes.push(this.renderTextNode(node, linkedTextKey));
                                    }
                                    else {
                                        linkedTextNodes.push(this.renderCommandLinkNode(node, linkedTextKey));
                                    }
                                }
                            }
                            catch (e_5_1) { e_5 = { error: e_5_1 }; }
                            finally {
                                try {
                                    if (_l && !_l.done && (_c = _k.return)) _c.call(_k);
                                }
                                finally { if (e_5) throw e_5.error; }
                            }
                            this.viewWelcomeNodes.push(React.createElement("div", { key: "line-" + lineKey }, linkedTextNodes));
                        }
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    TreeViewWelcomeWidget.prototype.renderButtonNode = function (node, lineKey) {
        var _this = this;
        return (React.createElement("div", { key: "line-" + lineKey, className: 'theia-WelcomeViewButtonWrapper' },
            React.createElement("button", { title: node.title, className: 'theia-button theia-WelcomeViewButton', disabled: !this.isEnabledClick(node.href), onClick: function (e) { return _this.openLinkOrCommand(e, node.href); } }, node.label)));
    };
    TreeViewWelcomeWidget.prototype.renderTextNode = function (node, textKey) {
        return React.createElement("span", { key: "text-" + textKey }, node);
    };
    TreeViewWelcomeWidget.prototype.renderCommandLinkNode = function (node, linkKey) {
        var _this = this;
        return (React.createElement("a", { key: "link-" + linkKey, className: this.getLinkClassName(node.href), title: node.title || '', onClick: function (e) { return _this.openLinkOrCommand(e, node.href); } }, node.label));
    };
    TreeViewWelcomeWidget.prototype.getLinkClassName = function (href) {
        var classNames = ['theia-WelcomeViewCommandLink'];
        if (!this.isEnabledClick(href)) {
            classNames.push('disabled');
        }
        return classNames.join(' ');
    };
    TreeViewWelcomeWidget.prototype.isEnabledClick = function (href) {
        if (href.startsWith('command:')) {
            var command = href.replace('command:', '');
            return this.commands.isEnabled(command);
        }
        return true;
    };
    TreeViewWelcomeWidget.prototype.parseLinkedText = function (text) {
        var result = [];
        var linkRegex = /\[([^\]]+)\]\(((?:https?:\/\/|command:)[^\)\s]+)(?: ("|')([^\3]+)(\3))?\)/gi;
        var index = 0;
        var match;
        while (match = linkRegex.exec(text)) {
            if (match.index - index > 0) {
                result.push(text.substring(index, match.index));
            }
            var _a = __read(match, 5), label = _a[1], href = _a[2], title = _a[4];
            if (title) {
                result.push({ label: label, href: href, title: title });
            }
            else {
                result.push({ label: label, href: href });
            }
            index = match.index + match[0].length;
        }
        if (index < text.length) {
            result.push(text.substring(index));
        }
        return result;
    };
    __decorate([
        inversify_1.inject(common_1.CommandRegistry),
        __metadata("design:type", common_1.CommandRegistry)
    ], TreeViewWelcomeWidget.prototype, "commands", void 0);
    __decorate([
        inversify_1.inject(context_key_service_1.ContextKeyService),
        __metadata("design:type", context_key_service_1.ContextKeyService)
    ], TreeViewWelcomeWidget.prototype, "contextService", void 0);
    __decorate([
        inversify_1.inject(window_service_1.WindowService),
        __metadata("design:type", Object)
    ], TreeViewWelcomeWidget.prototype, "windowService", void 0);
    TreeViewWelcomeWidget = __decorate([
        inversify_1.injectable()
    ], TreeViewWelcomeWidget);
    return TreeViewWelcomeWidget;
}(tree_widget_1.TreeWidget));
exports.TreeViewWelcomeWidget = TreeViewWelcomeWidget;
//# sourceMappingURL=tree-view-welcome-widget.js.map