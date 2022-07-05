import * as React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import { Event } from '@theia/core';
import { ThemeChangeEvent } from '@theia/core/lib/browser/theming'

import SideTabs from './sideTabs'
import SettingsContent from './settingsContent'
import { dark, sideTabsObject } from './constants'
import OpenFolderContent from './OpenFolderContent'
import GettingStartedHeader from './gettingStartedHeader'
import { GettingStartedContainer, TabContentContainer, SideTabsAndContentContainer } from './styledComponent'

interface GettingStartedUIProps {
    paths: Array<string>
    recentWorkspaces: Array<string>
    onClickOpenFile: Function
    onClickOpenWorkspace: Function
    onClickRecentWorkspace: Function
    doOpenPreferences: Function
    doOpenKeyboardShortcuts: Function
    onThemeChange: Event<ThemeChangeEvent>
    getCurrentTheme: Function
}

@observer
class GettingStartedUI extends React.Component<GettingStartedUIProps>{
    @observable selectedTab: string
    @observable currentTheme: string

    constructor(props: GettingStartedUIProps) {
        super(props)
        this.selectedTab = sideTabsObject.open
        this.currentTheme = props.getCurrentTheme().type
    }

    componentDidMount() {
        const { onThemeChange, getCurrentTheme } = this.props
        onThemeChange((): void => {
            this.currentTheme = getCurrentTheme().type
        })
    }

    onSelectTab = (selectedTab: string): void => {
        this.selectedTab = selectedTab
    }

    renderTabContent = (): React.ReactNode => {
        const { paths, recentWorkspaces, onClickOpenFile, onClickOpenWorkspace, onClickRecentWorkspace, doOpenPreferences, doOpenKeyboardShortcuts } = this.props
        switch (this.selectedTab) {
            case sideTabsObject.open:
                return <OpenFolderContent recentWorkspaces={recentWorkspaces} paths={paths} onClickOpenFile={onClickOpenFile} onClickOpenWorkspace={onClickOpenWorkspace}
                    onClickRecentWorkspace={onClickRecentWorkspace} currentTheme={this.currentTheme} />
            case sideTabsObject.settings:
                return <SettingsContent doOpenPreferences={doOpenPreferences} doOpenKeyboardShortcuts={doOpenKeyboardShortcuts} currentTheme={this.currentTheme} />
            default:
                return
        }
    }

    render(): React.ReactNode {
        return (
            <GettingStartedContainer isDarkTheme={this.currentTheme === dark}>
                <GettingStartedHeader currentTheme={this.currentTheme} />
                <SideTabsAndContentContainer>
                    <SideTabs onSelectTab={this.onSelectTab} currentTheme={this.currentTheme} />
                    <TabContentContainer>
                        {this.renderTabContent()}
                    </TabContentContainer>
                </SideTabsAndContentContainer>
            </GettingStartedContainer>
        )
    }
}

export { GettingStartedUI }
