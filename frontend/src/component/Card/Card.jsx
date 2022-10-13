import React from "react";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
function Card({ video }) {
  const navigate = useNavigate();
  const videoPlay = () => {
    navigate(`/playVideo/${video._id}`);
  };
  return (
    <div className="">
      <Box
        onClick={videoPlay}
        maxW={"445px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <Box
          h={"210px"}
          bg={"gray.100"}
          mt={-6}
          mx={-6}
          mb={6}
          pos={"relative"}
        >
          <video src={video.videoUrl} layout={"fill"} />
        </Box>
      </Box>
      <Text>{video.title}</Text>
      <p>{video.desc}</p>
      <div className="mt-2   ">
        <button
          type="button"
          class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Like {video.likes.length}{" "}
        </button>
        <button
          type="button"
          class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Dislike {video.disLikes}{" "}
        </button>
        <span
          type="button"
          class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          View {video.views}{" "}
        </span>
      </div>
    </div>
  );
}

export default Card;
