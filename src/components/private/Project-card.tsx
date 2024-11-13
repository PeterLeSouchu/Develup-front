import { Link } from 'react-router-dom';
import { ProjectType } from '../../types';
import TechnoLogoDisplay from './Techno-logo-display';

function ProjectCard({ project }: { project: ProjectType }) {
  return (
    <div className="bg-white2 dark:bg-slate-200 shadow-lg h-99 w-72 rounded-lg dark:border-white2 border-2 p-3 flex flex-col relative hover:scale-105 transition ">
      <span className="text-sm absolute right-2 top-2 p-1 bg-gold rounded-xl dark:text-white dark:bg-darkgold">
        {project.rhythm}
      </span>
      <Link to={`/dashboard/project/${project.slug}`}>
        <img className="h-40 mx-auto" src={project.image} alt={project.title} />
        <h3 className="text-2xl  my-3 line-clamp-2 break-words">
          {project.title}
        </h3>
      </Link>
      <p className=" text-sm line-clamp-6  my-3 break-words ">
        {project.description}
      </p>
      {TechnoLogoDisplay(project.techno)}
    </div>
  );
}
export default ProjectCard;
