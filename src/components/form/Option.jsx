import { GripVertical } from "lucide-react";
import { Button } from "../ui/button";

function Option({ data, handleClick, handleDelete }) {
  return (
    <div className="bg-white flex justify-between items-center border-b border-border">
      <div className="cursor-grab p-2">
        <GripVertical className="text-gray-400 font size-4" />
      </div>
      <div onClick={handleClick} role="button" className="p-2 flex-1 border-border border-x group hover:cursor-pointer">
        <button className="text-left group-hover:underline">
          {data.school || data.category || data.title || data.jobTitle}
        </button>
      </div>
      <div className="p-2">
        <Button variant="destructive" onClick={handleDelete}>
          Delete
        </Button> 
      </div>
    </div>
  );
}

export default Option;
