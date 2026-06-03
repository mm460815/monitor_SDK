export const config = {
    url: 'https://api.github.com/users',
    projectName:'eyeSDK',
    appId:'123123',
    userId:'123123',
    isImageUpload: false,
    batchSize: 100,
}
export  function setConfig(config){
    for (const key in config) {
        if (options[key]) {
            config[key] = options[key];
        }
    }
}