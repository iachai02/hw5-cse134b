document.addEventListener('DOMContentLoaded', () => {
    const projectList = document.getElementById('project-list');
    const loadlocalBtn = document.getElementById('load-local');
    const loadRemoteBtn = document.getElementById('load-remote');

    const LOCAL_STORAGE_KEY = 'projectsData';
    const REMOTE_URL = 'https://api.jsonbin.io/v3/b/67d7b6128960c979a573113d';

    console.log('Buttons loaded successfully!');

    function displayProjects(projects) {
        console.log('Displaying projects:',projects);

        if (!projects || projects.length === 0) {
            console.error('No project data found!');
            return;
        }

        const projectList = document.getElementById('project-list');
        projectList.innerHTML = '';

        projects.forEach(project => {
            const card = document.createElement('project-card');
            const imagePath = project.image && project.image.trim() !== '' ? project.image : 'images/default.jpg';

            card.setAttribute('title', project.title || 'Untitled Project');
            card.setAttribute('image', imagePath);
            card.setAttribute('alt', project.alt || 'Project Image');
            card.setAttribute('description', project.description || 'No description available.');
            card.setAttribute('link', project.link || '#');
            projectList.appendChild(card);            
        });

        console.log('Projects loaded successfully');
    }

    loadlocalBtn.addEventListener('click', () => {
        const localData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

        console.log('Local Storage Data:', localData);

        if (localData && Array.isArray(localData) && localData.length > 0) {
            displayProjects(localData);
        } else {
            console.error('No valid local data found.');
            alert("No local data found.");
        }
    });

    loadRemoteBtn.addEventListener('click', async () => {
        try {
            const response = await fetch(REMOTE_URL, {
                method: 'GET',
                headers: {
                    'X-Master-Key': '$2a$10$mCQY6KJolHnAkZ/JnDNc2eSee1ViFVN3O7n2qBavSOzu/X8KIFEae',
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const jsonData = await response.json();
            const data = jsonData.record;

            console.log('Fetched Data:', data);
            displayProjects(data);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
        } catch (error) {
            console.error('Error fetching remote data:', error);
        }
    });

    if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
        const sampleData = [
            {
                title: "Uni-Rides Project",
                image: "images/project1_p1.webp",
                alt: "Uni-Rides Project Image",
                description: "This project involves a ride-sharing app for students.",
                modalDescription: "Uni-Rides helps students coordinate trips efficiently.",
                link: "projects.html"
            },
            {
                title: "Gym App",
                image: "images/gym-app.png",
                alt: "Gym App Screenshot",
                description: "A random gym app showcasing video and audio elements.",
                modalDescription: "The Gym App provides interactive workout tracking.",
                link: "projects.html"
            },
            {
                title: "Project 3",
                image: "images/project1_p2.png",
                alt: "Project 3 image",
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
                modalDescription: "Project 3 explores AI automation in web applications.",
                link: "projects.html"
            }
        ];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sampleData));
    }
});