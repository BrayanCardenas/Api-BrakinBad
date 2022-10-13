export interface Character {
    char_id: string,
    name: string,
    nickname: string,
    img: string,
    status: string,
    occupation: Ocupation[],
}

interface Ocupation {
    name: string
}