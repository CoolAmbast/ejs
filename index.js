import express from 'express';
import path from 'path';

const app = express();

app.use(express.static(path.resolve('public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.resolve('src', 'views'));

/*app.get('/', (req, res) => {
  res.render('home');
});*/

app.get('/', (req, res) => {
  res.render('portfolioForm');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});