import React, { useEffect, useRef, useState } from 'react';

interface ReviewToggleProps {
  description: string;
}

function ReviewToggle({ description }: ReviewToggleProps) {
  const [isExpanded, setIsExpanded] = useState(false); // 더보기, 접기
  const [showToggle, setShowToggle] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (textRef.current) {
      const lineHeight = parseFloat(getComputedStyle(textRef.current).lineHeight);
      const maxHeight = lineHeight * 3;
      if (textRef.current.scrollHeight > maxHeight) {
        setShowToggle(true);
      }
    }
  }, []);

  return (
    <div className="relative">
      <p
        ref={textRef}
        style={{
          maxHeight: isExpanded ? 'none' : '72px'
        }}
        className={`text-ellipsis ${isExpanded ? 'overflow-visible' : 'overflow-hidden'} text-#111111 text-[15px] leading-[22px] md:leading-[24px] pb-[12px] md:pb-[20px]`}
      >
        {description}
      </p>
      {showToggle && (
        <button onClick={toggleExpand} className="text-[12px] text-font/sub2 pb-5">
          {isExpanded ? '접기 ∧' : '더보기 ∨'}
        </button>
      )}
    </div>
  );
}

export default ReviewToggle;
