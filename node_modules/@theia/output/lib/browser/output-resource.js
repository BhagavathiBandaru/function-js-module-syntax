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
 ********************************************************************************/
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
exports.OutputResource = void 0;
var common_1 = require("@theia/core/lib/common");
var OutputResource = /** @class */ (function () {
    function OutputResource(uri, editorModelRef) {
        var _this = this;
        this.uri = uri;
        this.editorModelRef = editorModelRef;
        this.onDidChangeContentsEmitter = new common_1.Emitter();
        this.toDispose = new common_1.DisposableCollection(this.onDidChangeContentsEmitter);
        this.editorModelRef.promise.then(function (modelRef) {
            if (_this.toDispose.disposed) {
                modelRef.dispose();
                return;
            }
            var textModel = modelRef.object.textEditorModel;
            _this._textModel = textModel;
            _this.toDispose.push(modelRef);
            _this.toDispose.push(_this._textModel.onDidChangeContent(function () { return _this.onDidChangeContentsEmitter.fire(); }));
        });
    }
    Object.defineProperty(OutputResource.prototype, "textModel", {
        get: function () {
            return this._textModel;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OutputResource.prototype, "onDidChangeContents", {
        get: function () {
            return this.onDidChangeContentsEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    OutputResource.prototype.readContents = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var modelRef;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._textModel) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.editorModelRef.promise];
                    case 1:
                        modelRef = _a.sent();
                        return [2 /*return*/, modelRef.object.textEditorModel.getValue()];
                    case 2: return [2 /*return*/, ''];
                }
            });
        });
    };
    OutputResource.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    return OutputResource;
}());
exports.OutputResource = OutputResource;
//# sourceMappingURL=output-resource.js.map