import { Request, Response } from "express";

export const home = (req: Request, res: Response) => {
    return res.send("Home page");
};

export const about = (req: Request, res: Response) => {
    return res.send("about page");
};
