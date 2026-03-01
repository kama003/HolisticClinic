const fs = require('fs');

// 1. Update layout.tsx to use ThemeProvider
let layout = fs.readFileSync('app/layout.tsx', 'utf8');
layout = layout.replace(
    /export default function RootLayout/,
    "import { ThemeProvider } from '@/components/ThemeProvider';\n\nexport default function RootLayout"
);

layout = layout.replace(
    /<body suppressHydrationWarning className="bg-\[#f2f2f2\] text-\[#333\]">\s*\{children\}\s*<\/body>/,
    `<body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>`
);
fs.writeFileSync('app/layout.tsx', layout);

// 2. Update ClinicLanding.tsx to use next-themes useTheme hook
let clinic = fs.readFileSync('components/ClinicLanding.tsx', 'utf8');
clinic = clinic.replace(/const \[isDark, setIsDark\] = React\.useState\(false\);/,
    "const { theme, setTheme } = require('next-themes').useTheme();\n  const isDark = theme === 'dark';");

// Use the new setter
clinic = clinic.replace(/onClick=\{\(\) => setIsDark\(!isDark\)\}/,
    "onClick={() => setTheme(isDark ? 'light' : 'dark')}");

// Remove custom dynamic string from root element. next-themes handles the html class!
// It was: <div className={`min-h-screen pb-20 bg-[#f2f2f2] dark:bg-[#1a1c1a] transition-colors duration-300 ${isDark ? 'dark' : ''}`}>
clinic = clinic.replace(
    /<div className=\{\`min-h-screen pb-20 bg-\[#f2f2f2\] dark:bg-\[#1a1c1a\] transition-colors duration-300 \$\{isDark \? 'dark' : ''\}\`\}>/,
    `<div className="min-h-screen pb-20 bg-[#f2f2f2] dark:bg-[#1a1c1a] transition-colors duration-300">`
);

fs.writeFileSync('components/ClinicLanding.tsx', clinic);

// 3. Update globals.css
// Change @media (prefers-color-scheme: dark) to just rely on the .dark class
const css = `@import "tailwindcss";

@theme {
  --color-sage: #6b8e6b;
  --color-sage-light: #8fb38f;
  --color-sage-dark: #4a634a;
}

:root {
  --neu-bg: #f2f2f2;
  --neu-shadow-1: #d9d9d9;
  --neu-shadow-2: #ffffff;
}

.dark {
  --neu-bg: #1a1c1a;
  --neu-shadow-1: #121312;
  --neu-shadow-2: #222522;
}

@layer utilities {
  .neumorphic-flat {
    background: var(--neu-bg);
    box-shadow: 8px 8px 16px var(--neu-shadow-1), -8px -8px 16px var(--neu-shadow-2);
  }
  
  .neumorphic-inset {
    background: var(--neu-bg);
    box-shadow: inset 8px 8px 16px var(--neu-shadow-1), inset -8px -8px 16px var(--neu-shadow-2);
  }

  .neumorphic-button {
    background: var(--neu-bg);
    box-shadow: 4px 4px 8px var(--neu-shadow-1), -4px -4px 8px var(--neu-shadow-2);
    transition: all 0.2s ease;
  }

  .neumorphic-button:active {
    box-shadow: inset 4px 4px 8px var(--neu-shadow-1), inset -4px -4px 8px var(--neu-shadow-2);
  }

  .neumorphic-card {
    background: var(--neu-bg);
    box-shadow: 12px 12px 24px var(--neu-shadow-1), -12px -12px 24px var(--neu-shadow-2);
  }
}
`;

fs.writeFileSync('app/globals.css', css);
console.log('Setup complete');
