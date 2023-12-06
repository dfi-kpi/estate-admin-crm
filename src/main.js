$(document).ready(function(){
    $(":input").inputmask();

    let regex = {
        'firstName': /^[A-Z][a-zA-Z'-]{1,}$/,
        'lastName': /^[A-Z][a-zA-Z'-]{1,}$/,
        'middleName': /^[A-Z][a-zA-Z'-]{1,}$/,
        'email': /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,}$/,
        'birth': /^(?:\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01]))$/,
        'password': /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    };

    let allowReg = true;
    $('input[id]').change((event) => {
        const id = event.target.id;
        const value = event.target.value;
        let errorMessage = '';
        
        if (id === "birth") {
            let today = new Date();
            let date = `${today.getFullYear()}-${(today.getMonth() + 1).toString()}-${today.getDate().toString()}`;
            if (value > date) {
                errorMessage = "Введіть правильну дату!";
            }
        }
        else if (regex[id]) {
            if (!regex[id].test(value)) {
                switch (id) {
                    case "firstName":
                        errorMessage = "Ім'я має починатися з великої літери та мати не менше двох символів! Дозволені лише латинські літери!";
                        break;
                    case "middleName":
                        errorMessage = "Побатькові має починатися з великої літери та мати не менше двох символів! Дозволені лише латинські літери!";
                        break;
                    case "lastName":
                        errorMessage = "Прізвище має починатися з великої літери та мати не менше двох символів! Дозволені лише латинські літери!";
                        break;
                    case "email":
                        errorMessage = "Введена пошта не відповідає існуючим стандартам!";
                        break;
                    case "password":
                        errorMessage = "Довжина паролю не менше 8 символів! Хоча б одна велика літера, одна маленька літера, одна цифра, одни спец символ!";
                        break;
                };
            }
        } 
        $(`#${id}-error`).text(errorMessage);

        const errors = $('.error-message');
        let hasErrors = false;

        errors.each(function() {
            if ($(this).text() !== '') {
                hasErrors = true;
                return false;
            }
        });
        
        if (hasErrors) {
            allowReg = false;
        } else {
            allowReg = true;
        }
        console.log(allowReg);
    });

    $('form').submit((event) => {
        event.preventDefault();

        let middleName = $('#middleName').val();
        let lastName = $('#lastName').val();
        let firstName = $('#firstName').val();
        let birth = $('#birth').val();
        let phone = $('#phone').val();
        let group = $('#groups').val();
        let sex = $('[name=sex]:checked').next('label').text();
        let email = $('#email').val();
        let photo = $('#file').val();
        let password = $('#password').val();

        console.log(allowReg);
        if (allowReg) {
            let html = $('#table-data').html();
            html += `
                <tr>
                    <td style="width: 5px;"><input type="checkbox"></td>
                    <td>${firstName}</td>
                    <td>${lastName}</td>
                    <td>${middleName}</td>
                    <td>${birth}</td>
                    <td>${email}</td>
                    <td>${sex}</td>
                    <td>${phone}</td>
                    <td>${photo}</td>
                    <td>${group}</td>
                    <td>${password}</td>
                </tr>
            `;

            $('#table-data').html(html);
            $('#middleName').val("");
            $('#lastName').val("");
            $('#firstName').val("");
            $('#birth').val("");
            $('#phone').val("");
            $('#email').val("");
            $('#file').val("");
            $('#password').val("");
        }
    });

    $('#btnDel').click((event) => {
        event.preventDefault();

        let checked = Array.from($('#table-data input:checked'));        
        checked.forEach(it => {
            it.parentNode.parentNode.remove()
        });
    });

    $('#btnDup').click((event) => {
        event.preventDefault();

        let checked = Array.from($('#table-data input:checked'));        
        checked.forEach(it => {
            $('#table-data').html($('#table-data').html() + it.parentNode.parentNode.outerHTML);
        });
    });
});