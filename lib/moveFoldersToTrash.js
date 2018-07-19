const trash = require('trash');

const moveFoldersToTrash = folders => {
  trash(folders.map(folder => folder.path)).then(() => {
    console.log('done');
  })
}

module.exports = moveFoldersToTrash;
