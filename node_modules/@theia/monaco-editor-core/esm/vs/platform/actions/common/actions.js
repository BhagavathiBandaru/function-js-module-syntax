/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { Action } from '../../../base/common/actions';
import { createSyncDescriptor } from '../../instantiation/common/descriptors';
import { createDecorator } from '../../instantiation/common/instantiation';
import { KeybindingsRegistry } from '../../keybinding/common/keybindingsRegistry';
import { ContextKeyExpr, IContextKeyService } from '../../contextkey/common/contextkey';
import { ICommandService, CommandsRegistry } from '../../commands/common/commands';
import { DisposableStore } from '../../../base/common/lifecycle';
import { Emitter } from '../../../base/common/event';
export function isIMenuItem(item) {
    return item.command !== undefined;
}
export function isISubmenuItem(item) {
    return item.submenu !== undefined;
}
export var IMenuService = createDecorator('menuService');
export var MenuRegistry = new /** @class */ (function () {
    function class_1() {
        this._commands = new Map();
        this._menuItems = new Map();
        this._onDidChangeMenu = new Emitter();
        this.onDidChangeMenu = this._onDidChangeMenu.event;
    }
    class_1.prototype.addCommand = function (command) {
        var _this = this;
        this._commands.set(command.id, command);
        this._onDidChangeMenu.fire(0 /* CommandPalette */);
        return {
            dispose: function () {
                if (_this._commands.delete(command.id)) {
                    _this._onDidChangeMenu.fire(0 /* CommandPalette */);
                }
            }
        };
    };
    class_1.prototype.getCommand = function (id) {
        return this._commands.get(id);
    };
    class_1.prototype.getCommands = function () {
        var map = new Map();
        this._commands.forEach(function (value, key) { return map.set(key, value); });
        return map;
    };
    class_1.prototype.appendMenuItem = function (id, item) {
        var _this = this;
        var array = this._menuItems.get(id);
        if (!array) {
            array = [item];
            this._menuItems.set(id, array);
        }
        else {
            array.push(item);
        }
        this._onDidChangeMenu.fire(id);
        return {
            dispose: function () {
                var idx = array.indexOf(item);
                if (idx >= 0) {
                    array.splice(idx, 1);
                    _this._onDidChangeMenu.fire(id);
                }
            }
        };
    };
    class_1.prototype.getMenuItems = function (id) {
        var result = (this._menuItems.get(id) || []).slice(0);
        if (id === 0 /* CommandPalette */) {
            // CommandPalette is special because it shows
            // all commands by default
            this._appendImplicitItems(result);
        }
        return result;
    };
    class_1.prototype._appendImplicitItems = function (result) {
        var set = new Set();
        var temp = result.filter(function (item) { return isIMenuItem(item); });
        for (var _i = 0, temp_1 = temp; _i < temp_1.length; _i++) {
            var _a = temp_1[_i], command = _a.command, alt = _a.alt;
            set.add(command.id);
            if (alt) {
                set.add(alt.id);
            }
        }
        this._commands.forEach(function (command, id) {
            if (!set.has(id)) {
                result.push({ command: command });
            }
        });
    };
    return class_1;
}());
var ExecuteCommandAction = /** @class */ (function (_super) {
    __extends(ExecuteCommandAction, _super);
    function ExecuteCommandAction(id, label, _commandService) {
        var _this = _super.call(this, id, label) || this;
        _this._commandService = _commandService;
        return _this;
    }
    ExecuteCommandAction.prototype.run = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = this._commandService).executeCommand.apply(_a, __spreadArrays([this.id], args));
    };
    ExecuteCommandAction = __decorate([
        __param(2, ICommandService)
    ], ExecuteCommandAction);
    return ExecuteCommandAction;
}(Action));
export { ExecuteCommandAction };
var SubmenuItemAction = /** @class */ (function (_super) {
    __extends(SubmenuItemAction, _super);
    function SubmenuItemAction(item) {
        var _this = this;
        typeof item.title === 'string' ? _this = _super.call(this, '', item.title, 'submenu') || this : _this = _super.call(this, '', item.title.value, 'submenu') || this;
        _this.item = item;
        return _this;
    }
    return SubmenuItemAction;
}(Action));
export { SubmenuItemAction };
var MenuItemAction = /** @class */ (function (_super) {
    __extends(MenuItemAction, _super);
    function MenuItemAction(item, alt, options, contextKeyService, commandService) {
        var _this = this;
        typeof item.title === 'string' ? _this = _super.call(this, item.id, item.title, commandService) || this : _this = _super.call(this, item.id, item.title.value, commandService) || this;
        _this._cssClass = undefined;
        _this._enabled = !item.precondition || contextKeyService.contextMatchesRules(item.precondition);
        _this._checked = Boolean(item.toggled && contextKeyService.contextMatchesRules(item.toggled));
        _this._options = options || {};
        _this.item = item;
        _this.alt = alt ? new MenuItemAction(alt, undefined, _this._options, contextKeyService, commandService) : undefined;
        return _this;
    }
    MenuItemAction.prototype.dispose = function () {
        if (this.alt) {
            this.alt.dispose();
        }
        _super.prototype.dispose.call(this);
    };
    MenuItemAction.prototype.run = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var runArgs = [];
        if (this._options.arg) {
            runArgs = __spreadArrays(runArgs, [this._options.arg]);
        }
        if (this._options.shouldForwardArgs) {
            runArgs = __spreadArrays(runArgs, args);
        }
        return _super.prototype.run.apply(this, runArgs);
    };
    MenuItemAction = __decorate([
        __param(3, IContextKeyService),
        __param(4, ICommandService)
    ], MenuItemAction);
    return MenuItemAction;
}(ExecuteCommandAction));
export { MenuItemAction };
var SyncActionDescriptor = /** @class */ (function () {
    function SyncActionDescriptor(ctor, id, label, keybindings, keybindingContext, keybindingWeight) {
        this._id = id;
        this._label = label;
        this._keybindings = keybindings;
        this._keybindingContext = keybindingContext;
        this._keybindingWeight = keybindingWeight;
        this._descriptor = createSyncDescriptor(ctor, this._id, this._label);
    }
    SyncActionDescriptor.create = function (ctor, id, label, keybindings, keybindingContext, keybindingWeight) {
        return new SyncActionDescriptor(ctor, id, label, keybindings, keybindingContext, keybindingWeight);
    };
    Object.defineProperty(SyncActionDescriptor.prototype, "syncDescriptor", {
        get: function () {
            return this._descriptor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SyncActionDescriptor.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SyncActionDescriptor.prototype, "label", {
        get: function () {
            return this._label;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SyncActionDescriptor.prototype, "keybindings", {
        get: function () {
            return this._keybindings;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SyncActionDescriptor.prototype, "keybindingContext", {
        get: function () {
            return this._keybindingContext;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SyncActionDescriptor.prototype, "keybindingWeight", {
        get: function () {
            return this._keybindingWeight;
        },
        enumerable: true,
        configurable: true
    });
    return SyncActionDescriptor;
}());
export { SyncActionDescriptor };
var Action2 = /** @class */ (function () {
    function Action2(desc) {
        this.desc = desc;
    }
    return Action2;
}());
export { Action2 };
export function registerAction2(ctor) {
    var disposables = new DisposableStore();
    var action = new ctor();
    // command
    disposables.add(CommandsRegistry.registerCommand({
        id: action.desc.id,
        handler: function (accessor) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return action.run.apply(action, __spreadArrays([accessor], args));
        },
        description: action.desc.description,
    }));
    // menu
    if (Array.isArray(action.desc.menu)) {
        for (var _i = 0, _a = action.desc.menu; _i < _a.length; _i++) {
            var item = _a[_i];
            disposables.add(MenuRegistry.appendMenuItem(item.id, __assign({ command: action.desc }, item)));
        }
    }
    else if (action.desc.menu) {
        disposables.add(MenuRegistry.appendMenuItem(action.desc.menu.id, __assign({ command: action.desc }, action.desc.menu)));
    }
    if (action.desc.f1) {
        disposables.add(MenuRegistry.appendMenuItem(0 /* CommandPalette */, __assign({ command: action.desc }, action.desc)));
    }
    // keybinding
    if (Array.isArray(action.desc.keybinding)) {
        for (var _b = 0, _c = action.desc.keybinding; _b < _c.length; _b++) {
            var item = _c[_b];
            KeybindingsRegistry.registerKeybindingRule(__assign(__assign({}, item), { id: action.desc.id, when: ContextKeyExpr.and(action.desc.precondition, item.when) }));
        }
    }
    else if (action.desc.keybinding) {
        KeybindingsRegistry.registerKeybindingRule(__assign(__assign({}, action.desc.keybinding), { id: action.desc.id, when: ContextKeyExpr.and(action.desc.precondition, action.desc.keybinding.when) }));
    }
    return disposables;
}
//#endregion
