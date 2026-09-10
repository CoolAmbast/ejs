import fs from 'fs';

const porftfolioController = (req, res) => {
  const {
    name,
    email,
    phone,
    dob,
    gender,
    abMe,
    address,
    pincode,
    city,
    state,
    skills,
    qualifications,
    linkedin,
    github
  } = req.body;

  const portfolioData = {
    name,
    email,
    phone,
    dob,
    gender,
    abMe,
    address,
    pincode,
    city,
    state,
    skills,
    qualifications,
    linkedin,
    github
  };

  console.log('Received portfolio data:', portfolioData);
  const filePath = './src/models/portfolio_data.json';

  let existingData = [];

  try {
    const fileData = fs.readFileSync(filePath, 'utf8');

    if (fileData) {
      existingData = JSON.parse(fileData);
      if (!Array.isArray(existingData)) {
        existingData = [];
      }
    }
  } catch (err) {
    console.log('No existing file found, creating new one.');
  }

  existingData.push(portfolioData);

  fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

  res.send('Portfolio submitted successfully!');
};

export default porftfolioController;