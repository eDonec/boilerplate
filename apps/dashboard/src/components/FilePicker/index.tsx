import { RawFilePicker } from "forms";

const FilePicker = () => (
  <RawFilePicker
    name="image"
    label="Click to select image"
    accept=".jpeg,.jpg,.png,.docx,.pptx,.pdf,.xlsx"
    maxFiles={10}
  ></RawFilePicker>
);

export default FilePicker;
