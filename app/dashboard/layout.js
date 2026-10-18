import Header from "./(components)/Header";
import SideNav from "./(components)/SideNav";
import { Toaster } from "@/components/ui/toast"

export default function RootLayout({ children }) {
  return (
    <div>

      <div className="md:w-64 fixed hidden md:block">
        <SideNav />
      </div>

      <div className="md:ml-64">
        <Header />

        {children}

      </div>

      <Toaster />

    </div>
  );
}
