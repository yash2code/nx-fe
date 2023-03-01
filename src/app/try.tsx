import { useEffect } from "react";
import { callApi } from "./utils/callApi";

export default function Try() {
    useEffect(() => {
        callApi.get('/hello')
            .then((res) => console.log(res.data))
    }, [])

    return (<>TRY</>)
}