import { useState, useEffect } from 'react';

const USAGE_LIMIT = 5; // Limite de 5 usos
const STORAGE_KEY = 'hourlyUsageTracker'; // Chave de armazenamento

// Função auxiliar para obter o identificador da hora atual (ex: "2025-08-12-21")
const getCurrentHourIdentifier = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');
  return `${year}-${month}-${day}-${hour}`;
};

export const useUsageTracker = () => {
  const [remainingUses, setRemainingUses] = useState(USAGE_LIMIT);
  const [isLimitReached, setIsLimitReached] = useState(false);

  useEffect(() => {
    const currentHourId = getCurrentHourIdentifier();
    let usageData;

    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      usageData = savedData ? JSON.parse(savedData) : { count: 0, hourId: currentHourId };
    } catch (error) {
      usageData = { count: 0, hourId: currentHourId };
    }

    // Se a hora salva for de uma hora anterior, reseta o contador
    if (usageData.hourId !== currentHourId) {
      usageData = { count: 0, hourId: currentHourId };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(usageData));
    }
    
    const usesLeft = USAGE_LIMIT - usageData.count;
    setRemainingUses(usesLeft > 0 ? usesLeft : 0);
    setIsLimitReached(usesLeft <= 0);
  }, []);

  const trackUsage = () => {
    const currentHourId = getCurrentHourIdentifier();
    const savedData = localStorage.getItem(STORAGE_KEY);
    let usageData = savedData ? JSON.parse(savedData) : { count: 0, hourId: currentHourId };
    
    // Reseta se a hora mudou desde a última vez que o componente foi carregado
    if (usageData.hourId !== currentHourId) {
        usageData = { count: 0, hourId: currentHourId };
    }

    if (usageData.count >= USAGE_LIMIT) {
      setIsLimitReached(true);
      return false; // Não permite o uso
    }

    // Incrementa o uso
    usageData.count += 1;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usageData));
    
    const usesLeft = USAGE_LIMIT - usageData.count;
    setRemainingUses(usesLeft);
    if (usesLeft <= 0) {
      setIsLimitReached(true);
    }

    return true; // Permite o uso
  };

  return { remainingUses, isLimitReached, trackUsage };
};