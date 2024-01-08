import { _decorator, Component, director, Node, AudioSource, AudioClip, find, EditBox } from 'cc';
import gameManager from './components/gameManager';
import SocketUtil from './components/SocketUtil';
import { Api } from './components/urlAPI';
import HTTP from './components/HTTP';
const { ccclass, property } = _decorator;
const eventTarget = new EventTarget;

@ccclass('login')
export class loginScene extends Component {
    @property(Node) singUp: Node = null;
    @property(Node) singIn: Node = null;
    @property(EditBox) setNameInput: EditBox = null;
    @property(EditBox) setAccountInput: EditBox = null;
    @property(EditBox) setPasswdInput: EditBox = null;
    @property(EditBox) confirmPwInput: EditBox = null;
    @property(EditBox) accountInput: EditBox = null;
    @property(EditBox) passwdInput: EditBox = null;
    public openMenu = false;

    onLoad() {

        this.singUp.active = false;
        this.singIn.active = false;
        gameManager.Instance.http = new HTTP();
        gameManager.Instance.socketUtil = new SocketUtil();
        gameManager.Instance.socketUtil.connect();


    }




    public onTest() {
        director.loadScene("hall");
    }






    // -----------登入場景按鈕----------

    // 會員註冊按鈕
    public onMemberregist() {
        if (!this.openMenu)
            this.singUp.active = !false,
                this.openMenu = !false;


    }

    // 會員登入按鈕
    public onMemberLogin() {
        if (!this.openMenu)
            this.singIn.active = !false,
                this.openMenu = !false;
    }


    // -----------註冊頁按鈕------------

    // 確認會員是否重複按鈕
    public onCheckName() {
        console.log("確定按鈕被點擊");
    }

    // 驗證碼按鈕
    public onVerif() {
        console.log("確定按鈕被點擊");
    }

    // 確定註冊按鈕
    public onConfirmregist() {
        console.log("確定按鈕被點擊");
    }

    // 返回按鈕
    public onBack() {
        this.singUp.active = false;
        this.singIn.active = false;
        this.openMenu = false;
    }

    // -----------登入頁按鈕------------


    // 確定登入按鈕
    public onConfirmLogin() {



        let email = this.accountInput.string;
        let password = this.passwdInput.string;
        console.log("發送的帳號:", email, "密碼:", password);

        if (email.length < 1 || password.length < 1) {
            gameManager.Instance.alert.show("登入失敗", "帳號與或密碼為空...");
            return;
        }

        let data = { "email": email, "password": password };

        gameManager.Instance.loading.show();

        // 調用 postRequest 方法，並傳入數據
        gameManager.Instance.http.postRequest(Api.login, data, (ret) => {

            gameManager.Instance.loading.hide();
            if (ret.message === '登錄成功') {
                director.loadScene("hall");
            } else {
                gameManager.Instance.loading.hide();
                gameManager.Instance.alert.show("登入失敗", "帳號或密碼輸入錯誤...");
            }
        });

    }
    // 找回密碼按鈕
    public onFindpw() {
        console.log("確定按鈕被點擊");
    }




}

