const fs = require('fs');
const path = require('path');

const isFolder = pathName => fs.statSync(pathName).isDirectory();

const isNodeModulesFolder = dir => dir.substr(-13, 13) === '/node_modules';

const getNodeModulesFolders = (startDir, startDepth) => {
  let nodeModulesFolders = [];
  const iterativeFoldersSearch = (dir, depth) => {
    if (depth === 0) { return; }
    let foldersToScan = [];
    let filesInDir = fs.readdirSync(dir);
    filesInDir = filesInDir.map(filePath =>
      path.join(dir, filePath));
    const foldersInDir = filesInDir.filter(filePath => isFolder(filePath));
    nodeModulesFolders = nodeModulesFolders.concat(foldersInDir.filter(dirPath =>
      isNodeModulesFolder(dirPath)));
    foldersToScan = foldersInDir.filter(dirPath => !isNodeModulesFolder(dirPath));
    foldersToScan.forEach(folder => iterativeFoldersSearch(folder, depth - 1));
  };
  iterativeFoldersSearch(startDir, startDepth);
  return nodeModulesFolders;
};

module.exports = getNodeModulesFolders;
