import { useEffect } from 'react';

export const ErrorTester = () => {
  useEffect(() => {
    // If the error occurs before the first refresh is performed,
    // the boundary error cannot be recovered and will be stuck.
    // Comment and uncomment this line to test error handling
    throw new Error('Test');
  }, []);

  return <h1>Error Tester</h1>;
};
