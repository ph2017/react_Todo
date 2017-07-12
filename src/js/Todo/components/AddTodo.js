import React, {PropTypes} from 'react'
import {FormGroup, FormControl} from 'react-bootstrap'
import MyUtils from '../Util'


export default class AddTodo extends React.Component {
    
    submit(e){
        if(e.key === 'Enter'){
            console.log('Enter')
            let target = e.target
            //调用传递进来的处理方法
            this.props.onSubmit({
                title: target.value, 
                id: MyUtils.getRandom(0, 99999),
                priority: 3
            })
            target.value = ''
        }
    }

    render(){
        return (
            <FormGroup>
                <FormControl type="text" placeholder="Add todo" 
                    onKeyPress={this.submit.bind(this)}/>
            </FormGroup>
        )
    }

}

AddTodo.propTypes = {
  onSubmit: PropTypes.func.isRequired
}