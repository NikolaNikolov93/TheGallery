import { useState } from "react";

export default function usePeristedState(key, defaultValue) {
    const [state, setState] = useState(() => {
        const persistedState = localStorage.getItem(key);
        if (persistedState) {
            return JSON.parse(persistedState);
        }
        return defaultValue;
    });

    const setPeristedState = (value) => {
        setState(value);
        let serializedValue;

        if (typeof value === "function") {
            serializedValue = JSON.stringify(value(state));
        } else {
            serializedValue = JSON.stringify(value);
        }

        localStorage.setItem(key, serializedValue);
    };

    return [state, setPeristedState];
}
