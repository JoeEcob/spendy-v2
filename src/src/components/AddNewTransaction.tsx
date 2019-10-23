import React from 'react';

interface IProps {
  onSubmit: (event: React.MouseEvent<HTMLElement>) => void;
}

const AddNewTransaction: React.FC<IProps> = (props) => {
  // todo - show form on click
  return (
    <tr>
      <td colSpan={5}>
        <button className="btn" onClick={props.onSubmit}>Add new</button>
      </td>
    </tr>
  );
};

export default AddNewTransaction;
