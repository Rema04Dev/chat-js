const ru = {
    translation: {
        chatHeader: {
            title: 'Hexlet Chat',
            logOut: 'Выйти'
        },
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
            name: 'Имя канала',
            cancel: 'Отменить',
            send: 'Отправить',
            success: 'Канал создан',
            addChannel: 'Добавить канал',
            validation: {
                length: 'От 3 до 20 символов',
                unique: 'Должно быть уникальным',
                required: 'Обязательное поле',
            }
        },
        renameModal: {
            success: 'Канал переименован',
            name: 'Имя канала',
            cancel: 'Отменить',
            send: 'Отправить',
            validation: {
                length: 'От 3 до 20 символов',
                unique: 'Должно быть уникальным',
                required: 'Обязательное поле',
            }
        },
        removeModal: {
            removeChannel: 'Удалить канал',
            success: 'Канал удалён',
            confirm: 'Уверены?',
            cancel: 'Отменить',
            remove: 'Удалить',
        }
    }
};

export default ru;