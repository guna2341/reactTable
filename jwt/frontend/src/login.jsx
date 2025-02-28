import React, { useState } from 'react'

const Login = ({handleLogin}) => {
    const [name, setName] = useState('');

    async function handleClick() {
        const response = await fetch('http://localhost:8000/login', {
            method: "POST",
            credentials:"include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userName:name
            })
        })
            .then(res => res.json())
            .then(res => console.log(res))
        handleLogin();
    }

  return (
      <div>
          <input name='userName' onChange={e => setName(e.target.value)} />
          <input type='submit' onClick={handleClick}/>
    </div>
  )
}

export default Login;
