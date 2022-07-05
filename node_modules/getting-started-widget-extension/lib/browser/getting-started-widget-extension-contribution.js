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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomGettingStartedWidget = void 0;
var React = __importStar(require("react"));
var inversify_1 = require("inversify");
var theming_1 = require("@theia/core/lib/browser/theming");
var getting_started_widget_1 = require("@theia/getting-started/lib/browser/getting-started-widget");
var gettingStartedUI_1 = require("./gettingStartedUI");
var CustomGettingStartedWidget = /** @class */ (function (_super) {
    __extends(CustomGettingStartedWidget, _super);
    function CustomGettingStartedWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getCurrentTheme = function () {
            return _this.themeService.getCurrentTheme();
        };
        return _this;
    }
    CustomGettingStartedWidget.prototype.render = function () {
        var paths = this.buildPaths(this.recentWorkspaces);
        return (React.createElement(gettingStartedUI_1.GettingStartedUI, { recentWorkspaces: this.recentWorkspaces, paths: paths, onClickOpenFile: this.doOpen, onClickOpenWorkspace: this.doOpenWorkspace, onClickRecentWorkspace: this.open, doOpenPreferences: this.doOpenPreferences, doOpenKeyboardShortcuts: this.doOpenKeyboardShortcuts, onThemeChange: this.themeService.onThemeChange, getCurrentTheme: this.getCurrentTheme }));
    };
    __decorate([
        inversify_1.inject(theming_1.ThemeService),
        __metadata("design:type", theming_1.ThemeService)
    ], CustomGettingStartedWidget.prototype, "themeService", void 0);
    CustomGettingStartedWidget = __decorate([
        inversify_1.injectable()
    ], CustomGettingStartedWidget);
    return CustomGettingStartedWidget;
}(getting_started_widget_1.GettingStartedWidget));
exports.CustomGettingStartedWidget = CustomGettingStartedWidget;
//# sourceMappingURL=getting-started-widget-extension-contribution.js.map