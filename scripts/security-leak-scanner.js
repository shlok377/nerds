/**
 * NERDS Pre-Commit Security Leak Scanner
 * Scans files for exposed GITHUB_TOKENs, ghp_*, github_pat_*, JWTs, or private keys.
 */

import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();

// Regex patterns for sensitive credentials
const SECRET_PATTERNS = [
  /ghp_[a-zA-Z0-9]{36}/,
  /github_pat_[a-zA-Z0-9]{22}_[a-zA-Z0-9]{59}/,
  /eyJ[a-zA-Z0-9_-]{10,}\.eyJ[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}/, // JWT
  /-----BEGIN PRIVATE KEY-----/,
  /-----BEGIN RSA PRIVATE KEY-----/
];

const IGNORED_PATHS = ['node_modules', '.git', '.env.local', 'dist', 'package-lock.json'];

function scanDirectory(dir, issues = []) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const relativePath = path.relative(projectRoot, fullPath);

    if (IGNORED_PATHS.some((ignored) => relativePath.startsWith(ignored))) {
      continue;
    }

    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDirectory(fullPath, issues);
    } else if (stat.isFile()) {
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        SECRET_PATTERNS.forEach((pattern) => {
          if (pattern.test(content)) {
            issues.push({ file: relativePath, pattern: pattern.toString() });
          }
        });
      } catch (err) {
        // Ignore unreadable binary files
      }
    }
  }

  return issues;
}

console.log('[SECURITY] NERDS Security Scanner: Inspecting workspace files...');
const detectedIssues = scanDirectory(projectRoot);

if (detectedIssues.length > 0) {
  console.error('\n[SECURITY ALERT] Exposed credentials detected!');
  detectedIssues.forEach((issue) => {
    console.error(`  - File: ${issue.file} (Matches: ${issue.pattern})`);
  });
  console.error('Commit aborted. Remove secret strings from code before proceeding.\n');
  process.exit(1);
} else {
  console.log('[SECURITY CLEAN] 0 leaked secrets or tokens found in workspace.\n');
  process.exit(0);
}
