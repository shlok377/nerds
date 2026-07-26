#!/usr/bin/env node

/**
 * NERDS Autonomous Web Director - Setup & Bootstrapper Wizard
 * Executable via `npx github:shlok377/nerds init` on ANY PC in the world.
 */

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetProjectRoot = process.cwd();
const envLocalPath = path.join(targetProjectRoot, '.env.local');
const nerdsConfigPath = path.join(targetProjectRoot, '.nerds.json');
const gitignorePath = path.join(targetProjectRoot, '.gitignore');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query) => new Promise((resolve) => rl.question(query, resolve));

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
    console.log(`  ✓ Downloaded ${remotePath}`);
  } catch (err) {
    const sourceLocalPath = path.join(__dirname, '..', remotePath);
    if (fs.existsSync(sourceLocalPath)) {
      const dir = path.dirname(outputPath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.copyFileSync(sourceLocalPath, outputPath);
      console.log(`  ✓ Installed ${remotePath} (package fallback)`);
    } else {
      console.warn(`  ⚠️ Could not fetch ${remotePath}`);
    }
  }
}

async function main() {
  console.log('\n=============================================================');
  console.log('⚡ NERDS Autonomous Web Director - Universal Onboarding');
  console.log(' Remote Execution: npx github:shlok377/nerds init');
  console.log(' Core Values (Always Installed):');
  console.log('  🎨 NERDS Custom Design Engine (Strict Anti-Slop Enforcement)');
  console.log('  🧠 NERDS Sprint Role Engine (CEO, EM, Designer, QA, Security)');
  console.log('=============================================================\n');

  try {
    const detectedRemote = getGitRemoteOrigin();
    console.log(`📡 Target Workspace Remote: ${detectedRemote}\n`);

    // --- QUESTION 1: GitHub Pro Manager Toggle ---
    const enableGitManagerAns = await askQuestion('❓ Install GitHub Pro Manager module (`module/github-manager`)? (y/N): ');
    const enableGitManager = enableGitManagerAns.trim().toLowerCase() === 'y';

    let githubUsername = '';
    let githubToken = '';
    let agentAlias = 'agent-1';
    let assignedLabel = 'agent:bot';

    if (enableGitManager) {
      githubUsername = await askQuestion('👤 Enter your GitHub Username: ');
      githubToken = await askQuestion('🔑 Enter GitHub Personal Access Token [saved securely in .env.local]: ');

      if (!githubToken || githubToken.trim() === '') {
        console.error('❌ Error: GitHub Token is required when GitHub Manager is enabled.');
        process.exit(1);
      }

      agentAlias = (await askQuestion('🤖 Enter Agent Alias (default: agent-1): ')) || 'agent-1';
      const defaultLabel = `agent:${agentAlias.trim()}`;
      assignedLabel = (await askQuestion(`🏷️ Enter GitHub Issue Label to poll (default: ${defaultLabel}): `)) || defaultLabel;

      const envContent = `# NERDS Local Secrets (STRICTLY GITIGNORED - DO NOT COMMIT)\nGITHUB_TOKEN=${githubToken.trim()}\nGITHUB_USERNAME=${githubUsername.trim()}\nAGENT_ALIAS=${agentAlias.trim()}\n`;
      fs.writeFileSync(envLocalPath, envContent, { mode: 0o600 });
      console.log('🔒 Credentials saved to local `.env.local` (0600 permissions)');
    } else {
      console.log('ℹ️ GitHub Pro Manager disabled. Operating in local mode.');
    }

    // --- QUESTION 2: Team Members Count (0-4 max) ---
    let teamCountInput = await askQuestion('\n👥 How many team members on this project? (0-4 max, default: 0): ');
    let teamCount = parseInt(teamCountInput.trim() || '0', 10);
    if (isNaN(teamCount) || teamCount < 0) teamCount = 0;
    if (teamCount > 4) teamCount = 4;

    const teamMembers = [];
    for (let i = 1; i <= teamCount; i++) {
      const member = await askQuestion(`  -> Enter username / alias for team member ${i}: `);
      if (member && member.trim()) teamMembers.push(member.trim());
    }

    // --- DOWNLOADING MODULE FILES ---
    console.log('\n📦 Downloading NERDS Core Values & Selected Modules into target project...');

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
        agentAlias: enableGitManager ? agentAlias.trim() : null,
        assignedLabel: enableGitManager ? assignedLabel.trim() : null
      },
      team: {
        count: teamMembers.length,
        members: teamMembers,
        coordinationBranch: teamMembers.length > 0 ? 'sync/llm-coordination' : null
      },
      initializedAt: new Date().toISOString()
    };

    fs.writeFileSync(nerdsConfigPath, JSON.stringify(nerdsConfig, null, 2));
    console.log('⚙️ Saved workspace configuration to `.nerds.json`');

    let gitignoreContent = fs.existsSync(gitignorePath) ? fs.readFileSync(gitignorePath, 'utf8') : '';
    if (!gitignoreContent.includes('.env.local')) {
      gitignoreContent += '\n# NERDS Credentials Security\n.env.local\n.nerds/credentials.json\n';
      fs.writeFileSync(gitignorePath, gitignoreContent);
      console.log('🛡️ Verified `.gitignore` security rules.');
    }

    console.log('\n=============================================================');
    console.log('✅ NERDS Setup Complete!');
    console.log(` Delivered Modules: [${installedModules.join(', ')}]`);
    console.log(' Antigravity IDE will now recognize the `nerds-director` skill.');
    console.log(' Updates & visual proofs will be reported in your LLM Chatbox!');
    console.log('=============================================================\n');
  } catch (err) {
    console.error('❌ Setup failed:', err);
  } finally {
    rl.close();
  }
}

main();
