
function MyUtil(){
    //深拷贝方法
    function deepCopy(obj){
        return JSON.parse(JSON.stringify(obj))
    }

    //生成范围是min到max的随机整数
    function getRandom(min, max) {
        var maxNum = 0,
            minNum = 0;
        if (max > min) {
            maxNum = max;
            minNum = min;
        } else {
            maxNum = min;
            minNum = max;
        }

        var result = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
        return result;
    }

    return {
        deepCopy: deepCopy,
        getRandom: getRandom
    }
}

var MyUtils = MyUtil()

export default MyUtils
