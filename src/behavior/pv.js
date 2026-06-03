import {generateUniqueId} from '../utils'
import {lazyReportBatch} from '../report'
export default function pv() {
    const reportData={
        type: 'behavior',
        subType: 'pv',
        startTime: performance.now(),
        pageUrl: window.location.href,
        referror: document.referrer,
        uuid: generateUniqueId(),
    }
    lazyReportBatch(reportData)
}