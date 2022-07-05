"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
function FolderIcon(props) {
    return (react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: props.width, height: props.height, fill: "none", viewBox: "0 0 24 24" },
        react_1.default.createElement("path", { fill: props.color, fillRule: "evenodd", d: "M14 15h-1v1c0 .55-.45 1-1 1s-1-.45-1-1v-1h-1c-.55 0-1-.45-1-1s.45-1 1-1h1v-1c0-.55.45-1 1-1s1 .45 1 1v1h1c.55 0 1 .45 1 1s-.45 1-1 1zm5.5-7.954h-7.026L9.875 3.867a1.002 1.002 0 00-.774-.367H4.5C3.122 3.5 2 4.591 2 5.932v12.136C2 19.409 3.122 20.5 4.5 20.5h15c1.378 0 2.5-1.091 2.5-2.432v-8.59c0-1.341-1.122-2.432-2.5-2.432z", clipRule: "evenodd" })));
}
FolderIcon.defaultProps = {
    width: "24",
    height: "24",
    color: "#F8FAFC"
};
exports.default = FolderIcon;
//# sourceMappingURL=folderIcon.js.map