export default class HTTP {
    // 預設 URL，這裡是本地伺服器的地址
    URL = 'http://127.0.0.1:3000'
    
    // 發送 HTTP 請求的方法
    // 可以傳入路徑（path）、資料（data）、回調函數（handler）、額外的 URL（extraUrl）
    sendRequset(path?, data?, handler?, extraUrl?) {
        // 如果 extraUrl 未提供，則使用預設的 URL
        if (extraUrl == null) {
            extraUrl = this.URL;
        }

         
        let str = "?";

       // 遍歷資料物件，將鍵值轉換為 URL 查詢字串的形式
       for (const i in data) {
        if (str !== "?") {
            str += "&";
        }
        str += i + "=" + data[i];
    }

        // 組合最終的請求 URL
        let reqUrl = extraUrl  + path  + encodeURI(str);

        // 記錄請求的日誌
        let gameLog ="觸發時間: " + (new Date()).toLocaleTimeString() + " 請求url: " + reqUrl ;
        console.log(gameLog);

        console.log("reqUrl: ", reqUrl);

        // 使用 XMLHttpRequest 物件進行 HTTP 請求
        let xhr = new XMLHttpRequest();

        // 監聽狀態改變事件
        xhr.onreadystatechange = function () {
            // 當請求完成且狀態碼為成功時執行
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 400)) {
                try {
                    // 解析回傳的 JSON 字串
                    let ret = JSON.parse(xhr.responseText);

                    // 如果提供了回調函數，則執行回調函數
                    if (handler != null) {
                        handler(ret);
                        console.log("觸發時間: " + (new Date()).toLocaleTimeString() + " 請求url: " + reqUrl + " 響應回調函數: " + handler.name);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        };

        // 開啟 GET 請求，非同步
        xhr.open("GET", reqUrl, true);
        xhr.send();

        // 返回 XMLHttpRequest 物件，以便後續操作或監聽
        return xhr;
    }
}