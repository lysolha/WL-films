import { useField } from 'formik';
import { useEffect, useRef } from 'react';
import Button from './Button';

const FileDragAndDropField = ({ name }: { name: string }) => {
  const [field, , helpers] = useField<File | null>(name);
  const inputRef = useRef<HTMLInputElement>(null);

  const resetFileField = () => {
    helpers.setValue(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  useEffect(() => {
    if (!field.value && inputRef.current) {
      inputRef.current.value = '';
    }
  }, [field.value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    helpers.setValue(file ?? null);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    helpers.setValue(file ?? null);
  };

  return (
    <div className="flex gap-2">
      <input
        ref={inputRef}
        id={field.name}
        type="file"
        name={field.name}
        onChange={handleChange}
        accept=".txt,.csv,.json"
        className="hidden"
      />
      <label
        id="file-upload"
        htmlFor={field.name}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="w-full h-full border border-gray-300 rounded-md p-2 cursor-pointer"
      >
        {field.value
          ? 'Uploaded file: ' + (field.value as File).name
          : 'Drag and drop file here or click to select'}
      </label>
      {field.value && (
        <Button type="button" onClick={resetFileField}>
          Reset
        </Button>
      )}
    </div>
  );
};

export default FileDragAndDropField;
