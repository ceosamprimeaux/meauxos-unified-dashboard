# Connecting MeauxOS Unified Dashboard to Cloud Run Backend

## Current Setup:

- **Frontend:** https://78a969d1.meauxos-unified-dashboard.pages.dev (Cloudflare Pages)
- **Backend:** MeauxCloudServices on Cloud Run (to be deployed)

## Connection Steps:

### 1. Get Your Cloud Run URL

After deploying MeauxCloudServices to Cloud Run, you'll get a URL like:
```
https://meauxcloudservices-365932368784.europe-west1.run.app
```

### 2. Update API Configuration

The dashboard is already configured to connect! Just update the URL:

**Option A: Environment Variable (Recommended)**

In Cloudflare Pages → Settings → Environment Variables:
- Key: `NEXT_PUBLIC_API_URL`
- Value: `https://meauxcloudservices-365932368784.europe-west1.run.app`

**Option B: Update `lib/api.ts`**

The file already has a fallback, but you can hardcode it:
```typescript
const API_BASE = 'https://meauxcloudservices-365932368784.europe-west1.run.app';
```

### 3. Configure CORS on Cloud Run

The Cloud Run backend (`server.js`) is already configured to allow:
- ✅ `https://78a969d1.meauxos-unified-dashboard.pages.dev`
- ✅ `https://meauxos-unified-dashboard.pages.dev`
- ✅ `https://*.pages.dev`

### 4. Test Connection

1. Visit: https://78a969d1.meauxos-unified-dashboard.pages.dev/dashboard
2. Open browser console (F12)
3. Check Network tab for API calls
4. Should see requests to Cloud Run backend

### 5. Update Dashboard to Use Real Data

The dashboard components are ready! They'll automatically:
- Fetch organizations from `/api/organizations`
- Fetch teams from `/api/teams`
- Fetch tasks from `/api/kanban/tasks`
- Fetch stats from `/api/dashboard/stats`

## Architecture:

```
User Browser
    ↓
Cloudflare Pages (Frontend)
    ↓ (API calls)
Cloud Run Backend (MeauxCloudServices)
    ↓
Supabase/Cloud SQL (Database)
```

## Environment Variables Needed:

**In Cloudflare Pages:**
- `NEXT_PUBLIC_API_URL` = Your Cloud Run URL

**In Cloud Run:**
- `SUPABASE_URL` = Your Supabase URL
- `SUPABASE_KEY` = Your Supabase key
- `ALLOWED_ORIGINS` = `https://78a969d1.meauxos-unified-dashboard.pages.dev,https://meauxos-unified-dashboard.pages.dev`

## Quick Test:

After Cloud Run is deployed, test the connection:

```bash
# Test health endpoint
curl https://meauxcloudservices-365932368784.europe-west1.run.app/api/health

# Test from dashboard domain (should work with CORS)
curl -H "Origin: https://78a969d1.meauxos-unified-dashboard.pages.dev" \
     https://meauxcloudservices-365932368784.europe-west1.run.app/api/organizations
```

## Status:

✅ API client configured (`lib/api.ts`)
✅ CORS configured on backend
✅ Dashboard components ready
⏳ Waiting for Cloud Run deployment URL
⏳ Need to set environment variable in Cloudflare Pages

Once Cloud Run is deployed, just add the URL to Cloudflare Pages environment variables and it will work!
