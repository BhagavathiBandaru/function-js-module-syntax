"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var browser_1 = require("@theia/core/lib/browser");
var custom_font_families_extension_contribution_1 = require("./custom-font-families-extension-contribution");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(browser_1.FrontendApplicationContribution).to(custom_font_families_extension_contribution_1.CustomFontFamiliesContribution);
});
//# sourceMappingURL=custom-font-families-extension-frontend-module.js.map