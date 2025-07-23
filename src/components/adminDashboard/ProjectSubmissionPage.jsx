import { useState } from "react";
import Button from "../common/Button";
import InputField from "../common/InputField";
import SelectField from "../common/SelectField";
import {Home,LayoutGrid,Tag,Camera,DollarSign,MapPin,PlusCircle} from 'lucide-react';

const ProjectSubmissionPage = ({ onRemoveProperty, onEditProperty }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("Apartment");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, type, price, description, media, location });
    // Using console.log instead of alert for better practice in React apps
    console.log("Property submitted! (Check console for data)");
    // In a real app, send this data to your backend
    setName("");
    setType("Apartment");
    setPrice("");
    setDescription("");
    setMedia("");
    setLocation("");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Submit New Property
      </h1>{" "}
      {/* Changed heading */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <form onSubmit={handleSubmit}>
          <InputField
            label="Property Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Luxury Downtown Apartment"
            required
            icon={Home}
          />
          <SelectField
            label="Property Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            options={[
              { value: "Apartment", label: "Apartment" },
              { value: "House", label: "House" },
              { value: "Commercial", label: "Commercial" },
            ]}
            required
            icon={LayoutGrid}
          />
          <InputField
            label="Price ($)"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="e.g., 750000"
            required
            min="0"
            step="1000"
            icon={DollarSign}
          />
          <InputField
            label="Description"
            type="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detailed description of the property..."
            required
            className="h-32 resize-y"
            icon={Tag}
          />
          <InputField
            label="Media (Image URL)"
            value={media}
            onChange={(e) => setMedia(e.target.value)}
            placeholder="e.g., https://example.com/image.jpg"
            icon={Camera} // Camera icon is now imported
          />
          <InputField
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., 123 Main St, Anytown"
            required
            icon={MapPin}
          />
          <Button type="submit" className="w-full mt-6" icon={PlusCircle}>
            Submit Property {/* Changed button text */}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProjectSubmissionPage;
