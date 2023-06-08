import { clsx } from "core-utils";

type LabelValueDisplayProps = {
  className?: string;
  label: string;
  value?: string | number;
};

function LabelValueDisplay({
  label,
  value,
  className,
}: LabelValueDisplayProps) {
  if (!value) return null;

  return (
    <div className={clsx(className)}>
      <p>
        <b>{`${label}: `}</b>
        {value}
      </p>
    </div>
  );
}

export default LabelValueDisplay;
