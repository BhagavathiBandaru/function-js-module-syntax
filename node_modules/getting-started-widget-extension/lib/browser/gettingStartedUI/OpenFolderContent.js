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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var uri_1 = __importDefault(require("@theia/core/lib/common/uri"));
var constants_1 = require("./constants");
var uiString_1 = require("./uiString");
var styledComponent_1 = require("./styledComponent");
var OpenFolderContent = /** @class */ (function (_super) {
    __extends(OpenFolderContent, _super);
    function OpenFolderContent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onClickOpenFile = function () {
            var onClickOpenFile = _this.props.onClickOpenFile;
            onClickOpenFile();
        };
        _this.onClickOpenWorkspace = function () {
            var onClickOpenWorkspace = _this.props.onClickOpenWorkspace;
            onClickOpenWorkspace();
        };
        _this.renderRecentWorkspaces = function () {
            var _a = _this.props, paths = _a.paths, recentWorkspaces = _a.recentWorkspaces, onClickRecentWorkspace = _a.onClickRecentWorkspace, currentTheme = _a.currentTheme;
            return paths.map(function (eachWorkspace, index) {
                var pathURI = new uri_1.default(recentWorkspaces[index]);
                return (React.createElement(styledComponent_1.IDEButton, { isPath: true, key: eachWorkspace, onClick: function () { onClickRecentWorkspace(pathURI); }, isDarkTheme: currentTheme === constants_1.dark },
                    React.createElement(styledComponent_1.ReactWorkspaceName, null,
                        pathURI.path.base,
                        React.createElement(styledComponent_1.ReactWorkspacePath, null, eachWorkspace))));
            });
        };
        return _this;
    }
    OpenFolderContent.prototype.render = function () {
        var currentTheme = this.props.currentTheme;
        return (React.createElement(React.Fragment, null,
            React.createElement(styledComponent_1.IDEButton, { onClick: this.onClickOpenFile, isDarkTheme: currentTheme === constants_1.dark }, uiString_1.open),
            React.createElement(styledComponent_1.IDEButton, { onClick: this.onClickOpenWorkspace, isDarkTheme: currentTheme === constants_1.dark }, uiString_1.openWorkspace),
            React.createElement(styledComponent_1.RecentWorkspaceText, { isDarkTheme: currentTheme === constants_1.dark }, uiString_1.recentWorkspaces),
            React.createElement(styledComponent_1.ReactWorkspaceButtonsContainer, null, this.renderRecentWorkspaces())));
    };
    return OpenFolderContent;
}(React.Component));
exports.default = OpenFolderContent;
//# sourceMappingURL=OpenFolderContent.js.map