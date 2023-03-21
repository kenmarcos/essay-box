import { User } from "@/types";

const storagePrefix = "@essaybox:";

const storage = {
  getUser: () => {
    return JSON.parse(
      window.localStorage.getItem(`${storagePrefix}user`) as string
    );
  },
  setUser: (user: User) => {
    window.localStorage.setItem(`${storagePrefix}user`, JSON.stringify(user));
  },
  clearUser: () => {
    window.localStorage.removeItem(`${storagePrefix}user`);
  },
};

export default storage;
