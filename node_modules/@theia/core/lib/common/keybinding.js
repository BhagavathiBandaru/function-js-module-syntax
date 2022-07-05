"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Keybinding = void 0;
var Keybinding;
(function (Keybinding) {
    /**
     * Compares two keybindings for equality.
     * Can optionally ignore the keybinding and/or args property in the comparison.
     * @param a The first Keybinding in the comparison
     * @param b The second Keybinding in the comparison
     * @param ignoreKeybinding Ignore the 'keybinding' property in the comparison
     * @param ignoreArgs Ignore the 'args' property in the comparison
     */
    function equals(a, b, ignoreKeybinding, ignoreArgs) {
        if (ignoreKeybinding === void 0) { ignoreKeybinding = false; }
        if (ignoreArgs === void 0) { ignoreArgs = false; }
        if (a.command === b.command &&
            (a.context || '') === (b.context || '') &&
            (a.when || '') === (b.when || '') &&
            (ignoreKeybinding || a.keybinding === b.keybinding) &&
            (ignoreArgs || (a.args || '') === (b.args || ''))) {
            return true;
        }
        return false;
    }
    Keybinding.equals = equals;
    /**
     * Returns a new object only containing properties which
     * are described on the `Keybinding` API.
     *
     * @param binding the binding to create an API object for.
     */
    function apiObjectify(binding) {
        return {
            command: binding.command,
            keybinding: binding.keybinding,
            context: binding.context,
            when: binding.when,
            args: binding.args
        };
    }
    Keybinding.apiObjectify = apiObjectify;
    /**
     * Returns with the string representation of the binding.
     * Any additional properties which are not described on
     * the `Keybinding` API will be ignored.
     *
     * @param binding the binding to stringify.
     */
    function stringify(binding) {
        return JSON.stringify(apiObjectify(binding));
    }
    Keybinding.stringify = stringify;
    /* Determine whether object is a KeyBinding */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function is(arg) {
        return !!arg && arg === Object(arg) && 'command' in arg && 'keybinding' in arg;
    }
    Keybinding.is = is;
})(Keybinding = exports.Keybinding || (exports.Keybinding = {}));
//# sourceMappingURL=keybinding.js.map