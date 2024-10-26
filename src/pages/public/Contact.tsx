function Contact() {
  return (
    <div className="h-84 flex  items-center flex-col  p-10 gap-4 ">
      <h1 className="text-center text-5xl text-darkgold">Contact</h1>
      <form className="w-3/5 h-56 bg-white shadow-xl border-lightgold border-2 rounded-3xl p-5">
        <label htmlFor="email">Votre email</label>
        <input type="text" id="email" />
      </form>
    </div>
  );
}
export default Contact;
