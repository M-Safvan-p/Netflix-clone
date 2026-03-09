import { memo } from "react";

const ReasonCard = ({ title, description, Icon }) => {
  return (
    <div className="relative min-h-65 rounded-xl bg-gradient-to-br from-[#192043] to-[#210E17] p-6 overflow-hidden">
      {/* Text */}
      <div className="max-w-[75%] space-y-2">
        <p className="text-2xl font-bold text-white">
          {title}
        </p>
        <p className="text-sm text-gray-400 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Icon */}
      <Icon size={56} className="absolute bottom-5 right-5 text-pink-600 opacity-80" />
      
    </div>
  );
};

export default memo(ReasonCard);
