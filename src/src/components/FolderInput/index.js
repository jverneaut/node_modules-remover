import React from 'react';

const { ipcRenderer } = window.require('electron');

const folderHandler = () => {
  const folderPath = document.getElementsByTagName('input')[0].files[0].path;
  ipcRenderer.send('selectFolder', { folderPath, depth: 5 });
};

const FolderInput = () => (
  <input type="file" webkitdirectory="true" onChange={folderHandler} style={{ display: 'none' }} />
);

export default FolderInput;
