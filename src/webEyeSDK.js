import {setConfig} from './config';
import {lazyReportBatch} from './report';
import error from './error/index';
import behavior from './behavior/index';
import performance from './performance/index';
window._webEyeSDK = {version: '1.0.0'};
export function install(Vue,options) {
  if(_webEyeSDK_.vue) return;
  _webEyeSDK_.vue = true;
  setConfig(options);
  const handler=Vue.config.errorHandler;
  Vue.config.errorHandler = function (err, vm, info) {
    
    const reportData = {
      error: err,
      info: info,
      vm: vm,
      error:err.stack,
      subType:'vue',
      type:'error',
      startTime:window.performance.now(),
      pageUrl:window.location.href,
    }
    lazyReportBatch(reportData);
    handler && handler.call(this, err, vm, info);
  }
}
export function errorBoundary(err,info){
    if(_webEyeSDK_.vue) return;
    _webEyeSDK_.vue = true;
    const reportData = {
      error: err,
      info: info,
      error:err?.stack,
      subType:'react',
      type:'error',
      startTime:window.performance.now(),
      pageUrl:window.location.href,
    }
    lazyReportBatch(reportData);
}
export function init(options) {
  setConfig(options);
}
export default {
  install,
  errorBoundary,
  init,
  error,
  behavior,
  performance,
}