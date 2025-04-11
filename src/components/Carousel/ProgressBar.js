import useProgress from './useProgress';

const ProgressBar = ({ animate, time }) => {
  let progress = useProgress(animate, time);
  return (
    <div className="absolute bottom-0 left-0 right-0">
      <div
        style={{
          width: `${progress * 100}%`,
        }}
        className="bg-sky-500 h-[20px]"
      />
    </div>
  );
};

export default ProgressBar;
