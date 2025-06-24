
export type ButtonSize = 'small' | 'medium' | 'large';

const sizeStyles = {
  small: {
    fontSize: '1.6rem',
    padding: '0.1rem 0.75rem',
    minHeight: '32px',
    minWidth: '80px',
  },
  medium: {
    fontSize: '2rem',
    lineHeight: '0',
    padding: '0.1rem 1rem',
    minHeight: '40px',
    minWidth: '100px',
  },
  large: {
    fontSize: '2.50rem',
    padding: '0.1rem 1.5rem',
    minHeight: '48px',
    minWidth: '120px',
  },
};

export default function RoundedButton({size, children, ...rest}: {size: ButtonSize, children: React.ReactNode} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className="inline-flex items-center justify-center overflow-hidden font-thin border-1 border-gray-800 rounded-lg  bg-transparent cursor-pointer transition-colors duration-300 ease-in-out hover:border-cyan-600 dark:border-gray-400 dark:hover:border-cyan-300" style={sizeStyles[size ?? 'medium']} {...rest}>{children}</button>;
}
