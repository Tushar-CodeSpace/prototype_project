import logger from "../utils/logger";

export const register = async (req: any, res: any) => {
    logger.info("Registration attempt");
    res.status(200).json({ message: "Registration successful" });
}

export const login = async (req: any, res: any) => {
    logger.info("Login attempt");
    res.status(200).json({ message: "Login successful" });
}

export const logout = async (req: any, res: any) => {
    logger.info("Logout attempt");
    res.status(200).json({ message: "Logout successful" });
}