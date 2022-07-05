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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var constants_1 = require("./constants");
var uiString_1 = require("./uiString");
var styledComponent_1 = require("./styledComponent");
var GettingStartedHeader = /** @class */ (function (_super) {
    __extends(GettingStartedHeader, _super);
    function GettingStartedHeader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GettingStartedHeader.prototype.render = function () {
        var currentTheme = this.props.currentTheme;
        return (React.createElement(styledComponent_1.GettingStartedHeaderContainer, null,
            React.createElement(styledComponent_1.WelcomeHeading, { isDarkTheme: currentTheme === constants_1.dark }, uiString_1.welcomeHeading),
            React.createElement(styledComponent_1.HeadingDescription, { isDarkTheme: currentTheme === constants_1.dark }, uiString_1.gettingStartedDescription)));
    };
    return GettingStartedHeader;
}(React.Component));
exports.default = GettingStartedHeader;
//# sourceMappingURL=gettingStartedHeader.js.map