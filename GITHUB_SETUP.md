# Setting Up GitHub Repository for PolkaFarm

Follow these steps to create a new GitHub repository for the PolkaFarm project:

## 1. Create a New Repository on GitHub

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top-right corner and select "New repository"
3. Fill in the repository details:
   - Repository name: `polkafarm`
   - Description: `DeFi yield farming application on Polkadot Asset Hub`
   - Visibility: Public (for hackathon submissions)
   - Initialize with: Do NOT initialize with README, license, or .gitignore (as we already have these)
4. Click "Create repository"

## 2. Connect Your Local Repository to GitHub

After creating the repository, GitHub will show instructions. Follow the "push an existing repository" section:

```bash
# Navigate to your project directory (if not already there)
cd /Users/coledermott/polkafarm

# Add the GitHub repository as a remote
git remote add origin https://github.com/cdermott7/PolkaFarm.git

# Ensure your branch is named 'main'
git branch -M main

# Push your local repository to GitHub
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## 3. Verify the Upload

1. Visit your GitHub repository page at `https://github.com/YOUR_USERNAME/polkafarm`
2. Confirm that all files are present and the README is displayed properly

## 4. Share the Repository Link

For the hackathon submission, you can now share the link to your GitHub repository.

## 5. Additional Setup (Optional)

If desired, you can also:

- Set up GitHub Pages to host a demo of the front-end
- Add GitHub topics like `polkadot`, `defi`, `yield-farming` for better discoverability
- Set up branch protection rules for the main branch
- Connect the repository to deployment services

## Notes for Contributors

- Always create a new branch for features or fixes
- Submit changes via pull requests
- Keep sensitive information (like deployment keys) out of the repository