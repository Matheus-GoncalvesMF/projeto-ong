import { showModal } from '../utils/ui-feedback.js';

export function initFormValidation() {
    const form = document.getElementById('cadastroForm');
    const feedbackAlert = document.getElementById('form-feedback');


    if (!form) {
        return;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 
        
        feedbackAlert.style.display = 'none';

        if (form.checkValidity() === false) {
            feedbackAlert.style.display = 'block';
            form.reportValidity(); 

        } else {
            console.log('Formulário validado com sucesso. Dados prontos para envio.');
            
            form.reset();

            showModal();
        }
    });
}