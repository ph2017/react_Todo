import React from 'react';

class TodoInput extends React.Component{

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
                onKeyPress={this.submit.bind(this)}/>
        ); 
    }
}

export default TodoInput;