
import React, { useRef } from "react";
import { Button } from "@/components/ui/button"; // Replace with your button component if applicable

const UploadStampButton: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        fileInputRef.current?.click(); // Safely trigger the file input click
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log("Selected file:", file.name);
            // Handle the selected file (e.g., upload to a server)
        }
    };

    return (
        <div>
            {/* Hidden file input */}
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
                accept="image/*"
            />

            {/* Custom button */}
            <Button
                onClick={handleButtonClick}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
                Upload stamp
            </Button>
        </div>
    );
};

export default UploadStampButton;
