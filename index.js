const express = require('express');
const translate = require('translator-for-you');


const app = express();
app.use('/assets', express.static('assets'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`<h2>English to French Converter</h2>
    <form action="/" method="post">
        <label for="englishText">Enter English text:</label><br>
        <textarea id="englishText" name="text" rows="4" cols="50"></textarea><br>
        <button type="submit">Convert to French</button>
    </form>`);
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
