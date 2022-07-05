"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var common_1 = require("@theia/core/lib/common");
var common_2 = require("../common");
var custom_code_snippets_server_1 = require("./custom-code-snippets-server");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(custom_code_snippets_server_1.CustomCodeSnippetsServer).toSelf().inSingletonScope();
    bind(common_2.CustomCodeSnippetsContribution).toService(custom_code_snippets_server_1.CustomCodeSnippetsServer);
    bind(common_1.ConnectionHandler).toDynamicValue(function (context) { return new common_1.JsonRpcConnectionHandler(common_2.CCBPProjectServicePath, function () { return context.container.get(common_2.CustomCodeSnippetsContribution); }); }).inSingletonScope();
});
//# sourceMappingURL=custom-code-snippets-server.module.js.map