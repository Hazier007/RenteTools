import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar-background)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        mono: ["var(--font-mono)"],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      // Eén set leestekst-tokens voor alle "prose"-blokken (uitleg onder de
      // calculators, blogartikels). Kleuren volgen de thema-variabelen, dus
      // light/dark werkt zonder prose-slate / prose-invert.
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "66ch",
            fontSize: "1.0625rem",
            lineHeight: "1.65",
            "--tw-prose-body": "var(--foreground)",
            "--tw-prose-headings": "var(--foreground)",
            "--tw-prose-lead": "var(--muted-foreground)",
            "--tw-prose-links": "var(--primary)",
            "--tw-prose-bold": "var(--foreground)",
            "--tw-prose-counters": "var(--muted-foreground)",
            "--tw-prose-bullets": "var(--muted-foreground)",
            "--tw-prose-hr": "var(--border)",
            "--tw-prose-quotes": "var(--foreground)",
            "--tw-prose-quote-borders": "var(--border)",
            "--tw-prose-captions": "var(--muted-foreground)",
            "--tw-prose-code": "var(--foreground)",
            "--tw-prose-pre-code": "var(--foreground)",
            "--tw-prose-pre-bg": "var(--muted)",
            "--tw-prose-th-borders": "var(--border)",
            "--tw-prose-td-borders": "var(--border)",
            p: { marginTop: "0", marginBottom: "1.1em" },
            "h2, h3, h4": { lineHeight: "1.3", textWrap: "balance" },
            h2: { fontSize: "1.375em", marginTop: "1.6em", marginBottom: "0.6em" },
            h3: { fontSize: "1.15em", marginTop: "1.4em", marginBottom: "0.5em" },
            h4: { fontSize: "1em", marginTop: "1.2em", marginBottom: "0.4em" },
            "ul, ol": { marginTop: "0.6em", marginBottom: "1.1em", paddingLeft: "1.4em" },
            li: { marginTop: "0.3em", marginBottom: "0.3em" },
            "li > p": { marginTop: "0.3em", marginBottom: "0.3em" },
            a: { textDecoration: "none", fontWeight: "500" },
            "a:hover": { textDecoration: "underline" },
            strong: { fontWeight: "600" },
            table: { fontSize: "0.9em", lineHeight: "1.5" },
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
