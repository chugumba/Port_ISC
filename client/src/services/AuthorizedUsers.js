import $api from "../http";

// HR
export class HR {

    static AddVacancy(title, description, requirements, benefits, contactEmail, contactPhone){
        return $api.post('login/vacanciesadd',{withCredentials: true,
            data: 
                title,
                description, 
                requirements, 
                benefits, 
                contactEmail, 
                contactPhone
            })
    }

    static UpdateVacancy(id, title, description, requirements, benefits, contactEmail, contactPhone){
        
        console.log(id, title, description, requirements, benefits, contactEmail, contactPhone)
        
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
