const sourceFolderContext = require.context('../test', true, /\.js/);
const componentsContext = require.context('../src/', true, /\.js/);

sourceFolderContext.keys().forEach(sourceFolderContext);
componentsContext.keys().forEach(componentsContext);

module.exports = context;
