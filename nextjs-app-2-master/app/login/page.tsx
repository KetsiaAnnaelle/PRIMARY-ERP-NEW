"use client"; // Ajoute cette ligne en haut du fichier
import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from 'next/navigation';

import { RocketIcon } from "@radix-ui/react-icons"
import { toast, Toaster } from 'sonner';

// import { Toaster } from "@/components/ui/sonner"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    setError(''); // Réinitialise les erreurs

    if (!email || !password) {
      setTimeout(() => {
        setError('Email et mot de passe sont requis.');
      }, 1000);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
      }),
      });

      const data = await response.json();

      if (response.ok) {
        // Stocker le token JWT dans localStorage
        localStorage.setItem('token', data.access_token);
        router.push('/'); // Redirection après connexion
        // alert('Connexion réussie');
        toast.success("Connexion réussie", {
          description: "Vous êtes maintenant connecté."});
      } else {
        setError(data.message || 'Échec de la connexion');
      }
    } catch (error) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      console.error("Login failed: ", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="">
        <img src="/img/logo.webp" className="h-23" alt="Logo" />
      </div>
      <Toaster />
      <Card className="w-[350px] place-content-center mx-10">
        <CardHeader>
          <CardTitle className="text-center">LOGIN</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">

            {
              error && 

              <Alert>
                <RocketIcon className="h-4 w-4" />
                {/* <AlertTitle>Heads up!</AlertTitle> */}
                <AlertDescription className="text-red-500 text-center">{error}</AlertDescription>
              </Alert>
            }

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="pass">Password</Label>
                <Input 
                  id="pass" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)  }
                  />
              </div>

            </div>

            <CardFooter className="flex justify-center mt-6">
              <Button type="submit">Se Connecter</Button>
              {/* <Link href="/register">
                <a className="flex items-center space-x-3 rtl:space-x-reverse">
                  Pas de compte? Créer un Compte
                </a>
              </Link> */}
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;
