"use client";
import Navbar from "../navbar";
import Sidebarconfig from "./Sidebarconfig";
import { Label } from "@radix-ui/react-dropdown-menu";
import { PlusCircledIcon, RocketIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";
import axios from "axios";

function Page() {
  const [nomEc, setnomEc] = useState("");
  const [adresse, setadresse] = useState("");
  const [contact, setcontact] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset the error message

    if (!nomEc || !adresse || !contact) {
      setTimeout(() => {
        setError("nomEc, adresse et contact sont requis.");
      }, 1000);
      return;
    }

    try {
      // Use axios to send the request
      const response = await axios.post("http://localhost:8000/api/create-school", {
        nomEc: nomEc,
        adresse: adresse,
        contact: contact,
      });

      console.log(response.data);

      if (response.status === 200 && !response.data.error) {
        toast.success("Informations Enregistrées");
        setnomEc("");
        setadresse("");
        setcontact("");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Une erreur est survenue.");
      } else {
        setError("Une erreur est survenue. Veuillez réessayer.");
      }
      console.error("Request failed: ", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 bg-gray-800">
          <Sidebarconfig />
        </aside>

        {/* Content area */}
        <main className="flex-1 p-4 flex justify-center items-center bg-gray-50">
          <Card className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl">
            <CardHeader>
              <CardTitle className="text-center">Informations sur l'ecole</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  {error && (
                    <Alert>
                      <RocketIcon className="h-4 w-4" />
                      <AlertDescription className="text-red-500 text-center">
                        {error}
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="nomEc">Nom de l'école</Label>
                    <Input
                      id="nomEc"
                      type="text"
                      value={nomEc}
                      onChange={(e) => setnomEc(e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="adresse">Adresse</Label>
                    <Input
                      id="adresse"
                      type="text"
                      value={adresse}
                      onChange={(e) => setadresse(e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="contact">Contact</Label>
                    <Input
                      id="contact"
                      type="text"
                      value={contact}
                      onChange={(e) => setcontact(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>

                <CardFooter className="flex justify-center mt-6">
                  <Button type="submit" className="w-full sm:w-auto">Enregistrer</Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

export default Page;
