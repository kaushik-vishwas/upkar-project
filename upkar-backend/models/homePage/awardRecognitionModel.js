import mongoose from 'mongoose';

const awardRecognitionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: false,
      default: null,
    },
  },
  { timestamps: true },
);

const AwardRecognition =
  mongoose.models.AwardRecognition ||
  mongoose.model('AwardRecognition', awardRecognitionSchema);

export default AwardRecognition;
