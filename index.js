import express from 'express';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';

const app = express();
// uhhhh.....express layout setup ig
app.use(expressLayouts);
app.use(express.static(path.resolve('public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve('src', 'static', 'css')));

app.set('view engine', 'ejs');
app.set('views', path.resolve('src', 'views'));
app.set('layout', 'homeLayout');


app.get('/contact', (req, res) => {
  res.render('contact', { cssFile: 'contact' });
});
app.get('/signup', (req, res) => {
  res.render('signup', { cssFile: 'signup' });
});
app.get('/', (req, res) => {
  res.render('home',{ cssFile: 'home' });
});
app.get('/form', (req, res) => {
  res.render('portfolioForm', { cssFile: 'portfolioFormStyle' });
});


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});