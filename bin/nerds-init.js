#!/usr/bin/env node

/**
 * NERDS Autonomous Web Engineering Director - Interactive ANSI TUI Setup Wizard
 * Workflow Order:
 *  1. Ask Team Capacity & Teammates first.
 *  2. If Team > 0, GitHub Manager is REQUIRED & Auto-Enabled to sync cross-LLM locks & issues on `sync/llm-coordination`.
 *  3. If Team == 0, ask if GitHub Manager is wanted for solo issue automation.
 */

import fs from 'fs';
import path from 'path';
import tty from 'tty';
import readline from 'readline';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetProjectRoot = process.cwd();
const envLocalPath = path.join(targetProjectRoot, '.env.local');
const nerdsConfigPath = path.join(targetProjectRoot, '.nerds.json');
const gitignorePath = path.join(targetProjectRoot, '.gitignore');

function getInteractiveInput() {
  if (process.stdin.isTTY) {
    return process.stdin;
  }
  try {
    const fd = fs.openSync('/dev/tty', 'r+');
    return new tty.ReadStream(fd);
  } catch (err) {
    return process.stdin;
  }
}

const inputSource = getInteractiveInput();
readline.emitKeypressEvents(inputSource);

// Single unified Readline interface to prevent stream collisions
const mainRl = readline.createInterface({
  input: inputSource,
  output: process.stdout
});

const ANSI = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  clearLine: '\x1b[2K',
  cursorUp: (n = 1) => `\x1b[${n}A`,
  cursorHide: '\x1b[?25l',
  cursorShow: '\x1b[?25h'
};

function selectMenu(title, options, defaultIdx = 0) {
  return new Promise((resolve) => {
    let selectedIdx = defaultIdx;

    if (inputSource.isTTY && typeof inputSource.setRawMode === 'function') {
      inputSource.setRawMode(true);
    }
    process.stdout.write(ANSI.cursorHide);

    function render() {
      console.log(`\n${ANSI.bold}${title}${ANSI.reset}`);
      options.forEach((opt, idx) => {
        if (idx === selectedIdx) {
          console.log(`  ${ANSI.cyan}${ANSI.bold}❯ (•) ${opt.label}${ANSI.reset} ${ANSI.dim}${opt.desc || ''}${ANSI.reset}`);
        } else {
          console.log(`    ( ) ${opt.label} ${ANSI.dim}${opt.desc || ''}${ANSI.reset}`);
        }
      });
    }

    render();

    function onKeypress(str, key) {
      if (!key) return;
      if (key.name === 'up') {
        selectedIdx = (selectedIdx - 1 + options.length) % options.length;
        process.stdout.write(ANSI.cursorUp(options.length + 2) + ANSI.clearLine);
        render();
      } else if (key.name === 'down') {
        selectedIdx = (selectedIdx + 1) % options.length;
        process.stdout.write(ANSI.cursorUp(options.length + 2) + ANSI.clearLine);
        render();
      } else if (key.name === 'return' || key.name === 'enter') {
        cleanup();
        resolve(options[selectedIdx].value);
      } else if (key.ctrl && key.name === 'c') {
        cleanup();
        console.log(`\n${ANSI.red}[CANCELLED] Setup aborted.${ANSI.reset}`);
        process.exit(0);
      }
    }

    function cleanup() {
      inputSource.removeListener('keypress', onKeypress);
      if (inputSource.isTTY && typeof inputSource.setRawMode === 'function') {
        inputSource.setRawMode(false);
      }
      inputSource.resume();
      process.stdout.write(ANSI.cursorShow);
    }

    inputSource.on('keypress', onKeypress);
  });
}

function inputPrompt(title, defaultValue = '') {
  return new Promise((resolve) => {
    inputSource.resume();
    const displayPrompt = `${title}${defaultValue ? ` [${defaultValue}]` : ''}: `;
    mainRl.question(`\n${ANSI.bold}${displayPrompt}${ANSI.reset}`, (answer) => {
      const val = answer.trim() || defaultValue;
      resolve(val);
    });
  });
}

function getGitRemoteOrigin() {
  try {
    const remoteUrl = execSync('git config --get remote.origin.url', { cwd: targetProjectRoot, encoding: 'utf8' });
    return remoteUrl.trim();
  } catch (err) {
    return 'local/repository';
  }
}

