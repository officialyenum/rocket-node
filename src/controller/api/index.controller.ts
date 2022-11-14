import { Request, Response } from "express";

class IndexController {
    public static index = (req: Request, res: Response, next: any) => {
        res.json({
            message: "Home Page!"
        });
    }
    public static health = (req: Request, res: Response, next: any) => {
        res.status(200).json({
            message: 'pong'
        });
    }
}

export default IndexController;