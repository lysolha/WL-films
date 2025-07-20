import { useField } from 'formik';
import { useEffect, useRef } from 'react';
import Button from './Button';

const FileDragAndDropField = ({ name }: { name: string }) => {
  const [field, meta, helpers] = useField<File | null>(name);
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
    <div className="flex flex-col gap-2 flex-grow">
      <input
        ref={inputRef}
        id={field.name}
        type="file"
        name={field.name}
        onChange={handleChange}
        accept=".txt"
        className="hidden"
      />
      <label
        id="file-upload"
        htmlFor={field.name}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="w-full h-auto rounded-md p-4 cursor-pointer flex flex-grow items-center justify-center border-dashed border-2
         border-charcoal-dark hover:bg-charcoal-dark/20 transition-colors duration-300 text-charcoal-dark"
      >
        {field.value
          ? 'Uploaded file: ' + (field.value as File).name
          : 'Drag and drop file here or click to select'}
      </label>
      {field.value && (
        <div className="flex gap-2 justify-between">
          {meta.error && (
            <p className="text-red-500 text-sm text-center">{meta.error}</p>
          )}
          <Button
            type="button"
            onClick={resetFileField}
            className="self-end w-fit"
          >
            Reset
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileDragAndDropField;
