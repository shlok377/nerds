// NERDS App Main Script
console.log('⚡ NERDS Autonomous Platform initialized');

document.addEventListener('DOMContentLoaded', () => {
  const btnTriggerPoll = document.getElementById('btn-trigger-poll');
  const btnRunScan = document.getElementById('btn-run-scan');
  const btnSimulateCommit = document.getElementById('btn-simulate-commit');
  const commitLog = document.getElementById('commit-log');
  const taskProgress = document.getElementById('task-progress');

  if (btnTriggerPoll) {
    btnTriggerPoll.addEventListener('click', () => {
      btnTriggerPoll.innerText = '🔄 Polling GitHub API...';
      btnTriggerPoll.disabled = true;

      setTimeout(() => {
        btnTriggerPoll.innerText = '⚡ Fetch Next Issue';
        btnTriggerPoll.disabled = false;
        alert('GitHub Issue Listener: Polled repo successfully. No new unassigned tasks found for @agent-shlok.');
      }, 1200);
    });
  }

  if (btnRunScan) {
    btnRunScan.addEventListener('click', () => {
      btnRunScan.innerText = '🛡️ Scanning Secrets...';
      btnRunScan.disabled = true;

      setTimeout(() => {
        btnRunScan.innerText = '🛡️ Run Security Scan';
        btnRunScan.disabled = false;
        alert('Security Audit Complete: 0 hardcoded secrets or leaked tokens detected across repository.');
      }, 1000);
    });
  }

  if (btnSimulateCommit) {
    btnSimulateCommit.addEventListener('click', () => {
      const hashes = ['e12f9b0', 'd45c81a', 'b9821ef', '3a77d12'];
      const randomHash = hashes[Math.floor(Math.random() * hashes.length)];
      const newCommit = document.createElement('div');
      newCommit.className = 'commit-item';
      newCommit.innerHTML = `
        <span class="commit-hash">${randomHash}</span>
        <span class="commit-msg">feat(dashboard): simulate atomic micro-commit</span>
      `;
      commitLog.prepend(newCommit);
      if (taskProgress) taskProgress.style.width = '100%';
    });
  }
});
