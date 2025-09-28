/* eslint-disable react/destructuring-assignment */
import { TechnologieType } from '../../types';

// Function to return 5 technos logo and +"x" if necessary for card Project
function TechnoLogoDisplay(array: TechnologieType[]) {
  const displayLimit = 5;
  const extraImagesCount = array.length - displayLimit;

  return (
    <div className="flex gap-2 items-center whitespace-nowrap absolute left-3 bottom-2 ">
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
              className="w-9 h-9 my-2  rounded-xl object-contain bg-white2 p-1"
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

export default TechnoLogoDisplay;
