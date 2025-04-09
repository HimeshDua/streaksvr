import SignupForm from '@/components/signup-form';

function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)]">
      <div className="absolute inset-0 pointer-events-none -z-1 flex items-center justify-center opacity-100">
        <img
          alt="background"
          src="/square-alt-grid.svg"
          className="object-contain pointer-events-none -z-1 w-full h-full opacity-100 dark:opacity-50 [mask-image:radial-gradient(75%_75%_at_center,white,transparent)]"
        />
      </div>
      <SignupForm className="w-full max-w-sm backdrop-blur-2xl" />
    </div>
  );
}
// streaksvr.vercel.app;
export default SignupPage;
