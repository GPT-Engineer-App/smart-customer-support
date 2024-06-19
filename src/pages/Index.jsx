import { Box, Container, Flex, VStack, Textarea, Button, Text, Heading, List, ListItem, Tooltip, IconButton, Input, Icon } from "@chakra-ui/react";
import { useState } from "react";
import { FaMagic, FaMicrophone, FaImage } from "react-icons/fa";

const Index = () => {
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: "customer", message: "Hello, I need help with my order." },
    { sender: "service", message: "Sure, I'd be happy to help. Can you provide your order number?" }
  ]);
  const [aiSuggestions, setAiSuggestions] = useState(["Hello! How can I assist you today?", "Can you provide more details?", "Thank you for reaching out!"]);
  const [knowledgeBase, setKnowledgeBase] = useState([
    "Knowledge base info for suggestion 1",
    "Knowledge base info for suggestion 2",
    "Knowledge base info for suggestion 3"
  ]);

  const mockProfile = {
    username: "JohnDoe",
    recentOrders: [
      "Order #1234 - Widget A",
      "Order #5678 - Widget B",
      "Order #9101 - Widget C"
    ]
  };

  const handleSendMessage = () => {
    if (userMessage.trim() !== "") {
      setChatHistory([...chatHistory, { sender: "user", message: userMessage }]);
      setUserMessage("");
    }
  };

  const handleOptimizeResponse = (index) => {
    // Logic to optimize the response
    console.log("Optimizing response for suggestion:", aiSuggestions[index]);
  };

  const handleVoiceMessage = () => {
    // Logic to handle voice message
    console.log("Voice message feature is not implemented yet.");
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Logic to handle image upload
      console.log("Image uploaded:", file.name);
    }
  };

  const customerMessageStyle = {
    backgroundColor: "#e0f7fa",
    borderRadius: "10px",
    padding: "8px",
    marginBottom: "4px",
    alignSelf: "flex-start",
  };

  const serviceMessageStyle = {
    backgroundColor: "#fff3e0",
    borderRadius: "10px",
    padding: "8px",
    marginBottom: "4px",
    alignSelf: "flex-end",
  };

  const profileSectionStyle = {
    backgroundColor: "#f1f1f1",
    borderRadius: "10px",
    padding: "16px",
    marginBottom: "16px",
  };

  const orderListStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    padding: "8px",
    marginBottom: "4px",
  };

  return (
    <Container maxW="container.xl" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Flex width="100%" height="80%" border="1px solid #ccc" borderRadius="md" overflow="hidden">
        {/* Chatbox Area */}
        <Box flex="2" p={4} borderRight="1px solid #ccc">
          <VStack spacing={4} align="stretch" height="100%">
            <Box flex="1" overflowY="auto" border="1px solid #ccc" borderRadius="md" p={2}>
              {chatHistory.map((chat, index) => (
                <Text
                  key={index}
                  align={chat.sender === "user" ? "right" : "left"}
                  style={chat.sender === "user" ? customerMessageStyle : serviceMessageStyle}
                >
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
            <Flex>
              <Button onClick={handleSendMessage} colorScheme="blue" size="sm">
                Send
              </Button>
              <IconButton
                icon={<FaMicrophone />}
                size="sm"
                ml={2}
                onClick={handleVoiceMessage}
                aria-label="Send Voice Message"
              />
              <Input
                type="file"
                accept="image/*"
                display="none"
                onChange={handleImageUpload}
                id="image-upload"
              />
              <label htmlFor="image-upload">
                <IconButton
                  icon={<FaImage />}
                  size="sm"
                  ml={2}
                  as="span"
                  aria-label="Upload Image"
                />
              </label>
            </Flex>
          </VStack>
        </Box>
        {/* AI Assistance Area */}
        <Box flex="1" p={4}>
          <Box p={4} borderBottom="1px solid #ccc" style={profileSectionStyle}>
            <Heading size="md" mb={2}>Customer Profile</Heading>
            <Text><strong>Username:</strong> {mockProfile.username}</Text>
            <Heading size="sm" mt={4} mb={2}>Recent Orders</Heading>
            <List spacing={2}>
              {mockProfile.recentOrders.map((order, index) => (
                <ListItem key={index} style={orderListStyle}>{order}</ListItem>
              ))}
            </List>
          </Box>
          <Text fontSize="xl" mb={4}>AI Suggestions</Text>
          <VStack spacing={4} align="stretch">
            {aiSuggestions.map((suggestion, index) => (
              <Box key={index} display="flex" alignItems="center">
                <Tooltip label={knowledgeBase[index]} aria-label="Knowledge Base Info">
                  <Button variant="outline" size="sm" onClick={() => setUserMessage(suggestion)}>
                    {suggestion}
                  </Button>
                </Tooltip>
                <IconButton
                  icon={<FaMagic />}
                  size="sm"
                  ml={2}
                  onClick={() => handleOptimizeResponse(index)}
                  aria-label="Optimize Response"
                />
              </Box>
            ))}
          </VStack>
        </Box>
      </Flex>
    </Container>
  );
};

export default Index;