import React from 'react';

class TodoInput extends React.Component{
    
    constructor(props){
        super(props);

        //这样也可以解决this的bug，是官方温度计例子的做法
        this.submit = this.submit.bind(this);
    }

    submit(e){
        if(e.key === 'Enter'){
            console.log('用户按回车键了');

            console.log(this);
            this.props.onSubmit.call();
        }
    }

    render(){
        return (
            <input type="text" defaultValue={this.props.content} 
                onKeyPress={this.submit}/>
        ); 
    }
}

export default TodoInput;