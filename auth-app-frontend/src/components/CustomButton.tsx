import React from 'react';

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'normal' | 'outline';
  isLoading?: boolean; 
  loadingLabel?: string;
  style?: React.CSSProperties; 
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onClick,
  disabled,
  variant = 'normal',
  isLoading = false,
  loadingLabel = 'Loading...',
  style,
  type = 'button',
}) => {
  const buttonStyle = variant === 'outline' ? outlineStyle : normalStyle;

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      style={{ ...buttonStyle, ...style }}
      className={`custom-button ${variant}`}
      type={type} 
    >
      {isLoading ? loadingLabel : label} 
    </button>
  );
};

const normalStyle: React.CSSProperties = {
  padding: '10px 20px',
  fontSize: '1em',
  backgroundColor: '#007BFF',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '5px',
  transition: 'background-color 0.3s',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  marginTop: 10,
  marginBottom: 10
};


const outlineStyle: React.CSSProperties = {
  padding: '10px 20px',
  fontSize: '1em',
  backgroundColor: 'transparent',
  color: '#007BFF',
  border: '2px solid #007BFF',
  cursor: 'pointer',
  borderRadius: '5px',
  transition: 'background-color 0.3s, color 0.3s',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  marginTop: 10,
  marginBottom: 10
};

export default React.memo(CustomButton);
