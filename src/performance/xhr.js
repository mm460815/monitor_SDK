import { lazyReportBatch } from '../report';
export const originalProto = XMLHttpRequest.prototype;
export const originalSend = originalProto.send;
export const originalOpen = originalProto.open;
export function overrideOpenAndSend(){
    originalProto.open = function newOpen(...args) {
        this.url= args[1];
        this.method = args[0];
        originalOpen.apply(this, args);
    };
    originalProto.send = function(...args) {
       this.startTime = Date.now();
       const onLoaded=()=>{
           this.endTime = Date.now();
           const {url, method, startTime, endTime, duration,status}=this;
            const reportData = {
                status,
                duration,
                startTime,
                endTime,
                url,
                method: method.toUpperCase(),
                type: 'performance',
                success: status >= 200 && status < 300,
                subType: 'xhr'
            };
           lazyReportBatch(data);
           this.removeEventListener('loadend', onLoaded,true);
       }
       this.addEventListener('loadend', onLoaded,true);
       originalSend.apply(this, args);
    };
};
export default function xhr() {
    overwriteOpenAndSend();
}