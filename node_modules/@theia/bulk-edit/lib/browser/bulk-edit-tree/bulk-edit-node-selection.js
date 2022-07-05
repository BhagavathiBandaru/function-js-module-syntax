"use strict";
/********************************************************************************
 * Copyright (c) 2021 SAP SE or an SAP affiliate company and others.
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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BulkEditNodeSelection = void 0;
var selection_command_handler_1 = require("@theia/core/lib/common/selection-command-handler");
var BulkEditNodeSelection;
(function (BulkEditNodeSelection) {
    function is(arg) {
        return typeof arg === 'object' && ('bulkEdit' in arg);
    }
    BulkEditNodeSelection.is = is;
    var CommandHandler = /** @class */ (function (_super) {
        __extends(CommandHandler, _super);
        function CommandHandler(selectionService, options) {
            var _this = _super.call(this, selectionService, function (arg) { return BulkEditNodeSelection.is(arg) ? arg : undefined; }, options) || this;
            _this.selectionService = selectionService;
            _this.options = options;
            return _this;
        }
        return CommandHandler;
    }(selection_command_handler_1.SelectionCommandHandler));
    BulkEditNodeSelection.CommandHandler = CommandHandler;
})(BulkEditNodeSelection = exports.BulkEditNodeSelection || (exports.BulkEditNodeSelection = {}));
//# sourceMappingURL=bulk-edit-node-selection.js.map