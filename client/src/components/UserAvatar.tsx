import Avatar from 'boring-avatars';

interface UserAvatarProps {
  name: string;
  size?: number;
}

export function UserAvatar({ name, size = 40 }: UserAvatarProps) {
  // Compute consistent Bauhaus-inspired color choice
  const charSum = (name || '').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colorIndex = charSum % 3;
  const colors = [['#E03C31', '#005BBB', '#FFD100'][colorIndex]];

  return (
    <div style={{ 
      width: `${size}px`, 
      height: `${size}px`, 
      border: 'var(--line-thickness) solid var(--border-color)', 
      borderRadius: '50%', 
      overflow: 'hidden',
      flexShrink: 0,
      background: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Avatar 
        size={size} 
        name={name} 
        variant="beam" 
        colors={colors} 
      />
    </div>
  );
}
