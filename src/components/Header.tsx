import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  showBackButton = false, 
  className = '',
  children 
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <header className={`bg-white border-b border-gray-200 sticky top-0 z-10 ${className}`}>
      <div className="max-w-md mx-auto md:max-w-4xl">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <button
                onClick={handleBack}
                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
            )}
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 truncate">
              {title}
            </h1>
          </div>
          {children && (
            <div className="flex items-center space-x-2">
              {children}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;