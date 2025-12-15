import React from "react";
import { Form, Select } from "antd";

const { Option } = Select;

/**
 * FormSelect
 * A reusable Ant Design Select wrapped in Form.Item
 * Works with React Hook Form via Controller
 *
 */
const FormSelect = React.forwardRef(
  (
    {
      label = "",
      name,
      value,
      onChange,
      onBlur,
      placeholder = "Select",
      disabled = false,
      options = [], // array of { label, value }
      validateStatus,
      help,
      className = "",
      selectClassName = "",
      allowClear = true,
      showSearch = false,
      ...rest
    },
    ref
  ) => {
    return (
      <Form.Item
        label={label}
        validateStatus={validateStatus}
        help={help}
        className={`w-full! mb-2! ${className}`}
        name={name}
      >
        <Select
          showSearch={showSearch}
          ref={ref}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          allowClear={allowClear}
          className={`w-full! ${selectClassName}`}
          {...rest}
        >
          {options.map((opt) => (
            <Option key={opt.value} value={opt.value}>
              {opt.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
    );
  }
);

FormSelect.displayName = "FormSelect";

export default FormSelect;
