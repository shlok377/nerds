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
  return { agent: { alias: 'agent-1', assignedLabel: 'agent:bot' } };
}

export function pollGitHubIssues() {
  const config = loadConfig();
  const agentLabel = config.agent?.assignedLabel || 'agent:bot';
  const agentAlias = config.agent?.alias || 'agent-1';

  console.log(`\n🔍 NERDS Listener: Checking GitHub issues for label "${agentLabel}" (Agent: ${agentAlias})...`);

  try {
    const output = execSync(`gh issue list --label "${agentLabel}" --state open --json number,title,body,assignees,labels`, {
      cwd: projectRoot,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe']
    });

    const issues = JSON.parse(output || '[]');
    if (issues.length === 0) {
      console.log(`✨ No unhandled issues found assigned to label "${agentLabel}". Standing by...`);
      return null;
    }

    const nextIssue = issues[0];
    console.log(`\n🎯 TASK DISPATCHED: Issue #${nextIssue.number} - "${nextIssue.title}"`);
    console.log(` Description: ${nextIssue.body || 'No description provided.'}`);

    return nextIssue;
  } catch (err) {
    console.log(`ℹ️ GitHub API returned no open issues for label "${agentLabel}" or gh CLI is unauthenticated.`);
    return null;
  }
}

if (process.argv[1] && process.argv[1].endsWith('github-poller.js')) {
  pollGitHubIssues();
}
