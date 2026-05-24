export interface Movie {
  id: string;        // json-server maneja los identificadores como cadenas de texto.
  title: string;
  director: string;
  genre: string;
  year: number;      // Obligatorio. Si el HTML intenta pintar un dato que no está declarado 
                     // en este contrato, TypeScript bloqueará la compilación por seguridad.
}