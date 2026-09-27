import axios from 'axios';
import { useLoaderData } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import {
  TechnologieType,
  ProjectType,
  ProjectsAndTechnosType,
} from '../../types';
import axiosWithoutCSRFtoken from '../../utils/request/axios-without-csrf-token';
import { useSettingsStore } from '../../store';
import ProjectCard from '../../components/private/Project-card';
import LoaderWrapper from '../../components/all/loader/Loader-wrapper';
import PageHeader from '../../components/private/ui/Page-header';
import TechnoPicker from '../../components/private/ui/Techno-picker';
import RhythmOptions from '../../components/private/ui/Rhythm-options';

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
    <div>
      <PageHeader
        title="Trouver un projet"
        subtitle="Filtrez par techno et par temps disponible chaque semaine."
        action={null}
      />
      <form
        className="dv-surface grid gap-3 p-3 md:grid-cols-[1fr_16rem_auto] md:items-start"
        onSubmit={(e) => handleSubmit(e)}
      >
        <TechnoPicker
          inputId="search-techno"
          inputValue={inputTechnoValue}
          onInputChange={(e) => handleChangeInput(e)}
          suggestions={suggestTechno}
          onCloseSuggestions={() => setSuggestTechno([])}
          onAdd={(tech) => handleAddTechno(tech)}
          selected={technoSelected}
          onDelete={(tech) => handleDeleteTechno(tech)}
        />
        <select
          onChange={(e) => handleChangeRhythm(e)}
          className="dv-input cursor-pointer"
          value={inputRhythmValue}
          aria-label="Rythme"
        >
          <RhythmOptions />
        </select>
        <button
          type="submit"
          className="dv-btn-primary"
          aria-label="Valider la recherche"
        >
          <IoSearch />
          <span>Rechercher</span>
        </button>
      </form>
      {errorMessage && (
        <p className="mt-3 text-sm font-medium text-[#B23A26] dark:text-[#F08E7C]">
          {errorMessage}
        </p>
      )}

      {isASearch && (
        <p className="dv-muted mt-6 text-sm font-medium">
          {results.length > 0
            ? `${results.length} résultat${results.length > 1 ? 's' : ''}`
            : 'Aucun résultat'}
        </p>
      )}

      <LoaderWrapper>
        <section className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
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
