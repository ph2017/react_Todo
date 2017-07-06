import React from 'react';

class TodoInput extends React.Component{

    submit(e){
        if(e.key === 'Enter'){
            console.log('用户按回车键了');

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