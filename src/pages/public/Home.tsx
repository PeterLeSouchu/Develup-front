import { LuClock, LuSparkles, LuTrendingUp } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import ProjectStack from '../../components/public/Project-stack';
import homeImage from '../../assets/images/home-image.png';
import conversationImage from '../../assets/images/conversation-image.png';
import conversationMobileImage from '../../assets/images/conversationMobile-image.png';
import homeMobileImage from '../../assets/images/homeMobile-image.png';

const features = [
  {
    title: 'Trouvez un projet à votre rythme',
    text: "Parcourez les projets en cours, filtrez par techno et par nombre d'heures disponibles chaque semaine. Rejoignez une équipe motivée, ou publiez votre idée pour réunir des développeurs passionnés.",
    image: homeImage,
    mobileImage: homeMobileImage,
    alt: 'Page de recherche de projets Develup',
  },
  {
    title: 'Échangez en temps réel',
    text: 'Discutez directement avec les porteurs de projet et les autres membres grâce à la messagerie intégrée. Partagez vos idées au moment où elles arrivent.',
    image: conversationImage,
    mobileImage: conversationMobileImage,
    alt: 'Messagerie Develup',
  },
];

const benefits = [
  {
    icon: LuSparkles,
    title: 'Des projets motivants',
    text: 'Collaborez sur des projets web qui vous donnent vraiment envie.',
  },
  {
    icon: LuClock,
    title: 'À votre rythme',
    text: 'Travaillez ensemble, avec vos technos et le temps dont vous disposez.',
  },
  {
    icon: LuTrendingUp,
    title: 'Un portfolio qui grandit',
    text: 'Gagnez en expérience et enrichissez votre portfolio de vrais projets.',
  },
];

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 pt-14 sm:px-6 md:pt-20 lg:grid-cols-[1.1fr_1fr] lg:pb-28">
        <div>
          <h1 className="font-display text-[2.75rem] font-extrabold leading-[1.02] tracking-[-0.03em] text-ink sm:text-6xl lg:text-7xl">
            Développez ensemble.
            <br />
            Progressez ensemble.
          </h1>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-muted">
            Develup met en relation des développeurs autour de projets web.
            Trouvez une équipe pour votre idée, ou rejoignez celle de
            quelqu&apos;un d&apos;autre, selon vos technos et votre temps libre.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link to="/signup" className="dv-btn-primary h-14 px-7 text-base">
              Rejoindre la communauté
            </Link>
            <Link to="/login" className="dv-btn-ghost h-14 px-5 text-base">
              J&apos;ai déjà un compte
            </Link>
          </div>
        </div>
        <ProjectStack compact={false} />
      </section>

      {/* Features */}
      <section className="border-t border-line bg-white2">
        <div className="mx-auto flex max-w-6xl flex-col gap-24 px-4 py-24 sm:px-6">
          {features.map((feature, i) => (
            <article
              key={feature.title}
              className="grid items-center gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16"
            >
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                  {feature.title}
                </h2>
                <p className="mt-4 max-w-md leading-relaxed text-muted">
                  {feature.text}
                </p>
              </div>
              <figure className="rounded-2xl border border-line bg-paper p-2 shadow-[0_24px_60px_-30px_rgba(30,29,27,0.35)]">
                <div className="flex gap-1.5 px-2 pb-2 pt-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-line" />
                  <span className="h-2.5 w-2.5 rounded-full bg-line" />
                  <span className="h-2.5 w-2.5 rounded-full bg-pollen" />
                </div>
                <img
                  src={feature.image}
                  alt={feature.alt}
                  className="hidden w-full rounded-xl sm:block"
                />
                <img
                  src={feature.mobileImage}
                  alt={feature.alt}
                  className="mx-auto block w-3/4 rounded-xl sm:hidden"
                />
              </figure>
            </article>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-pollen px-6 py-14 sm:px-12 lg:py-16">
          <h2 className="max-w-2xl font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-ink sm:text-5xl">
            Un side project, c&apos;est mieux à plusieurs.
          </h2>
          <ul className="mt-12 grid gap-10 border-t border-ink/15 pt-10 md:grid-cols-3 md:gap-8">
            {benefits.map(({ icon: Icon, title, text }) => (
              <li key={title}>
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-ink text-pollen">
                  <Icon aria-hidden className="text-2xl" />
                </span>
                <h3 className="mt-5 font-display text-2xl font-bold leading-tight tracking-[-0.01em] text-ink sm:text-[1.7rem]">
                  {title}
                </h3>
                <p className="mt-2 max-w-xs text-lg leading-snug text-ink/75">
                  {text}
                </p>
              </li>
            ))}
          </ul>
          <Link to="/signup" className="dv-btn-dark mt-12 h-14 px-7 text-base">
            Créer mon compte
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;
