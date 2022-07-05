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
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// based on https://github.com/microsoft/vscode/blob/04c36be045a94fee58e5f8992d3e3fd980294a84/src/vs/workbench/api/browser/mainThreadFileSystemEventService.ts
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainFileSystemEventService = void 0;
var plugin_api_rpc_1 = require("../../common/plugin-api-rpc");
var disposable_1 = require("@theia/core/lib/common/disposable");
var file_service_1 = require("@theia/filesystem/lib/browser/file-service");
var MainFileSystemEventService = /** @class */ (function () {
    function MainFileSystemEventService(rpc, container) {
        this.toDispose = new disposable_1.DisposableCollection();
        var proxy = rpc.getProxy(plugin_api_rpc_1.MAIN_RPC_CONTEXT.ExtHostFileSystemEventService);
        var fileService = container.get(file_service_1.FileService);
        // file system events - (changes the editor and other make)
        var events = {
            created: [],
            changed: [],
            deleted: []
        };
        this.toDispose.push(fileService.onDidFilesChange(function (event) {
            var e_1, _a;
            try {
                for (var _b = __values(event.changes), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var change = _c.value;
                    switch (change.type) {
                        case 1 /* ADDED */:
                            events.created.push(change.resource['codeUri']);
                            break;
                        case 0 /* UPDATED */:
                            events.changed.push(change.resource['codeUri']);
                            break;
                        case 2 /* DELETED */:
                            events.deleted.push(change.resource['codeUri']);
                            break;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            proxy.$onFileEvent(events);
            events.created.length = 0;
            events.changed.length = 0;
            events.deleted.length = 0;
        }));
        // BEFORE file operation
        fileService.addFileOperationParticipant({
            participate: function (target, source, operation, timeout, token) { return proxy.$onWillRunFileOperation(operation, target['codeUri'], source === null || source === void 0 ? void 0 : source['codeUri'], timeout, token); }
        });
        // AFTER file operation
        this.toDispose.push(fileService.onDidRunUserOperation(function (e) { var _a; return proxy.$onDidRunFileOperation(e.operation, e.target['codeUri'], (_a = e.source) === null || _a === void 0 ? void 0 : _a['codeUri']); }));
    }
    MainFileSystemEventService.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    return MainFileSystemEventService;
}());
exports.MainFileSystemEventService = MainFileSystemEventService;
//# sourceMappingURL=main-file-system-event-service.js.map