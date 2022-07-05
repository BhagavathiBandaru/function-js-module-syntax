"use strict";
/********************************************************************************
 * Copyright (c) 2021 SAP SE or an SAP affiliate company and others.
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
exports.BulkEditContribution = exports.BULK_EDIT_WIDGET_NAME = void 0;
var inversify_1 = require("inversify");
var view_contribution_1 = require("@theia/core/lib/browser/shell/view-contribution");
var bulk_edit_commands_1 = require("./bulk-edit-commands");
var monaco_bulk_edit_service_1 = require("@theia/monaco/lib/browser/monaco-bulk-edit-service");
var bulk_edit_tree_1 = require("./bulk-edit-tree");
var quick_view_service_1 = require("@theia/core/lib/browser/quick-view-service");
exports.BULK_EDIT_WIDGET_NAME = 'Refactor Preview';
var BulkEditContribution = /** @class */ (function (_super) {
    __extends(BulkEditContribution, _super);
    function BulkEditContribution(bulkEditService) {
        var _this = _super.call(this, {
            widgetId: bulk_edit_tree_1.BULK_EDIT_TREE_WIDGET_ID,
            widgetName: exports.BULK_EDIT_WIDGET_NAME,
            defaultWidgetOptions: {
                area: 'bottom'
            }
        }) || this;
        _this.bulkEditService = bulkEditService;
        _this.bulkEditService.setPreviewHandler(function (edits) { return _this.previewEdit(edits); });
        return _this;
    }
    BulkEditContribution.prototype.registerCommands = function (registry) {
        var _this = this;
        _super.prototype.registerCommands.call(this, registry);
        this.quickView.hideItem(exports.BULK_EDIT_WIDGET_NAME);
        registry.registerCommand(bulk_edit_commands_1.BulkEditCommands.APPLY, {
            isEnabled: function (widget) { return _this.withWidget(widget, function () { return true; }); },
            isVisible: function (widget) { return _this.withWidget(widget, function () { return true; }); },
            execute: function (widget) { return _this.withWidget(widget, function () { return _this.apply(); }); }
        });
        registry.registerCommand(bulk_edit_commands_1.BulkEditCommands.DISCARD, {
            isEnabled: function (widget) { return _this.withWidget(widget, function () { return true; }); },
            isVisible: function (widget) { return _this.withWidget(widget, function () { return true; }); },
            execute: function (widget) { return _this.withWidget(widget, function () { return _this.discard(); }); }
        });
    };
    BulkEditContribution.prototype.registerToolbarItems = function (toolbarRegistry) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                toolbarRegistry.registerItem({
                    id: bulk_edit_commands_1.BulkEditCommands.APPLY.id,
                    command: bulk_edit_commands_1.BulkEditCommands.APPLY.id,
                    tooltip: 'Apply Refactoring',
                    priority: 0,
                });
                toolbarRegistry.registerItem({
                    id: bulk_edit_commands_1.BulkEditCommands.DISCARD.id,
                    command: bulk_edit_commands_1.BulkEditCommands.DISCARD.id,
                    tooltip: 'Discard Refactoring',
                    priority: 1,
                });
                return [2 /*return*/];
            });
        });
    };
    BulkEditContribution.prototype.withWidget = function (widget, cb) {
        if (widget === void 0) { widget = this.tryGetWidget(); }
        if (widget instanceof bulk_edit_tree_1.BulkEditTreeWidget) {
            return cb(widget);
        }
        return false;
    };
    BulkEditContribution.prototype.previewEdit = function (workspaceEdit) {
        return __awaiter(this, void 0, void 0, function () {
            var widget;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.openView({ activate: true })];
                    case 1:
                        widget = _a.sent();
                        if (!widget) return [3 /*break*/, 3];
                        this.workspaceEdit = workspaceEdit;
                        return [4 /*yield*/, widget.initModel(workspaceEdit)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, workspaceEdit];
                }
            });
        });
    };
    BulkEditContribution.prototype.apply = function () {
        var _a;
        if ((_a = this.workspaceEdit) === null || _a === void 0 ? void 0 : _a.edits) {
            this.workspaceEdit.edits.forEach(function (edit) {
                if (edit.metadata) {
                    edit.metadata.needsConfirmation = false;
                }
            });
            this.bulkEditService.apply(this.workspaceEdit);
        }
        this.closeView();
    };
    BulkEditContribution.prototype.discard = function () {
        if (this.workspaceEdit) {
            this.workspaceEdit.edits = [];
        }
        this.closeView();
    };
    __decorate([
        inversify_1.inject(quick_view_service_1.QuickViewService),
        __metadata("design:type", quick_view_service_1.QuickViewService)
    ], BulkEditContribution.prototype, "quickView", void 0);
    BulkEditContribution = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [monaco_bulk_edit_service_1.MonacoBulkEditService])
    ], BulkEditContribution);
    return BulkEditContribution;
}(view_contribution_1.AbstractViewContribution));
exports.BulkEditContribution = BulkEditContribution;
//# sourceMappingURL=bulk-edit-contribution.js.map