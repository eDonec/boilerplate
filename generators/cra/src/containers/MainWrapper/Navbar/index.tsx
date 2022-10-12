import ButtonLink from "core-cra-components/ButtonLink";

import SearchIcon from "components/Icons/SearchIcon";

import DarkModeButton from "./DarkModeButton";
import ProfileAvatar from "./ProfileAvatar";

const Navbar = () => (
  <nav className=" min-h-16 sticky top-0 left-0 right-0  z-[999] bg-gray-900 py-3 shadow-md sm:px-4">
    <div className="max:w-4/5 max:md:w-11/12 flex-no-wrap container mx-auto flex w-4/5 items-end justify-between md:w-11/12">
      <div className="dark my-auto  pr-5">
        <ButtonLink
          to="/"
          primary
          className="flex-col self-center fill-gray-200 align-middle"
        >
          Visiter le site
        </ButtonLink>
      </div>
      <div className="my-auto flex flex-1 justify-end ">
        <div className="relative ml-auto hidden transition-all focus-within:flex-1 md:flex">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon className="text-gray-500" />
          </div>
          <input
            type="text"
            id="search-navbar"
            className="block flex-1 rounded-lg border border-gray-600 bg-gray-700 p-2 pl-10  text-gray-50 placeholder-gray-400 focus:border-gray-400 focus:ring-gray-400 sm:text-sm"
            placeholder="Rechercher un produit..."
          />
        </div>
        <ProfileAvatar />
        <DarkModeButton />
      </div>
    </div>
  </nav>
);

export default Navbar;
