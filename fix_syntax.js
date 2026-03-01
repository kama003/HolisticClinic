const fs = require('fs');
let c = fs.readFileSync('components/ClinicLanding.tsx', 'utf8');

// Fix duplicate classes
c = c.replace(/dark:bg-\[#1a1c1a\] dark:bg-\[#1a1c1a\]/g, "dark:bg-[#1a1c1a]");
c = c.replace(/dark:text-\[#e0e8e0\] dark:text-\[#e0e8e0\]/g, "dark:text-[#e0e8e0]");

// Fix syntax at end
// First remove any stray </div> at the end added by previous node command
c = c.replace(/<\/div>\r?\n?$/, "");

// Ensure we have exactly two </div> before );
// The original was:
//       </AnimatePresence>
//     </div>
//   );
// }
//
// Which means we have ONE </div> before );.
// We need to replace exactly that area to:
//       </AnimatePresence>
//       </div>
//     </div>
//   );
// }

// Match `      </AnimatePresence>\s*</div>\s*\);\s*\}` securely
const replacement = `      </AnimatePresence>
      </div>
    </div>
  );
}`;

c = c.replace(/<\/AnimatePresence>[\s\S]*?<\/div>[\s\S]*?\);[\s\S]*?\}/, replacement);

fs.writeFileSync('components/ClinicLanding.tsx', c);
console.log("Fixed syntax");
