export default function hanldeChangtypePassword(
  set: React.Dispatch<React.SetStateAction<string>>
): void {
  set((prevType) => (prevType === 'password' ? 'text' : 'password'));
}
