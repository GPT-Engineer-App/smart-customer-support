import { Box, Container, Flex, VStack, Textarea, Button, Text } from "@chakra-ui/react";
import { useState } from "react";

const Index = () => {
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [aiSuggestions, setAiSuggestions] = useState(["Hello! How can I assist you today?", "Can you provide more details?", "Thank you for reaching out!"]);

  const handleSendMessage = () => {
    if (userMessage.trim() !== "") {
      setChatHistory([...chatHistory, { sender: "user", message: userMessage }]);
      setUserMessage("");
    }
  };

  return (
    <Container maxW="container.xl" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Flex width="100%" height="80%" border="1px solid #ccc" borderRadius="md" overflow="hidden">
        {/* Chatbox Area */}
        <Box flex="2" p={4} borderRight="1px solid #ccc">
          <VStack spacing={4} align="stretch" height="100%">
            <Box flex="1" overflowY="auto" border="1px solid #ccc" borderRadius="md" p={2}>
              {chatHistory.map((chat, index) => (
                <Text key={index} align={chat.sender === "user" ? "right" : "left"}>
                  {chat.message}
                </Text>
              ))}
            </Box>
            <Textarea
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Type your message here..."
              size="sm"
            />
            <Button onClick={handleSendMessage} colorScheme="blue" size="sm">
              Send
            </Button>
          </VStack>
        </Box>
        {/* AI Assistance Area */}
        <Box flex="1" p={4}>
          <Text fontSize="xl" mb={4}>AI Suggestions</Text>
          <VStack spacing={4} align="stretch">
            {aiSuggestions.map((suggestion, index) => (
              <Button key={index} variant="outline" size="sm" onClick={() => setUserMessage(suggestion)}>
                {suggestion}
              </Button>
            ))}
          </VStack>
        </Box>
      </Flex>
    </Container>
  );
};

export default Index;