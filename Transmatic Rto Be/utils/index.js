import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

const saltRounds = 10;
export function generateLicenseNo() {
    const fixedPart = 'MH-08';
    const year = new Date().getFullYear().toString().slice(-2);
    const randomDigits = Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number
    return `${fixedPart}${year}${randomDigits}`;
}


export function calculateExpiryDateWithCurrentDate(age, isLearning = false) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    if (isLearning) {
        const expiryDate = new Date(currentYear, currentMonth + 6, 1);
        return `${expiryDate.getFullYear()}-${expiryDate.getMonth() + 1}-${expiryDate.getDate()}`;
    }

    if (age >= 50) {
        const expiryYear = currentYear + 5;
        return `${expiryYear}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
    } else {
        const expiryYear = currentYear + (50 - age);
        return `${expiryYear}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
    }
}

// Function to hash a password
export async function hashPassword(password) {
  try {
      return await bcrypt.hash(password, saltRounds);
  } catch (error) {
    throw new Error('Error hashing password');
  }
}


// Function to check if plain password matches hashed password
export async function checkPassword(plainPassword, hashedPassword) {
  try {
      return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
}

export function generateToken(payload, secretKey, expiresIn) {
  return jwt.sign(payload, secretKey, { expiresIn });
}