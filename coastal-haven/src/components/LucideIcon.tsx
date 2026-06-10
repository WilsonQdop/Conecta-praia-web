import React from 'react';
import * as Icons from 'lucide-react';

interface LucideIconProps {
  name: string;
  className?: string;
  size?: number;
  color?: string;
  fill?: string;
}

export const LucideIcon: React.FC<LucideIconProps> = ({
  name,
  className = '',
  size = 20,
  color,
  fill,
}) => {
  // Map some custom or standard names to avoid typos
  let resolvedName = name;
  if (name === 'set_meal') resolvedName = 'Fish';
  if (name === 'music_note') resolvedName = 'Music';
  if (name === 'restaurant') resolvedName = 'Utensils';
  if (name === 'calendar_today' || name === 'calendar_month') resolvedName = 'Calendar';
  if (name === 'location_on') resolvedName = 'MapPin';
  if (name === 'group') resolvedName = 'Users';
  if (name === 'arrow_back') resolvedName = 'ArrowLeft';
  if (name === 'share') resolvedName = 'Share2';
  if (name === 'favorite') resolvedName = 'Heart';
  if (name === 'event_available') resolvedName = 'CalendarCheck';
  if (name === 'explore') resolvedName = 'Compass';
  if (name === 'person') resolvedName = 'User';
  if (name === 'notifications') resolvedName = 'Bell';
  if (name === 'tune') resolvedName = 'SlidersHorizontal';

  // Find icon in Icons or default to HelpCircle
  const IconComponent = (Icons as any)[resolvedName] || Icons.HelpCircle;

  return (
    <IconComponent
      className={className}
      size={size}
      color={color}
      fill={fill}
    />
  );
};
export default LucideIcon;
