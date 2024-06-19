export const setTokenLocalStorage =async (token: string)=> {
    try {
      await localStorage.clear();
      await localStorage.setItem("@token", token);
    } catch (error) {
      console.log(error);
    }
}

export const getToken = async () => {
    try {
      const data = await localStorage.getItem("@token");
      if (data !== null) {
        return data;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  };