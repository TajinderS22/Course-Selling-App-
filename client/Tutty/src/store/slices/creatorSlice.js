import { createSlice } from "@reduxjs/toolkit";

const creatorSlice = createSlice({
    name:"creator",
    initialState:null,
    reducers:{
        setCreator:(state,action)=>{
            return action.payload
        },
        clearCreator:()=>null
    }
})

export const {setCreator,clearCreator}=creatorSlice.actions;
export default creatorSlice.reducer 