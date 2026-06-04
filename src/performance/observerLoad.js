import { lazyReportBatch } from '../report';
export default function observerLoad() {
    window.addEventListener('pageShow', (event) => {
        requsestAnimationFrame(() => {
          ['load'].forEach((type) => {
            const reportData = {
                type: 'performance',
                    subType: type,
                    pageUrl: window.location.href,
                    startTime: performance.now()- event.timeStamp
            };
            lazyReportBatch(reportData);
        })  
        },true) 
    })
}