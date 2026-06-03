import config from './config'
import {generateUniqueId} from './utils'
import {getCache,addCache,clearCache} from './cache'
export const originalOpen = XMLHttpRequest.prototype.open;
export const originalSend = XMLHttpRequest.prototype.send;
export const originalProto= XMLHttpRequest.prototype;
export function isSupportSendBeacon(){
    return 'sendBeacon' in navigator;
}
/**
 * 上报数据函数
 * @param {Object} data - 需要上报的数据对象
 */
export function report(data) {
    // 检查是否配置了上传URL
    if(!config.url){
        console.log('请配置上传url')
    }
    // 构建上报数据对象，包含唯一ID和传入的数据
    const reportData=JSON.stringify({
        id:generateUniqueId(), // 生成唯一标识ID
        data, // 上报的数据内容
    })
    // 判断是否以图片形式上传
    if(config.isImageUpload){ //是否以图片形式上传
        uploadImage(reportData) // 以图片形式上传数据
    }else{
        // 检查浏览器是否支持sendBeacon API
        if(window.navigator.sendBeacon){
            beaconRequest(reportData) // 使用sendBeacon方式发送数据
        }else{
            xhrRequest(config.url,reportData) // 使用XMLHttpRequest方式发送数据
        }
    }

}
export const lazyReportBatch = (data) => {
    addCache(data)
    const dataCache=getCache()
    if (dataCache.length&&dataCache.length >= config.batchSize) {
        report(dataCache)
       clearCache()
    }
}
export function uploadImage(data){
    const img=new Image()
    img.src=`${config.url}?data=${encodeURIComponent(JSON.stringify(data))}`
}
/**
 * 发送POST请求的函数
 * @param {string} url - 请求的目标URL地址
 * @param {string} data - 要发送的JSON格式数据
 */
export function  xhrRequest(url,data){
    if(window.requestIdleCallback){
        window.requestIdleCallback(()=>{
            const xhr = new XMLHttpRequest();
           originalOpen.call(xhr, 'post', config.url);
            originalSend.call(xhr, JSON.stringify(data));
        },{timeout: 3000})
    }else{
        setTimeout(() => {
            const xhr = new XMLHttpRequest();
            originalOpen.call(xhr, 'post', url);
            originalSend.call(xhr, JSON.stringify(data));
        });
    }
}
/**
 * 使用浏览器空闲时间发送beacon请求的函数
 * @param {Object} data - 需要通过beacon发送的数据对象
 */
export function beaconRequest(data){
    // 检查浏览器是否支持requestIdleCallback API
    if(window.requestIdleCallback){
        // 如果支持，使用浏览器的空闲时间发送请求
        // 设置超时时间为3000毫秒，确保请求不会无限期延迟
        window.requestIdleCallback(()=>{
            // 使用navigator.sendBeacon方法发送数据
            // 将数据对象转换为JSON字符串后发送
            window.navigator.sendBeacon(config.url, JSON.stringify(data))
        },{timeout: 3000})
    }else{
        // 如果不支持requestIdleCallback，则使用setTimeout作为备选方案
        setTimeout(() => {
            // 同样使用navigator.sendBeacon方法发送数据
            window.navigator.sendBeacon(config.url, JSON.stringify(data))
        });
    }
}