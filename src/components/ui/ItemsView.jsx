import { Button } from "@base-ui/react";
import { Reorder } from "motion/react";

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
        <Reorder.Item
          value={item}
          key={item.id}
        >
          <Option
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