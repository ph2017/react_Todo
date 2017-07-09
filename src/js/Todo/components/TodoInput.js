import React from 'react';
import '../../../css/todoInput.css'

class TodoInput extends React.Component{
    
    constructor(props){
        super(props);

        //这样也可以解决this的bug，是官方温度计例子的做法
        this.submit = this.submit.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
    }

    submit(e){
        if(e.key === 'Enter'){
            //调用父组件传递进来的处理方法
            this.props.onSubmit(e);
        }
    }

    changeTitle(e){
        this.props.onChange(e);
    }

    render(){
        return (
            <input type="text" value={this.props.content} className="TodoInput"
                onKeyPress={this.submit}
                onChange={this.changeTitle}/>
        ); 
    }
}

export default TodoInput;