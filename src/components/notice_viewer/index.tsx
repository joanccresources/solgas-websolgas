"use client";
import { useEffect, useState } from "react";

interface MessageData {
  message: string;
  timestamp: number;
}

export default function NoticeViewer() {
  const [, setReceivedData] = useState<MessageData | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Verificar el origen para evitar ataques de seguridad

      // Validar si los datos cumplen con la estructura esperada
      const data = event.data as MessageData;
      if (data.message && typeof data.timestamp === "number") {
        setReceivedData(data);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);
  return <div></div>;
}
