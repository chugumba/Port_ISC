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
    fetchUsers(){
        
    }
}
