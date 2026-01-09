import { account } from "./appwrite";
import { ID } from "appwrite";

export const registerUser = async (name, email, password) => {
    try {
        const user = await account.create(ID.unique(), email, password, name);
        return user;
    }
    catch (error) {
        throw error;
    }

}
export const loginUser = async (email, password) => {
    try {
        const user = await account.createEmailPasswordSession(email, password);
        return user;
    }
    catch (error) {
        throw error;
    }

}

export const logoutUser = async () => {
    try {
        return account.deleteSession("current");
    }
    catch (error) {
        throw error;
    }
}