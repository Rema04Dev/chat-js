const ru = {
    translation: {
        signup: {
            title: 'Регистрация',
            username: 'Имя пользователя',
            password: 'Пароль',
            confirmPassword: 'Подтвердите пароль',
            submit: 'Зарегистрироваться',
            hasAccount: 'Уже зарегистрированы?',
            validation: {
                usernameLength: 'От 3 до 20 символов',
                passwordLength: 'Не менее 6 символов',
                required: 'Обязательное поле',
                mustMatch: 'Пароли должны совпадать',
                alreadyExists: 'Такой пользователь уже существует',
            }
        },
        login: {
            title: 'Войти',
            username: 'Ваш ник',
            password: 'Пароль',
            submit: 'Войти',
            hasAccount: 'Нет аккаунта?',
            validation: {
                failed: 'Неверные имя пользователя или пароль',
                required: 'Обязательное поле',
            }
        },
        channels: {
            title: 'Каналы',
            remove: 'Удалить',
            rename: 'Переименовать'
        },
        addModal: {
            success: 'Канал создан'
        },
        renameModal: {
            success: 'Канал переименован'
        },
        removeModal: {
            success: 'Канал удалён'
        }
    }
};

export default ru;