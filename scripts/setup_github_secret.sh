#!/bin/bash
# Setup GitHub Secret for Cloudflare API Token
# Uses GitHub CLI (gh) to securely add the secret

set -e

# GitHub token should be provided as environment variable or via gh auth
# CLOUDFLARE_API_TOKEN should be provided as environment variable
GITHUB_TOKEN="${GITHUB_TOKEN:-}"
CLOUDFLARE_API_TOKEN="${CLOUDFLARE_API_TOKEN:-}"
REPO="ceosamprimeaux/meauxos-unified-dashboard"

echo "🔐 Setting up GitHub Secret for Cloudflare API Token..."

# Authenticate with GitHub
echo "$GITHUB_TOKEN" | gh auth login --with-token

# Add the secret
echo "Adding CLOUDFLARE_API_TOKEN secret..."
echo -n "$CLOUDFLARE_API_TOKEN" | gh secret set CLOUDFLARE_API_TOKEN --repo "$REPO"

echo "✅ Secret added successfully!"
echo ""
echo "📋 Secret Details:"
echo "   Name: CLOUDFLARE_API_TOKEN"
echo "   Repository: $REPO"
echo "   Status: ✅ Configured"
echo ""
echo "🚀 Ready to deploy! Push to main branch to trigger deployment."
