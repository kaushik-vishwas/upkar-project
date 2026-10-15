import AwardRecognition from '../../models/homePage/awardRecognitionModel.js';
import { uploadImageToCloudinary } from '../../config/cloudinaryUpload.js';

// CREATE
export const createAwardRecognition = async (req, res) => {
  try {
    const { title, subtitle } = req.body;

    if (!title || !subtitle) {
      return res.status(400).json({
        message: 'Title and subtitle are required',
      });
    }

    let iconUrl = null;

    if (req.file) {
      const result = await uploadImageToCloudinary(
        req.file.buffer,
        'awardRecognition',
      );
      iconUrl = result.secure_url;
    }

    const data = await AwardRecognition.create({
      title,
      subtitle,
      icon: iconUrl,
    });

    res.status(201).json({
      message: 'Award Recognition created successfully',
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
export const updateAwardRecognition = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle } = req.body;

    const data = await AwardRecognition.findById(id);

    if (!data) {
      return res.status(404).json({ message: 'Award Recognition not found' });
    }

    if (title) data.title = title;
    if (subtitle) data.subtitle = subtitle;

    if (req.file) {
      const result = await uploadImageToCloudinary(
        req.file.buffer,
        'awardRecognition',
      );
      data.icon = result.secure_url;
    }

    await data.save();

    res.status(200).json({
      message: 'Award Recognition updated successfully',
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
export const getAwardRecognition = async (req, res) => {
  try {
    const data = await AwardRecognition.find().sort({ createdAt: -1 });

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// DELETE
export const deleteAwardRecognition = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await AwardRecognition.findById(id);

    if (!data) {
      return res.status(404).json({ message: 'Award Recognition not found' });
    }

    await AwardRecognition.deleteOne({ _id: id });

    res.status(200).json({
      message: 'Award Recognition deleted successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
