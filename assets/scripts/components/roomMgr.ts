import { director } from "cc";
import { createRoomConfig } from "./define";
import gameManager from "./gameManager";

export default class roomMgr {
   onEnterRoom(rateKey) {
        // 獲取房間配置
        const config = createRoomConfig[rateKey];
        if (config) {
            // 創建房間請求
            gameManager.Instance.socketUtil.connect();
            gameManager.Instance.socketUtil.requestCreateRoom(config, (err, result) => {
                if (err) {
                    console.error("創建房間失敗", err);
                } else {
                    console.log("創建房間成功", result);
                    director.loadScene('gameroom')
                    // 在這裡處理房間創建成功後的邏輯，例如跳轉到房間場景
                }
            });
        } else {
            console.error("無效的房間等級");
        }
    }

}