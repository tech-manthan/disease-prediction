import { create } from "zustand";

export interface Data {
  Date: string;
  Disaster_Type: string;
  Region: string;
  Temperature: number;
  Rainfall: number;
  Humidity: number;
  Population_Density: number;
  Healthcare_Access: number;
}

export interface Notification {
  id: string;
  message: Data;
  read?: boolean;
}

interface NotificationStore {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  clearNotifications: () => void;
  clearReadNotifications: () => void;
  markAsRead: (id: string) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
    })),
  clearNotifications: () => set({ notifications: [] }),
  clearReadNotifications: () =>
    set((state) => ({
      notifications: state.notifications.filter((n) => !n.read),
    })),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),
}));
