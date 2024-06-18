const Footer = ({ content }) => {
    return (
    <footer className="bg-light py-3 mt-4 fixed-bottom d-flex justify-content-center align-items-center">
        <div className="container">
          <p className="mb-0 text-center">{content}</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  