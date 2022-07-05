import * as React from 'react'

import { dark } from './constants'
import { gettingStartedDescription, welcomeHeading } from './uiString'
import { GettingStartedHeaderContainer, HeadingDescription, WelcomeHeading } from './styledComponent'

interface GettingStartedHeaderProps {
    currentTheme: string
}

class GettingStartedHeader extends React.Component<GettingStartedHeaderProps> {
    render(): React.ReactNode {
        const { currentTheme } = this.props
        return (
            <GettingStartedHeaderContainer>
                <WelcomeHeading isDarkTheme={currentTheme === dark}>{welcomeHeading}</WelcomeHeading>
                <HeadingDescription isDarkTheme={currentTheme === dark}>{gettingStartedDescription}</HeadingDescription>
            </GettingStartedHeaderContainer>
        )
    }
}

export default GettingStartedHeader 
