'use client';
import { signOut } from 'next-auth/react';

const Logout = () => {
  return (
    <div>
      <button
        className="px-5 py-2 rounded-md bg-red-500"
        onClick={() => signOut()}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
