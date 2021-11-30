export const onDragEnd =(destination,source,lists,setLists)=>{
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