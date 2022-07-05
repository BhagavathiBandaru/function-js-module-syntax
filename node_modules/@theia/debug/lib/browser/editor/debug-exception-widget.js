"use strict";
/********************************************************************************
 * Copyright (C) 2019 TypeFox and others.
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugExceptionWidget = exports.DebugExceptionMonacoEditorZoneWidget = void 0;
var React = require("react");
var ReactDOM = require("react-dom");
var inversify_1 = require("inversify");
var disposable_1 = require("@theia/core/lib/common/disposable");
var monaco_editor_zone_widget_1 = require("@theia/monaco/lib/browser/monaco-editor-zone-widget");
var debug_editor_1 = require("./debug-editor");
var DebugExceptionMonacoEditorZoneWidget = /** @class */ (function (_super) {
    __extends(DebugExceptionMonacoEditorZoneWidget, _super);
    function DebugExceptionMonacoEditorZoneWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DebugExceptionMonacoEditorZoneWidget.prototype.computeContainerHeight = function (zoneHeight) {
        // reset height to match it to the content
        this.containerNode.style.height = 'initial';
        var height = this.containerNode.offsetHeight;
        var result = _super.prototype.computeContainerHeight.call(this, zoneHeight);
        result.height = height;
        return result;
    };
    return DebugExceptionMonacoEditorZoneWidget;
}(monaco_editor_zone_widget_1.MonacoEditorZoneWidget));
exports.DebugExceptionMonacoEditorZoneWidget = DebugExceptionMonacoEditorZoneWidget;
var DebugExceptionWidget = /** @class */ (function () {
    function DebugExceptionWidget() {
        this.toDispose = new disposable_1.DisposableCollection();
    }
    DebugExceptionWidget.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.toDispose.push(this.zone = new DebugExceptionMonacoEditorZoneWidget(this.editor.getControl()));
                this.zone.containerNode.classList.add('theia-debug-exception-widget');
                this.toDispose.push(disposable_1.Disposable.create(function () { return ReactDOM.unmountComponentAtNode(_this.zone.containerNode); }));
                this.toDispose.push(this.editor.getControl().onDidLayoutChange(function () { return _this.layout(); }));
                return [2 /*return*/];
            });
        });
    };
    DebugExceptionWidget.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    DebugExceptionWidget.prototype.show = function (_a) {
        var _this = this;
        var info = _a.info, lineNumber = _a.lineNumber, column = _a.column;
        this.render(info, function () {
            var fontInfo = _this.editor.getControl().getOption(monaco.editor.EditorOption.fontInfo);
            _this.zone.containerNode.style.fontSize = fontInfo.fontSize + "px";
            _this.zone.containerNode.style.lineHeight = fontInfo.lineHeight + "px";
            if (lineNumber !== undefined && column !== undefined) {
                var afterLineNumber = lineNumber;
                var afterColumn = column;
                _this.zone.show({ showFrame: true, afterLineNumber: afterLineNumber, afterColumn: afterColumn, heightInLines: 0, frameWidth: 1 });
            }
            _this.layout();
        });
    };
    DebugExceptionWidget.prototype.hide = function () {
        this.zone.hide();
    };
    DebugExceptionWidget.prototype.render = function (info, cb) {
        var stackTrace = info.details && info.details.stackTrace;
        ReactDOM.render(React.createElement(React.Fragment, null,
            React.createElement("div", { className: 'title' }, info.id ? "Exception has occurred: " + info.id : 'Exception has occurred.'),
            info.description && React.createElement("div", { className: 'description' }, info.description),
            stackTrace && React.createElement("div", { className: 'stack-trace' }, stackTrace)), this.zone.containerNode, cb);
    };
    DebugExceptionWidget.prototype.layout = function () {
        // reset height to match it to the content
        this.zone.containerNode.style.height = 'initial';
        var lineHeight = this.editor.getControl().getOption(monaco.editor.EditorOption.lineHeight);
        var heightInLines = Math.ceil(this.zone.containerNode.offsetHeight / lineHeight);
        this.zone.layout(heightInLines);
    };
    __decorate([
        inversify_1.inject(debug_editor_1.DebugEditor),
        __metadata("design:type", Object)
    ], DebugExceptionWidget.prototype, "editor", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], DebugExceptionWidget.prototype, "init", null);
    DebugExceptionWidget = __decorate([
        inversify_1.injectable()
    ], DebugExceptionWidget);
    return DebugExceptionWidget;
}());
exports.DebugExceptionWidget = DebugExceptionWidget;
//# sourceMappingURL=debug-exception-widget.js.map