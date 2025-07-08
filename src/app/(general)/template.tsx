"use client";

import { SnackbarProvider } from 'notistack'


export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <SnackbarProvider autoHideDuration={3000} /> 
    </>
  );
}
