package com.connectify.repositories;

import com.connectify.models.Room;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoomRepository extends MongoRepository<Room,String> {
    // fetch room by room id
   Room findByRoomId(String roomId);
}
