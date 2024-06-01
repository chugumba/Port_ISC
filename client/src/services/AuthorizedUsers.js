import $api from "../http";

// HR
export class HR {

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
    
}

// Admin
export class Admin {
    
}
