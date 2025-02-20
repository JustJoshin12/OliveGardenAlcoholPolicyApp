const PolicyAgreementButtons = ({ onPolicy, loggedIn, onSearch }) => {
  return (
    <section className="pt-[60px] flex justify-evenly">
      {loggedIn ? (
        <button className="button" onClick={onSearch}>
          Search
        </button>
      ) : (
        <button className="button" onClick={onPolicy}>
          Policy
        </button>
      )}
    </section>
  );
};

export default PolicyAgreementButtons;
