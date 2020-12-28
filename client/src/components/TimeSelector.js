import { useField } from 'formik';

const options = {
  minutes: [1, 5, 10, 20, 30, 45],
  hours: [1, 2, 3, 4, 6, 9, 12, 18],
  days: [1, 2, 3, 4, 6],
};

const TimeSelector = (props) => {
  const [field, , { setValue }] = useField(props);
  const { value, onChange, onBlur } = field;

  return (
    <div class="field has-addons mt-1 mx-1">
      <div class="control has-icons-left">
        <div class="select">
          <select name="duration.amount" onChange={onChange} onBlur={onBlur}>
            {options[value.unit].map((amount) => (
              <option value={amount} selected={amount === +value.amount}>
                {amount}
              </option>
            ))}
          </select>
        </div>
        <div class="icon is-small is-left">
          <i class="fas fa-clock"></i>
        </div>
      </div>

      <div class="control">
        <span class="select">
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
