"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var browser_1 = require("@theia/core/lib/browser");
var common_1 = require("../common");
var custom_code_snippets_extension_contribution_1 = require("./custom-code-snippets-extension-contribution");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(browser_1.FrontendApplicationContribution).to(custom_code_snippets_extension_contribution_1.CustomCodeSnippetsExtensionContribution);
    bind(common_1.CustomCodeSnippetsContribution).toDynamicValue(function (context) { return browser_1.WebSocketConnectionProvider.createProxy(context.container, common_1.CCBPProjectServicePath); }).inSingletonScope();
});
//# sourceMappingURL=custom-code-snippets-extension-frontend-module.js.map