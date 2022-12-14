import { useField } from 'formik';

const convertCamelIntoSentence = (text) => {
  const result = text.replace(/[A-Z]/g, (match) => ` ${match}`);
  return result.charAt(0).toUpperCase() + result.slice(1);
};

const StyledField = ({ name, type, icon, onChange, onBlur, value, error }) => {
  return (
    <div className="field">
      <label className="label">{convertCamelIntoSentence(name)}</label>
      <div className="control has-icons-left">
        <input
          className={`input ${error && 'is-danger'}`}
          type={type}
          placeholder={convertCamelIntoSentence(name)}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          autoComplete="off"
        />
        <span className="icon is-small is-left">
          <i className={icon}></i>
        </span>
        {error && <p className={'help is-danger'}>{error}</p>}
      </div>
    </div>
  );
};

const InputFieldWithLabel = ({ icon, type, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return <StyledField {...field} icon={icon} type={type} error={errorText} />;
};

export default InputFieldWithLabel;
