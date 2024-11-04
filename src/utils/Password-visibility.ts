export default function hanldeChangeTypePassword(
  set: React.Dispatch<React.SetStateAction<string>>
): void {
  set((prevType) => (prevType === 'password' ? 'text' : 'password'));
}
