import { Router } from "express";
const send= require( "../controler/cmd");
export const mainroutes = Router();

mainroutes
    .post('/cmd',async (req,res) => {
       
            const StrCommand = req.body.cmd.toString();
            const result = await send.SendCommand(StrCommand);
            res.send({data: result});
    
    })
    .get('/',async (req,res) => {
    res.render('index');
})