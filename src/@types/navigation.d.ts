export declare global {
    export interface GameParams {
        id: string;
        title: string;
        bannerUrl: string;
    }
    namespace ReactNavigation {
        interface RootParamList {
            home: undefined;
            game: GameParams;
        }
    }
}