import * as React from 'react';
import { injectable, inject } from 'inversify';

import { ThemeService, Theme } from '@theia/core/lib/browser/theming';
import { GettingStartedWidget } from '@theia/getting-started/lib/browser/getting-started-widget';

import { GettingStartedUI } from './gettingStartedUI';

@injectable()
export class CustomGettingStartedWidget extends GettingStartedWidget {

    @inject(ThemeService)
    protected readonly themeService!: ThemeService;

    getCurrentTheme = (): Theme => {
        return this.themeService.getCurrentTheme()
    }

    protected render(): React.ReactNode {
        const paths = this.buildPaths(this.recentWorkspaces);
        return (
            <GettingStartedUI recentWorkspaces={this.recentWorkspaces} paths={paths} onClickOpenFile={this.doOpen}
                onClickOpenWorkspace={this.doOpenWorkspace} onClickRecentWorkspace={this.open} doOpenPreferences={this.doOpenPreferences}
                doOpenKeyboardShortcuts={this.doOpenKeyboardShortcuts} onThemeChange={this.themeService.onThemeChange} getCurrentTheme={this.getCurrentTheme}
            />
        );
    }
}
