import React, { useState } from 'react';

interface IProps {
  callback: (value: string) => void;
  text: string;
}

const FitPlanCell: React.FC<IProps> = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(props.text);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setText(text.trim());

    setIsEditing(false);
    props.callback(text);
  };

  const handleClick = () => {
    if (isEditing) {
      return;
    }

    setIsEditing(true);
  };

  const cancelEdit = () => {
    // Revert to the original input
    setText(props.text);
    setIsEditing(false);
  };

  return (
    <td className={`editable-cell ${isEditing ? "editing" : ""}`} onClick={handleClick} title={text ? "Edit" : "Add new"}>
      {isEditing
        ? <form onSubmit={handleSubmit}>
            <input type="text" value={text} onChange={input => setText(input.target.value)} autoFocus />
            <button className="btn">Save</button>
            <small className="btn" onClick={cancelEdit}>Cancel</small>
          </form>
        : text}
    </td>
  );
};

export default FitPlanCell;
