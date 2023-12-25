import Header from "../../components/Header";

export default function ManagerHeader() {
  return (
    <Header>
      <button
        type="button"
        className="mx-3 flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 md:mr-0"
        id="user-menu-button"
        aria-expanded="false"
        data-dropdown-toggle="dropdown"
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="h-8 w-8 rounded-full"
          src="https://picsum.photos/200"
          alt="user photo"
        />
      </button>
    </Header>
  );
}
