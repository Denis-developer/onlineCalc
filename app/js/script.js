document.addEventListener('DOMContentLoaded', function () {

    const tabs = document.querySelectorAll('.tabs'),
        tabsTransition = 500;

    for (let i = 0; i < tabs.length; i++) {
        const tab = tabs[i].querySelectorAll('.tab'),
            tabsParent = tabs[i].closest('.tabs__parrent'),
            tabsContent = tabsParent.querySelectorAll('.tabs__content'),
            tabsContentWrapper = tabsParent.querySelector('.tabs__wrapper');

        for (let z = 0; z < tab.length; z++) {
            tab[z].addEventListener('click', function () {

                for (let y = 0; y < tab.length; y++) {
                    tab[y].classList.remove('active');
                    tab[z].classList.add('active');
                    tabsContent[y].style.opacity = '0';
                    tabsContentWrapper.style.minHeight = tabsContent[z].clientHeight + "px";
                    setTimeout(function () {
                        tabsContent[y].classList.remove('active');
                        tabsContent[z].classList.add('active');
                    }, tabsTransition)
                    setTimeout(function () {
                        tabsContent[z].style.opacity = '1';
                    }, tabsTransition + 10)
                }

            })
        }

    }

    let select = function () {
        let selectHeader = document.querySelectorAll('.select-header'),
            selectItem = document.querySelectorAll('.select-body__item');

        selectHeader.forEach(item => {
            item.addEventListener('click', selectToggle);
        });

        selectItem.forEach(item => {
            item.addEventListener('click', selectChoose);
        });

        function selectToggle() {
            this.parentElement.classList.toggle('is-active');
            this.querySelector('.select-header__icon').classList.toggle('select-header__icon_active');
        }

        function selectChoose() {
            let text = this.innerText,
                select = this.closest('.select'),
                currentText = this.closest('.select').querySelector('.select-header__item'),
                selectArrow = this.closest('.select').querySelector('.select-header__icon');
            currentText.innerText = text;
            select.classList.remove('is-active');
            selectArrow.classList.remove('select-header__icon_active');
        }
    }

    select();

    const showFullText = document.querySelectorAll('.article__link');

    for (let i = 0; i < showFullText.length; i++) {
        showFullText[i].addEventListener('click', function (e) {
            e.preventDefault();
            const articleParent = showFullText[i].closest('article');

            if (articleParent.classList.contains('show')) {
                showFullText[i].innerHTML = "Подробнее";
            }
            else {
                showFullText[i].innerHTML = "Скрыть";
            }

            articleParent.classList.toggle('show');
        })
    }


    const form = document.querySelectorAll('.form');

    for (let i = 0; i < form.length; i++) {
        const formUsername = form[i].querySelector('.main-form__input[name="username"]'),
            formTel = form[i].querySelector('.main-form__input[name="tel"]');

        let formSuccess = 0;
        let formInput = 0;

        form[i].addEventListener('submit', function (e) {
            e.preventDefault();
            formSuccess = 0;
            formInput = 0;
            validateInputs();
            if (formSuccess == formInput) {
                // form.submit();
            }
        })

        const setError = (element) => {
            element.classList.add('error');
            element.classList.remove('success');
        }

        const setSuccess = (element) => {
            element.classList.add('success');
            element.classList.remove('error');
        }

        const isValidTel = tel => {
            const re = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
            return re.test(String(tel).toLowerCase());
        }

        const isValidName = name => {
            // ^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$
            const re = /^[a-zA-Zа-яА-ЯёЁ'][a-zA-Z-а-яА-ЯёЁ' ]+[a-zA-Zа-яА-ЯёЁ']?$/;
            return re.test(String(name));
        }

        const validateInputs = () => {

            // Username validate
            if (formUsername) {
                formInput++;
                const usernameValue = formUsername.value.trim();
                if (usernameValue === "") {
                    setError(formUsername);
                }
                else if (!isValidName(usernameValue)) {
                    setError(formUsername);
                }
                else {
                    setSuccess(formUsername);
                    formSuccess++;
                }
            }

            // Telephone validate
            if (formTel) {
                formInput++;
                const telValue = formTel.value.trim();
                if (telValue === "") {
                    setError(formTel);
                }
                else if (!isValidTel(telValue)) {
                    setError(formTel);
                }
                else {
                    setSuccess(formTel);
                    formSuccess++;
                }
            }
        }
    }

    const calcInput = document.querySelector('.calc-option__input input');

    calcInput.addEventListener('keyup', function (e) {
        if (e.keyCode < 48 || e.keyCode > 57) {
            this.value = this.value.replace(/[^\d]/g, '');
        }
        else {
            let inputValue = this.value.replace(/ /g, '');
            var outrez = (inputValue + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
            this.value = outrez;
        }

    })

});

