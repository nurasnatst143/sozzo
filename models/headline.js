import mongoose, { Schema, models } from 'mongoose';

const headlineSchema = new Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Headline = models.Headline || mongoose.model('Headline', headlineSchema);

export default Headline;
