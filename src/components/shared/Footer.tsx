// components/Footer.tsx
import { Separator } from "@/components/ui/separator";
import { FacebookIcon, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-green-950 text-white mt-10">
      <Separator />
      <div className="container mx-auto py-10 flex flex-col gap-6 text-sm items-center text-green-300">
        {/* Top section */}
        <div className="flex flex-col items-center gap-4">
          <p className="text-center">&copy; 2025 MediMart. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link href="/about" className="hover:underline">About</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
          </div>
        </div>

        {/* Social section */}
        <div className="flex justify-center space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FacebookIcon className="hover:text-primary transition" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <Twitter className="hover:text-primary transition" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Instagram className="hover:text-primary transition" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin className="hover:text-primary transition" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
