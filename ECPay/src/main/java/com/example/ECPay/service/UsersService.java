package com.example.ECPay.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.example.entity.Users;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;

@Service
public class UsersService {

	private static final String COLLECTION_NAME = "users";
	
	private static final Logger logger = LoggerFactory.getLogger(UsersService.class);
	
	public String getUsernameByEmail(String email) throws Exception {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        // 假设您的users集合中有一个字段是email，并且您需要查找该email对应的文档ID（用户名）
        ApiFuture<QuerySnapshot> future = dbFirestore.collection(COLLECTION_NAME)
                .whereEqualTo("email", email).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        if (documents.size() == 1) {
            return documents.get(0).getId(); // 返回用户名（文档ID）
        } else {
            return null; // 找不到用户或找到多个用户
        }
    }
	
	public Integer addMoneyToUser(String username, Integer additionalMoney) throws Exception {
		logger.info("addMoneyToUser開始, username: {}, additionalMoney: {}", username, additionalMoney);
		
	    Firestore dbFirestore = FirestoreClient.getFirestore();
	    DocumentReference docRef = dbFirestore.collection(COLLECTION_NAME).document(username);
	    ApiFuture<DocumentSnapshot> future = docRef.get();
	    DocumentSnapshot document = future.get();
	    
	    
	    if (document.exists()) {
	        Users existingUser = document.toObject(Users.class);
	        Integer currentMoney = existingUser.getMoney();
	        System.out.println("當前金額：" + currentMoney);	        
	        logger.info("當前金額: {}", currentMoney);
	        
	        // 進行金額增加
	        Integer newMoney = currentMoney + additionalMoney;    	        
	        logger.info("嘗試增加金額: {}", additionalMoney);
	        System.out.println("更新後金額：" + newMoney);
	        
	        // 更新Firestore中的用戶金額
	        ApiFuture<WriteResult> writeResult = docRef.update("money", newMoney);
	        System.out.println("更新時間：" + writeResult.get().getUpdateTime());
	        
	        // 返回更新後的金額
	        return newMoney;
	    } else {
	        // 如果用戶不存在，拋出異常
	    	System.out.println("用戶 " + username + " 在Firebase中不存在。");
	        throw new Exception("用戶不存在");
	    }
	}
}
