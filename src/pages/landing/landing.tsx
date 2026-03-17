import Hero from "./components/hero.tsx";
import Features from "./components/features.tsx";
import LiveDemo from "./components/liveDemo.tsx";
import WhoIsItFor from "./components/whoIsItFor.tsx";
import CTA from "./components/cta.tsx";
import FleetStatistics from "./components/fleetStatistics.tsx";
import Contact from "./components/contact.tsx";
import LicenseCheck from "./components/licenseCheck.tsx";
import DocumentControl from "./components/documentControl.tsx";

export default function Landing(){
    return (
        <>
            <Hero />
            <Features />
            <LiveDemo />
            <LicenseCheck />
            <DocumentControl />
            <FleetStatistics />
            <WhoIsItFor />
            <CTA />
            <Contact />
        </>
    );
}