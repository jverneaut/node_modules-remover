const trash = require('trash');

const moveFoldersToTrash = async (folders) => {
  try {
    await trash(folders.map(folder => folder.path));
  } catch (err) {
    return err;
  }
  return;
}

module.exports = moveFoldersToTrash;
