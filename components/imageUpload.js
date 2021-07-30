import { useState } from "react";
import config from "@/config/index";
import styles from "@/style/Form.module.css";
const ImageUpload = ({ event, onUpload }) => {
  const [image, setImage] = useState(null);
  const onInputChange = (e) => setImage(e.target.files[0]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("files", image);
    formData.append("ref", "Events");
    formData.append("refId", event.id);
    formData.append("field", "image");
    try {
      await config.post("/upload", formData);
      onUpload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section>
      <h1>Upload Event Image</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <section className={styles.file}>
          <input type="file" onChange={onInputChange} />
        </section>
        <input type="submit" value="Upload Image" className="btn" />
      </form>
    </section>
  );
};

export default ImageUpload;
