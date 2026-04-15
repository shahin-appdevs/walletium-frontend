import { useForm, Controller } from "react-hook-form";
import { Input, Select, Button, Upload, Form } from "antd";
import FormItem from "@/components/ui/form/FormItem";
import { UploadOutlined } from "@ant-design/icons";
import { useSubmitKycVerificationMutation } from "@/redux/api/authApi";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import showToast from "@/lib/toast";
import { getSuccessMessage } from "@/utils/getSuccessMessage";
import { getErrorMessage } from "@/utils/getErrorMessage";

export default function DynamicVerificationForm({
  inputFields,
  verifyRefetch,
}) {
  const [submitVerification, { isLoading }] =
    useSubmitKycVerificationMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: inputFields.reduce((acc, field) => {
      acc[field.name] = field.type === "file" ? null : "";
      return acc;
    }, {}),
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      const keys = Object.keys(data);
      keys.forEach((item) => {
        formData.append(item, data[item]);
      });

      const result = await submitVerification(formData).unwrap();

      //kyc verification success message
      const messages = getSuccessMessage(result);
      messages.forEach((message) => showToast.success(message));
      verifyRefetch();
    } catch (error) {
      // kyc verification error message
      const errMessages = getErrorMessage(error);
      errMessages.forEach((message) => showToast.error(message));
    }
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      {inputFields.map((field) => (
        <FormItem
          key={field.name}
          label={field.label}
          name={field.name}
          errors={errors}
          required={field.required}
        >
          <Controller
            name={field.name}
            control={control}
            rules={{
              required: field.required ? `${field.label} is required` : false,
            }}
            render={({ field: controllerField }) => {
              switch (field.type) {
                case "text":
                  return (
                    <Input
                      {...controllerField}
                      size="large"
                      placeholder={field.label}
                    />
                  );
                case "textarea":
                  return (
                    <Input.TextArea
                      rows={4}
                      {...controllerField}
                      size="large"
                      min={field.validation?.min}
                      max={field.validation?.max}
                      className="w-full"
                    />
                  );
                case "select":
                  return (
                    <Select
                      {...controllerField}
                      size="large"
                      placeholder={`Select ${field.label}`}
                      options={field.validation?.options?.map((opt) => ({
                        label: opt,
                        value: opt,
                      }))}
                    />
                  );
                case "file":
                  return (
                    <Upload
                      beforeUpload={(file) => {
                        const validExt = field?.validation?.mimes.map((item) =>
                          item.trim()
                        );
                        const validFileSize = field?.validation?.max;
                        const MAX_FILE_SIZE = validFileSize * 1024 * 1024;
                        const isValidSize = file.size <= MAX_FILE_SIZE;

                        //valid message
                        const extMessage = `Only allow ${validExt.join(", ")}`;
                        const sizeMessage =
                          isValidSize ||
                          `File size should be less then ${validFileSize} MB`;

                        const fileExt = file.name
                          .split(".")
                          .pop()
                          .toLowerCase();

                        const isValidExt = validExt.includes(fileExt);

                        if (!isValidExt) {
                          showToast.error(extMessage);
                          return Upload.LIST_IGNORE;
                        }

                        if (!isValidSize) {
                          showToast.error(sizeMessage);
                          return Upload.LIST_IGNORE;
                        }

                        setValue(field.name, file, { shouldValidate: true }); // store file in RHF
                        return false; // prevent auto upload
                      }}
                      maxCount={1}
                      showUploadList={{
                        showRemoveIcon: true,
                      }}
                    >
                      <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                  );
                default:
                  return <Input {...controllerField} size="large" />;
              }
            }}
          />
        </FormItem>
      ))}

      <PrimaryButton type="submit" className="w-full" loading={isLoading}>
        Submit
      </PrimaryButton>
    </Form>
  );
}
