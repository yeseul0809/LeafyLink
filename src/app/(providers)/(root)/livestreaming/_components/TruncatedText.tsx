'use client';

import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';

type Props = {
  description: string;
  lines: string;
  fontBold: boolean;
  textSize: string;
};

const TruncatedText = ({ description, lines, fontBold, textSize }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const lineHeight = parseInt(getComputedStyle(textRef.current).lineHeight, 10);
      const lines = textRef.current.clientHeight / lineHeight;
      setIsTruncated(lines > 2);
    }
  }, [description]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <p
        ref={textRef}
        className={`text-[${textSize}px] ${fontBold ? 'font-semibold' : ''} ${!isExpanded && isTruncated ? `truncate-${lines}-lines` : ''}`}
      >
        {description}
      </p>
      {isTruncated && (
        <button className="text-font/sub2 text-[12px] mt-2" onClick={toggleExpand}>
          {isExpanded ? (
            '접기'
          ) : (
            <div className="flex items-center gap-[4px]">
              <p>더보기</p>
              <Image src={'/icons/arrow-down.png'} alt="아래화살표" width={12} height={12} />
            </div>
          )}
        </button>
      )}
    </div>
  );
};

export default TruncatedText;
