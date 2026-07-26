function Option({ data, handleClick, handleDelete, display }) {
  return (
    <div className={`option ${display}`}>
      <button className="option-main" onClick={handleClick}>
        {data.school || data.category || data.project || data.experience}
      </button>
      <button className="option-delete" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default Option;
