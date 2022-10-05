const db = require("../../db/authDb");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config()

class AuthController {

    async Login(req, res) {
        const email = req.body.email;
        const password = req.body.password
        const param = [email]
        const queryUser = `SELECT password,email,isrole,id FROM users WHERE email=$1 `;
        try {
            let result = await db.query(queryUser, param).catch(console.log);

            if (!result.rowCount) {
                return res.status(400).send('Nie ma takiego użytkownika');
            }
            if (await bcrypt.compare(password, result.rows[0].password)) {
                const payload = { email, password };
                const token = jwt.sign(payload, process.env.ACCESS_TOKEN);
                const response = {
                    idUser: result.rows[0].id,
                    email: result.rows[0].email,
                    token: token,
                    isrole: result.rows[0].isrole
                }
                res.status(200).json(response);
            } else {
                res.status(400).send('Błędne dane logowania');
            }
        } catch (ex) {
            console.log(ex.toString());
        }
    }

    async Register(req, res) {
        const email = req.body.email;
        try {
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(req.body.password, salt)
            const name = req.body.name
            const param = [email, passwordHash, name]
            const queryUsers = `INSERT INTO users(email,password,name,isrole) VALUES ($1,$2,$3,false)`;

            let result = await db.query(queryUsers, param).catch(console.log);

            if (!result.rowCount) {
                res.sendStatus(401);
            } else {
                res.status(200).json(result)
            }
        } catch (ex) {
            console.log(ex.toString());
        }
    }
    async UpdateUser(req, res) {
        const email = req.body.email;
        const id = req.body.userId;
        try {
            if (req.body.password) {
                const salt = await bcrypt.genSalt();
                const passwordHash = await bcrypt.hash(req.body.password, salt);
                const param = [email, passwordHash, id];
                const queryUpdateUser = `UPDATE users SET email=$1,password=$2 WHERE id=$3`;

                let result = await db.query(queryUpdateUser, param).catch(console.log);

                if (!result.rowCount) {
                    res.status(400).send('Aktualizacja danych nie powiodła się')
                } else {
                    const response = {
                        idUser: id,
                        email: email,
                    }
                    res.status(200).json(response);
                }
            } else {
                const param = [email, id];
                const queryUpdateUser = `UPDATE users SET email=$1 WHERE id=$2`;
                let result = await db.query(queryUpdateUser, param).catch(console.log);

                if (!result.rowCount) {
                    res.status(400).send('Aktualizacja danych nie powiodła się')
                } else {
                    const response = {
                        idUser: id,
                        email: email,
                    }
                    res.status(200).json(response);
                }
            }
        } catch (ex) {
            console.log(ex.toString());
        }
    }

    async DeleteUsers(req, res) {
        const id = [req.body.id];
        const queryDeleteUser = `DELETE FROM users WHERE id=$1 RETURNING * `;
        try {
            let result = await db.query(queryDeleteUser, id).catch(console.log);
            if (!result.rowCount) {
                return res.status(400).send('Usunięto 0 użytkowników');
            }
            res.status(200).json(result.rows);
        } catch (ex) {
            console.log(ex.toString());
        }
    }

    async ShowUsers(req, res) {
        const queryUser = `SELECT * FROM users `;
        try {
            let result = await db.query(queryUser).catch(console.log);

            if (!result.rowCount) {
                return res.status(400).send('Brak użytkowników');
            }
            res.status(200).json(result.rows);
        } catch (ex) {
            console.log(ex.toString());
        }
    }
}

module.exports = new AuthController();