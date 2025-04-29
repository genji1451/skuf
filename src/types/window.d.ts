export interface TelegramWebApps {
  WebApp: {
    ready(): void;
    expand(): void;
    close(): void;
    isExpanded: boolean;
    isFullscreen: boolean;
    requestFullscreen(): void;
    exitFullscreen(): void;
    onEvent(eventType: 'fullscreenChanged' | 'viewportChanged', eventHandler: () => void): void;
    offEvent(eventType: 'fullscreenChanged' | 'viewportChanged', eventHandler: () => void): void;
    MainButton: {
      text: string;
      color: string;
      textColor: string;
      isVisible: boolean;
      isActive: boolean;
      show(): void;
      hide(): void;
      onClick(callback: () => void): void;
      offClick(callback: () => void): void;
    };
    initData: string;
    initDataUnsafe: {
      user?: {
        id: number;
        first_name: string;
        last_name?: string;
        username?: string;
        language_code?: string;
        photo_url?: string;
      };
    };
  };
}

declare global {
  interface Window {
    Telegram: TelegramWebApps;
  }
}

export {}; 