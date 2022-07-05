import * as React from 'react'

import URI from '@theia/core/lib/common/uri';

import { dark } from './constants';
import { open, openWorkspace, recentWorkspaces } from './uiString'
import { IDEButton, ReactWorkspaceButtonsContainer, ReactWorkspaceName, ReactWorkspacePath, RecentWorkspaceText } from './styledComponent'

interface OpenFolderContentProps {
    paths: Array<string>
    recentWorkspaces: Array<string>
    onClickOpenFile: Function
    onClickOpenWorkspace: Function
    onClickRecentWorkspace: Function
    currentTheme: string
}

class OpenFolderContent extends React.Component<OpenFolderContentProps> {

    onClickOpenFile = (): void => {
        const { onClickOpenFile } = this.props
        onClickOpenFile()
    }

    onClickOpenWorkspace = (): void => {
        const { onClickOpenWorkspace } = this.props
        onClickOpenWorkspace()
    }

    renderRecentWorkspaces = (): React.ReactNode => {
        const { paths, recentWorkspaces, onClickRecentWorkspace, currentTheme } = this.props

        return paths.map((eachWorkspace, index) => {
            const pathURI = new URI(recentWorkspaces[index])

            return (
                <IDEButton isPath={true} key={eachWorkspace} onClick={() => { onClickRecentWorkspace(pathURI) }} isDarkTheme={currentTheme === dark}>
                    <ReactWorkspaceName>{pathURI.path.base}
                        <ReactWorkspacePath>{eachWorkspace}</ReactWorkspacePath>
                    </ReactWorkspaceName>
                </IDEButton >)
        })
    }

    render(): React.ReactNode {
        const { currentTheme } = this.props
        return (
            <>
                <IDEButton onClick={this.onClickOpenFile} isDarkTheme={currentTheme === dark}>{open}</IDEButton >
                <IDEButton onClick={this.onClickOpenWorkspace} isDarkTheme={currentTheme === dark}>{openWorkspace}</IDEButton >
                <RecentWorkspaceText isDarkTheme={currentTheme === dark}>{recentWorkspaces}</RecentWorkspaceText >
                <ReactWorkspaceButtonsContainer>
                    {this.renderRecentWorkspaces()}
                </ReactWorkspaceButtonsContainer>
            </>
        )
    }
}

export default OpenFolderContent
