import React from 'react';
class Welcome extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            date: new Date(),
            test: '1'
        }

        console.log('我已在constructor里将 props 和 state 初始化好了');

    }

    tick(){
        this.setState({
            date: new Date()
        });
    }

    componentWillMount(){
        console.log('运行到这里，说明马上要render了');
    }

    render() {
        console.log('这里是render');
        return (
            <div>
                <h1> Hello, component! </h1>
                <h2> {this.state.date.toString()} </h2>
            </div>
        );
    }

    //组件mount时启动定时器
    componentDidMount() {
        console.log('已经挂载到页面了');
        //保存定时器的timerID到this
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillReceiveProps(){
       
    }

    shouldComponentUpdate() {
        return true;
    }

    componentWillUpdate() {
        
    }

    componentDidUpdate() {
        
    }

    //组件unMount时停止定时器
    componentWillUnmount() {
        console.log('马上要消失了');
        clearInterval(this.timerID);
    }

    

    
}

//用函数形式实现
// function Welcome(props){
    
//     return <h1>Hello,{props.name}</h1>;
// }

export default Welcome // 为什么要 export，为什么要加 default