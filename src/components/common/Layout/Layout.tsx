import React from 'react';


type Props = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export default function Layout({ children }: Props) {
  return (
    <>
      {children}
    </>
  );
}