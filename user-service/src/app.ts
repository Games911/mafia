import express from 'express';
import auth from "./api/routes/auth/auth";


const app = express();
app.get('/', (req, res) => {
    res.send('Home page!');
});

app.use('/auth', auth);

export default app;
