import axios from "axios";

const API_KEY = import.meta.env.VITE_IMAGE_API_KEY;
const Hosting = `https://api.imgbb.com/1/upload?key=${API_KEY}`;

export const imgUpload = async (imageFile) => {
  const res = await axios.post(Hosting, imageFile, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data.data.display_url
};
