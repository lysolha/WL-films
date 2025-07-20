import Button from './Button';

interface Confirmation {
  onConfirm: () => void;
  onCancel: () => void;
  content: string;
}

const Confirmation = ({ onConfirm, onCancel, content }: Confirmation) => {
  const handleConfirm = () => {
    onConfirm();
    onCancel();
  };

  return (
    <div className="flex flex-col gap-10 h-auto flex-grow items-center justify-center p-8">
      <h2 className="text-2xl font-bold text-center text-charcoal-dark">
        {content}
      </h2>
      <div className="flex gap-2 w-full">
        <Button onClick={handleConfirm} className="bg-fresh text-white w-full">
          Yes
        </Button>
        <Button onClick={onCancel} className="bg-burgundy text-white w-full">
          No
        </Button>
      </div>
    </div>
  );
};

export default Confirmation;
