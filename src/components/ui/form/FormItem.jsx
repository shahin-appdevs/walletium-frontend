import { Form } from "antd";

export default function FormItem({ label, name, errors, required, children }) {
  const error = errors?.[name];

  return (
    <Form.Item
      label={label}
      required={required}
      validateStatus={error ? "error" : ""}
      help={error?.message}
    >
      {children}
    </Form.Item>
  );
}
