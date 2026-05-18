import { AppProviders } from "@/components/providers/AppProviders";

const AuthLayout = ({ children }) => {
  return <AppProviders>{children}</AppProviders>;
};

export default AuthLayout;
