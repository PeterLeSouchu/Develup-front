import logo from '../../assets/images/logo-black.png';

import BackErrorNotification from '../errors/back-error-notification/Back-error-component';

function HeaderMobile() {
  return (
    <>
      <header className=" w-full fixed backdrop-blur-sm p-3  ">
        <div className=" relative flex justify-center items-center h-14 rounded-2xl bg-gradient-to-b from-lightgold2 to-lightgold  dark:from-darkgold2 dark:to-darkgold">
          <button type="button" className="absolute left-4">
            Btn
          </button>
          <img src={logo} alt="logo Develup" className="w-28  " />
        </div>
      </header>
      <BackErrorNotification />
    </>
  );
}
export default HeaderMobile;
