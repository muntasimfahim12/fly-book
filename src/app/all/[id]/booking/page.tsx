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

/* ---------- BUTTON ---------- */
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ className = "", ...props }: ButtonProps) => (
  <button
    {...props}
    className={`inline-flex items-center justify-center rounded-xl px-6 py-3
    text-white font-semibold bg-green-600 hover:bg-green-700
    transition focus:ring-2 focus:ring-green-400 ${className}`}
  />
);

/* ---------- FIELD COMPONENTS ---------- */
const Field = ({
  children,
  orientation = "vertical",
}: {
  children: ReactNode;
  orientation?: "horizontal" | "vertical";
}) => (
  <div
    className={`flex ${
      orientation === "horizontal" ? "items-center gap-3" : "flex-col gap-2"
    }`}
  >
    {children}
  </div>
);

const FieldSet = ({ children }: { children: ReactNode }) => (
  <fieldset className="border border-gray-200 p-4 rounded-lg space-y-4">
    {children}
  </fieldset>
);

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className="w-full border border-gray-300 rounded-md px-3 py-2
    focus:ring-2 focus:ring-green-400 outline-none"
  />
);

const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    {...props}
    className="w-full border border-gray-300 rounded-md px-3 py-2
    focus:ring-2 focus:ring-green-400 outline-none"
  />
);

/* ---------- PACKAGE TYPE ---------- */
interface PackageType {
  _id: string;
  title: string;
  days: string;
  people: string;
  price: number;
  spots?: string[];
  pickup?: string;
}

/* ---------- PAGE ---------- */
const BookingPage = () => {
  const { id } = useParams<{ id: string }>();
  const [pkg, setPkg] = useState<PackageType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchPackage = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/packge/${id}`
        );

        if (!res.ok) throw new Error("Package not found");

        const data = await res.json();
        setPkg(data);
      } catch (err) {
        console.error(err);
        setPkg(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [id]);

  /* ---------- STATES ---------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
        Loading booking details...
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold">
        Package not found
      </div>
    );
  }

  /* ---------- UI ---------- */
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">

      {/* STEPS */}
      <section className="py-20 text-center">
        <h2 className="text-4xl font-extrabold mb-12">
          Request Holiday Package in
          <span className="text-green-600"> 3 Easy Steps</span>
        </h2>

        <div className="flex flex-col md:flex-row justify-center gap-16">
          {[
            { icon: <User />, text: "Tell us your plans" },
            { icon: <Phone />, text: "We contact you" },
            { icon: <CheckCircle />, text: "Confirm & enjoy" },
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-3">
                {s.icon}
              </div>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-6 pb-24 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* FORM */}
        <div className="lg:col-span-2 bg-white p-10 rounded-2xl shadow-xl">
          <h3 className="text-2xl font-bold mb-6">🧳 Book Your Holiday</h3>

          <form className="space-y-6">
            <FieldSet>
              <Field>
                <label>Full Name</label>
                <Input required />
              </Field>

              <Field>
                <label>Travel Date</label>
                <Input type="date" required />
              </Field>

              <Field>
                <label>Email</label>
                <Input type="email" required />
              </Field>

              <Field>
                <label>Phone</label>
                <Input required />
              </Field>
            </FieldSet>

            <FieldSet>
              <label>Additional Requirements</label>
              <Textarea placeholder="Any special request..." />
            </FieldSet>

            <Button type="submit">Submit Booking Request</Button>
          </form>
        </div>

        {/* SUMMARY */}
        <div className="bg-white p-8 rounded-2xl shadow-xl h-fit sticky top-28">
          <p className="text-sm text-gray-500">Starting from</p>
          <h3 className="text-4xl font-extrabold text-green-600">
            BDT {pkg.price}
          </h3>

          <div className="mt-6 space-y-3 text-sm">
            <p className="flex gap-2"><Clock size={16} /> {pkg.days}</p>
            <p className="flex gap-2"><Users size={16} /> {pkg.people}</p>
            <p>🚗 {pkg.pickup || "Airport Pickup Included"}</p>

            {pkg.spots && (
              <div>
                <p className="font-semibold flex gap-2">
                  <MapPin size={16} /> Destinations
                </p>
                {pkg.spots.map((s, i) => (
                  <p key={i}>• {s}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookingPage;
