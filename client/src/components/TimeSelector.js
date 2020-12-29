import { useField } from 'formik';

const options = {
  minutes: [1, 2, 5, 10, 20, 30, 45],
  hours: [1, 2, 3, 4, 6, 9, 12, 18],
  days: [1, 2, 3, 4, 6],
};

const TimeSelector = (props) => {
  const [field, , { setValue }] = useField(props);
  const { value, onChange, onBlur } = field;

  return (
    <div className="field has-addons mt-1 mx-1">
      <div className="control has-icons-left">
        <div className="select">
          <select name="duration.amount" onChange={onChange} onBlur={onBlur}>
            {options[value.unit].map((amount) => (
              <option value={amount} selected={amount === +value.amount}>
                {amount}
              </option>
            ))}
          </select>
        </div>
        <div className="icon is-small is-left">
          <i className="fas fa-clock"></i>
        </div>
      </div>

      <div className="control">
        <span className="select">
          <select
            name="duration.unit"
            onChange={(e) => {
              setValue({
                ...value,
                amount: 1,
              });
              onChange(e);
            }}
            onBlur={onBlur}
          >
            <option value="minutes" selected>
              minutes
            </option>
            <option value="hours">hours</option>
            <option value="days">days</option>
          </select>
        </span>
      </div>
    </div>
  );
};

export default TimeSelector;
