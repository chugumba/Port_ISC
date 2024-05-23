import $api from "../http";

export default class Contact {
    static async send(name, email, phone, message) {
        return $api.post('/user/contact', {name, email, phone, message });
    }
}