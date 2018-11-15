package com.example.demo.log.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.log.entity.Log;
import com.example.demo.log.entity.LogDTO;
import com.example.demo.log.repository.LogRepository;

@Service
@Transactional
public class LogService implements ILogService {
	
	@Autowired
	private LogRepository logRepository;

	@Override
	public void save(Log Log) {
		logRepository.save(Log);
	}

	@Override
	public void delete(Long id) {
		logRepository.deleteById(id);
	}

	@Override
	public void deleteAll(Long[] ids) {
		List<Long> idLists = new ArrayList<Long>(Arrays.asList(ids));
		
		List<Log> logs = (List<Log>) logRepository.findAllById(idLists);
		if(logs!=null) {
			logRepository.deleteAll(logs);
		}
	}

	@Override
	public Log findOne(Long id) {
		return logRepository.findById(id).get();
	}

	@Override
	public Page<LogDTO> findAll(Specification<Log> spec, Pageable pageable) {
		Page<Log> list =  logRepository.findAll(spec, pageable);
		List<LogDTO> dtoLists = new ArrayList<LogDTO>();
		for (Log entity : list.getContent()) {
			LogDTO dto = new LogDTO();
			BeanUtils.copyProperties(entity, dto);
			if(entity.getEmployee()!=null) {
				dto.setEmployeeName(entity.getEmployee().getEmployeeName());
				if(entity.getEmployee().getLocalStore()!=null) {
					dto.setStoreName(entity.getEmployee().getLocalStore().getStoreName());
				}
			}
			dto.setDay(new Date());
			dtoLists.add(dto);
		}
		return new PageImpl<LogDTO>(dtoLists, pageable, list.getTotalElements());
	}

	@Override
	public List<LogDTO> findAllLog(Specification<Log> spec) {
		List<LogDTO> dtoLists = new ArrayList<LogDTO>();
		List<Log> logs=logRepository.findAll(spec);
		for(Log entity:logs) {
			LogDTO dto = new LogDTO();
			BeanUtils.copyProperties(entity, dto);
			if(entity.getEmployee()!=null) {
				dto.setEmployeeName(entity.getEmployee().getEmployeeName());
				if(entity.getEmployee().getLocalStore()!=null) {
					dto.setStoreName(entity.getEmployee().getLocalStore().getStoreName());
				}
			}
			dtoLists.add(dto);
		}
		return dtoLists;
	}

}
