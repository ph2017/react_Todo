import React from 'react';
class Welcome extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            date: new Date()
        }
    }

    tick(){
        this.setState({
            date: new Date()
        });
    }

    //组件mount时启动定时器
    componentDidMount() {
        //保存定时器的timerID到this
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    //组件unMount时停止定时器
    componentWillUnmount() {
        clearInterval(this.timerID);
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