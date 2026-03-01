'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'motion/react';
import {
  Leaf,
  User,
  Bone,
  Brain,
  Heart,
  Dna,
  Activity,
  Stethoscope,
  Pill,
  MapPin,
  Phone,
  Mail,
  Globe,
  ChevronLeft,
  ChevronRight,

  Facebook,
  Twitter,
  Instagram,
  Youtube,
  X,
  Sun,
  Moon,
  Menu
} from 'lucide-react';

const diseases = [
  { name: 'Alopecia Areata', icon: User },
  { name: 'Ankylosing Spondylitis', icon: Bone },
  { name: 'Porcormiinal Aneriptien', icon: User },
  { name: 'Homied Presenitlions', icon: Brain },
  { name: 'Emotional Treatments', icon: Heart },
  { name: 'Equioreent Toniv', icon: Leaf },
  { name: 'Aetoresslis Ounecomons', icon: Dna },
  { name: 'Enocelty Treatment', icon: Activity },
  { name: 'Electoygenic Enovartins', icon: Stethoscope },
  { name: 'Nermal Bruming', icon: Leaf },
  { name: 'Norenomnic ft0s', icon: Heart },
  { name: 'Renallor Branshery', icon: Pill },
];

const testimonials = [
  {
    text: "Homoeopathy treatment are so helpful. Literally the best.",
    author: "Pratik Rao"
  },
  {
    text: "The holistic approach here changed my life. Highly recommended for everyone seeking natural healing!",
    author: "Sarah Jenkins"
  },
  {
    text: "Professional staff and very effective treatments for chronic pain. I felt better within weeks.",
    author: "Amit Sharma"
  }
];

