#!/usr/bin/env node

/**
 * NERDS Autonomous Web Engineering Director - Pure CLI Setup Tool
 * Zero-TUI CLI syntax:
 *   nerds init [--leader | --member] [-mem <count>] [-nogit] [-alias <name>] [-gh-user <user>] [-gh-token <token>]
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetProjectRoot = process.cwd();
const envLocalPath = path.join(targetProjectRoot, '.env.local');
const nerdsConfigPath = path.join(targetProjectRoot, '.nerds.json');
const gitignorePath = path.join(targetProjectRoot, '.gitignore');

const ANSI = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m'
};

const REQUIRED_FILES = [
  '.gemini/instructions.md',
  'AGENTS.md',
  '.gemini/skills/nerds-director/SKILL.md',
  '.gemini/skills/anti-slop-pro/SKILL.md',
  '.gemini/skills/motion-3d-scroll/SKILL.md',
  'SKILL.md',
  '.nerds/SKILL.md',
  '.nerds/skills/anti-slop-pro/SKILL.md',
  '.nerds/skills/motion-3d-scroll/SKILL.md',
  '.nerds/instructions/01-product-ceo.md',
  '.nerds/instructions/02-architect-em.md',
  '.nerds/instructions/03-designing-incharge.md',
  '.nerds/instructions/04-design-explorer-engineer.md',
  '.nerds/instructions/05-qa-lead.md',
  '.nerds/instructions/06-security-auditor.md',
  '.nerds/instructions/07-git-nerd.md',
  '.nerds/instructions/leader-instructions.md',
  '.nerds/instructions/member-instructions.md',
  '.nerds/scripts/coordination-sync.js',
  '.nerds/scripts/git-pro-manager.js',
  '.nerds/scripts/github-poller.js',
  'scripts/security-leak-scanner.js'
];

const REMOTE_BASE_URL = 'https://raw.githubusercontent.com/shlok377/nerds/main/';

function printHelp() {
  console.log(`
${ANSI.bold}NERDS Autonomous Director CLI Init${ANSI.reset}

${ANSI.bold}USAGE:${ANSI.reset}
  nerds init [options]
  npx nerds [options]

${ANSI.bold}OPTIONS:${ANSI.reset}
  --leader, -leader           Set role as Team Leader (Default)
  --member, -member           Set role as Co-worker (Team Member)
  -mem, --members <count>     Number of team members excluding leader (Default: 0)
  -nogit, --no-git            Disable GitHub integration
  -alias, --alias <name>      Set Agent Alias handle for task assignment matching (Default: agent-1)
  -gh-user, --gh-user <name>  GitHub Username
  -gh-token, --gh-token <tok> GitHub Personal Access Token
  -h, --help                  Show CLI help options
`);
  process.exit(0);
}

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    isLeader: true,
    membersCount: 0,
    enableGit: true,
    agentAlias: 'agent-1',
    githubUser: '',
    githubToken: ''
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '-h' || arg === '--help') {
      printHelp();
    } else if (arg === '--leader' || arg === '-leader') {
      options.isLeader = true;
    } else if (arg === '--member' || arg === '-member') {
      options.isLeader = false;
    } else if (arg === '-nogit' || arg === '--no-git') {
      options.enableGit = false;
    } else if (arg.startsWith('-mem') || arg.startsWith('--members')) {
      if (arg.includes('=')) {
        options.membersCount = parseInt(arg.split('=')[1], 10) || 0;
      } else if (i + 1 < args.length && !args[i + 1].startsWith('-')) {
        options.membersCount = parseInt(args[++i], 10) || 0;
      } else {
        const match = arg.match(/-mem(\d+)/);
        if (match) options.membersCount = parseInt(match[1], 10) || 0;
      }
    } else if (arg === '-alias' || arg === '--alias') {
      if (i + 1 < args.length) options.agentAlias = args[++i];
    } else if (arg === '-gh-user' || arg === '--gh-user') {
      if (i + 1 < args.length) options.githubUser = args[++i];
    } else if (arg === '-gh-token' || arg === '--gh-token') {
      if (i + 1 < args.length) options.githubToken = args[++i];
    }
  }

  return options;
}

function getGitRemoteOrigin() {
  try {
    const remoteUrl = execSync('git config --get remote.origin.url', { cwd: targetProjectRoot, encoding: 'utf8' });
    return remoteUrl.trim();
  } catch (err) {
    return 'local/repository';
  }
}

function fetchRemoteFile(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchRemoteFile(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      let data = '';
      res.setEncoding('utf8');
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function provisionFiles() {
  console.log(`${ANSI.cyan}[PROVISION] Setting up NERDS roles, instructions, & scripts...${ANSI.reset}`);
  let provisionedCount = 0;

  for (const relPath of REQUIRED_FILES) {
    const targetPath = path.join(targetProjectRoot, relPath);
    const targetDir = path.dirname(targetPath);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const localSourcePath = path.resolve(__dirname, '..', relPath);

    if (fs.existsSync(localSourcePath)) {
      fs.copyFileSync(localSourcePath, targetPath);
      console.log(` ${ANSI.green}✓ Local copy:${ANSI.reset} ${relPath}`);
      provisionedCount++;
    } else {
      try {
        const fileUrl = `${REMOTE_BASE_URL}${relPath}`;
        const content = await fetchRemoteFile(fileUrl);
        fs.writeFileSync(targetPath, content, 'utf8');
        console.log(` ${ANSI.green}✓ Downloaded:${ANSI.reset} ${relPath}`);
        provisionedCount++;
      } catch (err) {
        console.error(` ${ANSI.red}✗ Failed to download:${ANSI.reset} ${relPath} (${err.message})`);
      }
    }
  }

  console.log(`${ANSI.green}[PROVISION] Complete! ${provisionedCount}/${REQUIRED_FILES.length} infrastructure files ready.${ANSI.reset}\n`);
}

function updatePackageJson() {
  const pkgPath = path.join(targetProjectRoot, 'package.json');
  if (fs.existsSync(pkgPath)) {
    try {
      const pkgRaw = fs.readFileSync(pkgPath, 'utf8');
      const pkg = JSON.parse(pkgRaw);
      pkg.scripts = pkg.scripts || {};
      let updated = false;

      const defaultScripts = {
        'nerds:poll': 'node ./.nerds/scripts/github-poller.js',
        'nerds:git': 'node ./.nerds/scripts/git-pro-manager.js',
        'security:scan': 'node ./scripts/security-leak-scanner.js'
      };

      for (const [key, cmd] of Object.entries(defaultScripts)) {
        if (!pkg.scripts[key]) {
          pkg.scripts[key] = cmd;
          updated = true;
        }
      }

      if (updated) {
        fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
        console.log(`${ANSI.green}[MANIFEST] Updated package.json with NERDS npm scripts.${ANSI.reset}`);
      }
    } catch (err) {
      console.warn(`${ANSI.yellow}[WARN] Could not update package.json: ${err.message}${ANSI.reset}`);
    }
  }
}

async function main() {
  console.log(`\n+-------------------------------------------------------------+`);
  console.log(`|              NERDS AUTONOMOUS WEB DIRECTOR                  |`);
  console.log(`|                     CLI INITIALIZER                         |`);
  console.log(`+-------------------------------------------------------------+\n`);

  const options = parseArgs();
  const detectedRemote = getGitRemoteOrigin();

  console.log(`${ANSI.cyan}[CONFIG] Role Mode:${ANSI.reset} ${options.isLeader ? 'Leader' : 'Co-worker (Member)'}`);
  console.log(`${ANSI.cyan}[CONFIG] Team Members:${ANSI.reset} ${options.membersCount}`);
  console.log(`${ANSI.cyan}[CONFIG] GitHub Integration:${ANSI.reset} ${options.enableGit ? 'ENABLED' : 'DISABLED'}`);
  console.log(`${ANSI.cyan}[CONFIG] Agent Alias:${ANSI.reset} ${options.agentAlias}`);
  console.log(`${ANSI.cyan}[CONFIG] Repository:${ANSI.reset} ${detectedRemote}\n`);

  // 1. Provision all NERDS role instructions & scripts
  await provisionFiles();

  // 2. Write secrets to .env.local if provided
  if (options.enableGit && (options.githubToken || options.githubUser)) {
    const envContent = `# NERDS Secrets (GITIGNORED - 0600 PERMISSIONS)
GITHUB_TOKEN=${options.githubToken}
GITHUB_USERNAME=${options.githubUser}
AGENT_ALIAS=${options.agentAlias}
`;
    fs.writeFileSync(envLocalPath, envContent, { mode: 0o600 });
    console.log(`${ANSI.green}[SECURITY] Saved credentials to .env.local (0600 permissions)${ANSI.reset}`);
  }

  // 3. Create .nerds.json manifest
  const nerdsConfig = {
    $schema: 'https://raw.githubusercontent.com/nerds-stack/schema.json',
    repository: detectedRemote,
    roleMode: options.isLeader ? 'leader' : 'member',
    gitManager: {
      enabled: options.enableGit,
      agentAlias: options.agentAlias,
      githubUsername: options.githubUser
    },
    team: {
      count: options.membersCount,
      coordinationBranch: options.membersCount > 0 ? 'sync/llm-coordination' : null
    },
    initializedAt: new Date().toISOString()
  };

  fs.writeFileSync(nerdsConfigPath, JSON.stringify(nerdsConfig, null, 2));
  console.log(`${ANSI.green}[MANIFEST] Created .nerds.json config.${ANSI.reset}`);

  // 4. Update package.json scripts if exists
  updatePackageJson();

  // 5. Harden .gitignore
  let gitignoreContent = fs.existsSync(gitignorePath) ? fs.readFileSync(gitignorePath, 'utf8') : '';
  if (!gitignoreContent.includes('.env.local')) {
    gitignoreContent += '\n# NERDS Credentials Security\n.env.local\n.nerds/credentials.json\n';
    fs.writeFileSync(gitignorePath, gitignoreContent);
    console.log(`${ANSI.green}[SECURITY] Hardened .gitignore rules.${ANSI.reset}`);
  }

  console.log(`\n+-------------------------------------------------------------+`);
  console.log(`|                NERDS SETUP COMPLETE                         |`);
  console.log(`+-------------------------------------------------------------+`);
  console.log(`| 7 Nerds roles and system prompt instructions initialized!   |`);
  console.log(`| Open AGY (CLI or IDE) & start prompting straight away!      |`);
  console.log(`+-------------------------------------------------------------+\n`);
}

main();



