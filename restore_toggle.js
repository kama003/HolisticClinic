const fs = require('fs');
let c = fs.readFileSync('components/ClinicLanding.tsx', 'utf8');

// 1. Re-add Sun, Moon imports if missing
if (!c.includes('Sun,')) {
    c = c.replace(/X\n\} from 'lucide-react';/, "X,\n  Sun,\n  Moon\n} from 'lucide-react';");
}

// 2. We lost the toggle button in the navbar when you rolled back and manually applied changes. Let's add it back.
const toggleButtonCode = `            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsDark(!isDark)}
                className="w-10 h-10 rounded-full neumorphic-button flex items-center justify-center text-[#6b8e6b]"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={() => setShowAuthModal(true)}
                className="px-6 py-2 rounded-full neumorphic-button text-[10px] font-bold uppercase tracking-widest text-[#2c3e2c] dark:text-[#e0e8e0]"
              >
                Log In | Sign Up
              </button>
            </div>`;

c = c.replace(
    /<button\s+onClick=\{\(\) => setShowAuthModal\(true\)\}\s+className="px-6 py-2 rounded-full neumorphic-button text-\[10px\] font-bold uppercase tracking-widest text-\[#2c3e2c\] dark:text-\[#e0e8e0\]"\s*>\s*Log In \| Sign Up\s*<\/button>/,
    toggleButtonCode
);

// 3. To completely override the OS dark mode and allow the user to FORCE light mode, we must
// change the root classes. Instead of relying on `dark:...` tailwind classes randomly,
// standard approach for toggleable tailwind dark mode is to use the `class` strategy in tailwind config, 
// and add the `.dark` class to an ancestor. But right now, we have dark: classes and CSS media queries.
// If the user's OS is dark, light mode toggle WON'T work correctly because Tailwind's default dark mode behavior is `media` (OS preference).

// Actually, since tailwind is handling `dark:` classes, and our neumorphic classes are explicit, 
// the easiest fix for the root container so `isDark` forces behavior:
// If isDark == true, add 'dark' class. If we want light mode, we must ensure it strips os-dark.
fs.writeFileSync('components/ClinicLanding.tsx', c);
console.log('Restored toggle switch!');
