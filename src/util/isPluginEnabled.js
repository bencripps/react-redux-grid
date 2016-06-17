export const isPluginEnabled = (plugins = {}, name) => {
    const enabled = plugins
        && plugins[name]
        && plugins[name].enabled;

    return !!enabled;
};