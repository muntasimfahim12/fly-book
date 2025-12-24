"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";
import {
  User,
  Phone,
  CheckCircle,
  MapPin,
  Clock,
  Users,
} from "lucide-react";

/* ---------- INLINE BUTTON ---------- */
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ className = "", ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`
        inline-flex items-center justify-center
        rounded-xl px-6 py-3
        text-white font-semibold
        bg-green-600 hover:bg-green-700
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-green-400
        disabled:opacity-60 disabled:cursor-not-allowed
        ${className}
      `}
    />
  );
};

/* ---------- INLINE FIELD COMPONENTS ---------- */
interface FieldProps {
  children: ReactNode;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

const Field = ({ children, orientation = "vertical", className = "" }: FieldProps) => (
  <div className={`flex ${orientation === "horizontal" ? "items-center gap-3" : "flex-col gap-2"} ${className}`}>
    {children}
  </div>
);

const FieldGroup = ({ children }: { children: ReactNode }) => (
  <div className="space-y-4">{children}</div>
);

const FieldSet = ({ children }: { children: ReactNode }) => (
  <fieldset className="border border-gray-200 p-4 rounded-lg">{children}</fieldset>
);

const FieldLegend = ({ children }: { children: ReactNode }) => (
  <legend className="text-lg font-semibold">{children}</legend>
);

const FieldDescription = ({ children }: { children: ReactNode }) => (
  <p className="text-sm text-gray-500">{children}</p>
);

const FieldLabel = ({ children, htmlFor }: { children: ReactNode; htmlFor?: string }) => (
  <label htmlFor={htmlFor} className="font-medium">{children}</label>
);

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
  />
);

const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    {...props}
    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
  />
);

/* ---------- PACKAGE TYPE ---------- */
interface PackageType {
  id: number | string;
  title: string;
  country: string;
  days: string;
  people: string;
  price: number;
  spots?: string[];
  pickup?: string;
}

const BookingPage = () => {
  const { id } = useParams();
  const [pkg, setPkg] = useState<PackageType | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/allpackge/${id}`)
      .then((res) => res.json())
      .then((data) => setPkg(data));
  }, [id]);

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
        Loading booking details...
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">

      {/* ---------- TOP STEPS ---------- */}
      <section className="py-20 text-center">
        <h2 className="text-4xl font-extrabold mb-14">
          Request Holiday Package in
          <span className="text-green-600"> 3 Easy Steps</span>
        </h2>

        <div className="flex flex-col md:flex-row justify-center gap-16 max-w-5xl mx-auto">
          {[
            { icon: <User className="w-8 h-8" />, text: "Tell us about your plans & details" },
            { icon: <Phone className="w-8 h-8" />, text: "Our trip planner contacts you" },
            { icon: <CheckCircle className="w-8 h-8" />, text: "Confirm & enjoy your trip" },
          ].map((step, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4">
                {step.icon}
              </div>
              <p className="font-medium text-gray-700 text-center">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- MAIN CONTENT ---------- */}
      <section className="max-w-7xl mx-auto px-6 pb-24 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* ---------- BOOKING FORM ---------- */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-10">
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <span className="bg-green-100 text-green-600 p-3 rounded-full">🧳</span>
            Book Your Holiday
          </h3>

          <form>
            <FieldGroup>

              <FieldSet>
                <FieldLegend>Traveller Information</FieldLegend>
                <FieldDescription>Provide your details so our travel expert can contact you.</FieldDescription>

                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="full-name">Full Name</FieldLabel>
                    <Input id="full-name" placeholder="Your full name" required />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="travel-date">Travel Date</FieldLabel>
                    <Input id="travel-date" type="date" required />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="email">Email Address</FieldLabel>
                    <Input id="email" type="email" placeholder="example@email.com" required />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="phone">Mobile Number</FieldLabel>
                    <Input id="phone" placeholder="+88 01XXXXXXXXX" required />
                  </Field>
                </FieldGroup>
              </FieldSet>

              <FieldSet>
                <FieldLegend>Additional Requirements</FieldLegend>
                <FieldDescription>Optional requests like hotel, food, pickup, etc.</FieldDescription>

                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="notes">Comments</FieldLabel>
                    <Textarea id="notes" placeholder="Write any special requirement here..." className="resize-none" />
                  </Field>
                </FieldGroup>
              </FieldSet>

              <Field orientation="horizontal" className="mt-4">
                <Button type="submit">Submit Booking Request</Button>
              </Field>

            </FieldGroup>
          </form>
        </div>

        {/* ---------- PACKAGE SUMMARY ---------- */}
        <div className="bg-white rounded-2xl shadow-xl p-8 h-fit sticky top-28">
          <p className="text-sm text-gray-500 mb-1">Starting from</p>
          <h3 className="text-4xl font-extrabold text-green-600">BDT {pkg.price}</h3>

          <div className="space-y-6 text-sm text-gray-700 mt-6">

            <div>
              <p className="font-semibold flex items-center gap-2">
                <MapPin size={16} /> Destinations
              </p>
              {pkg.spots?.map((spot, i) => (
                <p key={i}>• {spot}</p>
              ))}
            </div>

            <p className="flex items-center gap-2">
              <Clock size={16} /> {pkg.days}
            </p>

            <p className="flex items-center gap-2">
              <Users size={16} /> {pkg.people}
            </p>

            <p className="flex items-center gap-2">
              🚗 {pkg.pickup || "Airport Pickup Included"}
            </p>
          </div>
        </div>

      </section>
    </div>
  );
};

export default BookingPage;
