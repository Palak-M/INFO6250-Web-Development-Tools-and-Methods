
const register = async ({ email, password, phone, name }) => {

    return fetch("http://localhost:4000/session", {
        method: "POST",
        headers: new Headers({
            "content-type": "application/json",
        }),
        body: JSON.stringify({ email, password, phone, username: name }),
    })
        .catch(() => Promise.reject({ error: "network-error" }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then((err) => Promise.reject(err));
        });

}

const getUser = async ({ sid }) => {
    return fetch(`http://localhost:4000/session?sid=${sid}`, {
        method: "GET",
    })
        .catch(() => Promise.reject({ error: "network-error" }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then((err) => Promise.reject(err));
        });

}

const getData = async ({ sid }) => {
    return fetch(`http://localhost:4000/getData?sid=${sid}`, {
        method: "GET",
    })
        .catch(() => Promise.reject({ error: "network-error" }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then((err) => Promise.reject(err));
        });

}
const changeData = async ({ sid, val }) => {
    console.log(sid,val)
    return fetch(`http://localhost:4000/changeData?sid=${sid}`, {
        method: "POST",
        headers: new Headers({
            "content-type": "application/json",
        }),
        body: JSON.stringify(val)
    })
        .catch(() => Promise.reject({ error: "network-error" }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then((err) => Promise.reject(err));
        });

}


export const endSession = ({sid}) => {
    return fetch(`http://localhost:4000/session?sid=${sid}`, {
        method: "DELETE",
    })
        .catch(() => Promise.reject({ error: "network-error" }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then((err) => Promise.reject(err));
        });
   
};

const authServices = { register, getUser, endSession, getData, changeData };
export default authServices;
