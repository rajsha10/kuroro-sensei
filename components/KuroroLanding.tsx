"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Sensei } from "@/components/sensei"
import Link from "next/link";
import './compo.css';
import AboutHero from "./AboutHero";

const senseiImages = [
    "/images/sensie_traditional_master.svg",
    "/images/sensie_modern_master.svg", 
    "/images/sensie_warrior_master.svg"
];

export default function KuroroLanding(){
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const SenseiAvatarDisplay = () => (
        <div className="relative w-64 h-64 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-gold/30">
          <img 
            src={senseiImages[selectedImageIndex]}
            alt={`Sensei avatar ${selectedImageIndex + 1}`}
            className="max-w-full max-h-full object-contain"
            style={{scale: "1.4"}}
          />
        </div>
      );

    return (
        <main className="min-h-screen washi-texture overflow-y-auto">
            <Navigation />

            {/* Hero Section */}
            <AboutHero />

            {/* Sensei Showcase */}
            <section className="py-16 px-4 bg-secondary/30">
                <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    <span className="text-gold">先生</span> Sensei Showcase
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {["Gentle Python Monk", "Calculus Crane", "Literature Fox"].map((name, index) => (
                    <div
                        key={index}
                        className="bg-background p-6 rounded-lg text-center hover:border hover:border-cherry transition-all"
                    >
                        <div className="mb-4 flex justify-center">
                        {/* <Sensei type={index === 2 ? "fox" : "default"} /> */}
                        {senseiImages.map((path, index) => (
                            <button
                                key={index}
                                className={`w-16 h-16 rounded-full overflow-hidden border-2 ${selectedImageIndex === index ? 'border-cherry' : 'border-transparent'}`}
                                onClick={() => setSelectedImageIndex(index)}
                            >
                                <img 
                                src={path} 
                                alt={`Avatar option ${index + 1}`} 
                                className="w-full h-full object-cover"
                                />
                            </button>
                            ))}
                        </div>
                        <h3 className="text-xl font-bold mb-2">{name}</h3>
                        <p className="text-muted-foreground mb-4">Created by Kuroro Masters</p>
                        <Button variant="outline" className="border-gold text-gold hover:bg-gold/10">
                            Explore
                        </Button>
                    </div>
                    ))}
                </div>

                <div className="text-center">
                    <Link href="/garden">
                    <Button variant="outline" className="border-cherry text-cherry hover:bg-cherry/10">
                        View Sensei Garden
                    </Button>
                    </Link>
                </div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="py-16 px-4">
                <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-8">
                    <span className="text-gold">哲学</span> Our Philosophy
                </h2>

                <p className="text-lg mb-8">
                    Kuroro embraces the principles of wabi-sabi, ikigai, and a soulful approach to learning. We believe that
                    knowledge is a journey, not a destination.
                </p>

                <div className="bg-secondary/30 p-8 rounded-lg washi-texture mb-8">
                    <p className="text-xl italic text-gold">"Perfection lies in stillness, not speed."</p>
                </div>

                <Button variant="outline" className="border-gold text-gold hover:bg-gold/10">
                    Learn More About Our Approach
                </Button>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-4 border-t border-border">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <p className="text-lg font-bold">黒ろ Kuroro</p>
                    <p className="text-sm text-muted-foreground">Your path to satori begins here.</p>
                </div>

                <div className="flex gap-8">
                    <Link href="/about" className="text-sm hover:text-cherry">
                    About
                    </Link>
                    <Link href="/privacy" className="text-sm hover:text-cherry">
                    Privacy
                    </Link>
                    <Link href="/terms" className="text-sm hover:text-cherry">
                    Terms
                    </Link>
                    <Link href="/contact" className="text-sm hover:text-cherry">
                    Contact
                    </Link>
                </div>
                </div>
            </footer>
        </main>
    )
}