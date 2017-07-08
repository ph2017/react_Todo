
function MyUtil(){
    //深拷贝方法
    function deepCopy(obj){
        return JSON.parse(JSON.stringify(obj))
    }

    return {
        deepCopy: deepCopy
    }
}

export default MyUtil
