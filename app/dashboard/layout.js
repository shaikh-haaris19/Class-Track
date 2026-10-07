import Header from "./(components)/Header";
import SideNav from "./(components)/SideNav";

export default function RootLayout({ children }) {
  return (
    <div>
      <Header />

      <div className="md:w-64 fixed hidden md:block">
        <SideNav />
      </div>
      <div className="md:ml-64">
        {children}
      </div>

    </div>
  );
}
