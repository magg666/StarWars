$(document).ready(function() {
    $('#login-form').on('submit', function(event) {
        $.ajax({
            data: {
                username: $('#username').val(),
                password: $('#password').val()
            },
            type: 'POST',
            url: '/login'
        })
            .done(function(data) {

			if (data.error) {
				$('#errorAlert').text(data.error).show();
				$('#successAlert').hide();
			}
			else {
				$('#successAlert').text('Welcome '+ data.username).show();
				$('#errorAlert').hide();

				document.cookie = `username=${$('#username').val()}`;
				setTimeout(function (){fresh()}, 2000);
			}
            });
    event.preventDefault();
    });
});

function fresh(){
    location.reload()
}


$(document).ready(function() {
    $('#register-form').on('submit', function(event) {
        $.ajax({
            data: {
                login: $('#new_username').val(),
                pass: $('#new_password').val(),
                secondpass: $('#password_verify').val()
            },
            type: 'POST',
            url: '/registration'
        })
            .done(function(data) {

			if (data.error) {
				$('#registrationError').text(data.error).show();
				$('#registrationSuccess').hide();
			}
			else {
				$('#registrationSuccess').text('Welcome '+ data.login).show();
				$('#registrationError').hide();
				setTimeout(function (){fresh()}, 2000);

			}
            });
    event.preventDefault();
    });
});