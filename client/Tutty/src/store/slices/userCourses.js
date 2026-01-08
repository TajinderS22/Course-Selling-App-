import { createSlice } from "@reduxjs/toolkit";

const userCoursesSlice=createSlice({
    name:"userCourses",
    initialState:null,
    reducers:{
        setUserCourses:(state,action)=> action.payload,
        clearUserCourses:()=>[]
    }
})

export const {setUserCourses,clearUserCourses}=userCoursesSlice.actions;
export default userCoursesSlice.reducer