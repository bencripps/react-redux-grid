const sourceFolderContext = require.context('../test', true, /\.js/);
const componentsContext = require.context('../src/', true, /\.js/);

process.env.NODE_ENV = 'test';

sourceFolderContext.keys().forEach(sourceFolderContext);
componentsContext.keys().forEach(componentsContext);

module.exports = context;
