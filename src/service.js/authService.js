import axios from "axios"

const AUTH_API_URL = "https://localhost:8443"  // dev only

export const authService = {
    
    login(username, password){
        
        return axios
            .post(AUTH_API_URL + "/login", {username, password})
            .then((response) => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data))
                }
                return response.data
            })
    },

    logout() {
        localStorage.removeItem("user")
    },

    register(username, password, confirmPassword, firstname, lastname) {
        
        return axios
            .post(AUTH_API_URL + "/register", {
                username,
                password,
                confirmPassword,
                firstname,
                lastname
            })
    }
}


