import mongoose, { Schema, models } from 'mongoose';

const carouselSchema = new Schema(
  {
    image: {
      imageurl: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Carousel = models.Carousel || mongoose.model('Carousel', carouselSchema);

export default Carousel;
