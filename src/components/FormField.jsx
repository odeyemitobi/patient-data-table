import {
  FaUser,
  FaCalendarAlt,
  FaVenusMars,
  FaStethoscope,
  FaNotesMedical,
} from "react-icons/fa";
import { INPUT_STYLE } from "../utils/helper";

const iconMap = {
  FaUser,
  FaCalendarAlt,
  FaVenusMars,
  FaStethoscope,
  FaNotesMedical,
};

function FormField({ field, value, onChange }) {
  const { name, icon, placeholder, type, options, props, rows } = field;

  const IconComponent = icon ? iconMap[icon] : null;

  return (
    <div className="relative">
      {IconComponent && (
        <IconComponent className="absolute top-3 left-3 text-[#8B4513]" />
      )}

      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          placeholder={placeholder}
          className={INPUT_STYLE}
        />
      ) : type === "select" ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={INPUT_STYLE}
          required
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt || name.charAt(0).toUpperCase() + name.slice(1)}
            </option>
          ))}
        </select>
      ) : (
        <input
          name={name}
          value={value}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          className={INPUT_STYLE}
          required
          {...props}
        />
      )}
    </div>
  );
}

export default FormField;
