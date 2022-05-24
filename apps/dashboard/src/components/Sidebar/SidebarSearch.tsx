import SearchIcon from "components/Icons/SearchIcon";

interface Props {
  onChange: (value: string) => void;
}
const SidebarSearch: React.FC<Props> = ({ onChange }) => (
  <div className="mt-2 flex w-full justify-center border-t border-gray-700 pl-6 pr-4">
    <div className="relative min-w-full">
      <input
        className="w-full rounded bg-transparent py-2 pr-5 text-lg text-gray-50 focus:outline-none "
        type="text"
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search"
      />
      <div className="absolute right-0 top-0 bottom-0 m-auto ml-4 h-4 w-6 text-gray-500">
        <SearchIcon />
      </div>
    </div>
  </div>
);

export default SidebarSearch;
