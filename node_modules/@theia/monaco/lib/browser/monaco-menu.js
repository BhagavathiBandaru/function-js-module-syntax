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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
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
exports.MonacoEditorMenuContribution = exports.MonacoMenus = void 0;
var inversify_1 = require("inversify");
var common_1 = require("@theia/core/lib/common");
var browser_1 = require("@theia/editor/lib/browser");
var monaco_command_registry_1 = require("./monaco-command-registry");
var MenuRegistry = monaco.actions.MenuRegistry;
var MonacoMenus;
(function (MonacoMenus) {
    MonacoMenus.SELECTION = __spread(common_1.MAIN_MENU_BAR, ['3_selection']);
    MonacoMenus.PEEK_CONTEXT_SUBMENU = __spread(browser_1.EDITOR_CONTEXT_MENU, ['navigation', 'peek_submenu']);
})(MonacoMenus = exports.MonacoMenus || (exports.MonacoMenus = {}));
var MonacoEditorMenuContribution = /** @class */ (function () {
    function MonacoEditorMenuContribution(commands) {
        this.commands = commands;
    }
    MonacoEditorMenuContribution.prototype.registerMenus = function (registry) {
        var e_1, _a, e_2, _b;
        try {
            for (var _c = __values(MenuRegistry.getMenuItems(7)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var item = _d.value;
                if (!monaco.actions.isIMenuItem(item)) {
                    continue;
                }
                var commandId = this.commands.validate(item.command.id);
                if (commandId) {
                    var menuPath = __spread(browser_1.EDITOR_CONTEXT_MENU, [(item.group || '')]);
                    registry.registerMenuAction(menuPath, { commandId: commandId });
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.registerPeekSubmenu(registry);
        registry.registerSubmenu(MonacoMenus.SELECTION, 'Selection');
        try {
            for (var _e = __values(MenuRegistry.getMenuItems(25)), _f = _e.next(); !_f.done; _f = _e.next()) {
                var item = _f.value;
                if (!monaco.actions.isIMenuItem(item)) {
                    continue;
                }
                var commandId = this.commands.validate(item.command.id);
                if (commandId) {
                    var menuPath = __spread(MonacoMenus.SELECTION, [(item.group || '')]);
                    var title = typeof item.command.title === 'string' ? item.command.title : item.command.title.value;
                    var label = this.removeMnemonic(title);
                    var order = item.order ? String(item.order) : '';
                    registry.registerMenuAction(menuPath, { commandId: commandId, order: order, label: label });
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    MonacoEditorMenuContribution.prototype.registerPeekSubmenu = function (registry) {
        var e_3, _a;
        registry.registerSubmenu(MonacoMenus.PEEK_CONTEXT_SUBMENU, 'Peek');
        try {
            for (var _b = __values(MenuRegistry.getMenuItems(8)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var item = _c.value;
                if (!monaco.actions.isIMenuItem(item)) {
                    continue;
                }
                var commandId = this.commands.validate(item.command.id);
                if (commandId) {
                    var order = item.order ? String(item.order) : '';
                    registry.registerMenuAction(__spread(MonacoMenus.PEEK_CONTEXT_SUBMENU, [item.group || '']), { commandId: commandId, order: order });
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    MonacoEditorMenuContribution.prototype.removeMnemonic = function (label) {
        return label.replace(/\(&&\w\)|&&/g, '');
    };
    MonacoEditorMenuContribution = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(monaco_command_registry_1.MonacoCommandRegistry)),
        __metadata("design:paramtypes", [monaco_command_registry_1.MonacoCommandRegistry])
    ], MonacoEditorMenuContribution);
    return MonacoEditorMenuContribution;
}());
exports.MonacoEditorMenuContribution = MonacoEditorMenuContribution;
//# sourceMappingURL=monaco-menu.js.map