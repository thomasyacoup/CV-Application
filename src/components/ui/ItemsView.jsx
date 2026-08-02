import { Reorder, useDragControls } from "motion/react";
import Option from "../form/Option";
import { Button } from "./button";

export function ItemsView({items, dispatchItems, setState, handleOptionClick, handleOptionDelete}) {
  const controls = useDragControls()
  
  return (
    <div className="flex flex-col">
      <Reorder.Group
        className="relative"
        axis="y"
        values={items}
        onReorder={(newOrder) => dispatchItems({type: "REORDER", payload: newOrder})}
      >
        {items.map(item => (
        <Reorder.Item
          dragListener={false}
          dragControls={controls}
          value={item}
          key={item.id}
        >
          <Option
            controls={controls}
            display={item.display || "block"}
            handleClick={() => handleOptionClick(item.id)}
            handleDelete={() => handleOptionDelete(item.id)}
            data={item}
          />
        </Reorder.Item>
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