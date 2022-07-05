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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.ScmCommitWidget = void 0;
var inversify_1 = require("inversify");
var core_1 = require("@theia/core");
var React = require("react");
var react_autosize_textarea_1 = require("react-autosize-textarea");
var scm_input_1 = require("./scm-input");
var browser_1 = require("@theia/core/lib/browser");
var scm_service_1 = require("./scm-service");
var ScmCommitWidget = /** @class */ (function (_super) {
    __extends(ScmCommitWidget, _super);
    function ScmCommitWidget(contextMenuRenderer) {
        var _this = _super.call(this) || this;
        _this.contextMenuRenderer = contextMenuRenderer;
        _this.toDisposeOnRepositoryChange = new core_1.DisposableCollection();
        _this.shouldScrollToRow = true;
        /**
         * Don't modify DOM use React! only exposed for `focusInput`
         * Use `this.scmService.selectedRepository?.input.value` as a single source of truth!
         */
        _this.inputRef = React.createRef();
        _this.setInputValue = function (event) {
            var repository = _this.scmService.selectedRepository;
            if (repository) {
                repository.input.value = typeof event === 'string' ? event : event.currentTarget.value;
            }
        };
        _this.scrollOptions = {
            suppressScrollX: true,
            minScrollbarLength: 35
        };
        _this.addClass('theia-scm-commit');
        _this.id = ScmCommitWidget_1.ID;
        return _this;
    }
    ScmCommitWidget_1 = ScmCommitWidget;
    ScmCommitWidget.prototype.onAfterAttach = function (msg) {
        var _this = this;
        _super.prototype.onAfterAttach.call(this, msg);
        this.refreshOnRepositoryChange();
        this.toDisposeOnDetach.push(this.scmService.onDidChangeSelectedRepository(function () {
            _this.refreshOnRepositoryChange();
            _this.update();
        }));
    };
    ScmCommitWidget.prototype.refreshOnRepositoryChange = function () {
        var _this = this;
        this.toDisposeOnRepositoryChange.dispose();
        var repository = this.scmService.selectedRepository;
        if (repository) {
            this.toDisposeOnRepositoryChange.push(repository.provider.onDidChange(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.update();
                    return [2 /*return*/];
                });
            }); }));
        }
    };
    ScmCommitWidget.prototype.onActivateRequest = function (msg) {
        _super.prototype.onActivateRequest.call(this, msg);
        this.focus();
    };
    ScmCommitWidget.prototype.focus = function () {
        (this.inputRef.current || this.node).focus();
    };
    ScmCommitWidget.prototype.render = function () {
        var repository = this.scmService.selectedRepository;
        if (repository) {
            return React.createElement('div', this.createContainerAttributes(), this.renderInput(repository.input));
        }
    };
    /**
     * Create the container attributes for the widget.
     */
    ScmCommitWidget.prototype.createContainerAttributes = function () {
        return {
            style: { flexGrow: 0 }
        };
    };
    ScmCommitWidget.prototype.renderInput = function (input) {
        var validationStatus = 'idle';
        if (input.issue) {
            switch (input.issue.type) {
                case scm_input_1.ScmInputIssueType.Error:
                    validationStatus = 'error';
                    break;
                case scm_input_1.ScmInputIssueType.Information:
                    validationStatus = 'info';
                    break;
                case scm_input_1.ScmInputIssueType.Warning:
                    validationStatus = 'warning';
                    break;
            }
        }
        var validationMessage = input.issue ? input.issue.message : '';
        var format = function (value) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (args.length !== 0) {
                return value.replace(/{(\d+)}/g, function (found, n) {
                    var i = parseInt(n);
                    return isNaN(i) || i < 0 || i >= args.length ? found : args[i];
                });
            }
            return value;
        };
        var keybinding = this.keybindings.acceleratorFor(this.keybindings.getKeybindingsForCommand('scm.acceptInput')[0]).join('+');
        var message = format(input.placeholder || '', keybinding);
        return React.createElement("div", { className: ScmCommitWidget_1.Styles.INPUT_MESSAGE_CONTAINER },
            React.createElement(react_autosize_textarea_1.default, { className: ScmCommitWidget_1.Styles.INPUT_MESSAGE + " theia-input theia-scm-input-message-" + validationStatus, id: ScmCommitWidget_1.Styles.INPUT_MESSAGE, placeholder: message, autoFocus: true, value: input.value, onChange: this.setInputValue, ref: this.inputRef, rows: 1, maxRows: 6 }),
            React.createElement("div", { className: ScmCommitWidget_1.Styles.VALIDATION_MESSAGE + " " + ScmCommitWidget_1.Styles.NO_SELECT + "\n                    theia-scm-validation-message-" + validationStatus + " theia-scm-input-message-" + validationStatus, style: {
                    display: !!input.issue ? 'block' : 'none'
                } }, validationMessage));
    };
    /**
     * Store the tree state.
     */
    ScmCommitWidget.prototype.storeState = function () {
        var _a;
        var message = (_a = this.scmService.selectedRepository) === null || _a === void 0 ? void 0 : _a.input.value;
        return { message: message };
    };
    /**
     * Restore the state.
     * @param oldState the old state object.
     */
    ScmCommitWidget.prototype.restoreState = function (oldState) {
        var _this = this;
        var value = oldState.message;
        if (!value) {
            return;
        }
        var repository = this.scmService.selectedRepository;
        if (repository) {
            repository.input.value = value;
        }
        else {
            var listener_1 = this.scmService.onDidChangeSelectedRepository(function () {
                repository = _this.scmService.selectedRepository;
                if (repository) {
                    listener_1.dispose();
                    if (!repository.input.value) {
                        repository.input.value = value;
                    }
                }
            });
            this.toDispose.push(listener_1);
        }
    };
    var ScmCommitWidget_1;
    ScmCommitWidget.ID = 'scm-commit-widget';
    __decorate([
        inversify_1.inject(scm_service_1.ScmService),
        __metadata("design:type", scm_service_1.ScmService)
    ], ScmCommitWidget.prototype, "scmService", void 0);
    __decorate([
        inversify_1.inject(browser_1.KeybindingRegistry),
        __metadata("design:type", browser_1.KeybindingRegistry)
    ], ScmCommitWidget.prototype, "keybindings", void 0);
    ScmCommitWidget = ScmCommitWidget_1 = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(browser_1.ContextMenuRenderer)),
        __metadata("design:paramtypes", [browser_1.ContextMenuRenderer])
    ], ScmCommitWidget);
    return ScmCommitWidget;
}(browser_1.ReactWidget));
exports.ScmCommitWidget = ScmCommitWidget;
(function (ScmCommitWidget) {
    var Styles;
    (function (Styles) {
        Styles.INPUT_MESSAGE_CONTAINER = 'theia-scm-input-message-container';
        Styles.INPUT_MESSAGE = 'theia-scm-input-message';
        Styles.VALIDATION_MESSAGE = 'theia-scm-input-validation-message';
        Styles.NO_SELECT = 'no-select';
    })(Styles = ScmCommitWidget.Styles || (ScmCommitWidget.Styles = {}));
})(ScmCommitWidget = exports.ScmCommitWidget || (exports.ScmCommitWidget = {}));
exports.ScmCommitWidget = ScmCommitWidget;
//# sourceMappingURL=scm-commit-widget.js.map