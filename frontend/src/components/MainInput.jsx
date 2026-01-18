// frontend/src/components/MainInput.jsx
import "../styles/MainInput.css";

const MainInput = ({
  label,
  type = "text",
  as = "input",
  value,
  onChange,
  options = [],
  required = true,
  name,
  listId,
  listOptions = [],
  ...rest
}) => {
  return (
    <div className="input-group">
      {as === "select" ? (
        <select
          name={name}
          value={value ?? ""}
          onChange={onChange}
          required={required}
          {...rest}
        >
          <option value="" disabled hidden></option>
          {options.map((opt) => {
            const optionValue = typeof opt === "string" ? opt : opt.value;
            const optionLabel = typeof opt === "string" ? opt : opt.label;
            return (
              <option key={optionValue} value={optionValue}>
                {optionLabel}
              </option>
            );
          })}
        </select>
      ) : (
        <>
          <input
            name={name}
            type={type}
            value={value ?? ""}
            onChange={onChange}
            required={required}
            list={listId}   // 🔗 attach datalist if provided
            {...rest}
          />
          {listId && listOptions.length > 0 && (
            <datalist id={listId}>
              {listOptions.map((opt) => (
                <option key={opt} value={opt} />
              ))}
            </datalist>
          )}
        </>
      )}
      <label>{label}</label>
    </div>
  );
};

export default MainInput;
