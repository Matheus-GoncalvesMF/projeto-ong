const successModal = document.getElementById('successModal');

export function initModalControls() {
    if (!successModal) {
        return;
    }

    const closeButtons = successModal.querySelectorAll('.close-button, .btn-secondary');

    closeButtons.forEach(button => {
        button.addEventListener('click', hideModal);
    });

    window.addEventListener('click', (event) => {
        if (event.target === successModal) {
            hideModal();
        }
    });
}

export function showModal() {
    if (successModal) {
        successModal.style.display = 'block';
    }
}

export function hideModal() {
    if (successModal) {
        successModal.style.display = 'none';
    }
}