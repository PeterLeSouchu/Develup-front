import { TechnologieType } from '../types';

export default function arrayComparison(
  arr1: TechnologieType[],
  arr2: TechnologieType[]
) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  const sorted1 = arr1.slice().sort((a, b) => a.id - b.id);
  const sorted2 = arr2.slice().sort((a, b) => a.id - b.id);

  const isTheSame = sorted1.every((obj, index) => obj.id === sorted2[index].id);
  return isTheSame;
}
