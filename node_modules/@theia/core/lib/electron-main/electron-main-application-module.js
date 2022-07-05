"use strict";
/********************************************************************************
 * Copyright (C) 2020 Ericsson and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var uuid_1 = require("uuid");
var contribution_provider_1 = require("../common/contribution-provider");
var proxy_factory_1 = require("../common/messaging/proxy-factory");
var electron_token_1 = require("../electron-common/electron-token");
var electron_main_window_service_1 = require("../electron-common/electron-main-window-service");
var electron_main_application_1 = require("./electron-main-application");
var electron_main_window_service_impl_1 = require("./electron-main-window-service-impl");
var electron_messaging_contribution_1 = require("./messaging/electron-messaging-contribution");
var electron_messaging_service_1 = require("./messaging/electron-messaging-service");
var electron_connection_handler_1 = require("../electron-common/messaging/electron-connection-handler");
var electron_security_token_service_1 = require("./electron-security-token-service");
var electronSecurityToken = { value: uuid_1.v4() };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
global[electron_token_1.ElectronSecurityToken] = electronSecurityToken;
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(electron_main_application_1.ElectronMainApplication).toSelf().inSingletonScope();
    bind(electron_messaging_contribution_1.ElectronMessagingContribution).toSelf().inSingletonScope();
    bind(electron_token_1.ElectronSecurityToken).toConstantValue(electronSecurityToken);
    bind(electron_security_token_service_1.ElectronSecurityTokenService).toSelf().inSingletonScope();
    contribution_provider_1.bindContributionProvider(bind, electron_connection_handler_1.ElectronConnectionHandler);
    contribution_provider_1.bindContributionProvider(bind, electron_messaging_service_1.ElectronMessagingService.Contribution);
    contribution_provider_1.bindContributionProvider(bind, electron_main_application_1.ElectronMainApplicationContribution);
    bind(electron_main_application_1.ElectronMainApplicationContribution).toService(electron_messaging_contribution_1.ElectronMessagingContribution);
    bind(electron_main_window_service_1.ElectronMainWindowService).to(electron_main_window_service_impl_1.ElectronMainWindowServiceImpl).inSingletonScope();
    bind(electron_connection_handler_1.ElectronConnectionHandler).toDynamicValue(function (context) {
        return new proxy_factory_1.JsonRpcConnectionHandler(electron_main_window_service_1.electronMainWindowServicePath, function () { return context.container.get(electron_main_window_service_1.ElectronMainWindowService); });
    }).inSingletonScope();
    bind(electron_main_application_1.ElectronMainProcessArgv).toSelf().inSingletonScope();
});
//# sourceMappingURL=electron-main-application-module.js.map