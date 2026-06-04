export function generateUniqueId(){ //获取随机id
    return 'id-'+Date.now()+'-'+Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 9);
}

export function deepClone(target){ //深拷贝
    if (typeof target === 'object') {
        const result = Array.isArray(target) ? [] : {};
        for (const key in target) {
            if (typeof target[key] == 'object') {
                result[key] = deepClone(target[key]);
            } else {
                result[key] = target[key];
            }
        }

        return result;
    }
    return target
}