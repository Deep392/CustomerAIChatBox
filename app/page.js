"use client";
import { useState } from "react";
import { Box, Button, TextField, Typography, Stack, Paper} from "@mui/material";

export default function Home() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `Hello! I'm your AI support assistant. How can I help you today?` },
  ]);
  const sendMessage = async () => {
    setMessage('')
    setMessages((messages) => [...messages, {role: 'user', content: message}])
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify([...messages, {role: 'user', content: message} ]),
  })
  const data = await response.json();
  setMessages((messages) => [...messages, {role: 'assistant', content: data.message}]);
  }
  const [message, setMessage] = useState('');
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#f5f5f5"
      p={2}
    >
      <Paper
        elevation={4}
        sx={{
          width: '100%',
          maxWidth: '600px',
          height: '80vh',
          borderRadius: '12px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          bgcolor="#d71920"
          color="white"
          p={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h6" fontWeight="bold">
            AI Support
          </Typography>
        </Box>

        <Stack
          direction="column"
          spacing={2}
          p={2}
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            bgcolor: '#f9f9f9',
          }}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={message.role === 'assistant' ? 'flex-start' : 'flex-end'}
            >
              <Box
                bgcolor={message.role === 'assistant' ? '#d71920' : '#007a3d'}
                color="white"
                borderRadius={2}
                p={1.5}
                maxWidth="75%"
                boxShadow={2}
              >
                <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                  {message.content}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          p={2}
          borderTop="1px solid #e0e0e0"
          bgcolor="#fff"
        >
          <TextField
            label="Type your message..."
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            variant="outlined"
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#d71920', // Red border for input field
                },
                '&:hover fieldset': {
                  borderColor: '#007a3d', // Green border on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#007a3d', // Green border when focused
                },
              },
              bgcolor: '#fff', // White background for input field
              borderRadius: '8px',
            }}
          />
          <Button
            variant="contained"
            onClick={sendMessage}
            sx={{
              bgcolor: '#d71920',
              '&:hover': { bgcolor: '#007a3d' },
              borderRadius: '8px',
              textTransform: 'none',
              px: 3,
            }}
          >
            Send
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
