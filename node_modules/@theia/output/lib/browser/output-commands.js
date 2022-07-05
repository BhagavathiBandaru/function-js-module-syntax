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
exports.OutputCommands = void 0;
var OutputCommands;
(function (OutputCommands) {
    var OUTPUT_CATEGORY = 'Output';
    /* #region VS Code `OutputChannel` API */
    // Based on: https://github.com/theia-ide/vscode/blob/standalone/0.19.x/src/vs/vscode.d.ts#L4692-L4745
    OutputCommands.APPEND = {
        id: 'output:append'
    };
    OutputCommands.APPEND_LINE = {
        id: 'output:appendLine'
    };
    OutputCommands.CLEAR = {
        id: 'output:clear'
    };
    OutputCommands.SHOW = {
        id: 'output:show'
    };
    OutputCommands.HIDE = {
        id: 'output:hide'
    };
    OutputCommands.DISPOSE = {
        id: 'output:dispose'
    };
    /* #endregion VS Code `OutputChannel` API */
    OutputCommands.CLEAR__WIDGET = {
        id: 'output:widget:clear',
        category: OUTPUT_CATEGORY,
        iconClass: 'clear-all'
    };
    OutputCommands.LOCK__WIDGET = {
        id: 'output:widget:lock',
        category: OUTPUT_CATEGORY,
        iconClass: 'fa fa-unlock'
    };
    OutputCommands.UNLOCK__WIDGET = {
        id: 'output:widget:unlock',
        category: OUTPUT_CATEGORY,
        iconClass: 'fa fa-lock'
    };
    OutputCommands.CLEAR__QUICK_PICK = {
        id: 'output:pick-clear',
        label: 'Clear Output Channel...',
        category: OUTPUT_CATEGORY
    };
    OutputCommands.SHOW__QUICK_PICK = {
        id: 'output:pick-show',
        label: 'Show Output Channel...',
        category: OUTPUT_CATEGORY
    };
    OutputCommands.HIDE__QUICK_PICK = {
        id: 'output:pick-hide',
        label: 'Hide Output Channel...',
        category: OUTPUT_CATEGORY
    };
    OutputCommands.DISPOSE__QUICK_PICK = {
        id: 'output:pick-dispose',
        label: 'Close Output Channel...',
        category: OUTPUT_CATEGORY
    };
    OutputCommands.COPY_ALL = {
        id: 'output:copy-all',
    };
})(OutputCommands = exports.OutputCommands || (exports.OutputCommands = {}));
//# sourceMappingURL=output-commands.js.map