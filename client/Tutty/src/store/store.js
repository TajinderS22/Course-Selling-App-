import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"
import creatorReducer from "./slices/creatorSlice"
import userCoursesReducer from "./slices/userCourses"

const store = configureStore({
    reducer: {
        user: userReducer,
        creator:creatorReducer,
        userCourses:userCoursesReducer
    }
})
export default store 