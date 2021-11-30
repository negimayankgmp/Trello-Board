import { v4 as uuidv4 } from "uuid";

export const getListData = ()=>{
    return JSON.parse(localStorage.getItem("lists"));
}

export const updateListData = (newData) =>{
    localStorage.setItem("lists", JSON.stringify(newData));
}

export const addToLists = (newTitle,setLists) => {
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

export const deleteFromLists = (listId,setLists) =>{
    setLists(prev=>{
      prev={...prev}
      delete prev[listId]
      return prev
    })
  }