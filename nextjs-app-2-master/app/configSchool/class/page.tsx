"use client"
import Navbar from "@/app/navbar";
import Sidebarconfig from "../Sidebarconfig";
import Modal from "./modal";

function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <aside className="hidden lg:block w-64 bg-gray-800">
          <Sidebarconfig />
        </aside>
      </div>

      <div className="absolute ml-80 mt-20">
        {/* Positionnement de l'élément modal juste en dessous de la navbar */}
        <div className="relative">
          <Modal />
        </div>
      </div>
    </div>
  );
}

export default Page;
