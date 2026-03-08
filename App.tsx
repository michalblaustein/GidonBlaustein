import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Wind, 
  Eye, 
  Volume2, 
  Zap, 
  MessageCircle, 
  ChevronRight, 
  Menu, 
  X, 
  Play, 
  Pause,
  Award,
  BookOpen,
  Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
interface Exercise {
  id: number;
  title: string;
  description: string;
  instructions: string[];
  icon: React.ReactNode;
  audioUrl?: string;
}

// --- Data ---
const EXERCISES: Exercise[] = [
  {
    id: 1,
    title: "Box Breathing",
    description: "The Navy SEAL technique to instantly reset your nervous system.",
    instructions: [
      "Inhale slowly for 4 seconds.",
      "Hold your breath for 4 seconds.",
      "Exhale slowly for 4 seconds.",
      "Hold empty for 4 seconds.",
      "Repeat 4 times."
    ],
    icon: <Wind className="w-6 h-6" />,
  },
  {
    id: 2,
    title: "5-4-3-2-1 Grounding",
    description: "Pull your mind out of a panic loop and back into the present moment.",
    instructions: [
      "Acknowledge 5 things you see around you.",
      "Acknowledge 4 things you can touch.",
      "Acknowledge 3 things you hear.",
      "Acknowledge 2 things you can smell.",
      "Acknowledge 1 thing you can taste."
    ],
    icon: <Eye className="w-6 h-6" />,
  },
  {
    id: 3,
    title: "The Long Exhale",
    description: "Tricks your brain into thinking you are safe by activating the Vagus nerve.",
    instructions: [
      "Inhale through your nose for a count of 4.",
      "Pucker your lips as if breathing through a straw.",
      "Exhale slowly for a count of 8.",
      "Focus entirely on the feeling of the air leaving your body."
    ],
    icon: <Heart className="w-6 h-6" />,
  },
  {
    id: 4,
    title: "Vagus Nerve Reset",
    description: "Physical stimulation to break the cycle of high heart rate.",
    instructions: [
      "Splash ice-cold water on your face for 15 seconds.",
      "Or, hum a very low-pitched tone in your throat.",
      "This physically signals your heart to slow down."
    ],
    icon: <Zap className="w-6 h-6" />,
  },
  {
    id: 5,
    title: "Shoulder Drop",
    description: "Release the physical 'armor' your body builds during stress.",
    instructions: [
      "Inhale and pull your shoulders up to your ears as hard as you can.",
      "Hold for 5 seconds until they shake.",
      "Exhale and drop them completely in one go.",
      "Feel the weight leaving your upper body."
    ],
    icon: <Award className="w-6 h-6" />,
  }
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logoUrl = "https://lh3.googleusercontent.com/d/1jM3KvJo8AVJYfeYCHF8N5gkbMr98m6wk";
  const aboutImageUrl = "https://lh3.googleusercontent.com/d/1HKdNB6JDGo07QwFCHoKFChqSgsp2rhTv";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Exercises', href: '#exercises' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3">
          <img 
            src="https://lh3.googleusercontent.com/d/1jM3KvJo8AVJYfeYCHF8N5gkbMr98m6wk" 
            alt="Gidon Blaustein Logo" 
            className="h-10 w-auto"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <span className="font-serif text-xl font-bold tracking-tight text-primary">Gidon Blaustein</span>
            <span className="text-[10px] uppercase tracking-widest text-accent font-semibold">Master CBT Practitioner</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium hover:text-accent transition-colors">
              {link.name}
            </a>
          ))}
          <a 
            href="https://wa.me/972526412390" 
            target="_blank" 
            className="bg-primary text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-opacity-90 transition-all flex items-center gap-2"
          >
            <MessageCircle size={16} />
            Free Guide
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-primary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-stone-100 flex flex-col p-6 gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-medium text-stone-600 hover:text-primary"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="https://wa.me/972526412390" 
              className="bg-primary text-white p-4 rounded-xl text-center font-bold flex items-center justify-center gap-2"
            >
              <MessageCircle size={20} />
              WhatsApp Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ExerciseCard = ({ exercise, index }: { exercise: Exercise, index: number }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl p-8 border border-stone-200 shadow-sm hover:shadow-md transition-all group"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-paper rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
          {exercise.icon}
        </div>
        <a 
          href="https://wa.me/972526412390"
          target="_blank"
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent hover:text-primary transition-colors"
        >
          <Play size={14} />
          Audio Guide
        </a>
      </div>
      
      <h3 className="font-serif text-2xl mb-3 text-stone-900">{exercise.title}</h3>
      <p className="text-stone-500 text-sm mb-6 leading-relaxed italic">{exercise.description}</p>
      
      <div className="space-y-3">
        {exercise.instructions.map((step, i) => (
          <div key={i} className="flex gap-3 items-start">
            <div className="w-5 h-5 rounded-full bg-paper flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-accent mt-0.5">
              {i + 1}
            </div>
            <p className="text-sm text-stone-700 leading-snug">{step}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const App: React.FC = () => {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);

  return (
    <div className="min-h-screen selection:bg-accent selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-40">
           <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />
           <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white rounded-full border border-stone-200 shadow-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-stone-500">Free Therapeutic Resource</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-stone-900 mb-8 leading-[1.1]"
          >
            Calm Your Body <br />
            <span className="italic font-normal text-stone-500">In 60 Seconds.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-stone-600 font-light leading-relaxed mb-12"
          >
            5 Emergency Exercises to Lower Your Heart Rate and Break the Cycle of Anxiety. 
            Designed by Gidon Blaustein, Master CBT Practitioner.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a 
              href="#exercises" 
              className="w-full sm:w-auto bg-primary text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              View Exercises
              <ChevronRight size={20} />
            </a>
            <a 
              href="https://wa.me/972526412390" 
              target="_blank"
              className="w-full sm:w-auto bg-white text-stone-900 border border-stone-200 px-8 py-4 rounded-2xl font-bold hover:bg-stone-50 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="text-emerald-500" size={20} />
              Get Audio Guide
            </a>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-paper shadow-2xl">
                <img 
                  src="https://lh3.googleusercontent.com/d/1HKdNB6JDGo07QwFCHoKFChqSgsp2rhTv" 
                  alt="Gidon Blaustein" 
                  className="w-full h-full object-cover transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-accent p-8 rounded-3xl shadow-xl hidden md:block">
                <div className="flex items-center gap-4 text-white">
                  <Award size={40} />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest opacity-80">Certified</p>
                    <p className="text-xl font-serif">Level 5 Master</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="inline-block mb-4 text-xs font-bold tracking-[0.2em] text-accent uppercase">The Practitioner</div>
              <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-8">Gidon Blaustein, M.A.</h2>
              <div className="space-y-6 text-stone-600 text-lg leading-relaxed">
                <p>
                  Gidon is a <strong className="text-stone-900">Certified Master CBT Practitioner (Level 5)</strong> with years of experience helping individuals navigate the complexities of the human mind.
                </p>
                <p>
                  As the founder of <strong className="text-stone-900">Torah-Based Cognitive Behavioral Therapy (T-CBT)</strong>, he bridges the gap between ancient wisdom and modern psychological science, providing a unique and powerful framework for healing.
                </p>
                <p>
                  His approach focuses on practical, evidence-based techniques that empower clients to take control of their emotional well-being and live a life of purpose and tranquility.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-2 gap-6">
                <div className="p-6 bg-paper rounded-2xl border border-stone-100">
                  <BookOpen className="text-accent mb-4" size={24} />
                  <h4 className="font-bold text-stone-900 mb-1">T-CBT Founder</h4>
                  <p className="text-sm text-stone-500">Innovative therapeutic framework</p>
                </div>
                <div className="p-6 bg-paper rounded-2xl border border-stone-100">
                  <Award className="text-accent mb-4" size={24} />
                  <h4 className="font-bold text-stone-900 mb-1">Master Level</h4>
                  <p className="text-sm text-stone-500">Highest certification in CBT</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Book Section */}
      <section id="book" className="py-24 bg-stone-900 text-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              {/* Book Mockup Visualization */}
              <div className="relative w-full max-w-sm mx-auto perspective-1000">
                <motion.div 
                  initial={{ rotateY: -20, rotateX: 5 }}
                  whileInView={{ rotateY: -5, rotateX: 0 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="relative aspect-[2/3] bg-primary rounded-r-lg shadow-2xl preserve-3d overflow-hidden border-l-8 border-stone-800"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                  <div className="p-8 h-full flex flex-col justify-between border border-white/10">
                    <div className="space-y-4">
                      <div className="w-12 h-1 bg-accent" />
                      <h3 className="font-serif text-3xl md:text-4xl leading-tight">Torah-Based <br/>CBT</h3>
                      <p className="text-sm opacity-60 uppercase tracking-widest">A Modern Framework for Ancient Wisdom</p>
                    </div>
                    <div className="text-right">
                      <p className="font-serif italic text-lg">Gidon Blaustein</p>
                    </div>
                  </div>
                </motion.div>
                {/* Pages effect */}
                <div className="absolute top-2 -right-4 w-full h-full bg-stone-200 rounded-r-lg -z-10 shadow-lg" />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="inline-block mb-4 text-xs font-bold tracking-[0.2em] text-accent uppercase">New Publication</div>
              <h2 className="font-serif text-4xl md:text-5xl mb-8">The T-CBT Method</h2>
              <p className="text-stone-400 text-lg leading-relaxed mb-6">
                In his latest book, Gidon Blaustein unveils the comprehensive methodology of Torah-Based Cognitive Behavioral Therapy. 
              </p>
              <p className="text-stone-400 text-lg leading-relaxed mb-8">
                This work serves as both a theoretical foundation and a practical guide for practitioners and individuals seeking a deeper, spiritually-aligned path to mental wellness.
              </p>
              <a 
                href="https://wa.me/972526412390" 
                target="_blank"
                className="inline-flex items-center gap-3 bg-accent text-white px-8 py-4 rounded-2xl font-bold hover:bg-opacity-90 transition-all"
              >
                <BookOpen size={20} />
                Order Your Copy
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Exercises Section */}
      <section id="exercises" className="py-24 bg-paper">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6">Emergency Relief</h2>
            <p className="text-stone-600 text-lg">
              When anxiety strikes, your body enters 'Fight or Flight' mode. These exercises are designed to physically override that response and lower your heart rate in under 60 seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {EXERCISES.map((ex, i) => (
              <ExerciseCard key={ex.id} exercise={ex} index={i} />
            ))}
            
            {/* CTA Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="bg-primary rounded-2xl p-8 text-white flex flex-col justify-center items-center text-center shadow-xl shadow-primary/20"
            >
              <MessageCircle size={48} className="mb-6 opacity-50" />
              <h3 className="font-serif text-3xl mb-4">Want the Audio Guide?</h3>
              <p className="mb-8 opacity-80">I've recorded a guided version of these exercises to help you through the moment.</p>
              <a 
                href="https://wa.me/972526412390" 
                target="_blank"
                className="w-full bg-white text-primary py-4 rounded-xl font-bold hover:bg-stone-100 transition-all"
              >
                Send WhatsApp Message
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-stone-900 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row">
            <div className="p-12 md:w-1/2 text-white">
              <h2 className="font-serif text-4xl mb-6">Get in Touch</h2>
              <p className="text-stone-400 mb-12">
                Whether you're looking for therapy, consultation, or just have a question about T-CBT, I'm here to help.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-accent">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-stone-500 uppercase font-bold tracking-widest">WhatsApp / Phone</p>
                    <p className="text-lg">+972 52-641-2390</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-accent">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-stone-500 uppercase font-bold tracking-widest">Direct Message</p>
                    <a href="https://wa.me/972526412390" className="text-lg hover:text-accent transition-colors underline decoration-accent/30 underline-offset-4">Start a Conversation</a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-12 md:w-1/2 bg-stone-800/50 backdrop-blur-sm border-l border-white/5">
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent outline-none transition-all" placeholder="Your Name" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Email</label>
                  <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent outline-none transition-all" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Message</label>
                  <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent outline-none transition-all" placeholder="How can I help you?"></textarea>
                </div>
                <button className="w-full bg-accent text-white py-4 rounded-xl font-bold hover:bg-opacity-90 transition-all">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-paper border-t border-stone-200">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <span className="font-serif text-xl font-bold text-primary">Gidon Blaustein</span>
            <p className="text-sm text-stone-500 mt-1">© 2024 All Rights Reserved.</p>
          </div>
          
          <div className="flex gap-8 text-sm font-medium text-stone-600">
            <button onClick={() => setShowPrivacy(true)} className="hover:text-accent transition-colors cursor-pointer">Privacy Policy</button>
            <button onClick={() => setShowAccessibility(true)} className="hover:text-accent transition-colors cursor-pointer">Accessibility</button>
          </div>

          <div className="flex gap-4">
            <a href="https://wa.me/972526412390" className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-600 hover:text-emerald-500 hover:border-emerald-500 transition-all">
              <MessageCircle size={18} />
            </a>
          </div>
        </div>
      </footer>
      {/* Legal Modals */}
      <AnimatePresence>
        {showPrivacy && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setShowPrivacy(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 md:p-12 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-serif text-3xl">Privacy Policy</h2>
                <button onClick={() => setShowPrivacy(false)} className="p-2 hover:bg-stone-100 rounded-full transition-colors"><X /></button>
              </div>
              <div className="prose prose-stone text-stone-600 space-y-4">
                <p>Your privacy is important to us. This policy outlines how we handle your data.</p>
                <h4 className="font-bold text-stone-900">1. Data Collection</h4>
                <p>We only collect information that you voluntarily provide via our contact forms or WhatsApp communication.</p>
                <h4 className="font-bold text-stone-900">2. Use of Information</h4>
                <p>Information provided is used solely for the purpose of professional consultation and providing the requested therapeutic resources.</p>
                <h4 className="font-bold text-stone-900">3. Third Parties</h4>
                <p>We do not sell or share your personal information with third parties for marketing purposes.</p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showAccessibility && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setShowAccessibility(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 md:p-12 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-serif text-3xl">Accessibility Statement</h2>
                <button onClick={() => setShowAccessibility(false)} className="p-2 hover:bg-stone-100 rounded-full transition-colors"><X /></button>
              </div>
              <div className="prose prose-stone text-stone-600 space-y-4">
                <p>We are committed to ensuring digital accessibility for people with disabilities.</p>
                <h4 className="font-bold text-stone-900">Compliance Status</h4>
                <p>We aim to comply with the Web Content Accessibility Guidelines (WCAG) 2.1 level AA.</p>
                <h4 className="font-bold text-stone-900">Feedback</h4>
                <p>If you encounter any accessibility barriers on our website, please let us know via the contact information provided.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
