export class GameStateManager {

    private gameState:string;

    private static instance: GameStateManager;
    private constructor() {
        this.gameState = "game";
    }
    
    public static getInstance(): GameStateManager {
        if (!GameStateManager.instance) {
            GameStateManager.instance = new GameStateManager();
        }
        return GameStateManager.instance;
    }
    
    public getGameState(): string {
        return this.gameState;
    }

    public setEndGameState(): void {
        this.gameState = "end";
    }

    public setGameGameState(): void {
        this.gameState = "game";
    }

}