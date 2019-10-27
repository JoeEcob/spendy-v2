import React, { useRef, useState } from 'react';

interface IProps {
  callback: (text: string) => void;
}

const AddReminder: React.FC<IProps> = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputField = useRef<HTMLInputElement>(null!);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!inputField || !inputField.current) {
      return;
    }

    const value = inputField.current.value
    if (!value) {
      return;
    }

    props.callback(value);
    setIsEditing(false);
  }

  return (
    <span>
      {isEditing
        ? <form onSubmit={handleSubmit}>
            <input ref={inputField} type="text" autoFocus />
            <button type="submit">Save</button>
            <span className="cancel"  title="Cancel" onClick={() => setIsEditing(false)}>x</span>
          </form>
        : <span className="add" title="Add new" onClick={() => setIsEditing(true)}>+</span>}
    </span>
  );
}

export default AddReminder;
