const PAGE_MAPPING = {
    '#home': 'section#hero, section#sobre, section#contato', 
    '#projects': 'section#projetos-em-destaque',
    '#register': 'section#formulario-cadastro',
    '#default': '#hero, #sobre, #contato'
};

function navigate() {
    const hash = window.location.hash || '#home';
    const targetSelectors = PAGE_MAPPING[hash] || PAGE_MAPPING['#default'];
    
    document.querySelectorAll('main section').forEach(section => {
        section.style.display = 'none';
    });

    document.querySelectorAll(targetSelectors).forEach(section => {
        section.style.display = 'block';
    });

    window.scrollTo(0, 0);
}

export function initSPANavigation() {
    document.querySelectorAll('nav a').forEach(link => {
        if (link.hash && link.hash.startsWith('#')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.hash = link.hash;
            });
        }
    });

    window.addEventListener('hashchange', navigate);
    navigate();
}