import models from '../db/index.js';
import {calculateExpiryDateWithCurrentDate, generateLicenseNo} from "../utils/index.js";

const License = models['License']

export const getAllLicenses = async (req, res) => {
    try {
        const licenses = await License.findAll();
        res.json(licenses);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};


export const createLearningLicense = async (req, res) => {
    const {
        firstName,
        middleName,
        lastName,
        address,
        city,
        town,
        age,
        aadharNo,
        gender,
        aadharUrl
    } = req.body;

    const licenseNo = generateLicenseNo();
    const expiryDate = calculateExpiryDateWithCurrentDate(age, true);

    try {
        const newLicense = await License.create({
            licenseNo,
            firstName,
            middleName,
            lastName,
            address,
            city,
            town,
            age,
            aadharNo,
            gender,
            expiryDate,
            licenseType: "LEARNING",
            aadharUrl
        });

        res.status(201).json(newLicense);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

export const createPermanentLicense = async (req, res) => {
    const {
        firstName,
        middleName,
        lastName,
        address,
        city,
        town,
        age,
        aadharNo,
        gender,
        licenseNo
    } = req.body;

    const expiryDate = calculateExpiryDateWithCurrentDate(age);

    try {
        const license = await License.findOne({where: {licenseNo}});
        const permanentLicense = await license.update({
            firstName,
            middleName,
            lastName,
            address,
            city,
            town,
            age,
            aadharNo,
            gender,
            expiryDate,
            licenseType: "PERMANENT",
            approved: false
        });

        res.status(201).json(permanentLicense);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

export const renewLicense = async (req, res) => {
    const {
        firstName,
        middleName,
        lastName,
        address,
        city,
        town,
        age,
        aadharNo,
        gender,
        licenseNo
    } = req.body;

    const expiryDate = calculateExpiryDateWithCurrentDate(age);

    try {
        const license = await License.findOne({where: {licenseNo}});
        const renewedLicense = await license.update({
            firstName,
            middleName,
            lastName,
            address,
            city,
            town,
            age,
            aadharNo,
            gender,
            expiryDate,
            approved: false
        });

        res.status(201).json(renewedLicense);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};


export const approveLicense = async (req, res) => {
    const {
        licenseNo
    } = req.body;

    if (req.user.type !== "ADMIN") {
        throw new Error("you are not authorized to perform this request")
    }

    try {
        const license = await License.findOne({where: {licenseNo}});
        const renewedLicense = await license.update({
            approved: true
        });
        res.status(201).json(renewedLicense);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

export const getDuplicateLicense = async (req, res) => {
    const {
        firstName,
        middleName,
        lastName,
        address,
        city,
        town,
        age,
        aadharNo,
        gender,
        licenseNo
    } = req.body;

    try {
        const license = await License.findOne({where: {licenseNo}});
        const duplicateLicense = await license.update({
            firstName,
            middleName,
            lastName,
            address,
            city,
            town,
            age,
            aadharNo,
            gender,
            approved: false
        });

        res.status(201).json(duplicateLicense);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};
