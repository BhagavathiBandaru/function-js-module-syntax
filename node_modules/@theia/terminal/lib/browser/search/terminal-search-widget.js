"use strict";
/********************************************************************************
 * Copyright (C) 2019 Red Hat, Inc. and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerminalSearchWidget = exports.TerminalSearchWidgetFactory = exports.TERMINAL_SEARCH_WIDGET_FACTORY_ID = void 0;
var inversify_1 = require("inversify");
var react_widget_1 = require("@theia/core/lib/browser/widgets/react-widget");
var React = require("react");
require("../../../src/browser/style/terminal-search.css");
var xterm_1 = require("xterm");
var xterm_addon_search_1 = require("xterm-addon-search");
var browser_1 = require("@theia/core/lib/browser");
exports.TERMINAL_SEARCH_WIDGET_FACTORY_ID = 'terminal-search';
exports.TerminalSearchWidgetFactory = Symbol('TerminalSearchWidgetFactory');
var TerminalSearchWidget = /** @class */ (function (_super) {
    __extends(TerminalSearchWidget, _super);
    function TerminalSearchWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.searchOptions = {};
        _this.onSearchInputFocus = function () {
            if (_this.searchBox) {
                _this.searchBox.classList.add('focused');
            }
        };
        _this.onSearchInputBlur = function () {
            if (_this.searchBox) {
                _this.searchBox.classList.remove('focused');
            }
        };
        _this.handleHide = function () {
            _this.hide();
        };
        _this.handleCaseSensitiveOptionClicked = function (event) {
            _this.searchOptions.caseSensitive = !_this.searchOptions.caseSensitive;
            _this.updateSearchInputBox(_this.searchOptions.caseSensitive, event.currentTarget);
        };
        _this.handleWholeWordOptionClicked = function (event) {
            _this.searchOptions.wholeWord = !_this.searchOptions.wholeWord;
            _this.updateSearchInputBox(_this.searchOptions.wholeWord, event.currentTarget);
        };
        _this.handleRegexOptionClicked = function (event) {
            _this.searchOptions.regex = !_this.searchOptions.regex;
            _this.updateSearchInputBox(_this.searchOptions.regex, event.currentTarget);
        };
        _this.onInputChanged = function (event) {
            // move to previous search result on `Shift + Enter`
            if (event && event.shiftKey && event.keyCode === browser_1.Key.ENTER.keyCode) {
                _this.search(false, 'previous');
                return;
            }
            // move to next search result on `Enter`
            if (event && event.keyCode === browser_1.Key.ENTER.keyCode) {
                _this.search(false, 'next');
                return;
            }
            _this.search(true, 'next');
        };
        _this.handleNextButtonClicked = function () {
            _this.search(false, 'next');
        };
        _this.handlePreviousButtonClicked = function () {
            _this.search(false, 'previous');
        };
        return _this;
    }
    TerminalSearchWidget.prototype.init = function () {
        this.node.classList.add('theia-search-terminal-widget-parent');
        this.searchAddon = new xterm_addon_search_1.SearchAddon();
        this.terminal.loadAddon(this.searchAddon);
        this.hide();
        this.update();
    };
    TerminalSearchWidget.prototype.render = function () {
        var _this = this;
        return React.createElement("div", { className: 'theia-search-terminal-widget' },
            React.createElement("div", { className: 'theia-search-elem-box', ref: function (searchBox) { return _this.searchBox = searchBox; } },
                React.createElement("input", { title: 'Find', type: 'text', placeholder: 'Find', ref: function (ip) { return _this.searchInput = ip; }, onKeyUp: this.onInputChanged, onFocus: this.onSearchInputFocus, onBlur: this.onSearchInputBlur }),
                React.createElement("div", { title: 'Match case', tabIndex: 0, className: 'search-elem match-case', onClick: this.handleCaseSensitiveOptionClicked }),
                React.createElement("div", { title: 'Match whole word', tabIndex: 0, className: 'search-elem whole-word', onClick: this.handleWholeWordOptionClicked }),
                React.createElement("div", { title: 'Use regular expression', tabIndex: 0, className: 'search-elem use-regexp', onClick: this.handleRegexOptionClicked })),
            React.createElement("button", { title: 'Previous match', className: 'search-elem arrow-up', onClick: this.handlePreviousButtonClicked }),
            React.createElement("button", { title: 'Next match', className: 'search-elem arrow-down', onClick: this.handleNextButtonClicked }),
            React.createElement("button", { title: 'Close', className: 'search-elem close', onClick: this.handleHide }));
    };
    TerminalSearchWidget.prototype.updateSearchInputBox = function (enable, optionElement) {
        if (enable) {
            optionElement.classList.add('option-enabled');
        }
        else {
            optionElement.classList.remove('option-enabled');
        }
        this.searchInput.focus();
    };
    TerminalSearchWidget.prototype.search = function (incremental, searchDirection) {
        if (this.searchInput) {
            this.searchOptions.incremental = incremental;
            var searchText = this.searchInput.value;
            if (searchDirection === 'next') {
                this.searchAddon.findNext(searchText, this.searchOptions);
            }
            if (searchDirection === 'previous') {
                this.searchAddon.findPrevious(searchText, this.searchOptions);
            }
        }
    };
    TerminalSearchWidget.prototype.onAfterHide = function () {
        this.terminal.focus();
    };
    TerminalSearchWidget.prototype.onAfterShow = function () {
        if (this.searchInput) {
            this.searchInput.select();
        }
    };
    __decorate([
        inversify_1.inject(xterm_1.Terminal),
        __metadata("design:type", xterm_1.Terminal)
    ], TerminalSearchWidget.prototype, "terminal", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TerminalSearchWidget.prototype, "init", null);
    TerminalSearchWidget = __decorate([
        inversify_1.injectable()
    ], TerminalSearchWidget);
    return TerminalSearchWidget;
}(react_widget_1.ReactWidget));
exports.TerminalSearchWidget = TerminalSearchWidget;
//# sourceMappingURL=terminal-search-widget.js.map