import { useState } from "react";
import { Plus } from "lucide-react";

const FAQAccordion = ({ items }) => {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="px-6 py-10">
      <div className="mx-auto max-w-auto space-y-2">
        {items.map((item) => {
          const isOpen = openId === item.id;

          return (
            <div key={item.id} className="bg-[#2d2d2d]">
              {/* Header */}
              <button
                onClick={() => toggle(item.id)}
                className="flex w-full items-center justify-between p-6 text-left text-2xl font-medium text-white hover:bg-[#3a3a3a]"
                aria-expanded={isOpen}
              >
                {item.question}
                <Plus
                  className={`h-6 w-6 transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                />
              </button>

              {/* Content */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="p-6 pt-3 text-2xl text-gray-300">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQAccordion;