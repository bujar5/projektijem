// pages/about.tsx
import Image from "next/image";
import { motion } from "framer-motion";
import CustomImage from "@/assets/images/image1.jpg"; // Assuming you have an image for the about page
import Button from "@/components/shared/Button";
import { Users, Lightbulb, TrendingUp } from "lucide-react"; // Keeping some icons, can adjust if needed
import Head from "next/head"; // Import Head for page title/meta
import Link from "next/link"; // Import Link for navigation

// Assuming you have a minimal Card component that accepts title, description, icon
// If not, you can inline the JSX directly or adjust the Card component
interface CardProps {
  title: string;
  description: string;
  icon: React.ElementType; // Represents a Lucide icon component
}

// Minimal Card component (if you don't have one or it's different)
const MinimalCard: React.FC<CardProps> = ({ title, description, icon: Icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
    <Icon className="w-12 h-12 text-yellow-600 mb-4" />
    <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);


export default function AboutUs() {
  return (
    <>
      <Head>
        <title>Rreth Nesh | My Application</title>
        <meta name="description" content="Mësoni më shumë rreth kompanisë sonë, misionit dhe vlerave tona." />
      </Head>
      <div className="pt-14">
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-200">

          {/* Minimal Hero Section for About Us - Consistent Yellow Gradient */}
          <motion.section
            className="w-full py-24 flex flex-col items-center justify-center bg-gradient-to-r from-yellow-500 to-yellow-400 text-black text-center shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
              Historia dhe Misioni Ynë
            </h1>
            <p className="text-xl max-w-xl mb-6 text-gray-900">
              Jemi një ekip i përkushtuar, duke ndërtuar të ardhmen digjitale me pasion dhe inovacioni.
            </p>
            <Link href="/contact"> {/* Link to contact page */}
              <Button
                text="Na Kontaktoni"
                variant="secondary"
              />
            </Link>
          </motion.section>

          {/* Core About Section - Our Story & Vision */}
          <motion.section
            className="max-w-6xl py-20 px-6 text-center"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold mb-6 text-yellow-600">
              Kush Jemi Ne
            </h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Krijojmë zgjidhje digjitale të personalizuara që i ndihmojnë bizneset të lulëzojnë në një treg gjithnjë e në ndryshim.
              Fokusi ynë është në inovacionin, cilësinë dhe partneritetet afatgjata me klientët tanë. Ne besojmë se teknologjia
              mund të jetë një fuqi për të mirë, dhe ne jemi këtu për t'ju ndihmuar të shfrytëzoni plotësisht potencialin e saj.
            </p>
            <div className="flex justify-center mt-8">
              <Image
                src={CustomImage} // Re-using the image from your home page
                alt="Our Team Working"
                width={400}
                height={250}
                className="rounded-2xl shadow-xl border-4 border-yellow-200"
              />
            </div>
          </motion.section>

          {/* What We Stand For (Values/Principles) Section */}
          <motion.section
            className="w-full py-20 bg-white text-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="container mx-auto px-6">
              <h2 className="text-4xl font-bold mb-6 text-yellow-600">
                Për Çfarë Qëndrojmë
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
                <MinimalCard
                  title="Inovacioni"
                  description="Gjithmonë në kërkim të ideve dhe teknologjive të reja për të sjellë zgjidhje më të mira."
                  icon={Lightbulb}
                />
                <MinimalCard
                  title="Cilësia"
                  description="Krijojmë produkte dhe shërbime me standarde të larta, të orientuara drejt rezultateve."
                  icon={TrendingUp}
                />
                <MinimalCard
                  title="Partneriteti"
                  description="Ndërtojmë marrëdhënie të forta dhe afatgjata, duke vendosur klientin në qendër."
                  icon={Users}
                />
              </div>
            </div>
          </motion.section>

          {/* Minimal Contact Call to Action - Consistent Yellow Gradient */}
          <motion.section
            className="w-full py-20 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-center mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl font-bold mb-6">Gati për të Filluar?</h2>
            <p className="mb-6">
              Na kontaktoni sot për të diskutuar projektin tuaj.
            </p>
            <Link href="/contact"> {/* Link to contact page */}
              <Button
                text="Na Kontaktoni"
                variant="secondary"
              />
            </Link>
          </motion.section>

        </div>
      </div>
    </>
  );
}

AboutUs.displayName = "AboutUs | My Application";