# RALPH Setup Script for TyneBase Milestone 2
# Run this once to initialize the git staging branch

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  RALPH Setup - TyneBase Milestone 2" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in a git repo
if (-not (Test-Path ".git")) {
    Write-Host "Error: Not in a git repository. Run from TyneBase root." -ForegroundColor Red
    exit 1
}

# Create staging branch if it doesn't exist
$branchExists = git branch --list "ralph/milestone2-staging"
if (-not $branchExists) {
    Write-Host "Creating staging branch: ralph/milestone2-staging" -ForegroundColor Yellow
    git checkout -b ralph/milestone2-staging
    Write-Host "Created and switched to ralph/milestone2-staging" -ForegroundColor Green
} else {
    Write-Host "Staging branch already exists" -ForegroundColor Green
    git checkout ralph/milestone2-staging
}

# Ensure execution_summaries directory exists
$summariesDir = "RALPH_milestone2_build_docs/execution_summaries"
if (-not (Test-Path $summariesDir)) {
    New-Item -ItemType Directory -Path $summariesDir -Force | Out-Null
    Write-Host "Created $summariesDir directory" -ForegroundColor Green
}

# Test ralph_runner.py
Write-Host ""
Write-Host "Testing RALPH runner..." -ForegroundColor Yellow
python RALPH_milestone2_build_docs/ralph_runner.py status

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  RALPH Setup Complete!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor White
Write-Host "  1. Run: python RALPH_milestone2_build_docs/ralph_runner.py next" -ForegroundColor Gray
Write-Host "  2. Or use Windsurf: /ralph" -ForegroundColor Gray
Write-Host ""
