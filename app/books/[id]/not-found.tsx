import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-semibold tracking-tight">404</h1>
        <h2 className="mt-4 text-2xl font-semibold">Libro no encontrado</h2>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          Lo sentimos, el libro que buscas no existe o ha sido movido.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
        >
          Volver a la biblioteca
        </Link>
      </div>
    </div>
  );
}
