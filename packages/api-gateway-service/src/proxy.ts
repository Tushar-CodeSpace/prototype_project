import axios from "axios";
import type { Request, Response } from "express";

const proxy = (baseUrl: string, prefix: string) => {
    return async (req: Request, res: Response) => {
        try {
            // Reconstruct the URL with prefix
            const targetUrl = `${baseUrl}${prefix}${req.path}`;

            const response = await axios({
                url: targetUrl,
                method: req.method as any,
                data: req.body,
                headers: req.headers
            });

            res.status(response.status).json(response.data);
        } catch (err: any) {
            res.status(err.response?.status || 500).json({
                error: err.response?.data || "Gateway Error"
            });
        }
    };
};

export default proxy;