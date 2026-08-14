import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const nerdsConfigPath = path.join(projectRoot, '.nerds.json');

// Load environment secrets from .env.local if present
const envLocalPath = path.join(projectRoot, '.env.local');
if (fs.existsSync(envLocalPath)) {
  const envLines = fs.readFileSync(envLocalPath, 'utf8').split('\n');
  envLines.forEach((line) => {
    const [key, val] = line.split('=');
    if (key && val) process.env[key.trim()] = val.trim();
  });
}

function loadConfig() {
  if (fs.existsSync(nerdsConfigPath)) {
    return JSON.parse(fs.readFileSync(nerdsConfigPath, 'utf8'));
  }
  return { gitManager: { alias: process.env.AGENT_ALIAS || 'agent-1' } };
}

export function pollGitHubIssues() {
  const config = loadConfig();
  const agentAlias = process.env.AGENT_ALIAS || config.gitManager?.agentAlias || 'agent-1';
  const githubUser = process.env.GITHUB_USERNAME || config.gitManager?.githubUsername || agentAlias;

  console.log(`\n[POLLER] NERDS Listener: Polling GitHub issues assigned to "${agentAlias}" / "${githubUser}"...`);

  try {
    const output = execSync(`gh issue list --state open --json number,title,body,assignees,labels`, {
      cwd: projectRoot,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe']
    });

    const issues = JSON.parse(output || '[]');
    if (issues.length === 0) {
      console.log(`[POLLER] No open issues found. Standing by...`);
      return null;
    }

    // Filter issues where assignees include agentAlias or githubUser
    const assignedIssues = issues.filter((issue) => {
      if (!issue.assignees || issue.assignees.length === 0) return false;
      return issue.assignees.some(
        (a) => a.login.toLowerCase() === agentAlias.toLowerCase() || a.login.toLowerCase() === githubUser.toLowerCase()
      );
    });

    if (assignedIssues.length === 0) {
      console.log(`[POLLER] No open issues explicitly assigned to "${agentAlias}". Standing by...`);
      return null;
    }

    const nextIssue = assignedIssues[0];
    console.log(`\n[TASK DISPATCHED] Issue #${nextIssue.number} - "${nextIssue.title}"`);
    console.log(` Description: ${nextIssue.body || 'No description provided.'}`);

    return nextIssue;
  } catch (err) {
    console.log(`[POLLER INFO] GitHub API request failed or gh CLI unauthenticated.`);
    return null;
  }
}

if (process.argv[1] && process.argv[1].endsWith('github-poller.js')) {
  pollGitHubIssues();
}
