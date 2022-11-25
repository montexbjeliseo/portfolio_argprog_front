interface AuthResponse {
    jwtToken: string
}

interface UserLogin {
    username: string;
    password: string;
}

interface Education {
    id: number;
    title: string;
    description: string;
    photo: string;
    institution: string;
    aboutInstitution: string;
    indexPosition: number;
}

interface Experience {
    id: number;
    title: string;
    description: string;
    photo: string;
    institution: string;
    aboutInstitution: string;
    indexPosition: number;
}

interface Skill {
    id: number;
    name: string;
    description: string;
}

interface Project {
    id: number;
    title: string;
    description: string;
    photo: string;
    institution: string;
    aboutInstitution: string;
    indexPosition: number;
}

export {
    AuthResponse, 
    UserLogin, 
    Education,
    Experience,
    Skill,
    Project
}