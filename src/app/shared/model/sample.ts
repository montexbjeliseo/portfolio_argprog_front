import { Education, Experience, Skill, Project } from "./model"

let EducationSample: Education = {
    id: null,
    title: "Nueva educacion",
    description: "Descripcion educacion",
    photo: "example.png",
    institution: "Nombre de institucion",
    aboutInstitution: "Acerca de la institucion",
    indexPosition: 0
}

class ExperienceSample implements Experience {
    id: number | null;
    title: string | null;
    description: string | null;
    photo: string | null;
    institution: string | null;
    aboutInstitution: string | null;
    indexPosition: number | null;
    constructor() {
        this.id = null;
        this.title = "Nueva experiencia";
        this.description = "Descripcion experiencia";
        this.photo = "example.png";
        this.institution = "Nombre de institucion";
        this.aboutInstitution = "Acerca de la institucion";
        this.indexPosition = 0;
    }
}

let SkillSample: Skill = {
    id: null,
    name: "Nueva habilidad",
    description: "Descripcion"
}

let ProjectSample: Project = {
    id: null,
    title: "Nuevo proyecto",
    description: "Descripcion proyecto",
    photo: "example.png",
    institution: "Nombre de institucion",
    aboutInstitution: "Acerca de la institucion",
    indexPosition: 0
}

export {
    EducationSample,
    ExperienceSample,
    SkillSample,
    ProjectSample
}