import $api from "../http";

export default class AuthService {
    static async login(username, password) {
        return $api.post('/login/login', { username, password });
    }
    static async registration(username, password, role) {
        return $api.post('/login/registration', { username, password, role });
    }
    static async logout() {
        return $api.post('/login/logout');
    }
}
