package com.connectify.controllers;

import com.connectify.models.Message;
import com.connectify.models.Room;
import com.connectify.repositories.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/v1/rooms")
public class RoomController {
    @Autowired
    private RoomRepository roomRepository;

    // create room
    @PostMapping
    public ResponseEntity<?> createRoom(@RequestBody String roomId) {
        if(roomRepository.findByRoomId(roomId)!=null) {
            // room already exists
            return ResponseEntity.badRequest().body("Room is already created.");
        }
        // create room
        Room room = new Room();
        room.setRoomId(roomId);
        Room newRoom=roomRepository.save(room);
        return ResponseEntity.status(HttpStatus.CREATED).body(newRoom);
    }

    // get room : Join a room
    @GetMapping("/{roomId}")
    public ResponseEntity<?> joinRoom(@PathVariable String roomId) {
        Room room = roomRepository.findByRoomId(roomId);
        if(room==null) {
            return ResponseEntity.badRequest().body("Room does not exist.");
        }
        return ResponseEntity.ok(room);
    }
    // get messages of room
    @GetMapping("/{roomId}/messages")
    public ResponseEntity<List<Message>> getMessages(@PathVariable String roomId,
                                                     @RequestParam(value="page",defaultValue = "0",required = false)int page,
                                                     @RequestParam(value="size",defaultValue = "20",required = false)int size) {
        Room room = roomRepository.findByRoomId(roomId);
        if(room==null) return ResponseEntity.badRequest().build();
        List<Message> messages = room.getMessages();
        int start = Math.max(0,messages.size()-(page+1)*size);
        int end = Math.min(messages.size(),start+size);
        List<Message>paginatedMessages = messages.subList(start,end);
        return ResponseEntity.ok(paginatedMessages);
    }
}
