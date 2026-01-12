
export type AppMode = 'guest' | 'admin';

export interface GuestInfo {
  name: string;
}

export interface AdminProps {
  onExit: () => void;
  onPreview: (name: string) => void;
}

export interface InvitationProps {
  guestName: string;
  onOpenAdmin: () => void;
}
