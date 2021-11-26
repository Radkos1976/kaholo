import { Router } from "express";
export const mainroutes = Router();
import RunCMD from "../controler/cmd";

mainroutes.post('/cmd',async (req,res) => {
    const command = req.body.command;
    const result = await RunCMD(command);
    res.send({data: result});
})