//todo ________________________LOCAL STORAGE SERVICE __________________________----

//* =========================== store data in local storage
export const storeDataByValue = (key, value) => {
  localStorage.setItem(key, value);
};

export const storeDataByObj = (key, objParam) => {
  localStorage.setItem(key, JSON.stringify(objParam));
};

//*=========================== get data from local storage
export const getDataByValue = (key) => {
  return localStorage.getItem(key); //? either returns data or null , so no tension like in cookie
};

export const getDataByObj = (key) => {
  //! we get null if there is no key in LS with name "token" , so  we use  string | null
  //@ts-ignore
  return JSON.parse(localStorage.getItem(key)); //? either returns data or null , so no tension like in cookie
};

//*=========================== delete data from local storage
export const deleteData = (key) => {
  localStorage.removeItem(key);
};
