import React, { useEffect, useRef } from "react";
import Peer from "simple-peer";
import io from "socket.io-client";

const VideoChat = () => {
  const userVideo = useRef();
  const partnerVideo = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = io.connect("/"); // Your server URL here

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }

      socket.current.on("callUser", (data) => {
        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on("signal", (signal) => {
          socket.current.emit("acceptCall", { signal, to: data.from });
        });

        peer.on("stream", (stream) => {
          if (partnerVideo.current) {
            partnerVideo.current.srcObject = stream;
          }
        });

        peer.signal(data.signal);
      });
    });
  }, []);

  return (
    <div>
      <video playsInline muted ref={userVideo} autoPlay />
      <video playsInline ref={partnerVideo} autoPlay />
    </div>
  );
};

export default VideoChat;
