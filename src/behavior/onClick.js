import { lazyReportBatch } from '../report';

export default function onClick() {
    ['mousedown','touchstart'].forEach((eventName) => {
        window.addEventListener(eventName, (e) => {
            const target = e.target;
            if (target && target.tagName) {
                const reportData={
                     type: 'behavior',
                    subType: 'click',
                    target: target.tagName,
                    startTime: e.timeStamp,
                    innerHtml: target.innerHTML,
                    outerHtml: target.outerHTML,
                    with: target.offsetWidth,
                    height: target.offsetHeight,
                    // eventType,
                    path: e.path,
                }
                lazyReportBatch(reportData)
            }
        })
    })
    
}