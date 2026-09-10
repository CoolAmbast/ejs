import fs from 'fs';
import path from 'path';
import { MongoClient } from 'mongodb';

const filePath = path.resolve('src', 'models', 'portfolio_data.json');
const mongoUri = process.env.MONGODB_URI;
const mongoDbName = process.env.MONGODB_DB;
const mongoCollectionName = process.env.MONGODB_COLLECTION;
let mongoClient = null;

const getLocalPortfolioData = () => {
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

const saveLocalPortfolioData = (entries) => {
  try {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(entries, null, 2));
    return true;
  } catch (error) {
    console.error('Portfolio data write failed:', error.message);
    return false;
  }
};

const getMongoCollection = async () => {
  if (!mongoUri) return null;

  if (!mongoClient) {
    mongoClient = new MongoClient(mongoUri);
  }

  await mongoClient.connect();
  const db = mongoClient.db(mongoDbName);
  return db.collection(mongoCollectionName);
};

export const getPortfolioData = async () => {
  if (mongoUri) {
    try {
      const collection = await getMongoCollection();
      const docs = await collection.find({}).sort({ _id: -1 }).toArray();
      return docs.map(({ _id, ...rest }) => rest);
    } catch (error) {
      console.error('MongoDB portfolio read failed, falling back to local JSON:', error.message);
    }
  }

  const localData = getLocalPortfolioData();
  return localData.reverse();
};

const savePortfolioEntry = async (entry) => {
  if (mongoUri) {
    try {
      const collection = await getMongoCollection();
      await collection.insertOne(entry);
      return true;
    } catch (error) {
      console.error('MongoDB portfolio save failed, falling back to local JSON:', error.message);
    }
  }

  const existingData = getLocalPortfolioData();
  existingData.push(entry);
  return saveLocalPortfolioData(existingData);
};

const portfolioController = async (req, res) => {
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

  await savePortfolioEntry(portfolioData);

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