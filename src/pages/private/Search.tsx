import axios from 'axios';
import { useLoaderData } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import {
  TechnologieType,
  ProjectType,
  ProjectsAndTechnosType,
} from '../../types';
import axiosWithoutCSRFtoken from '../../utils/request/axios-without-csrf-token';
import { useSettingsStore } from '../../store';
import ProjectCard from '../../components/private/Project-card';
import LoaderWrapper from '../../components/all/loader/Loader-wrapper';

// eslint-disable-next-line react-refresh/only-export-components
export const loadProjectsAndTechnos = async () => {
  const { setGlobalErrorMessage } = useSettingsStore.getState();
  try {
    const { data: dataProject } = await axiosWithoutCSRFtoken.get('/projects');
    const { data: dataTechno } =
      await axiosWithoutCSRFtoken.get('/technologies');
    const projects = dataProject.result;
    const technologies = dataTechno.result;

    return { projects, technologies };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data.message;
      // here if there's error, it's usually authError (or other unknow error), so we display the globalErrorMessage and force user to close session and login again
      setGlobalErrorMessage(message);
      // Here we have to return something or there's an error
      return 'erreur inattendu';
    }
    setGlobalErrorMessage('Erreur innatendu, essayez de vous reconnecter');
    // Here we have to return something or there's an error
    return 'erreur inattendu';
  }
};

function Search() {
  // Function to display loader component (using during request for search Project)
  const { setLoading, setGlobalErrorMessage } = useSettingsStore();
  // State for the suggest techno (list display below the input)
  const [suggestTechno, setSuggestTechno] = useState<TechnologieType[]>([]);

  // State to display number of result after a search only
  const [isASearch, setIsASearch] = useState<boolean>(false);

  // State for the selected techno (display in a div below form)
  const [technoSelected, setTechnoSelected] = useState<TechnologieType[]>([]);

  // State for inputTechnoValue (use setInputTechnoValue to '' after a submit to empty input and when component demount)
  const [inputTechnoValue, setInputTechnoValue] = useState<string>('');

  // State for rhythm Project
  const [inputRhythmValue, setInputRhythmValue] = useState<string>('');

  // State for result after a search (or initialize Project when launch)
  const [results, setResults] = useState<ProjectType[]>([]);

  // State for error message when no input selected
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Data that contains Projects (for launch) and all Technologie from db for suggestion
  const { projects, technologies } = useLoaderData() as ProjectsAndTechnosType;

  // For initialize page with most recent Project
  useEffect(() => {
    setResults(projects);
    // When user search project and then click on 'search' link in sidebar, we have to set 'isASearch' state at false, to empty errorMessage and to empty technoSelected and rhythm value input or it's display when no search
    return () => {
      setIsASearch(false);
      setTechnoSelected([]);
      setInputRhythmValue('');
      setErrorMessage('');
    };
  }, [projects]);

  // Function to change rhythm
  const handleChangeRhythm = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputRhythmValue(e.target.value);
  };

  // Function to change input value and update suggestions
  function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.toLowerCase();
    setInputTechnoValue(e.target.value);

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
  function handleAddTechno(tech: TechnologieType) {
    setTechnoSelected((prevArray) => {
      if (prevArray.some((technologie) => technologie.id === tech.id)) {
        return prevArray;
      }
      return [...prevArray, tech];
    });
    setSuggestTechno([]);
    setInputTechnoValue('');
  }

  // Function to delete techno from the search
  function handleDeleteTechno(tech: TechnologieType) {
    setTechnoSelected((array) =>
      array.filter((technologie) => technologie.id !== tech.id)
    );
  }

  // Function submit form
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      setErrorMessage('');
      e.preventDefault();
      const technoNameSelected = technoSelected.map((tech) => tech.name);
      if (!inputRhythmValue && technoNameSelected.length === 0) {
        return setErrorMessage('Veuillez sélectionner au moins 1 champ');
      }
      setLoading(true);
      const { data } = await axiosWithoutCSRFtoken.post('/search', {
        technoNameSelected,
        inputRhythmValue,
      });
      setIsASearch(true);
      setResults(data.result);
      return setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data.message;
        if (message === 'Veuillez sélectionner au moins 1 champ') {
          setLoading(false);
          return setErrorMessage(message);
        }
        // here if error is not empty input, it's usually authError (or other unknow error), so we display the globalErrorMessage and force user to close session and login again
        setLoading(false);
        return setGlobalErrorMessage(message);
      }
      setLoading(false);
      return setGlobalErrorMessage(
        'Erreur innatendu, essayez de vous reconnecter'
      );
    }
  }

  return (
    <div className="dark:text-black">
      <form
        className="min-h-12    w-3/4 m-auto  sm:bg-white2 sm:dark:bg-slate-200 sm:border-2 rounded-3xl items-center  max-w-4xl min-w-80   "
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className=" block sm:hidden mb-2 mt-4 dark:bg-slate-200 bg-white2 border-2 rounded-3xl p-1 ">
          <select
            onChange={(e) => handleChangeRhythm(e)}
            className="h-full w-full p-2 outline-none bg-transparent rounded-r-3xl"
            value={inputRhythmValue}
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
              value={inputTechnoValue}
              type="text"
              placeholder="Rechercher une techno"
              className="h-full w-full p-2  outline-none bg-transparent pl-3 rounded-l-3xl"
            />
            {suggestTechno.length > 0 && (
              <>
                <div
                  aria-label="close suggest techno"
                  onKeyDown={() => setSuggestTechno([])}
                  role="button"
                  tabIndex={0}
                  className="fixed inset-0 z-20   cursor-default"
                  onClick={() => setSuggestTechno([])}
                />
                <div className="absolute top-full left-0 z-30  p-2  w-full mt-1 dark:bg-white2 bg-slate-300  rounded-md shadow-md  max-h-56 overflow-scroll ">
                  {suggestTechno.map((suggestion: TechnologieType) => (
                    <button
                      onClick={() => handleAddTechno(suggestion)}
                      type="button"
                      className="dark:hover:bg-slate-200 hover:bg-white2 transition w-full flex items-center justify-start gap-2 p-1"
                      key={suggestion.id}
                    >
                      <img
                        src={suggestion.image}
                        alt={suggestion.name}
                        className="h-9 p-1 bg-white2 rounded-xl"
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
              value={inputRhythmValue}
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
      {errorMessage && (
        <p className="text-red-400 mt-1 text-center">{errorMessage}</p>
      )}
      {technoSelected.length > 0 && (
        <div className="mt-4  p-2 w-3/4 dark:border-white2  mx-auto max-w-4xl min-w-80 rounded-3xl border-2 bg-white2 dark:bg-slate-200 overflow-x-auto whitespace-nowrap">
          {technoSelected.map((tech) => (
            <span
              key={tech.id}
              className="inline-flex items-center gap-1 p-2 rounded-3xl transition bg-slate-200 dark:bg-white2 hover:op mr-2"
            >
              {' '}
              <img
                src={tech.image}
                alt={tech.name}
                className="w-7 h-7 p-1  bg-white2 rounded-lg "
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

      {isASearch && (
        <p className="text-center mt-5 dark:text-white">
          {results.length > 0
            ? `${results.length} résultat${results.length > 1 ? 's' : ''}`
            : 'Aucun résultat'}
        </p>
      )}

      <LoaderWrapper>
        <section className="flex justify-center mt-12 gap-8 flex-wrap ">
          {results?.length > 0 &&
            results?.map((result) => (
              <ProjectCard key={result.id} project={result} />
            ))}
        </section>
      </LoaderWrapper>
    </div>
  );
}

export default Search;
