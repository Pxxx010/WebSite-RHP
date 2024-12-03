import Image from 'next/image';

export default function NavBar() {
  return (
    <nav className="flex justify-center items-center h-20">
      <header className="header">
        <Image 
          id="RHP_Logo_Horiz"
          src="/RHP_Logo_Horiz.png" 
          alt="RHP Logo" 
          width={100} 
          height={100} 
        />
      </header>
    </nav>
  );
}

