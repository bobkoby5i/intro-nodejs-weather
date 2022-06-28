import express from 'express';
import { router as mocks } from './routes/weather-mocks.js';
import { router as weather } from './routes/weather.js';

const app = express();
app.use(express.static('weather'));

app.use('/mocks', mocks);
app.use('/weather', weather);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

app.listen();
