import { useEffect, useState } from "react";

export function useLocalStorageBool(key: string, defaultValue: boolean) {
  const [value, setValue] = useState<boolean>(defaultValue);

  useEffect(() => {
    const saved = localStorage.getItem(key);
    if (saved !== null) {
      setValue(saved === "true");
    }
  }, [key]);

  const setStoredValue = (newValue: boolean) => {
    setValue(newValue);
    localStorage.setItem(key, newValue.toString());
  };

  return [value, setStoredValue] as const;
}
