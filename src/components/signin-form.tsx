'use client';

import {cn} from '@/lib/utils';
import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {useEffect, useState} from 'react';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '@/lib/firebase';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import {EyeIcon, EyeOffIcon} from 'lucide-react';

interface UserData {
  username: string;
  firebaseId: string;
  email: string;
  name: string;
}

export default function SigninForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setIsDisabled(false); // Enable the form after mounting
  }, []);

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user) {
        const res = await fetch('/api/auth/signin', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({firebaseId: user.uid})
        });

        const data = await res.json();
        if (res.ok) {
          router.push(`/profile/${data.username}`);
        } else {
          console.error('Error fetching user:', data.error);
          setError('Failed to fetch user profile information.');
        }
      }
    } catch (error: any) {
      // General error handling
      console.error('Error during sign in:', error.message);
      setError(error.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={cn('', className)} {...props}>
      <Card className=" shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription className="text-muted-foreground">
            Use your registered email address.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignin}>
            <div className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.trim())}
                  required
                  disabled={isDisabled}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    maxLength={100}
                    disabled={isDisabled}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-2 flex items-center text-muted-foreground"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading || isDisabled}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link className="hover:underline" href={'/signup'}>
                Create one
              </Link>
            </p>
            {error && (
              <p className="mt-4 text-center text-sm text-red-500">{error}</p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
