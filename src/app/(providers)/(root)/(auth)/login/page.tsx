import React from 'react';
import SocialLoginButtons from './_components/SocialLoginButtons';

function LoginPage() {
  return (
    <div className="flex flex-col justify-center items-center mt-[80px] mb-[180px] xs:mt-[24px] xs:mb-[46px]">
      <h1 className="text-[32px] font-semibold mb-[42px] xs:mb-[26px] xs:text-[20px]">
        로그인/회원가입
      </h1>
      <div className="relative w-[820px] flex items-center mb-[90px]">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-1 whitespace-nowrap bg-white px-2 text-[#93907A] text-[15px] xs:text-[14px]">
          SNS 계정으로 간편 로그인/회원가입
        </span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <section>
        <SocialLoginButtons />
      </section>
    </div>
  );
}

export default LoginPage;
