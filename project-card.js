class ProjectCard extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const card = document.createElement('div');
        card.className = 'project-card';

        const title = document.createElement('div');
        title.textContent = this.getAttribute('title') || 'Project Title';

        const picture = document.createElement('picture');
        const img = document.createElement('img');

        const imageSrc = this.getAttribute('image');
        if (imageSrc && imageSrc.trim() !== '') {
            img.src = imageSrc;
        }
        else {
            img.src = 'images/default.jpg';
        }

        img.alt = this.getAttribute('alt') || 'Project Image';
        picture.appendChild(img);

        const description = document.createElement('p');
        description.textContent = this.getAttribute('description') || 'Short description of the project.';

        const link = document.createElement('a');
        link.href = this.getAttribute('link') || '#';
        link.textContent = 'Learn More';

        card.appendChild(title);
        card.appendChild(picture);
        card.appendChild(description);
        card.appendChild(link);
    }

    static get observedAttributes() {
        return ['title', 'image', 'alt', 'description', 'link'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .project-card {
                    border: 1px solid #ddd;
                    padding: 15px;
                    border-radius: 8px;
                    max-width: 300px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    transition: transform 0.3s;
                }
                .project-card:hover {
                    transform: translateY(-5px);
                }
                img {
                    max-width: 100%;
                    border-radius: 5px;
                }
            </style>
            <div class="project-card">
                <h2>${this.getAttribute('title') || 'Project Title'}</h2>
                <img src="${this.getAttribute('image') || 'images/default.jpg'}" alt="${this.getAttribute('alt') || 'Project Image'}">
                <p>${this.getAttribute('description') || 'Short description of the project.'}</p>
                <a href="${this.getAttribute('link') || '#'}" target="_blank">Learn More</a>
            </div>
        `;
    }
}

customElements.define('project-card', ProjectCard);