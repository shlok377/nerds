import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();

function runCmd(cmd, silent = false) {
  try {
    const output = execSync(cmd, { cwd: projectRoot, encoding: 'utf8', stdio: silent ? 'pipe' : 'inherit' });
    return output;
  } catch (err) {
    if (!silent) console.error(`Command failed: ${cmd}`, err.message);
    throw err;
  }
}

// 1. Run Pre-Commit Security Leak Scanner
export function scanForSecrets() {
  console.log('🛡️ Running Pre-Commit Security Audit...');
  try {
    execSync('node ./scripts/security-leak-scanner.js', { cwd: projectRoot, stdio: 'inherit' });
    return true;
  } catch (err) {
    console.error('❌ Commit blocked due to security scan failure.');
    return false;
  }
}

// 2. Atomic Micro-Commit
export function atomicCommit(type, scope, message) {
  if (!scanForSecrets()) return false;

  const commitMsg = `${type}(${scope}): ${message}`;
  console.log(`🐙 Git Pro Manager: Performing atomic micro-commit -> "${commitMsg}"`);

  runCmd('git add .');
  try {
    runCmd(`git commit -m "${commitMsg}"`);
    console.log('✅ Commit successful.');
    return true;
  } catch (err) {
    console.log('ℹ️ No changes to commit.');
    return false;
  }
}

// 3. Create Feature Branch for Issue
export function createFeatureBranch(issueId, slug) {
  const branchName = `feat/issue-${issueId}-${slug}`;
  console.log(`🌿 Git Pro Manager: Creating feature branch "${branchName}"`);

  try {
    runCmd(`git checkout -b ${branchName}`);
  } catch (err) {
    runCmd(`git checkout ${branchName}`);
  }
  return branchName;
}

// 4. Create GitHub Pull Request
export function createPullRequest(title, body) {
  console.log(`🚀 Git Pro Manager: Opening Pull Request...`);
  try {
    runCmd(`gh pr create --title "${title}" --body "${body}" --fill`);
  } catch (err) {
    console.log('ℹ️ gh CLI not available or PR already exists. Pushing branch to remote.');
    runCmd('git push origin HEAD --force-with-lease');
  }
}

// Command-line execution fallback
if (process.argv[1] && process.argv[1].endsWith('git-pro-manager.js')) {
  const args = process.argv.slice(2);
  const action = args[0] || 'commit';

  if (action === 'commit') {
    const type = args[1] || 'feat';
    const scope = args[2] || 'core';
    const msg = args.slice(3).join(' ') || 'autonomous engineering update';
    atomicCommit(type, scope, msg);
  } else if (action === 'branch') {
    createFeatureBranch(args[1] || '101', args[2] || 'task-update');
  }
}
