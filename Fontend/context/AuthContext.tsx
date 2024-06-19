import {
  getToken,
  setTokenLocalStorage,
} from "@/Provider/localStorageProvider";
import {
  editProfileUser,
  getUserByIdApi,
  loginByEmail,
  loginByToken,
  registerByEmail,
} from "@/api/authApi";
import { IUser } from "@/model/user";
import { useRouter } from "next/router";
import React, { createContext, useContext } from "react";
import { toast } from "react-toastify";
import { createWallet, injectedProvider } from "thirdweb/wallets";
import { chain, client } from "@/utils/constant";
interface AuthContextType {
  user: IUser;
  login: (email: string, password: string) => void;
  register: (
    fullName: string,
    email: string,
    password: string,
    gender: string
  ) => void;
  editUser: (
    avatar: string,
    fullName: string,
    mobile: string,
    address: string,
    story: string,
    website: string,
    id: string
  ) => void;
  getUserById: (id: string) => void;
  logout: () => void;
  isLoading: boolean;
  token: string;
}

const AuthContext = createContext<AuthContextType>({
  user: {} as IUser,
  login: () => {},
  register: () => {},
  editUser: () => {},
  getUserById: () => {},
  logout: () => {},
  isLoading: false,
  token: "",
});

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = React.useState<IUser>({} as IUser);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [token, setToken] = React.useState<string>("");
  const metamask = createWallet("io.metamask");
  const login = async (email: string, password: string) => {
    try {
      const res = await loginByEmail(email, password);
      console.log(res);
      if (res.status === 200) {
        if (res.data.status) {
          setUser(res.data.user);
          setTokenLocalStorage(res.data.token);
          toast("Login successfully");
          setToken(res.data.token);
          router.push("/");
          setIsLoading(true);
          if (injectedProvider("io.metamask")) {
            await metamask.connect({ client });
          }
        } else {
          toast.error(res.data.message);
          setIsLoading(false);
        }
      } else {
        toast.error("Login failed");
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Login failed");
    }
  };

  const register = async (
    fullName: string,
    email: string,
    password: string,
    gender: string
  ) => {
    try {
      const res = await registerByEmail(fullName, email, password, gender);
      if (res.status === 200) {
        if (res.data.status) {
          setUser(res.data.user);
          setTokenLocalStorage(res.data.token);
          toast("Register successfully");
          router.push("/");
          setToken(res.data.token);
          setIsLoading(true);
        } else {
          toast.error(res.data.message);
          setIsLoading(false);
        }
      } else {
        toast.error("Register failed");
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Register failed");
    }
  };

  const autoLogin = async () => {
    const token = await getToken();
    if (token) {
      const res = await loginByToken(token);
      if (res.status === 200) {
        if (res.data.status) {
          setUser(res.data.user);
          setTokenLocalStorage(res.data.token);
          setToken(res.data.token);
          setIsLoading(true);
        } else {
          setIsLoading(false);
        }
      } else {
        toast.error("Login failed");
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    autoLogin();
  }, []);

  React.useEffect(() => {
    const autoRedirect = async () => {
      const token = await getToken();
      if (!token) {
        // router.push("/auth");
      } else {
        // router.push("/");
      }
    };
    autoRedirect();
  }, [user]);

  const logout = () => {
    setUser({} as IUser);
    setTokenLocalStorage("");
    setToken("");
    router.push("/auth");
    toast("Logout successfully");
    metamask.disconnect();
  };

  const editUser = async (
    avatar: string,
    fullName: string,
    mobile: string,
    address: string,
    story: string,
    website: string,
    id: string
  ) => {
    try {
      const res = await editProfileUser(
        avatar,
        fullName,
        mobile,
        address,
        story,
        website,
        id
      );
      if (res.status === 200) {
        if (res.data.status) {
          setUser(res.data.data);
          toast("Edit profile successfully");
        }
      }
    } catch (error) {
      toast.error("Edit failed");
    }
  };

  const getUserById = async (id: string) => {
    setIsLoading(true);
    try {
      const res = await getUserByIdApi(id);
      if (res.status === 200) {
        if (res.data.status) {
          setUser(res.data.data);
          setIsLoading(false);
        }
      }
    } catch (error) {
      toast.error("Get user failed");
    }
  };
  const authContextValue: AuthContextType = {
    user,
    login,
    register,
    editUser,
    getUserById,
    logout,
    isLoading,
    token,
  };
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
