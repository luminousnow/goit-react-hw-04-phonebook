import { useState, useEffect } from 'react';

function useLocalStorage(key, defaultValue) {
  // === useState hooks === //
  const [state, setState] = useState(
    // читаємо з localStorage
    () => JSON.parse(window.localStorage.getItem(key)) ?? defaultValue,
  );

  // === useEffect hooks === //
  useEffect(() => {
    // оновлює запис в LocalStorage
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default useLocalStorage;
