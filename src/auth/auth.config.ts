import express from 'express';
let jwt = require('jsonwebtoken')

class AuthConfig {

    ensureToken(req: express.Request, res: express.Response, next: express.NextFunction) {
    
        var bearerHeader = req.headers["authorization"]
        
        if(typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(" ")
            const bearerToken = bearer[1]
            jwt.verify(bearerToken, 'secretkey', (err:any, result:any) => {
                if(err) { 
                    res.sendStatus(403) 
                }else{ 
                    next() 
                }
            });
    
        }else {
            res.sendStatus(403)
        }
    }
}



export default new AuthConfig();
