package com.example.ECPay.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ECPay.service.UsersService;

@RestController
@RequestMapping("/api")
public class UsersController {

//	@Autowired
//	private UsersService usersService;
//	
//	@PostMapping("/users")
//	public Integer saveMoney(@RequestBody Users users) throws InterruptedException, ExecutionException {
//		return usersService.saveUsers(users);
//	}
	
    @Autowired
    private UsersService usersService;

    // ... 其他端点 ...

    @PostMapping("/users/{username}/addMoney")
    public ResponseEntity<?> addMoney(@PathVariable String username, @RequestBody Map<String, Integer> moneyMap) throws Exception {
        if (!moneyMap.containsKey("money")) {
            return new ResponseEntity<>("'money' is required", HttpStatus.BAD_REQUEST);
        }
        Integer moneyToAdd = moneyMap.get("money");
        Integer newMoney = usersService.addMoneyToUser(username, moneyToAdd);
        if (newMoney == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(newMoney, HttpStatus.OK);
    }
}

//职责分离（Separation of Concerns）：如果UsersController的职责是处理用户相关的业务逻辑，而OrderController处理的是订单相关的逻辑，那么保持它们分离有助于保持代码的清晰和易于维护。每个控制器专注于一个特定的领域模型，使得代码更加模块化。
//代码复用（Code Reusability）：如果UsersService的功能需要在处理订单时使用（例如，更新用户余额），那么在OrderController中注入UsersService是合理的。这样可以在不同的控制器间共享服务逻辑。
