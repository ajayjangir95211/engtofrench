const express = require('express');
const translate = require('translator-for-you');


const app = express();
app.use('/assets', express.static('assets'));

app.use(express.json());

app.get('/', (req, res) => {
    const message = "Use POST request to use this API (English to French)";
    res.send(`<h1>${message}</h1>`);
});

app.post('/', async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Missing text to translate' });
    }

    try {
        const translation = await translate(text, 'fr');
        res.json({ translation });
    } catch (error) {
        console.error('Error translating:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(
        `Hello from Cloud Run! The container started successfully and is listening for HTTP requests on ${PORT}`
    );
});
