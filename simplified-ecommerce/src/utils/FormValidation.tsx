import { ShippingDetails } from "@/type";
import { useState } from "react";

export const useFormValidation = (initialValues: ShippingDetails) => {
  const [formData, setFormData] = useState<ShippingDetails>(initialValues);
  const [errors, setErrors] = useState<Partial<ShippingDetails>>({});

  // Validate form data
  const validateForm = () => {
    const newErrors: Partial<ShippingDetails> = {};

    //
    if (!formData.name) newErrors.name = "Name is required";

    if (!formData.address) newErrors.address = "Address is required";

    if (!formData.phone) newErrors.phone = "Phone is required";
    else if (!/^\d{10,}$/.test(formData.phone))
      newErrors.phone = "Invalid phone number";

    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    formData,
    setFormData,
    errors,
    validateForm
  };
};
