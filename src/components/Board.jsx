import React, { useState,useEffect } from "react";
import { Button} from "antd";
import TaskList from "./TaskList";
import AddList from "./AddList";
import {DragDropContext} from "react-beautiful-dnd"
import { getListData,updateListData,addToLists,deleteFromLists} from "../helper/listshandler";
import { onDragEnd } from "../helper/onDragEnd";
import { addNewCard,delCard} from "../helper/cardhandler";

const Board = () => {

  const [addingList, setAddingList] = useState(false);
  const [lists, setLists] = useState({});

  //for retreving list data
  useEffect(() => {
    const listData = getListData();
    if (listData) {
      setLists(listData);
    }
  }, []);

  //for updating list 
  useEffect(() => {
    updateListData(lists)
  }, [lists]);

  //for toggling addList component
  const toggleAddingList = () => {
    setAddingList(!addingList);
  };

  //add new list object  to lists state 
  const addNewList = (newTitle) => {
    addToLists(newTitle,setLists)
  };

  //delete a list object from lists
  const deleteList = (listId) =>{
    deleteFromLists(listId,setLists)
  }

  const addNewTask = (title, desc, listId) => {
    addNewCard(title,desc,listId,setLists)
  };

  const deleteCard = (listId,cardIndex) =>{
    delCard(listId,cardIndex,setLists)
  }

  const handleDragEnd =({destination,source})=>{
   onDragEnd(destination,source,lists,setLists)
  }

  return (
    <>
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
    </>
  );
};

export default Board;
