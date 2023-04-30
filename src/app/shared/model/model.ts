interface AuthResponse {
    jwtToken: string
}

interface UserLogin {
    username: string;
    password: string;
}

interface Education {
    id: number | null;
    title: string | null;
    description: string | null;
    photo: string | null;
    institution: string | null;
    aboutInstitution: string | null;
    indexPosition: number | null;
}

interface Experience {
    id: number | null;
    title: string | null;
    description: string | null;
    photo: string | null;
    institution: string | null;
    aboutInstitution: string | null;
    indexPosition: number | null;
}

interface Skill {
    id: number | null;
    name: string | null;
    level: string | null;
    image: string | null;
}

interface Project {
    id: number | null;
    title: string | null;
    description: string | null;
    photo: string | null;
    institution: string | null;
    aboutInstitution: string | null;
    indexPosition: number | null;
}

export {
    AuthResponse, 
    UserLogin, 
    Education,
    Experience,
    Skill,
    Project
}