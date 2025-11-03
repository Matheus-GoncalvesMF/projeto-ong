document.addEventListener('DOMContentLoaded', function() {
    
    const successModal = document.getElementById('successModal');

    function hideModal() {
        if (successModal) {
            successModal.style.display = 'none';
        }
    }

    function showModal() {
        if (successModal) {
            successModal.style.display = 'block';
        }
    }

    const closeButtons = successModal ? successModal.querySelectorAll('.close-button, .btn-secondary') : [];
    closeButtons.forEach(button => {
        button.addEventListener('click', hideModal);
    });

    window.addEventListener('click', (event) => {
        if (event.target === successModal) {
            hideModal();
        }
    });


    const form = document.getElementById('cadastroForm');
    const feedbackAlert = document.getElementById('form-feedback');

    if (form) {
        form.addEventListener('submit', function(event) {
            
            feedbackAlert.style.display = 'none';

            if (form.checkValidity() === false) {
                event.preventDefault(); 
                feedbackAlert.style.display = 'block';
                
                form.reportValidity(); 

            } else {
                event.preventDefault(); 
                console.log('Formulário validado com sucesso.');
                
                form.reset();
                showModal();
            }
        });
    }


    const projectTemplate = (data) => `
        <article class="projeto col-span-4" data-project-id="${data.id}">
            <h2>${data.title}</h2>
            <p>${data.description}</p>
        </article>
    `;

    const dynamicContentArea = document.getElementById('projetos-em-destaque');
    if (dynamicContentArea) {
        const data = { id: 99, title: "Card Dinâmico", description: "Este card foi gerado via Template JavaScript." };

    }
    
    
});