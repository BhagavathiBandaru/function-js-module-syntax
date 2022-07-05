import * as React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import FolderIcon from '../icons/folderIcon'
import SettingsIcon from '../icons/settingsIcon'

import { sideTabsListType } from './types'
import { sideTabsObject, sideTabsList, dark } from './constants'
import { ActiveVerticalBar, SideTabsContainer, TabIcon, TabItem, TabLabel } from './styledComponent'

interface SideTabsProps {
    onSelectTab: (selectedTab: string) => void
    currentTheme: string
}

@observer
class SideTabs extends React.Component<SideTabsProps>{
    @observable selectedTab!: string

    constructor(props: SideTabsProps) {
        super(props)
        this.selectedTab = sideTabsObject.open
    }

    onSelectTab = (selectedTab: string): void => {
        const { onSelectTab } = this.props
        this.selectedTab = selectedTab
        onSelectTab(this.selectedTab)
    }

    getIcon = (value: string): React.ReactNode => {
        switch (value) {
            case sideTabsObject.open:
                return <FolderIcon color={this.selectedTab === sideTabsObject.open ? '#F8FAFC' : '#94A3B8'} />
            case sideTabsObject.settings:
                return <SettingsIcon color={this.selectedTab === sideTabsObject.settings ? '#F8FAFC' : '#94A3B8'} />
            default:
                return
        }
    }

    renderTabs = (): React.ReactNode => {
        const { currentTheme } = this.props

        return sideTabsList.map((eachTab: sideTabsListType) => {
            return (
                <TabItem onClick={() => this.onSelectTab(eachTab.value)} isActive={this.selectedTab === eachTab.value} key={eachTab.value} isDarkTheme={currentTheme === dark}>
                    <ActiveVerticalBar isActive={this.selectedTab === eachTab.value}></ActiveVerticalBar>
                    <TabIcon>{this.getIcon(eachTab.value)}</TabIcon>
                    <TabLabel isActive={this.selectedTab === eachTab.value} isDarkTheme={currentTheme.toLowerCase().includes(dark)}>{eachTab.label}</TabLabel>
                </TabItem>
            )
        })
    }

    render(): React.ReactNode {
        const { currentTheme } = this.props
        return (
            <SideTabsContainer isDarkTheme={currentTheme === dark}>
                {this.renderTabs()}
            </SideTabsContainer>
        )
    }
}

export default SideTabs 
