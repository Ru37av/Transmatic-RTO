// src/controllers/userController.js
import models from '../db/index.js';

import dotenv from 'dotenv';
import {checkPassword, generateToken, hashPassword} from "../utils/index.js";
import {ValidationError} from "sequelize";

dotenv.config();

const User = models['User']


export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};


export const signUp = async (req, res) => {
    const {
        email,
        firstName,
        lastName,
        gender,
        phoneNo,
        password
    } = req.body;

    const hashedPassword = await hashPassword(password)
    console.log(hashedPassword)

    try {
        const newUser = await User.create({
            email,
            firstName,
            lastName,
            gender,
            phoneNo,
            password: hashedPassword
        });

        const user = {
            licenseNo: newUser.licenseNo,
            email: newUser.email,
            role: req.isAdmin ? 'ADMIN': 'USER'
        };
        const secretKey = process.env.SECRET_KEY;
        const expiresIn = '1h';
        const token = generateToken(user, secretKey, expiresIn);
        res.status(201).json({token});
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(401).json({error: "email and phone number must be unique"});
        }
        return res.status(500).json({error: error.message});
    }
};


export async function signIn(req, res) {
    const {
        email,
        password
    } = req.body;

    try {
        const user = await User.findOne({where: {email}});
        const isCorrect = await checkPassword(password, user?.password || "");
        if (!user || !isCorrect) {
            return res.status(401).send({error: "invalid credentials"})
        }
        const tokenUser = {
            licenseNo: user.licenseNo,
            email: user.email,
            role: req.isAdmin ? 'ADMIN': 'USER'
        };
        const secretKey = process.env.SECRET_KEY;
        const expiresIn = '1h';
        const token = generateToken(tokenUser, secretKey, expiresIn);
        return res.status(201).json({token});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export async function signOut(req, res) {
    // Assuming 'cookieName' is the name of the cookie you want to remove
    res.cookie('access_token', '', {expires: new Date(0)}); // Setting the expiry date in the past
    res.status(200).json({message: 'Logged out successfully'});
}