export default function ClinicLanding() {
  const [currentTestimonial, setCurrentTestimonial] = React.useState(0);
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const isDark = mounted && theme === 'dark';
  const [showAuthModal, setShowAuthModal] = React.useState(false);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen pb-20 bg-[#f2f2f2] dark:bg-[#1a1c1a] transition-colors duration-300 overflow-x-hidden">
      <div className="text-[#2c3e2c] dark:text-[#e0e8e0]">
        {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between bg-[#f2f2f2] dark:bg-[#1a1c1a]/40 backdrop-blur-xl rounded-full px-8 py-3 neumorphic-button border border-white/20">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#6b8e6b] rounded-lg flex items-center justify-center text-white shadow-lg shadow-[#6b8e6b]/30">
                <Leaf size={24} />
              </div>
              <div>
                <h1 className="font-bold text-sm leading-tight text-[#2c3e2c] dark:text-[#e0e8e0]">Chandigarh</h1>
                <p className="text-[10px] opacity-60 text-[#2c3e2c] dark:text-[#e0e8e0]">holistic clinic</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-[#2c3e2c] dark:text-[#e0e8e0]">
              <a href="#home" className="bg-[#6b8e6b]/10 px-4 py-1 rounded-full text-[#6b8e6b]">Home</a>
              <a href="#about" className="opacity-60 hover:opacity-100 transition-opacity">About Us</a>
              <a href="#diseases" className="opacity-60 hover:opacity-100 transition-opacity">Diseases</a>
              <a href="#testimonials" className="opacity-60 hover:opacity-100 transition-opacity">Testimonials</a>
              <a href="#contact" className="opacity-60 hover:opacity-100 transition-opacity">Contact Us</a>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <button
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className="w-8 h-8 md:w-10 md:h-10 rounded-full neumorphic-button flex items-center justify-center text-[#6b8e6b]"
              >
                {mounted ? (isDark ? <Sun size={16} className="md:w-[18px] md:h-[18px]" /> : <Moon size={16} className="md:w-[18px] md:h-[18px]" />) : <span className="w-4 h-4 rounded-full border-2 border-[#6b8e6b] border-t-transparent animate-spin"></span>}
              </button>
              <button
                onClick={() => setShowAuthModal(true)}
                className="px-4 py-2 md:px-6 md:py-2 rounded-full neumorphic-button text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-[#2c3e2c] dark:text-[#e0e8e0] whitespace-nowrap"
              >
                Log In | Sign Up
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden w-8 h-8 rounded-full neumorphic-button flex items-center justify-center text-[#6b8e6b]"
              >
                {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="md:hidden absolute top-full left-6 right-6 mt-4 p-6 neumorphic-card rounded-3xl bg-[#f2f2f2]/95 dark:bg-[#1a1c1a]/95 backdrop-blur-xl border border-white/10 flex flex-col gap-6 text-[12px] font-bold uppercase tracking-widest text-[#2c3e2c] dark:text-[#e0e8e0]"
              >
                <a href="#home" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100 transition-opacity flex items-center gap-2"><Leaf size={14} className="text-[#6b8e6b]" /> Home</a>
                <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100 transition-opacity">About Us</a>
                <a href="#diseases" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100 transition-opacity">Diseases</a>
                <a href="#testimonials" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100 transition-opacity">Testimonials</a>
                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100 transition-opacity">Contact Us</a>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Hero Section */}
        <section id="home" className="pt-48 pb-20 px-6 relative">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-6xl lg:text-8xl font-black text-[#2c3e2c] dark:text-[#e0e8e0] leading-[0.95] mb-10 tracking-tighter">
                Nature Has A <br />
                Way of <br />
                Living. <br />
                Consult us <br />
                Today!!!
              </h2>
              <button className="px-8 py-4 md:px-10 bg-[#6b8e6b] text-[12px] md:text-base text-white rounded-full font-bold uppercase tracking-widest shadow-2xl shadow-[#6b8e6b]/40 hover:bg-[#5a7a5a] transition-all transform hover:scale-105 active:scale-95">
                Book Appointment
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="relative flex justify-center"
            >
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1000&auto=format&fit=crop"
                  alt="Nature Leaf"
                  className="w-full max-w-lg drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)]"
                  style={{
                    maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
                  }}
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-[#6b8e6b]/5 dark:border-[#6b8e6b]/20 rounded-full -z-10" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-[#6b8e6b]/10 dark:border-[#6b8e6b]/30 rounded-full -z-10" />
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="neumorphic-card rounded-[40px] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12 text-center md:text-left">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-6">Homoeopathy</h3>
                <p className="text-sm leading-relaxed opacity-70">
                  Holistic health is a commons te hodel hemeopathic medicine and fmmmn naturremns tneetn growing health and noumal npectmoons stanrever our health. Homoorpathy icavtensitn and bateitic A sust ovonation or createving snnv practane of homeopathic medicine.
                </p>
              </div>
              <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-full overflow-hidden border-8 border-[#f2f2f2] dark:border-[#1a1c1a] shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=500&auto=format&fit=crop"
                  alt="Medicine bottles"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Diseases Grid */}
        <section id="diseases" className="py-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-10 md:mb-16">Homeopathic Treatment for Major Diseases</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-8">
              {diseases.map((disease, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="w-20 h-20 rounded-2xl neumorphic-button flex items-center justify-center text-sage">
                    <disease.icon size={32} />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-wider max-w-[100px] leading-tight">
                    {disease.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-20 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-16 text-[#2c3e2c] dark:text-[#e0e8e0]">Testimonials</h3>
            <div className="relative flex items-center justify-center min-h-[320px]">
              <button
                onClick={prevTestimonial}
                className="absolute left-0 md:-left-4 z-10 w-12 h-12 rounded-full neumorphic-button flex items-center justify-center text-[#6b8e6b] hover:text-[#5a7a5a] transition-all transform hover:scale-110 active:scale-90"
              >
                <ChevronLeft size={24} strokeWidth={2.5} />
              </button>

              <div className="w-full max-w-3xl mx-auto relative overflow-hidden py-6 px-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonial}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="neumorphic-card rounded-[40px] p-14 relative"
                  >
                    <span className="absolute top-4 md:top-8 left-6 md:left-10 text-5xl md:text-7xl text-[#6b8e6b]/15 font-serif leading-none select-none">“</span>
                    <div className="relative z-10">
                      <p className="text-lg md:text-xl italic mb-6 md:mb-8 text-[#4a634a] dark:text-[#8fb38f] leading-relaxed font-medium">
                        {testimonials[currentTestimonial].text}
                      </p>
                      <p className="font-bold text-sm md:text-base text-[#2c3e2c] dark:text-[#e0e8e0] tracking-wide">
                        {testimonials[currentTestimonial].author}
                      </p>
                    </div>
                    <span className="absolute bottom-2 md:bottom-4 right-6 md:right-10 text-5xl md:text-7xl text-[#6b8e6b]/15 font-serif leading-none select-none">”</span>
                  </motion.div>
                </AnimatePresence>
              </div>

              <button
                onClick={nextTestimonial}
                className="absolute right-0 md:-right-4 z-10 w-12 h-12 rounded-full neumorphic-button flex items-center justify-center text-[#6b8e6b] hover:text-[#5a7a5a] transition-all transform hover:scale-110 active:scale-90"
              >
                <ChevronRight size={24} strokeWidth={2.5} />
              </button>
            </div>
            <div className="flex justify-center gap-3 mt-10">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${idx === currentTestimonial ? 'bg-[#6b8e6b] scale-125' : 'bg-[#6b8e6b]/20'
                    }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Us */}
        <section id="contact" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="neumorphic-card rounded-[40px] p-8 md:p-12">
              <h3 className="text-2xl font-bold mb-10 md:mb-12">Contact Us</h3>
              <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl neumorphic-button flex items-center justify-center text-sage shrink-0">
                      <MapPin size={20} />
                    </div>
                    <p className="text-sm opacity-70">150 South Avenue,<br />Chandigarh, P0651</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl neumorphic-button flex items-center justify-center text-sage shrink-0">
                      <Phone size={20} />
                    </div>
                    <p className="text-sm opacity-70">+91 334233 6700</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl neumorphic-button flex items-center justify-center text-sage shrink-0">
                      <Mail size={20} />
                    </div>
                    <p className="text-sm opacity-70">info@chandigarh.com</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl neumorphic-button flex items-center justify-center text-sage shrink-0">
                      <Globe size={20} />
                    </div>
                    <p className="text-sm opacity-70">Chandigarh Holistic Clinic</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" placeholder="Name" className="w-full px-6 py-4 rounded-xl neumorphic-inset text-sm outline-none" />
                    <input type="email" placeholder="Email" className="w-full px-6 py-4 rounded-xl neumorphic-inset text-sm outline-none" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" placeholder="Contact No." className="w-full px-6 py-4 rounded-xl neumorphic-inset text-sm outline-none" />
                    <input type="text" placeholder="Contact No. (Alt)" className="w-full px-6 py-4 rounded-xl neumorphic-inset text-sm outline-none" />
                  </div>
                  <textarea placeholder="Message" rows={4} className="w-full px-6 py-4 rounded-xl neumorphic-inset text-sm outline-none resize-none" />
                  <div className="flex justify-end">
                    <button className="px-10 py-3 bg-sage text-white rounded-full font-bold uppercase tracking-widest shadow-lg hover:bg-sage-dark transition-colors">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="neumorphic-card rounded-[40px] md:rounded-full px-8 py-6 md:py-4 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-32 h-12 rounded-lg neumorphic-inset overflow-hidden grayscale opacity-50">
                  <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=200&auto=format&fit=crop" alt="Map" className="w-full h-full object-cover" />
                </div>
                <button className="px-6 py-2 bg-sage text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-md">
                  Get Direction
                </button>
              </div>

              <div className="flex items-center gap-4">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, idx) => (
                  <button key={idx} className="w-8 h-8 rounded-full neumorphic-button flex items-center justify-center text-sage">
                    <Icon size={14} />
                  </button>
                ))}
              </div>

              <p className="text-[10px] opacity-50 font-bold uppercase tracking-widest">
                © Chandigarh Holistic Clinic
              </p>
            </div>
          </div>
        </footer>

        {/* Auth Modal */}
        <AnimatePresence>
          {showAuthModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setShowAuthModal(false)}
                className="absolute inset-0 bg-black/10 dark:bg-black/40 backdrop-blur-[2px]"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 300,
                  duration: 0.3
                }}
                className="relative w-full max-w-md neumorphic-card rounded-[40px] p-6 sm:p-10 overflow-hidden"
              >
                <button
                  onClick={() => setShowAuthModal(false)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full neumorphic-button flex items-center justify-center text-[#6b8e6b] hover:text-[#5a7a5a] transition-colors"
                >
                  <X size={20} />
                </button>

                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-[#6b8e6b] rounded-2xl flex items-center justify-center text-white shadow-lg mx-auto mb-4">
                    <Leaf size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#2c3e2c] dark:text-[#e0e8e0]">Welcome Back</h3>
                  <p className="text-sm opacity-60 text-[#2c3e2c] dark:text-[#e0e8e0]">Please enter your details to continue</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#2c3e2c] dark:text-[#e0e8e0] ml-4">Email Address</label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      className="w-full px-6 py-4 rounded-2xl neumorphic-inset text-sm outline-none focus:ring-2 ring-[#6b8e6b]/20 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#2c3e2c] dark:text-[#e0e8e0] ml-4">Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-6 py-4 rounded-2xl neumorphic-inset text-sm outline-none focus:ring-2 ring-[#6b8e6b]/20 transition-all"
                    />
                  </div>

                  <button className="w-full py-4 bg-[#6b8e6b] text-white rounded-2xl font-bold uppercase tracking-widest shadow-xl shadow-[#6b8e6b]/30 hover:bg-[#5a7a5a] transition-all transform hover:scale-[1.02] active:scale-[0.98] mt-4">
                    Sign In
                  </button>

                  <div className="relative py-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[#2c3e2c]/10"></div>
                    </div>
                    <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                      <span className="bg-[#f2f2f2] dark:bg-[#1a1c1a] px-4 text-[#2c3e2c] dark:text-[#e0e8e0]/40">Or continue with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button className="py-3 rounded-2xl neumorphic-button text-[10px] font-bold uppercase tracking-widest text-[#2c3e2c] dark:text-[#e0e8e0] flex items-center justify-center gap-2">
                      <Globe size={14} /> Google
                    </button>
                    <button className="py-3 rounded-2xl neumorphic-button text-[10px] font-bold uppercase tracking-widest text-[#2c3e2c] dark:text-[#e0e8e0] flex items-center justify-center gap-2">
                      <Facebook size={14} /> Facebook
                    </button>
                  </div>
                </div>

                <p className="text-center mt-8 text-[11px] text-[#2c3e2c] dark:text-[#e0e8e0]/60">
                  Don&apos;t have an account? <button className="text-[#6b8e6b] font-bold hover:underline">Sign Up</button>
                </p>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
