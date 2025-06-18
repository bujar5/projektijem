import Image from "next/image";
import { motion } from "framer-motion";
import CustomImage from "@/assets/images/WARCover.webp";
import Button from "@/components/shared/Button";
import { Users, Lightbulb, TrendingUp } from "lucide-react";
import Head from "next/head";
import Link from "next/link"; // Next.js Link component

interface CardProps {
  title: string;
  description: string;
  icon: React.ElementType;
}

const MinimalCard: React.FC<CardProps> = ({ title, description, icon: Icon }) => (
  <div className="bg-[#2c2c2c] p-8 rounded-xl shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
    <Icon className="w-14 h-14 text-[#FFD700] mb-5 animate-pulse" />
    <h3 className="text-2xl font-bold mb-3 text-white tracking-wide">{title}</h3>
    <p className="text-gray-300 leading-relaxed text-base">{description}</p>
  </div>
);

export default function AboutUs() {
  return (
    <>
      <Head>
        <title>About Us | War Spirit</title>
        <meta name="description" content="Learn more about our mission, values, and what we stand for." />
      </Head>

      <div className="pt-14 bg-[#121212] text-white min-h-screen flex flex-col">

        {/* Hero Section */}
        <motion.section
          className="w-full py-28 md:py-32 flex flex-col items-center justify-center bg-[#1f1f1f] text-center shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-5 tracking-tighter uppercase text-[#FFD700] leading-tight">
            Our History & Mission
          </h1>
          <p className="text-lg max-w-3xl mb-8 text-gray-300 font-light px-4 leading-relaxed">
            A fearless voice in the political landscape, shaping ideas with truth and courage,
            dedicated to empowering insights and fostering informed discussions.
          </p>
          {/* FIX: Added passHref and legacyBehavior */}
          <Link href="/contact" passHref legacyBehavior>
            <Button
              text="Contact Us"
              className="bg-[#FFD700] text-black font-bold px-8 py-4 rounded-full hover:bg-yellow-400 transition-all duration-300 text-lg shadow-md hover:shadow-xl"
            />
          </Link>
        </motion.section>

        {/* Who We Are Section */}
        <motion.section
          className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-white text-black text-center shadow-inner"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#FFD700] uppercase leading-tight">
              Who We Are
            </h2>
            <p className="mb-10 leading-loose text-lg text-gray-800">
              We are a politically driven platform, fueled by unwavering facts and deep conviction. Through
              rigorous investigative content and profound insights, we are committed to illuminating
              complex political truths and empowering the public with uncompromisingly honest journalism.
              Our goal is to foster a more informed and engaged citizenry.
            </p>
            <div className="flex justify-center mt-8">
              <Image
                src={CustomImage}
                alt="Our Mission"
                width={300}
                height={100}
                className="rounded-3xl shadow-2xl border-4 border-[#000000] object-cover max-w-full h-auto"
              />
            </div>
          </div>
        </motion.section>

        {/* Values Section */}
        <motion.section
          className="w-full py-20 bg-[#1f1f1f] text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-[#FFD700] uppercase leading-tight">
              What We Stand For
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
              <MinimalCard
                title="Innovation"
                description="We constantly seek better ways to inform, connect, and inspire through new ideas and methods, embracing the future of political discourse."
                icon={Lightbulb}
              />
              <MinimalCard
                title="Excellence"
                description="Our content is crafted with meticulous precision and unparalleled depth, ensuring we never compromise on quality or the pursuit of truth."
                icon={TrendingUp}
              />
              <MinimalCard
                title="Integrity"
                description="We build lasting trust with our audience by standing firmly behind honest, unbiased reporting and transparent practices."
                icon={Users}
              />
            </div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          className="w-full py-24 bg-[#121212] text-white text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#FFD700] uppercase leading-tight">Ready to Connect?</h2>
            <p className="mb-8 text-gray-300 leading-relaxed text-lg">
              Reach out to our editors and be part of the political awakening.
              Your voice matters in shaping a more informed world.
            </p>
            {/* FIX: Added passHref and legacyBehavior */}
            <Link href="/contact" passHref legacyBehavior>
              <Button
                text="Send Us a Message"
                className="border-2 border-[#FFD700] text-[#FFD700] px-8 py-4 rounded-full hover:bg-[#FFD700] hover:text-black transition-all duration-300 text-lg shadow-md hover:shadow-xl"
              />
            </Link>
          </div>
        </motion.section>

      </div>
    </>
  );
}

AboutUs.displayName = "About Us | War Spirit";