import SignupForm from '@/components/signup-form';

function SignupPage() {
  return (
    <div className="relative flex flex-col items-center justify-center h-[calc(100vh-4rem)] bg-background/20 backdrop-blur-xs">

      <SignupForm className="w-full max-w-sm backdrop-blur-2xl" />
    </div>
  );
}

export default SignupPage;
