const express = require('express');
const cors = require('cors');
const routers = require('./routers');

const PORT = process.env.port || 4000;
const HOSTNAME = process.env.hostname || 'http://localhost';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);  

app.use('/api', routers);

app.use(cors(
    {
        origin: '*'
    }
))

app.use((req, res) => {
    res.status(404).send('Not Found');
});

app.listen(PORT, () => {
    console.log(`Server is running on ${HOSTNAME}:${PORT}`);
}); 