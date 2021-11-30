import { v4 as uuidv4 } from "uuid";

export const addNewCard = (title, desc, listId,setLists) => {
    // console.log(title, desc, listId);
    const newTask = {
      id:uuidv4(),
      title:title,
      description:desc,
      listId:listId

    }
    setLists(prev=>{
      prev={...prev}
      prev[listId].tasks.splice(0,0,newTask)
      return prev
    })
    
  };

export  const delCard = (listId,cardIndex,setLists) =>{
    setLists(prev=>{
      prev={...prev}
      prev[listId].tasks.splice(cardIndex,1)
      return prev
    })
  }