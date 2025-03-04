
// MENSAJE DE ERROR EN FORMULARIOS
export default function ErrorMessage({ message }: {message: string}) {
    return <p className="text-red-500 text-sm">
        {message
            ? message
            : "Ocurrió un error inesperado, por favor intenta de nuevo"}
    </p>
}