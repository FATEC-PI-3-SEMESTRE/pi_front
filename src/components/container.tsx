import { ReactNode } from 'react';

type MainProps = {
  children: ReactNode;
};

export const Container = ({ children }: MainProps) => {
  return (
    <div className="w-full h-full">
      {children}
    </div>
  );
};
