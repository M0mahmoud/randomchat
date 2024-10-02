import React from "react";

const PrivateChat = ({
  params: { chatWith },
}: {
  params: { chatWith: string };
}) => {
  return <h1>PrivateChat with {chatWith}</h1>;
};

export default PrivateChat;
