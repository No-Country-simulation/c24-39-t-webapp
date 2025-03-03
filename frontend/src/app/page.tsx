import { Button } from "flowbite-react";
import { auth } from "../../auth";
import 'tailwindcss';
import Header from "@/components/Header";
import Head from "next/head";

export default async function Home() {

  const session = await auth();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-red-500 via-orange-600 to-[#f5750c]">
      <Header />
      <main className="flex-grow flex flex-col justify-center items-center gap-8">
        <div className="flex flex-row gap-12">
          {session?.access_token ?? "no autenticado"}
          <Button>Click dale</Button>
        </div>
      </main>
      <footer className="flex flex-wrap items-center justify-center py-4 mt-auto bg-[#ffffff] text-[#f5750c]">footer</footer>
    </div>
  );
}
