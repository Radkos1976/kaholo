import { Router } from "express";
const send= require( "../controler/cmd");
export const mainroutes = Router();

mainroutes
    .post('/cmd',async (req,res) => {
        //try {
            console.log(req.body)
            const StrCommand = req.body.cmd.toString();
            const result = await send.SendCommand(StrCommand);
            res.send({data: result});
        //} catch (e){
        //    res.status(500).send('Error');
        //}
   
    })
    .get('/',async (req,res) => {
    res.render('index');
})