import config from "../config";

const authProvider = {

    login: ({ username, password }) => {
        return fetch(`http://${config.ip}:${config.serverPort}/api/login`, {
            method: "POST",
            body: JSON.stringify({ login: username, password }),
            headers: { "Content-Type": "application/json" }
        })
            .then(response => {
                return response.status == 200
                    ? Promise.resolve()
                    : Promise.reject();
            })
            .catch(() => Promise.reject());
    },

    logout: () => {
        return fetch(`http://${config.ip}:${config.serverPort}/api/logout`)
            .then(response => {
                return response.status == 200
                    ? Promise.resolve()
                    : Promise.reject();
            })
            .catch(() => Promise.reject());
    },

    checkAuth: () => {
        return fetch(`http://${config.ip}:${config.serverPort}/api/authenticate`)
            .then(response => {
                return response.status == 200
                    ? Promise.resolve()
                    : Promise.reject();
            })
            .catch(() => Promise.reject());
    },

    getPermissions: () => {
        return fetch(`http://${config.ip}:${config.serverPort}/api/permissions`)
            .then(response => response.json())
            .then(data => Promise.resolve(data.isAdmin))
            .catch(() => Promise.reject());
    },

    checkError: (error) => {
        console.log(error);
    },
};

export default authProvider;