import express from 'express';
import { appendFile } from 'fs';
// import http from 'http';
import mongoose, { Error } from 'mongoose';
import { config } from './config/config';
import authorRoutes from './routes/Author'
import bookRoutes from './routes/Book'
// import Logging from './library/Logging';

const router = express()

//connect to mongoose

mongoose.connect(config.mongo.url)
.then(() => {
    console.log('connected')
    startServer();
})
.catch((error) => {
    console.error('unable to connect')
    console.error(error)
})


/* only start server if mongo connects */

const startServer = () => {
    const PORT = config.server.port
    router.use((req, res, next) => {
        console.log(`incoming [${req.method}] url -- [${req.url}]  IP -- [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            console.log(`incoming [${req.method}] url -- [${req.url}]  IP -- [${req.socket.remoteAddress}] status -- [${res.statusCode}`);

        })

        next();
    });
    router.use(express.urlencoded({extended: true}))
    router.use(express.json());

    /* Rules of our API */

    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', /* you canput a list of IPs here to make it super private */'*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-type, Accept, Authorization');

        if(req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }else;

        next();
    })

    /* Routes */

    router.use('/authors', authorRoutes);
    router.use('/books', bookRoutes);

    /* healthcheck */
    router.get('/ping', (req, res) => {
        res.status(200).json({'message': 'pong'});
    })

    /* error handling or 404 route */

    router.use((req, res, next) => {
        // const error = new Error('not found');
        console.log('error')

        return res.sendStatus(404).json({'message': '404 not found'});
    });


    router.listen(PORT, () => console.log(`server listening on https://localhost:${PORT}`))
}