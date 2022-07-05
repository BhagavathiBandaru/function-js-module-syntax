"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var command_1 = require("@theia/core/lib/common/command");
var ccbp_custom_commands_contribution_1 = require("./ccbp-custom-commands-contribution");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(command_1.CommandContribution).to(ccbp_custom_commands_contribution_1.CCBPCustomCommandsContribution);
});
//# sourceMappingURL=ccbp-custom-commands-extension-frontend-module.js.map