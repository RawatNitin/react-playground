import { useState } from "react";
import { useBroadcastChannel } from "./broadcast-channel";

export const BroadcastChannelApi = () => {
  const [name, setName] = useState("");

  const onMessage = (message) => {
    setName(message.data);
  };

  const { sendMessage } = useBroadcastChannel({ onMessage });

  const onChange = (name) => {
    sendMessage(name);
    setName(name);
  };

  return (
    <div>
      <label aria-label="name" htmlFor="name">
        Name:
      </label>
      <input
        type="text"
        id="name"
        onChange={(e) => onChange(e.target.value)}
        value={name}
      />
    </div>
  );
};
