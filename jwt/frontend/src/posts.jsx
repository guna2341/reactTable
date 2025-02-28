import React, { useEffect, useState } from 'react'

const Posts = ({handlePost}) => {
    const [data, setData] = useState();

    useEffect(() => {
        async function Data() {
            fetch('http://localhost:8000/posts', {
                method: "Get",
                credentials:"include",
            })
                .then((res) => res.json())
                .then(data => setData(data))
        }
        Data();
    },[handlePost])

  return (
      <div>
          {data}
    </div>
  )
}

export default Posts;
