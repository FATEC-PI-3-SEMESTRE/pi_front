type HeaderProps = {
    title: string;
  };
  
  export const Header = ({ title }: HeaderProps) => {
    return (
      <div className="w-full">
        <h1 className="text-3xl">{title}</h1>
        <hr className="border-t-2 border-gray-300 my-4 w-full" />
      </div>
    );
  };
  