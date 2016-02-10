const sourceFolderContext = require.context('../test', true, /\.test/);

sourceFolderContext.keys().forEach(sourceFolderContext);