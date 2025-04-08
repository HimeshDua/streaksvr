import {HeroPage} from '@/components/HeroPage';

export default function HomePage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="absolute inset-0 pointer-events-none -z-1 flex items-center justify-center opacity-100">
        <img
          alt="background"
          src="./square-alt-grid.svg"
          className="object-cover pointer-events-none -z-1 w-full h-full opacity-60 dark:opacity-50 [mask-image:radial-gradient(75%_75%_at_center,white,transparent)]"
        />
      </div>
      <HeroPage />
    </div>
  );
}
