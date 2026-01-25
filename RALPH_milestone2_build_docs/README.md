# RALPH Development Loop - TyneBase Milestone 2

**RALPH** = Rapid Autonomous Loop for Programmatic Handling

This directory contains the infrastructure for running autonomous AI-to-AI development loops for TyneBase Backend Milestone 2.

## Directory Structure

```
RALPH_milestone2_build_docs/
├── README.md               # This file
├── PRD.md                  # Product Requirements Document (READ ONLY)
├── RALPH.md                # Detailed task list with validation steps
├── PRD.json                # Machine-readable task tracking
├── ralph_state.json        # RALPH execution state
├── ralph_runner.py         # Orchestration script
├── tasklist.md             # AI agent scratchpad (auto-updated)
└── execution_summaries/    # Per-task execution reports
    └── execution_summary_task1_1.md
```

## Quick Start

### 1. Check Status
```bash
python ralph_runner.py status
```

### 2. Get Next Task
```bash
python ralph_runner.py next
```

### 3. Execute Task Loop
```bash
# Start task
python ralph_runner.py start 1.1

# ... implement feature ...
# ... run validation ...

# Mark complete
python ralph_runner.py pass 1.1

# Or if blocked
python ralph_runner.py fail 1.1
```

### 4. Commit Changes
```bash
git add .
git commit -m "feat(task-1.1): Initialize Supabase Project"
python ralph_runner.py commit "feat(task-1.1): Initialize Supabase Project"
```

## Windsurf Integration

Use the RALPH workflow in Windsurf:
```
/ralph
```

Or say: "Continue RALPH loop"

## Git Workflow

- **Staging Branch:** `ralph/milestone2-staging`
- **Main Branch:** `main`

Each completed task should be committed to the staging branch. Merge to main after phase completion.

## RALPH Protocol Rules

1. **Sequential Execution** - Tasks must be done in order
2. **No Skipping** - Every task must pass validation
3. **Document Everything** - Create execution summary for each task
4. **Stop on Failure** - After 2 retries, mark blocked and stop
5. **Security First** - Follow all security best practices

## Commands Reference

| Command | Description |
|---------|-------------|
| `status` | Show current RALPH state |
| `next` | Get next task details |
| `start <id>` | Mark task as in progress |
| `pass <id>` | Mark task as completed |
| `fail <id>` | Mark task as blocked |
| `summary` | Show progress by phase |
| `commit <msg>` | Record a commit |

## Files Reference

- **PRD.md** - Do NOT modify. Reference only.
- **RALPH.md** - Do NOT modify. Update checkboxes only.
- **PRD.json** - Tracks task `passes` status
- **ralph_state.json** - Execution state and history
- **tasklist.md** - Auto-updated by ralph_runner.py

## Progress Tracking

Progress is tracked in multiple ways:
1. `PRD.json` - `passes: true/false` for each task
2. `ralph_state.json` - Current task, phase, history
3. `tasklist.md` - Human-readable progress summary
4. `execution_summaries/` - Detailed per-task reports
