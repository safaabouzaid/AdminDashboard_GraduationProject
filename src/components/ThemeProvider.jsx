import { useSelector } from 'react-redux';

export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className='h-screen w-screen'>
      {children}
    </div>
  );
}
