const server_url = import.meta.env.VITE_SERVER_URL


export function createUser(user) {
    return fetch(`${server_url}/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
}

export function loginUser(user) {
    console.log(server_url)
    return fetch(`${server_url}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
}

export function editUser(user){
    return fetch(`${server_url}/user`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    })
}

export function deleteUser(user){
    return fetch(`${server_url}/user`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    })
}