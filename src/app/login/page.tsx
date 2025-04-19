import LoginForm from '@/components/signin-form';

function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] bg-background/20 backdrop-blur-xs">
      <LoginForm className="w-full max-w-sm backdrop-blur-2xl" />
    </div>
  );
}
// streaksvr.vercel.app;
export default LoginPage;
