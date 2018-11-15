/*
 * Copyright (C) 2018, Victorique Ko. All rights reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

package com.example.demo.customer.repository;

import com.example.demo.customer.entity.Customer;
import com.example.demo.log.config.SystemControllerLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:1841")
@RepositoryRestResource()
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    @SystemControllerLog(description = "查找客源")
    Page<Customer> findByCustomerNameLikeAndCustomerPositionLikeAndCustomerTypeAndOwn(
            @Param("customerName") String customerName,
            @Param("customerPosition") String customerPosition,
            @Param("customerType") String customerType,
            @Param("own") boolean own,
            Pageable pageable
    );

    @SystemControllerLog(description = "查找客源")
    Page<Customer> findByCustomerNameLikeAndCustomerPositionLikeAndCustomerTypeAndUserId(
            @Param("customerName") String customerName,
            @Param("customerPosition") String customerPosition,
            @Param("customerType") String customerType,
            @Param("userId") long userId,
            Pageable pageable
    );

    @SystemControllerLog(description = "查找客源")
    Page<Customer> findByCustomerNameLikeAndCustomerPositionLikeAndUserId(
            @Param("customerName") String customerName,
            @Param("customerPosition") String customerPosition,
            @Param("userId") long userId,
            Pageable pageable
    );
}
