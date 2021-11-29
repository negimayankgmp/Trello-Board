import React, { useState,useEffect } from "react";
import { Button} from "antd";
import TaskList from "./TaskList";
import { v4 as uuidv4 } from "uuid";
import AddList from "./AddList";
import {DragDropContext} from "react-beautiful-dnd"

const Board = () => {
  const [addingList, setAddingList] = useState(false);
  
  const [lists, setLists] = useState({});

  useEffect(() => {
    const listData = JSON.parse(localStorage.getItem("lists"));
    if (listData) {
      setLists(listData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists));
  }, [lists]);

  const toggleAddingList = () => {
    setAddingList(!addingList);
  };

  const addNewList = (newTitle) => {
    const newList = {
      [uuidv4()]: {
        title: newTitle,
        tasks: [],
      },
    };
    setLists((prev) => ({
      ...prev,
      ...newList,
    }));
  };

  const addNewTask = (title, desc, listId) => {
    // console.log(title, desc, listId);
    const newTask = {
      id:uuidv4(),
      title:title,
      description:desc,
      listId:listId

    }
    console.log(newTask)
    setLists(prev=>{
      prev={...prev}
      prev[listId].tasks.splice(0,0,newTask)
      return prev
    })
    
  };

  const handleDragEnd =({destination,source})=>{
    if(!destination){
      // console.log("dropped outside droppable space")
      return
    }
    if(destination.index===source.index && destination.droppableId===source.droppableId){
      // console.log("dropped in same space")
      return
    }

    const itemCopy = {...lists[source.droppableId].tasks[source.index]}

    setLists(prev=>{
      prev={...prev}
      prev[source.droppableId].tasks.splice(source.index,1)
      prev[destination.droppableId].tasks.splice(destination.index,0,itemCopy)
      return prev
    })
  }

  const deleteList = (listId) =>{
    setLists(prev=>{
      prev={...prev}
      delete prev[listId]
      return prev
    })
  }

  const deleteCard = (listId,cardIndex) =>{
    setLists(prev=>{
      prev={...prev}
      prev[listId].tasks.splice(cardIndex,1)
      return prev
    })
  }

  return (
    <div className>
      <div className="addList">
        {addingList ? (
          <AddList
            toggleAddingList={toggleAddingList}
            addNewList={addNewList}
          />
        ) : (
          <Button type="primary" size="small" onClick={toggleAddingList}>
            Add List
          </Button>
        )}
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
      <div className="list-area">
        {Object.keys(lists).map((key, index) => {
          return (
            // console.log(key)
            <TaskList
              title={lists[key].title}
              handleCardAdd={addNewTask}
              deleteList={deleteList}
              deleteCard={deleteCard}
              tasks={lists[key].tasks}
              key={key}
              listId={key}
            />
          );
        })}
      </div>
    </DragDropContext>
    </div>
  );
};

export default Board;
