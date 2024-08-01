// src/controllers/userController.js
import models from '../db/index.js';

import dotenv from 'dotenv';
import {generateOwnerSerialNo} from "../utils/index.js";

dotenv.config();

const Hypothication = models['Hypothication']

export async function createHypothicationRequest(req, res) {

    const {
        vehicleNo,
        chassisNo,
        fuelType,
        engineNo,
        hypothicationCompany,
        address,
        ownerName,
        registrationDate,
        registrationValidty
    } = req.body;

    try {
        const hypothication = await Hypothication.create({
            vehicleNo,
            chassisNo,
            fuelType,
            engineNo,
            hypothicationCompany,
            address,
            ownerName,
            ownerSerialNo: generateOwnerSerialNo(),
            registrationDate,
            registrationValidty
        });

        return res.status(201).json(hypothication);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
