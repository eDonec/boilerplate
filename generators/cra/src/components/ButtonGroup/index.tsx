import ButtonGroupButton from "./ButtonGroupButton";

interface IProps<T = unknown> {
  options: {
    id: string;
    label: string;
    value: T;
  }[];
  disabled?: boolean;
  selectedElementId?: string;
  onClick: (value: T) => void;
}
const ButtonGroup = <T,>({
  options,
  disabled,
  onClick,
  selectedElementId,
}: IProps<T>) => {
  const optionCopy = structuredClone(options);
  const firstOption = optionCopy.shift();
  const lastOption = optionCopy.pop();

  if (!firstOption || !lastOption || !optionCopy.length)
    throw new Error("ButtonGroup requires at least 3 options");

  return (
    <div className="inline-flex flex-wrap rounded-md shadow-sm" role="group">
      <ButtonGroupButton
        isActive={firstOption.id === selectedElementId}
        isFirst
        disabled={disabled}
        onClick={() => {
          onClick(firstOption.value);
        }}
      >
        {firstOption.label}
      </ButtonGroupButton>
      {optionCopy.map((option) => (
        <ButtonGroupButton
          isActive={option.id === selectedElementId}
          disabled={disabled}
          key={option.label}
          onClick={() => {
            onClick(option.value);
          }}
        >
          {option.label}
        </ButtonGroupButton>
      ))}
      <ButtonGroupButton
        isLast
        disabled={disabled}
        isActive={lastOption.id === selectedElementId}
        onClick={() => {
          onClick(lastOption.value);
        }}
      >
        {lastOption.label}
      </ButtonGroupButton>
    </div>
  );
};

export default ButtonGroup;
