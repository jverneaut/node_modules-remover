import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';

import Button from './Button';
import FileInput from './FolderInput';
import FoldersList from './FoldersList';
import TitleBar from './TitleBar';

const { ipcRenderer } = window.require('electron');

injectGlobal`
  body {
    font-family: system-ui;
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ButtonsGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

class App extends Component {
  state = {
    folders: undefined,
    movingToTrash: false
  }

  componentDidMount() {
    ipcRenderer.on('nodeFoldersFound', (event, foldersPath) => {
      const folders = foldersPath.map(path => ({
        path,
        id: path,
        delete: true,
      }));
      this.setState({ folders });
    });

    ipcRenderer.on('confirm-dialog-selection', (event, index) => {
      if (index === 0) {
        const foldersToTrash = this.state.folders.filter(folder => folder.delete);
        ipcRenderer.send('trashFolders', { foldersToTrash });
      }
    })

    ipcRenderer.on('foldersMovingToTrash', () => {
      this.setState({
        movingToTrash: true
      })
    });

    ipcRenderer.on('foldersMovedToTrash', () => {
      const remainingFolders = this.state.folders.filter(folder => !folder.delete);
      this.setState({
        movingToTrash: false,
        folders: remainingFolders
      })
    });
  }

  rowClickHandler = (folderId) => {
    let { folders } = this.state;
    folders = folders.map((folder) => {
      if (folder.id === folderId) {
        return {
          path: folder.path,
          id: folderId,
          delete: !folder.delete,
        };
      }
      return folder;
    });
    this.setState({ folders });
  };

  confirmToTrash = () => {
    ipcRenderer.send('open-confirm-dialog');
  }

  render() {
    return (
      <AppContainer>
        <TitleBar />
        <FoldersList
          disabled={this.state.movingToTrash}
          folders={this.state.folders}
          onRowClick={this.rowClickHandler}
        />
        <ButtonsGroup>
          <Button text="Sélectionner un dossier" outline>
            <FileInput />
          </Button>
          <Button
            text="Supprimer les dossiers sélectionnés"
            disabled={
              this.state.folders === undefined ? 'true' :
                this.state.folders.filter(folder => folder.delete).length === 0 ? true : false
            }
            onClick={this.confirmToTrash}
          />
        </ButtonsGroup>
      </AppContainer>
    )
  }
}

export default App;
