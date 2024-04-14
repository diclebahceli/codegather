export interface Claims {
    jti: string;
    id: string;
    email: string;
    role: string;
    exp: number;
    iss: string;
    aud: string;
}
