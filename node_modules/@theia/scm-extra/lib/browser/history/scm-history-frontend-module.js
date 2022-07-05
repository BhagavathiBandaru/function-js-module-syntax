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
exports.bindScmHistoryModule = void 0;
var scm_history_contribution_1 = require("./scm-history-contribution");
var browser_1 = require("@theia/core/lib/browser");
var scm_history_widget_1 = require("./scm-history-widget");
var scm_extra_layout_migrations_1 = require("../scm-extra-layout-migrations");
require("../../../src/browser/style/history.css");
function bindScmHistoryModule(bind) {
    bind(scm_history_widget_1.ScmHistoryWidget).toSelf();
    bind(browser_1.WidgetFactory).toDynamicValue(function (ctx) { return ({
        id: scm_history_contribution_1.SCM_HISTORY_ID,
        createWidget: function () { return ctx.container.get(scm_history_widget_1.ScmHistoryWidget); }
    }); });
    browser_1.bindViewContribution(bind, scm_history_contribution_1.ScmHistoryContribution);
    bind(browser_1.ApplicationShellLayoutMigration).to(scm_extra_layout_migrations_1.ScmExtraLayoutVersion4Migration).inSingletonScope();
}
exports.bindScmHistoryModule = bindScmHistoryModule;
//# sourceMappingURL=scm-history-frontend-module.js.map