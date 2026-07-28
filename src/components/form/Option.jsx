import { Button } from "../ui/button";

function Option({ data, handleClick, handleDelete }) {
  return (
    <div className="flex justify-between items-center border-b border-b-border p-2 gap-2">
      <button onClick={handleClick} className="flex-1 text-left border-border border-r hover:underline hover:cursor-pointer">
        {data.school || data.category || data.title || data.jobTitle}
      </button>
      <Button variant="destructive" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
}

export default Option;
