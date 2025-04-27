import { useState, useEffect } from 'react';



export default function useLocalStorage(key, initialValue) {
    const getInitialValue = () => {
        try {
            const storedValue = localStorage.getItem(key);
            return storedValue !== null ? JSON.parse(storedValue) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    };

    const [value, setValue] = useState(getInitialValue);

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(error);
        }
    }, [key, value]);

    const updateValue = (newValue) => {
        setValue((prevValue) =>
            typeof newValue === 'function' ? newValue(prevValue) : newValue
        );
    };

    const removeValue = () => {
        try {
            localStorage.removeItem(key);
            setValue(initialValue);
        } catch (error) {
            console.error(error);
        }
    };

    return [value, updateValue, removeValue];
}
