"use client";

import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { ref, onValue, off, remove, DataSnapshot } from "firebase/database";

import { rtdb } from "@/db/firebase";
import { timeFormat } from "@/lib/utils";
import { useRouter } from "@/i18n/routing";

interface Notification {
  id: string;
  message: string;
  sender: string;
  timestamp: number;
  read: boolean;
  type: "message" | "friendRequest";
  text: string;
}

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  console.log(notifications);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    const notificationsRef = ref(rtdb, `notifications/${user.displayName}`);

    const handleValueChange = (snapshot: DataSnapshot) => {
      const data = snapshot.val();
      if (data) {
        const notificationList = Object.entries(data).map(([notifId, noti]) => {
          const notification = noti as Notification;
          return {
            ...notification,
            id: notifId, // Ensure that the id is correctly assigned
          };
        });
        setNotifications(notificationList);
      } else {
        setNotifications([]);
      }
    };

    onValue(notificationsRef, handleValueChange);

    // Properly clean up the listener
    return () => {
      off(notificationsRef, "value", handleValueChange);
    };
  }, [user]);

  const unreadCount = notifications.length;

  const handleNotificationClick = (notification: Notification) => {
    if (user?.uid) {
      remove(ref(rtdb, `notifications/${user.displayName}/${notification.id}`));
    }
    router.push(`/chat/${notification.sender}`);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="size-5" />
          {unreadCount > 0 && (
            <p className="absolute -top-1 -right-1 px-2 py-1 text-xs">
              {unreadCount}
            </p>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        {notifications.length === 0 ? (
          <DropdownMenuItem>No new notifications</DropdownMenuItem>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              className={`flex flex-col items-start ${
                notification.read ? "opacity-50" : ""
              }`}
            >
              <span className="text-sm">{notification.message}</span>
              <span className="font-semibold">{notification.text}</span>
              <span className="text-xs text-muted-foreground">
                {timeFormat(new Date(notification.timestamp))}
              </span>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
