export function hanldeChangetypePassword(
  setTypePassword: React.Dispatch<React.SetStateAction<string>>
): void {
  setTypePassword((prevType) =>
    prevType === 'password' ? 'text' : 'password'
  );
}
export function hanldeChangetypeConfirmPassword(
  setTypeConfirmPassword: React.Dispatch<React.SetStateAction<string>>
): void {
  setTypeConfirmPassword((prevType) =>
    prevType === 'password' ? 'text' : 'password'
  );
}
