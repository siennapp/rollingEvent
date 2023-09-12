export interface dataProps{
    id?: number;
    name:string;
    symbol?:string;
    logoUrl: string;
    isSelected?: boolean;
}

export type logoProps = Pick<dataProps, 'name'|'logoUrl'> & { size: string}

export interface headingProps{
    h1?: string;
    h2?: string;
    sub?:string;
    shadow?:boolean;
}