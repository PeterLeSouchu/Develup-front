import { IconType } from 'react-icons';
import { FaReact, FaPhp, FaHtml5, FaCss3Alt, FaNodeJs } from 'react-icons/fa';
import { SiTypescript, SiSass } from 'react-icons/si';

type PreviewProject = {
  title: string;
  rhythm: string;
  description: string;
  technos: { name: string; icon: IconType }[];
  members: string[];
};

// Static showcase content, mirrors real projects published on the platform
const projects: PreviewProject[] = [
  {
    title: "Biblio'dev",
    rhythm: '8 à 12h/semaine',
    description:
      'Un espace pour découvrir, partager et discuter de ses livres préférés.',
    technos: [
      { name: 'PHP', icon: FaPhp },
      { name: 'HTML', icon: FaHtml5 },
      { name: 'CSS', icon: FaCss3Alt },
    ],
    members: ['LM', 'AK'],
  },
  {
    title: 'Plage Party',
    rhythm: '30 à 35h/semaine',
    description:
      'Créer et rejoindre des événements festifs en bord de mer, entre amis.',
    technos: [
      { name: 'React', icon: FaReact },
      { name: 'Sass', icon: SiSass },
      { name: 'Node.js', icon: FaNodeJs },
    ],
    members: ['JB', 'SR', 'EV'],
  },
  {
    title: "Bike'dev",
    rhythm: '2 à 3h/semaine',
    description:
      'Une plateforme conviviale pour les cyclistes de tous niveaux. Front à reprendre, on cherche du renfort.',
    technos: [
      { name: 'React', icon: FaReact },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'Node.js', icon: FaNodeJs },
    ],
    members: ['PL'],
  },
];

function PreviewCard({ project }: { project: PreviewProject }) {
  return (
    <div className="w-full rounded-2xl bg-white2 border border-line p-5 shadow-[0_1px_0_rgba(30,29,27,0.04),0_18px_40px_-20px_rgba(30,29,27,0.35)]">
      <div className="flex items-start justify-between gap-3">
        <p className="font-display font-bold text-xl text-ink leading-tight">
          {project.title}
        </p>
        <span className="shrink-0 rounded-full bg-pollen px-3 py-1 text-xs font-semibold text-ink">
          {project.rhythm}
        </span>
      </div>
      <p className="mt-2 text-sm text-muted leading-relaxed">
        {project.description}
      </p>
      <div className="mt-4 flex items-center justify-between">
        <ul className="flex gap-1.5">
          {project.technos.map(({ name, icon: Icon }) => (
            <li
              key={name}
              className="flex items-center gap-1.5 rounded-md border border-line bg-paper px-2 py-1 text-xs text-ink"
            >
              <Icon aria-hidden className="text-sm" />
              {name}
            </li>
          ))}
        </ul>
        <div className="flex -space-x-2">
          {project.members.map((initials) => (
            <span
              key={initials}
              className="grid place-items-center w-7 h-7 rounded-full border-2 border-white2 bg-ink text-[10px] font-semibold text-white2"
            >
              {initials}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Fanned stack of project cards: the landing page signature element
function ProjectStack({ compact }: { compact: boolean }) {
  const layout = [
    { rotate: '-4deg', delay: '120ms', offset: 'top-0 left-0' },
    { rotate: '3deg', delay: '240ms', offset: 'top-[4.5rem] left-[12%]' },
    { rotate: '-1deg', delay: '360ms', offset: 'top-[9rem] left-[4%]' },
  ];
  return (
    <div
      aria-hidden
      className={`relative mx-auto w-full ${compact ? 'max-w-sm h-[20rem]' : 'max-w-lg h-[21rem]'}`}
    >
      {projects.map((project, i) => (
        <div
          key={project.title}
          className={`dv-fan-card absolute w-[88%] ${layout[i].offset}`}
          style={
            {
              '--dv-rotate': layout[i].rotate,
              '--dv-delay': layout[i].delay,
            } as React.CSSProperties
          }
        >
          <PreviewCard project={project} />
        </div>
      ))}
    </div>
  );
}

export default ProjectStack;
