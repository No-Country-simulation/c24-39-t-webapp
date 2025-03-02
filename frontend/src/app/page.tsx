import { Button } from "flowbite-react";
import { auth } from "../../auth";

export default async function Home() {
  const session = await auth();

  
	console.log("sesioooooooon", session)
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {session?.access_token ?? "no autenticado"}
        <Button>Clickk dale</Button>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">footer</footer>
    </div>
  );
}
