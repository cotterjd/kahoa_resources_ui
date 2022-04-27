const url = `http://localhost:4000`
const post = (body, path: string) => {
  return fetch(`${url}/${path}`, {
    method: `POST`,
    headers: {
      'Content-Type': `application/json`,
    },
    body: JSON.stringify(body),
  }).then(r => r.json()).catch(err => {
    console.error(err)
    alert(`Error loging in`)
  }) 
}

export default {
  login: (email: string) => {
    return post({ email }, `login`)
  }
}