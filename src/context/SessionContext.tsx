"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { MockAccount } from "@/types/account";
import { MOCK_ACCOUNTS } from "@/data/mockAccounts";

type SessionAction = 
  | { type: "SUBMIT_CLAIM"; payload: any }
  | { type: "UPLOAD_DOCUMENT"; payload: any }
  | { type: "CONNECT_DIGILOCKER" }
  | { type: "MARK_NOTIFICATION_READ"; payload: string };

interface SessionContextType {
  user: MockAccount | null;
  isLoading: boolean;
  login: (identifier: string, passOrOtp: string, isOtp?: boolean) => boolean;
  logout: () => void;
  dispatch: (action: SessionAction) => void;
  switchAccount: (accountId: string) => void; // for the demo switcher
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockAccount | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load from local storage on mount
  useEffect(() => {
    const storedUserId = localStorage.getItem("epfo_mock_session");
    if (storedUserId && MOCK_ACCOUNTS[storedUserId]) {
      setUser(MOCK_ACCOUNTS[storedUserId]);
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = (identifier: string, passOrOtp: string, isOtp = false) => {
    // Find account by email or phone
    const account = Object.values(MOCK_ACCOUNTS).find(
      (acc) => acc.email === identifier || acc.phone === identifier
    );

    if (!account) return false;

    if (isOtp) {
      if (account.fixedOtp !== passOrOtp) return false;
    } else {
      if (account.passwordHash !== passOrOtp) return false;
    }

    setUser(account);
    localStorage.setItem("epfo_mock_session", account.id);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("epfo_mock_session");
  };

  const switchAccount = (accountId: string) => {
    if (MOCK_ACCOUNTS[accountId]) {
      setUser(MOCK_ACCOUNTS[accountId]);
      localStorage.setItem("epfo_mock_session", accountId);
    }
  };

  const dispatch = (action: SessionAction) => {
    if (!user) return;

    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev };
      const now = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

      switch (action.type) {
        case "SUBMIT_CLAIM":
          updated.claims = [
            {
              id: `CLM-${Math.floor(Math.random() * 10000)}`,
              type: action.payload.type,
              dateSubmitted: now,
              status: "processing",
            },
            ...updated.claims,
          ];
          updated.recentActivities = [
            { id: `act-${Date.now()}`, date: now, title: "Claim submitted", type: "claim" },
            ...updated.recentActivities,
          ];
          updated.notifications = [
            { id: `notif-${Date.now()}`, date: now, title: "Claim submitted", message: "Your claim is now processing.", read: false, link: "/claim/status" },
            ...updated.notifications,
          ];
          break;
        case "UPLOAD_DOCUMENT":
          updated.documents = [
            {
              id: `doc-${Date.now()}`,
              name: action.payload.name,
              source: "upload",
              status: "available",
              dateAdded: now,
            },
            ...updated.documents,
          ];
          updated.recentActivities = [
            { id: `act-${Date.now()}`, date: now, title: "Document uploaded", type: "document" },
            ...updated.recentActivities,
          ];
          break;
        case "CONNECT_DIGILOCKER":
          updated.digiLockerConnected = true;
          updated.digiLockerSyncDate = now;
          updated.recentActivities = [
            { id: `act-${Date.now()}`, date: now, title: "DigiLocker connected", type: "security" },
            ...updated.recentActivities,
          ];
          updated.notifications = [
            { id: `notif-${Date.now()}`, date: now, title: "DigiLocker Connected", message: "Your DigiLocker account was successfully linked.", read: false, link: "/dashboard/documents" },
            ...updated.notifications,
          ];
          break;
        case "MARK_NOTIFICATION_READ":
          updated.notifications = updated.notifications.map(n => 
            n.id === action.payload ? { ...n, read: true } : n
          );
          break;
      }
      // Update local storage so state persists
      // Note: In a real app we wouldn't mutate MOCK_ACCOUNTS but for this prototype 
      // saving the mutated user back to MOCK_ACCOUNTS in memory or just keeping it in state is fine.
      // We will just keep it in state. A page reload will reset the mutations, which is okay for a prototype, 
      // unless we save the whole user object to localStorage. Let's do that.
      localStorage.setItem(`epfo_mock_session_data_${updated.id}`, JSON.stringify(updated));
      return updated;
    });
  };

  // We should also try to load the mutated data if it exists
  useEffect(() => {
    if (user) {
      const savedData = localStorage.getItem(`epfo_mock_session_data_${user.id}`);
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          // Only merge if the base ID is the same
          if (parsed.id === user.id && JSON.stringify(parsed) !== JSON.stringify(user)) {
             setUser(parsed);
          }
        } catch (e) {}
      }
    }
  }, [user?.id]);

  return (
    <SessionContext.Provider value={{ user, isLoading, login, logout, dispatch, switchAccount }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
