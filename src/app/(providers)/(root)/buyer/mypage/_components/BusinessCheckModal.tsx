import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children?: ReactNode;
}

const BusinessCheckModal = ({ isOpen, onClose, onConfirm }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[311px] h-[212px] bg-white shadow flex-col justify-start items-start inline-flex ">
        <div className="self-stretch h-[164px] px-[16px] py-[48px] flex-col justify-start items-start gap-2 flex">
          <div className="self-stretch text-center text-[#111111] text-sm font-semibold leading-tight">
            사업자 인증을 완료하시겠습니까?
          </div>
          <div className="self-stretch text-center text-[#767676] text-sm font-normal leading-tight">
            완료하면 구매자 계정으로 전환이 불가합니다.
            <br />
            계속 진행하시겠습니까?
          </div>
        </div>
        <div className="self-stretch justify-start items-center inline-flex">
          <div
            onClick={onClose}
            className="grow shrink basis-0 h-12 px-4 py-3.5 bg-[#f7fcf9] justify-center items-center gap-2.5 flex cursor-pointer"
          >
            <div className="justify-center items-center gap-1 flex">
              <div className="text-center text-[#5cca8e] text-sm font-semibold leading-tight">
                취소
              </div>
            </div>
          </div>
          <div
            onClick={onConfirm}
            className="grow shrink basis-0 h-12 px-4 py-3.5 bg-[#3bb873] justify-center items-center gap-2.5 flex cursor-pointer"
          >
            <div className="justify-center items-center gap-1 flex">
              <div className="text-center text-white text-sm font-semibold leading-tight">확인</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCheckModal;
