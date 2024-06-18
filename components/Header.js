const Header = ({ title }) => {
    return (
      <header className="bg-light py-3 mb-4 text-center">
        <div className="container">
          <h1 className="mb-0">{title}</h1>
        </div>
      </header>
    );
  };
  
  export default Header;
  