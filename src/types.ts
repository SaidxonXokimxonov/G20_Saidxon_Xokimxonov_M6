export interface Card {
    id: string;
    title: string;
    description: string;
}

export interface Column {
    id: string,
    name: string
    cards: Card[]
}

export interface State {
    data: Column[];
    currentIdx: number;
}