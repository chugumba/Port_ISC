import $api from "../http";
export default class UserService {
    static fetchUsers() {
        return $api.get('/login/users');
    }
}
