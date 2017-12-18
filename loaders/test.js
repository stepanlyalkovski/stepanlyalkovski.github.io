module.exports = function(source) {
    let jsonObject = typeof source === "string" ? JSON.parse(source) : source;
    removeKeyProperties(jsonObject);
    return JSON.stringify(jsonObject);


    function removeKeyProperties(obj, isParentObject = true) {
        for(let key of Object.getOwnPropertyNames(obj)) {
            if (isParentObject && !isNaN(key)) {
                delete obj[key];
            } else if(obj[key] instanceof Object) {
                    // remove number property if it is not array
                    removeKeyProperties(obj[key], !Array.isArray(obj[key]))
            }
        }
    }
};

