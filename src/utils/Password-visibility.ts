export default function hanldeChangetypePassword(
  set: React.Dispatch<React.SetStateAction<string>>
): void {
  set((prevType) => (prevType === 'password' ? 'text' : 'password'));
}
