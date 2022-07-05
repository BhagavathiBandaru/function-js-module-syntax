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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.MonacoKeybindingContribution = void 0;
var inversify_1 = require("inversify");
var monaco_command_1 = require("./monaco-command");
var monaco_command_registry_1 = require("./monaco-command-registry");
var core_1 = require("@theia/core");
var monaco_resolved_keybinding_1 = require("./monaco-resolved-keybinding");
var MonacoKeybindingContribution = /** @class */ (function () {
    function MonacoKeybindingContribution() {
    }
    MonacoKeybindingContribution.prototype.registerKeybindings = function (registry) {
        var e_1, _a;
        var defaultKeybindings = monaco.keybindings.KeybindingsRegistry.getDefaultKeybindings();
        try {
            for (var defaultKeybindings_1 = __values(defaultKeybindings), defaultKeybindings_1_1 = defaultKeybindings_1.next(); !defaultKeybindings_1_1.done; defaultKeybindings_1_1 = defaultKeybindings_1.next()) {
                var item = defaultKeybindings_1_1.value;
                var command = this.commands.validate(item.command);
                if (command) {
                    var when = item.when && item.when.serialize();
                    var keybinding = void 0;
                    if (item.command === monaco_command_1.MonacoCommands.GO_TO_DEFINITION && !core_1.environment.electron.is()) {
                        keybinding = 'ctrlcmd+f11';
                    }
                    else {
                        keybinding = monaco_resolved_keybinding_1.MonacoResolvedKeybinding.toKeybinding(item.keybinding);
                    }
                    registry.registerKeybinding({ command: command, keybinding: keybinding, when: when });
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (defaultKeybindings_1_1 && !defaultKeybindings_1_1.done && (_a = defaultKeybindings_1.return)) _a.call(defaultKeybindings_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    __decorate([
        inversify_1.inject(monaco_command_registry_1.MonacoCommandRegistry),
        __metadata("design:type", monaco_command_registry_1.MonacoCommandRegistry)
    ], MonacoKeybindingContribution.prototype, "commands", void 0);
    MonacoKeybindingContribution = __decorate([
        inversify_1.injectable()
    ], MonacoKeybindingContribution);
    return MonacoKeybindingContribution;
}());
exports.MonacoKeybindingContribution = MonacoKeybindingContribution;
//# sourceMappingURL=monaco-keybinding.js.map