import { Link } from 'react-router-dom';
import technoLogoDisplay from '../../utils/techno-logo-display';

function MyProjects() {
  return (
    <>
      <h1 className="text-3xl text-center mb-20">Vos projets</h1>
      <section className="flex justify-center gap-6 flex-wrap mt-5">
        <div className="bg-white2 dark:bg-slate-200 shadow-lg h-99 w-72 rounded-lg dark:border-white2 border-2 p-3 flex flex-col relative">
          <span className="text-sm absolute right-2 top-2 p-1 bg-gold rounded-xl dark:text-white dark:bg-darkgold">
            1 à 2h/semaine
          </span>
          <Link to="/dashboard/project/slug2">
            <img
              className="h-40 mx-auto"
              src="https://i.postimg.cc/0yng58z6/1012812-code-development-logo-php-icon.png"
              alt="php"
            />
            <h3 className="text-2xl  my-3 line-clamp-2 break-words">
              Le Corridor
            </h3>
          </Link>
          <p className=" text-sm line-clamp-6  my-3 break-words ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
            corporis id consectetur eum excepturi harum vel repudiandae
            molestias asperiores quas impedit debitis quos beatae eligendi cum,
            incidunt saepe delectus soluta!
          </p>
          {technoLogoDisplay([
            {
              name: 'HTML',
              image:
                'https://i.postimg.cc/W1M4FJ5d/317755-badge-html-html5-achievement-award-icon.png',
              id: 1,
            },
            {
              name: 'CSS',
              image:
                'https://i.postimg.cc/FzsPccbN/317756-badge-css-css3-achievement-award-icon.png',
              id: 2,
            },
            {
              name: 'SASS',
              image: 'https://i.postimg.cc/gjZsbWWL/4375066-logo-sass-icon.png',
              id: 3,
            },
            {
              name: 'Javascript',
              image:
                'https://i.postimg.cc/G3g0Kh4q/4373213-js-logo-logos-icon.png',
              id: 4,
            },
          ])}
        </div>
      </section>
    </>
  );
}
export default MyProjects;
