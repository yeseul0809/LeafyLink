import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Swal from 'sweetalert2';

const showSwal = (title: string) => {
  Swal.fire({
    title,
    customClass: {
      popup: 'swal-popup',
      title: 'swal-title ',
      confirmButton: 'swal-confirm-button'
    },
    buttonsStyling: false,
    confirmButtonText: '확인'
  });
};

export default showSwal;

export const showSwalLink = (title: string) => {
  Swal.fire({
    title,
    customClass: {
      popup: 'swal-popup-small',
      title: 'swal-title ',
      confirmButton: 'swal-confirm-button'
    },
    buttonsStyling: false,
    confirmButtonText: '확인'
  });
};

export const showSwalContinue = (title: string, router: AppRouterInstance) => {
  Swal.fire({
    title,
    customClass: {
      popup: 'swal-popup-small',
      title: 'swal-title ',
      confirmButton: 'swal-cart-button',
      cancelButton: 'swal-continue-button',
      actions: 'swal-actions'
    },
    buttonsStyling: false,
    showCancelButton: true,
    confirmButtonText: '장바구니 이동하기',
    cancelButtonText: '계속 쇼핑하기',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      router.push('/cart?refresh=' + Date.now());
    }
  });
};

export const showSwalDeleteReview = async () => {
  const result = await Swal.fire({
    title: '정말 리뷰를 삭제하시겠습니까?',
    customClass: {
      popup: 'swal-popup',
      title: 'swal-title',
      confirmButton: 'swal-cart-button',
      cancelButton: 'swal-continue-button',
      actions: 'swal-actions'
    },
    buttonsStyling: false,
    showCancelButton: true,
    confirmButtonText: '삭제',
    cancelButtonText: '취소',
    reverseButtons: true
  });

  return result.isConfirmed;
};

export const showSwalDeleteChatroom = async () => {
  const result = await Swal.fire({
    title: '채팅 목록을 나가시겠습니까?',
    html: '나가기 하면 그동안의 대화 내용을<br> 확인할 수 없습니다.',
    customClass: {
      popup: 'swal-popup-large',
      title: 'swal-chat-title',
      htmlContainer: 'swal-html-container',
      confirmButton: 'swal-cart-button',
      cancelButton: 'swal-continue-button',
      actions: 'swal-actions'
    },
    buttonsStyling: false,
    showCancelButton: true,
    confirmButtonText: '나가기',
    cancelButtonText: '취소',
    reverseButtons: true
  });

  return result.isConfirmed;
};
