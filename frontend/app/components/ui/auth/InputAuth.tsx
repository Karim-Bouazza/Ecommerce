import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type InputAuthProps = {
  mode: "login" | "register";
  label: string;
  name: string;
  type: "text" | "email" | "password";
  placeholder: string;
  required: boolean;
  value: string;
  handleInformationChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputAuth({
  mode,
  label,
  name,
  type,
  placeholder,
  required,
  value,
  handleInformationChange,
}: InputAuthProps) {
  return (
    <Field className={mode === "register" ? "gap-1" : ""}>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <Input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={handleInformationChange}
      />
    </Field>
  );
}
