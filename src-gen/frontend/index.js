// @ts-check
require('es6-promise/auto');
require('reflect-metadata');
const { Container } = require('inversify');
const { FrontendApplicationConfigProvider } = require('@theia/core/lib/browser/frontend-application-config-provider');
FrontendApplicationConfigProvider.set({
    "applicationName": "CCBP IDE",
    "defaultTheme": "dark",
    "defaultIconTheme": "none",
    "preferences": {
        "files.enableTrash": true,
        "editor.fontLigatures": true,
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": true,
        "editor.detectIndentation": true,
        "editor.fontFamily": "'JetBrains Mono', 'Consolas', 'Courier New', monospace",
        "terminal.integrated.fontFamily": "'JetBrains Mono', 'Droid Sans Mono', 'monospace', monospace, 'Droid Sans Fallback'",
        "editor.rulers": [
            80
        ],
        "editor.snippetSuggestions": "top",
        "editor.wordBasedSuggestions": false,
        "editor.suggest.localityBonus": true,
        "editor.acceptSuggestionOnCommitCharacter": false,
        "[javascript]": {
            "editor.defaultFormatter": "esbenp.prettier-vscode",
            "editor.suggestSelection": "recentlyUsed",
            "editor.suggest.showKeywords": false
        },
        "editor.renderWhitespace": "boundary",
        "files.exclude": {
            "USE_GITIGNORE": true,
            "**/.git": true,
            "**/.svn": true,
            "**/.hg": true,
            "**/CVS": true,
            "**/.DS_Store": true,
            "**/.results": true,
            "**/.tests": true
        },
        "javascript.validate.enable": false,
        "eslint.validate": [
            "javascript",
            "javascriptreact",
            "typescript",
            "typescriptreact"
        ],
        "workbench.colorTheme": "Default Dark+",
        "workbench.iconTheme": "material-icon-theme",
        "npm.runSilent": true,
        "editor.formatOnPaste": false,
        "editor.cursorSmoothCaretAnimation": true,
        "editor.smoothScrolling": true,
        "files.associations": {
            "*.json": "jsonc",
            ".eslintrc": "jsonc"
        },
        "eslint.alwaysShowStatus": true
    },
    "python.jediEnabled": true,
    "python.linting.enabled": true,
    "python.linting.pylintEnabled": true
});
const { FrontendApplication } = require('@theia/core/lib/browser');
const { frontendApplicationModule } = require('@theia/core/lib/browser/frontend-application-module');
const { messagingFrontendModule } = require('@theia/core/lib/browser/messaging/messaging-frontend-module');
const { loggerFrontendModule } = require('@theia/core/lib/browser/logger-frontend-module');
const { ThemeService } = require('@theia/core/lib/browser/theming');

const container = new Container();
container.load(frontendApplicationModule);
container.load(messagingFrontendModule);
container.load(loggerFrontendModule);

function load(raw) {
    return Promise.resolve(raw.default).then(module =>
        container.load(module)
    )
}

function start() {
    (window['theia'] = window['theia'] || {}).container = container;

    const themeService = ThemeService.get();
    themeService.loadUserTheme();

    const application = container.get(FrontendApplication);
    return application.start();
}

