import { Router } from "express";
export const mainroutes = Router();

mainroutes.use((req, res, next) => {
    res.locals.title = "Express App"
    res.locals.session  = req.session    
    next()
  })
mainroutes.post('/cmd',(req,res) => {
    const command = req.body.command;
    
})