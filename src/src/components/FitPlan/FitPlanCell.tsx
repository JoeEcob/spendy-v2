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

    setIsEditing(false);
    props.callback(text);
  };

  return (
    <td className="editable-cell">
      {isEditing
        ? <form className="editing" onSubmit={handleSubmit}>
            <input type="text" value={text} onChange={input => setText(input.target.value)} autoFocus />
            <button className="btn">Save</button>
            <small className="btn" onClick={() => setIsEditing(false)}>Cancel</small>
          </form>
        : text
          ? <div className="btn edit" title="Edit entry" onClick={() => setIsEditing(true)}>{text}</div>
          : <div className="btn add" title="Add entry" onClick={() => setIsEditing(true)}>+</div>}
    </td>
  );
};

export default FitPlanCell;
