"use strict";
/********************************************************************************
 * Copyright (C) 2018 TypeFox and others.
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
exports.ScmHistoryContribution = exports.ScmHistoryCommands = exports.SCM_HISTORY_MAX_COUNT = exports.SCM_HISTORY_TOGGLE_KEYBINDING = exports.SCM_HISTORY_LABEL = exports.SCM_HISTORY_ID = void 0;
var core_1 = require("@theia/core");
var browser_1 = require("@theia/core/lib/browser");
var inversify_1 = require("inversify");
var navigator_contribution_1 = require("@theia/navigator/lib/browser/navigator-contribution");
var uri_command_handler_1 = require("@theia/core/lib/common/uri-command-handler");
var scm_service_1 = require("@theia/scm/lib/browser/scm-service");
var scm_extra_contribution_1 = require("../scm-extra-contribution");
exports.SCM_HISTORY_ID = 'scm-history';
exports.SCM_HISTORY_LABEL = 'History';
exports.SCM_HISTORY_TOGGLE_KEYBINDING = 'alt+h';
exports.SCM_HISTORY_MAX_COUNT = 100;
var ScmHistoryCommands;
(function (ScmHistoryCommands) {
    ScmHistoryCommands.OPEN_FILE_HISTORY = {
        id: 'scm-history:open-file-history',
    };
    ScmHistoryCommands.OPEN_BRANCH_HISTORY = {
        id: 'scm-history:open-branch-history',
        label: exports.SCM_HISTORY_LABEL
    };
})(ScmHistoryCommands = exports.ScmHistoryCommands || (exports.ScmHistoryCommands = {}));
var ScmHistoryContribution = /** @class */ (function (_super) {
    __extends(ScmHistoryContribution, _super);
    function ScmHistoryContribution() {
        return _super.call(this, {
            widgetId: exports.SCM_HISTORY_ID,
            widgetName: exports.SCM_HISTORY_LABEL,
            defaultWidgetOptions: {
                area: 'left',
                rank: 500
            },
            toggleCommandId: ScmHistoryCommands.OPEN_BRANCH_HISTORY.id,
            toggleKeybinding: exports.SCM_HISTORY_TOGGLE_KEYBINDING
        }) || this;
    }
    ScmHistoryContribution.prototype.openView = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var widget;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.openView.call(this, args)];
                    case 1:
                        widget = _a.sent();
                        this.refreshWidget(args.uri);
                        return [2 /*return*/, widget];
                }
            });
        });
    };
    ScmHistoryContribution.prototype.registerMenus = function (menus) {
        menus.registerMenuAction(navigator_contribution_1.NavigatorContextMenu.SEARCH, {
            commandId: ScmHistoryCommands.OPEN_FILE_HISTORY.id,
            label: exports.SCM_HISTORY_LABEL
        });
        menus.registerMenuAction(scm_extra_contribution_1.EDITOR_CONTEXT_MENU_SCM, {
            commandId: ScmHistoryCommands.OPEN_FILE_HISTORY.id,
            label: exports.SCM_HISTORY_LABEL
        });
        _super.prototype.registerMenus.call(this, menus);
    };
    ScmHistoryContribution.prototype.registerCommands = function (commands) {
        var _this = this;
        commands.registerCommand(ScmHistoryCommands.OPEN_FILE_HISTORY, this.newUriAwareCommandHandler({
            isEnabled: function (uri) { return !!_this.scmService.findRepository(uri); },
            isVisible: function (uri) { return !!_this.scmService.findRepository(uri); },
            execute: function (uri) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, this.openView({ activate: true, uri: uri.toString() })];
            }); }); },
        }));
        _super.prototype.registerCommands.call(this, commands);
    };
    ScmHistoryContribution.prototype.refreshWidget = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var widget;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        widget = this.tryGetWidget();
                        if (!widget) {
                            // the widget doesn't exist, so don't wake it up
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, widget.setContent({ uri: uri })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ScmHistoryContribution.prototype.newUriAwareCommandHandler = function (handler) {
        return uri_command_handler_1.UriAwareCommandHandler.MonoSelect(this.selectionService, handler);
    };
    __decorate([
        inversify_1.inject(core_1.SelectionService),
        __metadata("design:type", core_1.SelectionService)
    ], ScmHistoryContribution.prototype, "selectionService", void 0);
    __decorate([
        inversify_1.inject(scm_service_1.ScmService),
        __metadata("design:type", scm_service_1.ScmService)
    ], ScmHistoryContribution.prototype, "scmService", void 0);
    ScmHistoryContribution = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], ScmHistoryContribution);
    return ScmHistoryContribution;
}(browser_1.AbstractViewContribution));
exports.ScmHistoryContribution = ScmHistoryContribution;
//# sourceMappingURL=scm-history-contribution.js.map