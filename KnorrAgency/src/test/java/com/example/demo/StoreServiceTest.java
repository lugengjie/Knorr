package com.example.demo;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.example.demo.store.domain.StoreName;
import com.example.demo.store.repository.StoreRepository;
import com.example.demo.store.service.IStoreService;
import com.example.demo.store.service.StoreService;

@RunWith(SpringRunner.class)
@SpringBootTest
public class StoreServiceTest {
	@Autowired
	StoreRepository storeRepository;
	@Autowired
	IStoreService storeService;
	@Test
	public void findAllStoreName() {
		System.out.println(storeService.findAllStoreName());
	}

}
