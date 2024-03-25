import React, {useEffect, useState}  from "react";

  const useFetch = () => {
    const [loading, setLoading] = useState (false);
    const [data, setData] = useState ([]);

   const fetchData = async () => {
        try {
            setLoading (true)    
            const response = await fetch ();
            const data = await response.json ();
            setData (data)
          } catch (error) {
            alert('Erro');
            console.error('Erro', error);
          }finally{
            setTimeout (() => {
                setLoading(false);
            }, 1000)
          }
        };

        useEffect (() => {
            fetchData ()
        },[])

        return {
            data,
            loading,
       }
}

export { useFetch }