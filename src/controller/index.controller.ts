import { Request, Response } from "express";

class IndexController {
    public static index = (req: Request, res: Response, next: any) => {
        res.render("pages/home", {
            title: "Home Page!"
        });
    }
    public static about = (req: Request, res: Response, next: any) => {
        res.render("pages/about", {
            title: "About Page"
        });
    }
    public static health = (req: Request, res: Response, next: any) => {
        res.render("pages/about", {
            title: "Health Page"
        });
    }
}

export default IndexController;