
import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import NewsletterBar from "./NewsletterBar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NewsletterBar />
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
