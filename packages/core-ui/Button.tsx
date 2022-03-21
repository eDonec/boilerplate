export type ButtonProps = {
  onClick?: () => void;
  title?: string;
};

const Button = ({ onClick, title = 'Boop' }: ButtonProps) => {
  return (
    <button
      className='focus-visible:ring-primary-500 bg-primary-500 border-primary-600 hover:bg-primary-600 active:bg-primary-500 disabled:bg-primary-400 disabled:hover:bg-primary-400 inline-flex items-center rounded border px-4 py-2 font-semibold text-white shadow-sm transition-colors duration-75 hover:text-white focus:outline-none focus-visible:ring disabled:cursor-not-allowed'
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
