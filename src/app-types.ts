export interface PlayerApiData {
    id: number;
    first_name: string;
    last_name: string;
}

export interface PlayerData extends PlayerApiData {
    color: string;
}

export interface ApiSearchPlayersParams {
    page?: number;
    search?: string;
    per_page?: number;
}

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
