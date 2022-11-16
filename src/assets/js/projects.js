class Proyecto {
    constructor(name, description, url, img){
        this.name = name;
        this.description = description;
        this.url = url;
        this.img = img;
    }
}
let proyectos = [];

proyectos.push(new Proyecto("Proyecto 1", "lorem ipsum", "https://example.com", "img/proyecto1.png"));