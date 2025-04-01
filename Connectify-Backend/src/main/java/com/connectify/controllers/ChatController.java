package com.connectify.controllers;

import com.connectify.models.Message;
import com.connectify.models.Room;
import com.connectify.payload.MessageRequest;
import com.connectify.repositories.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/v1/chat")
public class ChatController {
    @Autowired
    private RoomRepository roomRepository;

//    For sending and receiving messages in a room ; At same place we ll be sending and receiving the messages.
    @MessageMapping("/sendMessage/{roomId}") // client sends message to this endpoint ; /app/sendMessage/roomId ; connection establishment
    @SendTo("/topic/room/{roomId}") // client subscribes to this topic ; /topic/room/roomId
   public Message sendMessage(@DestinationVariable String roomId, @RequestBody MessageRequest request) throws Exception {
        Room room = roomRepository.findByRoomId(roomId);
        Message message = new Message(request.getSender(),request.getContent());
        if(room!=null) {
            room.getMessages().add(message);
            roomRepository.save(room);
        }
        else {
            throw new RuntimeException("Room not found");
        }
        return message;
    }

}

// Websocket built on top of http ; it is a protocol that allows for full-duplex realtime communication between a client and a server. Also establishes a connection between the client and the server once the connection is established, the server can push data to the client without the client having to request it. This is useful for chat applications, multiplayer games, and other applications that require realtime communication. ;  Low level protocol
// Stomp (simple test oriented messaging protocol) is built on top of Websocket and provides a simple way to send and receive messages between clients and servers. It is a subprotocol of Websocket that defines a set of commands and message formats for realtime communication. makes websocket easier to use by providing a higher level of abstraction.
// SockJS (Fallback mechanism for Websocket ; uses polling) is a JavaScript library that provides a fallback mechanism for browsers that do not support Websocket. It allows for realtime communication between clients and servers using a variety of transport mechanisms, including Websocket, AJAX, and others. It is used in conjunction with Stomp to provide a seamless realtime communication experience across all browsers.