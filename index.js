import 'dotenv/config';
import express from 'express';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';
import multer from 'multer';
import signUpControl from './src/controller/signUpControl.js';
import portfolioController, { getPortfolioData } from './src/controller/portfolioControl.js';

const app = express();
const PORT = process.env.PORT || 3000;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }
});

app.use(expressLayouts);
app.use(express.static(path.resolve('public')));
app.use(express.static(path.resolve('src', 'static', 'css')));
app.use('/uploads', express.static(path.resolve('uploads')));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.resolve('src', 'views'));
app.set('layout', 'homeLayout');

const renderHome = async (req, res) => {
  const portfolioData = await getPortfolioData();
  const submitted = req.query.submitted === '1';

  res.render('home', {
    cssFile: 'portfolioFormStyle',
    portfolioData,
    submitted
  });
};

app.get('/contact', (req, res) => {
  res.render('contact', { cssFile: 'contact' });
});

app.get('/signup', (req, res) => {
  res.render('signup', { cssFile: 'signup' });
});

app.get('/', renderHome);
app.get('/home', renderHome);

app.get('/form', (req, res) => {
  res.render('portfolioForm', { cssFile: 'portfolioFormStyle' });
});

app.get('/api/portfolio', async (req, res) => {
  const data = await getPortfolioData();
  res.json({ success: true, data });
});

app.post('/signup', signUpControl);
app.post('/portfolio', upload.single('resume'), portfolioController);

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
  });
}

export default app;