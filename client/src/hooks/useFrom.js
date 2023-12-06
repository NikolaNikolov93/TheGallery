import { useEffect, useState } from "react";
import formValidator from "../utils/formValidator";

export default function useForm(submitHandler, initialValues) {
    const [values, setValues] = useState(initialValues);

    useEffect(() => {
        setValues(initialValues);
    }, [initialValues]);

    const onChange = (e) => {
        setValues((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };
    const onSubmit = (e) => {
        e.preventDefault();
        try {
            submitHandler(values);
        } catch (error) {}
    };

    return {
        values,
        onChange,
        onSubmit,
    };
}
