"use client"

import Link from "next/link";

export default function Error() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold">Error cargando la página</h1>
      <p className="text-lg">Recargue o vuelva a intentar más tarde</p>
      <div>
        <Link href="/">Volver al inicio</Link>
      </div>
    </div>
  );
}