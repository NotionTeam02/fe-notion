import { Schema, model } from 'mongoose';

const ArticleDescriptionSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String },
  icon: { type: String },
});

const TeamspaceSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String },
  articles: [ArticleDescriptionSchema],
});

const Teamspace = model('Teamspace', TeamspaceSchema);

export default Teamspace;
