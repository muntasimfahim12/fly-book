"use client";

import React, { useState } from "react";
import Image from "next/image";

const CustomHolidayHeroPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    location: "",
    journeyDate: "",
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    requirements: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Form submitted successfully!");
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 mt-12 px-6 md:px-12">
        <div className="relative w-56 h-56 md:w-96 md:h-96 mx-auto md:mx-0">
          <Image
            src="/hero/icon.png"
            alt="Custom Plan"
            fill
            className="object-contain"
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 leading-tight">
            Request a <span className="text-green-600">custom holiday</span>{" "}
            package
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto md:mx-0">
            Cant find what youre looking for? Tell us your requirements and
            our expert trip planners will reach out with a personalized plan
            just for you.
          </p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-8 md:px-10 py-3 md:py-4 rounded-2xl font-bold shadow-lg shadow-green-300 transition-all duration-300 transform hover:-translate-y-1"
          >
            START PLANNING
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 w-full max-w-xl relative animate-slide-in">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold text-xl"
            >
              ✕
            </button>

            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
              Holiday Package Details
            </h3>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >
              {/* Location */}
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700">Location*</label>
                <input
                  id="location"
                  type="text"
                  placeholder="Enter your preferred destination"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

              {/* Journey Date */}
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700">
                  Preferred Journey Date*
                </label>
                <input
                  id="journeyDate"
                  type="date"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                  value={formData.journeyDate}
                  onChange={handleChange}
                />
              </div>

              {/* Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="font-semibold text-gray-700">
                    First Name*
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold text-gray-700">
                    Last Name*
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Contact */}
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700">
                  Mobile Number*
                </label>
                <input
                  id="mobile"
                  type="tel"
                  placeholder="+88 xxxxxxxxxxx"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                  value={formData.mobile}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold text-gray-700">Email*</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* Requirements */}
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700">
                  Tell us a bit about your requirements
                </label>
                <textarea
                  id="requirements"
                  placeholder="Enter your requirements"
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                  value={formData.requirements}
                  onChange={handleChange}
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col md:flex-row gap-4 mt-4">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl shadow-lg transition-all duration-200"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-600 border border-gray-300 hover:bg-gray-50 px-6 py-3 rounded-2xl transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .animate-slide-in {
          animation: slideIn 0.3s ease-out forwards;
        }
        @keyframes slideIn {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default CustomHolidayHeroPage;
