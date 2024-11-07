import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import { LogoTechno } from '../../types';

function Search() {
  // simulate db
  const techno = [
    {
      id: 1,
      name: 'react',
      url: 'https://i.postimg.cc/W1M4FJ5d/317755-badge-html-html5-achievement-award-icon.png',
    },
    {
      id: 2,
      name: 'js',
      url: 'https://i.postimg.cc/W1M4FJ5d/317755-badge-html-html5-achievement-award-icon.png',
    },
    {
      id: 2,
      name: 'jll',
      url: 'https://i.postimg.cc/W1M4FJ5d/317755-badge-html-html5-achievement-award-icon.png',
    },
    {
      id: 2,
      name: 'jsk',
      url: 'https://i.postimg.cc/W1M4FJ5d/317755-badge-html-html5-achievement-award-icon.png',
    },
  ];

  const [suggestTechno, setSuggestTechno] = useState<
    { name: string; id: number; url: string }[]
  >([]);

  const [inputValue, setInputValue] = useState<string>('');

  function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.toLowerCase();
    setInputValue(e.target.value);

    const filteredTechno = techno.filter((tech) =>
      tech.name.toLowerCase().includes(value)
    );

    if (value === '') {
      setSuggestTechno([]);
    } else {
      setSuggestTechno(filteredTechno);
    }
  }

  function handleSelectTechno(technoSuggestion: {
    name: string;
    id: number;
    url: string;
  }) {
    console.log(technoSuggestion);
    setSuggestTechno([]);
    setInputValue('');
  }

  // Function to return 5 technos logo and +"x" if necessary for card project
  function technoLogo(array: LogoTechno[]) {
    const displayLimit = 6;
    const extraImagesCount = array.length - displayLimit;

    return (
      <div className="flex gap-2  whitespace-nowrap absolute left-3 bottom-3 ">
        {array.length === 0 ? (
          <p className="text-sm">Aucune techno</p>
        ) : (
          array
            .slice(0, displayLimit)
            .map((logo) => (
              <img
                key={logo.id}
                src={logo.url}
                alt={logo.name}
                className="w-7 h-7 my-2  rounded-xl object-contain bg-white2 p-1"
              />
            ))
        )}
        {extraImagesCount > 0 && (
          <div className="w-6 h-6 my-2 bg-gray-200 dark:bg-gray-400 dark:text-white rounded-xl flex items-center justify-center text-xs text-gray-700">
            +{extraImagesCount}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="dark:text-black">
      <form
        className="min-h-12  w-3/4 m-auto  sm:bg-white2 sm:dark:bg-slate-200 sm:border-2 rounded-3xl items-center  max-w-4xl min-w-80   "
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
        <div className="flex flex-row h-full sm:m-0 mt-2   items-center bg-white2 sm:bg-transparent dark:bg-slate-200 sm:border-none border-2 rounded-3xl  ">
          <div className="relative flex-grow rounded-3xl p-1">
            <input
              onChange={(e) => handleChangeInput(e)}
              required
              value={inputValue}
              type="text"
              placeholder="Rechercher une techno"
              className="h-full w-full p-2  outline-none bg-transparent pl-3 rounded-l-3xl"
            />
            {suggestTechno.length > 0 && (
              <>
                <div
                  aria-label="close side bar"
                  onKeyDown={() => setSuggestTechno([])}
                  role="button"
                  tabIndex={0}
                  className="fixed inset-0 z-20   cursor-default"
                  onClick={() => setSuggestTechno([])}
                />
                <div className="absolute top-full left-0 z-30  p-2  w-full mt-1 dark:bg-white2 bg-slate-300  rounded-md shadow-md  overflow-scroll ">
                  {suggestTechno.map(
                    (suggestion: { name: string; id: number; url: string }) => (
                      <button
                        onClick={() => handleSelectTechno(suggestion)}
                        type="button"
                        className="dark:hover:bg-slate-200 hover:bg-white2 transition w-full flex items-center justify-start gap-2 p-1"
                        key={suggestion.id}
                      >
                        <img
                          src={suggestion.url}
                          alt={suggestion.name}
                          className="h-5"
                        />
                        {suggestion.name}
                      </button>
                    )
                  )}
                </div>
              </>
            )}
          </div>
          <span className="w-px h-11 bg-gray-300 hidden sm:block  dark:bg-slate-400 " />
          <div className="ml-2 flex-grow hidden sm:block">
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
            className="ml-2 px-2 h-12 hover:bg-slate-300 rounded-r-full dark:hover:text-white2 dark:hover:bg-slate-400 transition "
            aria-label="Valider la recherche"
          >
            <IoSearch />
          </button>
        </div>
      </form>
      <div className="mt-4 p-2 w-3/4 mx-auto max-w-4xl min-w-80 rounded-3xl border-2 bg-white2 dark:bg-slate-200 overflow-x-auto whitespace-nowrap">
        <span className="inline-flex items-center gap-1 p-1 rounded-3xl transition bg-slate-200 dark:bg-white2 hover:op mr-2">
          {' '}
          <img
            src="https://i.postimg.cc/JhydY1ZW/7423888-react-react-native-icon.png"
            alt="React"
            className="w-6 h-6 bg-white2 rounded-xl"
          />{' '}
          <p className="hidden sm:block">React</p>
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
          <p className="hidden sm:block">React</p>
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
          <p className="hidden sm:block">React</p>
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
          <p className="hidden sm:block">React</p>
          <button type="button" className="hover:bg-slate-300 rounded-3xl p-1">
            <RxCross2 />
          </button>
        </span>
      </div>
      <section className="flex justify-center gap-6 flex-wrap mt-10">
        <div className="bg-white2 dark:bg-slate-200 h-99 w-72 rounded-lg border-2 p-3 flex flex-col relative ">
          <span className="text-sm absolute right-2 top-2 p-1 bg-gold rounded-xl dark:bg-darkgold">
            5 à 8h/semaine
          </span>
          <img
            className="h-40 mx-auto"
            src="https://i.postimg.cc/G3g0Kh4q/4373213-js-logo-logos-icon.png"
            alt="nextjs"
          />
          <h3 className="text-2xl  my-3 line-clamp-2 break-words">
            Titresddjzkdzzdddddddzdzdzzdzdzddzzzdz
          </h3>
          <p className=" text-sm line-clamp-6  my-3 break-words ">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione
            eius quis odit officia minus necessitatibus corporis magnam quae,
            sunt quosdfddd dzddzdzn
            dzddfzfdzdzdzdzzdkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkzdizdjizejzdikzdjzdizddjzizdjdzizjdizdjzdijzdidzjzdijzdjzdizdjzdidzjdzij
          </p>
          {technoLogo([
            {
              name: 'react',
              id: 1,
              url: 'https://i.postimg.cc/JhydY1ZW/7423888-react-react-native-icon.png',
            },
            {
              name: 'Javacript',
              id: 2,
              url: 'https://i.postimg.cc/G3g0Kh4q/4373213-js-logo-logos-icon.png',
            },
            {
              name: 'Javacript',
              id: 3,
              url: 'https://i.postimg.cc/G3g0Kh4q/4373213-js-logo-logos-icon.png',
            },
            {
              name: 'Javacript',
              id: 4,
              url: 'https://i.postimg.cc/G3g0Kh4q/4373213-js-logo-logos-icon.png',
            },
            {
              name: 'Javacript',
              id: 5,
              url: 'https://i.postimg.cc/G3g0Kh4q/4373213-js-logo-logos-icon.png',
            },
            {
              name: 'Javacript',
              id: 6,
              url: 'https://i.postimg.cc/G3g0Kh4q/4373213-js-logo-logos-icon.png',
            },
            {
              name: 'Javacript',
              id: 7,
              url: 'https://i.postimg.cc/G3g0Kh4q/4373213-js-logo-logos-icon.png',
            },
            {
              name: 'Javacript',
              id: 8,
              url: 'https://i.postimg.cc/G3g0Kh4q/4373213-js-logo-logos-icon.png',
            },
            {
              name: 'Javacript',
              id: 8,
              url: 'https://i.postimg.cc/G3g0Kh4q/4373213-js-logo-logos-icon.png',
            },
            {
              name: 'Javacript',
              id: 8,
              url: 'https://i.postimg.cc/G3g0Kh4q/4373213-js-logo-logos-icon.png',
            },
            {
              name: 'Javacript',
              id: 8,
              url: 'https://i.postimg.cc/G3g0Kh4q/4373213-js-logo-logos-icon.png',
            },
            {
              name: 'Javacript',
              id: 8,
              url: 'https://i.postimg.cc/G3g0Kh4q/4373213-js-logo-logos-icon.png',
            },

            {
              name: 'Javacript',
              id: 8,
              url: 'https://i.postimg.cc/G3g0Kh4q/4373213-js-logo-logos-icon.png',
            },
            {
              name: 'Javacript',
              id: 8,
              url: 'https://i.postimg.cc/G3g0Kh4q/4373213-js-logo-logos-icon.png',
            },
            {
              name: 'Javacript',
              id: 8,
              url: 'https://i.postimg.cc/G3g0Kh4q/4373213-js-logo-logos-icon.png',
            },
          ])}
        </div>
      </section>
    </div>
  );
}

export default Search;
