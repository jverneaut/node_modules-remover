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
    folders: undefined
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

  deleteFolders = () => {
    const foldersToTrash = this.state.folders.filter(folder => folder.delete);
    ipcRenderer.send('trashFolders', { foldersToTrash });
  }

  render() {
    return (
      <AppContainer>
        <TitleBar />
        <FoldersList folders={this.state.folders} onRowClick={this.rowClickHandler} />
        <ButtonsGroup>
          <Button text="Sélectionner un dossier" outline label>
            <FileInput />
          </Button>
          <Button text="Supprimer les dossiers sélectionnés" onClick={this.deleteFolders} />
        </ButtonsGroup>
      </AppContainer>
    )
  }
}

export default App;
