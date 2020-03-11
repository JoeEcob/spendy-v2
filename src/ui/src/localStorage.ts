export const loadState = (id: string): object | undefined => {
  try {
    const serializedState = localStorage.getItem(id);
    if (serializedState == null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (id: string, state: object): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(id, serializedState);
  } catch (err) {
    console.log(`Error setting state (${id}): ${err}`);
  }
};
