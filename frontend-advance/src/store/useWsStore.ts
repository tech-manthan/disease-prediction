// stores/wsStore.ts
import { create } from "zustand";
import { useNotificationStore } from "./useNotificationStore";
import toast from "react-hot-toast";

interface WSStore {
  socket: WebSocket | null;
  connect: () => void;
  disconnect: () => void;
}

export const useWSStore = create<WSStore>((set, get) => ({
  socket: null,

  connect: () => {
    if (get().socket) return;

    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      toast.error(`${data.Disaster_Type} in ${data.Region}`);
      const notification = {
        id: Date.now().toString(),
        message: data,
        read: false,
      };
      useNotificationStore.getState().addNotification(notification);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
      set({ socket: null });
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    set({ socket });
  },

  disconnect: () => {
    const socket = get().socket;
    if (socket) {
      socket.close();
      set({ socket: null });
    }
  },
}));
