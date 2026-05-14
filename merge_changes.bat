@echo off
REM Commit changes in the current worktree
cd C:\Users\Joseph\Downloads\havenique-website\public\havenique-website.worktrees\agents-admin-dashboard-data-flow-fix

echo Checking git status...
git status --porcelain

echo.
echo Adding all changes...
git add -A

echo.
echo Committing changes...
git commit -m "fix: Render uploaded team photos and blog images in frontend components" -m "- Team member avatars now display uploaded photos instead of just initials^
- Blog pages now display cover images when available^
- Added conditional <img> rendering across team and blog components^
- Fallback to initials/placeholders when images unavailable^
- Fixed files: Team.tsx (card & modal), Home.tsx, Blog.tsx, BlogPost.tsx^
- Prior work had images uploading/saving correctly; this makes them visible" --author "Copilot <223556219+Copilot@users.noreply.github.com>"

echo.
echo Merge status check - verifying current branch...
git branch -v

echo.
echo Merging to main branch...
cd C:\Users\Joseph\Downloads\havenique-website\public\havenique-website
echo Current directory: %cd%
git merge agents-admin-dashboard-data-flow-fix

echo.
echo Merge complete! Verifying...
git log --oneline -5
