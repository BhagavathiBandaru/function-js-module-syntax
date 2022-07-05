"use strict";
/********************************************************************************
 * Copyright (C) 2019 Arm and others.
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
var scm_history_frontend_module_1 = require("./history/scm-history-frontend-module");
var scm_file_change_label_provider_1 = require("./scm-file-change-label-provider");
var browser_1 = require("@theia/core/lib/browser");
exports.default = new inversify_1.ContainerModule(function (bind) {
    scm_history_frontend_module_1.bindScmHistoryModule(bind);
    bind(scm_file_change_label_provider_1.ScmFileChangeLabelProvider).toSelf().inSingletonScope();
    bind(browser_1.LabelProviderContribution).toService(scm_file_change_label_provider_1.ScmFileChangeLabelProvider);
});
//# sourceMappingURL=scm-extra-frontend-module.js.map