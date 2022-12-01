package com.iu.home.chat;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import lombok.extern.slf4j.Slf4j;

@Controller
@RequestMapping("/chat/*")
@Slf4j
public class MainController {
	
	List<RoomVO> roomList = new ArrayList<RoomVO>();
	static int roomNumber = 0;

	@RequestMapping("/chat")
	public ModelAndView chat() {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("chat/chat");
		return mv;
	}
	
	@RequestMapping("/room")
	public ModelAndView room() {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("chat/room");
		log.info("roomlist /room => {}", roomList);
		return mv;
	}
	
	/**
	 * 방 생성하기
	 * @param params
	 * @return
	 */
	@RequestMapping("/createRoom")
	public @ResponseBody List<RoomVO> createRoom(@RequestParam HashMap<Object, Object> params){
		String roomName = (String) params.get("roomName");
		if(roomName != null && !roomName.trim().equals("")) {
			RoomVO room = new RoomVO();
			room.setRoomNumber(++roomNumber);
			room.setRoomName(roomName);
			roomList.add(room);
			log.info("room list => {}", roomList);
		}
		return roomList;
	}
	
	/**
	 * 방 정보가져오기
	 * @param params
	 * @return
	 */
	@RequestMapping("/getRoom")
	public @ResponseBody List<RoomVO> getRoom(@RequestParam HashMap<Object, Object> params){
		log.info("getroom => {}", params);
		return roomList;
	}
	
	/**
	 * 채팅방
	 * @return
	 */
	@RequestMapping("/moveChating")
	public ModelAndView chating(@RequestParam HashMap<Object, Object> params) {
		ModelAndView mv = new ModelAndView();
		int roomNumber = Integer.parseInt((String) params.get("roomNumber"));
		
		List<RoomVO> new_list = roomList.stream().filter(o->o.getRoomNumber()==roomNumber).collect(Collectors.toList());
		if(new_list != null && new_list.size() > 0) {
			mv.addObject("roomName", params.get("roomName"));
			mv.addObject("roomNumber", params.get("roomNumber"));
			mv.setViewName("chat/chat");
		}else {
			mv.setViewName("chat/room");
		}
		return mv;
	}
}
