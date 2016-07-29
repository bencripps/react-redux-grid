import ReactDOM from 'react-dom';
import {
    provider,
    localConfig,
    remoteConfig
} from './provider.jsx';

const render = () => {
    const localGrid = document.getElementById('local-application-mount')
    if (localGrid !== null) {
        return ReactDOM.render(provider(localConfig), localGrid);
    }

    const remoteGrid = document.getElementById('remote-application-mount')
    if (remoteGrid !== null) {
        return ReactDOM.render(provider(remoteConfig), remoteGrid);
    }

    return ReactDOM.render(<span>Unknown Grid - see entry.js</span>, document.body)
};

document.addEventListener(
    'DOMContentLoaded', render.bind(this, '#application-mount')
);