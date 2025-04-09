
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Sensei } from "@/components/sensei"
import Link from "next/link";
import './compo.css';

export default function KuroroLanding(){

    return (
        <main className="min-h-screen washi-texture overflow-y-auto">
            <Navigation />

            {/* Hero Section */}
            <section className="relative pt-24 pb-16 px-4 overflow-visible">
                {/* Left positioned image */}
                <div className="absolute left-0 top-0 -translate-x-1/4 lg:translate-x-0 opacity-80 hidden md:block">
                    <img 
                        src="/images/sensie_2.png"
                        className="w-64 h-64 object-cover lg:w-80 lg:h-80 washi-texture animate-float"
                        style={{ animationDelay: "1s" }}
                        alt="Sensei concept art" 
                    />
                </div>
                
                {/* Right bottom positioned image */}
                <div className="absolute right-20 bottom-0 translate-x-1/4 translate-y-1/4 opacity-80 hidden md:block sm:hidden">
                    <img 
                        src="/images/sensie_3.png"
                        className="object-cover w-64 h-64 lg:w-72 lg:h-72 washi-texture animate-float overflow-visible"
                        style={{ animationDelay: "2s" }}
                        alt="Sensei concept art" 
                    />
                </div>
                
                {/* Central content */}
                <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center relative z-10">
                    <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">Learn. Create. Teach.</h1>
                    <h2 className="text-3xl md:text-4xl font-light mb-8 text-gold">The Kuroro Way</h2>
                    <p className="text-xl mb-12 max-w-2xl text-gray-200">Begin your path to satori. Build a Sensei. Learn in peace.</p>

                    {/* Mobile-only images */}
                    <div className="flex flex-col md:hidden gap-8 mb-12">
                        <img 
                            src="/images/sensie_2.png"
                            className="w-64 h-64 washi-texture animate-float mx-auto"
                            alt="Sensei concept art" 
                        />
                        <img 
                            src="/images/sensie_3.png"
                            className="w-64 h-64 washi-texture animate-float mx-auto"
                            style={{ animationDelay: "1s" }}
                            alt="Sensei concept art" 
                        />
                    </div>

                    <Link href="/dojo">
                        <Button className="bg-cherry hover:bg-cherry/80 text-cherry-foreground text-lg px-8 py-6 shadow-lg shadow-cherry/20 transform transition-transform hover:scale-105">
                            Create Your Sensei
                        </Button>
                    </Link>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 pt-32 px-4 bg-dark-navy relative overflow-hidden washi-texture">
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-[url('/images/subtle-pattern.png')] opacity-5"></div>
            {/* <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cherry/30 to-transparent"></div> */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cherry/30 to-transparent"></div>
            
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-white">
                <span className="text-cherry">和</span> Begin Your Journey
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-16">
                {/* First Step */}
                <div className="text-center flex flex-col items-center group">
                    <div className="mb-8 relative">
                        {/* Glow effect behind icon */}
                        <div className="absolute inset-0 bg-cherry/10 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity"></div>
                        
                        {/* Icon container with animation */}
                        <div className="w-32 h-32 rounded-full bg-secondary/30 border border-cherry/20 flex items-center justify-center overflow-visible relative animate-float shadow-lg shadow-cherry/5">
                            {/* Replace with your actual image component */}
                            <img 
                                src="/images/sensie_fa.png" 
                                alt="Upload Your Knowledge" 
                                className="w-40 h-40 object-contain absolute z-10"
                                style={{ top: "-10px" }}
                            />
                        </div>
                    </div>
                    <h3 className="text-2xl font-medium text-white mb-3">Upload Your Knowledge</h3>
                    <p className="text-gray-300 text-lg max-w-xs mx-auto">Share your PDFs, notes, and learning materials</p>
                </div>

                {/* Second Step */}
                <div className="text-center flex flex-col items-center group">
                    <div className="mb-8 relative">
                        {/* Glow effect behind icon */}
                        <div className="absolute inset-0 bg-indigo-500/10 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity"></div>
                        
                        {/* Icon container with animation - slightly delayed */}
                        <div className="flex items-center justify-center overflow-visible relative animate-float shadow-lg shadow-indigo-500/5 w-32 h-32 rounded-full bg-gray-800/50" 
                            style={{ animationDelay: "1.5s" }}>
                            {/* Image positioned above the container and larger */}
                            <img 
                                src="/images/sensie_sword.png" 
                                alt="Kuroro Builds Your Sensei" 
                                className="w-80 h-80 object-cover absolute z-10"
                                style={{ top: "-100px" }} 
                            />
                        </div>
                    </div>
                    <h3 className="text-2xl font-medium text-white mb-3">Kuroro Builds Your Sensei</h3>
                    <p className="text-gray-300 text-lg max-w-xs mx-auto">Customize your AI tutor with the perfect teaching style</p>
                </div>

                {/* Third Step */}
                <div className="text-center flex flex-col items-center group">
                    <div className="mb-8 relative">
                        {/* Glow effect behind icon */}
                        <div className="absolute inset-0 bg-gold/10 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity"></div>
                        
                        {/* Icon container with animation - more delay */}
                        <div className="w-32 h-32 rounded-full bg-secondary/30 border border-gold/20 flex items-center justify-center overflow-visible relative animate-float shadow-lg shadow-gold/5"
                            style={{ animationDelay: "3s" }}>
                            {/* Replace with your actual image component */}
                            <img 
                                src="/images/sensie_mask.png" 
                                alt="Share or Learn" 
                                className="w-40 h-40 object-contain absolute z-10"
                                style={{ top: "-10px", scale: "1.3" }}
                            />
                        </div>
                    </div>
                    <h3 className="text-2xl font-medium text-white mb-3">Share or Learn</h3>
                    <p className="text-gray-300 text-lg max-w-xs mx-auto">Master your subjects and share your knowledge</p>
                </div>

                {/* Button at bottom with enhanced styling */}
                <div className="text-center mt-16">
                <button className="bg-indigo-900/60 hover:bg-indigo-900/80 text-white text-xl py-4 px-10 rounded-full transition-all duration-300 border border-indigo-700/50 shadow-lg hover:shadow-xl shadow-indigo-900/30 hover:shadow-indigo-900/50 relative overflow-hidden group">
                    <span className="relative z-10">Summon Your First Sensei</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-purple-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                </button>
                </div>
            </div>
            </div>

            </section>

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
                        <Sensei type={index === 2 ? "fox" : "default"} />
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