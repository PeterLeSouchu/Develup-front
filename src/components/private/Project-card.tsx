import { Link } from 'react-router-dom';
import { ProjectType } from '../../types';
import TechnoLogoDisplay from './Techno-logo-display';

function ProjectCard({ project }: { project: ProjectType }) {
  return (
    <article className="bg-white2 dark:bg-slate-200 shadow-md dark:shadow-stone-900  h-99 w-72 dark:shadow-none rounded-lg flex flex-col relative hover:scale-105 hover:shadow-xl transition ">
      <span className="text-sm absolute right-2 top-2 p-1 bg-gold rounded-xl  dark:bg-darkgold">
        {project.rhythm}
      </span>
      <Link to={`/dashboard/project/${project.slug}`}>
        <img
          className="h-40 mx-auto w-full rounded-t-lg object-cover"
          src={project.image}
          alt={project.title}
        />
        <h3 className="text-2xl  my-3 line-clamp-2 break-words font-bold pl-3">
          {project.title}
        </h3>
      </Link>
      <div className="p-3">
        <p className=" text-sm line-clamp-6  my-3 break-words whitespace-pre-wrap ">
          {project.description}
        </p>
        {TechnoLogoDisplay(project.techno)}
      </div>
    </article>
  );
}
export default ProjectCard;
