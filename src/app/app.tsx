import { useSpotify } from '../hooks/use-spotify';
import styles from './styles.module.css';

export const App = () => {
  const { imageUrl, artist, song } = useSpotify();

  return (
    <main className="min-h-screen flex justify-center items-center">
      <a href="https://gz19wp8b-3000.usw3.devtunnels.ms/login" className="flex gap-8 bg-blue-950 bg-opacity-40 p-6 rounded-3xl text-pretty shadow-md min-w-[800px]">
        <div className="w-[200px] h-[200px] rounded-[25px] shadow-2xl overflow-hidden">
          <img src={imageUrl} className="w-full h-full object-cover" alt="Song Image" />
        </div>
        <div className="flex-1 flex flex-col">
          <p className="text-gray-400 text-[35px]">{artist}</p>
          <p className="text-gray-50 text-[35px]">{song}</p>
          <div className="flex-1 flex items-center">
            <div className={`${styles.colorBar} rounded-full h-[8px] w-full`}></div>
          </div>
        </div>
      </a>
    </main>
  );
};
