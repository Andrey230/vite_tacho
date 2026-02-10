import Hero from "./components/hero.tsx";
import Features from "./components/features.tsx";
import LiveDemo from "./components/liveDemo.tsx";
import WhoIsItFor from "./components/whoIsItFor.tsx";
import CTA from "./components/cta.tsx";
import FleetStatistics from "./components/fleetStatistics.tsx";
import Contact from "./components/contact.tsx";

export default function Landing(){
    return (
        <>
            <Hero />
            <Features />
            <LiveDemo />
            <FleetStatistics />
            <WhoIsItFor />
            <CTA />
            <Contact />
        </>
    );
}