export let token = "";

export const setToken = (prov: string) => {
  token = prov;
};
export const getToken = () => {
  return token;
};
