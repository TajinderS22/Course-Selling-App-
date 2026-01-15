import { createSlice } from "@reduxjs/toolkit";

const configSlice=createSlice({
    name:"config",
    initialState:{
        sideBarSelected:null,
    },
    reducers:{
        setSidebarSelected:(state,action)=>{
            state.sideBarSelected=action.payload;
        },
        clearSidebarSelected:(state)=>{
            state.sideBarSelected=null;
        }
    }
})

export const {setSidebarSelected,clearSidebarSelected}=configSlice.actions;
export default configSlice.reducer;