import { userActions, userReducer } from "./model/slice/userSlice";

export {
    userActions,
    userReducer
}

export { UserSchema, User } from "./model/types/user"

export { getUserAuthData } from "./model/selectors/getUserAuthData/getUserAuthData"