import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { AppProviders } from "@/components/providers/AppProviders";

const AuthLayout = ({ children }) => {
  return <AppProviders>
    <Navbar/>
    {children}
    <Footer/>
    </AppProviders>;
};

export default AuthLayout;
