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
      bin: { type: "dir", name: "bin", children: { bash: { type: "file", name: "bash", content: "[Binary Content]" } } },
      boot: { type: "dir", name: "boot", children: { vmlinuz: { type: "file", name: "vmlinuz", content: "[Kernel Image]" } } },
      dev: { type: "dir", name: "dev", children: { null: { type: "file", name: "null", content: "" } } },
      etc: {
        type: "dir",
        name: "etc",
        children: {
          hostname: { type: "file", name: "hostname", content: "bimbok-arch" },
          pacman: { type: "dir", name: "pacman", children: { "pacman.conf": { type: "file", name: "pacman.conf", content: "HoldPkg = pacman glibc" } } },
          os: { type: "file", name: "os", content: "NAME=\"Arch Linux\"\nID=arch\nPRETTY_NAME=\"Arch Linux\"" },
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
            },
          },
        },
      },
      usr: { type: "dir", name: "usr", children: { local: { type: "dir", name: "local", children: {} } } },
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

export default function TerminalFooter() {
  const [fs, setFs] = useState<Record<string, FSNode>>(INITIAL_FS);
  const [currentPath, setCurrentPath] = useState<string[]>(["home", "visitor"]);

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
    const parts = cmd.trim().split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (!command) return "";

    switch (command) {
      case "help":
        return [
          "Available commands:",
          "  ls, cd, pwd, cat, mkdir, touch, rm, mv, cp, clear, whoami, hostname, uname, neofetch, pacman, echo, exit, sudo, lsblk, df",
        ];

      case "whoami":
        return "visitor";

      case "hostname":
        return "bimbok-arch";

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
