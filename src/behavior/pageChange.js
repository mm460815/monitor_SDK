import {generateUniqueId} from '../utils'
import {lazyReportBatch} from '../report'
export default function pageChange() {
    let oldRouter=''
    window.addEventListener('hashchange',(event)=>{ //监听hash变化
        const newRouter = event.newURL
        const reportData={
            uuid:generateUniqueId(),
            type:'behavior',
            subType:'hashchange',
            form:oldRouter,
            to:newRouter,
            startTime:performance.now()
        }
        lazyReportBatch(reportData)
        oldRouter=newRouter
    },true)

    let from="";
    window.addEventListener('popstate',(event)=>{  //监听浏览器的前进后退
        const to=window.location.href
        const reportData={
            uuid:generateUniqueId(),
            type:'behavior',
            subType:'popstate',
            form:from,
            to:to,
            startTime:performance.now()
        }
        lazyReportBatch(reportData)
        from=to
    },true)
}