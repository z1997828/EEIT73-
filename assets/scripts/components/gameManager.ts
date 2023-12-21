import { waittingConn } from "../waitingConn";
import Alert from "./Alert";
import HTTP from "./HTTP"
import NetUtil from "./NetUtil";

export default class gameManager{
    public static readonly Instance: gameManager = new gameManager()
    
    
    http: HTTP = null;
    NetUtil:NetUtil = null;
    ServerInfo = null;
    loading:waittingConn = null;
    alert:Alert = null;
}