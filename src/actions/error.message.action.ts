const getErrorMessage = (code: string) => {
  switch (code) {
    case 'auth/user-not-found':
      return 'No account found with this email.';
    case 'auth/wrong-password':
      return 'Incorrect password.';
    case 'auth/invalid-email':
      return 'Invalid email address.';
    default:
      return 'Something went wrong. Try again.';
  }
};
