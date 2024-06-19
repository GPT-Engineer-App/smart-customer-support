import { Box, Container, Flex, VStack, Textarea, Button, Text, Heading, List, ListItem, Tooltip, IconButton, Input, Icon, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Switch } from "@chakra-ui/react";
import Chart from 'chart.js/auto';
import { useState } from "react";
import { FaMagic, FaMicrophone, FaImage, FaCog } from "react-icons/fa";
import { Line } from 'react-chartjs-2';
import { useDisclosure } from "@chakra-ui/react";

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
  const [sentimentData, setSentimentData] = useState([0, 1, 0, -1, 0, 1, 0]);
  const [userDemandAnalysis, setUserDemandAnalysis] = useState("User is looking for a refund due to a defective product.");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [autoReply, setAutoReply] = useState(false);
  const [threshold, setThreshold] = useState(0.5);

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

      if (autoReply && evaluateSuggestion(userMessage) > threshold) {
        // Logic to send auto-reply
        setChatHistory([...chatHistory, { sender: "service", message: "Auto-reply message based on threshold." }]);
      }
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

  const handleToggleAutoReply = () => {
    setAutoReply(!autoReply);
  };

  const evaluateSuggestion = (message) => {
    // Placeholder logic for evaluating the suggestion
    return Math.random(); // Replace with actual evaluation logic
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
    <Container maxW="container.xl" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" position="relative">
      <IconButton
        icon={<FaCog />}
        size="sm"
        position="absolute"
        top="10px"
        right="10px"
        onClick={onOpen}
        aria-label="Settings"
      />
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
        <Box flex="1" p={4} overflowY="auto" height="100%">
          <Box p={4} borderBottom="1px solid #ccc" style={profileSectionStyle}>
            <Heading size="md" mb={2}>Customer Profile</Heading>
            <Text><strong>Username:</strong> {mockProfile.username}</Text>
            <Heading size="sm" mt={4} mb={2}>Recent Orders</Heading>
            <List spacing={2}>
              {mockProfile.recentOrders.map((order, index) => (
                <ListItem key={index} style={orderListStyle}>{order}</ListItem>
              ))}
            </List>
            <Heading size="sm" mt={4} mb={2}>Sentiment Curve</Heading>
            <Line
              data={{
                labels: sentimentData.map((_, index) => `Message ${index + 1}`),
                datasets: [
                  {
                    label: 'Sentiment',
                    data: sentimentData,
                    fill: false,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                  },
                ],
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
            <Heading size="sm" mt={4} mb={2}>User Demand Analysis</Heading>
            <Text>{userDemandAnalysis}</Text>
          </Box>
          <Text fontSize="xl" mb={4}>AI Suggestions</Text>
          <VStack spacing={4} align="stretch">
            {aiSuggestions.map((suggestion, index) => (
              <Box key={index} display="flex" alignItems="center">
                <Tooltip label={knowledgeBase[index]} aria-label="Knowledge Base Info">
                  <Button variant="outline" size="sm" width="100%" onClick={() => setUserMessage(suggestion)}>
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex align="center">
              <Text mr={2}>Automatic Replies</Text>
              <Switch isChecked={autoReply} onChange={handleToggleAutoReply} />
            </Flex>
            <Flex align="center" mt={4}>
              <Tooltip label="Set the threshold for auto-reply. Auto-reply will be triggered if the evaluation score exceeds this value." aria-label="Threshold Info">
                <Text mr={2}>Threshold</Text>
              </Tooltip>
              <Input
                type="number"
                value={threshold}
                onChange={(e) => setThreshold(parseFloat(e.target.value))}
                min={0}
                max={1}
                step={0.01}
                defaultValue={0.5}
              />
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Index;