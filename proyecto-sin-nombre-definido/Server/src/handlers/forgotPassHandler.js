const { User } = require('../db.js');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const forgotPassHandler = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.send({ Status: "User not existed" });
        }

        const token = jwt.sign({ id: user.id }, "jwt_secret_key", { expiresIn: "1d" });
        console.log('tokeness', token);
        var transporter = nodemailer.createTransport({
            host: "mail.grupo-cava.com",
              post: 993, // Cambiado de "post" a "port"
              secure: true,
              auth: {
                user: "greatravel@grupo-cava.com",
                pass: "00oscar00"
              },
              tls:{
                rejectUnauthorized:false
              }
        });

        var mailOptions = {
            from: 'greatravel@grupo-cava.com',
            to: email,
            subject: 'Reset Password Link',
            text: `http://localhost:5173/reset_password/${user.id}/${token}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return res.send({ Status: "Error sending email" });
            } else {
                return res.send({ Status: "Success" });
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ Status: "Internal Server Error" });
    }
};

module.exports = forgotPassHandler;
