document.querySelector('button').addEventListener('click', function(e) {
        e.preventDefault();
        const response = grecaptcha.getResponse();
        if (response.length === 0) {
            alert('Please complete the reCAPTCHA!');
            return;
        }
        document.querySelector('form').submit();
});