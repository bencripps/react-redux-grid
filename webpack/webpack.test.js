const sourceFolderContext = require.context('../test', true, /\.js/);

sourceFolderContext.keys().forEach(sourceFolderContext);

module.exports = context;