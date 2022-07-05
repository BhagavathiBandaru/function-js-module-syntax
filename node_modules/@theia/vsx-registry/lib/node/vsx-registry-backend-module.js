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
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var vsx_extension_resolver_1 = require("./vsx-extension-resolver");
var plugin_protocol_1 = require("@theia/plugin-ext/lib/common/plugin-protocol");
var vsx_registry_api_1 = require("../common/vsx-registry-api");
var vsx_environment_1 = require("../common/vsx-environment");
var vsx_api_version_provider_backend_impl_1 = require("./vsx-api-version-provider-backend-impl");
var vsx_api_version_provider_1 = require("../common/vsx-api-version-provider");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(vsx_environment_1.VSXEnvironment).toSelf().inRequestScope();
    bind(vsx_registry_api_1.VSXRegistryAPI).toSelf().inSingletonScope();
    bind(vsx_extension_resolver_1.VSXExtensionResolver).toSelf().inSingletonScope();
    bind(plugin_protocol_1.PluginDeployerResolver).toService(vsx_extension_resolver_1.VSXExtensionResolver);
    bind(vsx_api_version_provider_backend_impl_1.VSXApiVersionProviderImpl).toSelf().inSingletonScope();
    bind(vsx_api_version_provider_1.VSXApiVersionProvider).toService(vsx_api_version_provider_backend_impl_1.VSXApiVersionProviderImpl);
});
//# sourceMappingURL=vsx-registry-backend-module.js.map