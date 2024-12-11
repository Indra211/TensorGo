export const storeDataInLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const retriveDataFromLocalStorage = (key) => {
  if (!localStorage.getItem(key)) {
    return null;
  }
  return JSON.parse(localStorage.getItem(key));
};

export const removeDataFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
  localStorage.clear();
};
