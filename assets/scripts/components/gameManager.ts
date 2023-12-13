import HTTP from "./HTTP"

export default class gameManager{
    public static readonly Instance : gameManager = new gameManager()
    
    // http腳本
    http: HTTP = null;

    ServerInfo = null;
    
}