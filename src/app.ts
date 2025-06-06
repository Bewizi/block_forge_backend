import express from 'express'
import appConfig from "./shared/config"
import database from "./shared/config/database_config";
import cors from "cors";
import {Request, Response} from "express";

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: ["*"], // Allow all origins (for development only)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}))

// API ROUTES
app.get('/api/text', (req: Request, res: Response) => {
    console.log('>>> GET /api/test endpoint hit');
    console.log('>>> Query params:', req.query);
    console.log('>>> Headers:', req.headers);
    
    console.log('welcome')
    res.status(200).json({
        message: 'Hello Welcome!',
    })
})

app.listen(appConfig.app.port, appConfig.app.host, async () => {
    // await database.sync({force: true})
    await database.sync({alter: true})
    console.log(`app listening on ${appConfig.app.port} on ${appConfig.app.host}`);

})
