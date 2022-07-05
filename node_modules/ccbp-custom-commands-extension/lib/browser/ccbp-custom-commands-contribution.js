"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CCBPCustomCommandsContribution = exports.MiniBrowserCommands = void 0;
var inversify_1 = require("inversify");
var uri_1 = require("@theia/core/lib/common/uri");
var mini_browser_open_handler_1 = require("@theia/mini-browser/lib/browser/mini-browser-open-handler");
var MiniBrowserCommands;
(function (MiniBrowserCommands) {
    MiniBrowserCommands.OPEN_MAIN_URL = {
        id: 'mini-browser.main.openUrl',
        category: 'Preview',
        label: 'Open URL'
    };
})(MiniBrowserCommands = exports.MiniBrowserCommands || (exports.MiniBrowserCommands = {}));
var CCBPCustomCommandsContribution = /** @class */ (function () {
    function CCBPCustomCommandsContribution(miniBrowserOpenHandler) {
        this.miniBrowserOpenHandler = miniBrowserOpenHandler;
    }
    CCBPCustomCommandsContribution.prototype.registerCommands = function (commands) {
        var _this = this;
        commands.registerCommand(MiniBrowserCommands.OPEN_MAIN_URL, {
            execute: function (arg, options) { return _this.miniBrowserOpenHandler.open(new uri_1.default(arg), __assign({ mode: 'activate', toolbar: 'hide' }, options)); }
        });
    };
    CCBPCustomCommandsContribution = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(mini_browser_open_handler_1.MiniBrowserOpenHandler)),
        __metadata("design:paramtypes", [mini_browser_open_handler_1.MiniBrowserOpenHandler])
    ], CCBPCustomCommandsContribution);
    return CCBPCustomCommandsContribution;
}());
exports.CCBPCustomCommandsContribution = CCBPCustomCommandsContribution;
//# sourceMappingURL=ccbp-custom-commands-contribution.js.map