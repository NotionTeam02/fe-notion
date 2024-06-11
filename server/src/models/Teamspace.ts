import { Schema, model } from 'mongoose';
import { ArticleSchema } from './Article';

const TeamspaceSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true, unique: true },
  articles: [ArticleSchema],
});

const Teamspace = model('Teamspace', TeamspaceSchema);

export default Teamspace;
