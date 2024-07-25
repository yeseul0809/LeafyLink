import React from 'react';
import SocialLoginButtons from './_components/SocialLoginButtons';

function LoginPage() {
  return (
    <div className="flex flex-col justify-center items-center p-10 gap-10">
      <h1>로그인</h1>
      <section>
        <SocialLoginButtons />
      </section>
    </div>
  );
}

export default LoginPage;
