import fs from 'fs';
import path from 'path';

const filePath = path.resolve('src', 'models', 'portfolio_data.json');

export const getPortfolioData = () => {
  try {
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, '[]');
      return [];
    }

    const fileData = fs.readFileSync(filePath, 'utf8');
    const parsed = JSON.parse(fileData);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Portfolio data read failed:', error.message);
    return [];
  }
};

const savePortfolioData = (entries) => {
  try {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(entries, null, 2));
    return true;
  } catch (error) {
    console.error('Portfolio data write failed:', error.message);
    return false;
  }
};

const portfolioController = (req, res) => {
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

  const existingData = getPortfolioData();
  existingData.push(portfolioData);
  savePortfolioData(existingData);

  if (req.accepts('html')) {
    return res.redirect('/home?submitted=1');
  }

  return res.status(201).json({
    success: true,
    message: 'Portfolio submitted successfully!',
    data: portfolioData
  });
};

export default portfolioController;