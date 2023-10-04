import express from 'express';
import routes from './routes/index';
import mongoose, { ConnectOptions } from 'mongoose';
import UserCollection from './database/models/users.model';
import TaxiCollection from './database/models/taxi.model';
import DriverCollection from './database/models/driver.model';
import {appConfig} from './common/appconfig';
import { GrpcClass } from './utils/grpc';

const PORT = appConfig.env.PORT
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

mongoose.connect(appConfig.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as ConnectOptions);

const grpc = new GrpcClass()
// grpc;

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

    UserCollection;
    TaxiCollection;
    DriverCollection;
});
