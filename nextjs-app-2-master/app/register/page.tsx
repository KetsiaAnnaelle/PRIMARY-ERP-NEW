import * as React from "react"
 import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link";



 


export default async function Page() {
  return (

    <div className="flex justify-center items-center h-screen">
      <Card className="w-[350px] place-content-center">
        <CardHeader>
          <CardTitle className="text-center">
            <img src="/img/logo.webp" className="h-20 flex mx-20" alt="Logo" />
            Créer un Compte Chez Nous !!!
          </CardTitle>
          {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="pass">Password</Label>
                <Input id="pass" type="password" />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="pass">Confirm Password</Label>
                <Input id="pass" type="password" />
              </div>
              
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="role">Rôle</Label>
                <Select>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="choisir le rôle" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="admistration">admistration</SelectItem>
                    <SelectItem value="next">enseignant</SelectItem>
                    <SelectItem value="parent">parent</SelectItem>
                    <SelectItem value="eleve">eleve</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between gap-2">
          
          {/* <Link href="/login" className="flex items-center space-x-3 rtl:space-x-reverse"> */}
            <CardDescription><Button>Creer un Compte </Button></CardDescription>

            <Link href="/login" className="flex items-center space-x-3 rtl:space-x-reverse">
              <CardDescription>Déjà un compte? Connectez-vous</CardDescription>
            </Link>
          {/* </Link> */}
        </CardFooter>
      </Card>
    </div>
  );
}
