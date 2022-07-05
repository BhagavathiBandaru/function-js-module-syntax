"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var theming_1 = require("@theia/core/lib/browser/theming");
var dark = require('../../src/browser/style/variables-dark.useable.css');
var light = require('../../src/browser/style/variables-light.useable.css');
function updateTheme() {
    var theme = theming_1.ThemeService.get().getCurrentTheme().id;
    if (theme === 'dark') {
        light.unuse();
        dark.use();
    }
    else if (theme === 'light') {
        dark.unuse();
        light.use();
    }
}
updateTheme();
theming_1.ThemeService.get().onThemeChange(function () { return updateTheme(); });
//# sourceMappingURL=branding.js.map