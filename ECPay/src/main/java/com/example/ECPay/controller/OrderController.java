package com.example.ECPay.controller;

import java.util.Map;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.ECPay.service.OrderService;
import com.example.classes.OrderObject;
import com.example.classes.Person;
import com.example.utils.Receive;



@RestController
public class OrderController {
	
	@Autowired
	OrderService orderService;
	User user;

	@PostMapping("/ecpayCheckout")
	public String ecpayCheckout(@RequestBody OrderObject ooj) {//建立一個package裡面放classes，加入OrderObject
		String aioCheckOutALLForm = orderService.ecpayCheckout();
		System.out.println(ooj);//print物件會印出記憶體位置，所以去OrderObject用source, Generate to String()來印出String內容
		return aioCheckOutALLForm;
	}
	
	@PostMapping("/ecpay/response")
    public String handleECPayResponse(@RequestBody String receive) {
	
		Map<String, String> map = Receive.parseStringToMap(receive);
		map.get("RtnCode");
		
		// 檢查交易是否成功
        if (map.get("RtnCode").equals("1")) {
            // 處理成功的交易
            // 這裡可以添加您的業務邏輯，例如更新訂單狀態、記錄交易資訊等
            return "交易成功";
        } else if (map.get("RtnCode").equals("10300066")) {
        	return "交易付款結果待確認中";
        } else {
            // 處理失敗的交易
            return "交易失敗: " + map.get("RtnMsg");
        }
        
     }
	
	
	@PostMapping("/createUser")
	public String postExample(@RequestBody Person person) throws InterruptedException, ExecutionException {
		//return "Created User " + person.getName();
		System.out.println(person);
		return "a";
	}
}
