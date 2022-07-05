import * as React from 'react'

import { dark } from './constants'
import { IDEButton } from './styledComponent'
import { openKeyboardShortcuts, openPreferences } from './uiString'

interface SettingsContentProps {
    doOpenPreferences: Function
    doOpenKeyboardShortcuts: Function
    currentTheme: string
}

class SettingsContent extends React.Component<SettingsContentProps> {

    onClickOpenPreferences = (): void => {
        const { doOpenPreferences } = this.props
        doOpenPreferences()
    }

    onClickOpenKeyboardShortcuts = (): void => {
        const { doOpenKeyboardShortcuts } = this.props
        doOpenKeyboardShortcuts()
    }

    render(): React.ReactNode {
        const { currentTheme } = this.props
        return (
            <>
                <IDEButton isDarkTheme={currentTheme === dark} onClick={this.onClickOpenPreferences}>{openPreferences}</IDEButton>
                <IDEButton isDarkTheme={currentTheme === dark} onClick={this.onClickOpenKeyboardShortcuts}>{openKeyboardShortcuts}</IDEButton>
            </>
        )
    }
}

export default SettingsContent
