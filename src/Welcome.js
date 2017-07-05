import React from 'react';
class Welcome extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            date: new Date()
        }

        //setState的函数式赋值方式所使用的函数，函数返回要复制state对象
        function setDate(state, props){
            return {date: new Date};
        }

        setInterval(()=>{
            //setState直接赋值的方式
            // this.setState({date: new Date});
            
            //函数式赋值方式
            this.setState(setDate);
        }, 1000);
    }
    render() {
        return (
            <div>
                <h1> Hello, component! </h1>
                <h2> {this.state.date.toString()} </h2>
            </div>
        );
    }
}

//用函数形式实现
// function Welcome(props){
    
//     return <h1>Hello,{props.name}</h1>;
// }

export default Welcome // 为什么要 export，为什么要加 default