"use client";

import React, { useState } from "react";
import { Terminal } from "@/components/ui/terminal";

const FILE_SYSTEM: Record<string, any> = {
  "/": {
    home: {
      visitor: {
        "bio.txt":
          "Bratik Mukherjee: Full Stack and Android developer building web, CLI, JVM, and native Android systems.",
        "skills.txt":
          "React, Next.js, Node.js, PostgreSQL, Kotlin, Go, C/C++, Java, Python, Tailwind, D3.js.",
        projects: {
          "AlgoScope.md": "Algorithm visualizer with D3.js.",
          "bDoci.md": "Native Android developer knowledge base.",
          "Sizuka.md": "Custom interpreted programming language.",
          "bimagic.md": "Git automation CLI tool.",
        },
        "contact.txt":
          "Email: tmsl.it27.bratik@gmail.com\nGitHub: github.com/Bimbok\nLinkedIn: linkedin.com/in/bratik-mukherjee",
      },
    },
    etc: {
      hostname: "bimbok-arch",
      pacman: {
        "pacman.conf": "HoldPkg = pacman glibc",
      },
    },
    var: {
      log: {
        "pacman.log":
          "[2026-05-30T15:30:24+0530] [PACMAN] Running 'pacman -Syu'",
      },
    },
  },
};

const ARCH_LOGO = [
  "                   -`                    ",
  "                  .o+`                   ",
  "                 `ooo/                   ",
  "                `+oooo:                  ",
  "               `+oooooo:                 ",
  "               -+oooooo+:                ",
  "             `/:-:++oooo+:               ",
  "            `/++++/+++++++:              ",
  "           `/++++++++++++++:             ",
  "          `/+++ooooooooooooo/`           ",
  "         ./ooosssso++osssssso+`          ",
  "        .oossssso-````/ossssss+`         ",
  "       -osssssso.      :ssssssso.        ",
  "      :osssssss/        osssso+++.       ",
  "     /ossssssss/        +ssssooo/-       ",
  "   `/ossssso+/:-        -:/+osssso+-     ",
  "  `+sso+:-`                 `.-/+oso:    ",
  " `++:.                           `-/+/   ",
  " .`                                      ",
];

