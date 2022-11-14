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
}

export default IndexController;