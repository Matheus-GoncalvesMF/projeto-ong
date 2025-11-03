export const projectCardTemplate = ({ title, subtitle, description, imageUrl, altText }) => `
    <article class="projeto col-span-4">
        <img 
            src="${imageUrl}" 
            alt="${altText}" 
            width="500" 
            style="max-width: 100%; height: auto;"
        />
        <h2>${title}</h2>
        <p class="card-subtitle">${subtitle}</p>
        
        <p>${description}</p>
    </article>
`;