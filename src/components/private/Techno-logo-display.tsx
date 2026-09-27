/* eslint-disable react/destructuring-assignment */
import { TechnologieType } from '../../types';

// Function to return 5 technos logo and +"x" if necessary for card Project
function TechnoLogoDisplay(array: TechnologieType[]) {
  const displayLimit = 5;
  const extraImagesCount = array.length - displayLimit;

  return (
    <div className="flex items-center gap-1.5 whitespace-nowrap">
      {array.length === 0 ? (
        <p className="dv-muted text-sm">Aucune techno</p>
      ) : (
        array
          .slice(0, displayLimit)
          .map((logo) => (
            <img
              key={logo.id}
              src={logo.image}
              alt={logo.name}
              title={logo.name}
              className="h-9 w-9 rounded-xl border border-line bg-white2 object-contain p-1.5 dark:border-night-line"
            />
          ))
      )}
      {extraImagesCount > 0 && (
        <div className="grid h-9 min-w-9 place-items-center rounded-xl bg-paper px-2 text-xs font-semibold text-ink dark:bg-night-line dark:text-paper">
          +{extraImagesCount}
        </div>
      )}
    </div>
  );
}

export default TechnoLogoDisplay;
