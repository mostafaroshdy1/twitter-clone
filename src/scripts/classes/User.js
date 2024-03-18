export { User };

class User {
    #name
    #password
    #email
    #img

    constructor(name, password, email) {
        this.name = name;
        this.password = password;
        this.email = email;
    }

    get name() {
        return this.#name;
    }

    get password() {
        return this.#password;
    }

    get email() {
        return this.#email;
    }
    get img() {
        return this.#img;
    }
    // to be implemented by Nada
    // set img() {
    // }

    set name(name) {
        this.#name = name;
    }

    set password(password) {
        // Check if the password meets the condition before setting it
        if (/(?=.*[a-zA-Z]).{9,}/.test(password)) {
            this.#password = password;
        } else {
            throw new Error('Password must contain at least one letter and be at least 9 characters long');
        }
    }

    set email(email) {
        // Check if the email is valid before setting it
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            this.#email = email;
        } else {
            throw new Error('Invalid email address');
        }
    }
    toJSON() {
        return {
            name: this.name,
            password: this.password,
            email: this.email
        };
    }

    // use User.parse to parse the user from localStorage instead of JSON.parse
    static parse(json) {
        const data = JSON.parse(json);
        const user = new User(data.name, data.password, data.email);

        // user.img = data.img; // after the img is been implemented by Nada

        return user;
    }
}