import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"
import creatorReducer from "./slices/creatorSlice"
import userCoursesReducer from "./slices/userCourses"
import configReducer from "./slices/configSlice"

const store = configureStore({
    reducer: {
        user: userReducer,
        creator:creatorReducer,
        userCourses:userCoursesReducer,
        config:configReducer
    }
})
export default store 