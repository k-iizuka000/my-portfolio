export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-sm">
            © {currentYear} My Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
