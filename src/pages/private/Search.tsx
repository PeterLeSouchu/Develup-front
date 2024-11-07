import { IoSearch } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';

function Search() {
  return (
    <div className="dark:text-black">
      <form
        className="min-h-12  w-3/4 m-auto  sm:bg-white2 sm:dark:bg-slate-200 sm:border-2 rounded-3xl items-center overflow-hidden max-w-4xl min-w-80   "
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
        <div className="flex flex-row h-full sm:m-0 mt-2  items-center bg-white2 sm:bg-transparent dark:bg-slate-200 sm:border-none border-2 rounded-3xl sm:rounded-none overflow-hidden">
          <div className="flex-grow p-1">
            <input
              required
              type="text"
              placeholder="Rechercher une techno"
              className="h-full w-full p-2 outline-none bg-transparent pl-3 rounded-l-3xl"
            />
          </div>
          <span className="w-px h-11 bg-gray-300 hidden sm:block  dark:bg-slate-400 mx-2" />
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
      <div className="mt-4 p-2 w-full rounded-3xl border-2 bg-white2 dark:bg-slate-200 overflow-x-auto whitespace-nowrap">
        <span className="inline-flex items-center gap-1 p-1 rounded-3xl transition bg-slate-200 dark:bg-white2 hover:op mr-2">
          {' '}
          <img
            src="https://i.postimg.cc/JhydY1ZW/7423888-react-react-native-icon.png"
            alt="React"
            className="w-6 h-6 bg-white2 rounded-xl"
          />{' '}
          React
          <button type="button" className="hover:bg-slate-300 rounded-3xl p-1">
            <RxCross2 />
          </button>
        </span>
        <span className="inline-flex items-center gap-1 p-1 rounded-3xl transition bg-slate-200 dark:bg-white2 hover:op mr-2">
          {' '}
          <img
            src="https://i.postimg.cc/JhydY1ZW/7423888-react-react-native-icon.png"
            alt="React"
            className="w-6 h-6 bg-white2 rounded-xl"
          />{' '}
          React
          <button type="button" className="hover:bg-slate-300 rounded-3xl p-1">
            <RxCross2 />
          </button>
        </span>
        <span className="inline-flex items-center gap-1 p-1 rounded-3xl transition bg-slate-200 dark:bg-white2 hover:op mr-2">
          {' '}
          <img
            src="https://i.postimg.cc/JhydY1ZW/7423888-react-react-native-icon.png"
            alt="React"
            className="w-6 h-6 bg-white2 rounded-xl"
          />{' '}
          React
          <button type="button" className="hover:bg-slate-300 rounded-3xl p-1">
            <RxCross2 />
          </button>
        </span>
        <span className="inline-flex items-center gap-1 p-1 rounded-3xl transition bg-slate-200 dark:bg-white2 hover:op mr-2">
          {' '}
          <img
            src="https://i.postimg.cc/JhydY1ZW/7423888-react-react-native-icon.png"
            alt="React"
            className="w-6 h-6 bg-white2 rounded-xl"
          />{' '}
          React
          <button type="button" className="hover:bg-slate-300 rounded-3xl p-1">
            <RxCross2 />
          </button>
        </span>
        <span className="inline-flex items-center gap-1 p-1 rounded-3xl transition bg-slate-200 dark:bg-white2 hover:op mr-2">
          {' '}
          <img
            src="https://i.postimg.cc/JhydY1ZW/7423888-react-react-native-icon.png"
            alt="React"
            className="w-6 h-6 bg-white2 rounded-xl"
          />{' '}
          React
          <button type="button" className="hover:bg-slate-300 rounded-3xl p-1">
            <RxCross2 />
          </button>
        </span>
        <span className="inline-flex items-center gap-1 p-1 rounded-3xl transition bg-slate-200 dark:bg-white2 hover:op mr-2">
          {' '}
          <img
            src="https://i.postimg.cc/JhydY1ZW/7423888-react-react-native-icon.png"
            alt="React"
            className="w-6 h-6 bg-white2 rounded-xl"
          />{' '}
          React
          <button type="button" className="hover:bg-slate-300 rounded-3xl p-1">
            <RxCross2 />
          </button>
        </span>
      </div>
    </div>
  );
}

export default Search;
