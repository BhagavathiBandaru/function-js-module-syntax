"use strict";
/********************************************************************************
 * Copyright (C) 2017 TypeFox and others.
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
var window_service_1 = require("../../browser/window/window-service");
var electron_window_service_1 = require("./electron-window-service");
var frontend_application_1 = require("../../browser/frontend-application");
var electron_clipboard_service_1 = require("../electron-clipboard-service");
var clipboard_service_1 = require("../../browser/clipboard-service");
var electron_main_window_service_1 = require("../../electron-common/electron-main-window-service");
var electron_ipc_connection_provider_1 = require("../messaging/electron-ipc-connection-provider");
var electron_window_preferences_1 = require("./electron-window-preferences");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(electron_main_window_service_1.ElectronMainWindowService).toDynamicValue(function (context) {
        return electron_ipc_connection_provider_1.ElectronIpcConnectionProvider.createProxy(context.container, electron_main_window_service_1.electronMainWindowServicePath);
    }).inSingletonScope();
    electron_window_preferences_1.bindWindowPreferences(bind);
    bind(window_service_1.WindowService).to(electron_window_service_1.ElectronWindowService).inSingletonScope();
    bind(frontend_application_1.FrontendApplicationContribution).toService(window_service_1.WindowService);
    bind(clipboard_service_1.ClipboardService).to(electron_clipboard_service_1.ElectronClipboardService).inSingletonScope();
});
//# sourceMappingURL=electron-window-module.js.map