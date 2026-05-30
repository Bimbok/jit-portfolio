"use client";

import React, { useState, useCallback, useMemo } from "react";
import { Terminal } from "@/components/ui/terminal";

// Types for our File System
type FileType = "file" | "dir";

interface FSNode {
  type: FileType;
  name: string;
  content?: string;
  children?: Record<string, FSNode>;
}

const INITIAL_FS: Record<string, FSNode> = {
  "/": {
    type: "dir",
    name: "/",
    children: {
      bin: { 
        type: "dir", 
        name: "bin", 
        children: { 
          bash: { type: "file", name: "bash", content: "[Binary Content]" },
          ls: { type: "file", name: "ls", content: "[Binary Content]" },
          pacman: { type: "file", name: "pacman", content: "[Binary Content]" },
          cowsay: { type: "file", name: "cowsay", content: "[Script Content]" },
        } 
      },
      boot: { type: "dir", name: "boot", children: { vmlinuz: { type: "file", name: "vmlinuz", content: "[Kernel Image]" }, "grub.cfg": { type: "file", name: "grub.cfg", content: "set timeout=5\nmenuentry 'Arch Linux' {\n  linux /boot/vmlinuz root=UUID=... rw\n}" } } },
      dev: { type: "dir", name: "dev", children: { null: { type: "file", name: "null", content: "" }, random: { type: "file", name: "random", content: "[Entropy Stream]" } } },
      etc: {
        type: "dir",
        name: "etc",
        children: {
          hostname: { type: "file", name: "hostname", content: "bimbok-arch" },
          pacman: { type: "dir", name: "pacman", children: { "pacman.conf": { type: "file", name: "pacman.conf", content: "HoldPkg = pacman glibc\nArchitecture = auto\nColor\nCheckSpace\nVerbosePkgLists\nParallelDownloads = 5" } } },
          os: { type: "file", name: "os", content: "NAME=\"Arch Linux\"\nID=arch\nPRETTY_NAME=\"Arch Linux\"" },
          "issue": { type: "file", name: "issue", content: "Arch Linux \\r (\\l)\n" },
        },
      },
      home: {
        type: "dir",
        name: "home",
        children: {
          visitor: {
            type: "dir",
            name: "visitor",
            children: {
              "bio.txt": { type: "file", name: "bio.txt", content: "Bratik Mukherjee: Full Stack and Android developer building web, CLI, JVM, and native Android systems." },
              "skills.txt": { type: "file", name: "skills.txt", content: "React, Next.js, Node.js, PostgreSQL, Kotlin, Go, C/C++, Java, Python, Tailwind, D3.js." },
              projects: {
                type: "dir",
                name: "projects",
                children: {
                  "AlgoScope.md": { type: "file", name: "AlgoScope.md", content: "Algorithm visualizer with D3.js." },
                  "bDoci.md": { type: "file", name: "bDoci.md", content: "Native Android developer knowledge base." },
                  "Sizuka.md": { type: "file", name: "Sizuka.md", content: "Custom interpreted programming language." },
                  "bimagic.md": { type: "file", name: "bimagic.md", content: "Git automation CLI tool." },
                },
              },
              "contact.txt": { type: "file", name: "contact.txt", content: "Email: tmsl.it27.bratik@gmail.com\nGitHub: github.com/Bimbok\nLinkedIn: linkedin.com/in/bratik-mukherjee" },
              ".bashrc": { type: "file", name: ".bashrc", content: "alias ls='ls --color=auto'\nalias htop='top'\nPS1='[\\u@\\h \\W]\\$ '" },
            },
          },
        },
      },
      usr: { type: "dir", name: "usr", children: { local: { type: "dir", name: "local", children: {} }, bin: { type: "dir", name: "bin", children: {} } } },
      var: {
        type: "dir",
        name: "var",
        children: {
          log: { type: "dir", name: "log", children: { "pacman.log": { type: "file", name: "pacman.log", content: "[2026-05-30T15:30:24+0530] [PACMAN] Running 'pacman -Syu'" } } },
        },
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

const FORTUNES = [
  "A day for firm decisions!!!!!  Or is it?",
  "A dream you have will come true.",
  "Architecture is the art of how to waste space.",
  "Arch Linux: because you have too much free time.",
  "Better to be a compiler than an interpreter.",
  "Bratik is watching your terminal session. (Not really)",
  "I'd tell you a joke about UDP, but you might not get it.",
  "Linux: The choice of a GNU generation.",
  "Optimization is the root of all evil.",
];

const cowsay = (text: string) => {
  const lines = text.match(/.{1,30}(\s|$)/g) || [text];
  const width = Math.max(...lines.map(l => l.trim().length));
  const top = " _" + "_".repeat(width) + "_ ";
  const bottom = " -" + "-".repeat(width) + "- ";
  const body = lines.map((l, i) => {
    const content = l.trim();
    let edge = "|";
    if (lines.length === 1) edge = "<";
    else if (i === 0) edge = "/";
    else if (i === lines.length - 1) edge = "\\";
    return `${edge} ${content.padEnd(width)} ${edge === "<" ? ">" : edge}`;
  });

  return [
    top,
    ...body,
    bottom,
    "        \\   ^__^",
    "         \\  (oo)\\_______",
    "            (__)\\       )\\/\\",
    "                ||----w |",
    "                ||     ||",
  ];
};

export default function TerminalFooter() {
  const [fs, setFs] = useState<Record<string, FSNode>>(INITIAL_FS);
  const [currentPath, setCurrentPath] = useState<string[]>(["home", "visitor"]);
  const [history, setHistory] = useState<string[]>([]);

  const resolvePath = useCallback((path: string, base: string[]): string[] | null => {
    if (path === "~") return ["home", "visitor"];
    if (path === "/") return [];
    
    let parts = path.startsWith("/") ? path.split("/").filter(Boolean) : [...base, ...path.split("/").filter(Boolean)];
    let resolved: string[] = [];

    for (const p of parts) {
      if (p === "..") resolved.pop();
      else if (p !== ".") resolved.push(p);
    }
    return resolved;
  }, []);

  const getNode = useCallback((path: string[]): FSNode | null => {
    let curr: FSNode = fs["/"];
    for (const p of path) {
      if (curr.children?.[p]) {
        curr = curr.children[p];
      } else {
        return null;
      }
    }
    return curr;
  }, [fs]);

  const updateFS = useCallback((path: string[], newNode: FSNode | null) => {
    setFs((prev) => {
      const newFs = JSON.parse(JSON.stringify(prev));
      let curr = newFs["/"];
      const parentPath = path.slice(0, -1);
      const nodeName = path[path.length - 1];

      for (const p of parentPath) {
        curr = curr.children[p];
      }

      if (newNode === null) {
        delete curr.children[nodeName];
      } else {
        if (!curr.children) curr.children = {};
        curr.children[nodeName] = newNode;
      }
      return newFs;
    });
  }, []);

  const handleCommand = (cmd: string) => {
    const rawCmd = cmd.trim();
    if (!rawCmd) return "";
    setHistory(prev => [...prev, rawCmd]);

    const parts = rawCmd.split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (command) {
      case "help":
        return [
          "Available commands:",
          "  ls, cd, pwd, cat, mkdir, touch, rm, mv, cp, clear, whoami, hostname, uname, neofetch, pacman, echo, exit, sudo, lsblk, df",
          "  date, cal, cowsay, fortune, history, sl, top, who",
        ];

      case "whoami":
        return "visitor";

      case "who":
        return "visitor  tty1         2026-05-30 09:08 (:0)";

      case "hostname":
        return "bimbok-arch";

      case "date":
        return new Date().toString();

      case "cal": {
        const d = new Date();
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return [
          `    ${months[d.getMonth()]} ${d.getFullYear()}     `,
          "Su Mo Tu We Th Fr Sa",
          "                   1",
          " 2  3  4  5  6  7  8",
          " 9 10 11 12 13 14 15",
          "16 17 18 19 20 21 22",
          "23 24 25 26 27 28 29",
          "30 31               ",
        ];
      }

      case "cowsay":
        return cowsay(args.join(" ") || "Moo!");

      case "fortune":
        return FORTUNES[Math.floor(Math.random() * FORTUNES.length)];

      case "history":
        return history.map((h, i) => `${i + 1}  ${h}`);

      case "sl":
        return [
          "      ====        ________                ___________",
          "  _D [] _________________ [____]  _________  [________]",
          " {_______________________|  oo  |_|  oooo  |_|  oo  |",
          " /oo\\oo\\  /oo\\oo\\  /oo\\oo\\  /oo\\oo\\  /oo\\oo\\  /oo\\oo\\",
        ];

      case "top":
        return [
          "top - 21:58:00 up 2 years, 3 months, 1 user, load average: 0.05, 0.12, 0.15",
          "Tasks: 120 total,   1 running, 119 sleeping,   0 stopped,   0 zombie",
          "%Cpu(s):  2.3 us,  0.5 sy,  0.0 ni, 97.0 id,  0.2 wa,  0.0 hi,  0.0 si,  0.0 st",
          "MiB Mem :  64384.0 total,  58201.2 free,   3249.4 used,   2933.4 buff/cache",
          "MiB Swap:   2048.0 total,   2048.0 free,      0.0 used.  60512.4 avail Mem ",
          "",
          "  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND",
          "  409 visitor   20   0   12.5g   3.2g 124560 S   2.0   5.1   0:42.12 next-dev",
          "    1 root      20   0  168340  12456   8500 S   0.0   0.0   0:01.45 systemd",
          "  101 root      20   0       0      0      0 S   0.0   0.0   0:00.00 kworker",
          "  512 visitor   20   0   18456   4560   3200 R   0.0   0.0   0:00.01 top",
        ];

      case "pwd":
        return "/" + currentPath.join("/");

      case "ls": {
        const targetPath = args[0] ? resolvePath(args[0], currentPath) : currentPath;
        if (!targetPath) return `ls: cannot access '${args[0]}': No such file or directory`;
        const node = getNode(targetPath);
        if (!node) return `ls: cannot access '${args[0]}': No such file or directory`;
        if (node.type === "file") return node.name;
        return Object.keys(node.children || {}).join("  ");
      }

      case "cd": {
        const target = args[0] || "~";
        const targetPath = resolvePath(target, currentPath);
        if (!targetPath) return `cd: no such file or directory: ${target}`;
        const node = getNode(targetPath);
        if (node && node.type === "dir") {
          setCurrentPath(targetPath);
          return "";
        }
        return `cd: no such file or directory: ${target}`;
      }

      case "cat": {
        if (!args[0]) return "cat: missing operand";
        const targetPath = resolvePath(args[0], currentPath);
        if (!targetPath) return `cat: ${args[0]}: No such file or directory`;
        const node = getNode(targetPath);
        if (node) {
          if (node.type === "file") return node.content || "";
          return `cat: ${args[0]}: Is a directory`;
        }
        return `cat: ${args[0]}: No such file or directory`;
      }

      case "mkdir": {
        if (!args[0]) return "mkdir: missing operand";
        const targetPath = resolvePath(args[0], currentPath);
        if (!targetPath) return `mkdir: cannot create directory '${args[0]}': No such file or directory`;
        if (getNode(targetPath)) return `mkdir: cannot create directory '${args[0]}': File exists`;
        updateFS(targetPath, { type: "dir", name: targetPath[targetPath.length - 1], children: {} });
        return "";
      }

      case "touch": {
        if (!args[0]) return "touch: missing file operand";
        const targetPath = resolvePath(args[0], currentPath);
        if (!targetPath) return `touch: cannot touch '${args[0]}': No such file or directory`;
        const existing = getNode(targetPath);
        if (!existing) {
          updateFS(targetPath, { type: "file", name: targetPath[targetPath.length - 1], content: "" });
        }
        return "";
      }

      case "rm": {
        if (!args[0]) return "rm: missing operand";
        const recursive = args.includes("-r") || args.includes("-rf");
        const targetName = args.find(a => !a.startsWith("-"));
        if (!targetName) return "rm: missing operand";
        const targetPath = resolvePath(targetName, currentPath);
        if (!targetPath) return `rm: cannot remove '${targetName}': No such file or directory`;
        const node = getNode(targetPath);
        if (!node) return `rm: cannot remove '${targetName}': No such file or directory`;
        if (node.type === "dir" && !recursive) return `rm: cannot remove '${targetName}': Is a directory`;
        updateFS(targetPath, null);
        return "";
      }

      case "mv": {
        if (args.length < 2) return "mv: missing destination file operand";
        const srcPath = resolvePath(args[0], currentPath);
        const destPath = resolvePath(args[1], currentPath);
        if (!srcPath || !destPath) return "mv: No such file or directory";
        const srcNode = getNode(srcPath);
        if (!srcNode) return `mv: cannot stat '${args[0]}': No such file or directory`;
        updateFS(destPath, { ...srcNode, name: destPath[destPath.length - 1] });
        updateFS(srcPath, null);
        return "";
      }

      case "cp": {
        if (args.length < 2) return "cp: missing destination file operand";
        const srcPath = resolvePath(args[0], currentPath);
        const destPath = resolvePath(args[1], currentPath);
        if (!srcPath || !destPath) return "cp: No such file or directory";
        const srcNode = getNode(srcPath);
        if (!srcNode) return `cp: cannot stat '${args[0]}': No such file or directory`;
        updateFS(destPath, JSON.parse(JSON.stringify({ ...srcNode, name: destPath[destPath.length - 1] })));
        return "";
      }

      case "clear":
        return { output: "", action: "clear" };

      case "uname":
        if (args[0] === "-a") return "Linux bimbok-arch 6.9.3-arch1-1 #1 SMP PREEMPT_DYNAMIC Fri, 31 May 2026 15:30:24 +0000 x86_64 GNU/Linux";
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
          "WM: Hyprland",
          "Terminal: pheudoterm",
          "CPU: AMD Ryzen 9 5950X (32) @ 3.400GHz",
          "GPU: NVIDIA GeForce RTX 3090",
          "Memory: 3249MiB / 64384MiB",
        ];
        return ARCH_LOGO.map((line, i) => `${line}  ${info[i] || ""}`);
      }

      case "pacman":
        if (args[0] === "-Syu") return [":: Synchronizing package databases...", " core is up to date", " extra is up to date", " community is up to date", ":: Starting full system upgrade...", " there is nothing to do"];
        if (args[0] === "-S") return `resolving dependencies...\nlooking for conflicting packages...\n\nPackages (1) ${args[1] || "neovim"}-0.10.0-1\n\nTotal Installed Size:  24.50 MiB\n\n:: Proceed with installation? [Y/n] Y\n(1/1) checking keys in keyring\n(1/1) checking package integrity\n(1/1) loading package files\n(1/1) checking for file conflicts\n(1/1) checking available disk space\n:: Processing package changes...\n(1/1) installing ${args[1] || "neovim"}...`;
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
        return `bash: command not found: ${command}`;
    }
  };

  const promptUsername = useMemo(() => {
    return `visitor@bimbok-arch:/${currentPath.join("/")}`;
  }, [currentPath]);

  return (
    <footer className="bg-gruv-bg-soft border-t border-gruv-bg-soft p-10 font-mono">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-3 h-3 rounded-full bg-gruv-red animate-pulse" />
          <h2 className="text-gruv-gray uppercase tracking-[0.2em]">Phase 07: Link, Load, Execute</h2>
        </div>

        <Terminal
          commands={[]}
          outputs={{}}
          username={promptUsername}
          className="max-w-none px-0"
          isInteractive={true}
          onCommand={handleCommand}
          initialDelay={100}
        />

        <div className="mt-10 flex flex-col md:flex-row justify-between text-xs text-gruv-gray uppercase tracking-widest gap-4">
          <div>© 2026 Bratik Mukherjee</div>
          <div className="flex gap-6">
            <a href="https://github.com/Bimbok" className="hover:text-gruv-fg transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/bratik-mukherjee" className="hover:text-gruv-fg transition-colors">LinkedIn</a>
            <a href="https://bimbok-portfolio.vercel.app" className="hover:text-gruv-fg transition-colors">Portfolio</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
