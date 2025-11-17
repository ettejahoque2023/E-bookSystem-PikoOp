import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-8">
      <div className="container mx-auto px-4 md:px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-gray-600">© {new Date().getFullYear()} E-Book Platform. All rights reserved.</div>
        <div className="flex gap-4 items-center">
          <a href="#" className="text-sm text-gray-600 hover:text-indigo-600">About</a>
          <a href="#" className="text-sm text-gray-600 hover:text-indigo-600">Contact</a>
          <a href="#" className="text-sm text-gray-600 hover:text-indigo-600">Privacy</a>
        </div>
      </div>
    </footer>
  );
}
