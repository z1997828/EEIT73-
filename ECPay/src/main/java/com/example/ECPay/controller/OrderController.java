package com.example.ECPay.controller;

import java.time.LocalDateTime;
//引入所需的类和接口
import java.util.Map;
import java.util.concurrent.ExecutionException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//Import the necessary CORS annotation
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.example.ECPay.service.MoneyService;
import com.example.ECPay.service.OrderService;
import com.example.ECPay.service.UsersService;
import com.example.entity.Money;
import com.example.firebase.FirebaseInitialization;
import com.example.utils.Receive;

//声明这是一个REST控制器
@RestController
public class OrderController {

	@Autowired // 自动注入OrderService
	OrderService orderService;
	User user;

	@Autowired // 这里添加@Autowired注解以自动注入FirebaseInitialization实例
	private FirebaseInitialization firebaseInitialization;

	@Autowired
	private MoneyService moneyService;

	@Autowired
	private UsersService usersService;
	
	private static final Logger logger = LoggerFactory.getLogger(UsersService.class);

	@CrossOrigin(origins = "http://localhost:7456") // or use "*" to allow all origins
	@PostMapping("/ecpayCheckout") 
	public String ecpayCheckout(@RequestBody String amount) {// 建立一個package裡面放classes，加入OrderObject，//
																// 使用@RequestBody注解处理请求数据
		String aioCheckOutALLForm = orderService.ecpayCheckout(amount);// 调用orderService的方法
		// System.out.println(amount);// print物件會印出記憶體位置，所以去OrderObject用source, Generate
		// to String()來印出String內容，//
		// 打印请求对象
		return aioCheckOutALLForm;// 返回处理结果
	}
	
	@PostMapping("/ecpay/response")
	public String handleECPayResponse(@RequestBody String receive) {
	    System.out.println("Received ecpay response: " + receive);
	    Map<String, String> map = Receive.parseStringToMap(receive);

	    if (firebaseInitialization == null) {
	        System.out.println("FirebaseInitialization is null");
	        return "服务器内部错误：Firebase服务未初始化";
	    } else {
	        System.out.println("FirebaseInitialization is not null");
	    }

	    if (map.get("RtnCode").equals("1")) {
	        Money money = new Money();
	        money.setCash(map.get("TradeAmt"));
	        money.setDate(LocalDateTime.now());

	        try {
	            String updateTime = moneyService.saveMoney(money);
	            System.out.println("Transaction successfully written to Firestore with update time: " + updateTime);

	            // 从前端JS获取的用户email
	            String email = "z1997828@gmail.com";
	            Integer tradeAmount = Integer.parseInt(map.get("TradeAmt"));

	            // 查找用户ID对应的用户名
	            String username = usersService.getUsernameByEmail(email);
	            if (username == null) {
	                System.err.println("无法找到邮箱对应的用户名");
	                return "交易成功但用户更新失败";
	            }

	            // 更新用户的钱数
	            Integer newMoney = usersService.addMoneyToUser(username, tradeAmount);
	            System.out.println("用户 " + username + " 的钱数更新为: " + newMoney);
	            return "交易成功";
	        } catch (Exception e) {
	            System.err.println("Error saving transaction to Firestore: " + e.getMessage());
	            return "交易失败";
	        }
	    } else if (map.get("RtnCode").equals("10300066")) {
	        return "交易付款結果待確認中";
	    } else {
	        return "交易失敗: " + map.get("RtnMsg");
	    }
	}
	
	@PostMapping("/api/updateUserMoney")
	public ResponseEntity<?> updateUserMoney(@RequestBody String receive) {
	    // ... 省略其他代码 ...

	    Map<String, String> map = Receive.parseStringToMap(receive); // 解析响应数据

	    // 检查firebaseInitialization是否为null
	    if (firebaseInitialization == null) {
	        logger.error("FirebaseInitialization is null");
	        return new ResponseEntity<>("服务器内部错误：Firebase服务未初始化", HttpStatus.INTERNAL_SERVER_ERROR);
	    } else {
	        logger.info("FirebaseInitialization is not null");
	    }

	    // 检查交易是否成功
	    if (map.get("RtnCode").equals("1")) {
	        String username = map.get("Andy"); // 假设用户ID作为自定义字段传递
	        Integer tradeAmount = Integer.parseInt(map.get("TradeAmt")); // 交易金额

	        try {
	            // 更新用户的钱数
	            Integer newMoney = usersService.addMoneyToUser(username, tradeAmount);
	            logger.info("用户 {} 的钱数更新为: {}", username, newMoney);
	            return ResponseEntity.ok(Map.of("newMoney", newMoney, "message", "交易成功"));
	        } catch (Exception e) {
	            logger.error("更新用户钱数失败: {}", e.getMessage());
	            return new ResponseEntity<>("交易失败", HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    } else if (map.get("RtnCode").equals("10300066")) {
	        // 特定状态的处理
	        return new ResponseEntity<>("交易付款结果待确认中", HttpStatus.OK);
	    } else {
	        // 处理失败的交易
	        return new ResponseEntity<>("交易失败: " + map.get("RtnMsg"), HttpStatus.BAD_REQUEST);
	    }
	}
}

//用途解释：
//1.ecpayCheckout 方法：处理发送到 /ecpayCheckout 的POST请求，用于启动电子支付流程。它接收一个 OrderObject 类型的对象作为请求体，调用 orderService 的 ecpayCheckout 方法，并返回结果。
//2.handleECPayResponse 方法：处理发送到 /ecpay/response 的POST请求，用于接收电子支付的响应。它解析响应数据，并根据返回的交易结果代码（RtnCode）来判断交易的状态。
//3.postExample 方法：处理发送到 /createUser 的POST请求，用于创建用户。它接收一个 Person 类型的对象作为请求体，并返回一个简单的字符串作为响应。
//这段代码展示了使用Spring框架创建RESTful API的常见模式，其中包含了服务注入、路径映射、请求数据处理等关键元素。

//服务注入：通过@Autowired注解，Spring会自动注入OrderService对象。这允许OrderController类使用OrderService中定义的方法和功能，而不需要手动创建OrderService的实例。
//路径映射：使用@PostMapping注解定义了三个不同的路径映射，分别对应不同的HTTP POST请求。每个方法与一个特定的URL路径关联，当该路径接收到POST请求时，相应的方法会被调用。
//请求数据处理：使用@RequestBody注解指定方法参数应该从请求的body中读取。这允许方法直接接收和处理客户端发送的数据。
