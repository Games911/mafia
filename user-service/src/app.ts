import express from 'express';
import auth from './api/routes/auth/auth';
import seed from './api/routes/system/seed';


const app = express();
app.get('/', (req, res) => {
    res.send('Home page! ');
});

app.use('/auth', auth);
app.use('/seed', seed);

export default app;
