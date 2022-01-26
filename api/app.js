import express from 'express';

const app = express();
const router = express.Router();
const port = 8000;

const routes = {
    tanks: require('./routes/tanks')
}

router.get('/', (req, res) => {
    let data = [];
    for(let i = 0; i < 1000; i++) {
        let rnd = Math.floor(Math.random() * 100);
        data.push(rnd + Math.random());
    }
    res.json(data);
});

app.use('/', router);
router.use('/tanks', routes.tanks);

app.listen(port, () => {
    console.log(`Uruchomiono app na porcie ${port}`);
})