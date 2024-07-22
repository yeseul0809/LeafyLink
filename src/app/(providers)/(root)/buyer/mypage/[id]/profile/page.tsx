import AddressForm from '../../_components/AddressForm';
// import PhoneForm from '../../_components/PhoneForm';

function BuyerMyPage() {
  return (
    <>
      <div>구매자 마이페이지</div>
      <>
        <h2>주소록등록</h2>
        <AddressForm />

        <div>휴대폰번호</div>
        {/* <PhoneForm /> */}
      </>
    </>
  );
}

export default BuyerMyPage;
