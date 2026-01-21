#!/bin/bash
# Validation script for project structure

echo "=== CAMBE PORTFOLIO PROJECT VALIDATION ==="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

check_file() {
  if [ -f "$1" ]; then
    echo -e "${GREEN}✓${NC} $1"
    return 0
  else
    echo -e "${RED}✗${NC} $1 (MISSING)"
    return 1
  fi
}

check_dir() {
  if [ -d "$1" ]; then
    echo -e "${GREEN}✓${NC} $1/"
    return 0
  else
    echo -e "${RED}✗${NC} $1/ (MISSING)"
    return 1
  fi
}

echo "=== CLIENT STRUCTURE ==="
check_dir "client/src"
check_dir "client/src/components"
check_dir "client/src/components/ui"
check_dir "client/src/components/sections"
check_dir "client/src/pages"
check_dir "client/src/layouts"
check_dir "client/src/hooks"
check_dir "client/src/services"
check_dir "client/src/utils"
check_dir "client/src/styles"
check_dir "client/src/assets"
check_file "client/src/App.tsx"
check_file "client/src/main.tsx"
check_file "client/src/index.css"
check_file "client/package.json"

echo ""
echo "=== CLIENT COMPONENTS ==="
check_file "client/src/components/sections/ContactForm.tsx"
check_file "client/src/components/ui/ConfirmSendModal.tsx"
check_file "client/src/components/ui/ResultModal.tsx"
check_file "client/src/hooks/useContactForm.ts"
check_file "client/src/services/contact.service.ts"
check_file "client/src/services/api.ts"
check_file "client/src/utils/cx.ts"
check_file "client/src/utils/api-client.ts"

echo ""
echo "=== SERVER STRUCTURE ==="
check_dir "server/src"
check_dir "server/src/config"
check_dir "server/src/modules"
check_dir "server/src/modules/contact"
check_dir "server/src/middlewares"
check_dir "server/src/utils"
check_dir "server/src/db"
check_file "server/src/app.js"
check_file "server/src/server.js"
check_file "server/package.json"
check_file "server/.env"

echo ""
echo "=== SERVER MODULES ==="
check_file "server/src/modules/contact/contact.routes.js"
check_file "server/src/modules/contact/contact.controller.js"
check_file "server/src/modules/contact/contact.service.js"
check_file "server/src/modules/contact/contact.repository.js"
check_file "server/src/modules/contact/contact.validator.js"
check_file "server/src/modules/contact/contact.schema.js"

echo ""
echo "=== SERVER CONFIG & MIDDLEWARE ==="
check_file "server/src/config/env.js"
check_file "server/src/config/db.js"
check_file "server/src/middlewares/error.middleware.js"
check_file "server/src/middlewares/notfound.middleware.js"
check_file "server/src/middlewares/validate.middleware.js"
check_file "server/src/middlewares/auth.middleware.js"

echo ""
echo "=== SERVER UTILITIES ==="
check_file "server/src/utils/logger.js"
check_file "server/src/utils/helpers.js"

echo ""
echo "=== SHARED TYPES & CONTRACTS ==="
check_file "shared/contact.contract.js"
check_file "shared/contact.contract.d.ts"
check_file "shared/index.js"

echo ""
echo "=== ROOT FILES ==="
check_file "README.md"
check_file ".gitignore"

echo ""
echo "=== VALIDATION COMPLETE ==="
