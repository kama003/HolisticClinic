const fs = require('fs');
let c = fs.readFileSync('components/ClinicLanding.tsx', 'utf8');

// 1. Re-add Sun, Moon imports if missing
if (!c.includes('Sun,')) {
    c = c.replace(/X\n\} from 'lucide-react';/, "X,\n  Sun,\n  Moon\n} from 'lucide-react';");
}

// 2. Add hydration-safe hooks securely replacing the basic dark declaration
c = c.replace(
    /export default function ClinicLanding\(\) \{\s+const \[currentTestimonial.*?\] = React\.useState\(0\);/,
    `export default function ClinicLanding() {
  const [currentTestimonial, setCurrentTestimonial] = React.useState(0);
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = require('next-themes').useTheme();

  React.useEffect(() => setMounted(true), []);

  const isDark = mounted && theme === 'dark';`
);

// Remove the `isDark` that I shouldn't be declaring multiple times if it was already there
// Wait, git checkout means it's back to bare original file where `isDark` doesn't even exist!
// So I don't need to replace `isDark` variable. I just replaced `currentTestimonial` definition.

// 3. Update the root HTML safely
c = c.replace(
    /<div className="min-h-screen pb-20 bg-\[#f2f2f2\]">/,
    `<div className="min-h-screen pb-20 bg-[#f2f2f2] dark:bg-[#1a1c1a] transition-colors duration-300">
      <div className="text-[#2c3e2c] dark:text-[#e0e8e0]">`
);

// And close the div at the bottom
const currentEnd = `      </AnimatePresence>
    </div>
  );
}`;
const newEnd = `      </AnimatePresence>
      </div>
    </div>
  );
}`;
c = c.replace(currentEnd, newEnd);
c = c.replace(`      </AnimatePresence>\r\n    </div>\r\n  );\r\n}`, `      </AnimatePresence>\r\n      </div>\r\n    </div>\r\n  );\r\n}`);

// 4. Transform inner classes for dark mode explicitly
c = c.replace(/bg-\[#f2f2f2\]/g, "bg-[#f2f2f2] dark:bg-[#1a1c1a]");
c = c.replace(/text-\[#2c3e2c\]/g, "text-[#2c3e2c] dark:text-[#e0e8e0]");
c = c.replace(/border-\[#f2f2f2\]/g, "border-[#f2f2f2] dark:border-[#1a1c1a]");
c = c.replace(/border-\[#6b8e6b\]\/5/g, "border-[#6b8e6b]/5 dark:border-[#6b8e6b]/20");
c = c.replace(/border-\[#6b8e6b\]\/10/g, "border-[#6b8e6b]/10 dark:border-[#6b8e6b]/30");
c = c.replace(/bg-\[#f2f2f2\]\/40/g, "bg-[#f2f2f2]/40 dark:bg-[#1a1c1a]/40");
c = c.replace(/bg-black\/10/g, "bg-black/10 dark:bg-black/40");
c = c.replace(/text-\[#4a634a\]/g, "text-[#4a634a] dark:text-[#8fb38f]");

// Clean up any double classes from multiple replacements mapping to the same base (like root div)
c = c.replace(/dark:bg-\[#1a1c1a\] dark:bg-\[#1a1c1a\]/g, "dark:bg-[#1a1c1a]");
c = c.replace(/dark:text-\[#e0e8e0\] dark:text-\[#e0e8e0\]/g, "dark:text-[#e0e8e0]");


// 5. Add the toggle button in the navbar right before Log In | Sign Up button
const toggleButtonCode = `            <div className="flex items-center gap-4">
              <button 
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className="w-10 h-10 rounded-full neumorphic-button flex items-center justify-center text-[#6b8e6b]"
              >
                {mounted ? (isDark ? <Sun size={18} /> : <Moon size={18} />) : <span className="w-4 h-4 rounded-full border-2 border-[#6b8e6b] border-t-transparent animate-spin"></span>}
              </button>
              <button
                onClick={() => setShowAuthModal(true)}
                className="px-6 py-2 rounded-full neumorphic-button text-[10px] font-bold uppercase tracking-widest text-[#2c3e2c] dark:text-[#e0e8e0]"
              >
                Log In | Sign Up
              </button>
            </div>`;

c = c.replace(
    /<button\s+onClick=\{\(\) => setShowAuthModal\(true\)\}\s+className="px-6 py-2 rounded-full neumorphic-button text-\[10px\] font-bold uppercase tracking-widest text-\[#2c3e2c\].*?"\s*>\s*Log In \| Sign Up\s*<\/button>/,
    toggleButtonCode
);

fs.writeFileSync('components/ClinicLanding.tsx', c);
console.log('Restoration and Toggle Injection complete.');
