import { useField } from 'formik';
import Button from '../components/Button'

const StyledField = (props) => {
  const { name, onChange, onBlur, value, error, button, placeholder, size, disabled } = props;

  return (
    <section className="my-3">
      <div className={`field ${button && 'has-addons'}`}>
        <div className={`control is-expanded`}>
          <input
            className={`input ${error ? 'is-danger' : ''} ${size}`}
            type="text"
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            autoComplete="off"
            disabled={disabled}
          />
          {error && <p class={'help is-danger'}>{error}</p>}
        </div>
        {button && (
          <div className="control">
            <Button {...button} />
          </div>
        )}
      </div>
    </section>
  );
};

const InputField = ({ button, placeholder, size, disabled, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <StyledField
      {...field}
      button={button}
      placeholder={placeholder}
      size={size}
      disabled={disabled}
      error={errorText}
    />
  );
};

export default InputField;
