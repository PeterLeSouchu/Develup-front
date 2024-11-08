import { useLoaderData } from 'react-router-dom';
import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import { Technologie, Project, ProjectsAndTechnos } from '../../types';
import axiosWithoutCSRFtoken from '../../utils/request/axios-without-csrf-token';

// eslint-disable-next-line react-refresh/only-export-components
export const loadProjectsAndTechnos = async () => {
  try {
    const { data: dataProject } = await axiosWithoutCSRFtoken.get('/project');
    const { data: dataTechno } =
      await axiosWithoutCSRFtoken.get('/technologie');
    const projects = dataProject.result;
    const technologies = dataTechno.result;
    return { projects, technologies };
  } catch (error) {
    throw new Error("Oops, les données n'ont pas pu être chargées");
  }
};

function Search() {
  // State for the suggest techno (list display below the input)
  const [suggestTechno, setSuggestTechno] = useState<Technologie[]>([]);

  // State for the selected techno (display in a div below form)
  const [technoSelected, setTechnoSelected] = useState<Technologie[]>([]);

  const [inputValue, setInputValue] = useState<string>('');
  const [rhythm, setrhythm] = useState<string>('');
  const [results, setResults] = useState<Project[]>([]);
  const [ErrorMessage, setErrorMessage] = useState<string>('');
  const { projects, technologies } = useLoaderData() as ProjectsAndTechnos;

  // setResults(projects);

  // Function to change rhythm
  const handleChangeRhythm = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setrhythm(e.target.value);
  };

  // Function to change input value and update suggestions
  function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.toLowerCase();
    setInputValue(e.target.value);

    const filteredTechno = technologies.filter((tech) =>
      tech.name.toLowerCase().includes(value)
    );

    if (value === '') {
      setSuggestTechno([]);
    } else {
      setSuggestTechno(filteredTechno);
    }
  }

  // Function to add techno to the search
  function handleSelectTechno(tech: Technologie) {
    setTechnoSelected((prevArray) => {
      if (prevArray.some((technologie) => technologie.id === tech.id)) {
        return prevArray;
      }
      return [...prevArray, tech];
    });
    setSuggestTechno([]);
    setInputValue('');
  }

  // Function to delete techno from the search
  function handleDeleteTechno(tech: Technologie) {
    setTechnoSelected((array) =>
      array.filter((technologie) => technologie.id !== tech.id)
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setErrorMessage('');
    e.preventDefault();
    const technoNameSelected = technoSelected.map((tech) => tech.name);
    if (!rhythm && technoNameSelected.length === 0) {
      return setErrorMessage('Veuillez sélectionner au moins 1 champ');
    }
    const { data } = await axiosWithoutCSRFtoken.post('/search', {
      technoNameSelected,
      rhythm,
    });
    return setResults(data.result);
  }

  // Function to return 5 technos logo and +"x" if necessary for card project
  function technoLogo(array: Technologie[]) {
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
                src={logo.image}
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
        className="min-h-12   w-3/4 m-auto  sm:bg-white2 sm:dark:bg-slate-200 sm:border-2 rounded-3xl items-center  max-w-4xl min-w-80   "
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className=" block sm:hidden mb-2 mt-4 dark:bg-slate-200 bg-white2 border-2 rounded-3xl p-1 ">
          <select
            onChange={(e) => handleChangeRhythm(e)}
            className="h-full w-full p-2 outline-none bg-transparent rounded-r-3xl"
            value={rhythm}
          >
            <option value="">Choisir un rythme</option>
            <option value="1 à 2h/semaine">1 à 2h/semaine</option>
            <option value="2 à 3h/semaine">2 à 3h/semaine</option>
            <option value="3 à 5h/semaine">3 à 5h/semaine</option>
            <option value="5 à 8h/semaine">5 à 8h/semaine</option>
            <option value="8 à 12h/semaine">8 à 12h/semaine</option>
            <option value="12 à 15h/semaine">12 à 15h/semaine</option>
            <option value="15 à 20h/semaine">15 à 20h/semaine</option>
            <option value="20 à 25h/semaine">20 à 25h/semaine</option>
            <option value="25 à 30h/semaine">25 à 30h/semaine</option>
            <option value="30 à 35h/semaine">30 à 35h/semaine</option>
            <option value="+ 35h/semaine">+ 35h/semaine</option>
          </select>
        </div>
        <div className="flex flex-row h-full sm:m-0 mt-2   items-center bg-white2 sm:bg-transparent dark:bg-slate-200 sm:border-none border-2 rounded-3xl  ">
          <div className="relative flex-grow rounded-3xl p-1">
            <input
              onChange={(e) => handleChangeInput(e)}
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
                  {suggestTechno.map((suggestion: Technologie) => (
                    <button
                      onClick={() => handleSelectTechno(suggestion)}
                      type="button"
                      className="dark:hover:bg-slate-200 hover:bg-white2 transition w-full flex items-center justify-start gap-2 p-1"
                      key={suggestion.id}
                    >
                      <img
                        src={suggestion.image}
                        alt={suggestion.name}
                        className="h-5"
                      />
                      {suggestion.name}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          <span className="w-px h-11 bg-gray-300 hidden sm:block  dark:bg-slate-400 " />
          <div className="ml-2 flex-grow hidden sm:block">
            <select
              onChange={(e) => handleChangeRhythm(e)}
              className="h-full w-full p-2 outline-none bg-transparent rounded-r-3xl"
              value={rhythm}
            >
              <option value="">Choisir un rythme</option>
              <option value="1 à 2h/semaine">1 à 2h/semaine</option>
              <option value="2 à 3h/semaine">2 à 3h/semaine</option>
              <option value="3 à 5h/semaine">3 à 5h/semaine</option>
              <option value="5 à 8h/semaine">5 à 8h/semaine</option>
              <option value="8 à 12h/semaine">8 à 12h/semaine</option>
              <option value="12 à 15h/semaine">12 à 15h/semaine</option>
              <option value="15 à 20h/semaine">15 à 20h/semaine</option>
              <option value="20 à 25h/semaine">20 à 25h/semaine</option>
              <option value="25 à 30h/semaine">25 à 30h/semaine</option>
              <option value="30 à 35h/semaine">30 à 35h/semaine</option>
              <option value="+ 35h/semaine">+ 35h/semaine</option>
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
      {ErrorMessage && (
        <p className="text-red-400 mt-1 text-center">
          Veuillez sélectionner au moins 1 champ
        </p>
      )}
      {technoSelected.length > 0 && (
        <div className="mt-4 p-2 w-3/4 dark:border-white2  mx-auto max-w-4xl min-w-80 rounded-3xl border-2 bg-white2 dark:bg-slate-200 overflow-x-auto whitespace-nowrap">
          {technoSelected.map((tech) => (
            <span
              key={tech.id}
              className="inline-flex items-center gap-1 p-1 rounded-3xl transition bg-slate-200 dark:bg-white2 hover:op mr-2"
            >
              {' '}
              <img
                src={tech.image}
                alt={tech.name}
                className="w-6 h-6 bg-white2 rounded-xl"
              />{' '}
              <p className="hidden sm:block">{tech.name}</p>
              <button
                onClick={() => handleDeleteTechno(tech)}
                type="button"
                className="hover:bg-slate-300 rounded-3xl p-1"
              >
                <RxCross2 />
              </button>
            </span>
          ))}
        </div>
      )}

      {results.length > 0 && (
        <p className="text-center mt-5 dark:text-white">
          {results.length} résultat{results.length > 1 ? 's' : ''}
        </p>
      )}
      <section className="flex justify-center gap-6 flex-wrap mt-5">
        {results?.length > 0 ? (
          results?.map((result) => (
            <div
              key={result.id}
              className="bg-white2 dark:bg-slate-200 h-99 w-72 rounded-lg dark:border-white2 border-2 p-3 flex flex-col relative "
            >
              <span className="text-sm absolute right-2 top-2 p-1 bg-gold rounded-xl dark:text-white dark:bg-darkgold">
                {result.rhythm}
              </span>
              <img
                className="h-40 mx-auto"
                src="https://i.postimg.cc/G3g0Kh4q/4373213-js-logo-logos-icon.png"
                alt="nextjs"
              />
              <h3 className="text-2xl  my-3 line-clamp-2 break-words">
                {result.title}
              </h3>
              <p className=" text-sm line-clamp-6  my-3 break-words ">
                {result.description}
              </p>
              {technoLogo(result.techno)}
            </div>
          ))
        ) : (
          <p className="text-xl dark:text-white">Aucun resultat</p>
        )}
      </section>
    </div>
  );
}

export default Search;