export default function TerminalFooter() {
  const [currentPath, setCurrentPath] = useState(["home", "visitor"]);

  const getDir = (pathArr: string[]) => {
    let curr = FILE_SYSTEM["/"];
    for (const p of pathArr) {
      if (curr[p] && typeof curr[p] === "object") {
        curr = curr[p];
      } else {
        return null;
      }
    }
    return curr;
  };

  const handleCommand = (cmd: string) => {
    const parts = cmd.trim().split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (command) {
      case "help":
        return [
          "Available commands:",
          "  ls, cd, pwd, cat, clear, whoami, hostname, uname, neofetch, pacman, echo, exit, sudo",
        ];
      case "whoami":
        return "visitor";
      case "hostname":
        return "bimbok-arch";
      case "pwd":
        return "/" + currentPath.join("/");
      case "ls": {
        const dir = getDir(currentPath);
        if (!dir) return "Error: Directory not found.";
        return Object.keys(dir).join("  ");
      }
      case "cd": {
        const target = args[0];
        if (!target || target === "~") {
          setCurrentPath(["home", "visitor"]);
          return "";
        }
        if (target === "..") {
          if (currentPath.length > 0) {
            setCurrentPath(currentPath.slice(0, -1));
          }
          return "";
        }
        if (target === "/") {
          setCurrentPath([]);
          return "";
        }

        const newPath = [
          ...currentPath,
          ...target.split("/").filter((p) => p && p !== "."),
        ];
        const dir = getDir(newPath);
        if (dir && typeof dir === "object") {
          setCurrentPath(newPath);
          return "";
        }
        return `cd: no such file or directory: ${target}`;
      }
      case "cat": {
        const target = args[0];
        if (!target) return "cat: missing operand";
        const dir = getDir(currentPath);
        if (dir && dir[target] !== undefined) {
          if (typeof dir[target] === "string") return dir[target];
          return `cat: ${target}: Is a directory`;
        }
        return `cat: ${target}: No such file or directory`;
      }
      case "clear":
        return { output: "", action: "clear" };
      case "uname":
        if (args[0] === "-a") {
          return "Linux bimbok-arch 6.9.3-arch1-1 #1 SMP PREEMPT_DYNAMIC Fri, 31 May 2026 15:30:24 +0000 x86_64 GNU/Linux";
        }
        return "Linux";
      case "neofetch": {
        const info = [
          "visitor@bimbok-arch",
          "------------------",
          "OS: Arch Linux x86_64",
          "Host: Compiler Pipeline Portfolio VM",
          "Kernel: 6.9.3-arch1-1",
          "Uptime: 2 years, 3 months",
          "Packages: 1337 (pacman)",
          "Shell: bash 5.2.26",
          "Resolution: 1920x1080",
          "DE: Gruvbox-Retro",
          "WM: i3-gaps",
          "Terminal: Aceternity-Terminal",
          "CPU: AMD Ryzen 9 5950X (32) @ 3.400GHz",
          "GPU: NVIDIA GeForce RTX 3090",
          "Memory: 3249MiB / 64384MiB",
        ];
        const combined = ARCH_LOGO.map((line, i) => {
          const infoLine = info[i] || "";
          return `${line}  ${infoLine}`;
        });
        return combined;
      }
      case "pacman":
        if (args[0] === "-Syu") {
          return [
            ":: Synchronizing package databases...",
            " core is up to date",
            " extra is up to date",
            " community is up to date",
            ":: Starting full system upgrade...",
            " there is nothing to do",
          ];
        }
        if (args[0] === "-S") {
          return `resolving dependencies...\nlooking for conflicting packages...\n\nPackages (1) ${args[1] || "neovim"}-0.10.0-1\n\nTotal Installed Size:  24.50 MiB\n\n:: Proceed with installation? [Y/n] Y\n(1/1) checking keys in keyring\n(1/1) checking package integrity\n(1/1) loading package files\n(1/1) checking for file conflicts\n(1/1) checking available disk space\n:: Processing package changes...\n(1/1) installing ${args[1] || "neovim"}...`;
        }
        return "pacman: no operation specified (use -h for help)";
      case "sudo":
        return "visitor is not in the sudoers file.  This incident will be reported.";
      case "echo":
        return args.join(" ");
      case "exit":
        return "Session terminated. Please refresh the page to reboot.";
      case "lsblk":
        return "NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS\nnvme0n1 259:0    0 931.5G  0 disk \n├─nvme0n1p1 259:1    0   1G  0 part /boot\n└─nvme0n1p2 259:2    0 930.5G  0 part /";
      case "df":
        return "Filesystem     1K-blocks      Used Available Use% Mounted on\n/dev/nvme0n1p2 958151248 124567890 833583358  13% /";
      default:
        return command ? `bash: command not found: ${command}` : "";
    }
  };

  return (
    <footer className="bg-gruv-bg-soft border-t border-gruv-bg-soft p-10 font-mono">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-3 h-3 rounded-full bg-gruv-red animate-pulse" />
          <h2 className="text-gruv-gray uppercase tracking-[0.2em]">
            Phase 07: Link, Load, Execute
          </h2>
        </div>

        <Terminal
          commands={[]}
          outputs={{}}
          username={`visitor@bimbok-arch${currentPath.length > 0 ? ":" + ("/" + currentPath.join("/")) : ""}`}
          className="max-w-none px-0"
          isInteractive={true}
          onCommand={handleCommand}
          initialDelay={100}
        />

        <div className="mt-10 flex flex-col md:flex-row justify-between text-xs text-gruv-gray uppercase tracking-widest gap-4">
          <div>© 2026 Bratik Mukherjee</div>
          <div className="flex gap-6">
            <a
              href="https://github.com/Bimbok"
              className="hover:text-gruv-fg transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/bratik-mukherjee"
              className="hover:text-gruv-fg transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://bimbok-portfolio.vercel.app"
              className="hover:text-gruv-fg transition-colors"
            >
              Portfolio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
