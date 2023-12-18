import HTTP from "./HTTP"
import NetUtil from "./NetUtil";

export default class gameManager{
    public static readonly Instance: gameManager = new gameManager()
    
    
    http: HTTP = null;
    netUtil:NetUtil = null;
    ServerInfo = null;
    
}