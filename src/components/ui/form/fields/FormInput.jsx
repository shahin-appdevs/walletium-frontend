import React from "react";
import { Form, Input } from "antd";

/**
 * FormInput
 * A reusable Ant Design Input wrapped in Form.Item
 * Works with React Hook Form via Controller
 */
const FormInput = React.forwardRef(
  (
    {
      label = "",
      name,
      value,
      onChange,
      onBlur,
      placeholder = "",
      size = "middle",
      disabled = false,
      readOnly = false,
      validateStatus, // "error" if field has validation error
      help, // error message or helper text
      className = "",
      inputClassName = "",
      required,
      type = "text",
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
        required={required}
      >
        <Input
          ref={ref}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          size={size}
          disabled={disabled}
          readOnly={readOnly}
          className={`w-full! ${inputClassName}`}
          {...rest}
        />
      </Form.Item>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