async function fetchRemoteFile(remotePath, outputPath) {
  const rawUrl = `https://raw.githubusercontent.com/shlok377/nerds/main/${remotePath}`;
  try {
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    execSync(`curl -fsSL "${rawUrl}" -o "${outputPath}"`, { stdio: 'pipe' });
    console.log(`  ${ANSI.green}[OK]${ANSI.reset} ${remotePath}`);
  } catch (err) {
    const sourceLocalPath = path.join(__dirname, '..', remotePath);
    if (fs.existsSync(sourceLocalPath)) {
      const dir = path.dirname(outputPath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.copyFileSync(sourceLocalPath, outputPath);
      console.log(`  ${ANSI.green}[OK]${ANSI.reset} ${remotePath} (fallback)`);
    } else {
      console.warn(`  ${ANSI.yellow}[WARN]${ANSI.reset} Could not fetch ${remotePath}`);
    }
  }
}

async function main() {
  console.clear();
  console.log('+-------------------------------------------------------------+');
  console.log('|              NERDS AUTONOMOUS WEB DIRECTOR                  |');
  console.log('|               INTERACTIVE TUI SETUP WIZARD                  |');
  console.log('+-------------------------------------------------------------+');
  console.log('| Core Values Included:                                       |');
  console.log('|  - NERDS Custom Design Intelligence Engine (Anti-Slop)     |');
  console.log('|  - NERDS Native 5-Role Pipeline (CEO, EM, Designer, QA, Sec)|');
  console.log('+-------------------------------------------------------------+');

  try {
    const detectedRemote = getGitRemoteOrigin();
    console.log(`\n[Repository Context]: ${ANSI.cyan}${detectedRemote}${ANSI.reset}`);

    // --- STEP 1: SELECT TEAM CAPACITY FIRST ---
    const teamCount = await selectMenu(
      'STEP 1: Select Team Members & Partner LLMs Capacity:',
      [
        { label: '0 Members (Solo Developer)', value: 0, desc: '- Minimal overhead' },
        { label: '1 Member  (Dual Partnership)', value: 1, desc: '- Requires GitHub Manager for Cross-LLM sync' },
        { label: '2 Members (Trio Team)', value: 2, desc: '- Requires GitHub Manager for Cross-LLM sync' },
        { label: '3 Members (Quad Team)', value: 3, desc: '- Requires GitHub Manager for Cross-LLM sync' }
      ],
      0
    );

    const teamMembers = [];
    for (let i = 1; i <= teamCount; i++) {
      const member = await inputPrompt(`  -> Username / alias for team member ${i}`);
      if (member) teamMembers.push(member);
    }

    // --- STEP 2: CONFIGURE GITHUB PRO MANAGER ---
    let enableGitManager = false;

    if (teamCount > 0) {
      console.log(`\n${ANSI.cyan}[AUTO-ENABLE] GitHub Pro Manager enabled automatically for Team Partnership (required for sync/llm-coordination & issue routing).${ANSI.reset}`);
      enableGitManager = true;
    } else {
      enableGitManager = await selectMenu(
        'STEP 2: Enable GitHub Pro Manager for Solo Issue Automation?',
        [
          { label: 'DISABLED (Recommended for Local Mode)', value: false, desc: '- Pure local assistant execution' },
          { label: 'ENABLED  (GitHub Issue & PR Automation)', value: true, desc: '- Issue poller & atomic micro-commits' }
        ],
        0
      );
    }

    let githubUsername = '';
    let githubToken = '';
    let agentAlias = 'agent-1';
    let assignedLabel = 'agent:bot';

    if (enableGitManager) {
      githubUsername = await inputPrompt('Enter GitHub Username');
      githubToken = await inputPrompt('Enter GitHub Personal Access Token (stored in .env.local)');

      if (!githubToken) {
        console.error(`\n${ANSI.red}[ERROR] GitHub Token is required when GitHub Manager is enabled.${ANSI.reset}`);
        process.exit(1);
      }

      agentAlias = await inputPrompt('Enter Agent Alias', 'agent-1');
      assignedLabel = await inputPrompt('Enter GitHub Issue Label to poll', `agent:${agentAlias}`);

      const envContent = `# NERDS Local Secrets (STRICTLY GITIGNORED - DO NOT COMMIT)\nGITHUB_TOKEN=${githubToken}\nGITHUB_USERNAME=${githubUsername}\nAGENT_ALIAS=${agentAlias}\n`;
      fs.writeFileSync(envLocalPath, envContent, { mode: 0o600 });
      console.log(`${ANSI.green}[SUCCESS] Saved credentials to .env.local (0600 permissions)${ANSI.reset}`);
    } else {
      console.log(`${ANSI.yellow}[INFO] GitHub Pro Manager disabled. Operating in local mode.${ANSI.reset}`);
    }

    // --- DOWNLOADING MODULE FILES ---
    console.log(`\n${ANSI.bold}[INSTALLING] Fetching NERDS Core Engine & Selected Modules...${ANSI.reset}`);

    await fetchRemoteFile('.gemini/skills/nerds-director/SKILL.md', path.join(targetProjectRoot, '.gemini/skills/nerds-director/SKILL.md'));
    await fetchRemoteFile('src/design-system/theme.css', path.join(targetProjectRoot, 'src/design-system/theme.css'));
    await fetchRemoteFile('scripts/security-leak-scanner.js', path.join(targetProjectRoot, 'scripts/security-leak-scanner.js'));

    const installedModules = ['main (Core Values)'];

    if (enableGitManager) {
      await fetchRemoteFile('.nerds/scripts/git-pro-manager.js', path.join(targetProjectRoot, '.nerds/scripts/git-pro-manager.js'));
      await fetchRemoteFile('.nerds/scripts/github-poller.js', path.join(targetProjectRoot, '.nerds/scripts/github-poller.js'));
      installedModules.push('module/github-manager');
    }

    if (teamMembers.length > 0) {
      await fetchRemoteFile('.nerds/scripts/coordination-sync.js', path.join(targetProjectRoot, '.nerds/scripts/coordination-sync.js'));
      installedModules.push('module/partner-sync');
    }

    const nerdsConfig = {
      $schema: 'https://raw.githubusercontent.com/nerds-stack/schema.json',
      repository: detectedRemote,
      installedModules,
      coreValues: {
        designEngine: 'NERDS Custom Design Intelligence v1.0',
        roleEngine: 'NERDS Native 5-Role Pipeline (CEO, EM, Designer, QA, Security)'
      },
      gitManager: {
        enabled: enableGitManager,
        agentAlias: enableGitManager ? agentAlias : null,
        assignedLabel: enableGitManager ? assignedLabel : null
      },
      team: {
        count: teamMembers.length,
        members: teamMembers,
        coordinationBranch: teamMembers.length > 0 ? 'sync/llm-coordination' : null
      },
      initializedAt: new Date().toISOString()
    };

    fs.writeFileSync(nerdsConfigPath, JSON.stringify(nerdsConfig, null, 2));
    console.log(`${ANSI.green}[CONFIG] Created .nerds.json manifest${ANSI.reset}`);

    let gitignoreContent = fs.existsSync(gitignorePath) ? fs.readFileSync(gitignorePath, 'utf8') : '';
    if (!gitignoreContent.includes('.env.local')) {
      gitignoreContent += '\n# NERDS Credentials Security\n.env.local\n.nerds/credentials.json\n';
      fs.writeFileSync(gitignorePath, gitignoreContent);
      console.log(`${ANSI.green}[SECURITY] Hardened .gitignore rules.${ANSI.reset}`);
    }

    console.log('\n+-------------------------------------------------------------+');
    console.log('|                NERDS SETUP COMPLETE                         |');
    console.log('+-------------------------------------------------------------+');
    console.log(`| Installed Modules: ${ANSI.cyan}[${installedModules.join(', ')}]${ANSI.reset}`);
    console.log('| Antigravity IDE will recognize `nerds-director` skill.');
    console.log('+-------------------------------------------------------------+\n');
  } catch (err) {
    console.error(`${ANSI.red}[ERROR] Setup failed:${ANSI.reset}`, err);
  } finally {
    mainRl.close();
  }
}

main();
