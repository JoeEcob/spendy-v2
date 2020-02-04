import React, { useRef, useState } from 'react';

interface IProps {
  callback: (text: string) => void;
}

const AddReminder: React.FC<IProps> = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputField = useRef<HTMLInputElement>(null!);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputField?.current?.value) {
      return;
    }

    setIsEditing(false);
    props.callback(inputField.current.value);
  };

  return (
    <span>
      {isEditing
        ? <form onSubmit={handleSubmit}>
            <input ref={inputField} type="text" autoFocus />
            <button className="btn" title="Save" type="submit">Save</button>
            <span className="btn"  title="Cancel" onClick={() => setIsEditing(false)}>x</span>
          </form>
        : <span className="btn" title="Add reminder" onClick={() => setIsEditing(true)}>+</span>}
    </span>
  );
}

export default AddReminder;
