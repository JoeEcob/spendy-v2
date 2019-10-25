import React, { useState } from 'react';

interface IProps {
  onSubmit: (event: React.FormEvent<HTMLElement>) => void;
}

const AddNew: React.FC<IProps> = (props) => {
  const [isFormVisible, setFormVisibility] = useState(false);

  function toggleForm() {
    setFormVisibility(!isFormVisible);
  }

  function RenderForm() {
    return (
      <div className="add-transaction-container">
        <form method="POST" onSubmit={props.onSubmit}>
          <input type="text" name="Description" placeholder="Description..." />
          <input type="submit" value="Submit" />
        </form>
        <span onClick={toggleForm}>x</span>
      </div>
    );
  }

  return (
    <tr>
      <td colSpan={5}>
        {isFormVisible
            ? RenderForm()
            : <button className="btn" onClick={toggleForm}>Add new</button>}
      </td>
    </tr>
  );
};

export default AddNew;
