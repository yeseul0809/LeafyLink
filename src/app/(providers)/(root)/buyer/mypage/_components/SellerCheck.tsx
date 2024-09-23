'use client';
import { useState, useEffect } from 'react';
import BusinessCheckModal from './BusinessCheckModal';
import { BusinessInfoResponse, createSeller, validateBusinessNumber } from '../../action';

interface SellerCheckProps {
  userData: {
    user_id: string;
    email: string;
    address_code: string;
    address: string;
    address_detail: string;
    phone: string;
    avatar_url: string;
  };
}

function SellerCheck({ userData }: SellerCheckProps) {
  const [businessNumber, setBusinessNumber] = useState('');
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [result, setResult] = useState<BusinessInfoResponse | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    setIsModalOpen(false);
    await codeCheck();
  };

  const codeCheck = async () => {
    if (!checkInputNull()) {
      alert('사업자등록번호를 올바르게 입력하세요.');
      return;
    }
    const cleanedAddress = businessAddress.trim();
    console.log('사업자번호:', businessNumber);
    console.log('대표자 성명:', name);
    console.log('개업일자:', startDate);
    console.log('상호명:', businessName);
    console.log('주소:', businessAddress);
    try {
      const validatedBusiness = await validateBusinessNumber(
        businessNumber,
        startDate,
        name,
        businessName,
        cleanedAddress
      );
      console.log('API 응답 결과:', validatedBusiness);

      if (validatedBusiness) {
        setResult(validatedBusiness);
        await createSeller(userData, validatedBusiness);
        alert('판매자 정보가 성공적으로 저장되었습니다.');
        window.location.replace('/');
      } else {
        alert('사업자 등록 번호가 유효하지 않습니다.');
      }
    } catch (error) {
      console.error('error', error);
      alert('오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  const checkInputNull = () => {
    const fullCode = businessNumber;
    const isValidLength = fullCode.length === 10;

    return isValidLength && /^[0-9]+$/.test(fullCode);
  };

  if (!hydrated) {
    return null;
  }

  const isFormValid = () => {
    return (
      businessNumber.length === 10 &&
      name.trim() !== '' &&
      // businessAddress.trim() !== '' &&
      startDate.trim() !== '' &&
      startDate.length === 8
    );
  };

  return (
    <div className="max-w-[400px] mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-16-n-24-40 text-font/main mb-3 s:text-14-n-20-35">
            사업자 번호
          </label>
          <input
            type="text"
            value={businessNumber}
            onChange={(e) => setBusinessNumber(e.target.value.replace(/\D/g, ''))}
            maxLength={10}
            placeholder="사업자 번호 10자리를 입력해 주세요"
            className="mb-6 block w-full p-4 border border-gray-300 shadow-sm focus:ring-primary-green-500 focus:border-primary-green-500 text-16-n-24-40 text-font/main"
          />
        </div>

        <div className="mb-4">
          <label className="block text-16-n-24-40 text-font/main mb-3 s:text-14-n-20-35">
            대표자 성명
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="대표자 성명을 입력해 주세요"
            className="mb-6 block w-full p-4 border border-gray-300 shadow-sm focus:ring-primary-green-500 focus:border-primary-green-500 text-16-n-24-40 text-font/main"
          />
        </div>
        <div className="mb-4">
          <label className="block text-16-n-24-40 text-font/main mb-3 s:text-14-n-20-35">
            상호명
          </label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="상호명을 입력해 주세요"
            className="mb-6 block w-full p-4 border border-gray-300 shadow-sm focus:ring-primary-green-500 focus:border-primary-green-500 text-16-n-24-40 text-font/main"
          />
        </div>

        {/* <div className="mb-4">
          <label className="block text-16-n-24-40 text-font/main mb-3 s:text-14-n-20-35">
            주소
          </label>
          <input
            type="text"
            value={businessAddress}
            onChange={(e) => setBusinessAddress(e.target.value)}
            placeholder="주소를 입력해주세요"
            className="mb-6 block w-full p-4 border border-gray-300 shadow-sm focus:ring-primary-green-500 focus:border-primary-green-500 text-16-n-24-40 text-font/main"
          />
        </div> */}

        <div className="mb-4">
          <label className="block text-16-n-24-40 text-font/main mb-3 s:text-14-n-20-35">
            개업일자
          </label>
          <input
            type="text"
            value={startDate}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value) && value.length <= 8) {
                setStartDate(value);
              }
            }}
            placeholder="YYYYMMDD"
            className="mb-6 block w-full p-4 border border-gray-300 shadow-sm focus:ring-primary-green-500 focus:border-primary-green-500 text-16-n-24-40 text-font/main"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className={`w-full text-white mt-20 mb-[180px] s:mt-[48px]  p-4 rounded-md shadow-sm transition-colors duration-300 ${
              isFormValid()
                ? 'bg-primary-green-500 text-white hover:bg-primary-green-700 text-16-sb-24-40'
                : 'bg-primary-green-100 text-gray-500 cursor-not-allowed text-16-sb-24-40'
            }`}
            disabled={!isFormValid()}
          >
            인증하기
          </button>
        </div>
      </form>
      <BusinessCheckModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
}

export default SellerCheck;