module.exports = Promise.resolve()
    .then(function () { return Promise.resolve(require('@theia/core/lib/browser/menu/browser-menu-module')).then(load) })
    .then(function () { return Promise.resolve(require('@theia/core/lib/browser/window/browser-window-module')).then(load) })
    .then(function () { return Promise.resolve(require('@theia/core/lib/browser/keyboard/browser-keyboard-module')).then(load) })
    .then(function () { return Promise.resolve(require('@theia/variable-resolver/lib/browser/variable-resolver-frontend-module')).then(load) })
    .then(function () { return Promise.resolve(require('@theia/editor/lib/browser/editor-frontend-module')).then(load) })
    .then(function () { return Promise.resolve(require('@theia/filesystem/lib/browser/filesystem-frontend-module')).then(load) })
    .then(function () { return Promise.resolve(require('@theia/filesystem/lib/browser/download/file-download-frontend-module')).then(load) })
    .then(function () { return Promise.resolve(require('@theia/filesystem/lib/browser/file-dialog/file-dialog-module')).then(load) })
    .then(function () { return Promise.resolve(require('@theia/workspace/lib/browser/workspace-frontend-module')).then(load) })
    .then(function () { return Promise.resolve(require('@theia/navigator/lib/browser/navigator-frontend-module')).then(load) })
    .then(function () { return Promise.resolve(require('@theia/markers/lib/browser/problem/problem-frontend-module')).then(load) })
    .then(function () { return Promise.resolve(require('@theia/outline-view/lib/browser/outline-view-frontend-module')).then(load) })
    .then(function () { return Promise.resolve(require('@theia/monaco/lib/browser/monaco-browser-module')).then(load) })
    .then(function () { return Promise.resolve(require('@theia/callhierarchy/lib/browser/callhierarchy-frontend-module')).then(load) })
    .then(function () { return Promise.resolve(require('@theia/editor-preview/lib/browser/editor-preview-frontend-module')).then(load) })
    .then(function () { return Promise.resolve(require('@theia/process/lib/common/process-common-module')).then(load) })
    .then(function () { return Promise.resolve(require('@theia/file-search/lib/browser/file-search-frontend-module')).then(load) })
    .then(function () { return Promise.resolve(require('@theia/userstorage/lib/browser/user-storage-frontend-module')).then(load) })
    .then(function () { return Promise.resolve(require('@theia/keymaps/lib/browser/keymaps-frontend-module')).then(load) })
    .then(function () { return Promise.resolve(require('@theia/getting-started/lib/browser/getting-started-frontend-module')).then(load) })
    .then(function () { return Promise.resolve(require('@theia/scm/lib/browser/scm-frontend-module')).then(load) })
    .then(function () { return Promise.resolve(require('@theia/scm-extra/lib/browser/scm-extra-frontend-module')).then(load) })
    .then(function () { return Promise.resolve(require('@theia/git/lib/browser/git-frontend-module')).then(load) })
    .then(function () { return Promise.resolve(require('@theia/git/lib/browser/prompt/git-prompt-module')).then(load) })
    .then(function () { return Promise.resolve(require('@theia/messages/lib/browser/messages-frontend-module')).then(load) })
    .then(function () { return Promise.resolve(require('@theia/mini-browser/lib/browser/mini-browser-frontend-module')).then(load) })
    .then(function () { return Promise.resolve(require('@theia/mini-browser/lib/browser/environment/mini-browser-environment-module')).then(load) })
    .then(function () { return Promise.resolve(require('@theia/bulk-edit/lib/browser/bulk-edit-frontend-module')).then(load) })
    .then(function () { return Promise.resolve(require('@theia/console/lib/browser/console-frontend-module')).then(load) })
    .then(function () { return Promise.resolve(require('@theia/output/lib/browser/output-frontend-module')).then(load) })
    .then(function () { return Promise.resolve(require('@theia/preferences/lib/browser/preference-frontend-module')).then(load) })
    .then(function () { return Promise.resolve(require('@theia/terminal/lib/browser/terminal-frontend-module')).then(load) })
    .then(function () { return Promise.resolve(require('@theia/task/lib/browser/task-frontend-module')).then(load) })
    .then(function () { return Promise.resolve(require('@theia/debug/lib/browser/debug-frontend-module')).then(load) })
    .then(function () { return Promise.resolve(require('@theia/search-in-workspace/lib/browser/search-in-workspace-frontend-module')).then(load) })
    .then(function () { return Promise.resolve(require('@theia/timeline/lib/browser/timeline-frontend-module')).then(load) })
    .then(function () { return Promise.resolve(require('@theia/plugin-ext/lib/plugin-ext-frontend-module')).then(load) })
    .then(function () { return Promise.resolve(require('@theia/plugin-ext-vscode/lib/browser/plugin-vscode-frontend-module')).then(load) })
    .then(function () { return Promise.resolve(require('@theia/preview/lib/browser/preview-frontend-module')).then(load) })
    .then(function () { return Promise.resolve(require('@theia/vsx-registry/lib/browser/vsx-registry-frontend-module')).then(load) })
    .then(function () { return Promise.resolve(require('custom-font-families-extension/lib/browser/custom-font-families-extension-frontend-module')).then(load) })
    .then(function () { return Promise.resolve(require('custom-code-snippets-extension/lib/browser/custom-code-snippets-extension-frontend-module')).then(load) })
    .then(function () { return Promise.resolve(require('ccbp-custom-commands-extension/lib/browser/ccbp-custom-commands-extension-frontend-module')).then(load) })
    .then(function () { return Promise.resolve(require('getting-started-widget-extension/lib/browser/getting-started-widget-extension-frontend-module')).then(load) })
    .then(start).catch(reason => {
        console.error('Failed to start the frontend application.');
        if (reason) {
            console.error(reason);
        }
    });