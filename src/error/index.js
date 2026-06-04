import {lazyReportBatch} from '../report';
export default function error(){
    //资源加载失败
    window.addEventListener('error',function(e){
        const {target} = e;
        if(target.src || target.href){
            console.log('资源加载失败',target.src || target.href)
            const url = target.src || target.href;
            const reportData={
                type:'error',
                subType:'resource',
                url,
                html:target.outerHTML,
                pageUrl:window.location.href,
                paths:e.path,
            }
            lazyReportBatch(reportData)
        }
        
    },true)
    //js运行错误
    window.onerror = function(msg,url,lineNo,columnNo,error){
        console.log('js运行错误',msg,url,lineNo,columnNo,error)
        const reportData={
            type:'error',
            subType:'js',
            msg,
            url,
            lineNo,
            columnNo,
            error:error.stack,
            pageUrl:window.location.href,
            startTime:performance.now(),
        }
        lazyReportBatch(reportData)
        
    }
    //promise错误
    window.addEventListener('unhandledrejection',function(e){
        console.log('promise错误',e)
        const reportData={
            type:'error',
            subType:'promise',
            reason:e.reason?.stack,
            promise:e.promise,
            pageUrl:window.location.href,
            startTime:e.timeStamp,
        }
        lazyReportBatch(reportData)
    },true)
}