"use client"

import { useAppDispatch } from "@/lib/store/hooks"
import { fetchFastApiPagesThunk } from "@/lib/store/pages/pageThunk";

import { useEffect, useEffectEvent } from "react"
import GetAllPages from "./GetAllPages";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { usePathname } from "next/navigation";
import { setCurrentPages } from "@/lib/store/pages/pagesSlice";

const UpdateCurrentPage = () => {

    const {allPages}=useSelector((state:RootState)=>state.pages)
    const pathname=usePathname();
    console.log("pathname",pathname)
    const slug=pathname.slice(1);
    console.log("slug",slug)
    const dispatch=useAppDispatch()
   useEffect(()=>{
if(allPages.length> 0 && slug==="/"){
    
  const data=allPages.find((page:any)=>page.slug==="home")
  console.log("data--",data)
  if(data){
    dispatch(setCurrentPages(data))
  }
}
if(allPages.length> 0 && slug!=="/"){
    
  const data=allPages.find((page:any)=>page.slug===slug)
  console.log("data--",data)
  if(data){ 
    dispatch(setCurrentPages(data))
  }
}
   },[allPages,slug])

    return (
        <GetAllPages/>
    )
}
export default UpdateCurrentPage