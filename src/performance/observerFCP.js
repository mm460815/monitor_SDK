import { lazyReportBatch } from '../report';
export default function observerFCP() { // FCP
    const entryHandler=(list)=>{
        for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
                console.log('FCP', entry.startTime)
                observer.disconnect() // 停止观察
                const json=entry.toJSON()
                console.log(json)
                const reportData={
                    ...json,
                    type:'performance',
                    subType:entry.name,
                    pageUrl:window.location.href,
                }
                lazyReportBatch(reportData)
            }
        }
    }
    const observer=new PerformanceObserver(entryHandler)
    observer.observe({entryTypes:['paint'], buffer:true})
}