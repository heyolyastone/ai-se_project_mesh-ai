import { useCallback, useState } from "react";
import type { ChangeEvent } from "react";

type FormValues = Record<string, string>;
type FormErrors = Record<string, string>;

export function useFormWithValidation() {
  const [values, setValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    const { name, value, validationMessage } = input;

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: validationMessage,
    }));

    setIsValid(input.closest("form")?.checkValidity() ?? false);
  };

  const resetForm = useCallback(
    (
      newValues: FormValues = {},
      newErrors: FormErrors = {},
      newIsValid = false,
    ) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [],
  );

  return {
    values,
    errors,
    isValid,
    handleChange,
    resetForm,
  };
}
