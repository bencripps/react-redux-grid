const sourceFolderContext = require.context('../test', true, /.test\.js$/);

sourceFolderContext.keys().forEach(sourceFolderContext);