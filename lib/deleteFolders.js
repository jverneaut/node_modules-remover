const rimraf = require('rimraf');

const deleteFolders = folders => {
  folders.forEach(folder => {
    rimraf(folder.path, (err) => {
      if (err) {
        console.log(err);
      }
    });
  })
};

module.exports = deleteFolders;
