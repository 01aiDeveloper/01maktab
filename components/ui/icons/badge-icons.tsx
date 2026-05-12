interface IconProps {
  className?: string;
}

export function CardSlashSolid({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M5 5h14a3 3 0 0 1 3 3v1.5H2V8a3 3 0 0 1 3-3Zm17 6.5V16a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-4.5h20ZM6.5 14.5a1 1 0 0 0 0 2h3a1 1 0 1 0 0-2h-3Z"
      />
      <path
        d="M3 21 21 3"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function TickCircleSolid({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2Zm4.78 7.7-5.67 5.67a.75.75 0 0 1-1.06 0L7.22 12.54a.75.75 0 1 1 1.06-1.06l2.3 2.3 5.14-5.14a.75.75 0 1 1 1.06 1.06Z"
      />
    </svg>
  );
}

export function ClockSolid({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2Zm3.47 13.32a.75.75 0 0 1-1.04.25l-2.93-1.75c-.69-.41-1.2-1.31-1.2-2.11V7.26a.75.75 0 0 1 1.5 0v4.45c0 .27.2.62.43.76l2.93 1.75c.36.21.48.68.31 1.1Z"
      />
    </svg>
  );
}

export function Profile2UserSolid({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M9.16 11.62a1.18 1.18 0 0 0-.32 0 4.32 4.32 0 1 1 .32 0Zm6.86 1.34c-1.5-.99-3.6-1.36-5.54-1.1a4.34 4.34 0 0 0-.65.08c-3.4.62-5.81 2.49-5.81 4.71 0 2.43 2.86 4.4 6.4 4.4 3.43 0 6.22-1.84 6.4-4.13.04-.5.04-1.01 0-1.51-.05-.86-.36-1.71-.8-2.45ZM17 12c-1.97 0-3.57-1.6-3.57-3.57 0-1.97 1.6-3.57 3.57-3.57 1.97 0 3.57 1.6 3.57 3.57 0 1.97-1.6 3.57-3.57 3.57ZM20.83 14.6c-1.06-.7-2.55-.95-3.92-.74.32.74.43 1.55.43 2.4l-.02.27c-.05.49-.18.96-.4 1.4 1.96-.36 3.55-1.46 3.91-2.97l-.02-.36Z"
      />
    </svg>
  );
}
