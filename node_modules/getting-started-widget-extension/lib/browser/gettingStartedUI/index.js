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
exports.GettingStartedUI = void 0;
var React = __importStar(require("react"));
var mobx_1 = require("mobx");
var mobx_react_1 = require("mobx-react");
var sideTabs_1 = __importDefault(require("./sideTabs"));
var settingsContent_1 = __importDefault(require("./settingsContent"));
var constants_1 = require("./constants");
var OpenFolderContent_1 = __importDefault(require("./OpenFolderContent"));
var gettingStartedHeader_1 = __importDefault(require("./gettingStartedHeader"));
var styledComponent_1 = require("./styledComponent");
var GettingStartedUI = /** @class */ (function (_super) {
    __extends(GettingStartedUI, _super);
    function GettingStartedUI(props) {
        var _this = _super.call(this, props) || this;
        _this.onSelectTab = function (selectedTab) {
            _this.selectedTab = selectedTab;
        };
        _this.renderTabContent = function () {
            var _a = _this.props, paths = _a.paths, recentWorkspaces = _a.recentWorkspaces, onClickOpenFile = _a.onClickOpenFile, onClickOpenWorkspace = _a.onClickOpenWorkspace, onClickRecentWorkspace = _a.onClickRecentWorkspace, doOpenPreferences = _a.doOpenPreferences, doOpenKeyboardShortcuts = _a.doOpenKeyboardShortcuts;
            switch (_this.selectedTab) {
                case constants_1.sideTabsObject.open:
                    return React.createElement(OpenFolderContent_1.default, { recentWorkspaces: recentWorkspaces, paths: paths, onClickOpenFile: onClickOpenFile, onClickOpenWorkspace: onClickOpenWorkspace, onClickRecentWorkspace: onClickRecentWorkspace, currentTheme: _this.currentTheme });
                case constants_1.sideTabsObject.settings:
                    return React.createElement(settingsContent_1.default, { doOpenPreferences: doOpenPreferences, doOpenKeyboardShortcuts: doOpenKeyboardShortcuts, currentTheme: _this.currentTheme });
                default:
                    return;
            }
        };
        _this.selectedTab = constants_1.sideTabsObject.open;
        _this.currentTheme = props.getCurrentTheme().type;
        return _this;
    }
    GettingStartedUI.prototype.componentDidMount = function () {
        var _this = this;
        var _a = this.props, onThemeChange = _a.onThemeChange, getCurrentTheme = _a.getCurrentTheme;
        onThemeChange(function () {
            _this.currentTheme = getCurrentTheme().type;
        });
    };
    GettingStartedUI.prototype.render = function () {
        return (React.createElement(styledComponent_1.GettingStartedContainer, { isDarkTheme: this.currentTheme === constants_1.dark },
            React.createElement(gettingStartedHeader_1.default, { currentTheme: this.currentTheme }),
            React.createElement(styledComponent_1.SideTabsAndContentContainer, null,
                React.createElement(sideTabs_1.default, { onSelectTab: this.onSelectTab, currentTheme: this.currentTheme }),
                React.createElement(styledComponent_1.TabContentContainer, null, this.renderTabContent()))));
    };
    __decorate([
        mobx_1.observable,
        __metadata("design:type", String)
    ], GettingStartedUI.prototype, "selectedTab", void 0);
    __decorate([
        mobx_1.observable,
        __metadata("design:type", String)
    ], GettingStartedUI.prototype, "currentTheme", void 0);
    GettingStartedUI = __decorate([
        mobx_react_1.observer,
        __metadata("design:paramtypes", [Object])
    ], GettingStartedUI);
    return GettingStartedUI;
}(React.Component));
exports.GettingStartedUI = GettingStartedUI;
//# sourceMappingURL=index.js.map