import mongoose from 'mongoose';

export async function setupMongoDB(url: string) {
  try {
    await mongoose.connect(url);
    console.log('mongoDB connected');
  } catch (error) {
    console.log(error);
  }

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('connected successfully');
  });

  return db;
}
