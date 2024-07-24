import supabase from "@/supabase/supabaseClient";
import { useEffect, useState } from "react";

function useUser() {
    const [user, setUser] = useState<any>(null);

    useEffect(()=>{
        const fetchUser = async() => {
            const {data:userData, error} = await supabase.auth.getUser();
            if(error) {
                console.error('로그인한 유저 정보 가져오는 중 에러 발생', error);
            } else {
                setUser(userData?.user);
            }
        }
        fetchUser();
    },[])

    return {user};
}

export default useUser;