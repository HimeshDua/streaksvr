import RegisterForm from '@/components/RegisterForm';

function RegisterPage() {
  return (
    <div className="relative flex flex-col items-center justify-center h-[calc(100vh-4rem)] bg-background/20 backdrop-blur-xs">

      <RegisterForm className="w-full max-w-sm backdrop-blur-2xl" />
    </div>
  );
}

export default RegisterPage;
