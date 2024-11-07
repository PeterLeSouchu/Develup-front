import { IoSearch } from 'react-icons/io5';

function Search() {
  return (
    <div>
      <form
        className="min-h-12  w-3/4 m-auto dark:text-black sm:bg-white2 sm:dark:bg-slate-200 sm:border-2 rounded-3xl items-center overflow-hidden max-w-4xl min-w-80   "
        onSubmit={(event) => console.log(event)}
      >
        <div className=" block sm:hidden mb-2 mt-4 dark:bg-slate-200 bg-white2 border-2 rounded-3xl p-1 ">
          <select
            required
            className="h-full w-full p-2 outline-none bg-transparent rounded-r-3xl"
          >
            <option value="">Choisir un rythme</option>
            <option value="lent">Lent</option>
            <option value="modéré">Modéré</option>
            <option value="rapide">Rapide</option>
          </select>
        </div>
        <div className="flex flex-row h-full sm:m-0 mt-2  items-center bg-white2 sm:bg-transparent dark:bg-slate-200 sm:border-none border-2 rounded-3xl sm:rounded-none">
          <div className="flex-grow p-1">
            <input
              required
              type="text"
              placeholder="Rechercher une techno"
              className="h-full w-full p-2 outline-none bg-transparent pl-3 rounded-l-3xl"
            />
          </div>
          <span className="w-px h-full bg-gray-300 hidden sm:block  dark:bg-slate-400 mx-2" />
          <div className="flex-grow hidden sm:block">
            <select
              required
              className="h-full w-full p-2 outline-none bg-transparent rounded-r-3xl"
            >
              <option value="">Choisir un rythme</option>
              <option value="lent">Lent</option>
              <option value="modéré">Modéré</option>
              <option value="rapide">Rapide</option>
            </select>
          </div>
          <button
            type="submit"
            className="ml-2 px-2 h-12 hover:bg-slate-300 dark:hover:bg-slate-400 transition "
            aria-label="Valider la recherche"
          >
            <IoSearch />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Search;
