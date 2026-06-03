export const config = {
    url: 'https://api.github.com/users',
    projectName:'eyeSDK',
    appId:'123123',
    userId:'123123',
    isImageUpload: false,
    batchSize: 100,
}
export const setConfig = (config) => {
    Object.assign(this.config, config)
}