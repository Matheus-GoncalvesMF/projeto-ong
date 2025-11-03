import { initFormValidation } from './modules/form-validator.js';
import { initModalControls } from './utils/ui-feedback.js';
import { initSPANavigation } from './modules/dom-handler.js'; 

document.addEventListener('DOMContentLoaded', () => {
    
    initSPANavigation();

    initFormValidation();

    initModalControls();

    console.log('Os módulos JS estão funcionando e atendem aos requisitos de DOM.');
});