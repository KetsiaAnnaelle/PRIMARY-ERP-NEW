import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";
import { useQuery } from '@tanstack/react-query';
import { GetSchoolYear } from "./api/get-school-year";
import { useState } from "react";
import SchoolYear from "./configSchool/schoolyear";
import { ButtonLoading } from "./Buttonloading";

async function GetSchoolInfo() {
  const response = await fetch('http://localhost:8000/api/create-school', { method: 'GET' });
  if (!response.ok) {
    throw new Error('Une erreur est survenue lors de la récupération des données');
  }
  const data = await response.json();
  return data;
}

function Navbar() {
  const { data: schoolInfo, error: schoolInfoError, isLoading: schoolInfoLoading } = useQuery({
    queryKey: ['schoolInfo'],
    queryFn: GetSchoolInfo,
  });

  const { data: schoolyear, error: yearError, isLoading: schoolyearLoading } = useQuery({
    queryKey: ['schoolyear'],
    queryFn: GetSchoolYear,
  });

  const [selectedYear, setSelectedYear] = useState('');

  if (schoolInfoLoading || schoolyearLoading) {
    return <ButtonLoading />;
  }

  if (schoolInfoError) {
    console.error('Erreur lors du chargement des informations scolaires : ', schoolInfoError);
    return <div>Erreur de chargement des informations scolaires</div>;
  }

  if (yearError) {
    console.error('Erreur lors du chargement des années scolaires : ', yearError);
    return <div>Erreur de chargement des informations des années scolaires</div>;
  }

  const schoolName = schoolInfo && schoolInfo.nomEc ? schoolInfo.nomEc : 'PRIMARY';

  // Vérifiez que schoolyear est un tableau
  if (!Array.isArray(schoolyear)) {
    return <div>Erreur de chargement des années scolaires</div>;
  }

  return (
    <nav className="border-gray-200 bg-blue-500 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/img/logo.webp" className="h-10" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{schoolName} ERP </span>
        </Link>
        <div className="flex items-center md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse">
          <div className="mx-3">
            {/* <SchoolYear /> */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{selectedYear || 'Sélectionner une année'}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  {schoolyear.map((year, index) => (
                    <DropdownMenuItem
                      key={index}
                      onClick={() => setSelectedYear(`${year.annee_debut.substring(0, 4)} - ${year.annee_fin.substring(0, 4)}`)}
                    >
                      {year.annee_debut.substring(0, 4)} - {year.annee_fin.substring(0, 4)}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* <span className="text-white">{selectedYear}</span> */}
          <section className="flex gap-3">
            <ModeToggle />
          </section>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
