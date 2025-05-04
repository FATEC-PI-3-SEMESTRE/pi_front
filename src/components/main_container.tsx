import { ReactNode } from 'react';

type MainProps = {
  children: ReactNode;
};

export const Main = ({ children }: MainProps) => {
  return (
    <div className="flex gap-4 m-5">
      {children}
    </div>
  );
};
