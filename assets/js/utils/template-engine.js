export const projectCardTemplate=({title:t,subtitle:a,description:e,imageUrl:c,altText:l})=>`
    <article class="projeto col-span-4">
        <img 
            src="${c}" 
            alt="${l}" 
            width="500" 
            style="max-width: 100%; height: auto;"
        />
        <h2>${t}</h2>
        <p class="card-subtitle">${a}</p>
        
        <p>${e}</p>
    </article>
`;