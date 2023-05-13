//import { login, logout } from '../login.js';
const login = require("../login");
const pet = require("../pet");
const signup = require("../signup");
const user = require("../user");


describe('Test Handlers', function () {

    test('login correct password', async () => {
        const req = {
            body: {
                id: "admin",
                password: "admin"
            }
        };

        const res = {
            response: '',
            code: '200',
            data: '',
            send: function (input) { this.response = input },
            status: function (input) { this.code = input },
            json: function (input) { this.data = input; },
        };
        await login.login(req, res);
        expect(res.data.id).toEqual('admin');
    });
    test('login wrong password', async () => {
        const req = {
            body: {
                id: "admin",
                password: "wrongpassword"
            }
        };

        const res = {
            response: '',
            code: '200',
            data: '',
            send: function (input) { this.response = input },
            status: function (input) { this.code = input },
            json: function (input) { this.data = input; },
        };
        await login.login(req, res);
        expect(res.code).toEqual(400);
        expect(res.response).toEqual("Incorrect Password");
    });
    test('login wrong user', async () => {
        const req = {
            body: {
                id: "wronguser",
                password: "admin"
            }
        };

        const res = {
            response: '',
            code: '200',
            data: '',
            send: function (input) { this.response = input },
            status: function (input) { this.code = input },
            json: function (input) { this.data = input; },
        };
        await login.login(req, res);
        expect(res.code).toEqual(400);
        expect(res.response).toEqual("Invalid Email or Password");
    });
    test('search pets', async () => {
        const req = {
            query: {
                id: "admin",
                searchQuery: "sol"
            }
        };

        const res = {
            response: '',
            code: 200,
            data: '',
            send: function (input) { this.response = input },
            status: function (input) { this.code = input },
            json: function (input) { this.data = input; },
        };
        await pet.search(req, res);
        expect(res.code).toEqual(200);
    });
    test('all pets', async () => {
        const req = {
            query: {
                id: "admin",
                searchQuery: "sol"
            }
        };

        const res = {
            response: '',
            code: 200,
            data: '',
            send: function (input) { this.response = input },
            status: function (input) { this.code = input },
            json: function (input) { this.data = input; },
        };
        await pet.all(req, res);
        expect(res.code).toEqual(200);
    });
    test('allAdmin pets', async () => {
        const req = {
            query: {
                id: "admin",
                searchQuery: "sol"
            }
        };

        const res = {
            response: '',
            code: 200,
            data: '',
            send: function (input) { this.response = input },
            status: function (input) { this.code = input },
            json: function (input) { this.data = input; },
        };
        await pet.allAdmin(req, res);
        expect(res.code).toEqual(200);
    });
    test('deletePet pets', async () => {
        const req = {
            params: {
                id: 1,
            }
        };

        const res = {
            response: '',
            code: 200,
            data: '',
            send: function (input) { this.response = input },
            status: function (input) { this.code = input },
            json: function (input) { this.data = input; },
        };
        await pet.deletePet(req, res);
        expect(res.code).toEqual(200);
    });
    test('sendUsers signup', async () => {
        const req = {
            params: {
                id: 1,
            }
        };

        const res = {
            response: '',
            code: 200,
            data: '',
            send: function (input) { this.response = input },
            status: function (input) { this.code = input },
            json: function (input) { this.data = input; },
        };
        await signup.sendUsers(req, res);
        expect(res.code).toEqual(200);
    });
    test('getUsers user', async () => {
        const req = {
            params: {
                id: 1,
            }
        };

        const res = {
            response: '',
            code: 200,
            data: '',
            send: function (input) { this.response = input },
            status: function (input) { this.code = input },
            json: function (input) { this.data = input; },
        };
        await user.getUsers(req, res);
        expect(res.code).toEqual(200);
    });
    test('getCart user', async () => {
        const req = {
            params: {
                id: "admin",
            }
        };

        const res = {
            response: '',
            code: 200,
            data: '',
            send: function (input) { this.response = input },
            status: function (input) { this.code = input },
            json: function (input) { this.data = input; },
        };
        await user.getCart(req, res);
        expect(res.code).toEqual(200);
    });
    test('getLogs user', async () => {
        const req = {
            params: {
                id: "admin",
            }
        };

        const res = {
            response: '',
            code: 200,
            data: '',
            send: function (input) { this.response = input },
            status: function (input) { this.code = input },
            json: function (input) { this.data = input; },
        };
        await user.getLogs(req, res);
        expect(res.code).toEqual(200);
    });





});