import { useState,useEffect} from 'react';

const useRWD=()=>{
    const [mobile,setMobile]=useState("mobile");

    const handleRWD=()=>{
        if(window.innerWidth>992)
            setMobile("PC");
        else if (window.innerWidth>768)
            setMobile("tablet");
        else
            setMobile("mobile");
    }

    useEffect(()=>{
    
        window.addEventListener('resize',handleRWD);
        handleRWD();
        
        return(()=>{
            window.removeEventListener('resize',handleRWD);
        })
    },[]);

    return mobile;
}

export default useRWD;