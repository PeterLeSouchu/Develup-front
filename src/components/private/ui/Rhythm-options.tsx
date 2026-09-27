const rhythms = [
  '1 à 2h/semaine',
  '2 à 3h/semaine',
  '3 à 5h/semaine',
  '5 à 8h/semaine',
  '8 à 12h/semaine',
  '12 à 15h/semaine',
  '15 à 20h/semaine',
  '20 à 25h/semaine',
  '25 à 30h/semaine',
  '30 à 35h/semaine',
  '+ 35h/semaine',
];

// Same values as before, used by every rhythm <select>
function RhythmOptions() {
  return (
    <>
      <option value="">Choisir un rythme</option>
      {rhythms.map((rhythm) => (
        <option key={rhythm} value={rhythm}>
          {rhythm}
        </option>
      ))}
    </>
  );
}

export default RhythmOptions;
