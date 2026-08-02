import { Reorder, useDragControls } from "motion/react";
import { Button } from "./button";
import { GripVertical } from "lucide-react";

function Item({item, handleClick, handleDelete}) {
  const controls = useDragControls()
  
  return (
    <Reorder.Item
      dragListener={false}
      dragControls={controls}
      value={item}
    >
      <div className="bg-white flex justify-between items-center border-b border-border">
        <div 
          className="cursor-grab p-2"
          onPointerDown={(e) => { e.preventDefault(); controls.start(e) }}
        >
          <GripVertical className="text-gray-400 font size-4" />
        </div>
        <div onClick={handleClick} role="button" className="p-2 flex-1 border-border border-x group hover:cursor-pointer">
          <button className="text-left group-hover:underline">
            {item.school || item.category || item.title || item.jobTitle}
          </button>
        </div>
        <div className="p-2">
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button> 
        </div>
      </div>
    </Reorder.Item>
  )
}

export function ItemsView({items, dispatchItems, setState, handleOptionClick, handleOptionDelete}) {
  return (
    <div className="flex flex-col">
      <Reorder.Group
        className="relative"
        axis="y"
        values={items}
        onReorder={(newOrder) => dispatchItems({type: "REORDER", payload: newOrder})}
      >
        {items.map(item => (
          <Item 
            item={item} 
            handleClick={() => handleOptionClick(item.id)} 
            handleDelete={() => handleOptionDelete(item.id)}
            key={item.id}
          />
        ))}
      </Reorder.Group>
      <div className="p-4">
        <Button onClick={() => setState("new")} className="float-right">
          New
        </Button>
      </div>
    </div>
  )
}