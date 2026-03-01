const fs = require('fs');

let content = fs.readFileSync('components/ClinicLanding.tsx', 'utf8');

// 1. Add Sun, Moon to lucide imports
content = content.replace(/X\n\} from 'lucide-react';/, "X,\n  Sun,\n  Moon\n} from 'lucide-react';");

// 2. Add isDark state
content = content.replace(
    /const \[currentTestimonial.*?\] = React.useState\(0\);/,
    "const [currentTestimonial, setCurrentTestimonial] = React.useState(0);\n  const [isDark, setIsDark] = React.useState(false);"
);

// 3. Update root div precisely
// It was: <div className="min-h-screen pb-20 bg-[#f2f2f2]">
// We will replace it with:
// <div className={`min-h-screen pb-20 bg-[#f2f2f2] dark:bg-[#1a1c1a] transition-colors duration-300 ${isDark ? 'dark' : ''}`}>
//       <div className="text-[#2c3e2c] dark:text-[#e0e8e0]">
content = content.replace(
    /<div className="min-h-screen pb-20 bg-\[#f2f2f2\]">/,
    "<div className={`min-h-screen pb-20 bg-[#f2f2f2] dark:bg-[#1a1c1a] transition-colors duration-300 ${isDark ? 'dark' : ''}`}>\n      <div className=\"text-[#2c3e2c] dark:text-[#e0e8e0]\">"
);

// 4. Update the end of the file precisely
// Current end is:
//       </AnimatePresence>
//     </div>
//   );
// }
// We need to add one more </div> before the );
const currentEnd = `      </AnimatePresence>
    </div>
  );
}`;
const newEnd = `      </AnimatePresence>
      </div>
    </div>
  );
}`;
content = content.replace(currentEnd, newEnd);
// If Windows newlines:
content = content.replace(`      </AnimatePresence>\r\n    </div>\r\n  );\r\n}`, `      </AnimatePresence>\r\n      </div>\r\n    </div>\r\n  );\r\n}`);


// 5. Update classes
content = content.replace(/bg-\[#f2f2f2\]/g, "bg-[#f2f2f2] dark:bg-[#1a1c1a]");
content = content.replace(/text-\[#2c3e2c\]/g, "text-[#2c3e2c] dark:text-[#e0e8e0]");
content = content.replace(/border-\[#f2f2f2\]/g, "border-[#f2f2f2] dark:border-[#1a1c1a]");
content = content.replace(/border-\[#6b8e6b\]\/5/g, "border-[#6b8e6b]/5 dark:border-[#6b8e6b]/20");
content = content.replace(/border-\[#6b8e6b\]\/10/g, "border-[#6b8e6b]/10 dark:border-[#6b8e6b]/30");
content = content.replace(/bg-\[#f2f2f2\]\/40/g, "bg-[#f2f2f2]/40 dark:bg-[#1a1c1a]/40");

// 6. Add completely dark border equivalents for inputs and modal bg since auth modal backdrop might need it
content = content.replace(/bg-black\/10/g, "bg-black/10 dark:bg-black/40");
content = content.replace(/text-\[#4a634a\]/g, "text-[#4a634a] dark:text-[#8fb38f]");

// 7. Add theme toggle button next to auth button
const toggleButton = `
          <div className="flex items-center gap-4">
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
          </div>
`;

content = content.replace(
    /<button\s+onClick=\{\(\) => setShowAuthModal\(true\)\}\s+className="px-6 py-2 rounded-full neumorphic-button text-\[10px\] font-bold uppercase tracking-widest text-\[#2c3e2c\]"\s*>\s*Log In \| Sign Up\s*<\/button>/,
    toggleButton
);

fs.writeFileSync('components/ClinicLanding.tsx', content);

console.log('Safe update complete!');
