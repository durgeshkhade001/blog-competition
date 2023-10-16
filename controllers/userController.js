const nodemailer = require('nodemailer');
const User = require('../models/user');

function signup(req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const rollno = req.body.rollno;
    const password = req.body.password;
    const branch = req.body.branch;
    const year = req.body.year;
    const division = req.body.division;
    const email = req.body.email

    const user = new User({
        firstName: firstName,
        lastName: lastName,
        rollno: rollno,
        password: password,
        branch: branch,
        year: year,
        division: division,
        email: email
    });

    if (user.rollno.length !== 10) {
        return res.status(401).json({ message: "Invalid roll no" });
    }
    // if (!(user.rollno.startsWith('2220') || user.rollno.startsWith('2320'))) {
    //     return res.status(401).json({ message: "Not eligible" });
    // }
    if (!user.email.endsWith('vpt.edu.in')) {
        return res.status(401).json({ message: "Please provide your college email address" });
    }

    user.save()
        .then((result) => {
            sendVerificationEmailCore(result._id, res);
        })
        .catch((error) => {
            res.status(500).json({ error: error });
        });
}

function login(req, res) {
    const rollno = req.body.rollno;
    const password = req.body.password;

    User.findOne({ rollno: rollno })
        .then((user) => {
            if (user) {
                if (user.verified === false) {
                    return res.status(401).json({ error: {message: "Please verify your email first" }});
                }
                user.comparePassword(password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        res.status(200).json({ message: "Login successful", usersecret: user._id });
                    } else {
                        res.status(401).json({ error: {message: "Incorrect password" }});
                    }
                });
            } else {
                res.status(401).json({ error: {message: "This roll no is not registered" }});
            }
        })
        .catch((error) => {
            res.status(500).json({ error: error });
        });
}

function getUserById(req, res) {
    const id = req.params.id;

    User.findById(id)
        .then((user) => {
            if (user) {
                res.status(200).json({ user: user });
            } else {
                res.status(404).json({ message: "User not found" });
            }
        })
        .catch((error) => {
            res.status(500).json({ error: error });
        });
}

function verifyEmail(req, res) {
    const code = req.params.code;

    User.findOne({ verificationCode: code })
        .then((user) => {
            if (user) {
                user.verified = true;
                user.verificationCode = undefined;
                user.save()
                    .then((result) => {
                        res.status(200).json({ message: "Email verified successfully" });
                    })
                    .catch((error) => {
                        res.status(500).json({ error: error });
                    });
            } else {
                res.status(404).json({ message: "User not found" });
            }
        })
        .catch((error) => {
            res.status(500).json({ error: error });
        });
}

function sendVerificationEmailCore(userId, res) {
    
    const code = Math.random().toString(36).slice(2);

    User.findById(userId)
    .then((user) => {
        if (user) {
            if(user.verified) {
                return res.status(401).json({ message: "Email already verified" });
            }
            const mailOfUser = user.email;
            const emailContent = `
                <h1>Verify your email address</h1>
                <p>Click <a href="http://localhost:3000/api/user/verify/${code}">here</a> to verify your email address</p>
                <p>Or copy this link: http://localhost:3000/api/user/verify/${code}</p>
            `;

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'vidyalankarcompetitions@gmail.com',
                    pass: 'kyjzvxrfcfowvtkp'
                }
            });

            const mailOptions = {
                from: 'vidyalankarcompetitions@gmail.com',
                to: mailOfUser,
                subject: 'Verify your email address',
                html: emailContent
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    res.status(500).json({ error: error });
                } else {
                    user.verificationCode = code;
                    user.save()
                        .then((result) => {
                            res.status(200).json({ message: "Verification email sent successfully" });
                        })
                        .catch((error) => {
                            res.status(500).json({ error: error });
                        });
                }
            });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    })
    .catch((error) => {
        res.status(500).json({ error: error });
    });
}

function sendVerificationEmail(req, res) {
    const userId = req.params.id;
    sendVerificationEmailCore(userId, res);
}

function getUserCount(req, res) {
    User.countDocuments({ verified: true })
        .then((count) => {
            res.status(200).json({ count: count });
        })
        .catch((error) => {
            res.status(500).json({ error: error });
        });
}


module.exports = {
    login,
    signup,
    getUserById,
    verifyEmail,
    sendVerificationEmail,
    getUserCount
};
