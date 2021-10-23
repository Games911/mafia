import mongoose, {CallbackWithoutResult} from 'mongoose';
import { mongoUrl }  from './settings';

export const connect = async (uri: string, callback: CallbackWithoutResult) => {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.NODE_ENV === 'test' ? global.__DB_URL__ : mongoUrl, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        }, () => {});
    }
};
