export function generateUniqueId(){ //获取随机id
    return 'id-'+Date.now()+'-'+Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 9);
}

export function deepClone(obj){ //深拷贝
    if(obj===null||typeof obj!=='object') return obj;
    if(obj instanceof Date) return new Date(obj);
    if(obj instanceof RegExp) return new RegExp(obj);
    let cloneObj=new obj.constructor();
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            cloneObj[key]=deepClone(obj[key]);
        }else{
            cloneObj[key]=obj[key];
        }
        
    }
    return cloneObj;
}