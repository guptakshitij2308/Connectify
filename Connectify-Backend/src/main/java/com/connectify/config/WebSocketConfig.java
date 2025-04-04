package com.connectify.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
//        STOMP Endpoint here which the client wants to subscribe / establish connection to
        registry.addEndpoint("/chat")
                .setAllowedOriginPatterns("*")
                .withSockJS(); // for fallback
    }

    @Override
//    Message broker is an intermediary program that translates a message from the formal messaging protocol of the sender to the formal messaging protocol of the receiver. It helps to route the message.
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic"); // simple in memory message broker. ; all the messages sent by the server would be prefixed by /topic ; /topic/messages
        config.setApplicationDestinationPrefixes("/app"); // all the messages sent by the client would be prefixed by /app ; /app/chat.sendMessage ; server-side : @MessagingMapping("/chat")
    }
}
