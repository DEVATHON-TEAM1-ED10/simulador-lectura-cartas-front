// 1. Definimos las props para permitir la personalización
interface EyeSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: {
    background: string;
    border: string;
    lid: string;
    pupil: string;
  };
  className?: string;
}

// 2. Creamos el componente funcional
const Spinner = ({
  size = 'medium',
  color = {
    background: '#fff',
    border: '#60531f',
    lid: '#263238',
    pupil: '#111',
  },
  className = '',
}: EyeSpinnerProps) => {
  // 3. Mapeamos el tamaño a clases de Tailwind (usando valores arbitrarios para coincidir con el original)
  const sizeClasses = {
    small: 'w-12 h-12 border-2',
    medium: 'w-[78px] h-[78px] border-[8px]', // Valores originales
    large: 'w-24 h-24 border-4',
  };

  // 4. Inyectamos los colores en las variables de CSS definidas en input.css
  //    Hacemos un cast a React.CSSProperties para que TypeScript no se queje.
  const dynamicStyles = {
    '--loader-bg': color.background,
    '--loader-border': color.border,
    '--loader-lid': color.lid,
    '--loader-pupil': color.pupil,
  } as React.CSSProperties;

  return (
    <div
      className={`
        eye-spinner
        relative
        rounded-full
        box-border
        overflow-hidden
        ${sizeClasses[size]}
        ${className}
      `}
      style={dynamicStyles}
      role="status"
      aria-label="Loading content..."
    />
  );
};

export default Spinner;
