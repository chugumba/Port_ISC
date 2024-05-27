import $api from "../http";

export default class Contact {
    static async send(name, email, phone, message) {
        return $api.post('/user/contact', {name, email, phone, message });
    }
    static fetchVacancies(){
        return $api.get('/user/vacancies');
    }
}