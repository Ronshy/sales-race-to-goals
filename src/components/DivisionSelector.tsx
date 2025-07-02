
import React from 'react';
import { Card } from '@/components/ui/card';
import { Division, DIVISIONS } from '@/types/gameTypes';

interface DivisionSelectorProps {
  onSelectDivision: (division: Division) => void;
}

const DivisionSelector: React.FC<DivisionSelectorProps> = ({ onSelectDivision }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
      {DIVISIONS.map((division, index) => (
        <Card
          key={division.id}
          className={`
            relative overflow-hidden cursor-pointer transform transition-all duration-300 
            hover:scale-105 hover:shadow-2xl group bg-gradient-to-br ${division.color}
            border-0 animate-fade-in
          `}
          style={{ animationDelay: `${index * 100}ms` }}
          onClick={() => onSelectDivision(division)}
        >
          <div className="p-6 text-center text-white relative z-10">
            <div className="text-4xl mb-4 group-hover:animate-bounce">
              {division.icon}
            </div>
            <h3 className="text-lg font-bold mb-2">{division.name}</h3>
            <div className="text-sm opacity-80">
              Klik untuk masuk ke arena balap
            </div>
          </div>
          
          {/* Racing stripes effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-100%] transition-transform duration-1000"></div>
          
          {/* Checkered flag pattern overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-repeat-x opacity-30" 
               style={{
                 backgroundImage: `repeating-linear-gradient(
                   90deg,
                   black 0px,
                   black 10px,
                   white 10px,
                   white 20px
                 )`
               }}>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DivisionSelector;
