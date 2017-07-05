import React from 'react';
// class Welcome extends React.Component {
//     render() {
//         return <h1> Hello, component! </h1>;
//     }
// }

//用函数形式实现
function Welcome(props){
    
    return <h1>Hello,{props.name}</h1>;
}

export default Welcome // 为什么要 export，为什么要加 default