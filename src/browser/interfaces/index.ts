export interface ICharacter {
    id: string;
    name: string; 
    height: string; 
    mass: string; 
    gender: string;
    homeworld: string;
    homeworldOb?: any;
}

export interface ICharactersResult {
    count: number;
    total: number;
    people: ICharacter[];
}