import { useEffect, useState } from "react"
import Login from "./login";
import Posts from "./posts";

function App() {
  const [data, setData] = useState();
  const [post, setPost] = useState(false);

  useEffect(() => {
    async function getData() {
      const response = await fetch("http://localhost:8000")
        .then(res => res.json())
        .then(res => setData(res));
    }
    getData();
  }, [])

  
  return (
    <>
      {data?.map((val) => {
        return (
        <div key={val.name}>
         {val.name} {val.title}
       </div>
        )
      })}
      <Login handleLogin={() => setPost(!post)} />
      <Posts handlePost={post} />
    </>
  )
}

export default App
