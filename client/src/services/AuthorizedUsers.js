import $api from "../http";

// HR
export class HR {

    // Вакансии

    static AddVacancy(title, description, requirements, benefits, contactEmail, contactPhone){
        return $api.post('login/vacanciesadd', {
            title,
            description,
            requirements,
            benefits,
            contactEmail,
            contactPhone
        }, { withCredentials: true });
    }

    static UpdateVacancy(id, title, description, requirements, benefits, contactEmail, contactPhone){
        
        return $api.put('login/vacanciesupd', {
            id,
            title,
            description,
            requirements,
            benefits,
            contactEmail,
            contactPhone
        }, { withCredentials: true });
          
    }

    static DeleteVacancy(id) {
        return $api.delete('/login/vacanciesdel', {
            withCredentials: true,
            data: { id }
        });
    }

    // Заявки

    static async getApplications () {
        return await $api.get('/login/applicationget', {withCredentials: true})
    }

    static async updateStatus (status, id) {
        return await $api.put('/login/applicationupd', {
            status,
            id,
        }, {withCredentials: true})
    }
}

// Admin
export class Admin {
    static fetchUsers() {
        return $api.get('/login/users');
    }
    static deleteUser(id) {
        return $api.delete('/login/usersdel', { withCredentials: true, data: {id} })
    }

    static editUser(id, username, password, role, phone, email) {
        return $api.put('/login/usersupd', {
            id, 
            username, 
            password, 
            role, 
            phone, 
            email
        }, {withCredentials: true})
    }

    static registerUser ( username, password, role, phone, email) {
        return $api.post('login/registration',{
            username, 
            password,
            role, 
            phone, 
            email
        }, {withCredentials: true})
    }
}

// Logistics
export class Logistics {

    // Страница прибытия 
    
    // Регистрация прибытия
    static registerArrival ( name, flag, port_of_dep, crew, pier, date) {
        return $api.post('login/shiparrival',{
            name, 
            flag,
            port_of_dep,
            crew,
            pier, 
            date
        }, {withCredentials: true})
    }

    // Регистрация контейнеров
    static registerContainers (containers, arrivalId) {
        return $api.post('login/containersadd', {
           containers,
           arrivalId
        }, {withCredentials: true})
    }

    // Получение информации о заполненности платформ для контейнеров
    static async platformsGet () {
        return ( (await $api.get('login/platformsget', {withCredentials: true})).data.info)
    }

    // Страница платформ
    
    static async containersGet() {
        return ( (await $api.get('login/containersget', {withCredentials: true})).data.info)
    }

    static async containersMove(containerId, newPlatId) {
        return await $api.put('login/containersmove', {containerId, newPlatId}, {withCredentials: true})
    }
    
    static async addDeparture(rowsId, given) {
        return await $api.post('login/departure', {rowsId, given}, {withCredentials: true})
    }

    // Отчёты

    //Прибытия
    static async arrivalsGet() {
        return ( (await $api.get('login/arrivalsget', {withCredentials: true})).data.info)
    }

    static async arrivalContainersGet(id) {
        return ( (await $api.get('login/arrivalcontainersget', {
            params: { id },
            withCredentials: true
        })).data.info)
    }

    //Убытия
    static async departureGroupsGet() {
        return ( (await $api.get('login/departedidget', {withCredentials: true})).data.info)
    }

    static async departedContainersGet(id) {
        return ( (await $api.get('login/departedgroupget', {
            params: { id },
            withCredentials: true
        })).data.info)
    }


}