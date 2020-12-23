import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const IDField = ({ loading }) => {
  const [value, setValue] = useState('');
  const handleChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  return (
    <section className="mt-6">
      <div className="field has-addons">
        <div className="control is-expanded">
          <input
            className={`input is-large ${loading ? 'is-loading' : ''}`}
            type="text"
            placeholder="Enter the poll ID"
            value={value}
            onChange={handleChange}
            readOnly={loading}
          />
        </div>
        <div className="control">
          <NavLink
            to={`/vote/${value}`}
            className={`button is-info is-large ${loading ? 'is-loading' : ''}`}
          >
            Enter
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default IDField;
