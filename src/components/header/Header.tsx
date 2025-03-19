import Nav from '../nav/Nav';

export default function Header() {
  return (
    <div className="bg-red-500 h-screen flex items-center justify-center">
      <h1 className="text-white text-6xl font-bold tracking-wide">.MOV</h1>
      <Nav />
    </div>
  );
}
