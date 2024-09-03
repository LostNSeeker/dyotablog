const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require("../models/User");

exports.signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "User already exists" });
        }

        user = new User({
            username,
            email,
            password,
        });

        await user.save();

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            "a5debf3dde6e51c0ea3064175e210589b99335ffa3a53cb51f44999faacfab83f2ce3bc972c43eeba720e5fffaead000b114c109edf92bd4d35776f6c0e4ae2c",
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        // Prepare the JWT payload
        const payload = {
            user: {
                id: user.id,
            },
        };

        // Sign the JWT and include the username in the response
        jwt.sign(
            payload,
            "a5debf3dde6e51c0ea3064175e210589b99335ffa3a53cb51f44999faacfab83f2ce3bc972c43eeba720e5fffaead000b114c109edf92bd4d35776f6c0e4ae2c",
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({
                    token,
                    username: user.username // Include the username in the response
                });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};


exports.forgot_password = async (req,res) =>{
        const { email } = req.body;
      
        try {
          const user = await User.findOne({ email });
          if (!user) {
            return res.status(404).send('No user with that email');
          }
      
          // Generate token
          const token = crypto.randomBytes(20).toString('hex');
      
          // Set token and expiration
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
          await user.save();
      
          // Send email
          const transporter = nodemailer.createTransport({
            service: 'Gmail',
            host:"smtp.gmail.com",
            auth: {
              user: 'prakashbhukya224@gmail.com',
              pass: 'mnckoqvxodvgesom',
            },
            secure:true,
            port:465,
            tls:{
                rejectUnauthorized:false,
            },
            timeout:10000,
          });
      
          const mailOptions = {
            to: user.email,
            from: 'passwordreset@yourapp.com',
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
              Please click on the following link, or paste this into your browser to complete the process:\n\n
              http://localhost:3000/reset-password/${token}\n\n
              If you did not request this, please ignore this email and your password will remain unchanged.\n`,
          };
      
          transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
              console.error('There was an error sending the email:', err);
              return res.status(500).send('Error sending email');
            }
            res.status(200).send('Recovery email sent');
          });
        } catch (error) {
          res.status(500).send('Server error');
        }
      
}

exports.reset_password = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        // Find user by reset token and check if token has expired
        let user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ msg: "Password reset token is invalid or has expired." });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        // Clear reset token and expiration from the user's record
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).json({ msg: "Password has been reset successfully." });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};