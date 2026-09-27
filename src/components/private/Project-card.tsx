import { Link } from 'react-router-dom';
import { ProjectType } from '../../types';
import TechnoLogoDisplay from './Techno-logo-display';
import defautlImage from '../../assets/images/default-project-image.jpg';

function ProjectCard({ project }: { project: ProjectType }) {
  return (
    <Link
      className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pollen/60"
      to={`/dashboard/project/${project.slug}`}
    >
      <article className="dv-surface flex h-full flex-col overflow-hidden transition duration-200 group-hover:-translate-y-1 group-hover:border-ink/20 group-hover:shadow-[0_24px_50px_-30px_rgba(30,29,27,0.45)] dark:group-hover:border-night-muted/40">
        <div className="relative">
          <img
            className="aspect-[16/9] w-full object-cover"
            src={project.image || defautlImage}
            alt={project.title}
          />
          <span className="dv-rhythm absolute right-3 top-3 shadow-sm">
            {project.rhythm}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="line-clamp-2 break-words font-display text-xl font-bold leading-tight">
            {project.title}
          </h3>
          <p className="dv-muted mt-2 line-clamp-3 whitespace-pre-wrap break-words text-sm leading-relaxed">
            {project.description}
          </p>
          <div className="mt-auto pt-5">
            {TechnoLogoDisplay(project.techno)}
          </div>
        </div>
      </article>
    </Link>
  );
}
export default ProjectCard;
