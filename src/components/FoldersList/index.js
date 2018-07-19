import React from 'react';
import styled from 'styled-components';

const FoldersListContainer = styled.div`
  margin: 0 24px;
  border: 1px solid rgba(0, 0, 0, 0.04);
  background: rgba(0, 0, 0, 0.02);
  overflow-y: scroll;
  flex: 1;
`;

const FolderListItem = styled.div`
  background: ${props => props.pair ? 'white' : 'rgba(0, 0, 0, 0.02)'};
  display: flex;
  align-items: center;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

const FolderPath = styled.div`
  flex: 1;
  white-space: nowrap;
  overflow-x: scroll;
  padding: 0 16px;
  opacity: ${props => props.checked ? '1' : '0.3'};
  transition: 0.3s all;
  user-select: none;
  cursor: default;
`;

const CheckBoxContainer = styled.div`
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.pair ? 'white' : 'rgb(250, 250, 250)'};
  cursor: pointer;
`;

const CheckBox = styled.div`
  display: block;
  content: '';
  width: 16px;
  height: 16px;
  border-radius: 16px;
  border: 1px solid #35CC4B;
  border-width: ${ props => props.checked ? '8px' : '1px'};
  box-sizing: border-box;
  transition: 0.3s all;
`;

const FoldersList = (props) => (
  <FoldersListContainer>
    {props.folders !== undefined && props.folders.map((folder, index) => (
      <FolderListItem pair={index % 2 === 0 ? true : false} key={folder.id} onClick={() => props.onRowClick(folder.id)}>
        <FolderPath checked={folder.delete}>
          {folder.path}
        </FolderPath>
        <CheckBoxContainer pair={index % 2 === 0 ? true : false}>
          <CheckBox checked={folder.delete} />
        </CheckBoxContainer>
      </FolderListItem>
    ))}
  </FoldersListContainer>
);

export default FoldersList;
