"use strict";
/********************************************************************************
 * Copyright (C) 2020 TypeFox and others.
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
 *******************************************************************************‚*/
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
exports.VSXExtensionsViewContainer = void 0;
var inversify_1 = require("inversify");
var browser_1 = require("@theia/core/lib/browser");
var vsx_extensions_search_bar_1 = require("./vsx-extensions-search-bar");
var vsx_extensions_widget_1 = require("./vsx-extensions-widget");
var vsx_extensions_model_1 = require("./vsx-extensions-model");
var VSXExtensionsViewContainer = /** @class */ (function (_super) {
    __extends(VSXExtensionsViewContainer, _super);
    function VSXExtensionsViewContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.currentMode = VSXExtensionsViewContainer_1.InitialMode;
        _this.lastModeState = new Map();
        return _this;
    }
    VSXExtensionsViewContainer_1 = VSXExtensionsViewContainer;
    VSXExtensionsViewContainer.prototype.init = function () {
        _super.prototype.init.call(this);
        this.id = VSXExtensionsViewContainer_1.ID;
        this.addClass('theia-vsx-extensions-view-container');
        this.setTitleOptions({
            label: VSXExtensionsViewContainer_1.LABEL,
            iconClass: 'theia-vsx-extensions-icon',
            closeable: true
        });
    };
    VSXExtensionsViewContainer.prototype.onActivateRequest = function (msg) {
        this.searchBar.activate();
    };
    VSXExtensionsViewContainer.prototype.onAfterAttach = function (msg) {
        var _this = this;
        _super.prototype.onBeforeAttach.call(this, msg);
        this.updateMode();
        this.toDisposeOnDetach.push(this.model.search.onDidChangeQuery(function () { return _this.updateMode(); }));
    };
    VSXExtensionsViewContainer.prototype.configureLayout = function (layout) {
        layout.addWidget(this.searchBar);
        _super.prototype.configureLayout.call(this, layout);
    };
    VSXExtensionsViewContainer.prototype.updateMode = function () {
        var e_1, _a;
        var currentMode = !this.model.search.query ? VSXExtensionsViewContainer_1.DefaultMode : VSXExtensionsViewContainer_1.SearchResultMode;
        if (currentMode === this.currentMode) {
            return;
        }
        if (this.currentMode !== VSXExtensionsViewContainer_1.InitialMode) {
            this.lastModeState.set(this.currentMode, _super.prototype.doStoreState.call(this));
        }
        this.currentMode = currentMode;
        var lastState = this.lastModeState.get(currentMode);
        if (lastState) {
            _super.prototype.doRestoreState.call(this, lastState);
        }
        else {
            try {
                for (var _b = __values(this.getParts()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var part = _c.value;
                    this.applyModeToPart(part);
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
        if (this.currentMode === VSXExtensionsViewContainer_1.SearchResultMode) {
            var searchPart = this.getParts().find(function (part) { return part.wrapped.id === vsx_extensions_widget_1.VSXExtensionsWidget.SEARCH_RESULT_ID; });
            if (searchPart) {
                searchPart.collapsed = false;
                searchPart.show();
            }
        }
    };
    VSXExtensionsViewContainer.prototype.registerPart = function (part) {
        _super.prototype.registerPart.call(this, part);
        this.applyModeToPart(part);
    };
    VSXExtensionsViewContainer.prototype.applyModeToPart = function (part) {
        var partMode = (part.wrapped.id === vsx_extensions_widget_1.VSXExtensionsWidget.SEARCH_RESULT_ID ? VSXExtensionsViewContainer_1.SearchResultMode : VSXExtensionsViewContainer_1.DefaultMode);
        if (this.currentMode === partMode) {
            part.show();
        }
        else {
            part.hide();
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    VSXExtensionsViewContainer.prototype.doStoreState = function () {
        var e_2, _a;
        var modes = {};
        try {
            for (var _b = __values(this.lastModeState.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var mode = _c.value;
                modes[mode] = this.lastModeState.get(mode);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return {
            query: this.model.search.query,
            modes: modes
        };
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    VSXExtensionsViewContainer.prototype.doRestoreState = function (state) {
        // eslint-disable-next-line guard-for-in
        for (var key in state.modes) {
            var mode = Number(key);
            var modeState = state.modes[mode];
            if (modeState) {
                this.lastModeState.set(mode, modeState);
            }
        }
        this.model.search.query = state.query;
    };
    var VSXExtensionsViewContainer_1;
    VSXExtensionsViewContainer.ID = 'vsx-extensions-view-container';
    VSXExtensionsViewContainer.LABEL = 'Extensions';
    __decorate([
        inversify_1.inject(vsx_extensions_search_bar_1.VSXExtensionsSearchBar),
        __metadata("design:type", vsx_extensions_search_bar_1.VSXExtensionsSearchBar)
    ], VSXExtensionsViewContainer.prototype, "searchBar", void 0);
    __decorate([
        inversify_1.inject(vsx_extensions_model_1.VSXExtensionsModel),
        __metadata("design:type", vsx_extensions_model_1.VSXExtensionsModel)
    ], VSXExtensionsViewContainer.prototype, "model", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], VSXExtensionsViewContainer.prototype, "init", null);
    VSXExtensionsViewContainer = VSXExtensionsViewContainer_1 = __decorate([
        inversify_1.injectable()
    ], VSXExtensionsViewContainer);
    return VSXExtensionsViewContainer;
}(browser_1.ViewContainer));
exports.VSXExtensionsViewContainer = VSXExtensionsViewContainer;
(function (VSXExtensionsViewContainer) {
    VSXExtensionsViewContainer.InitialMode = 0;
    VSXExtensionsViewContainer.DefaultMode = 1;
    VSXExtensionsViewContainer.SearchResultMode = 2;
})(VSXExtensionsViewContainer = exports.VSXExtensionsViewContainer || (exports.VSXExtensionsViewContainer = {}));
exports.VSXExtensionsViewContainer = VSXExtensionsViewContainer;
//# sourceMappingURL=vsx-extensions-view-container.js.map