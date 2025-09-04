import { useState, useRef, useEffect } from "react";
import Button from "../components/common/Button";
import { ChevronLeft, DollarSign, Users, User, PieChart } from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency";
import ProgressBar from "../components/common/ProgressBar";
import FractionalPurchaseModal from "../modals/FractionalPurchaseModal";
import DesireToBuyFullModal from "../modals/DesireToBuyModal";
import { useNavigate } from "react-router-dom";

const PropertyDetails = ({
  currentUser,
  onShowPaymentSettings,
  onLoginPrompt,
  onPurchaseSuccess,
  onDesireToBuyFullConfirm,
}) => {
  const property = {
    id: "prop1",
    name: "Luxury Beachfront Villa",
    location: "Miami, FL",
    price: 1200000,
    type: "House",
    availability: "fractional",
    status: "ready",
    ownershipProgress: 75,
    description:
      "Stunning beachfront villa with panoramic ocean views, private pool, and direct beach access. Perfect for fractional ownership.",
    image: "https://placehold.co/600x400/a0a0a0/ffffff?text=Beach+Villa",
    images: [
      "https://placehold.co/600x400/a0a0a0/ffffff?text=Beach+Villa+1",
      "https://placehold.co/600x400/909090/ffffff?text=Beach+Villa+2",
      "https://placehold.co/600x400/808080/ffffff?text=Beach+Villa+3",
    ],
  };
  const [paymentStatus, setPaymentStatus] = useState("initial");
  const [message, setMessage] = useState("");
  const scrollRef = useRef(null);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isDesireToBuyFullModalOpen, setIsDesireToBuyFullModalOpen] =
    useState(false);
  const [hasExpressedDesire, setHasExpressedDesire] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;
        const newScrollLeft = scrollLeft + clientWidth;

        if (newScrollLeft >= scrollWidth) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollTo({
            left: newScrollLeft,
            behavior: "smooth",
          });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (!property) {
    return (
      <div className="container mx-auto p-6 text-center text-gray-600">
        Property not found.
      </div>
    );
  }

  const ownerData = [
    { name: "You", percentage: 5, color: "#3B82F6" },
    { name: "Owner A", percentage: 20, color: "#F59E0B" },
    { name: "Owner B", percentage: 15, color: "#10B981" },
    { name: "Available", percentage: 100 - (5 + 20 + 15), color: "#6B7280" },
  ].filter((data) => data.percentage > 0);

  const buyerIntentions = [
    { user: "Alice", percentage: 5, status: "pending" },
    { user: "Bob", percentage: 10, status: "paid" },
    { user: "Charlie", percentage: 2, status: "pending" },
  ];

  const handleBuyFractionNowClick = () => {
    currentUser = true;
    if (!currentUser) {
      setMessage("Please sign up or log in to buy a fraction.");
      return;
    }

    if (
      !currentUser.paymentMethods ||
      currentUser.paymentMethods.length === 0
    ) {
      setMessage("No payment method added. Please add one in settings.");
      onShowPaymentSettings();
      return;
    }
    setIsPurchaseModalOpen(true);
  };

  const handleDesireToBuyFullClick = () => {
    setMessage("");
    if (!currentUser) {
      setMessage("Please sign up or log in to express desire.");
      onLoginPrompt();
      return;
    }
    setIsDesireToBuyFullModalOpen(true);
  };

  const handleDesireToBuyFullModalConfirm = (details) => {
    onDesireToBuyFullConfirm(details);
    setHasExpressedDesire(true);
    setMessage(
      `Your desire to buy this property for ${formatCurrency(
        details.desiredPrice
      )} has been registered.`
    );
  };

  const handleDeclineDesireRegistered = () => {
    setHasExpressedDesire(false);
    setMessage("Your desire registration has been declined.");
    // In a real app, this would send a request to cancel the desire
  };

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  let currentOffset = 0;

  const navigate = useNavigate();

  const onBack = () => {
    navigate("/");
  };

  return (
    <div className="container mx-auto p-6">
      <Button
        onClick={onBack}
        variant="outline"
        className="mb-6"
        icon={ChevronLeft}
      >
        Back to Home
      </Button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6">
        <div className="md:flex md:space-x-8">
          <div className="md:w-1/2">
            <div
              ref={scrollRef}
              className="w-full h-64 overflow-x-auto whitespace-nowrap rounded-lg mb-6"
            >
              {property.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${property.name} ${index + 1}`}
                  className="inline-block w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/600x400/e0e0e0/000000?text=Property+${
                      index + 1
                    }`;
                  }}
                />
              ))}
            </div>

            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {property.name}
            </h1>
            <p className="text-gray-600 text-lg mb-4">{property.location}</p>
            <p className="text-blue-600 text-3xl font-bold mb-6">
              {formatCurrency(property.price)}
            </p>
            <p className="text-gray-700 text-base mb-6">
              {property.description}
            </p>

            <div className="mb-6">
              <p className="text-gray-700 font-semibold">
                Availability:{` ${property.availability}`}
              </p>
              <p className="text-right text-sm text-gray-600 mb-1">
                {property.ownershipProgress}% Owned
              </p>
              <ProgressBar
                progress={property.ownershipProgress}
                className="mt-2"
              />
            </div>

            <div className="flex space-x-4 mb-6">
              {property.availability === "fractional" ? (
                <Button
                  onClick={handleBuyFractionNowClick}
                  variant={paymentStatus === "paid" ? "success" : "primary"}
                  className="flex-1"
                  icon={paymentStatus === "paid" ? CheckCircle : DollarSign}
                  disabled={paymentStatus === "paid"}
                >
                  {paymentStatus === "paid"
                    ? "Purchased Done"
                    : "Buy Fraction Now"}
                </Button>
              ) : property.availability === "rent" ? (
                <Button
                  onClick={handleDesireToBuyFullClick}
                  variant={hasExpressedDesire ? "danger" : "primary"}
                  className="flex-1"
                  icon={hasExpressedDesire ? XCircle : Home}
                >
                  {hasExpressedDesire ? "Interest Registered" : "Rent Now"}
                </Button>
              ) : (
                <Button
                  onClick={
                    hasExpressedDesire
                      ? handleDeclineDesireRegistered
                      : handleDesireToBuyFullClick
                  }
                  variant={hasExpressedDesire ? "danger" : "primary"}
                  className="flex-1"
                  icon={hasExpressedDesire ? XCircle : Percent}
                >
                  {hasExpressedDesire ? "Decline Desire Registered" : "Buy Now"}
                </Button>
              )}
            </div>
            {message && (
              <p
                className={`mt-4 text-center font-medium ${
                  message.includes("successful") ||
                  message.includes("registered")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
          </div>

          <div className="md:w-1/2">
            <div className="bg-gray-50 p-5 rounded-lg mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <PieChart size={20} /> Owner Percentage Graph
              </h2>
              <div className="h-64 flex items-center justify-center bg-white rounded-lg border border-gray-200">
                {/* SVG Pie Chart */}
                <svg
                  width="200"
                  height="200"
                  viewBox="0 0 200 200"
                  className="transform -rotate-90"
                >
                  <circle
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="transparent"
                    stroke="#E5E7EB"
                    strokeWidth="30"
                  />{" "}
                  {ownerData.map((slice, index) => {
                    const segmentLength =
                      (slice.percentage / 100) * circumference;
                    const dashArray = `${segmentLength} ${
                      circumference - segmentLength
                    }`;
                    const dashOffset = -currentOffset;
                    currentOffset += segmentLength;

                    return (
                      <circle
                        key={index}
                        cx="100"
                        cy="100"
                        r={radius}
                        fill="transparent"
                        stroke={slice.color}
                        strokeWidth="30"
                        strokeDasharray={dashArray}
                        strokeDashoffset={dashOffset}
                        className="transition-all duration-700 ease-out"
                      />
                    );
                  })}
                </svg>
              </div>
              <ul className="mt-4 space-y-2">
                {ownerData.map((owner, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center text-gray-700"
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: owner.color }}
                      ></span>
                      {owner.name}
                    </span>
                    <span className="font-medium">{owner.percentage}%</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Users size={20} /> Current Buyer Intentions
              </h2>
              {buyerIntentions.length > 0 ? (
                <ul className="space-y-3">
                  {buyerIntentions.map((intention, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between p-3 bg-white rounded-md shadow-sm"
                    >
                      <div className="flex items-center gap-2">
                        <User size={18} className="text-blue-500" />
                        <span className="font-medium text-gray-700">
                          {intention.user}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600 font-semibold">
                          {intention.percentage}%
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            intention.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {intention.status}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">
                  No current buyer intentions.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <FractionalPurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        property={property}
        onPurchase={onPurchaseSuccess} // Pass the success handler
      />
      <DesireToBuyFullModal
        isOpen={isDesireToBuyFullModalOpen}
        onClose={() => setIsDesireToBuyFullModalOpen(false)}
        property={property}
        onDesireConfirm={handleDesireToBuyFullModalConfirm}
      />
    </div>
  );
};

export default PropertyDetails;
