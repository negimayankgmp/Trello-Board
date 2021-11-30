import React,{useState} from 'react'
import {Button,Input} from 'antd'

const AddList = (props) => {

  const [newTitle,setNewTitle] = useState('')
  
  const addList = (title)=>{
      props.addNewList(title)
      props.toggleAddingList()
  }


    return (
        <div className="addList">
        <Input value={newTitle} onChange={e=>setNewTitle(e.target.value)}/>
        <Button type='primary' size="small" onClick={()=>addList(newTitle)}>Add</Button>
        <Button type="danger" size="small" onClick={props.toggleAddingList}>x</Button>
        </div>
    )
}

export default AddList
