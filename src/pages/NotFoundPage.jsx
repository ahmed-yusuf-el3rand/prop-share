import Button from "../components/common/buttons/Button";
import { House } from "lucide-react";

const NotFoundPage = () => {

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-7xl ">404</h1>

      <h2 className="mt-5 text-3xl font-bold">Page Not Found</h2>

      <p className="mt-5 max-w-lg">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
    </div>
  );
};

export default NotFoundPage;
