import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const syncCachePath = path.join(projectRoot, '.nerds', 'sync-cache', 'status.json');

export function updateAgentSyncStatus(taskStatus) {
  console.log('🤝 Cross-LLM Coordination: Syncing status on `sync/llm-coordination` channel...');

  const syncCacheDir = path.dirname(syncCachePath);
  if (!fs.existsSync(syncCacheDir)) {
    fs.mkdirSync(syncCacheDir, { recursive: true });
  }

  const payload = {
    agentId: 'shlok-antigravity-01',
    activeBranch: taskStatus.branch || 'feat/issue-104',
    claimedIssue: taskStatus.issueId || 104,
    status: taskStatus.state || 'IN_PROGRESS',
    claimedModules: ['src/design-system', 'bin/nerds-init.js'],
    lastHeartbeat: new Date().toISOString()
  };

  fs.writeFileSync(syncCachePath, JSON.stringify(payload, null, 2));
  console.log('✅ Local coordination cache updated:');
  console.log(JSON.stringify(payload, null, 2));

  try {
    // Attempt git orphan branch push for remote multi-LLM coordination
    execSync('git fetch origin sync/llm-coordination:sync/llm-coordination || true', { cwd: projectRoot, stdio: 'pipe' });
  } catch (err) {
    // Branch non-existent remotely yet
  }
}

if (process.argv[1] && process.argv[1].endsWith('coordination-sync.js')) {
  updateAgentSyncStatus({ branch: 'feat/issue-104', issueId: 104, state: 'ACTIVE' });
}
