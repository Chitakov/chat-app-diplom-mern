// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const ChatPage = () => {
//   // const [chats, setChats] = useState([]);
//   // const fetchChats = async () => {
//   //   const { data } = await axios.get("/api/chat");
//   //   setChats(data);
//   // };
//   // useEffect(() => {
//   //   fetchChats();
//   // }, []);
//   return (
//     <div>
//       {/* {chats.map((chat) => (
//         <div key={chat._id}>{chat.chatName}</div>
//       ))} */}
//     </div>
//   );
// };

// export default ChatPage;

import { Box } from "@chakra-ui/layout";
import React, { useState } from "react";
import Chatbox from "../components/ChatBox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";

const ChatPage = () => {
  // const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <Box style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {/* {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )} */}
        {user && <MyChats />}
        {user && <Chatbox />}
      </Box>
    </Box>
  );
};

export default ChatPage;
