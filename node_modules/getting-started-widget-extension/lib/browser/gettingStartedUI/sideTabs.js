"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var mobx_1 = require("mobx");
var mobx_react_1 = require("mobx-react");
var folderIcon_1 = __importDefault(require("../icons/folderIcon"));
var settingsIcon_1 = __importDefault(require("../icons/settingsIcon"));
var constants_1 = require("./constants");
var styledComponent_1 = require("./styledComponent");
var SideTabs = /** @class */ (function (_super) {
    __extends(SideTabs, _super);
    function SideTabs(props) {
        var _this = _super.call(this, props) || this;
        _this.onSelectTab = function (selectedTab) {
            var onSelectTab = _this.props.onSelectTab;
            _this.selectedTab = selectedTab;
            onSelectTab(_this.selectedTab);
        };
        _this.getIcon = function (value) {
            switch (value) {
                case constants_1.sideTabsObject.open:
                    return React.createElement(folderIcon_1.default, { color: _this.selectedTab === constants_1.sideTabsObject.open ? '#F8FAFC' : '#94A3B8' });
                case constants_1.sideTabsObject.settings:
                    return React.createElement(settingsIcon_1.default, { color: _this.selectedTab === constants_1.sideTabsObject.settings ? '#F8FAFC' : '#94A3B8' });
                default:
                    return;
            }
        };
        _this.renderTabs = function () {
            var currentTheme = _this.props.currentTheme;
            return constants_1.sideTabsList.map(function (eachTab) {
                return (React.createElement(styledComponent_1.TabItem, { onClick: function () { return _this.onSelectTab(eachTab.value); }, isActive: _this.selectedTab === eachTab.value, key: eachTab.value, isDarkTheme: currentTheme === constants_1.dark },
                    React.createElement(styledComponent_1.ActiveVerticalBar, { isActive: _this.selectedTab === eachTab.value }),
                    React.createElement(styledComponent_1.TabIcon, null, _this.getIcon(eachTab.value)),
                    React.createElement(styledComponent_1.TabLabel, { isActive: _this.selectedTab === eachTab.value, isDarkTheme: currentTheme.toLowerCase().includes(constants_1.dark) }, eachTab.label)));
            });
        };
        _this.selectedTab = constants_1.sideTabsObject.open;
        return _this;
    }
    SideTabs.prototype.render = function () {
        var currentTheme = this.props.currentTheme;
        return (React.createElement(styledComponent_1.SideTabsContainer, { isDarkTheme: currentTheme === constants_1.dark }, this.renderTabs()));
    };
    __decorate([
        mobx_1.observable,
        __metadata("design:type", String)
    ], SideTabs.prototype, "selectedTab", void 0);
    SideTabs = __decorate([
        mobx_react_1.observer,
        __metadata("design:paramtypes", [Object])
    ], SideTabs);
    return SideTabs;
}(React.Component));
exports.default = SideTabs;
//# sourceMappingURL=sideTabs.js.map