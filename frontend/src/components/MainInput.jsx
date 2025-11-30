// frontend/src/components/MainInput.jsx
import "../styles/MainInput.css";

const MainInput = ({
  label,
  type = "text",        // HTML input type ("text", "email", "tel", etc.)
  as = "input",          // "input" | "select"
  value,
  onChange,
  options = [],          // for as="select"
  required = true,
  name,
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
          {/* empty, hidden default option – no placeholder text shown */}
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
        <input
          name={name}
          type={type}
          value={value ?? ""}
          onChange={onChange}
          required={required}
          {...rest}
        />
      )}
      <label>{label}</label>
    </div>
  );
};

export default MainInput;

