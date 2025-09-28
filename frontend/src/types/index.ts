export interface Region {
    id: number;
    nombre: string;
}

export interface Comuna {
    id: number;
    nombre: string;
    region: Region;
}

export interface Direccion {
    id: number;
    calle: string;
    numero: string;
    comuna: Comuna;
}

export interface Persona {
    id: number;
    nombre: string;
    apellido: string;
    fechaNacimiento: string;
    direccion: Direccion;
}

export interface ApiResponse<T> {
    mensaje?: string;
    data: T;
}
